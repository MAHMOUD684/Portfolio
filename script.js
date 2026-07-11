const text = [
    "MEP Technical Office Engineer",
    "BIM Engineer",
    "Revit API Developer",
    "Dynamo Expert",
    "Python Automation Developer"
];

let index = 0;

function typeEffect() {

    document.getElementById("typing").innerHTML =
        text[index];

    index++;

    if(index >= text.length){
        index = 0;
    }
}

setInterval(typeEffect,2000);

typeEffect();

function openVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
    }
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
}

window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
