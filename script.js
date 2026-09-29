let username = "";
let score = 0;
let lives = 3;
let currentLevel = 0;

const levels = [
    {
        audioSrc: "escapismraye.mp3", 
        options: ["Escapism", "Wildflower", "Prada", "Kill Bill"],
        correctIndex: 0
    },
    {
        audioSrc: "girlyouloudchrisbrown.mp3", 
        options: ["Under The Influence", "No Guidance", "Girl You Loud", "Sensational"],
        correctIndex: 2
    },
    {
        audioSrc: "loyaltykendriklamar.mp3", 
        options: ["HUMBLE.", "DNA.", "LOYALTY.", "Not Like Us"],
        correctIndex: 2
    },
    {
        audioSrc: "neverbethesamecamilacabello.mp3", 
        options: ["Havana", "Never Be the Same", "Senorita", "Liar"],
        correctIndex: 1
    },
    {
        audioSrc: "neverforgetyouzaralarsson.mp3", 
        options: ["Lush Life", "Never Forget You", "Ain't My Fault", "Symphony"],
        correctIndex: 1
    },
    {
        audioSrc: "saopaulotheweeknd.mp3", 
        options: ["Blinding Lights", "São Paulo", "Starboy", "Timeless"],
        correctIndex: 1
    },
    {
        audioSrc: "secretdoorarticmonkeys.mp3", 
        options: ["Do I Wanna Know?", "Fluorescent Adolescent", "Secret Door", "Arabella"],
        correctIndex: 2
    },
    {
        audioSrc: "thecureoliviarodrigo.mp3", 
        options: ["driver's license", "vampire", "good 4 u", "The Cure"],
        correctIndex: 3
    },
    {
        audioSrc: "wedonttalkanymorecharlieputh.mp3", 
        options: ["Attention", "Light Switch", "Left and Right", "We Don't Talk Anymore"],
        correctIndex: 3
    },
    {
        audioSrc: "wildflowerbillie.mp3", 
        options: ["Wildflower", "Birds of a Feather", "Ocean Eyes", "Bad Guy"],
        correctIndex: 0
    }
];

// Iniciar o jogo após o login
function startGame() {
    let inputVal = document.getElementById("username-input").value.trim();
    if (inputVal === "") {
        alert("Por favor, insere um nome válido!");
        return;
    }
    username = inputVal;
    
    // Esconder ecrã de login e mostrar o jogo
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("player-display").innerText = username;

    updateLivesDisplay();
    loadLevel();
}

// Atualizar corações de vidas
function updateLivesDisplay() {
    let hearts = "";
    for (let i = 0; i < lives; i++) {
        hearts += "❤️";
    }
    document.getElementById("lives").innerText = hearts;
}

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
        score += 10;
        document.getElementById("score").innerText = score;
        
        currentLevel++;

        if (currentLevel < levels.length) {
            textoMensagem.innerText = "Awesome! Next song loading...";
            textoMensagem.className = "msg certo";
            setTimeout(loadLevel, 1500);
        } else {
            endGame("🎉 Parabéns! Completaste todas as rondas!");
        }
    } else {
        lives--;
        updateLivesDisplay();

        if (lives <= 0) {
            audio.pause();
            endGame("💥 Game Over! Acabaram-se os corações.");
        } else {
            textoMensagem.innerText = "Wrong answer! Try again.";
            textoMensagem.className = "msg errado";
        }
    }
}

// Função para terminar o jogo e guardar pontuação
function endGame(mensagemFinal) {
    let audio = document.getElementById("song");
    audio.pause();

    document.getElementById("game-screen").style.display = "none";
    document.getElementById("scoreboard-screen").style.display = "block";
    
    document.getElementById("final-msg").innerText = mensagemFinal;
    document.getElementById("final-score").innerText = score;

    saveScoreAndShowLeaderboard();
}

// Guardar pontuações no LocalStorage e exibir tabela
function saveScoreAndShowLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("guessTheSongScores")) || [];
    
    // Adicionar o jogador atual
    scores.push({ name: username, score: score });
    
    // Ordenar da maior pontuação para a menor
    scores.sort((a, b) => b.score - a.score);
    
    // Manter apenas os top 5
    scores = scores.slice(0, 5);
    
    localStorage.setItem("guessTheSongScores", JSON.stringify(scores));

    // Mostrar na tabela HTML
    let listElement = document.getElementById("leaderboard-list");
    listElement.innerHTML = "";

    scores.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = `${item.name} — ${item.score} pts`;
        listElement.appendChild(li);
    });
}