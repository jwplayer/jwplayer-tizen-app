import Player from './player';
import { VideoDetail } from './video-detail';
import {
    playlistGalleryTemplate,
    playlistRowTemplate,
    playlistBannerTemplate,
    playlistItemTemplate
} from './templates/playlist';


class ViewModel {
    constructor(props, template) {
        this.props = props || {};
        this.template = template;
        this.view = null;
    }

    init() {
        if (this.props.parent) {
            this.props.parent.view.appendChild(this.view);
        }
    }

    layout() {
        // Convert template string to HTML view
        const { template, props: { viewProps } } = this;
        this.view = createHTML(template(viewProps));
        delete this.template;
    }
}

class Tile extends ViewModel {
    constructor(props, template) {
        super(props, template);
        this.handleKeydown = this.handleKeydown.bind(this);
    }
    
    init() {
        this.layout();
        const { parent, focusCallback } = this.props;
        const rowElement = parent && parent.view.querySelector('.jw-tizen-playlist-row');
        if (rowElement) {
            rowElement.appendChild(this.view);
        }
        if (focusCallback) {
            this.view.removeEventListener('focus', focusCallback);
            this.view.addEventListener('focus', focusCallback);
        }

        this.view.removeEventListener('keydown', this.handleKeydown);
        this.view.addEventListener('keydown', this.handleKeydown);
    }

    handleKeydown(evt) {
        const { playCallback, describeCallback } = this.props

        switch(evt.keyCode) {
            case 13: // Enter/Ok
                if (describeCallback) {
                    describeCallback(evt);
                }
                break;
            case 415: // Play
            case 10252: // Play/Pause
                if (playCallback) {
                    playCallback(evt);
                }
                break;
        }
    }
}

class Row extends ViewModel {
    constructor(props, template) {
        super(props, template);
        this.banner = null;
        this.previousSelection = null;
        this.tiles = [];
        this.onTileFocused = this.onTileFocused.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    init() {
        this.layout();
        const { view } = this;
        view.removeEventListener('keydown', this.handleKeydown);
        view.addEventListener('keydown', this.handleKeydown);
        super.init();
    }
    
    layout() {
        super.layout();
        const { playlistItems } = this.props;

        if (!playlistItems || !Array.isArray(playlistItems)) {
            return;
        }
        const { props, tiles } = this;

        playlistItems.forEach(playlistItem => {
            const { title, image } = playlistItem;
            const tile = new Tile({ 
                viewProps: { title, image }, 
                parent: this,
                focusCallback: this.onTileFocused,
                playCallback: (evt) => props.parent.play(playlistItem, evt),
                describeCallback: (evt) => props.parent.describe(playlistItem, evt)
            }, playlistItemTemplate);
            tiles.push(tile);
            tile.init();
        });
    }

    onTileFocused(evt) {
        this.previousSelection = evt.target;
        evt.target.scrollIntoView({block: 'center'});
    }

    handleKeydown(evt) {
        const { parent, index } = this.props;
        const rows = parent.rows;
        const prevRow = rows[index - 1];
        const nextRow = rows[index + 1];
        const prev = evt.target.previousElementSibling;
        const next = evt.target.nextElementSibling;

        const onSelectRow = (selection) => {
            if (!selection) {
                return;
            }
            const previousSelection = selection.previousSelection;
            if (previousSelection) {
                previousSelection.focus();
                return;
            }
            const firstTile = selection.tiles[0] || {};
            const { view } = firstTile;
            view && view.focus();
        }

        switch(evt.keyCode) {
            case 38: // Up Arrow
                if (!prevRow) {
                    window.scrollTo(0,0);
                    parent.playButton.focus();
                } else {
                    onSelectRow(prevRow);
                }
                break;
            case 40: // Down Arrow
                onSelectRow(nextRow);
                break;
            case 37: // Left Arrow
                if (prev) {
                    prev.focus();
                } else if (prevRow) {
                    onSelectRow(prevRow);
                } else {
                    parent.detailsButton.focus();
                }
                break;
            case 39: // Right Arrow
                if (next) {
                    next.focus();
                } else if (nextRow) {
                    onSelectRow(nextRow)
                }
                break;
            default:
                break;
        }
    }
}

export class Gallery extends ViewModel {
    constructor(props) {
        super(props, playlistGalleryTemplate);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleBannerKeydown = this.handleBannerKeydown.bind(this);
        this.rows = [];
        this.bannerItem = null;
        this.playButton = null;
        this.detailsButton = null;
    }

    init() {
        const { props } = this;

        this.getData(props).then(feeds => {
            this.layout(feeds, props.bannerItem);
            this.addEventListeners();
            props.parent.view.appendChild(this.view);
            this.playButton.focus();
        });
    }
    
    getData(props) {
        const feedPromises = [];
        const { feeds } = props;
        if (feeds) {
            feeds.forEach(feed => {
                feedPromises.push(feedPromise(feed));
            });
        } 
        return Promise.all(feedPromises);
    }

    layout(feeds, bannerItem) {
        super.layout();
        if (!feeds || !feeds.length) {
            return;
        }
        this.createBanner(bannerItem, feeds);
        this.createRows(feeds)
    }

    createBanner(bannerItem, feeds) {
        if (!bannerItem) {
            const firstPlaylist = feeds[0].playlist;
            bannerItem = Object.assign({}, firstPlaylist[0]);
            firstPlaylist.shift();
        }

        const banner = createBanner(bannerItem);
        this.view.appendChild(banner);
        const playButton = this.playButton = banner.querySelector('.jw-tizen-play');
        this.detailsButton = playButton.nextElementSibling;
        playButton.onkeydown = (evt) => this.handleBannerKeydown(evt, this.play.bind(this));
        this.detailsButton.onkeydown = (evt) => this.handleBannerKeydown(evt, this.describe.bind(this));
        this.bannerItem = bannerItem;
    }

    createRows(feeds) {
        feeds.forEach((feed, index) => {
            const playlistItems = feed.playlist
            const { title } = feed;
            const row = new Row({ 
                index,
                parent: this,
                playlistItems,
                viewProps: { title },
            }, playlistRowTemplate);
            this.rows.push(row);
            row.init();
        });
    }

    addEventListeners() {
        this.view.addEventListener('keydown', this.handleKeydown);
    }

    handleKeydown(evt) {
        const prevPageCallback = this.props.prevPageCallback;

        switch(evt.keyCode) {
            case 10009: // Back/Return
                if (prevPageCallback) {
                    prevPageCallback();
                    this.destroy();
                }
                break;
            case 10182: // Exit/Home
                this.destroy();
                break;
            default:
                break;
        }
    }

    handleBannerKeydown (evt, action) {
        const { bannerItem, detailsButton, rows, playButton } = this;
        const row = rows[0];
        const wrapFocusToFirstRow = () => (row.previousSelection || row.tiles[0].view).focus();

        switch(evt.keyCode) {
            case 13: // Enter/Ok
            case 415: // Play
            case 10252: // Play/Pause
                action(bannerItem, evt);
                break;
            case 37: // Left Arrow
                playButton.focus();
                break;
            case 39: // Right Arrow
                if (evt.target === detailsButton) {
                    return wrapFocusToFirstRow();
                }
                detailsButton.focus();
                break;
            case 40: // Down Arrow
                wrapFocusToFirstRow()
                break;
            default: 
                break;
        }
    }

    destroy() {
        const { detailsButton, playButton, props, view } = this;
        if (view) {
            view.removeEventListener('keydown', this.handleKeydown);
        }
        if (playButton) {
            playButton.onkeydown = null;
        } 
        if (detailsButton) {
            detailsButton.onkeydown = null;
        }
        props.parent.view.removeChild(view);
    }

    play(config, evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.destroy();
        new Player(config, () => this.props.init());
    }

    describe(config, evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.destroy();
        new VideoDetail(config, () => this.props.init());
    }

}

let parser;

function createHTML(htmlString) {
    if (!parser) {
        parser = new DOMParser();
    }
    return parser.parseFromString(htmlString, 'text/html').body.firstChild;
}

function fetchFeed(pid) {
    const url = `https://cdn.jwplayer.com/v2/playlists/${pid}`;
    return fetch(url)
        .then(res => res.json())
        .catch(err => err);
}

function feedPromise(feed) {
    return new Promise((res, rej) => {
        if (!feed) {
            return rej(new Error('Error: No playlist found'));
        }

        const feedType = typeof feed;

        if (feedType === 'string') {
            return fetchFeed(feed).then(feed => res(feed)).catch(err => rej(err));
        }
        if (feedType === 'object') {
            return res(feed)
        }
        rej(new Error('Error: Unrecognized playlist format'));
    });    
}

function createBanner({ image, title }) {
    const banner = createHTML(playlistBannerTemplate({ image, title }));
    banner.src = image;
 
    return banner;
}
