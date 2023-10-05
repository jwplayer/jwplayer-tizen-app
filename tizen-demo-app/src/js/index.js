import { Gallery } from './playlist';
import '../css/jw-tizen.css';

let gallery;

function init() {
    const mainDiv = document.getElementById('main');
    let feeds = ['EVcVD4iH', 'B8FTSH9D'];

    if (Array.isArray(jwplayer.feeds)) {
        feeds = jwplayer.feeds;
    } else if (typeof jwplayer.feeds === 'string') {
        feeds = [jwplayer.feeds];
    }

    gallery = new Gallery({ 
        feeds,
        parent: { view: mainDiv },
        init
    });
    gallery.init();
}

window.onload = init;
