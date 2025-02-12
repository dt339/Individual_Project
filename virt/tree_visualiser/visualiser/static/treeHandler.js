let newTree = null;

// const path = window.location.pathname;
// const currentPage = path.split('/').filter(Boolean).pop();

var thisPage = getTreeType();
//alert(thisPage);
if (thisPage == "BST") {
    newTree = new BSTTree();
} else if (thisPage == "AVL") {
    newTree = new AVLTree();
} else if (thisPage == "BH") {
    newTree = new BinaryHeap();
} else if (thisPage == "RB") {
    newTree = new RedBlackTree();
} else {
    alert("An error has occured.");
}

function getName() {
    //newTree.getTreeName();
    var num =  2;
    var bin = num.toString(2);
    alert(bin);

}

function displayTree() {
    alert("Please");
    let bill = newTree.traverse(newTree.getRoot);
    alert(bill);
}

function qwert() {
    alert("Please");
    let bill = newTree.traverse(newTree.getRoot);
    alert(bill);
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
    if (thisPage=="BH") {
        newTree.remove();   
    } else {
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
                newTree.remove(newTree.getRoot, intInput);     
            }
        }
        //Empties the input field.
        document.getElementById("nodeRemove").value = '';
    }
    
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
            newTree.search(newTree.getRoot, intInput);            
        }
    }
    //Empties the input field.
    document.getElementById("nodeSearch").value = '';
}

function myFun(test) {
    document.getElementById("bill").innerHTML = test;
}

function callRedraw() {
    // recursiveMove(newTree.getRoot);
    // clearCanvas();
    redrawTree(newTree.getRoot, null);

}
