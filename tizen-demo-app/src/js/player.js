/* eslint-disable no-undef */
export default function(config, prevPageCallback) {
    const playerDiv = document.createElement('div');
    playerDiv.id = 'tizen-player';

    const mainDiv = document.querySelector('#main');
    mainDiv.removeChild(mainDiv.firstElementChild);
    mainDiv.appendChild(playerDiv);

    const handleKeydown = (event) => {
        switch(event.keyCode) {
            case 10009: // Back/Return
                if (jwplayer().getState() === 'error') {
                    onBackClick();
                }
                break;
            default:
                break;
        }
    }

    jwplayer('tizen-player').setup(config);

    jwplayer().on('backClick', () => onBackClick());
    document.addEventListener('keydown', handleKeydown);

    function onBackClick() {
        prevPageCallback();
        document.removeEventListener('keydown', handleKeydown);
    }
}
