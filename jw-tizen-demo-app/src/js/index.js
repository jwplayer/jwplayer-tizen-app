import { Gallery } from './playlist';
import '../css/jw-tizen.css';

let gallery;

function init() {
    const mainDiv = document.getElementById('main');
    gallery = new Gallery({ 
        feeds: ['T87GRa1a', 'sCpyC6OY'],
        parent: { view: mainDiv },
        init
    });
    gallery.init();
}

window.onload = init;
