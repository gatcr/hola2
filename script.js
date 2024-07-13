const storyContainer = document.getElementById('story');
const choicesContainer = document.getElementById('choices');
const charactersContainer = document.createElement('div');
charactersContainer.id = 'characters';

let state = {};

function startGame() {
    state = {};
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
        text: "La puerta roja te lleva a un tesoro. ¡Has ganado!",
        choices: [
            { text: 'Volver a empezar', nextNode: 1 }
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
        text: "El lobo te ataca. Fin de la aventura.",
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
        button.onclick = () => showStoryNode(choice.nextNode);
        choicesContainer.appendChild(button);
    });

    if (nodeIndex === 1) {
        document.body.appendChild(charactersContainer);
    } else {
        if (document.body.contains(charactersContainer)) {
            document.body.removeChild(charactersContainer);
        }
    }
}

startGame();
