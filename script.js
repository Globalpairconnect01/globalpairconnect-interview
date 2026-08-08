console.log("CAMERA SCRIPT LOADED");

const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const camera = document.getElementById("camera");

let stream = null;

startBtn.onclick = async function () {

    console.log("START BUTTON CLICKED");

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: true
        });

        console.log("CAMERA ACCESS GRANTED");

        welcome.style.display = "none";
        identity.style.display = "block";

        camera.srcObject = stream;

        camera.muted = true;
        camera.autoplay = true;
        camera.playsInline = true;

        await camera.play();

        console.log("CAMERA VIDEO PLAYING");

    } catch (error) {

        console.error("CAMERA ERROR:", error);

        alert(
            "Camera error: " +
            error.name +
            "\n\n" +
            error.message
        );
    }
};
