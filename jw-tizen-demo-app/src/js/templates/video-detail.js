export default (title, duration, description) => {
    return (
        `<div class="jw-tizen-video-detail">
            <div class="jw-tizen-preview"></div>
            <div class="jw-tizen-content">
                <div class="jw-tizen-title"><span class="jw-tizen-text">${title}</span></div>
                ${duration ? `<div class="jw-tizen-text jw-tizen-duration">${duration} minutes</div>` : ``}
                <div class="jw-tizen-text jw-tizen-description">${description}</div>
                <div class="jw-tizen-button-container"></div>
            </div>
        </div>`
    );
};
