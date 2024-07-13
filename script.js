const storyContainer = document.getElementById('story');
const choicesContainer = document.getElementById('choices');
const charactersContainer = document.createElement('div');
charactersContainer.id = 'characters';

let state = {
    hasKey: false,
    hasTreasure: false
};

function startGame() {
    state = {
        hasKey: false,
        hasTreasure: false
    };
    showStoryNode(1);
}

const storyNodes = {
    1: {
        text: "Estás en una encrucijada en un bosque oscuro. Puedes ir a la izquierda hacia un camino iluminado o a la derecha hacia un sendero oscuro.",
        choices: [
            { text: 'Ir a la izquierda', nextNode: 2 },
            { text: 'Ir a la derecha', nextNode: 3 }
        ]
    },
    2: {
        text: "Caminas hacia la luz y encuentras una casa. Hay dos puertas, una roja y una azul.",
        choices: [
            { text: 'Abrir la puerta roja', nextNode: 4 },
            { text: 'Abrir la puerta azul', nextNode: 5 }
        ]
    },
    3: {
        text: "Te adentras en el sendero oscuro y te encuentras con un lobo. ¿Qué haces?",
        choices: [
            { text: 'Correr', nextNode: 6 },
            { text: 'Enfrentar al lobo', nextNode: 7 }
        ]
    },
    4: {
        text: "La puerta roja te lleva a una habitación. Encuentras una llave dorada.",
        choices: [
            { text: 'Tomar la llave', nextNode: 8 }
        ]
    },
    5: {
        text: "La puerta azul está cerrada con llave. No puedes avanzar.",
        choices: [
            { text: 'Volver', nextNode: 2 }
        ]
    },
    6: {
        text: "Corres y te caes en un agujero. Fin de la aventura.",
        choices: [
            { text: 'Volver a empezar', nextNode: 1 }
        ]
    },
    7: {
        text: "Enfrentas al lobo. Él te muestra el camino hacia un tesoro escondido.",
        choices: [
            { text: 'Seguir al lobo', nextNode: 9 }
        ]
    },
    8: {
        text: "Ahora tienes una llave dorada.",
        choices: [
            { text: 'Volver', nextNode: 2 }
        ]
    },
    9: {
        text: "Sigues al lobo y encuentras un tesoro brillante.",
        choices: [
            { text: 'Tomar el tesoro', nextNode: 10 }
        ]
    },
    10: {
        text: "¡Felicidades! Has encontrado el tesoro. Fin de la aventura.",
        choices: [
            { text: 'Volver a empezar', nextNode: 1 }
        ]
    },
    11: {
        text: "Encuentras una puerta secreta que solo se abre con la llave dorada.",
        choices: [
            { text: 'Abrir la puerta secreta', nextNode: 12 }
        ]
    },
    12: {
        text: "Has desbloqueado un final secreto. ¡Felicidades!",
        choices: [
            { text: 'Volver a empezar', nextNode: 1 }
        ]
    }
};

function showStoryNode(nodeIndex) {
    const node = storyNodes[nodeIndex];
    storyContainer.innerText = node.text;

    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }

    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.classList.add('choice-button');
        button.onclick = () => makeChoice(nodeIndex, choice.nextNode);
        choicesContainer.appendChild(button);
    });

    if (nodeIndex === 1) {
        document.body.appendChild(charactersContainer);
        createCharacter('hero', 'El Héroe');
    } else if (nodeIndex === 7) {
        createCharacter('villain', 'El Lobo');
    } else if (nodeIndex === 9 && !state.hasTreasure) {
        createCharacter('treasure', 'Tesoro');
    } else {
        clearCharacters();
    }
}

function createCharacter(id, name) {
    const character = document.createElement('div');
    character.classList.add('character');
    character.id = id;
    character.title = name;
    charactersContainer.appendChild(character);
}

function clearCharacters() {
    charactersContainer.innerHTML = '';
}

function makeChoice(currentNode, nextNode) {
    if (currentNode === 4 && nextNode === 8) {
        state.hasKey = true;
    } else if (currentNode === 9 && nextNode === 10) {
        state.hasTreasure = true;
    }
    showStoryNode(nextNode);
}

startGame();
