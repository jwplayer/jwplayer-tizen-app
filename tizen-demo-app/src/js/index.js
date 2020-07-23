import { VideoDetail } from './video-detail';
import indexTemplate from './templates/index';
import '../css/jw-tizen.css';

function init() {
    const mainDiv = document.querySelector('#main');
    mainDiv.innerHTML = indexTemplate();
    addEventListeners();
}

function addEventListeners() {
    document.getElementById('LionVideoDetail').addEventListener('click', loadVideoDetail);
}

function removeEventListeners() {
    document.getElementById('LionVideoDetail').removeEventListener('click', loadVideoDetail);
}

function loadVideoDetail() {
    removeEventListeners();
    new VideoDetail(
        {
            'file': 'https://cdn.jwplayer.com/videos/V3D2hVQR-mjpS2Ylx.mp4',
            'title': 'Caminandes',
            'image': 'http://content.jwplatform.com/thumbs/V3D2hVQR-1280.jpg',
            'description': 'Caminandes is a short movie taking place in Southern Patagonia, South America.',
            'duration': 3
        },
        init
    );
}

window.onload = init;
