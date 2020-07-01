import videoDetailTemplate from './templates/video-detail';

function button(name, onClickCallback) {
    const buttonEl = document.createElement('button');
    buttonEl.className = 'jw-tizen-text jw-tizen-button';
    buttonEl.textContent = name;
    buttonEl.onclick = onClickCallback;
    return buttonEl;
}

export class VideoDetail {
    constructor(config, prevPageCallback) {
        this.div = null;
        this.activeButton = null;
        this.keydownCallback = null;
        this.prevPageCallback = prevPageCallback;

        this.init(config);
    }

    init(config) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'jw-tizen-page';
        this.div = pageDiv;

        const videoDetail = videoDetailTemplate(config.title, config.duration, config.description);
        this.div.innerHTML = videoDetail;

        const previewImage = this.div.querySelector('.jw-tizen-preview');
        previewImage.style.backgroundImage = `url(${config.thumbnail})`;

        this.addButtons();

        // Remote Handlers
        const handleKeydown = (event) => {
            const activeButton = this.activeButton;
            const aboveButton = activeButton.previousElementSibling;
            const belowButton = activeButton.nextElementSibling;

            switch(event.keyCode) {
                case 38: // Up Arrow
                    if (aboveButton) {
                        activeButton.classList.remove('jw-active');
                        aboveButton.classList.add('jw-active');
                        this.activeButton = aboveButton;
                    }
                    break;
                case 40: // Down Arrow
                    if (belowButton) {
                        activeButton.classList.remove('jw-active');
                        belowButton.classList.add('jw-active');
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

        document.addEventListener('keydown', handleKeydown);
        this.keydownCallback = handleKeydown;

        const mainDiv = document.querySelector('#Main');
        mainDiv.removeChild(mainDiv.firstElementChild);
        mainDiv.appendChild(this.div);
    }

    addButtons() {
        const buttonContainer = this.div.querySelector('.jw-tizen-button-container');

        const playButton = button('Play', this.play);
        playButton.classList.add('jw-active');
        buttonContainer.appendChild(playButton);
        this.activeButton = playButton;

        const extraButton1 = button('EXTRA 1', () => alert('E1'));
        buttonContainer.appendChild(extraButton1);

        const extraButton2 = button('EXTRA 2', () => alert('E2'));
        buttonContainer.appendChild(extraButton2);
    }

    play() {
        alert('Play');
    }

    destroy() {
        if (this.keydownCallback) {
            document.removeEventListener('keydown', this.keydownCallback);
            this.keydownCallback = null;
        }
    }
}
