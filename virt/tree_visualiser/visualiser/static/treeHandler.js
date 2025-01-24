let newTree = null;

const path = window.location.pathname;
const currentPage = path.split('/').filter(Boolean).pop();

if (currentPage == "BST") {
    newTree = new BSTTree();
} else if (currentPage == "AVL") {
    newTree = new AVLTree();
} else {
    alert("An error has occured.");
}

function getName() {
    newTree.getTreeName();
}

function displayTree() {
    alert("Please");
    let bill = newTree.traverse(newTree.getRoot);
    alert(bill);
}

function qwert() {
    alert("qwert");
    newTree.asdf();
}

function userInputNode() {
    //Reads the value of the input field.
    var inVal = document.getElementById("nodeInsert").value;
    //Checks for an empty input.
    if (inVal == '') {
        alert("No value entered!");
    } else {
        //Checks to see if the user has entered multiple values
        //Denoted by the use of commas
        if (inVal.includes(",")) {
            //Sets the current process.
            setCurrProcess("insert");
            //Splits the input into diferent values.
            var nodeArr = inVal.split(",").map(item => item.trim());

            //Checks that all values are numbers.
            var allNumbers = true;
            for (let i = 0; i < nodeArr.length; i++) {
                if (isNaN(nodeArr[i])) {
                    allNumbers = false;
                }                
            }

            if (allNumbers) {
                //Inserts the first number
                //Also passes the array of other numbers to insert.
                var intInput = parseInt(nodeArr[0], 10); 
                newTree.insert(intInput, nodeArr); 
            } else {
                alert("Must input numbers!");
            }


        } else { 
            //Checks that the single input is a number.
            if (isNaN(inVal))
            {
                alert("Must input numbers!");
            } else { 
                //Sets the current process.
                setCurrProcess("insert");
                //Inserts the single value.
                //Passes an array with only the single value in it.
                var intInput = parseInt(inVal, 10);                 
                newTree.insert(intInput, [intInput]);          
            }
        }
    }
    //Empties the input field.
    document.getElementById("nodeInsert").value = '';
}

function userRemoveNode() {
    //Reads the input field.
    var inVal = document.getElementById("nodeRemove").value;
    //Checks for an empty input.
    if (inVal == '') {
        alert("No value entered!");
    } else {
        //Checks that the entered value is a number.
        if (isNaN(inVal))
        {
            alert("Must input numbers!");
        } else {
            //Sets the current process.
            var intInput = parseInt(inVal, 10);  
            setCurrProcess("remove");  
            //Calls the removal function. 
            newTree.searchAndRemove(newTree.getRoot, intInput);     
        }
    }
    //Empties the input field.
    document.getElementById("nodeRemove").value = '';
}

function lmao() {
    const elem = document.createElement('p');
    elem.id = 1;
    elem.className = "codeLine";
    elem.textContent = "bILL";

    const parentDiv = document.getElementById('codePanel');

    parentDiv.appendChild(elem);
}

function myFunction() {
    alert('Hello');
}

function userSearchNode() {
    //Reads the input field.
    var inVal = document.getElementById("nodeSearch").value;
    //Checks for an empty input.
    if (inVal == '') {
        alert("No value entered!");
    } else {
        //Checks that the input is a number.
        if (isNaN(inVal))
        {
            alert("Must input numbers!");
        } else {
            //Sets the current process and calls the search function.
            setCurrProcess("search");
            var intInput = parseInt(inVal, 10);
            newTree.nodeSearch(newTree.getRoot, intInput);
            
        }
    }
    //Empties the input field.
    document.getElementById("nodeSearch").value = '';
}

//Swaps the position of two nodes.
function swap(n1, n2) {
    var inNode1 = document.getElementById(n1).value;
    var inNode2 = document.getElementById(n2).value;

    alert("node1 - " + inNode1);

    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const node1 = document.getElementById(inNode1);
    const pos1 = node1.getBoundingClientRect();
    const node2 = document.getElementById(inNode2);
    const pos2 = node2.getBoundingClientRect();

    move(inNode1,pos1.left - contPos.left + (pos1.width/2), pos1.top - contPos.top, pos2.left - contPos.left, pos2.top - contPos.top);
    move(inNode2,pos2.left - contPos.left + (pos2.width/2), pos2.top - contPos.top, pos1.left - contPos.left, pos1.top - contPos.top);
}

function move(toMove, initPosX, initPosY, destX, destY) {
    var id = null;
    var elem = document.getElementById(toMove);
    var xPos = initPosX;
    var yPos = initPosY;    
    
    var xDistance = destX-initPosX;
    var yDistance = destY-initPosY;
    var yincrement = yDistance/xDistance;
    
    var xDirection = 'r';
    if (initPosX > destX) {
        xDirection = 'l';
    }
    
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (xDirection == 'r') {
            if (xPos >= destX) {
                clearInterval(id);
            } else {
                xPos+=1;
                elem.style.left = xPos + "px";
                yPos += yincrement;
                elem.style.top = yPos + "px";
            }
        } else {
            if (xPos <= destX) {
                clearInterval(id);
            } else {
                xPos-=1;
                elem.style.left = xPos + "px";
                yPos -= yincrement;
                elem.style.top = yPos + "px";
            }
        }

    }
}

function myFun(test) {
    document.getElementById("bill").innerHTML = test;
}


