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

var BSTinsert = new infoStructure("INSERTION", "O(logN)", "Inserting into a BST consists of repeatedly comparing the new value against each node in the tree until the correct position is found. This can be as fast as O(logN) where N is the number of nodes in the tree, or as slow as O(N) if the tree is unbalanced.")
var BSTremove = new infoStructure("REMOVAL", "O(logN)", "rEMOVING IS EASY")
var BSTsearch = new infoStructure("SEARCH", "O(logN)", "searching IS EASY")

var AVLinsert = new infoStructure("INSERTION", "O(logN)", "Inserting into avl style")
var AVLremove = new infoStructure("REMOVAL", "O(logN)", "rEMOVING IS EASY avl style")
var AVLsearch = new infoStructure("SEARCH", "O(logN)", "search IS EASY avl style")

var BHinsert = new infoStructure("INSERTION", "O(1)", "insetrion IS EASY BIONARY HEAP")
var BHremove = new infoStructure("REMOVAL OF MINIMUM", "O(logN)", "rEMOVING IS EASY BINARY HEAP")

var RBinsert = new infoStructure("INSERTION", "O(logN)", "Inserting into red blacxk")
var RBremove = new infoStructure("REMOVAL", "O(logN)", "rEMOVING IS EASY red black")
var RBsearch = new infoStructure("SEARCH", "O(logN)", "search IS EASY red black")

var FHinsert = new infoStructure("INSERTION", "O(logN)", "Inserting into FIBNONACCI")
var FHremove = new infoStructure("REMOVAL", "O(logN)", "rEMOVING IS EASY FIBNONACCI")
var FHdecrease = new infoStructure("DECREASING NODE KEY", "O(logN)", "decrease IS EASY FIBNONACCI")
var FHremovemin = new infoStructure("REMOVAL OF MINIMUM", "O(logN)", "remove min IS EASY FIBNONACCI FIBNONACCI")

var structureDictionary = {}

var BSTDictionary = {}
BSTDictionary["insert"] = BSTinsert
BSTDictionary["remove"] = BSTremove
BSTDictionary["search"] = BSTsearch

var AVLDictionary = {}
AVLDictionary["insert"] = AVLinsert
AVLDictionary["remove"] = AVLremove
AVLDictionary["search"] = AVLsearch

var BHDictionary = {}
BHDictionary["insert"] = BHinsert
BHDictionary["remove"] = BHremove

var RBDictionary = {}
RBDictionary["insert"] = RBinsert
RBDictionary["remove"] = RBremove
RBDictionary["search"] = RBsearch

var FHDictionary = {}
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

function showInfo(structure, process) {
    if (!infoIsShowing) {
        infoIsShowing=true;

        var d = structureDictionary[structure];
        var info = d[process];

        const infoBox = document.createElement('div');
        infoBox.className="infoBox";
        infoBox.id = "infoBox";

        // Create the title
        const title = document.createElement('h1');
        title.textContent = info.getTitle;

        // Create the title
        const timeComplexity = document.createElement('h1');
        timeComplexity.textContent = info.getTimeComp;

        // Create the text block
        const textBlock = document.createElement('p');
        textBlock.textContent = info.getBlock;

        const closeButton = document.createElement('Button');
        closeButton.textContent = "Close";
        closeButton.addEventListener('click', () => {closeInfo()});
        
        // Append title and text to the box
        infoBox.appendChild(title);
        infoBox.appendChild(timeComplexity);
        infoBox.appendChild(textBlock);
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