//Stores the lines of pseudocode for the different processes.
//CHANGE TO FILE OR SOMETHING
const noneProcess = ["No current process!"];
const searchProcess = ["Start search at root", "Compare current node N with value being searched for S", "If S = N then", "  S has been found!", "If S > N then", "  If N has a right child then", "     Make the right child of N the Current Node", "  If N has no right child then", "     S does not exist in the tree", "If S < N then", "  If N has a left child then", "     Make the left child of N the Current Node", "  If N has no left child then", "     S does not exist in the tree"];
const insertProcess = ["Start search for location at root", "If there is no root, insert new node N at root", "Compare current node C to N", "If N > C then", "  If C has a right child then", "     Repeat with the right child of C being the new current node", "  If C has no right child then", "     Insert N as the right child of C", "If N < C then", "  If C has a left child then ", "      Repeat with the left child of C being the new current node", "  If C has no left child then ", "      Insert N as the left child of C", "If N = C then", "  N already exists and cannot be inserted"];
const removeProcess = ["Search for node to be removed R", "If R is found then", "  Remove R", "  If R had no children then", "     Take no further action", "  Else If R had only 1 child then", "     Replace R with the only child", "  Else If R had 2 children then", "     Replace R with the largest value in the left subtree of R", "Else", "  R does not exist so cannot be removed"];

// const fr = new FileReader();
// const filePath = new F

var currProcess = noneProcess;
var codeBox = null;
var currHigh = "L0";

function setCurrProcess(p) {
    //Removes previous lines from box.
    if (codeBox != null) {
        emptyBox();
    }

    //Stores the new current process.
    if (p == "none") {
        currProcess = noneProcess;
    } else if (p == "search") {
        currProcess = searchProcess;
    } else if (p == "insert") {
        currProcess = insertProcess;
    } else if (p == "remove") {
        currProcess = removeProcess;
    } else {
        alert("what")
    }

    //Fills the box with the new lines of pseudocode.
    if (codeBox != null) {
        fillCodeBox();
    }
    
}

function getCurrProcess() {
    return currProcess;
}

function showCodeBox() {
    //Creates a new code box if it has not been previously shown.
    //Shows the code box if it already exists.

    if (codeBox == null) {
        codeBox = document.createElement('div');
        codeBox.id = 'codePanel';
        codeBox.className = "codePanel";
        codeBox.textContent = "PseudoCode:";
    
        document.body.appendChild(codeBox);
    } else {
        codeBox.style.visibility = "visible";
    }

    //Calls a function to fill the box with the pseudocode of the current function.
    fillCodeBox();
    highlightLine(currHigh);
}

function hideCodeBox() {
    //Removes the box from the scene.

    emptyBox();
    codeBox.style.visibility = "hidden";
}

function fillCodeBox() {

    //Runs through the current process that is stored as an array of lines of code.
    for (line in currProcess) {
        //Each line of code has its own HTML element.
        var codeLine = document.createElement('div');
        codeLine.id = "L" + line;
        codeLine.className = "codeLine";
        codeLine.textContent = currProcess[line];
    
        codeBox.appendChild(codeLine);
    }
}

function emptyBox() {
    //Runs through the current process and removes each line.
    codeBox.textContent = "PseudoCode:";

    currHigh = "L0";
}

function highlightLine(x) {
    if (codeBox != null) {
        //Unhighlights the previously highlighted line of code.
        var toUnHighlight = document.getElementById(currHigh)
        toUnHighlight.style.backgroundColor = "lightcyan";
        //Highlights the specified line of code.
        var toHighlight = document.getElementById(x);
        currHigh = x;
        toHighlight.style.backgroundColor = "lightpink";
        //Only one line of code can be highlighted at once.
    }
}

function unHighlightAll() {
    //Unhighlights all lines of code.
    for (line in currProcess) {
        var codeLine = document.getElementById(line);
        codeLine.style.backgroundColor = "lightcyan";
    }
}

//#region dragging

let isDragging = false;
let offsetX = null;
let offsetY = null;



codeBox.addEventListener("mousedown", (e) => {
    isDragging = true;
    draggable.style.cursor = "grabbing";

    offsetX = e.clientX - draggable.offsetLeft;
    offsetY = e.clientY - draggable.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        draggable.style.left = e.clientX - offsetX + "px";
        draggable.style.top = e.clientY - offsetY + "px";

    }
});

document.addEventListener("mouseup", () => {
    alert(codeBox);
    isDragging = false;
    draggable.style.cursor = "grab";
})

//#endregion