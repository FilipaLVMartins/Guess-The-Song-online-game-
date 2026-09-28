let score = 0;
let lives = 3; // Começa com 3 vidas
let currentLevel = 0;

const levels = [
    {
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        options: ["Cruel Summer", "SoundHelix Song 1", "Levitating", "Shape of You"],
        correctIndex: 1
    },
    {
        audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        options: ["Blinding Lights", "SoundHelix Song 2", "Watermelon Sugar", "Bad Guy"],
        correctIndex: 1
    }
];

function loadLevel() {
    let levelData = levels[currentLevel];
    
    let audio = document.getElementById("song");
    audio.src = levelData.audioSrc;
    audio.load();

    for (let i = 0; i < 4; i++) {
        document.getElementById("btn" + i).innerText = levelData.options[i];
    }

    document.getElementById("mensagem").innerText = "";
}

function playSong() {
    let audio = document.getElementById("song");
    audio.play();
}

function checkAnswer(chosenIndex) {
    let levelData = levels[currentLevel];
    let textoMensagem = document.getElementById("mensagem");
    let audio = document.getElementById("song");

    if (chosenIndex === levelData.correctIndex) {
        audio.pause();
        score = score + 10;
        document.getElementById("score").innerText = score;
        
        currentLevel++;

        if (currentLevel < levels.length) {
            textoMensagem.innerText = "Correct! Loading next song...";
            textoMensagem.className = "msg certo";
            setTimeout(loadLevel, 1500);
        } else {
            textoMensagem.innerText = "Congratulations! You beat the game!";
            textoMensagem.className = "msg certo";
            document.getElementById("options").style.display = "none";
        }
    } else {
        // Errou a resposta: perde uma vida
        lives--;
        document.getElementById("lives").innerText = lives;

        if (lives <= 0) {
            audio.pause();
            textoMensagem.innerText = "Game Over! You ran out of lives.";
            textoMensagem.className = "msg errado";
            // Esconde os botões para terminar o jogo
            document.getElementById("options").style.display = "none";
        } else {
            textoMensagem.innerText = `Wrong answer! You have ${lives} lives left.`;
            textoMensagem.className = "msg errado";
        }
    }
}

window.onload = loadLevel;