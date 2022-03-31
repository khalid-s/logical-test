const LOGICAL_TEST_APP = (function () {
    const size = {
        horizontal: 10,
        vertical: 5
    };

    let moves = [];

    let currentPlayerPosition = '1:1';

    const updateCurrentPlayerPosition = ({x, y}) => {
        const position = getCurrentPlayerPosition();

        if (x === null) {
            currentPlayerPosition = position[0] + ':' + y;
        }

        if (y === null) {
            currentPlayerPosition = x + ':' + position[1];
        }

        console.log(currentPlayerPosition);
        /** @todo récupérer les cordonnées de la prochaine case. On calcul le centre de la case. on calcul le déplacement nécessaire au player. */
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

        moves.forEach(move => {
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
            updateCurrentPlayerPosition({x: newXPosition, y: newYPosition});
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

    /** @param position string '1:1' */
    const convertPositionToCoordinates = (position) => {
        return document.querySelector("[data-id='" + position +"']").getBoundingClientRect();
    };

    const setupPlayer = () => {
        const player = `<span class="player"></span>`;

        document.getElementById('deck').innerHTML += player;
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
