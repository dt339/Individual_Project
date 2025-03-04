function recursiveMoveArray(curArr, depth=1) {
    // alert("start - " + curArr)
    const movedNode = document.getElementById(curArr[0]);
    const movedNodePos = movedNode.getBoundingClientRect();
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();

    let rightAnim = null;
    let leftAnim = null;

    if (curArr[1]!=null) {
        //Moves the node to the correct position relative to its parent - the previously moved node.
        //Uses the same method as initialMove()
        const toMoveL = document.getElementById(curArr[1][0]);
        const toMovePosL = toMoveL.getBoundingClientRect();        

        var initPosXL = toMovePosL.left - contPos.left + (toMovePosL.width/2);
        var initPosYL = toMovePosL.top - contPos.top;
        var destXL = (movedNodePos.left - contPos.left - (contPos.width /(2**(depth+1)))); //((10-depth)* 10));//(movedNodePos.left - contPos.left - movedNodePos.width - 100);
        var destYL = (movedNodePos.top - contPos.top + movedNodePos.height + ((1+depth)* 10));//(movedNodePos.top - contPos.top + movedNodePos.height + 50);

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

        // alert("moving! - " + curArr[1])
        clearInterval(leftAnim);
        leftAnim = setInterval(leftFrame, 10);
        function leftFrame() {
            if (xDirectionL == 'r') {
                if (xPosL >= destXL) {
                    clearInterval(leftAnim);
                    fixPosition(curArr[1][0], destXL, destYL);
                    drawLine(curArr[0], curArr[1][0]);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMoveArray(curArr[1], tempDepth);
                } else {
                    xPosL+=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL += yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            } else {
                if (xPosL <= destXL) {
                    clearInterval(leftAnim);
                    fixPosition(curArr[1][0], destXL, destYL);
                    drawLine(curArr[0], curArr[1][0]);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMoveArray(curArr[1], tempDepth);
                } else {
                    xPosL-=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL -= yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            }
        }
    }
    if (curArr[2]!=null) {
        //Moves the node to the correct position relative to its parent - the previously moved node.
        //Uses the same method as initialMove()
        const toMove = document.getElementById(curArr[2][0]);
        const toMovePos = toMove.getBoundingClientRect();        

        var initPosX = toMovePos.left - contPos.left + (toMovePos.width/2);
        var initPosY = toMovePos.top - contPos.top;
        var destX = (movedNodePos.left - contPos.left + (contPos.width /(2**(depth+1))));//(movedNodePos.left - contPos.left + movedNodePos.width + 100);
        var destY = (movedNodePos.top - contPos.top + movedNodePos.height + ((1+depth)* 10));//(movedNodePos.top - contPos.top + movedNodePos.height + 50);

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

        // alert("moving! - " + curArr[2])
        clearInterval(rightAnim);
        rightAnim = setInterval(rightFrame, 10);
        function rightFrame() {
            if (xDirection == 'r') {
                if (xPos >= destX) {
                    clearInterval(rightAnim);
                    fixPosition(curArr[2][0], destX, destY);
                    drawLine(curArr[0], curArr[2][0]);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMoveArray(curArr[2], tempDepth);
                } else {
                    xPos+=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos += yIncrement;
                    toMove.style.top = yPos + "px";
                }
            } else {
                if (xPos <= destX) {
                    clearInterval(rightAnim);
                    fixPosition(curArr[2][0], destX, destY);
                    drawLine(curArr[0], curArr[2][0]);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMoveArray(curArr[2], tempDepth);
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

function initMoveArray(movingNode, parentNode, destinationNode, movingArr, movingDepth=1) {

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
                recursiveMoveArray(movingArr, movingDepth);
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
                recursiveMoveArray(movingArr, movingDepth);
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


function recursiveMove(movedRoot, depth=1) {
    // alert("start - " + movedRoot.getId);
    // if (movedRoot.getLeft.getIsNull!=true) {
    //     alert("left - " + movedRoot.getLeft.getId);
    // }
    // if (movedRoot.getRight.getIsNull!=true) {
    //     alert("right - " + movedRoot.getRight.getId);
    // }
    
    //Takes the previously moved node as a parameter.
    //Gets the html elements for the moved node and the container they are stored in.
    const movedNode = document.getElementById(movedRoot.getId);
    const movedNodePos = movedNode.getBoundingClientRect();
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();

    let rightAnim = null;
    let leftAnim = null;

    //Checks to see if the moved node has a right child.
    if (movedRoot.getRight != null) {

        //Moves the node to the correct position relative to its parent - the previously moved node.
        //Uses the same method as initialMove()
        const toMove = document.getElementById(movedRoot.getRight.getId);
        const toMovePos = toMove.getBoundingClientRect();        

        var initPosX = toMovePos.left - contPos.left + (toMovePos.width/2);
        var initPosY = toMovePos.top - contPos.top;
        var destX = (movedNodePos.left - contPos.left + (contPos.width /(2**(depth+1))));//(movedNodePos.left - contPos.left + movedNodePos.width + 100);
        var destY = (movedNodePos.top - contPos.top + movedNodePos.height + ((1+depth)* 10));//(movedNodePos.top - contPos.top + movedNodePos.height + 50);

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
                    fixPosition(movedRoot.getRight.getId, destX, destY);
                    drawLine(movedRoot.getId, movedRoot.getRight.getId);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMove(movedRoot.getRight, tempDepth);
                } else {
                    xPos+=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos += yIncrement;
                    toMove.style.top = yPos + "px";
                }
            } else {
                if (xPos <= destX) {
                    clearInterval(rightAnim);
                    fixPosition(movedRoot.getRight.getId, destX, destY);
                    drawLine(movedRoot.getId, movedRoot.getRight.getId);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMove(movedRoot.getRight, tempDepth);
                } else {
                    xPos-=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos -= yIncrement;
                    toMove.style.top = yPos + "px";
                }
            }
        }
    } 
    //Checks to see if the moved node has a left child.
    if (movedRoot.getLeft != null) {
        //Moves the node to the correct position relative to its parent - the previously moved node.
        //Uses the same method as initialMove()
        const toMoveL = document.getElementById(movedRoot.getLeft.getId);
        const toMovePosL = toMoveL.getBoundingClientRect();        

        var initPosXL = toMovePosL.left - contPos.left + (toMovePosL.width/2);
        var initPosYL = toMovePosL.top - contPos.top;
        var destXL = (movedNodePos.left - contPos.left - (contPos.width /(2**(depth+1)))); //((10-depth)* 10));//(movedNodePos.left - contPos.left - movedNodePos.width - 100);
        var destYL = (movedNodePos.top - contPos.top + movedNodePos.height + ((1+depth)* 10));//(movedNodePos.top - contPos.top + movedNodePos.height + 50);

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
                    fixPosition(movedRoot.getLeft.getId, destXL, destYL);
                    drawLine(movedRoot.getId, movedRoot.getLeft.getId);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMove(movedRoot.getLeft, tempDepth);
                } else {
                    xPosL+=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL += yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            } else {
                if (xPosL <= destXL) {
                    clearInterval(leftAnim);
                    fixPosition(movedRoot.getLeft.getId, destXL, destYL);
                    drawLine(movedRoot.getId, movedRoot.getLeft.getId);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    recursiveMove(movedRoot.getLeft, tempDepth);
                } else {
                    xPosL-=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL -= yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            }
        }

    } 

}

function RBRecursiveMove(movedRoot, depth=1) {
    // alert("start - " + movedRoot.getId);
    // if (movedRoot.getLeft.getIsNull!=true) {
    //     alert("left - " + movedRoot.getLeft.getId);
    // }
    // if (movedRoot.getRight.getIsNull!=true) {
    //     alert("right - " + movedRoot.getRight.getId);
    // }
    
    //Takes the previously moved node as a parameter.
    //Gets the html elements for the moved node and the container they are stored in.
    const movedNode = document.getElementById(movedRoot.getId);
    const movedNodePos = movedNode.getBoundingClientRect();
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();

    let rightAnim = null;
    let leftAnim = null;

    //Checks to see if the moved node has a right child.
    if (movedRoot.getRight.getIsNull==false) {

        //Moves the node to the correct position relative to its parent - the previously moved node.
        //Uses the same method as initialMove()
        const toMove = document.getElementById(movedRoot.getRight.getId);
        const toMovePos = toMove.getBoundingClientRect();        

        var initPosX = toMovePos.left - contPos.left + (toMovePos.width/2);
        var initPosY = toMovePos.top - contPos.top;
        var destX = (movedNodePos.left - contPos.left + (contPos.width /(2**(depth+1)))); // ((10-depth)* 10));//(movedNodePos.left - contPos.left + movedNodePos.width + 100);
        var destY = (movedNodePos.top - contPos.top + movedNodePos.height + ((1+depth)* 10));//(movedNodePos.top - contPos.top + movedNodePos.height + 50);

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
                    fixPosition(movedRoot.getRight.getId, destX, destY);
                    drawLine(movedRoot.getId, movedRoot.getRight.getId);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    RBRecursiveMove(movedRoot.getRight, tempDepth);
                } else {
                    xPos+=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos += yIncrement;
                    toMove.style.top = yPos + "px";
                }
            } else {
                if (xPos <= destX) {
                    clearInterval(rightAnim);
                    fixPosition(movedRoot.getRight.getId, destX, destY);
                    drawLine(movedRoot.getId, movedRoot.getRight.getId);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    RBRecursiveMove(movedRoot.getRight, tempDepth);
                } else {
                    xPos-=xIncrement;
                    toMove.style.left = xPos + "px";
                    yPos -= yIncrement;
                    toMove.style.top = yPos + "px";
                }
            }
        }
    } 
    //Checks to see if the moved node has a left child.
    if (movedRoot.getLeft.getIsNull==false) {
        //Moves the node to the correct position relative to its parent - the previously moved node.
        //Uses the same method as initialMove()
        const toMoveL = document.getElementById(movedRoot.getLeft.getId);
        const toMovePosL = toMoveL.getBoundingClientRect();        

        var initPosXL = toMovePosL.left - contPos.left + (toMovePosL.width/2);
        var initPosYL = toMovePosL.top - contPos.top;
        var destXL = (movedNodePos.left - contPos.left - (contPos.width /(2**(depth+1)))); //((10-depth)* 10));//(movedNodePos.left - contPos.left - movedNodePos.width - 100);
        var destYL = (movedNodePos.top - contPos.top + movedNodePos.height + ((1+depth)* 10));//(movedNodePos.top - contPos.top + movedNodePos.height + 50);

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
                    fixPosition(movedRoot.getLeft.getId, destXL, destYL);
                    drawLine(movedRoot.getId, movedRoot.getLeft.getId);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    RBRecursiveMove(movedRoot.getLeft, tempDepth);
                } else {
                    xPosL+=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL += yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            } else {
                if (xPosL <= destXL) {
                    clearInterval(leftAnim);
                    fixPosition(movedRoot.getLeft.getId, destXL, destYL);
                    drawLine(movedRoot.getId, movedRoot.getLeft.getId);
                    //Calls itself and uses the newly moved node as the previously moved node.
                    //To move any children of the newly moved node.
                    var tempDepth = depth;
                    tempDepth++;
                    RBRecursiveMove(movedRoot.getLeft, tempDepth);
                } else {
                    xPosL-=xIncrementL;
                    toMoveL.style.left = xPosL + "px";
                    yPosL -= yIncrementL;
                    toMoveL.style.top = yPosL + "px";
                }
            }
        }

    } 

}

function initialMove(movingNode, destinationNode) {
    //Gets the html elements for the canvas and the nodes being moves.
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const childNode = document.getElementById(movingNode.getId);
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
                fixPosition(movingNode.getId, destX, destY);
                //Calls a function to move any nodes connected to the moved node.
                var movedDepth = movingNode.calcDepth();
                recursiveMove(movingNode, movedDepth);
                //Creates a new branch between the moved node and its parent.
                drawLine(movingNode.getParent.getId, movingNode.getId);
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
                fixPosition(movingNode.getId, destX, destY);
                //Calls a function to move any nodes connected to the moved node.
                var movedDepth = movingNode.calcDepth();
                recursiveMove(movingNode, movedDepth);
                //Creates a new branch between the moved node and its parent.
                drawLine(movingNode.getParent.getId, movingNode.getId);
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

function moveToRootArray(toMoveArr) {
    //alert("moving to root!")
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
                recursiveMoveArray(toMoveArr);
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
                recursiveMoveArray(toMoveArr);
                
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

function moveToRoot(toMove) {
    //alert("moving to root!")
    //Gets the html elements for the canvas and the nodes being moves.
    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const toMoveElem = document.getElementById(toMove.getId);
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
                fixPosition(toMove.getId, destX, destY);
                //Calls a function to move any nodes connected to the moved node.
                if (getTreeType()=="RB") {
                    RBRecursiveMove(toMove);
                } else {
                    recursiveMove(toMove);
                }
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
                fixPosition(toMove.getId, destX, destY);
                //Calls a function to move any nodes connected to the moved node.
                if (getTreeType()=="RB") {
                    RBRecursiveMove(toMove);
                } else {
                    recursiveMove(toMove);
                }
                
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

function preRotationAllignment(midNode, bottomNode, direction) {
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

    move(midNode.getId, midPos.left - contPos.left + (midPos.width/2), midPos.top - contPos.top, destX, destY);
    move(bottomNode.getId, botPos.left - contPos.left + (botPos.width/2), botPos.top - contPos.top, midPos.left - contPos.left, midPos.top - contPos.top);
}


//Highlights a secified node in a specified colour.
function highlightNode(nodeId, nodeColour) {
    var nodeToHighlight = document.getElementById(nodeId);  
    nodeToHighlight.style.backgroundColor = nodeColour;
}

function redrawTreeFromArray(curArray, stopNode) {
    if (curArray[0]!=stopNode) {        
        if (curArray[1] != null) {
            drawLine(curArray[0], curArray[1][0]);
            redrawTreeFromArray(curArray[1], stopNode);
        }        
        if (curArray[2] != null) {
            drawLine(curArray[0], curArray[2][0]);
            redrawTreeFromArray(curArray[2], stopNode);
        }
    }
} 

//Draws the branches between nodes from the specified node.
//Stops drawing when it reaches the searchNode
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

//Draws the branches between nodes from the specified node.
//Stops drawing when it reaches the searchNode
function redBlackRedrawTree(curNode, searchNode) {
    if (curNode.getId != searchNode) {
        if (curNode.getParent != null) {
            drawLine(curNode.getParent.getId, curNode.getId);
        }
        if (curNode.getLeft.getIsNull==false) {
            redBlackRedrawTree(curNode.getLeft, searchNode);
        } 
        if (curNode.getRight.getIsNull==false) {
            redBlackRedrawTree(curNode.getRight, searchNode);
        } 
    }
}

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

function clearCanvas() {
    const canv = document.getElementById("myCanvas");
    const ctx = canv.getContext("2d");
    ctx.clearRect(0,0, canv.width, canv.height);
}

function removeElem(elemId) {
    const nodeElem = document.getElementById(elemId);
    nodeElem.remove();
}

//Swaps the position of two nodes.
function swap(n1, n2) {
    // var inNode1 = document.getElementById(n1).value;
    // var inNode2 = document.getElementById(n2).value;

    //alert("node1 - " + n1);

    const cont = document.getElementById('treeBox');
    const contPos = cont.getBoundingClientRect();
    const node1 = document.getElementById(n1);
    const pos1 = node1.getBoundingClientRect();
    const node2 = document.getElementById(n2);
    const pos2 = node2.getBoundingClientRect();

    move(n1,pos1.left - contPos.left + (pos1.width/2), pos1.top - contPos.top, pos2.left - contPos.left, pos2.top - contPos.top);
    move(n2,pos2.left - contPos.left + (pos2.width/2), pos2.top - contPos.top, pos1.left - contPos.left, pos1.top - contPos.top);
}

function clockwiseRotationAnim() {

}

function move(toMove, initPosX, initPosY, destX, destY) {
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

function fixPosition(node, destX, destY) {
    var elem = document.getElementById(node);
    // alert("destination - " + destX + " - " + destY)
    // alert("elem pos before! - " + elem.style.left + " - " + elem.style.top);
    elem.style.left = destX + "px";
    elem.style.top = destY + "px";
    // alert("elem pos after! - " + elem.style.left + " - " + elem.style.top);
}

function highlightBorder(elemId, colour) {
    var elem = document.getElementById(elemId);
    elem.style.borderColor = colour;
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

function addFibRoot(rootId, rootArr) {
    
    const elem = document.createElement('div');
    elem.id = rootId;
    elem.className = 'node';
    elem.textContent = rootId;

    //Gets the elements for the parent node and the canvas.
    const parentDiv = document.getElementById('treeBox');
    const containerPos = parentDiv.getBoundingClientRect();

    var numOfRoots = rootArr.length;
    //alert("num of roots - " + numOfRoots);
    var spacing = containerPos.width/(numOfRoots+1);

    // elem.style.left = (spacing*numOfRoots)+ 'px';
    elem.style.left = (containerPos.left)+ 'px';
    elem.style.top = '10px';

    parentDiv.appendChild(elem);
    
    clearCanvas();
    //allignRoots(rootArr);
    allignAll(rootArr);
}

function allignRoots(rootArr) {
    //Gets the elements for the parent node and the canvas.
    const parentDiv = document.getElementById('treeBox');
    const containerPos = parentDiv.getBoundingClientRect();

    var numOfRoots = rootArr.length;
    //alert("num of roots - " + numOfRoots);
    var spacing = containerPos.width/(numOfRoots+1);
    for (let i = 0; i < numOfRoots; i++) {
        var curElem = document.getElementById(rootArr[i].getId).getBoundingClientRect();
        move(rootArr[i].getId, (curElem.left - containerPos.left + (curElem.width/2)), (curElem.top-containerPos.top), ((spacing*(i+1))-(containerPos.left)+curElem.width), 10);
        //allignChildren(rootArr[i], rootArr)
        // if (rootArr[i].getChild!=null) {
        //     alert(rootArr[i].getId + " has a child!!!");

        // }
    }
}

function allignFromList(curArr, parent=null, posArea=null) {
    const containerDiv = document.getElementById('treeBox');
    const containerPos = containerDiv.getBoundingClientRect();

    if (parent == null) {
        posArea = containerPos.width;
    }
    var spacing = posArea/(curArr.length+1);

    if (curArr!=null) {
        for (let i = 0; i < curArr.length; i++) {
            // alert("now - " + curArr[i]);
            // alert("to move - " + + curArr[i][0])
            var initX = 0;
            var initY = 0;
            var destX = 0;
            var destY = 0;
    
            if (parent==null) {
                var elem = document.getElementById(curArr[i][0]);
                var elemPos = elem.getBoundingClientRect();
                
                //Calculates the destination the child must reach.
                initX = (elemPos.left - containerPos.left + (elemPos.width/2))
                initY = (elemPos.top-containerPos.top)
                destX = ((spacing*(i+1))-(containerPos.left)+elemPos.width)
                destY = 10;
            } else {
                var parentDiv = document.getElementById(parent)
                var parentPos = parentDiv.getBoundingClientRect();
                
                var elem = document.getElementById(curArr[i][0]);
                var elemPos = elem.getBoundingClientRect();
    
                var initX = (elemPos.left - containerPos.left + (elemPos.width/2));
                var initY = (elemPos.top-containerPos.top);
                var destX = (parentPos.left-((posArea/2))+(spacing*(i+1))-containerPos.left);
                var destY = (parentPos.top - containerPos.top + 100);
            }
            
            listMove(curArr[i][0], initX, initY, destX, destY, parent, spacing, curArr, i);  
        }
    }
}

function listMove(toMove, initPosX, initPosY, destX, destY, parent, spacing, curArr, i) {
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
                    if (i>0) {
                        drawHorizontalLine(curArr[i][0], curArr[i-1][0]);
                    }                    
                } else {                    
                    drawLine(parent, toMove);
                }
                allignFromList(curArr[i][1],toMove, spacing);
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
                        drawHorizontalLine(curArr[i][0], curArr[i-1][0]);
                    }                    
                } else {
                    drawLine(parent, toMove);
                }
                allignFromList(curArr[i][1],toMove, spacing);
            } else {
                xPos-=xIncrement;
                elem.style.left = xPos + "px";
                yPos -= yIncrement;
                elem.style.top = yPos + "px";
            }
        }

    }
}

function allignAll(curArr, parent=null, posArea=null) {
    //Gets the elements for the parent node and the canvas.

    const containerDiv = document.getElementById('treeBox');
    const containerPos = containerDiv.getBoundingClientRect();

    if (parent == null) {
        posArea = containerPos.width;
    }
    var spacing = posArea/(curArr.length+1);

    if (curArr!= null) {
        for (let i = 0; i < curArr.length; i++) {
            //alert("cur elem - " + curArr[i].getId)
            var initX = 0;
            var initY = 0;
            var destX = 0;
            var destY = 0;
    
            if (parent==null) {
                var elem = document.getElementById(curArr[i].getId);
                var elemPos = elem.getBoundingClientRect();
                
                //Calculates the destination the child must reach.
                initX = (elemPos.left - containerPos.left + (elemPos.width/2))
                initY = (elemPos.top-containerPos.top)
                destX = ((spacing*(i+1))-(containerPos.left)+elemPos.width)
                destY = 10;
            } else {
                var parentDiv = document.getElementById(parent.getId)
                var parentPos = parentDiv.getBoundingClientRect();
                
                var elem = document.getElementById(curArr[i].getId);
                var elemPos = elem.getBoundingClientRect();
    
                var initX = (elemPos.left - containerPos.left + (elemPos.width/2));
                var initY = (elemPos.top-containerPos.top);
                var destX = (parentPos.left-((posArea/2))+(spacing*(i+1))-containerPos.left);
                var destY = (parentPos.top - containerPos.top + 100);
            }
            
            fibMove(curArr[i], initX, initY, destX, destY, parent, spacing, curArr, i);     
        }
    }
    
}

function fibMove(toMove, initPosX, initPosY, destX, destY, parent, spacing, curArr, i) {
    var id = null;
    var elem = document.getElementById(toMove.getId);
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
                fixPosition(toMove.getId, destX, destY);
                if (parent==null) {
                    if (i>0) {
                        drawHorizontalLine(curArr[i].getId, curArr[i-1].getId);
                    }                    
                } else {
                    
                    drawLine(parent.getId, toMove.getId);
                }
                allignAll(toMove.getChildList.getAll("node"),toMove, spacing);
            } else {
                xPos+=xIncrement;
                elem.style.left = xPos + "px";
                yPos += yIncrement;
                elem.style.top = yPos + "px";
            }
        } else {
            if (xPos <= destX) {
                clearInterval(id);
                fixPosition(toMove.getId, destX, destY);
                if (parent==null) {
                    if (i>0) {
                        drawHorizontalLine(curArr[i].getId, curArr[i-1].getId);
                    }                    
                } else {
                    drawLine(parent.getId, toMove.getId);
                }
                allignAll(toMove.getChildList.getAll("node"),toMove, spacing);
            } else {
                xPos-=xIncrement;
                elem.style.left = xPos + "px";
                yPos -= yIncrement;
                elem.style.top = yPos + "px";
            }
        }

    }
    
}

function rootLines(rootArr) {
    for (let i = 0; i < rootArr.length; i++) {
        if (i>0) {
            drawHorizontalLine(rootArr[i].getId, rootArr[i-1].getId)
        }
        
    }
}

//function becomeChild(childNode, )

function allignChildren(parent, parentArr, parentArea=null) {
    
    if (parentArea==null) {
        const containerDiv = document.getElementById('treeBox');
        const containerPos = containerDiv.getBoundingClientRect();
        parentArea = containerPos.width;        
    }
       
    
    var childArr = parent.getChildList.getAll("node");

    if (childArr != null) {
        //clearCanvas();
        for (let i = 0; i < childArr.length; i++) {
            moveChild(parent, childArr[i], parentArea, parentArr, i);
        }
    }
    // var childSpacing = rootSpacing/(childArr.length+1);

}

function moveChild(parent, child, parentArea, parentList, childNum) {
    
    var parentDiv = document.getElementById(parent.getId)
    var parentPos = parentDiv.getBoundingClientRect();
    
    const containerDiv = document.getElementById('treeBox');
    const containerPos = containerDiv.getBoundingClientRect();
    
    //Gets the area allocated to the parent of the node in the canvas
    var parentSpacing = parentArea/(parentList.length+1);
    
    //Gets the area allocated to each child of the parent within the allocated space.
    var childSpacing = parentSpacing/(parent.getChildList.getLength+1);
    
    var elem = document.getElementById(child.getId);
    var elemPos = elem.getBoundingClientRect();
    
    //Calculates the destination the child must reach.
    var initX = (elemPos.left - containerPos.left + (elemPos.width/2));
    var initY = (elemPos.top-containerPos.top);
    var destX = (parentPos.left-((parentSpacing/2))+(childSpacing*(childNum+1))-containerPos.left);
    var destY = (parentPos.top - containerPos.top + 100);
    
    var id = null;
    var xPos = initX;
    var yPos = initY;    
    
    var xDistance = destX-initX;
    var yDistance = destY-initY;
    
    var xIncrement = 1*getAnimSpeed();
    var yIncrement = (yDistance/xDistance)*getAnimSpeed();
    
    var xDirection = 'r';
    if (initX > destX) {
        xDirection = 'l';
    }
    
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
        if (xDirection == 'r') {
            if (xPos >= destX) {
                clearInterval(id);
                fixPosition(child.getId, destX, destY);
                drawLine(parent.getId, child.getId);
                allignChildren(child, parent.getChildList, childSpacing);
            } else {
                xPos+=xIncrement;
                elem.style.left = xPos + "px";
                yPos += yIncrement;
                elem.style.top = yPos + "px";
            }
        } else {
            if (xPos <= destX) {
                clearInterval(id);
                fixPosition(child.getId, destX, destY);
                drawLine(parent.getId, child.getId);
                allignChildren(child, parent.getChildList, childSpacing);
            } else {
                xPos-=xIncrement;
                elem.style.left = xPos + "px";
                yPos -= yIncrement;
                elem.style.top = yPos + "px";
            }
        }

    }
}

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

function updateId(toUpdate, newVal) {
    var updateNode = document.getElementById(toUpdate);  
    updateNode.id = newVal;
    updateNode.textContent = newVal;
}

function clearBox() {
    const containerDiv = document.getElementById('treeBox');
    containerDiv.textContent = '';

    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.style.border = "1px solid black"; // Just for visibility

    // Append the canvas to the container
    containerDiv.appendChild(canvas);

    resizeCanvas();
    // <canvas id="myCanvas" style="border:1px solid #000000;">
    // </canvas> 
    // containerDiv.textContent = '';

}