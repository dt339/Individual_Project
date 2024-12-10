class Node {
    constructor(val, id) {
        this.nodeVal = val;
        this.left = 0;
        this.right = 0;
        this.id = id;
    }

    get getVal() {
        return this.nodeVal;
    }

    get getLeft() {
        return this.left;
    }

    get getRight() {
        return this.right;
    }

    get getId() {
        return this.id;
    }

    set setVal(newVal) {
        this.nodeVal = newVal;
    }

    set setLeft(newLeft) {
        this.left = newLeft;
    }

    set setRight(newRight) {
        this.right = newRight;
    }
}

class Tree {
    constructor() {
        this.rootNode = 0;
    }

    get getRoot() {
        return this.rootNode;
    }

    set setRoot(r) {
        this.rootNode = r;
    }

    insert(newNode) {
        if (this.getRoot == 0) {
            this.setRoot = newNode;
            createRoot(newNode.getVal, newNode.getVal);
        } else {
            this.recursiveInsert(newNode, this.getRoot);
        }
    }

    recursiveInsert(newNode, curNode) {
        if (newNode.getVal > curNode.getVal) {
            if (curNode.getRight == 0) {
                curNode.setRight = newNode;
                newElem(newNode.getVal, newNode.getVal, curNode.getId, 'r');
            } else {
                this.recursiveInsert(newNode, curNode.getRight);
            }
        } else if (newNode.getVal < curNode.getVal) {
            if (curNode.getLeft == 0) {
                curNode.setLeft = newNode;
                newElem(newNode.getVal, newNode.getVal, curNode.getId, 'l');
            } else {
                this.recursiveInsert(newNode, curNode.getLeft);
            }
        } else if (newNode.getVal == curNode.getVal) {
            alert("Node already exists!");
        }
    }
}

const newTree = new Tree();

function insertNode(val) {
    const newNode = new Node(val, val);
    newTree.insert(newNode);
}

function lmao(root) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
    //alert(root);
    //document.write(100);
}

function myFun(test) {
    document.getElementById("bill").innerHTML = test;
}

function createRoot(newID, value) {

    const elem = document.createElement('div');
    elem.id = newID;
    elem.className = 'node';
    elem.textContent = value;

    const parentDiv = document.getElementById('treeBox');
    const pos = parentDiv.getBoundingClientRect();

    const xx = (parentDiv.offsetWidth /2) - 10;
    elem.style.left = xx+ 'px';
    elem.style.top = '0px';
    parentDiv.appendChild(elem);
}

function newElem(newID, value, parentNode, direction) {
    const elem = document.createElement('div');
    elem.id = newID;
    elem.className = 'node';
    elem.textContent = value;

    const parentDiv = document.getElementById('treeBox');
    const refElem = document.getElementById(parentNode)
    const pos = refElem.getBoundingClientRect();
    elem.style.position = 'absolute';

    if (direction == 'r') {
        const xx = pos.right + 50;
        const yy = pos.top + 100;
        elem.style.left = xx+ 'px';
        elem.style.top = yy+ 'px';
    } else {
        const xx = pos.right - 110;
        const yy = pos.top + 100;
        elem.style.left = xx+ 'px';
        elem.style.top = yy+ 'px';
    }
    parentDiv.appendChild(elem);
}

function userInputNode() {
    var inVal = document.getElementById("nodeInsert").value;
    if (inVal == '') {
        alert("No value entered!");
    } else {
        if (isNaN(inVal))
        {
            alert("Must input numbers!");
        } else {
            insertNode(inVal);            
        }
    }
}

function drawLine(elem1, elem2) {

    const canv = document.getElementById("myCanvas");
    const ctx = canv.getContext("2d");

    const ref1 = document.getElementById(elem1);
    const ref2 = document.getElementById(elem2);
    const pos1 = ref1.getBoundingClientRect();
    const pos2 = ref2.getBoundingClientRect();
    
    ctx.beginPath();
    //alert(pos1.left + "-" + pos1.top);
    ctx.moveTo(pos1.left, pos1.top);
    ctx.lineTo(pos2.left, pos2.top);
    ctx.stroke();
}

function swap(id1, id2) {
    const ref1 = document.getElementById(elem1);
    const ref2 = document.getElementById(elem2);
    const pos1 = ref1.getBoundingClientRect();
    const pos2 = ref2.getBoundingClientRect();

    distX1 = 
    distY1 =
    distX2 =
    distY2 =
    move(elem1, pos2.left-pos1.left, pos2.top-pos1.top);
    move(elem2, pos1.left-pos2.left, pos1.top-pos2.top);

    var id = null;
    var elem1 = document.getElementById(id1);
    var elem2 = document.getElementById(id2);
    var prog1 = 0;
    var prog2 = 0;

    clearInterval(id);
    id = setInterval(frame, 10);
    alert("move");
    function frame() {
        if (pos == distX) {
            clearInterval(id);
        } else {
            if (distX > 0) {
                pos++;
            } else {
                pos--;
            }            
            elem1.style.top = (pos * distY/distX) + "px";
            elem1.style.left = pos + "px";

            elem2.style.top = (pos * distY/distX) + "px";
            elem2.style.left = pos + "px";
        }
    }
}

function baseMove() {
    var id = null;
    var elem = document.getElementById("moving");
    var pos = 0;

    clearInterval(id);
    id = setInterval(frame, 10);

    function frame() {
        if (pos == -350) {
            clearInterval(id);
        } else {
            pos--;
            //elem.style.top = pos + "px";
            elem.style.left = pos + "px";
        }
    }
}
