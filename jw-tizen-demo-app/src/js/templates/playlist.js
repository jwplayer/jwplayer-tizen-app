export function playlistGalleryTemplate() {
    return `<div class="jw-tizen-playlist-gallery"></div>`;
}

export function playlistRowTemplate({ title }) {
    return (
        `<div class="jw-tizen-row-container">
            <div class="jw-tizen-row-title jw-tizen-text">${title}</div>
            <div class="jw-tizen-playlist-row-wrapper">
                <div class="jw-tizen-playlist-row"></div>
            </div>
        </div>`);
}

export function playlistBannerTemplate({ image, title }) {
    return (
        `<div class="jw-tizen-banner">
            <div class="jw-tizen-banner-wrapper">
                <img class="jw-tizen-banner-background" src="${image}"></img>
            </div>
            <div class="jw-tizen-watch-now jw-tizen-text">Watch Now</div>
            <div class="jw-tizen-banner-title jw-tizen-text">${title}</div>
            <div class="jw-tizen-banner-buttons">
                <button class="jw-tizen-play jw-tizen-text" tabindex=0>Play</button>
                <button class="jw-tizen-details jw-tizen-text" tabindex=0>Details</button>
            </div>
        </div>`
    );
}

export function playlistItemTemplate({ image, title }) {
    return (
        `<div class="jw-tizen-playlist-item-container" tabindex=0>
            <div class="jw-tizen-playlist-item-image">
                <img src="${image}"></img>
            </div>
            <div class="jw-tizen-playlist-item-title jw-tizen-text">${title}</div>
        </div>` 
    );
}
