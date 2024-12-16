class Node {
    constructor(val, id) {
        this.nodeVal = val;
        this.left = null;
        this.right = null;
        this.id = id;
        this.parent = null;
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

    get getParent() {
        return this.parent;
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

    set setParent(parentId) {
        this.parent = parentId;
    }
}

class Tree {
    constructor() {
        this.rootNode = null;
    }

    get getRoot() {
        return this.rootNode;
    }

    set setRoot(r) {
        this.rootNode = r;
    }

    insert(newNode) {
        if (this.getRoot == null) {
            this.setRoot = newNode;
            createRoot(newNode.getVal, newNode.getVal);
        } else {
            this.recursiveInsert(newNode, this.getRoot, 0);
        }
    }

    recursiveInsert(newNode, curNode, depth) {
        //Checks to see if the new node is greater than the node currently being checked.
        if (newNode.getVal > curNode.getVal) {
            //Checks to see if the current node has a right child.
            if (curNode.getRight == null) {
                //If no right child exists, sets the new node as the right child.
                newNode.setParent = curNode;
                curNode.setRight = newNode;
                newElem(newNode.getVal, newNode.getVal, curNode.getId, 'r', depth);
            } else {
                //If a right child exists, compare the new node to the right child.
                //(Recursion)                
                depth++;
                this.recursiveInsert(newNode, curNode.getRight, depth);
            }
        } else if (newNode.getVal < curNode.getVal) {
            //Checks to see if the new node is less than the current node.
            //If the current node has no left child, set the new node as the left child.
            if (curNode.getLeft == null) {
                newNode.setParent = curNode;
                curNode.setLeft = newNode;
                newElem(newNode.getVal, newNode.getVal, curNode.getId, 'l', depth);
            } else {
                //If a left child exists, compare the new node and the left child.
                depth++;
                this.recursiveInsert(newNode, curNode.getLeft, depth);
            }
            //If the new node is equal to the current node it already exists and cannot be enetered.
        } else if (newNode.getVal == curNode.getVal) {
            alert("Node already exists!");
        }
    }

    removeNode(toRem) {
        if (this.getRoot == null) {
            alert("No data in tree to be removed!");
        } else if (this.getRoot.getVal == toRem) {
            alert("Node Found!");
            if (this.getRoot.getLeft == null && this.getRoot.getRight == null) {
                alert("Removed")
                this.setRoot = null;
                const node = document.getElementById(toRem);
                node.remove();
            } else {
                alert("Node had children")
            }
            

        } else {
            this.recursiveRemove(toRem, this.getRoot);
        }
    }

    recursiveRemove(toRem, curNode) {
        if (curNode == null) {
            alert("Node Doesn't exist!");
        }
        if (toRem == curNode.getVal) {
            alert("Node Found!");
            alert("Parent - " + curNode.getParent.getVal);
            if (curNode.getLeft == null && curNode.getRight == null) {
                if (curNode.getVal > curNode.getParent.getVal) {
                    curNode.getParent.setRight = null;
                } else {
                    curNode.getParent.setLeft = null;
                }
                const node = document.getElementById(toRem);
                node.remove();
                alert("LEAF so removed");
            } else {
                if (curNode.getLeft == null && curNode.getRight != null) {
                    if(curNode.getVal > curNode.getParent.getVal) {
                        curNode.getParent.setRight = curNode.getRight;
                    } else {
                        curNode.getParent.setLeft = curNode.getRight;
                    }

                    setUpMove(curNode.getRight.getId, toRem);

                    const remNode = document.getElementById(toRem);
                    remNode.remove();
                    setTimeout(() => recursiveMove(curNode.getRight), 2000);
                    alert("Node removed!")
                } else if (curNode.getLeft != null && curNode.getRight == null) {
                    if(curNode.getVal > curNode.getParent.getVal) {
                        curNode.getParent.setRight = curNode.getLeft;
                    } else {
                        curNode.getParent.setLeft = curNode.getLeft;
                    }
                    
                    setUpMove(curNode.getLeft.getId, toRem);

                    const remNode = document.getElementById(toRem);
                    remNode.remove();
                    alert("Node removed!")
                } else if (curNode.getLeft != null && curNode.getRight != null) {
                    if(curNode.getVal > curNode.getParent.getVal) {
                        curNode.getParent.setRight = curNode.getLeft;
                    } else {
                        curNode.getParent.setLeft = curNode.getLeft;
                    }
                    
                } else{
                    alert("Something went wrong");
                }
            }          

        } else if (toRem > curNode.getVal) {
            this.recursiveRemove(toRem, curNode.getRight);
        } else if (toRem < curNode.getVal) {
            this.recursiveRemove(toRem, curNode.getLeft);
        }   
    }


    // if (direction == 'r') {
    //     const xx = (refPos.left - containerPos.left + refPos.width + ((10-depth)* 10));
    //     const yy = (refPos.top - containerPos.top + refPos.height + ((5-depth)* 10));
    //     elem.style.left = xx+ 'px';
    //     elem.style.top = yy+ 'px';
    // } else {
    //     const xx = (refPos.left - containerPos.left - refPos.width - ((10-depth)* 10));
    //     const yy = (refPos.top - containerPos.top + refPos.height + ((5-depth)* 10));
    //     elem.style.left = xx+ 'px';
    //     elem.style.top = yy+ 'px';
    // }

}

function recursiveMove(movedRoot) {
    const movedNode = document.getElementById(movedRoot.getId);
    const movedNodePos = movedNode.getBoundingClientRect();
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    if (movedRoot.getRight != null) {
        const toMove = document.getElementById(movedRoot.getRight.getId);
        const toMovePos = toMove.getBoundingClientRect();
        move(movedRoot.getRight.getId, toMovePos.left - contPos.left + (toMovePos.width/2), toMovePos.top - contPos.top, (movedNodePos.left - contPos.left + movedNodePos.width + 100), (movedNodePos.top - contPos.top + movedNodePos.height + 50));
        setTimeout(() => recursiveMove(movedRoot.getRight), 2000);
    }
}

const newTree = new Tree();

function setUpMove(movingNode, destinationNode) {
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const childNode = document.getElementById(movingNode);
    const childNodePos = childNode.getBoundingClientRect();
    const remNode = document.getElementById(destinationNode);
    const remNodePos = remNode.getBoundingClientRect();
    move(movingNode, childNodePos.left - contPos.left + (childNodePos.width/2), childNodePos.top - contPos.top, remNodePos.left - contPos.left, remNodePos.top - contPos.top)
}

function insertNode(val) {
    var intInput = parseInt(val, 10); 
    const newNode = new Node(intInput, intInput);
    newTree.insert(newNode);
}

function userRemoveNode() {
    var inVal = document.getElementById("nodeRemove").value;
    if (inVal == '') {
        alert("No value entered!");
    } else {
        if (isNaN(inVal))
        {
            alert("Must input numbers!");
        } else {
            var intInput = parseInt(inVal, 10);     
            newTree.removeNode(intInput);     
        }
    }
    document.getElementById("nodeRemove").value = '';
}


function lmao() {
    setTimeout(myFunction, 3000);
}

function myFunction() {
    alert('Hello');
}

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

function newElem(newID, value, parentNode, direction, depth) {
    const elem = document.createElement('div');
    elem.id = newID;
    elem.className = 'node';
    elem.textContent = value;

    const parentDiv = document.getElementById('treeBox');
    const containerPos = parentDiv.getBoundingClientRect();
    const refElem = document.getElementById(parentNode)
    const refPos = refElem.getBoundingClientRect();
    

    if (direction == 'r') {
        const xx = (refPos.left - containerPos.left + refPos.width + ((10-depth)* 10));
        const yy = (refPos.top - containerPos.top + refPos.height + ((5-depth)* 10));
        elem.style.left = xx+ 'px';
        elem.style.top = yy+ 'px';
    } else {
        const xx = (refPos.left - containerPos.left - refPos.width - ((10-depth)* 10));
        const yy = (refPos.top - containerPos.top + refPos.height + ((5-depth)* 10));
        elem.style.left = xx+ 'px';
        elem.style.top = yy+ 'px';
    }
    parentDiv.appendChild(elem);
    drawLine(parentNode, newID);
}

function userInputNode() {
    var inVal = document.getElementById("nodeInsert").value;
    if (inVal == '') {
        alert("No value entered!");
    } else {
        if (inVal.includes(",")) {
            var nodeArr = inVal.split(",").map(item => item.trim());
            for (x in nodeArr) {
                if (x != '') {
                    insertNode(nodeArr[x]);
                }
            }
        } else { 
            if (isNaN(inVal))
            {
                alert("Must input numbers!");
            } else {
                insertNode(inVal);            
            }
        }
    }
    document.getElementById("nodeInsert").value = '';
}

function drawLine(elem1, elem2) {

    const canv = document.getElementById("myCanvas");
    const ctx = canv.getContext("2d");
    const containerDiv = document.getElementById('treeBox');
    const contPos = containerDiv.getBoundingClientRect();

    const ref1 = document.getElementById(elem1);
    const ref2 = document.getElementById(elem2);
    const pos1 = ref1.getBoundingClientRect();
    const pos2 = ref2.getBoundingClientRect();
    
    ctx.beginPath();
    ctx.moveTo(pos1.left - contPos.left + (pos1.width/2), pos1.top - contPos.top + pos1.height);
    ctx.lineTo(pos2.left - contPos.left + (pos2.width/2), pos2.top - contPos.top);
    ctx.stroke();
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
