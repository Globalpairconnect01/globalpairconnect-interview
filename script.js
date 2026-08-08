console.log("GLOBAL PAIR CONNECT - INTERVIEW VERSION");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const interview = document.getElementById("interview");

const camera = document.getElementById("camera");
const preview = document.getElementById("preview");

const progress = document.getElementById("progress");
const question = document.getElementById("question");
const time = document.getElementById("time");

const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopBtn");
const nextBtn = document.getElementById("nextBtn");

const nameInput = document.getElementById("name");
const appIDInput = document.getElementById("appID");
const emailInput = document.getElementById("email");

let stream = null;
let mediaRecorder = null;
let recordedChunks = [];
let timer = null;
let seconds = 0;

let currentQuestion = 0;

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
                facingMode: "user"
            },
            audio: true
        });

        camera.srcObject = stream;
        camera.muted = true;
        camera.autoplay = true;
        camera.playsInline = true;

        await camera.play();

        console.log("Camera working");

    } catch (error) {

        console.error(error);

        alert(
            "Camera and microphone could not start.\n\n" +
            error.name
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

    recordBtn.disabled = false;
    stopBtn.disabled = true;
    nextBtn.disabled = false;

    console.log(
        "Showing question:",
        currentQuestion + 1
    );
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

    recordedChunks = [];

    try {

        mediaRecorder =
            new MediaRecorder(stream);

    } catch (error) {

        console.error(error);

        alert(
            "Your browser does not support video recording."
        );

        return;
    }

    mediaRecorder.ondataavailable =
        function (event) {

            if (event.data.size > 0) {

                recordedChunks.push(event.data);

            }
        };

    mediaRecorder.onstop =
        function () {

            console.log(
                "Recording stopped."
            );

            alert(
                "Recording completed for Question " +
                (currentQuestion + 1)
            );
        };

    mediaRecorder.start();

    recordBtn.disabled = true;
    stopBtn.disabled = false;

    console.log(
        "Recording started for Question " +
        (currentQuestion + 1)
    );
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
    }
};


// ==========================================
// NEXT QUESTION
// ==========================================

nextBtn.onclick = function () {

    if (
        mediaRecorder &&
        mediaRecorder.state === "recording"
    ) {

        alert(
            "Please stop the recording before going to the next question."
        );

        return;
    }

    clearInterval(timer);

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

    interview.style.display = "none";

    const finish =
        document.getElementById("finish");

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
// INITIAL STATE
// ==========================================

recordBtn.disabled = false;
stopBtn.disabled = true;

console.log(
    "GLOBAL PAIR CONNECT READY"
);
