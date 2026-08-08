// ==========================================
// GLOBAL PAIR CONNECT INTERVIEW
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

let currentQuestion = 0;
let stream = null;

// HTML elements
const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const interview = document.getElementById("interview");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const camera = document.getElementById("camera");

const nameInput = document.getElementById("name");
const appIDInput = document.getElementById("appID");
const emailInput = document.getElementById("email");

const progress = document.getElementById("progress");
const question = document.getElementById("question");


// ==========================================
// START INTERVIEW
// ==========================================

startBtn.onclick = async function () {

  console.log("Start Interview clicked");

  welcome.style.display = "none";
  identity.style.display = "block";

  try {

    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    camera.srcObject = stream;

    console.log("Camera and microphone connected");

  } catch (error) {

    console.error(error);

    alert(
      "Camera and microphone access is required. " +
      "Please allow access and try again."
    );

  }
};


// ==========================================
// CONTINUE TO QUESTIONS
// ==========================================

continueBtn.onclick = function () {

  if (
    nameInput.value.trim() === "" ||
    appIDInput.value.trim() === "" ||
    emailInput.value.trim() === ""
  ) {

    alert("Please complete your name, Application ID and email.");

    return;
  }

  identity.style.display = "none";
  interview.style.display = "block";

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

  speakQuestion(
    questions[currentQuestion]
  );

}


// ==========================================
// READ QUESTION ALOUD
// ==========================================

function speakQuestion(text) {

  if (!("speechSynthesis" in window)) {
    return;
  }

  speechSynthesis.cancel();

  const speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";
  speech.rate = 0.95;

  speechSynthesis.speak(speech);

}
