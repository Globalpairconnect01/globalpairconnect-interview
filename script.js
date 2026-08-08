console.log("CAMERA + CONTINUE TEST");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");

const welcome = document.getElementById("welcome");
const identity = document.getElementById("identity");
const interview = document.getElementById("interview");

const camera = document.getElementById("camera");
const preview = document.getElementById("preview");

let stream = null;


// START
startBtn.onclick = async function () {

    welcome.style.display = "none";
    identity.style.display = "block";

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });

        camera.srcObject = stream;

        console.log("CAMERA WORKING");

    } catch (error) {

        alert("CAMERA ERROR: " + error.name);
        console.error(error);

    }
};


// CONTINUE
continueBtn.onclick = function () {

    console.log("CONTINUE CLICKED");

    alert("CONTINUE BUTTON WORKS");

    const name =
        document.getElementById("name").value.trim();

    const appID =
        document.getElementById("appID").value.trim();

    const email =
        document.getElementById("email").value.trim();


    if (!name || !appID || !email) {

        alert(
            "Please enter your Full Name, Application ID and Email."
        );

        return;
    }


    identity.style.display = "none";

    interview.style.display = "block";


    if (stream) {

        preview.srcObject = stream;
        preview.play();

    }


    console.log("INTERVIEW PAGE OPENED");

};
