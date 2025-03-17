//Moves a node to a specified location.
//Then moves the child subtrees of that node to the correct positions.
function initMove(movingNode, parentNode, destinationNode, movingArr, movingDepth=1) {

    //Gets the html elements for the canvas and the nodes being moves.
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const childNode = document.getElementById(movingNode);
    const childNodePos = childNode.getBoundingClientRect();
    const remNode = document.getElementById(destinationNode);
    const remNodePos = remNode.getBoundingClientRect();

    var id = null;

    //Calculates the start and end positions of the movement.
    var initPosX = childNodePos.left - contPos.left + (childNodePos.width/2)
    var initPosY = childNodePos.top - contPos.top
    var destX = remNodePos.left - contPos.left
    var destY = remNodePos.top - contPos.top

    //Calculates the distance that will be travelled.
    var xDistance = destX-initPosX;
    var yDistance = destY-initPosY;

    //Calculates how much the node should move for each axis for a smooth movement.
    var xIncrement = 1*getAnimSpeed();
    var yIncrement = (yDistance/xDistance) * getAnimSpeed();

    var xPos = initPosX;
    var yPos = initPosY;   

    var xDirection = 'r';
    if (initPosX > destX) {
        xDirection = 'l';
    }

    clearInterval(id);
    //Calls frame very frequently to create an animation.
    id = setInterval(frame, 10);
    function frame() {
        //Checks the x directyion fo travel for the node.
        if (xDirection == 'r') {
            //Once the position of the node reaches the destination movement can stop.
            if (xPos >= destX) {
                //Stops running the movement function.
                clearInterval(id);
                //Calls a function to correct the position of the node after movement
                //If the animation speed is too high, visual errors may occur.
                //This function prevents them.
                fixPosition(movingNode, destX, destY);
                //Calls a function to move any nodes connected to the moved node.
                recursiveMove(movingArr, movingDepth);
                //Creates a new branch between the moved node and its parent.

                if (parentNode!=null) {
                    drawLine(parentNode, movingNode);
                }
                
            } else {
                //Moves the node html element by a small amount
                xPos+=xIncrement;
                childNode.style.left = xPos + "px";
                yPos += yIncrement;
                childNode.style.top = yPos + "px";
            }
        } else {
            //Once the position of the node reaches the destination movement can stop.
            if (xPos <= destX) {
                //Stops running the movement function.
                clearInterval(id);
                //Calls a function to correct the position of the node after movement
                //If the animation speed is too high, visual errors may occur.
                //This function prevents them.
                fixPosition(movingNode, destX, destY);
                //Calls a function to move any nodes connected to the moved node.
                recursiveMove(movingArr, movingDepth);
                //Creates a new branch between the moved node and its parent.
                if (parentNode!=null) {
                    drawLine(parentNode, movingNode);
                }
            } else {
                //Moves the node html element by a small amount
                xPos-=xIncrement;
                childNode.style.left = xPos + "px";
                yPos -= yIncrement;
                childNode.style.top = yPos + "px";
            }
        }

    }

}

//Moves all nodes from a starting node to their correct position relative to their parents
function recursiveMove(curArr, depth=1) {
    //Gets the html element of the parent node that has just been moved.
    const movedNode = document.getElementById(curArr[0]);
    const movedNodePos = movedNode.getBoundingClientRect();
    //Gets the data for the box that holds the tree html elements
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();

    let rightAnim = null;
    let leftAnim = null;

    //Checks to see if the most recently moved node has a left child that must be moved.
    if (curArr[1]!=null) {
        //Moves the node to the correct position relative to its parent - the previously moved node.
        const toMoveL = document.getElementById(curArr[1][0]);
        const toMovePosL = toMoveL.getBoundingClientRect();        

        //Clalculates the necessary positions
        var initPosXL = toMovePosL.left - contPos.left + (toMovePosL.width/2);
        var initPosYL = toMovePosL.top - contPos.top;
        var destXL = (movedNodePos.left - contPos.left - (contPos.width /(2**(depth+1)))); 
        var destYL = (movedNodePos.top - contPos.top + movedNodePos.height + ((1+depth)* 10));

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

        //Moves the node to the desired location.
        clearInterval(leftAnim);
        leftAnim = setInterval(leftFrame, 10);
        function leftFrame() {
            if (xDirectionL == 'r') {
                if (xPosL >= destXL) {
                    clearInterval(leftAnim);
                    //Ensures the position of the node is corrent.
                    fixPosition(curArr[1][0], destXL, destYL);
                    //Draws a line between the moved node and its parent..
                    drawLine(curArr[0], curArr[1][0]);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMove(curArr[1], tempDepth);
                } else {
                    xPosL+=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL += yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            } else {
                if (xPosL <= destXL) {
                    clearInterval(leftAnim);
                    //Ensures the position of the node is corrent.
                    fixPosition(curArr[1][0], destXL, destYL);
                    //Draws a line between the moved node and its parent..
                    drawLine(curArr[0], curArr[1][0]);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMove(curArr[1], tempDepth);
                } else {
                    xPosL-=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL -= yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            }
        }
    }
    //Checks to see if the most recently moved node has a right child that must be moved.
    if (curArr[2]!=null) {
        //Moves the node to the correct position relative to its parent - the previously moved node.
        const toMove = document.getElementById(curArr[2][0]);
        const toMovePos = toMove.getBoundingClientRect();        

        //Gets the necessary positions for movement.
        var initPosX = toMovePos.left - contPos.left + (toMovePos.width/2);
        var initPosY = toMovePos.top - contPos.top;
        var destX = (movedNodePos.left - contPos.left + (contPos.width /(2**(depth+1))));
        var destY = (movedNodePos.top - contPos.top + movedNodePos.height + ((1+depth)* 10));

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
                    //Corrects the position of the moved node
                    fixPosition(curArr[2][0], destX, destY);
                    //Draws a line between the moved node and its parent
                    drawLine(curArr[0], curArr[2][0]);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMove(curArr[2], tempDepth);
                } else {
                    xPos+=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos += yIncrement;
                    toMove.style.top = yPos + "px";
                }
            } else {
                if (xPos <= destX) {
                    clearInterval(rightAnim);
                    //Corrects the position of the moved node
                    fixPosition(curArr[2][0], destX, destY);
                    //Draws a line between the moved node and its parent
                    drawLine(curArr[0], curArr[2][0]);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMove(curArr[2], tempDepth);
                } else {
                    xPos-=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos -= yIncrement;
                    toMove.style.top = yPos + "px";
                }
            }
        }
    }
}

//Moves the secified node to the root position.
//Used when rotations leave the root position empty.
function moveToRoot(toMoveArr) {
    
    //Gets the html elements for the canvas and the nodes being moves.
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const toMoveElem = document.getElementById(toMoveArr[0]);
    const toMovePos = toMoveElem.getBoundingClientRect();
    
    var id = null;

    //Calculates the start and end positions of the movement.
    var initPosX = toMovePos.left - contPos.left + (toMovePos.width/2);
    var initPosY = toMovePos.top - contPos.top;
    
    var destX = (cont.offsetWidth /2) - 20;//toMovePos.width;
    var destY = 0;
    
    //Calculates the distance that will be travelled.
    var xDistance = destX-initPosX;
    var yDistance = destY-initPosY;
    
    //Calculates how much the node should move for each axis for a smooth movement.
    var xIncrement = 1*getAnimSpeed();
    var yIncrement = (yDistance/xDistance) * getAnimSpeed();

    var xPos = initPosX;
    var yPos = initPosY;   
    
    var xDirection = 'r';
    if (initPosX > destX) {
        xDirection = 'l';
    }
    
    clearInterval(id);
    //Calls frame very frequently to create an animation.
    id = setInterval(frame, 10);
    function frame() {
        //Checks the x directyion fo travel for the node.
        if (xDirection == 'r') {
            //Once the position of the node reaches the destination movement can stop.
            if (xPos >= destX) {
                //Stops running the movement function.
                clearInterval(id);
                //Calls a function to correct the position of the node after movement
                //If the animation speed is too high, visual errors may occur.
                //This function prevents them.
                fixPosition(toMoveArr[0], destX, destY);
                //Calls a function to move any nodes connected to the moved node.
                recursiveMove(toMoveArr);
            } else {
                //Moves the node html element by a small amount
                xPos+=xIncrement;
                toMoveElem.style.left = xPos + "px";
                yPos += yIncrement;
                toMoveElem.style.top = yPos + "px";
            }
        } else {
            //Once the position of the node reaches the destination movement can stop.
            if (xPos <= destX) {
                //Stops running the movement function.
                clearInterval(id);
                //Calls a function to correct the position of the node after movement
                //If the animation speed is too high, visual errors may occur.
                //This function prevents them.
                fixPosition(toMoveArr[0], destX, destY);
                //Calls a function to move any nodes connected to the moved node.
                recursiveMove(toMoveArr);
                
            } else {
                //Moves the node html element by a small amount
                xPos-=xIncrement;
                toMoveElem.style.left = xPos + "px";
                yPos -= yIncrement;
                toMoveElem.style.top = yPos + "px";
            }
        }

    }
}

//Moves specified nodes to appear in the correct position.
//This is when nodes are not fully aligned for rotations.
function preRotationAllignment(midNode, bottomNode, direction) {

    //Gets the html elements of the holder and the two nodes
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const midElem = document.getElementById(midNode.getId);
    const midPos = midElem.getBoundingClientRect();
    const botElem = document.getElementById(bottomNode.getId);
    const botPos = botElem.getBoundingClientRect();

    var destX = 0; 
    var destY = 0;
    var depth = bottomNode.calcDepth() + 1;

    if (direction == 'r') {
        destX = (midPos.left - contPos.left + (contPos.width /(2**(depth+1)))); 
        destY = (midPos.top - contPos.top + midPos.height + ((1+depth)* 10));
    } else {
        destX = (midPos.left - contPos.left - (contPos.width /(2**(depth+1)))); 
        destY = (midPos.top - contPos.top + midPos.height + ((1+depth)* 10));
    }

    //Moves the specified nodes to the correct positions for visualisation.
    move(midNode.getId, midPos.left - contPos.left + (midPos.width/2), midPos.top - contPos.top, destX, destY);
    move(bottomNode.getId, botPos.left - contPos.left + (botPos.width/2), botPos.top - contPos.top, midPos.left - contPos.left, midPos.top - contPos.top);
}

//Highlights a secified node in a specified colour.
function highlightNode(nodeId, nodeColour) {
    var nodeToHighlight = document.getElementById(nodeId);  
    nodeToHighlight.style.backgroundColor = nodeColour;
}

//Highlights the border of a node to be a colour.
function highlightBorder(elemId, colour) {
    var elem = document.getElementById(elemId);
    elem.style.borderColor = colour;
}

//Changes the text of a node.
function updateId(toUpdate, newVal) {
    var updateNode = document.getElementById(toUpdate);  
    updateNode.id = newVal;
    updateNode.textContent = newVal;
}

//Redraws the tree until a specified node is found.
//Can be used for any tree type due to it using an array to draw lines from.
function redrawTree(curArray, stopNode) {
    if (curArray[0]!=stopNode) {        
        //Draws a line from the current node to its left child.
        if (curArray[1] != null) {
            drawLine(curArray[0], curArray[1][0]);
            redrawTree(curArray[1], stopNode);
        }        
        //Draws a line from the current node to its right child.
        if (curArray[2] != null) {
            drawLine(curArray[0], curArray[2][0]);
            redrawTree(curArray[2], stopNode);
        }
    }
} 

//Creates a new html element at the root position.
function createRoot(newID, value, fillColour="white") {
    //Creates an html element for the root node.
    const elem = document.createElement('div');
    elem.id = newID;
    elem.className = 'node';
    elem.textContent = value;
    elem.style.backgroundColor = fillColour;

    const parentDiv = document.getElementById('treeBox');
    const pos = parentDiv.getBoundingClientRect();

    //Places the root in the center of the canvas.
    const xx = (parentDiv.offsetWidth /2) - 20;
    elem.style.left = xx+ 'px';
    elem.style.top = '0px';
    parentDiv.appendChild(elem);
}

//Creates a new html element for a node.
function newElem(newID, value, parentNode, direction, depth, fillColour="white") {
    //Creates the html element for the node.
    const elem = document.createElement('div');
    elem.id = newID;
    elem.className = 'node';
    elem.textContent = value;
    elem.style.backgroundColor = fillColour;

    //Gets the elements for the parent node and the canvas.
    const parentDiv = document.getElementById('treeBox');
    const containerPos = parentDiv.getBoundingClientRect();
    const refElem = document.getElementById(parentNode)
    const refPos = refElem.getBoundingClientRect();

    //Places the new node in the location corresponding to its parent.
    if (direction == 'r') {
        const xx = (refPos.left - containerPos.left + (containerPos.width /(2**(depth+1)))); // ((10-depth)* 10));
        const yy = (refPos.top - containerPos.top + refPos.height + ((1+depth)* 10));
        elem.style.left = xx+ 'px';
        elem.style.top = yy+ 'px';
    } else {
        const xx = (refPos.left - containerPos.left - (containerPos.width /(2**(depth+1)))); //((10-depth)* 10));
        const yy = (refPos.top - containerPos.top + refPos.height + ((1+depth)* 10));
        elem.style.left = xx+ 'px';
        elem.style.top = yy+ 'px';
    }
    parentDiv.appendChild(elem);

    //Draws a line between the parent and child node.
    drawLine(parentNode, newID);
}

//Deletes a node from the visualisation.
function removeElem(elemId) {
    const nodeElem = document.getElementById(elemId);
    nodeElem.remove();
}

//Draws a line on the canvas between two specified html elements.
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

//Draws a horizontal line between nodes for the root list of fibonacci heaps
function drawHorizontalLine(elem1, elem2) {
    const canv = document.getElementById("myCanvas");
    const ctx = canv.getContext("2d");
    const containerDiv = document.getElementById('treeBox');
    const contPos = containerDiv.getBoundingClientRect();

    const ref1 = document.getElementById(elem1);
    const ref2 = document.getElementById(elem2);
    const pos1 = ref1.getBoundingClientRect();
    const pos2 = ref2.getBoundingClientRect();
    
    ctx.beginPath();
    ctx.moveTo(pos1.left - contPos.left, pos1.top - contPos.top + pos1.height/2);
    ctx.lineTo(pos2.left - contPos.left+pos2.width, pos2.top - contPos.top + pos2.height/2) ;
    ctx.stroke();
}

//Empties the canvas - removes lines between nodes
//Used when the tree must be redrawn
function clearCanvas() {
    const canv = document.getElementById("myCanvas");
    const ctx = canv.getContext("2d");
    ctx.clearRect(0,0, canv.width, canv.height);
}

//Swaps the position of two nodes.
function swap(n1, n2) {

    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const node1 = document.getElementById(n1);
    const pos1 = node1.getBoundingClientRect();
    const node2 = document.getElementById(n2);
    const pos2 = node2.getBoundingClientRect();

    move(n1,pos1.left - contPos.left + (pos1.width/2), pos1.top - contPos.top, pos2.left - contPos.left, pos2.top - contPos.top);
    move(n2,pos2.left - contPos.left + (pos2.width/2), pos2.top - contPos.top, pos1.left - contPos.left, pos1.top - contPos.top);
}

//Moves a node to a location over a period of time.
function move(toMove, initPosX, initPosY, destX, destY) {
    var id = null;
    var elem = document.getElementById(toMove);
    var xPos = initPosX;
    var yPos = initPosY;    
    
    var xDistance = destX-initPosX;
    var yDistance = destY-initPosY;

    //Calculates the distance the node should move per frame based on the speed of animation.
    var xIncrement = 1*getAnimSpeed();
    var yIncrement = (yDistance/xDistance)*getAnimSpeed();
    
    var xDirection = 'r';
    if (initPosX > destX) {
        xDirection = 'l';
    }
    
    clearInterval(id);
    //Calls the function frame() frequently per second to give an animation.
    id = setInterval(frame, 10);
    function frame() {
        if (xDirection == 'r') {
            if (xPos >= destX) {
                clearInterval(id);
                fixPosition(toMove, destX, destY);
            } else {
                xPos+=xIncrement;
                elem.style.left = xPos + "px";
                yPos += yIncrement;
                elem.style.top = yPos + "px";
            }
        } else {
            if (xPos <= destX) {
                clearInterval(id);
                fixPosition(toMove, destX, destY);
            } else {
                xPos-=xIncrement;
                elem.style.left = xPos + "px";
                yPos -= yIncrement;
                elem.style.top = yPos + "px";
            }
        }

    }
    
}

//Sets a node's position.
//Used after movement to fix any errors caused by the animation speed being too fast.
function fixPosition(node, destX, destY) {
    var elem = document.getElementById(node);
    elem.style.left = destX + "px";
    elem.style.top = destY + "px";
}

//Creates a new root node in a fibonacci heap.
//Causes all other root nodes to shift to make room for the new root.
function addFibRoot(rootId, rootArr) {   
    //Creates a new html node element. 
    const elem = document.createElement('div');
    elem.id = rootId;
    elem.className = 'node';
    elem.textContent = rootId;

    //Gets the elements for the parent node and the canvas.
    const parentDiv = document.getElementById('treeBox');
    const containerPos = parentDiv.getBoundingClientRect();

    //PLaces the new node to the left of the scene to move to the correct position later.
    elem.style.left = (containerPos.left)+ 'px';
    elem.style.top = '10px';

    parentDiv.appendChild(elem);
    
    clearCanvas();
    ///Calls a function to move all roots to their new correct positions.
    allignFib(rootArr);
    // allignAll(rootArr);
}

//Moves a node to its correct position.
//Then moves all connected nodes to their correct position relative to the moved node.
function allignFib(curArr, parent=null, posArea=null) {
    const containerDiv = document.getElementById('treeBox');
    const containerPos = containerDiv.getBoundingClientRect();

    //Calculates the space that should be left between each node.
    if (parent == null) {
        //Root nodes can take up the entire width of the visualisation box.
        posArea = containerPos.width;
    }
    var spacing = posArea/(curArr.length+1);

    if (curArr!=null) {
        //Loops through and moves each node in the given array.
        //This can be the root list or a child list converted to an array format.
        for (let i = 0; i < curArr.length; i++) {
            var initX = 0;
            var initY = 0;
            var destX = 0;
            var destY = 0;
    
            if (parent==null) {
                //Calculates the position for a root node.
                var elem = document.getElementById(curArr[i][0]);
                var elemPos = elem.getBoundingClientRect();
                
                //Calculates the destination the child must reach.
                initX = (elemPos.left - containerPos.left + (elemPos.width/2))
                initY = (elemPos.top-containerPos.top)
                destX = ((spacing*(i+1))-(containerPos.left)+elemPos.width)
                destY = 10;
            } else {
                //Calculates the position for a child node.
                var parentDiv = document.getElementById(parent)
                var parentPos = parentDiv.getBoundingClientRect();
                
                var elem = document.getElementById(curArr[i][0]);
                var elemPos = elem.getBoundingClientRect();
    
                var initX = (elemPos.left - containerPos.left + (elemPos.width/2));
                var initY = (elemPos.top-containerPos.top);
                var destX = (parentPos.left-((posArea/2))+(spacing*(i+1))-containerPos.left);
                var destY = (parentPos.top - containerPos.top + 100);
            }
            
            //Moves the current node.
            moveFibNode(curArr[i][0], initX, initY, destX, destY, parent, spacing, curArr, i);  
        }
    }
}

//Performs the movement for nodes in a fibonacci heap
function moveFibNode(toMove, initPosX, initPosY, destX, destY, parent, spacing, curArr, i) {
    //Sets up movement info.
    var id = null;
    var elem = document.getElementById(toMove);
    var xPos = initPosX;
    var yPos = initPosY;    
    
    var xDistance = destX-initPosX;
    var yDistance = destY-initPosY;

    var xIncrement = 1*getAnimSpeed();
    var yIncrement = (yDistance/xDistance)*getAnimSpeed();
    
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
                fixPosition(toMove, destX, destY);
                if (parent==null) {
                    //Draws a horizontal line between the moved node and the node to its left
                    //If the moved node is a root and not the left most root.
                    if (i>0) {
                        drawHorizontalLine(curArr[i][0], curArr[i-1][0]);
                    }                    
                } else {       
                    //Draws a line between the moved node and its parent.
                    //If the moved node is not a root.             
                    drawLine(parent, toMove);
                }
                //Moves all children of the moves node to the correct position.
                allignFib(curArr[i][1],toMove, spacing);
            } else {
                xPos+=xIncrement;
                elem.style.left = xPos + "px";
                yPos += yIncrement;
                elem.style.top = yPos + "px";
            }
        } else {
            if (xPos <= destX) {
                clearInterval(id);
                fixPosition(toMove, destX, destY);
                if (parent==null) {
                    if (i>0) {
                    //Draws a horizontal line between the moved node and the node to its left
                    //If the moved node is a root and not the left most root.
                        drawHorizontalLine(curArr[i][0], curArr[i-1][0]);
                    }                    
                } else {
                    //Draws a line between the moved node and its parent.
                    //If the moved node is not a root.  
                    drawLine(parent, toMove);
                }
                allignFib(curArr[i][1],toMove, spacing);
            } else {
                xPos-=xIncrement;
                elem.style.left = xPos + "px";
                yPos -= yIncrement;
                elem.style.top = yPos + "px";
            }
        }

    }
}

//Removes all html elements from the scene
function clearBox() {
    const containerDiv = document.getElementById('treeBox');
    containerDiv.textContent = '';

    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.style.border = "1px solid black"; 

    // Append the canvas to the container
    containerDiv.appendChild(canvas);

    resizeCanvas();

}