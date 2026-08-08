// ==========================================
// GLOBAL PAIR CONNECT
// INTERVIEW + CAMERA + RECORDING + SUPABASE
// ==========================================

console.log("GLOBAL PAIR CONNECT SCRIPT LOADED");


// ==========================================
// SUPABASE
// ==========================================

const supabase = window.supabaseClient;

if (!supabase) {
    alert("Supabase is not connected.");
    console.error("window.supabaseClient is missing.");
}


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
// VARIABLES
// ==========================================

let currentQuestion = 0;

let stream = null;

let mediaRecorder = null;

let recordedChunks = [];

let timer = null;

let seconds = 0;

let isUploading = false;


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

        console.log("Camera started.");

    }

    catch (error) {

        console.error("Camera error:", error);

        alert(
            "Camera and microphone could not start.\n\n" +
            error.name
        );

    }

};


// ==========================================
// CONTINUE TO QUESTIONS
// ==========================================

continueBtn.onclick = function () {

    const name =
        nameInput.value.trim();

    const appID =
        appIDInput.value.trim();

    const email =
        emailInput.value.trim();


    if (!name || !appID || !email) {

        alert(
            "Please complete your Full Name, Application ID and Email."
        );

        return;
    }


    identity.style.display = "none";

    interview.style.display = "block";


    // Keep camera running on interview page

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


    recordBtn.disabled = false;

    stopBtn.disabled = true;

    nextBtn.disabled = false;

}


// ==========================================
// SPEAK QUESTION
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

    speech.pitch = 1;


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

    }

    catch (error) {

        console.error(error);

        alert(
            "Could not start video recording."
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
        async function () {

            await uploadRecording();

        };


    mediaRecorder.start();


    recordBtn.disabled = true;

    stopBtn.disabled = false;

    nextBtn.disabled = true;


    console.log(
        "Recording started for question " +
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
// UPLOAD RECORDING TO SUPABASE
// ==========================================

async function uploadRecording() {

    isUploading = true;

    nextBtn.disabled = true;


    if (recordedChunks.length === 0) {

        console.log("No video data.");

        isUploading = false;

        nextBtn.disabled = false;

        return;
    }


    const videoBlob =
        new Blob(
            recordedChunks,
            {
                type: "video/webm"
            }
        );


    // Clean application ID for file name

    const safeAppID =
        appIDInput.value
            .trim()
            .replace(/[^a-zA-Z0-9_-]/g, "_");


    const fileName =
        safeAppID +
        "_question_" +
        (currentQuestion + 1) +
        "_" +
        Date.now() +
        ".webm";


    console.log(
        "Uploading:",
        fileName
    );


    try {

        // ==================================
        // UPLOAD VIDEO
        // ==================================

        const {
            error: uploadError
        } = await supabase.storage
            .from("interviews")
            .upload(
                fileName,
                videoBlob,
                {
                    contentType: "video/webm",
                    upsert: false
                }
            );


        if (uploadError) {

            console.error(
                "Upload error:",
                uploadError
            );

            alert(
                "Video upload failed.\n\n" +
                uploadError.message
            );

            isUploading = false;

            nextBtn.disabled = false;

            return;
        }


        console.log(
            "Video uploaded successfully."
        );


        // ==================================
        // GET VIDEO URL
        // ==================================

        const {
            data: publicData
        } = supabase.storage
            .from("interviews")
            .getPublicUrl(fileName);


        const videoURL =
            publicData.publicUrl;


        console.log(
            "Video URL:",
            videoURL
        );


        // ==================================
        // SAVE DATABASE RECORD
        // ==================================

        const {
            error: dbError
        } = await supabase
            .from("interviews")
            .insert([

                {

                    full_name:
                        nameInput.value.trim(),

                    application_id:
                        appIDInput.value.trim(),

                    email:
                        emailInput.value.trim(),

                    language:
                        languageInput.value,

                    video_url:
                        videoURL,

                    status:
                        "Pending"

                }

            ]);


        if (dbError) {

            console.error(
                "Database error:",
                dbError
            );

            alert(
                "Video uploaded, but the interview details could not be saved.\n\n" +
                dbError.message
            );

            isUploading = false;

            nextBtn.disabled = false;

            return;
        }


        console.log(
            "Interview record saved."
        );


        alert(
            "Question " +
            (currentQuestion + 1) +
            " recording uploaded successfully."
        );


    }

    catch (error) {

        console.error(
            "Unexpected upload error:",
            error
        );

        alert(
            "Something went wrong while uploading the recording."
        );

    }


    isUploading = false;

    nextBtn.disabled = false;

}


// ==========================================
// NEXT QUESTION
// ==========================================

nextBtn.onclick = function () {

    if (isUploading) {

        alert(
            "Please wait for the recording to finish uploading."
        );

        return;
    }


    // If currently recording, stop first

    if (
        mediaRecorder &&
        mediaRecorder.state === "recording"
    ) {

        alert(
            "Please stop the recording before moving to the next question."
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
// FINISH INTERVIEW
// ==========================================

function finishInterview() {

    clearInterval(timer);


    if (
        "speechSynthesis" in window
    ) {

        speechSynthesis.cancel();

    }


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


    if (
        "speechSynthesis" in window
    ) {

        const speech =
            new SpeechSynthesisUtterance(
                "Congratulations. You have successfully completed your Global Pair Connect interview. Thank you."
            );


        speech.lang = "en-US";

        speechSynthesis.speak(speech);

    }

};


// ==========================================
// INITIAL BUTTON STATE
// ==========================================

recordBtn.disabled = false;

stopBtn.disabled = true;

nextBtn.disabled = false;


console.log(
    "GLOBAL PAIR CONNECT READY"
);
