//Holds the data for each piece of information.
class infoStructure {
    constructor(title,timeComp, block) {
        this.title = title;
        this.timeComp = timeComp;
        this.block = block;
    }

    get getTitle() {
        return this.title;
    }
  
    get getTimeComp() {
        return this.timeComp;
    }

    get getBlock() {
        return this.block;
    }
}

//Sets the data for each piece of information
var BSTbase = new infoStructure("BINARY SEARCH TREE", "", ["Data is stored in a hierarchal structure where each node is connected to up to two nodes in a parent-child relationship.", "- Each left child of a node N must have a key less than that of N.", "- Each right child of N must have a key greater than that of N.", "This property is utilised for all of its operations."]);
var BSTinsert = new infoStructure("INSERTION", "O(N)", ["Nodes are compared against the new value starting from the root until an empty position is found for the new node to be inserted into.", "You may insert multiple values at once by separating the values with commas, eg 1,2,3"]);
var BSTremove = new infoStructure("REMOVAL", "O(N)", ["The specified value is searched for and if found it is removed and replaced by its precessor if possible.", "You may remove multiple values at once by separating the values with commas, eg 1,2,3"])
var BSTsearch = new infoStructure("SEARCH", "O(N)", ["Nodes are compared against the specified value starting from the root until a node with a matching key is found.", "Each comparison moves the search to one of the previously searched node's children."]);

var AVLbase = new infoStructure("AVL TREE", "", ["A variation of the Binary Search Tree where nodes also store a balance factor to keep the height of the tree at logN at all times. This allows for the basic operations to have more efficient worst case than a Binary Search Tree", "Balance Factor: the height of a node's left subtree - the height of a node's right subtree", "The Balance Factor of a node can be -1,0, or 1. If it is outside this range a rotation must be applied to the node."]);
var AVLinsert = new infoStructure("INSERTION", "O(logN)", ["The new value is inserted in the same process as a BST.", "Then the balance factor of each node in the path from the newly inserted node to the root must be checked for any imbalances in the tree. Any unbalanced node is corrected with a rotation.", "You may insert multiple values at once by separating the values with commas, eg 1,2,3"])
var AVLremove = new infoStructure("REMOVAL", "O(logN)", ["The specified value is removed in the same process as a BST.", "Then the balance factor of each node in the path from the removed node to the root must be checked for any imbalances in the tree. Any unbalaced node is corrected with a rotation.", "You may remove multiple values at once by separating the values with commas, eg 1,2,3"])
var AVLsearch = new infoStructure("SEARCH", "O(logN)", ["Nodes are compared against the specified value starting from the root until a node with a matching key is found.", "Each comparison moves the search to one of the previously searched node's children."])

var BHbase = new infoStructure("BINARY HEAP", "", ["A hierarchal structure where nodes must obey a set condition for the type of heap it is. The most important node in the heap is always stored at the root.", "Nodes are inserted from left to right in the lowest level of the heap", "Min Heap: The key of a node must be smaller than the key of both of its children, and greater than the key of its parent.", "Max Heap: The key of a node must be greater than the key of both of its children, and smaller than the key of its parent."]);
var BHinsert = new infoStructure("INSERTION", "O(logN)", ["The new value is inserted at the next free position in the level of greatest depth in the heap.", "The node must then be repeatedly compared with its parent and swapped if it does not preserve the conditions of the heap.", "You may insert multiple values at once by separating the values with commas, eg 1,2,3"])
var BHremove = new infoStructure("REMOVAL OF MINIMUM", "O(logN)", ["The root of the heap is replaced with the rightmost node in the level of greatest depth in the heap before being removed.", "The new root of the tree must be repeatedly compared with its children and swapped with if it does not preserve the conditions of the heap."])

var RBbase = new infoStructure("RED-BLACK TREE", "", ["A variation of the Binary Search Tree where each node is given a colour - red or black. This is used to create conditions that ensure that the height of the tree is always at most 2logN.", "-No two red nodes can be adjacent.", "-A red node must always have 2 black nodes as children.", "-All null nodes are considered to be black.", "-The root of the tree is always coloured black."]);
var RBinsert = new infoStructure("INSERTION", "O(logN)", ["The new value is inserted in the same process as a BST as a red node.", "The tree must then be checked to see if any of the conditions of the tree are broken and rotations are performed if any unacceptable states are discovered.", "You may insert multiple values at once by separating the values with commas, eg 1,2,3"])
var RBremove = new infoStructure("REMOVAL", "O(logN)", ["The specified value is removed in the same process as a BST, with the replacement node changing to be the colour of the removed node.", "If the replacement node was black, the tree must be checked for any unacceptable states that will be corrected with rotations if discovered.", "You may remove multiple values at once by separating the values with commas, eg 1,2,3"])
var RBsearch = new infoStructure("SEARCH", "O(logN)", ["Nodes are compared against the specified value starting from the root until a node with a matching key is found.", "Each comparison moves the search to one of the previously searched node's children."])

var FHbase = new infoStructure("FIBONACCI HEAP", "", ["A collection of trees that obey a min order priority meaning that the smallest node is always stored at the root.", "The root list is the upper lost of nodes that stores the minimum value of each tree.","Each node must store its degree, which is the number of children it has at that time."])
var FHinsert = new infoStructure("INSERTION", "O(1)", ["The new value is inserted into the root list. Since the root list is a circular doubly linked list this is a constant time operation.", "You may insert multiple values at once by separating the values with commas, eg 1,2,3"]);
var FHremove = new infoStructure("REMOVAL", "O(N)", ["The specified node has it's key decreased to 0 which forces it to be added to the root list in standard key decreasing fashion.", "This node is now the minimum node in the heap and can be removed in this way."]);
var FHdecrease = new infoStructure("DECREASING NODE KEY", "O(logN)", ["The node's key is decreased to the specified value.", "If the node's key is smaller than its parent then it must be removed from its parent's child list and added to the root list, along with the changed node's children."]);
var FHremovemin = new infoStructure("REMOVAL OF MINIMUM", "O(N)", ["All children of the minimum node are added to the end of the root list before the minimum node is removed.", "Then the heap is consolidated which is a process that repeatedly combines root nodes that have an equal degree to leave the heap in a state where no two root nodes have the same degree value."])

var structureDictionary = {}

var BSTDictionary = {}
BSTDictionary["base"] = BSTbase
BSTDictionary["insert"] = BSTinsert
BSTDictionary["remove"] = BSTremove
BSTDictionary["search"] = BSTsearch

var AVLDictionary = {}
AVLDictionary["base"] = AVLbase
AVLDictionary["insert"] = AVLinsert
AVLDictionary["remove"] = AVLremove
AVLDictionary["search"] = AVLsearch

var BHDictionary = {}
BHDictionary["base"] = BHbase
BHDictionary["insert"] = BHinsert
BHDictionary["remove"] = BHremove

var RBDictionary = {}
RBDictionary["base"] = RBbase
RBDictionary["insert"] = RBinsert
RBDictionary["remove"] = RBremove
RBDictionary["search"] = RBsearch

var FHDictionary = {}
FHDictionary["base"] = FHbase
FHDictionary["insert"] = FHinsert
FHDictionary["remove"] = FHremove
FHDictionary["decrease"] = FHdecrease
FHDictionary["removemin"] = FHremovemin

structureDictionary["BST"] = BSTDictionary;
structureDictionary["AVL"] = AVLDictionary;
structureDictionary["BH"] = BHDictionary;
structureDictionary["RB"] = RBDictionary;
structureDictionary["FH"] = FHDictionary;

var infoIsShowing = false;

function getProcessInfo(structure, process) {
    var d = structureDictionary[structure];
    var info = d[process];
    alert(info);
}  

//Shows a specified piece of information about a process or structure.
function showInfo(structure, process) {
    if (!infoIsShowing) {
        infoIsShowing=true;

        //Gets the data
        var d = structureDictionary[structure];
        var info = d[process];

        //Creates the info box
        const infoBox = document.createElement('div');
        infoBox.className="infoBox";
        infoBox.id = "infoBox";

        //Create the title
        const title = document.createElement('h1');
        title.textContent = info.getTitle;
        infoBox.appendChild(title);

        //Creates an element for the time complexity 
        if (info.getTimeComp!="") {
            const timeComplexityLabel = document.createElement('div');
            timeComplexityLabel.textContent = "Worst-Case Time Complexity:";
    
            const timeComplexity = document.createElement('h1');
            timeComplexity.textContent = info.getTimeComp;

            infoBox.appendChild(timeComplexityLabel);
            infoBox.appendChild(timeComplexity);
        }

        //Creates an HTML element for each line of text in the description
        for (line in info.getBlock) {
            const textBlock = document.createElement('p');
            textBlock.textContent = info.getBlock[line];
            infoBox.appendChild(textBlock);
        }

        // Create the text block
        const textBlock = document.createElement('p');
        textBlock.textContent = info.getBlock;

        //Adds a close button
        const closeButton = document.createElement('Button');
        closeButton.textContent = "Close";
        closeButton.addEventListener('click', () => {closeInfo()});

        
        infoBox.appendChild(closeButton);
        
        // Append the box to the body
        document.body.appendChild(infoBox);
    }
    
    
}

function closeInfo() {
    var infoBox = document.getElementById("infoBox");
    infoBox.remove();

    infoIsShowing = false;
}