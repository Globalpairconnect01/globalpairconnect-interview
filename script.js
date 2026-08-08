// ==========================================
// GLOBAL PAIR CONNECT INTERVIEW
// CAMERA + QUESTIONS + RECORDING + TIMER
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
// HTML ELEMENTS
// ==========================================

const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const interview = document.getElementById("interview");
const finish = document.getElementById("finish");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const nextBtn = document.getElementById("nextBtn");

const camera = document.getElementById("camera");
const preview = document.getElementById("preview");

const progress = document.getElementById("progress");
const question = document.getElementById("question");
const time = document.getElementById("time");

const nameInput = document.getElementById("name");
const appIDInput = document.getElementById("appID");
const emailInput = document.getElementById("email");
const languageInput = document.getElementById("language");


// ==========================================
// VARIABLES
// ==========================================

let stream = null;
let mediaRecorder = null;
let recordedChunks = [];

let currentQuestion = 0;

let timer = null;
let seconds = 0;


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

        // Identity page camera
        camera.srcObject = stream;

        camera.muted = true;
        camera.autoplay = true;
        camera.playsInline = true;

        await camera.play();

        console.log("Camera and microphone working.");

    } catch (error) {

        console.error("Camera error:", error);

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

    // IMPORTANT:
    // Put the SAME camera stream into the interview preview
    preview.srcObject = stream;

    preview.muted = true;
    preview.autoplay = true;
    preview.playsInline = true;

    preview.play();

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

    startTimer();

    speakQuestion(
        questions[currentQuestion]
    );
}


// ==========================================
// READ QUESTION
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


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    clearInterval(timer);

    seconds = 0;

    time.textContent = "00:00";

    timer = setInterval(function () {

        seconds++;

        const minutes =
            Math.floor(seconds / 60);

        const secs =
            seconds % 60;

        time.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(secs).padStart(2, "0");

    }, 1000);
}


// ==========================================
// START RECORDING
// ==========================================

recordBtn.onclick = function () {

    if (!stream) {

        alert("Camera is not ready.");

        return;
    }

    if (!window.MediaRecorder) {

        alert(
            "Video recording is not supported by this browser."
        );

        return;
    }

    recordedChunks = [];

    try {

        mediaRecorder =
            new MediaRecorder(stream);

    } catch (error) {

        console.error(error);

        alert(
            "Unable to start video recording."
        );

        return;
    }


    mediaRecorder.ondataavailable =
        function (event) {

            if (event.data.size > 0) {

                recordedChunks.push(
                    event.data
                );
            }
        };


    mediaRecorder.onstop =
        function () {

            const videoBlob =
                new Blob(
                    recordedChunks,
                    {
                        type: "video/webm"
                    }
                );

            console.log(
                "Recording finished:",
                videoBlob.size,
                "bytes"
            );

            alert(
                "Recording completed for Question " +
                (currentQuestion + 1) +
                "."
            );
        };


    mediaRecorder.start();

    recordBtn.disabled = true;
    stopBtn.disabled = false;

    console.log("Recording started.");
};


// ==========================================
// STOP RECORDING
// ==========================================

stopBtn.onclick = function () {

    if (
        mediaRecorder &&
        mediaRecorder.state === "recording"
    ) {

        mediaRecorder.stop();

        recordBtn.disabled = false;
        stopBtn.disabled = true;

        console.log("Recording stopped.");
    }
};


// ==========================================
// NEXT QUESTION
// ==========================================

nextBtn.onclick = function () {

    // Stop recording if still recording
    if (
        mediaRecorder &&
        mediaRecorder.state === "recording"
    ) {

        mediaRecorder.stop();

        recordBtn.disabled = false;
        stopBtn.disabled = true;
    }

    currentQuestion++;

    if (
        currentQuestion >=
        questions.length
    ) {

        finishInterview();

        return;
    }

    showQuestion();
};


// ==========================================
// FINISH
// ==========================================

function finishInterview() {

    clearInterval(timer);

    speechSynthesis.cancel();

    interview.style.display = "none";
    finish.style.display = "block";

    if (stream) {

        stream.getTracks().forEach(
            function (track) {
                track.stop();
            }
        );
    }

    console.log(
        "Interview completed."
    );
}


// ==========================================
// INITIAL BUTTON STATE
// ==========================================

recordBtn.disabled = false;
stopBtn.disabled = true;

console.log(
    "GLOBAL PAIR CONNECT INTERVIEW SCRIPT LOADED"
);
