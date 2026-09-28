let score = 0;
let lives = 3;
let currentLevel = 0;

// Função para atualizar os corações no ecrã
function updateLivesDisplay() {
    let hearts = "";
    for (let i = 0; i < lives; i++) {
        hearts += "❤️";
    }
    document.getElementById("lives").innerText = hearts;
}

// Lista das 10 rondas baseadas nas tuas músicas
const levels = [
    {
        audioSrc: "escapismraye.mp3", // escapism raye
        options: ["Escapism", "Wildflower", "Prada", "Kill Bill"],
        correctIndex: 0
    },
    {
        audioSrc: "girlyouloudchrisbrown.mp3", // girl you loud chris b...
        options: ["Under The Influence", "No Guidance", "Girl You Loud", "Sensational"],
        correctIndex: 2
    },
    {
        audioSrc: "loyaltykendriklamar.mp3", // loyalty kendriklamar
        options: ["HUMBLE.", "DNA.", "LOYALTY.", "Not Like Us"],
        correctIndex: 2
    },
    {
        audioSrc: "neverbethesamecamilacabello.mp3", // never be the same c...
        options: ["Havana", "Never Be the Same", "Senorita", "Liar"],
        correctIndex: 1
    },
    {
        audioSrc: "neverforgetyouzaralarsson.mp3", // never forget you zar...
        options: ["Lush Life", "Never Forget You", "Ain't My Fault", "Symphony"],
        correctIndex: 1
    },
    {
        audioSrc: "saopaulotheweeknd.mp3", // são paulo the week...
        options: ["Blinding Lights", "São Paulo", "Starboy", "Timeless"],
        correctIndex: 1
    },
    {
        audioSrc: "secretdoorarticmonkeys.mp3", // secret door artic m...
        options: ["Do I Wanna Know?", "Fluorescent Adolescent", "Secret Door", "Arabella"],
        correctIndex: 2
    },
    {
        audioSrc: "thecureoliviarodrigo.mp3", // the cure olivia rodri...
        options: ["driver's license", "vampire", "good 4 u", "The Cure"],
        correctIndex: 3
    },
    {
        audioSrc: "wedonttalkanymorecharlieputh.mp3", // we dont talk anymo...
        options: ["Attention", "Light Switch", "Left and Right", "We Don't Talk Anymore"],
        correctIndex: 3
    },
    {
        audioSrc: "wildflowerbillie.mp3", // wildflower billie
        options: ["Wildflower", "Birds of a Feather", "Ocean Eyes", "Bad Guy"],
        correctIndex: 0
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
            textoMensagem.innerText = "Awesome! Next song loading...";
            textoMensagem.className = "msg certo";
            setTimeout(loadLevel, 1500);
        } else {
            textoMensagem.innerText = "🎉 Congratulations! You completed all 10 rounds!";
            textoMensagem.className = "msg certo";
            document.getElementById("options").style.display = "none";
        }
    } else {
        lives--;
        updateLivesDisplay();

        if (lives <= 0) {
            audio.pause();
            textoMensagem.innerText = "💥 Game Over! You ran out of hearts.";
            textoMensagem.className = "msg errado";
            document.getElementById("options").style.display = "none";
        } else {
            textoMensagem.innerText = "Wrong answer! Try again.";
            textoMensagem.className = "msg errado";
        }
    }
}

window.onload = function() {
    updateLivesDisplay();
    loadLevel();
};