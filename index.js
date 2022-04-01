const LOGICAL_TEST_APP = (function () {
    const size = {
        horizontal: 10,
        vertical: 5
    };

    let moves = [];

    let currentPlayerPosition = '1:1';

    const updatePlayerPosition = ({x, y}) => {
        const position = getCurrentPlayerPosition();

        if (x === null) {
            currentPlayerPosition = position[0] + ':' + y;
        }

        if (y === null) {
            currentPlayerPosition = x + ':' + position[1];
        }

        const nextPositionCoordinates = convertPositionToCoordinatesInDeck(currentPlayerPosition);

        const playerElement = document.getElementById('player');

        playerElement.style.top = nextPositionCoordinates.centerY + 'px';
        playerElement.style.left = nextPositionCoordinates.centerX + 'px';
    };

    const convertPositionToCoordinatesInDeck = (position) => {
        const coordinates = document.querySelector("[data-id='" + position +"']").getBoundingClientRect();
        const deckCoordinates = document.getElementById('deck').getBoundingClientRect();
        coordinates.centerX = (coordinates.x - deckCoordinates.x) + (coordinates.width * 0.5);
        coordinates.centerY = (coordinates.y - deckCoordinates.y) + (coordinates.height * 0.5);

        return coordinates;
    };

    /** @return array */
    const getCurrentPlayerPosition = () => {
        return currentPlayerPosition.split(':').map(Number);
    };

    const saveActions = (event) => {
        moves.push(event.target.id.replace('move-', ''));
        document.getElementById('moves').innerText += ', ' + event.target.id;
    };

    const handlePlay = (event) => {
        event.preventDefault();

        moves.forEach((move, i) => {
            setTimeout(() => {
                let newXPosition = null;
                let newYPosition = null;

                switch (move) {
                    case 'up':
                        newXPosition = getCurrentPlayerPosition()[0] - 1;
                        break;
                    case 'down':
                        newXPosition = getCurrentPlayerPosition()[0] + 1;
                        break;
                    case 'left':
                        newYPosition = getCurrentPlayerPosition()[1] - 1;
                        break;
                    case 'right':
                        newYPosition = getCurrentPlayerPosition()[1] + 1;
                        break;
                }
                updatePlayerPosition({x: newXPosition, y: newYPosition});
            }, i * 500);

        });
    };

    const setupPlayAction = () => {
        document.getElementById('play').addEventListener('click', handlePlay);
    };

    const setupActions = () => {
        document.querySelectorAll('.action button').forEach(element => {
            element.addEventListener('click', saveActions);
        });
    };

    const setupPlayer = () => {
        const player = `<span id="player"></span>`;

        document.getElementById('deck').innerHTML += player;

        const playerElement = document.getElementById('player');

        const playerCoordinates = convertPositionToCoordinatesInDeck(currentPlayerPosition);

        playerElement.style.top = playerCoordinates.centerY + 'px';
        playerElement.style.left = playerCoordinates.centerX + 'px';
    };

    const createDeck = () => {
        let deckTemplate = "";
        const boxTemplate = `<div class="tile" data-id="__rowNumber__:__columnNumber__">__rowNumber__:__columnNumber__</div>`;

        [...Array(size.vertical).keys()].forEach(rowNumber => {
            rowNumber++;
            [...Array(size.horizontal).keys()].forEach(columnNumber => {
                columnNumber++;
                deckTemplate += boxTemplate
                    .replaceAll('__rowNumber__', rowNumber + '')
                    .replaceAll('__columnNumber__', columnNumber + '');
            });
        });

        document.getElementById('tiles-container').innerHTML = deckTemplate;
    };

    const init = () => {
        createDeck();
        setupPlayer();
        setupActions();
        setupPlayAction();
    }

    return () => {
        return {
            init
        }
    }
})();

LOGICAL_TEST_APP().init()
