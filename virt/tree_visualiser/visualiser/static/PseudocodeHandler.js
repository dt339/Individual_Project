//Stores the lines of pseudocode for the different processes.
//CHANGE TO FILE OR SOMETHING
const noneProcess = ["No current process!"];

const bSTSearchProcess = [
    "Start search at root", 
    "Compare current node N with value being searched for S", 
    "If S = N then", 
    "  S has been found!", 
    "If S > N then", 
    "  If N has a right child then", 
    "     Make the right child of N the Current Node", 
    "  If N has no right child then", 
    "     S does not exist in the tree", 
    "If S < N then", 
    "  If N has a left child then", 
    "     Make the left child of N the Current Node", 
    "  If N has no left child then", 
    "     S does not exist in the tree"];

const bSTInsertProcess = [
    "Start search for location at root", 
    "If there is no root, insert new node N at root", 
    "Compare current node C to N", 
    "If N > C then", 
    "  If C has a right child then", 
    "     Repeat with the right child of C being the new current node", 
    "  If C has no right child then", 
    "     Insert N as the right child of C", 
    "If N < C then", 
    "  If C has a left child then ", 
    "      Repeat with the left child of C being the new current node", 
    "  If C has no left child then ", 
    "      Insert N as the left child of C", 
    "If N = C then", 
    "  N already exists and cannot be inserted"];

const bSTRemoveProcess = [
    "Search for node to be removed R", 
    "If R is found then", 
    "  Remove R", 
    "  If R had no children then", 
    "     Take no further action", 
    "  Else If R had only 1 child then", 
    "     Replace R with the only child", 
    "  Else If R had 2 children then", 
    "     Replace R with the largest value in the left subtree of R", 
    "Else", 
    "  R does not exist so cannot be removed"];

const aVLInsertProcess = [
    "Start search for position at root",
    "If Tree has no data Then",
    "   Insert new value N as the root of the tree",
    "Else",
    "   Compare current node C against new value to insert N",
    "   If N = C Then",
    "     N already exists in the tree and cannot be inserted",
    "   If N > C Then",
    "     If C has a right child then",
    "        Compare N to the right child of C",
   "     Else If C does not have a right child then",
   "        Insert N as the right child of C",
   "   Else If N < C Then",
   "     If C has a left child then",
   "        Compare N to the left child of C",
   "     Else If C does not have a left child then",
   "        Insert N as the left child of C",
   "   Check the balance of the tree"];

const aVLBalanceProcess = [
    "Check current node N",
    "Calculate the balance factor of N",
    "If the balance factor of N > 1 Then",
    "  If the right child R of N and the right child of R are not alligned Then",
    "     Perform a clockwise rotation",
    "  Perform an anticlockwise rotation",
    "Else if the balance factor of N < -1 Then",
    "  If the left child L of N and the left child of L are not alligned Then",
    "     Perform a anticlockwise rotation",
    "  Perform an clockwise rotation",
    "Else if the balance factor of N < 1 and > -1 Then",
    "  N is balanced",
    "If N is the root of then tree Then",
    "  The tree is balanced",
    "Else",
    "  Repeat with the parent of N"];

const aVLRemoveProcess = [
    "Search for node to be removed R", 
    "If R is found then", 
    "  Remove R", 
    "  If R had no children then", 
    "     Take no further action", 
    "  Else If R had only a right child then", 
    "     Replace R with the only child", 
    "  Else", 
    "     Replace R with the largest value in the left subtree of R", 
    "  Check the balance of the tree",
    "Else", 
    "  R does not exist so cannot be removed"];

const binaryHeapInsert = [
    "Insert node at next availlable position",
    "Next availlable position is the next empty space on the lowest depth going left to right",
    "Then check heap order priority upwards from the new node"];
    
var binaryHeapRemove = [
    "Swap the mininum node with the node in the most recently inserted position",
    "Remove Minimum Node",
    "Perform heap order priority check downwards on the heap"];
    
//Use if removing root and replacing it with lower node
var minHeapifyDown = [
    "If current node C has one child Then",
    "  If C > the only child of C Then",
    "     Swap C and its child",
    "     Check the heap order of C again",
    "  Else If C < the only child of C Then",
    "     Take no further action",
    "Else If C has two children L and R Then",
    "  If C > L OR C > R Then",
    "     If L < R Then",
    "        Swap C and L",
    "        Check the heap order priority of C again",
    "     Else",
    "        Swap C and R",
    "        Check the heap order priority of C again",
    "  Else",
    "     Take no further action",
    "Else If C has no children Then",
    "  Take no further action"];
    
var minHeapifyUp = [
    "If current node N has no parent Then",
    "  N is now the root and heap order priority is restored",
    "Else",
    "  Compare current node N against its parent P",
    "  If N < P Then",
    "     Swap N and P",
    "     Check the heap order priority of N",
    "  Else",
    "     Take no further action"];

const FHInsertProcess = [
    "Create a node N with the gievn value",
    "Insert N into the root list",
    "If the root list was empty Then",
    "   Set N as the minimum node",
    "Else",
    "   If N < the minimum node Then",
    "     Set N to be the minimum node"];

const FHRemoveMinProcess = [
    "If the heap is not empty Then",
    "   Remove N from the root list",
    "   Add each child of the minimum node N to the root list",
    "   If the heap is not empty Then",
    "     Consolidate the heap",
    "   Else",
    "     Take no further action",
    "Else",
    "   There is no node to be removed"
    ];

const FHConsolidateProcess = [
    "Set the current node C to be the head of the root list",
    "If there exist any node N in the root list to the left of C that have the same degree as C Then",
    "   If C < N Then",
    "     Make N the child of C",
    "   Else if N < C Then",
    "     Make C the child of N",
    "Else",
    "   If the next node in the root list is the head Then",
    "     The heap has been consolidated",
    "   Else",
    "     Set the current node C to be the next node in the root list"
    ];

const FHDecreaseProcess = [
    "If new value V < current node value N Then",
    "   Update N to equal V",
    "   If N has a parent P Then",
    "     If N < P Then",
    "       Remove N from the child list of P",
    "       Add N to the root list",
    "   Update the minimum node of the heap",  
    "Else",
    "   Take no action"
    ]
        
const FHRemoveProcess = [
    "If node to remove R exists in the heap Then",
    "   Update R's key to be 0",
    "   Remove the minimum node in the heap",
    "Else",
    "   R does not exist so cannot be removed"
    ];

const RBInsertProcess = [
    "If the tree has no data Then",
    "   Insert new value N at the root of the tree",
    "Else",
    "   Set the root of the tree to be the current node C",
    "   If N > C Then",
    "     If C has a right child Then",
    "       Set the right child of C as the current node",
    "     Else",
    "       Create new red node N at the right child of N",
    "   Else if N < C Then",
    "     If C has a left child Then",
    "       Set the left child of C as the current node",
    "     Else",
    "       Create new red node N at the left child of N",
    "   Else if N = C Then",
    "     N already exists and cannot be inserted",    
    "Check the Red-Black properties",
    ];
    
const RBInsertFixupProcess = [
    "Set the current node C to be the newly inserted node",
    "If the parent P of C is red Then",
    "   If the uncle U of C is red Then",
    "     Set P to black",
    "     Set U to black",
    "     Set the grandparent of C to red",
    "   Else",
    "     Set P to black",
    "     Set the grandparent of C to red",
    "     Perform a rotation on C",
    "   Set C to the parent of C",
    "Set the root of the tree to black"
    ];
    
const RBRemoveProcess = [
    "Find the node to be removed R",
    "Remove R",
    "If R has no left child Then",
    "   Replace R with its right child",
    "Else if R has no right child Then",
    "   Replace R with its left child",
    "Else if R has two children Then",
    "   Replace R with the largest node L in its right subtree",
    "   Set L to the colour of R",
    "If R was black Then",
    "   Check the Red-Black Priority"
    ];
        
const RBDeleteFixupProcess = [
    "Set the current node C to be the replacement node",
    "If C is not the root and C is black Then",
    "   If the sibling S of C is red Then",
    "     Set S to black",
    "     Set the parent of C to red",
    "     Rotate around the parent of C",
    "   If both children of the sibling S of C are black Then",
    "     Set S to red",
    "     Set the current node C to be the parent of C",
    "   Else",
    "     If the opposite child of S is black Then",
    "       Set the other child of S to black",
    "       Set S to red",
    "       Rotate around S",
    "     Set S to the colour of the parent P of C",
    "     Set P to black",
    "     Set the opposite child of S to black",
    "     Rotate around P",
    ];
        
        

// const fr = new FileReader();
// const filePath = new F

var currProcess = noneProcess;
var codeBox = null;
var currHigh = "L0";
var isShowing = false;

var searchProcess = null;
var insertProcess = null;
var removeProcess = null;

// const path = window.location.pathname;
// const currentPage = path.split('/').filter(Boolean).pop();
var curPage = getTreeType();
if (curPage == "BST") {
    searchProcess = bSTSearchProcess;
    insertProcess = bSTInsertProcess;
    removeProcess = bSTRemoveProcess;    
} else if (curPage == "AVL") {
    searchProcess = bSTSearchProcess;
    insertProcess = aVLInsertProcess;
    removeProcess = aVLRemoveProcess;
} else if (curPage == "BH") {
    searchProcess = bSTSearchProcess;
    insertProcess = binaryHeapInsert;
    removeProcess = binaryHeapRemove;
} else if (curPage == "RB") {
    searchProcess = bSTSearchProcess;
    insertProcess = RBInsertProcess;
    removeProcess = RBRemoveProcess;
} else if (curPage == "FH") {
    searchProcess = noneProcess;
    insertProcess = FHInsertProcess;
    removeProcess = FHRemoveProcess;
}

//alert(removeProcess);

function setCurrProcess(p) {
    
    //Removes previous lines from box.
    if (codeBox != null) {
        emptyBox();
    }
    
    //Stores the new current process.
    //Stores the new current process.
    if (p == "none") {
        currProcess = noneProcess;
        setInputFields(true);
    } else {
        if (p == "search") {
            currProcess = searchProcess;
        } else if (p == "insert") {
            currProcess = insertProcess;
        } else if (p == "remove") {
            currProcess = removeProcess;
        } else if (p == "balance") {
            currProcess = aVLBalanceProcess;
        } else if (p == "upHeap") {
            currProcess = minHeapifyUp;
        } else if (p == "downHeap") {
            currProcess = minHeapifyDown;
        } else if (p == "FHConsolidate") {
            currProcess = FHConsolidateProcess;
        } else if (p == "removeMin") {
            currProcess = FHRemoveMinProcess;
        } else if (p == "FHdecrease") {
            currProcess = FHDecreaseProcess;
        } else if (p == "insertFixup") {
            currProcess = RBInsertFixupProcess;
        } else if (p == "deleteFixup") {
            currProcess = RBDeleteFixupProcess;
        } else {
            alert("An error has occured")
        }
        setInputFields(false);
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
    emptyBox();
    fillCodeBox();
    highlightLine(currHigh);
    isShowing = true;
}

function hideCodeBox() {
    //Removes the box from the scene.

    codeBox.style.visibility = "hidden";
    isShowing = false;
}

function getIsShowing() {
    return isShowing;
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