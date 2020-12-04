import ErrorState from './error';

/* eslint-disable no-undef */
export default function(config, prevPageCallback) {
    const playerDiv = document.createElement('div');
    playerDiv.id = 'tizen-player';

    const mainDiv = document.querySelector('#main');
    if (mainDiv.firstElementChild) {
        mainDiv.removeChild(mainDiv.firstElementChild);
    }
    mainDiv.appendChild(playerDiv);

    // Always set autostart true
    Object.assign(config, {'autostart': true});
    jwplayer('tizen-player').setup(config);

    jwplayer().on('error', () => ErrorState(prevPageCallback));
    jwplayer().on('setupError', () => ErrorState(prevPageCallback));

    jwplayer().on('backClick', () => onBackClick());

    function onBackClick() {
        mainDiv.removeChild(mainDiv.firstElementChild);
        prevPageCallback();
    }
}
