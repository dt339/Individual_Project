window.onresize = resizeCanvas;
window.onload = function(){resizeCanvas()};

var animationSpeed = 10;

function updateAnimSpeed() {    
    const mySlider = document.getElementById('speedSlider');
    const sliderLabel = document.getElementById('speedLabel');
    animationSpeed = mySlider.value;
    sliderLabel.innerText = "x" + animationSpeed;
}

function getAnimSpeed() {
    return animationSpeed;
}

function resizeCanvas() {
    const canv = document.getElementById("myCanvas");
    const treeBox = document.getElementById("treeBox");
    const ctx = canv.getContext("2d");
    
    treeBox.offsetWidth = window.innerWidth*0.9;
    treeBox.offsetHeight = window.innerHeight *0.9;
    ctx.canvas.width  = window.innerWidth *0.9;
    ctx.canvas.height = window.innerHeight * 0.9;
}

function balls() {
    const container = document.getElementById('treeBox');

    // Create a new element
    const newElement = document.createElement('div');
    //newElement.className = 'node';
    newElement.style.position = 'absolute'; // Make it positionable within the parent
    newElement.style.left = '0'; // X-coordinate
    newElement.style.top = '0'; // Y-coordinate
    newElement.style.width = '50px'; // Width of the element
    newElement.style.height = '50px'; // Height of the element
    newElement.style.backgroundColor = 'red'; // Background color

    // Add the element to the container
    container.appendChild(newElement);
}
