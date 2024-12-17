const newTree = new Tree();

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
    } else {
        const canv = document.getElementById("myCanvas");
        const ctx = canv.getContext("2d");
        ctx.clearRect(0,0, canv.width, canv.height);
        setTimeout(() => redrawTree(newTree.getRoot, movedRoot), 5000);
    }
}

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
    const newImposter = new Imposter('displayTree');
    newImposter.soundAlarm();
}

function myFunction() {
    alert('Hello');
}

function redrawTree(curNode, searchNode) {
    if (curNode.getId != searchNode.getId) {
        if (curNode.getLeft != null) {
            drawLine(curNode.getId, curNode.getLeft.getId);
            redrawTree(curNode.getLeft, searchNode);
        } 
        if (curNode.getRight != null) {
            drawLine(curNode.getId, curNode.getRight.getId);
            redrawTree(curNode.getRight, searchNode);
        } 
    }
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
