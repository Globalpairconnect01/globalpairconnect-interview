console.log("GLOBAL PAIR CONNECT - CAMERA VERSION");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const camera = document.getElementById("camera");

let stream = null;


// START INTERVIEW
startBtn.onclick = async function () {

    console.log("Start Interview clicked");

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

        camera.autoplay = true;
        camera.playsInline = true;
        camera.muted = true;

        await camera.play();

        console.log("Camera and microphone working");

    } catch (error) {

        console.error("Camera error:", error);

        alert(
            "Camera could not start.\n\n" +
            error.name
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
