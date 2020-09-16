export default function(prevPageCallback) {
    const playerElement = document.getElementById('tizen-player');

    playerElement.style.width = '100%';
    playerElement.style.height = '100%';

    const exitButton = createExitButton(prevPageCallback);
    const infoContainer = playerElement.getElementsByClassName('jw-info-container')[0];
    infoContainer.appendChild(exitButton);

    styleErrorContainer(playerElement);

    // Remote Handlers
    const handleKeydown = (event) => {
        switch(event.keyCode) {
            case 13: // Enter/Ok
                document.removeEventListener('keydown', handleKeydown);
                exitButton.click();
                break;
            case 10009: // Back/Return
                document.removeEventListener('keydown', handleKeydown);
                prevPageCallback();
                break;
            case 10182: // Exit/Home
                document.removeEventListener('keydown', handleKeydown);
                break;
            default:
                break;
        }
    }

    document.addEventListener('keydown', handleKeydown);
}

function styleErrorContainer(playerElement) {
    playerElement.style.backgroundColor = 'black';

    const errorMsg = playerElement.getElementsByClassName('jw-error-msg')[0];

    const errorIcon = errorMsg.getElementsByClassName('jw-icon')[0];
    errorIcon.style.width = '100px';
    errorIcon.style.height = '100px';

    const infoContainer = errorMsg.getElementsByClassName('jw-info-container')[0];
    infoContainer.style.marginLeft = '80px';

    const errorText = infoContainer.getElementsByClassName('jw-error-text')[0];
    errorText.style.fontSize = '50px';
}

function createExitButton(onClickCallback) {
    const button = document.createElement('button');
    button.className = 'jw-tizen-text jw-tizen-button';
    button.textContent = 'Exit';
    button.onclick = onClickCallback;
    return button;
}
