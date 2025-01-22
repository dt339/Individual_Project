const newTree = new Tree();

function recursiveMove(movedRoot) {
    const movedNode = document.getElementById(movedRoot.getId);
    const movedNodePos = movedNode.getBoundingClientRect();
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();

    let rightAnim = null;
    let leftAnim = null;

    if (movedRoot.getRight != null) {


        const toMove = document.getElementById(movedRoot.getRight.getId);
        const toMovePos = toMove.getBoundingClientRect();        

        var initPosX = toMovePos.left - contPos.left + (toMovePos.width/2);
        var initPosY = toMovePos.top - contPos.top;
        var destX = (movedNodePos.left - contPos.left + movedNodePos.width + 100);
        var destY = (movedNodePos.top - contPos.top + movedNodePos.height + 50);

        var xDistance = destX-initPosX;
        var yDistance = destY-initPosY;

        var xIncrement = 1*getAnimSpeed();
        var yIncrement = (yDistance/xDistance) * getAnimSpeed();

        var xPos = initPosX;
        var yPos = initPosY;   

        var xDirection = 'r';
        if (initPosX > destX) {
            xDirection = 'l';
        }

        clearInterval(rightAnim);
        rightAnim = setInterval(rightFrame, 10);
        function rightFrame() {
            if (xDirection == 'r') {
                if (xPos >= destX) {
                    clearInterval(rightAnim);
                    drawLine(movedRoot.getId, movedRoot.getRight.getId);
                    recursiveMove(movedRoot.getRight);
                } else {
                    xPos+=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos += yIncrement;
                    toMove.style.top = yPos + "px";
                }
            } else {
                if (xPos <= destX) {
                    clearInterval(rightAnim);
                    drawLine(movedRoot.getId, movedRoot.getRight.getId);
                    recursiveMove(movedRoot.getRight);
                } else {
                    xPos-=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos -= yIncrement;
                    toMove.style.top = yPos + "px";
                }
            }
        }

        //move(movedRoot.getRight.getId, toMovePos.left - contPos.left + (toMovePos.width/2), toMovePos.top - contPos.top, (movedNodePos.left - contPos.left + movedNodePos.width + 100), (movedNodePos.top - contPos.top + movedNodePos.height + 50));
        //setTimeout(() => recursiveMove(movedRoot.getRight), 2000);
    } 
    if (movedRoot.getLeft != null) {
        const toMoveL = document.getElementById(movedRoot.getLeft.getId);
        const toMovePosL = toMoveL.getBoundingClientRect();        

        var initPosXL = toMovePosL.left - contPos.left + (toMovePosL.width/2);
        var initPosYL = toMovePosL.top - contPos.top;
        var destXL = (movedNodePos.left - contPos.left - movedNodePos.width - 100);
        var destYL = (movedNodePos.top - contPos.top + movedNodePos.height + 50);

        // const xx = (refPos.left - containerPos.left - refPos.width - ((10-depth)* 10));
        // const yy = (refPos.top - containerPos.top + refPos.height + ((5-depth)* 10));

        var xDistanceL = destXL-initPosXL;
        var yDistanceL = destYL-initPosYL;

        var xIncrementL = 1*getAnimSpeed();
        var yIncrementL = (yDistanceL/xDistanceL) * getAnimSpeed();

        var xPosL = initPosXL;
        var yPosL = initPosYL;   

        var xDirectionL = 'r';
        if (initPosXL > destXL) {
            xDirectionL = 'l';
        }

        clearInterval(leftAnim);
        leftAnim = setInterval(leftFrame, 10);
        function leftFrame() {
            if (xDirectionL == 'r') {
                if (xPosL >= destXL) {
                    clearInterval(leftAnim);
                    drawLine(movedRoot.getId, movedRoot.getLeft.getId);
                    recursiveMove(movedRoot.getLeft);
                } else {
                    xPosL+=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL += yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            } else {
                if (xPosL <= destXL) {
                    clearInterval(leftAnim);
                    drawLine(movedRoot.getId, movedRoot.getLeft.getId);
                    recursiveMove(movedRoot.getLeft);
                } else {
                    xPosL-=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL -= yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            }
        }

        //move(movedRoot.getRight.getId, toMovePos.left - contPos.left + (toMovePos.width/2), toMovePos.top - contPos.top, (movedNodePos.left - contPos.left + movedNodePos.width + 100), (movedNodePos.top - contPos.top + movedNodePos.height + 50));
        //setTimeout(() => recursiveMove(movedRoot.getRight), 2000);
    } 

}

function initialMove(movingNode, destinationNode) {
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const childNode = document.getElementById(movingNode.getId);
    const childNodePos = childNode.getBoundingClientRect();
    const remNode = document.getElementById(destinationNode);
    const remNodePos = remNode.getBoundingClientRect();

    var id = null;

    var initPosX = childNodePos.left - contPos.left + (childNodePos.width/2)
    var initPosY = childNodePos.top - contPos.top
    var destX = remNodePos.left - contPos.left
    var destY = remNodePos.top - contPos.top

    var xDistance = destX-initPosX;
    var yDistance = destY-initPosY;

    var xIncrement = 1*getAnimSpeed();
    var yIncrement = (yDistance/xDistance) * getAnimSpeed();

    var xPos = initPosX;
    var yPos = initPosY;   

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
                recursiveMove(movingNode);
                drawLine(movingNode.getParent.getId, movingNode.getId);
            } else {
                xPos+=xIncrement;
                childNode.style.left = xPos + "px";
                yPos += yIncrement;
                childNode.style.top = yPos + "px";
            }
        } else {
            if (xPos <= destX) {
                clearInterval(id);
                recursiveMove(movingNode);
                drawLine(movingNode.getParent.getId, movingNode.getId);
            } else {
                xPos-=xIncrement;
                childNode.style.left = xPos + "px";
                yPos -= yIncrement;
                childNode.style.top = yPos + "px";
            }
        }

    }

    //move(movingNode, childNodePos.left - contPos.left + (childNodePos.width/2), childNodePos.top - contPos.top, remNodePos.left - contPos.left, remNodePos.top - contPos.top)
}

function userInputNode() {
    var inVal = document.getElementById("nodeInsert").value;
    if (inVal == '') {
        alert("No value entered!");
    } else {
        if (inVal.includes(",")) {
            setCurrProcess("insert");
            var nodeArr = inVal.split(",").map(item => item.trim());

            var allNumbers = true;
            for (let i = 0; i < nodeArr.length; i++) {
                if (isNaN(nodeArr[i])) {
                    allNumbers = false;
                }                
            }

            if (allNumbers) {
                var intInput = parseInt(nodeArr[0], 10); 
                newTree.insert(intInput, nodeArr); 
            } else {
                alert("Must input numbers!");
            }


        } else { 
            if (isNaN(inVal))
            {
                alert("Must input numbers!");
            } else { 
                setCurrProcess("insert");
                var intInput = parseInt(inVal, 10);                 
                newTree.insert(intInput, [intInput]);          
            }
        }
    }
    document.getElementById("nodeInsert").value = '';
}

function insertMultiple(nodeArr) {

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
            setCurrProcess("remove");   
            newTree.searchAndRemove(newTree.getRoot, intInput);     
        }
    }
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
    var inVal = document.getElementById("nodeSearch").value;
    if (inVal == '') {
        alert("No value entered!");
    } else {
        if (isNaN(inVal))
        {
            alert("Must input numbers!");
        } else {
            setCurrProcess("search");
            var intInput = parseInt(inVal, 10);
            newTree.nodeSearch(newTree.getRoot, intInput);
            
        }
    }
    document.getElementById("nodeSearch").value = '';
}

function highlightNode(nodeId, nodeColour) {
    var nodeToHighlight = document.getElementById(nodeId);  
    nodeToHighlight.style.backgroundColor = nodeColour;
}

function redrawTree(curNode, searchNode) {
    if (curNode.getId != searchNode) {
        if (curNode.getParent != null) {
            drawLine(curNode.getParent.getId, curNode.getId);
        }
        if (curNode.getLeft != null) {
            redrawTree(curNode.getLeft, searchNode);
        } 
        if (curNode.getRight != null) {
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
