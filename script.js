alert("SCRIPT LOADED");

const continueBtn = document.getElementById("continueBtn");

if (!continueBtn) {
    alert("ERROR: CONTINUE BUTTON NOT FOUND");
} else {
    continueBtn.onclick = function () {
        alert("CONTINUE BUTTON WORKS");
    };
}
