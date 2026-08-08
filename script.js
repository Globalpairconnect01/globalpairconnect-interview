alert("SCRIPT LOADED");

const startBtn = document.getElementById("startBtn");

startBtn.onclick = function () {
    alert("START BUTTON CLICKED");

    document.getElementById("welcome").style.display = "none";
    document.getElementById("identity").style.display = "block";
};
