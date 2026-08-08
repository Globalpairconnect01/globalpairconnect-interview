// ==========================================
// GLOBAL PAIR CONNECT - STEP 2
// CAMERA + IDENTITY
// ==========================================

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");

const camera = document.getElementById("camera");

let stream = null;


// START INTERVIEW
startBtn.onclick = async function () {

    welcome.style.display = "none";
    identity.style.display = "block";

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        camera.srcObject = stream;

        console.log("Camera and microphone ready");

    } catch (error) {

        console.error("Camera error:", error);

        alert(
            "Please allow access to your camera and microphone, then try again."
        );

    }
};


// CONTINUE BUTTON
continueBtn.onclick = function () {

    const name = document.getElementById("name").value.trim();
    const appID = document.getElementById("appID").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !appID || !email) {

        alert("Please complete your Full Name, Application ID and Email.");

        return;
    }

    alert("Identity information accepted.");

};
