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
    alert(root);
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

    elem.style.position = 'absolute';
    const xx = pos.right - (pos.right-pos.left)/2 - 10;
    const yy = pos.top;
    elem.style.left = xx+ 'px';
    elem.style.top = yy+ 'px';
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
    drawLine(elem, refElem);
}


