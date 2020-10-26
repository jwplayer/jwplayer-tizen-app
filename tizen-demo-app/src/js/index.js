import { Gallery } from './playlist';
import '../css/jw-tizen.css';

let gallery;

function init() {
    const mainDiv = document.getElementById('main');
    gallery = new Gallery({ 
        feeds: ['EVcVD4iH', 'B8FTSH9D'],
        parent: { view: mainDiv },
        init
    });
    gallery.init();
}

window.onload = init;
