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
        audioSrc: "hotandcoldkatyperry.mp3", 
        options: ["Roar", "Firework", "Hot n Cold", "Dark Horse"],
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

function enterGame() {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("login-screen").style.display = "block";
}

function startGame() {
    let inputVal = document.getElementById("username-input").value.trim();
    if (inputVal === "") {
        alert("Please enter a valid name!");
        return;
    }
    username = inputVal;
    
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("player-display").innerText = username;

    updateLivesDisplay();
    loadLevel();
}

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
    stopEqualizer();
}

function playSong() {
    let audio = document.getElementById("song");
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function startEqualizer() {
    let eq = document.getElementById("equalizer");
    if (eq) eq.classList.remove("paused");
}

function stopEqualizer() {
    let eq = document.getElementById("equalizer");
    if (eq) eq.classList.add("paused");
}

function checkAnswer(chosenIndex) {
    let levelData = levels[currentLevel];
    let textoMensagem = document.getElementById("mensagem");
    let audio = document.getElementById("song");

    if (chosenIndex === levelData.correctIndex) {
        audio.pause();
        score += 10;
        document.getElementById("score").innerText = score;
        
        textoMensagem.innerText = "Awesome! Correct!";
        textoMensagem.className = "msg certo";

        // Confetis ampliados para ocupar uma maior área do ecrã
        triggerLargeConfetti();

        currentLevel++;

        if (currentLevel < levels.length) {
            setTimeout(nextLevelTransition, 1200);
        } else {
            setTimeout(() => endGame("🎉 Congratulations! You completed all rounds!"), 1200);
        }
    } else {
        lives--;
        
        // CORAÇÃO A CAIR EXATAMENTE DA ZONA DAS VIDAS
        triggerHeartFromLives();

        updateLivesDisplay();

        if (lives <= 0) {
            audio.pause();
            setTimeout(() => endGame("💥 Game Over! You ran out of hearts."), 1000);
        } else {
            textoMensagem.innerText = "Wrong answer! Try again.";
            textoMensagem.className = "msg errado";
        }
    }
}

function nextLevelTransition() {
    let wrapper = document.getElementById("level-content-wrapper");
    wrapper.classList.add("slide-out-left");

    setTimeout(() => {
        loadLevel();
        wrapper.classList.remove("slide-out-left");
        wrapper.classList.add("slide-in-right");

        setTimeout(() => {
            wrapper.classList.remove("slide-in-right");
        }, 50);
    }, 350);
}

// Confetis expandidos (maior quantidade, espalhados por todo o topo)
function triggerLargeConfetti() {
    confetti({
        particleCount: 150,
        spread: 120,
        origin: { x: 0.5, y: 0 },
        colors: ['#8b5cf6', '#c4b5fd', '#3b82f6', '#ffffff', '#a78bfa', '#ec4899']
    });

    // Lançamentos laterais para cobrir toda a área da página
    setTimeout(() => {
        confetti({ particleCount: 70, angle: 60, spread: 80, origin: { x: 0, y: 0.3 } });
        confetti({ particleCount: 70, angle: 120, spread: 80, origin: { x: 1, y: 0.3 } });
    }, 200);
}

// Faz o coração surgir exatamente no elemento das vidas e cair
function triggerHeartFromLives() {
    let livesElement = document.getElementById("lives");
    let rect = livesElement.getBoundingClientRect();
    
    let container = document.getElementById("animation-container");
    let heart = document.createElement("div");
    heart.className = "falling-heart";
    heart.innerHTML = "💔";
    
    // Posiciona exatamente no centro horizontal do elemento das vidas
    let startX = rect.left + (rect.width / 2) - 10;
    let startY = rect.top;

    heart.style.left = startX + "px";
    heart.style.top = startY + "px";
    
    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

function endGame(finalMessage) {
    let audio = document.getElementById("song");
    audio.pause();

    document.getElementById("game-screen").style.display = "none";
    document.getElementById("scoreboard-screen").style.display = "block";
    
    document.getElementById("final-msg").innerText = finalMessage;
    document.getElementById("final-score").innerText = score;

    saveScoreAndShowLeaderboard();
}

function saveScoreAndShowLeaderboard() {
    let scores = JSON.parse(localStorage.getItem("guessTheSongScores")) || [];
    
    scores.push({ name: username, score: score });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);
    
    localStorage.setItem("guessTheSongScores", JSON.stringify(scores));

    let listElement = document.getElementById("leaderboard-list");
    listElement.innerHTML = "";

    scores.forEach((item) => {
        let li = document.createElement("li");
        li.innerHTML = `<span>👤 ${item.name}</span> <span>⭐ ${item.score} pts</span>`;
        listElement.appendChild(li);
    });
}