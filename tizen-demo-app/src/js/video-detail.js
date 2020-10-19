import VideoDetailTemplate from './templates/video-detail';
import Player from './player';

function button(name, onClickCallback) {
    const buttonEl = document.createElement('button');
    buttonEl.className = 'jw-tizen-text jw-tizen-button';
    buttonEl.textContent = name;
    buttonEl.onclick = onClickCallback;
    return buttonEl;
}

function getDurationMinutes(durationInSeconds) {
    if (!durationInSeconds) {
        return;
    }

    const dur = durationInSeconds / 60;
    if (dur < 1) {
        return dur.toFixed(1);
    }
    return Math.round(dur);
}

export class VideoDetail {
    constructor(config, prevPageCallback) {
        this.div = null;
        this.activeButton = null;
        this.keydownCallback = null;
        this.config = config;
        this.prevPageCallback = prevPageCallback;

        this.init();
    }

    init() {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'jw-tizen-page';
        this.div = pageDiv;

        const videoDetail = VideoDetailTemplate(
            this.config.title, 
            getDurationMinutes(this.config.duration),
            this.config.description
        );
        this.div.innerHTML = videoDetail;

        const previewImage = this.div.querySelector('.jw-tizen-preview');
        previewImage.style.backgroundImage = `url(${this.config.image})`;

        this.addButtons();

        // Remote Handlers
        const handleKeydown = (event) => {
            const activeButton = this.activeButton;
            const aboveButton = activeButton.previousElementSibling;
            const belowButton = activeButton.nextElementSibling;

            switch(event.keyCode) {
                case 38: // Up Arrow
                    if (aboveButton) {
                        aboveButton.focus();
                        this.activeButton = aboveButton;
                    }
                    break;
                case 40: // Down Arrow
                    if (belowButton) {
                        belowButton.focus();
                        this.activeButton = belowButton;
                    }
                    break;
                case 13: // Enter/Ok
                    this.activeButton.click();
                    break;
                case 415: // Play
                case 10252: // Play/Pause
                    this.play();
                    break;
                case 37: // Left Arrow
                case 10009: // Back/Return
                    this.prevPageCallback();
                    this.destroy();
                    break;
                case 10182: // Exit/Home
                    this.destroy();
                    break;
                default:
                    break;
            }
        }

        this.keydownCallback = handleKeydown;
        document.addEventListener('keydown', this.keydownCallback);

        const mainDiv = document.querySelector('#main');
        mainDiv.removeChild(mainDiv.firstElementChild);
        mainDiv.appendChild(this.div);
    }

    addButtons() {
        const buttonContainer = this.div.querySelector('.jw-tizen-button-container');
        const playButton = button('Play', () => this.play());

        buttonContainer.appendChild(playButton);
        playButton.focus();
        this.activeButton = playButton;
    }

    play() {
        this.destroy();
        new Player(this.config, () => this.init());
    }

    destroy() {
        if (this.keydownCallback) {
            document.removeEventListener('keydown', this.keydownCallback);
            this.keydownCallback = null;
        }
    }
}
