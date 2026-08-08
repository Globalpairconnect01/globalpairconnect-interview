// ==========================================
// GLOBAL PAIR CONNECT - CAMERA DEBUG
// ==========================================

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const camera = document.getElementById("camera");

let stream = null;


// ==========================================
// START INTERVIEW
// ==========================================

startBtn.onclick = async function () {

    welcome.style.display = "none";
    identity.style.display = "block";

    if (!navigator.mediaDevices) {
        alert("Camera API is not available in this browser.");
        return;
    }

    if (!navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support camera access.");
        return;
    }

    try {

        alert("Requesting camera access...");

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

        alert("CAMERA ACCESS GRANTED");

        camera.srcObject = stream;

        camera.muted = true;
        camera.autoplay = true;
        camera.playsInline = true;

        await camera.play();

        console.log("CAMERA STREAM:", stream);
        console.log("CAMERA VIDEO:", camera.videoWidth, camera.videoHeight);

    } catch (error) {

        console.error("CAMERA ERROR:", error);

        alert(
            "CAMERA ERROR\n\n" +
            "Name: " + error.name +
            "\n\nMessage: " + error.message
        );

    }
};


// ==========================================
// CONTINUE
// ==========================================

continueBtn.onclick = function () {

    const name =
        document.getElementById("name").value.trim();

    const appID =
        document.getElementById("appID").value.trim();

    const email =
        document.getElementById("email").value.trim();

    if (!name || !appID || !email) {

        alert(
            "Please complete your Full Name, Application ID and Email."
        );

        return;
    }

    alert("Identity information accepted.");

};
