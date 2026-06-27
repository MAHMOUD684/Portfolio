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