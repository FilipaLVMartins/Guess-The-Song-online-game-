// --- CONFIGURAÇÃO DO SUPABASE ---
const SUPABASE_URL = "https://vbwqhhqvvyebebsfldpm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZid3FoaHF2dnllYmVic2ZsZHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3MTEzOTYsImV4cCI6MjEwNjI4NzM5Nn0.iBgSTsBZYHdawgFsfMlpb_YNyEVOe-jFvlZkazRzak0"; 

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// -----------------------------------------------------------------------

let username = "";
let score = 0;
let lives = 3;
let currentLevel = 0;
let activeLevels = []; 
let levelStartTime = 0;

const allLevels = [
    {
        audioSrc: "apologizetimbaland.mp3", 
        options: ["Apologize", "Counting Stars", "Good Life", "Secrets"],
        correctIndex: 0
    },
    {
        audioSrc: "billiejeanmickaeljackson.mp3", 
        options: ["Beat It", "Billie Jean", "Thriller", "Smooth Criminal"],
        correctIndex: 1
    },
    {
        audioSrc: "bloodstreamalyssagrace.mp3", 
        options: ["Bloodstream", "Stupid Love", "Here", "Seventeen"],
        correctIndex: 0
    },
    {
        audioSrc: "callmemaybecarlyraejepsen.mp3", 
        options: ["Good Time", "Call Me Maybe", "I Really Like You", "Curious"],
        correctIndex: 1
    },
    {
        audioSrc: "escapismraye.mp3", 
        options: ["Escapism", "Wildflower", "Prada", "Kill Bill"],
        correctIndex: 0
    },
    {
        audioSrc: "fourthofjulysufjanstevens.mp3", 
        options: ["Mystery of Love", "Fourth of July", "Chicago", "Casimir Pulaski Day"],
        correctIndex: 1
    },
    {
        audioSrc: "girlyouloudchrisbrown.mp3", 
        options: ["Under The Influence", "No Guidance", "Girl You Loud", "Sensational"],
        correctIndex: 2
    },
    {
        audioSrc: "hatethatimadeyoulovemearianagrande.mp3", 
        options: ["Hate That I Remember You", "Hate That I Made You Love Me", "Into You", "Break Up with Your Girlfriend"],
        correctIndex: 1
    },
    {
        audioSrc: "hotandcoldkatyperry.mp3", 
        options: ["Roar", "Firework", "Hot n Cold", "Dark Horse"],
        correctIndex: 2
    },
    {
        audioSrc: "lockedoutofheavenbrunomars.mp3", 
        options: ["Locked Out of Heaven", "Treasure", "24K Magic", "Uptown Funk"],
        correctIndex: 0
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
        audioSrc: "rollinginthedeepadele.mp3", 
        options: ["Someone Like You", "Hello", "Rolling in the Deep", "Set Fire to the Rain"],
        correctIndex: 2
    },
    {
        audioSrc: "runawayaurora.mp3", 
        options: ["Runaway", "Running with the Wolves", "Cure for Me", "Queendom"],
        correctIndex: 0
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
        audioSrc: "theresnothingholdingmebackshawnmendes.mp3", 
        options: ["Stitches", "Senorita", "Treat You Better", "There's Nothing Holdin' Me Back"],
        correctIndex: 3
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
    },
    {
        audioSrc: "honeybeeoliviarodrigo.mp3",
        options: ["Honeybee", "vampire", "driver's license", "deja vu"],
        correctIndex: 0
    },
    {
        audioSrc: "latch.mp3",
        options: ["Latch", "Omen", "Stay With Me", "White Noise"],
        correctIndex: 0
    },
    {
        audioSrc: "breakupwithyourgirlfriend.mp3",
        options: ["7 rings", "thank u, next", "break up with your girlfriend, i'm bored", "positions"],
        correctIndex: 2
    },
    {
        audioSrc: "trustissuestheweeknd.mp3",
        options: ["Starboy", "Trust Issues", "Blinding Lights", "The Hills"],
        correctIndex: 1
    },
    {
        audioSrc: "Jealou$y.mp3",
        options: ["Jealou$y", "Sweater Weather", "Daddy Issues", "R.I.P. 2 My Youth"],
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
    
    let shuffledPool = [...allLevels].sort(() => Math.random() - 0.5);
    activeLevels = shuffledPool.slice(0, 10);

    score = 0;
    lives = 3;
    currentLevel = 0;

    document.getElementById("login-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("player-display").innerText = username;
    document.getElementById("score").innerText = score;

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
    let levelData = activeLevels[currentLevel];
    let audio = document.getElementById("song");
    audio.src = levelData.audioSrc;
    audio.load();

    for (let i = 0; i < 4; i++) {
        document.getElementById("btn" + i).innerText = levelData.options[i];
    }
    document.getElementById("mensagem").innerText = "";
    
    // Tocar a música automaticamente ao carregar o nível
    audio.play().then(() => {
        startEqualizer();
    }).catch(error => {
        console.log("Autoplay prevented by browser, waiting for user interaction:", error);
    });

    levelStartTime = Date.now();
}

// O botão agora funciona como indicador visual ("Song Playing 🎶") mas se clicares também pausa/retoma
function playSong() {
    let audio = document.getElementById("song");
    let playBtn = document.getElementById("play-btn"); // Ajusta o ID se necessário conforme o teu HTML
    if (audio.paused) {
        audio.play();
        startEqualizer();
    } else {
        audio.pause();
        stopEqualizer();
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
    let levelData = activeLevels[currentLevel];
    let textoMensagem = document.getElementById("mensagem");
    let audio = document.getElementById("song");

    if (chosenIndex === levelData.correctIndex) {
        audio.pause();
        stopEqualizer();
        
        let timeElapsed = (Date.now() - levelStartTime) / 1000;
        let earnedPoints = 10;

        if (timeElapsed <= 3) {
            earnedPoints = 20; 
        } else if (timeElapsed <= 6) {
            earnedPoints = 15; 
        } else {
            earnedPoints = 10; 
        }

        score += earnedPoints;
        document.getElementById("score").innerText = score;
        
        textoMensagem.innerText = `Awesome! Correct! (+${earnedPoints} pts ⚡)`;
        textoMensagem.className = "msg certo";

        triggerLargeConfetti();

        currentLevel++;

        if (currentLevel < activeLevels.length) {
            setTimeout(nextLevelTransition, 1300);
        } else {
            setTimeout(() => endGame("🎉 Congratulations! You completed all rounds!"), 1300);
        }
    } else {
        lives--;
        triggerHeartFromLives();
        updateLivesDisplay();

        if (lives <= 0) {
            audio.pause();
            stopEqualizer();
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

function triggerLargeConfetti() {
    confetti({
        particleCount: 150,
        spread: 120,
        origin: { x: 0.5, y: 0 },
        colors: ['#8b5cf6', '#c4b5fd', '#3b82f6', '#ffffff', '#a78bfa', '#ec4899']
    });

    setTimeout(() => {
        confetti({ particleCount: 70, angle: 60, spread: 80, origin: { x: 0, y: 0.3 } });
        confetti({ particleCount: 70, angle: 120, spread: 80, origin: { x: 1, y: 0.3 } });
    }, 200);
}

function triggerHeartFromLives() {
    let livesElement = document.getElementById("lives");
    let rect = livesElement.getBoundingClientRect();
    
    let container = document.getElementById("animation-container");
    let heart = document.createElement("div");
    heart.className = "falling-heart";
    heart.innerHTML = "💔";
    
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
    stopEqualizer();

    document.getElementById("game-screen").style.display = "none";
    document.getElementById("scoreboard-screen").style.display = "block";
    
    document.getElementById("final-msg").innerText = finalMessage;
    document.getElementById("final-score").innerText = score;

    saveScoreAndShowLeaderboard();
}

// Envia a pontuação para a base de dados online e vai buscar o top global
async function saveScoreAndShowLeaderboard() {
    try {
        // Enviar para o Supabase
        await supabaseClient
            .from('leaderboard')
            .insert([{ name: username, score: score }]);
    } catch (err) {
        console.error("Error saving score online:", err);
    }

    // Buscar o Top 5 global da base de dados
    try {
        let { data: scores, error } = await supabaseClient
            .from('leaderboard')
            .select('name, score')
            .order('score', { ascending: false })
            .limit(5);

        if (error) throw error;

        let listElement = document.getElementById("leaderboard-list");
        listElement.innerHTML = "";

        if (scores && scores.length > 0) {
            scores.forEach((item) => {
                let li = document.createElement("li");
                li.innerHTML = `<span>👤 ${item.name}</span> <span>⭐ ${item.score} pts</span>`;
                listElement.appendChild(li);
            });
        } else {
            listElement.innerHTML = "<li>No scores yet</li>";
        }
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
    }
}