alert("SCRIPT IS LOADING");

const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.onclick = function () {
        alert("START INTERVIEW WORKS");

        const welcome = document.getElementById("welcome");
        const identity = document.getElementById("identity");

        if (welcome) welcome.style.display = "none";
        if (identity) identity.style.display = "block";
    };
} else {
    alert("ERROR: startBtn NOT FOUND");
}
