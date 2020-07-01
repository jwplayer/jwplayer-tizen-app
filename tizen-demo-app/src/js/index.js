import { VideoDetail } from './video-detail';
import indexTemplate from './templates/index';
import '../css/jw-tizen.css';

function init() {
    const mainDiv = document.querySelector('#Main');
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
            title: 'How Wild Animals are Affected by Coronavirus Lockdown',
            description: 'While some animals are thriving in a world without humans, others might actually be hurting during this lockdown.',
            duration: 12,
            thumbnail: 'https://www.publicdomainpictures.net/pictures/250000/velka/lion-sunset-silhouette.jpg'
        },
        init
    );
}

window.onload = init;
