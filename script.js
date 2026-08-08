// ==========================================
// GLOBAL PAIR CONNECT - CLEAN TEST SCRIPT
// ==========================================

console.log("NEW SCRIPT.JS LOADED");

const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const camera = document.getElementById("camera");

if (!startBtn) {

    alert("ERROR: Start Interview button was not found.");

} else {

    startBtn.addEventListener("click", async function () {

        console.log("START INTERVIEW CLICKED");

        welcome.style.display = "none";
        identity.style.display = "block";

        try {

            if (!navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia) {

                alert("Camera access is not supported by this browser.");
                return;

            }

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });

            camera.srcObject = stream;

            console.log("CAMERA AND MICROPHONE READY");

        } catch (error) {

            console.error("Camera error:", error);

            alert(
                "Camera/Microphone error: " +
                error.name
            );

        }

    });

}
