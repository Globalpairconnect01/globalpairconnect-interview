// ==========================================
// GLOBAL PAIR CONNECT - STEP 3
// CAMERA + INTERVIEW QUESTIONS
// ==========================================

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const interview = document.getElementById("interview");

const camera = document.getElementById("camera");

const progress = document.getElementById("progress");
const question = document.getElementById("question");

const nameInput = document.getElementById("name");
const appIDInput = document.getElementById("appID");
const emailInput = document.getElementById("email");

let stream = null;
let currentQuestion = 0;


// ==========================================
// QUESTIONS
// ==========================================

const questions = [
    "Tell us about yourself and explain why you would like to become an au pair.",
    "Describe your experience caring for children.",
    "Why do you want to live with a host family in Europe?",
    "Describe a challenging situation with a child and how you handled it.",
    "How would you manage homesickness while living abroad?",
    "What would you do if a child refused to follow your instructions?",
    "Describe what a normal working day as an au pair would look like.",
    "What personal qualities make you a good au pair?",
    "What would you do if you had a disagreement with your host family?",
    "Is there anything else you would like the Global Pair Connect team to know about you?"
];


// ==========================================
// START INTERVIEW
// ==========================================

startBtn.onclick = async function () {

    welcome.style.display = "none";
    identity.style.display = "block";

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user",
                width: {
                    ideal: 1280
                },
                height: {
                    ideal: 720
                }
            },
            audio: true
        });

        camera.srcObject = stream;

        camera.muted = true;
        camera.autoplay = true;
        camera.playsInline = true;

        await camera.play();

        console.log("Camera and microphone working.");

    } catch (error) {

        console.error(error);

        alert(
            "Camera could not start.\n\n" +
            error.name +
            "\n\nPlease allow camera and microphone access."
        );

    }
};


// ==========================================
// CONTINUE TO INTERVIEW
// ==========================================

continueBtn.onclick = function () {

    const name = nameInput.value.trim();
    const appID = appIDInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !appID || !email) {

        alert(
            "Please complete your Full Name, Application ID and Email."
        );

        return;
    }

    identity.style.display = "none";
    interview.style.display = "block";

    currentQuestion = 0;

    showQuestion();

};


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    progress.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;

    question.textContent =
        questions[currentQuestion];

}
