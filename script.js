console.log("CAMERA SCRIPT LOADED");

const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const camera = document.getElementById("camera");

let stream = null;

startBtn.onclick = async function () {

    welcome.style.display = "none";
    identity.style.display = "block";

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        camera.srcObject = stream;

        camera.muted = true;
        camera.autoplay = true;
        camera.playsInline = true;

        await camera.play();

        console.log("CAMERA WORKING");

    } catch (error) {

        console.error(error);

        alert(
            "Camera error: " +
            error.name
        );

    }
};
