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
        this.view = createHTML(template(this.props.viewProps));
    }

    init() {
        if (this.props.parent) {
            this.props.parent.view.appendChild(this.view);
        }
    }
}

class Tile extends ViewModel {
    constructor(props, template) {
        super(props, template);
        this.handleKeydown = this.handleKeydown.bind(this);
    }
    
    init() {
        const { parent, focusCallback, playCallback, describeCallback } = this.props;
        const rowElement = parent && parent.view.querySelector('.jw-tizen-playlist-row');
        if (rowElement) {
            rowElement.appendChild(this.view);
        }
        if (focusCallback) {
            this.view.removeEventListener('focus', focusCallback);
            this.view.addEventListener('focus', focusCallback);
        }

        if (playCallback && describeCallback) {
            this.view.removeEventListener('keydown', this.handleKeydown);
            this.view.addEventListener('keydown', this.handleKeydown);
        }
    }

    handleKeydown(evt) {
        const { playCallback, describeCallback } = this.props

        switch(evt.keyCode) {
            case 13: // Enter/Ok
                describeCallback(evt);
                break;
            case 415: // Play
            case 10252: // Play/Pause
                playCallback(evt);
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

        const { playlistItems } = props;

        if (playlistItems && Array.isArray(playlistItems)) {
            this.createTiles(playlistItems);
        }
    }
    
    createTiles(playlistItems) {
        playlistItems.forEach(playlistItem => {
            const { title, image } = playlistItem;
            const tile = new Tile({ 
                viewProps: { title, image }, 
                parent: this,
                focusCallback: this.onTileFocused,
                playCallback: (evt) => this.props.parent.play(playlistItem, evt),
                describeCallback: (evt) => this.props.parent.describe(playlistItem, evt)
            }, playlistItemTemplate);
            this.tiles.push(tile);
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
            if (selection.previousSelection) {
                selection.previousSelection.focus();
            } else {
                selection.tiles[0] && selection.tiles[0].view && selection.tiles[0].view.focus();
            } 
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

    init() {
        this.view.removeEventListener('keydown', this.handleKeydown);
        this.view.addEventListener('keydown', this.handleKeydown);
        super.init();
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
        this.getData(props).then(playlists => {
            this.layout(playlists, props.bannerItem);
            this.playButton.focus();
        });
    }
    
    getData(props) {
        const playlistPromises = [];
        const { playlists } = props;
        if (playlists) {
            playlists.forEach(playlist => {
                playlistPromises.push(playlistPromise(playlist));
            });
        } 
        return Promise.all(playlistPromises);
    }

    layout(playlists, bannerItem) {
        if (!playlists || !playlists.length) {
            return;
        }
        this.createBanner(bannerItem, playlists);
        this.createRows(playlists)
    }

    createBanner(bannerItem, playlists) {
        if (!bannerItem) {
            bannerItem = Object.assign({}, playlists[0].playlist[0]);
            playlists[0].playlist.shift();
        }

        const banner = createBanner(bannerItem);
        this.view.appendChild(banner);
        this.playButton = banner.querySelector('.jw-tizen-play');
        this.detailsButton = this.playButton.nextElementSibling;
        this.playButton.onkeydown = (evt) => this.handleBannerKeydown(evt, this.play.bind(this));
        this.detailsButton.onkeydown = (evt) => this.handleBannerKeydown(evt, this.describe.bind(this));
        this.bannerItem = bannerItem;
    }

    createRows(playlists) {
        playlists.forEach((playlist, index) => {
            const playlistItems = playlist.playlist
            const { title } = playlist;
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
        switch(evt.keyCode) {
            case 10009: // Back/Return
                if (this.props.prevPageCallback) {
                    this.props.prevPageCallback();
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
        const wrapFocusToFirstRow = () => (this.rows[0].previousSelection || this.rows[0].tiles[0].view).focus();
        switch(evt.keyCode) {
            case 13: // Enter/Ok
            case 415: // Play
            case 10252: // Play/Pause
                action(this.bannerItem, evt);
                break;
            case 37: // Left Arrow
                this.playButton.focus();
                break;
            case 39: // Right Arrow
                if (evt.target === this.detailsButton) {
                    return wrapFocusToFirstRow();
                }
                this.detailsButton.focus();
                break;
            case 40: // Down Arrow
                wrapFocusToFirstRow()
                break;
            default: 
                break;
        }
    }

    init() {
        this.addEventListeners();
        this.props.parent.view.appendChild(this.view);
    }

    destroy() {
        if (this.view) {
            this.view.removeEventListener('keydown', this.handleKeydown);
        }
        if (this.playButton) {
            this.playButton.onkeydown = null;
        } 
        if (this.detailsButton) {
            this.detailsButton.onkeydown = null;
        }
        this.props.parent.view.removeChild(this.view);
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

function fetchPlaylist(playlist) {
    const url = `https://cdn.jwplayer.com/v2/playlists/${playlist}`;
    return fetch(url)
        .then(res => res.json())
        .catch(err => err);
}

function playlistPromise(playlist) {
    return new Promise((res, rej) => {
        if (!playlist) {
            return rej(new Error('Error: No playlist found'));
        }
        if (typeof playlist === 'string') {
            return fetchPlaylist(playlist).then(playlist => res(playlist)).catch(err => rej(err));
        }
        if (typeof playlist === 'object') {
            return res(playlist)
        }
        rej(new Error('Error: Unrecognized playlist format'));
    });    
}

function createBanner({ image, title }) {
    const banner = createHTML(playlistBannerTemplate({ image, title }));
    banner.src = image;
 
    return banner;
}
