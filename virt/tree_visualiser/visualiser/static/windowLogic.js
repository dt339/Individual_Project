//Changes the size of the space where the tree is created to fit the page when it is created or resized.
window.onresize = resizeCanvas;
window.onload = function(){resizeCanvas()};

const path = window.location.pathname;
var currentPage = path.split('/').filter(Boolean).pop();

//Stores information used for UI elements.
var animationSpeed = 10;
var successorMode = false;
var showCode = false;
var treeType = currentPage;

//Gets the value of the speed slider and sets the animation speed to that value.
function updateAnimSpeed() {    
    const mySlider = document.getElementById('speedSlider');
    const sliderLabel = document.getElementById('speedLabel');
    animationSpeed = mySlider.value;
    //Updates the label attached to the speed slider.
    sliderLabel.innerText = "x" + animationSpeed;
}

function updateShowCode() {
    //Hides the pseudocode box if it was visible.
    if (showCode == true) {
        showCode = false;
        hideCodeBox();
    } else {
        //Shows the pseudocode box if it was not being currently shown.
        showCode = true;
        showCodeBox();
    }
}

//Returns the variables.
function getAnimSpeed() {
    return animationSpeed;
}

function getSuccessorMode() {
    return successorMode;
}

function getShowCode() {
    return showCode;
}

function getTreeType() {
    return treeType;
}

//Changes the size of the area where the tree is visualized to fit the current window.
function resizeCanvas() {
    const canv = document.getElementById("myCanvas");
    const treeBox = document.getElementById("treeBox");
    const ctx = canv.getContext("2d");
    
    treeBox.offsetWidth = window.innerWidth*0.9;
    treeBox.offsetHeight = window.innerHeight *0.9;
    ctx.canvas.width  = window.innerWidth *0.9;
    ctx.canvas.height = window.innerHeight * 0.9;

    callRedraw();
}
