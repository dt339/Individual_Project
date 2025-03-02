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
} else if (thisPage == "FH") {
    newTree = new FibonacciHeap();
}

function getName() {
    //newTree.getTreeName();
    var num =  2;
    var bin = num.toString(2);
    alert(bin);

}

function changeHeapType() {
    newTree.changeIsMin();
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
                
                setCurrProcess("insert");
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
            if (inVal.includes(",")) {
                //Sets the current process.
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
                    
                    setCurrProcess("remove");
                    var intInput = parseInt(nodeArr[0], 10); 
                    newTree.remove(intInput, nodeArr); 
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
                    setCurrProcess("remove");
                    //Inserts the single value.
                    //Passes an array with only the single value in it.
                    var intInput = parseInt(inVal, 10);                 
                    newTree.remove(intInput, [intInput]);          
                }
            }


            // //Checks that the entered value is a number.
            // if (isNaN(inVal))
            // {
            //     alert("Must input numbers!");
            // } else {
            //     //Sets the current process.
            //     var intInput = parseInt(inVal, 10);  
            //     setCurrProcess("remove");  
            //     //Calls the removal function. 
            //     newTree.remove(intInput);     
            // }
        }
        //Empties the input field.
        document.getElementById("nodeRemove").value = '';
    }
    
}

function userDecreaseNode() {
    //Reads the input field.
    var inId = document.getElementById("decreaseNodeId").value;
    var inVal = document.getElementById("decreaseNodeValue").value;
    //Checks for an empty input.
    if (inVal == '' || inId=='') {
        alert("No value entered!");
    } else {
        //Checks that the entered value is a number.
        var allNumbers = true;
        if (isNaN(inId)) {
            allNumbers = false;
        }
        if (isNaN(inVal)) {
            allNumbers=false;
        }
        
        if (!allNumbers)
        {
            alert("Must input numbers!");
        } else {
            //Sets the current process.
            var intId = parseInt(inId, 10);  
            var intVal = parseInt(inVal, 10);  
            setCurrProcess("FHdecrease");  
            //Calls the removal function. 
            newTree.decrease(intId, intVal);     
        }
    }
    //Empties the input field.    
    document.getElementById("decreaseNodeId").value = "";
    document.getElementById("decreaseNodeValue").value = "";
    
}

function userRemoveMin() {
    setCurrProcess("removeMin");  
    newTree.removeMin();
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
            var intInput = parseInt(inVal, 10);
  
            setCurrProcess("search"); 
            if (thisPage!="FH") {
                newTree.search(newTree.getRoot, intInput);    
            } else {
                newTree.search(newTree.getRootList.getAll("node"), intInput);
            }
            newTree.queue.addCommand("setProcess", ["none"]);
            newTree.queue.runCommands();
                    
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
