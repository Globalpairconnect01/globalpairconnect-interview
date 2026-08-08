alert("CAMERA TEST SCRIPT LOADED");

const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const camera = document.getElementById("camera");

let stream = null;

startBtn.onclick = async function () {

    alert("START BUTTON CLICKED");

    welcome.style.display = "none";
    identity.style.display = "block";

    try {

        alert("REQUESTING CAMERA...");

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user"
            },
            audio: true
        });

        alert("CAMERA ACCESS GRANTED");

        camera.srcObject = stream;

        camera.muted = true;
        camera.autoplay = true;
        camera.playsInline = true;

        await camera.play();

        console.log("CAMERA IS WORKING");

    } catch (error) {

        console.error("CAMERA ERROR:", error);

        alert(
            "CAMERA ERROR\n\n" +
            "Name: " + error.name +
            "\n\nMessage: " + error.message
        );
    }
};
