console.log("SCRIPT LOADED");

const startBtn = document.getElementById("startBtn");

if (!startBtn) {
    alert("ERROR: Start button not found");
} else {

    startBtn.addEventListener("click", function () {

        alert("START INTERVIEW CLICKED");

        document.getElementById("welcome").style.display = "none";
        document.getElementById("identity").style.display = "block";

    });

}
