// ==========================================
// GLOBAL PAIR CONNECT - CAMERA TEST
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

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        alert("Your browser does not support camera access.");
        return;
    }

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        camera.srcObject = stream;

        await camera.play();

        console.log("Camera and microphone are working.");

    } catch (error) {

        console.error("CAMERA ERROR:", error);

        alert(
            "Camera could not start.\n\n" +
            "Error: " + error.name +
            "\n\nPlease allow Camera and Microphone access and reload the page."
        );

    }
};


// CONTINUE
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
