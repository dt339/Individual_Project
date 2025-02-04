class RedBlackNode extends Node {
    constructor(id, red) {
        super(id);        
        this.isRed = red;        
    }

    get getIsRed() {
        return this.isRed;
    }

    set setIsRed(r) {
        this.isRed = r;
    }

}

class RedBlackTree {
    constructor() {
        this.rootNode = null;
        this.queue = new AnimQueue;
    }

    get getRoot() {
        return this.rootNode;
    }    

    set setRoot(r) {
        this.rootNode = r;
    }

    search(currentNode, targetNode) {
        this.queue.addCommand("highlightLine", ["L1"]);

        this.queue.addCommand("highlightNode", [currentNode.getId, "lightblue"]);
        if (targetNode == currentNode.getId) {
            this.queue.addCommand("highlightLine", ["L2"]);
            this.queue.addCommand("highlightLine", ["L3"]);
            this.queue.addCommand("highlightNode", [currentNode.getId, "lightgreen"]);
            this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();
            return currentNode;
        } else if (targetNode > currentNode.getId) {
            this.queue.addCommand("highlightLine", ["L4"]);
            if (currentNode.getRight != null) {
                this.queue.addCommand("highlightLine", ["L5"]);
                this.queue.addCommand("highlightLine", ["L6"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
                return this.search(currentNode.getRight, targetNode);
            } else {
                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightLine", ["L8"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "red"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
                this.queue.addCommand("setProcess", ["none"]);
                this.queue.runCommands();
                return null;
            }
        } else if (targetNode < currentNode.getId) {
            this.queue.addCommand("highlightLine", ["L9"]);
            if (currentNode.getLeft != null) {
                this.queue.addCommand("highlightLine", ["L10"]);
                this.queue.addCommand("highlightLine", ["L11"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
                return this.search(currentNode.getLeft, targetNode);
            } else {
                this.queue.addCommand("highlightLine", ["L12"]);
                this.queue.addCommand("highlightLine", ["L13"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "red"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
                this.queue.addCommand("SetProcess", ["none"]);
                this.queue.runCommands();
                return null;
            }
        }
    }

    insert(nodeVal, nodeArr) {
        
        var newNode = new RedBlackNode(parseInt(nodeVal, 10), true);
        if (this.getRoot == null) {
            //If the tree is empty, sets the root of the tree to be the new value.
            this.setRoot = newNode;
            newNode.setIsRed = false;
            this.queue.addCommand("createColouredRoot", [nodeVal, "red"]);
            this.queue.addCommand("highlightNode", [nodeVal, "gray"]);

            if (nodeArr.length > 1) {
                nodeArr.shift();
                this.insert(nodeVal, nodeArr);
            } else {
                //Set process to none.
            }

        } else {
            this.queue.addCommand("highlightLine", ["L3"]);
            this.recursiveInsert(newNode, this.getRoot, 1, nodeArr);
        }    
        this.queue.addCommand("setProcess", ["none"]);  
        this.queue.runCommands();
    }

    recursiveInsert(newNode, curNode, depth, nodeArr) {

        if (newNode.getId > curNode.getId) {
            this.queue.addCommand("highlightLine", ["L7"]);
            if (curNode.getRight == null) {
                //inserts the node as the right child 
                curNode.setRight = newNode;
                newNode.setParent = curNode;      
                          

                this.queue.addCommand("createColouredNode", [newNode.getId, newNode.getId, curNode.getId, 'r', depth, 'red']);               
                
                this.checkConditions(newNode);  

            } else {                

                depth++;
                this.recursiveInsert(newNode, curNode.getRight, depth, nodeArr);
            }
        } else if (newNode.getId < curNode.getId) {
            if (curNode.getLeft == null) {

                curNode.setLeft = newNode;
                newNode.setParent = curNode;


                this.queue.addCommand("createColouredNode", [newNode.getId, newNode.getId, curNode.getId, 'l', depth, 'red']);
                
                this.checkConditions(newNode);               
                
                
            } else {

                depth++;
                this.recursiveInsert(newNode, curNode.getLeft, depth, nodeArr);
            }
        } else if (newNode.getId == curNode.getId) {
            //Show node already exists.
            alert("Value already exists in the tree");

        } else {
            alert("Something has gone wrong.");
        }
    }

    checkConditions(curNode) {
        if (curNode.getParent == null) {
            //Tree must meet conditions.
        } else {
            if (curNode.getIsRed) {
                if (curNode.getParent.getIsRed) {
                    alert(curNode.getId + " - double red");
                    //Both cur node and parent are red - Violates conditions.
                    var parent = curNode.getParent;
                    var grandParent = parent.getParent;

                    // alert("parent - " + parent.getId + " - grand - " + grandParent.getId );
                    // alert(parent.getId < grandParent.getId);
                    //parent is left child of grand parent
                    if (parent.getId < grandParent.getId) {
                        if (grandParent.getRight == null) {
                            //Uncle is black
                            this.performRotation(curNode, parent, grandParent, 'clockwise');
                        } else {
                            if (grandParent.getRight.getIsRed) {
                                //Uncle is red
                                this.swapColours(curNode, 'r');
                            } else {
                                //Uncle is black
                                this.performRotation(curNode, parent, grandParent, 'clockwise');
                            }
                        }
                    } else {
                        alert("how")
                        if (grandParent.getLeft == null) {
                            //Uncle is black 
                            
                            this.performRotation(curNode, parent, grandParent, 'anticlockwise');
                        } else {
                            if (grandParent.getLeft.getIsRed) {
                                //Uncle is red
                                this.swapColours(curNode, 'l');
                            } else {
                                //Uncle is black
                                this.performRotation(curNode, parent, grandParent, 'anticlockwise');
                            }
                        }
                    }
                    this.checkConditions(curNode.getParent);
                } else {
                    //Conditions not violated
                }
            } else {
                //Node does not need to be checked because it is not red.
            }
        }
    }

    swapColours(faultyNode, uncleDirection) {
        
        faultyNode.getParent.setIsRed = !faultyNode.getParent.getIsRed;

        if (faultyNode.getParent.getIsRed) {
            this.queue.addCommand("highlightNode", [faultyNode.getParent.getId, 'red']);
        } else {
            this.queue.addCommand("highlightNode", [faultyNode.getParent.getId, 'gray']);
        }
        
        if (this.getRoot.getId != faultyNode.getParent.getParent.getId) {
            faultyNode.getParent.getParent.setIsRed = !faultyNode.getParent.getParent.getIsRed;

            if (faultyNode.getParent.getParent.getIsRed) {
                this.queue.addCommand("highlightNode", [faultyNode.getParent.getParent.getId, 'red']);
            } else {
                this.queue.addCommand("highlightNode", [faultyNode.getParent.getParent.getId, 'gray']);
            }
        }
            
        if (uncleDirection == 'l') {
            faultyNode.getParent.getParent.getLeft.setIsRed = !faultyNode.getParent.getParent.getLeft.getIsRed;
            if (faultyNode.getParent.getParent.getLeft.getIsRed) {
                this.queue.addCommand("highlightNode", [faultyNode.getParent.getParent.getLeft.getId, 'red']);
            } else {
                this.queue.addCommand("highlightNode", [faultyNode.getParent.getParent.getLeft.getId, 'gray']);
            }
        } else {
            faultyNode.getParent.getParent.getRight.setIsRed = !faultyNode.getParent.getParent.getRight.getIsRed;
            if (faultyNode.getParent.getParent.getRight.getIsRed) {
                this.queue.addCommand("highlightNode", [faultyNode.getParent.getParent.getRight.getId, 'red']);
            } else {
                this.queue.addCommand("highlightNode", [faultyNode.getParent.getParent.getRight.getId, 'gray']);
            }
        }

    }

    swapNodeColour(node) {
        if (node.getIsRed) {
            node.setIsRed = false;
            this.queue.addCommand("highlightNode", [node.getId, 'gray']);
        } else {
            node.setIsRed = true;
            this.queue.addCommand("highlightNode", [node.getId, 'red']);
        }
    }

    performRotation(bottomNode, middleNode, topNode, dir) {

        if (dir == "clockwise") {
            if (middleNode.getId > bottomNode.getId) {
                //All nodes in a straight line - regular rotation
                this.clockwiseRotation(topNode, middleNode);
            } else {
                //Nodes out of order

                //Set left child of A to be C
                //Set parent of C to be A
                topNode.setLeft = bottomNode;
                bottomNode.setParent = topNode;

                //Set right child of B to be Z
                //Set parent of Z to be B 
                middleNode.setRight = bottomNode.getLeft;
                if (bottomNode.getLeft != null) {
                    bottomNode.getLeft.setParent = middleNode;
                }

                //Set parent of B to be C
                //Set left child of C to be B
                middleNode.setParent = bottomNode;
                bottomNode.setLeft = middleNode;

                this.clockwiseRotation(topNode, bottomNode);
            }
        } else {
            if (middleNode.getId < bottomNode.getId) {
                //All nodes in a straight line - regular rotation
                this.antiClockwiseRotation(topNode, middleNode);
            } else {
                //Nodes out of order

                //Set right child of A to be C
                //Set parent of C to be A
                topNode.setRight = bottomNode;
                bottomNode.setParent = topNode;
                
                //Set left child of B to be Y
                //Set parent of Y to be B
                middleNode.setLeft = bottomNode.getRight;
                if (bottomNode.getRight != null) {
                    bottomNode.getRight.setParent = middleNode;
                }

                //Set right child of C to be B
                //Set parent of B to be C
                bottomNode.setRight = middleNode;
                middleNode.setParent = bottomNode;

                this.antiClockwiseRotation(topNode, bottomNode);
            } 
        }


    }

    antiClockwiseRotation(topNode, midNode) {

        //Set right child of A to be X
        //Set parent of X to be A
        if (midNode.getLeft != null) {
            topNode.setRight = midNode.getLeft;
            midNode.getLeft.setParent = topNode;
        } else {
            topNode.setRight= null;
        }
        
        //Set parent of B to be parent of A
        //Set child of parent of A to be B
        if (this.getRoot.getId == topNode.getId) {
            this.setRoot = midNode;
            midNode.setParent = null;
        } else {
            if(topNode.getId < topNode.getParent.getId) {
                topNode.getParent.setLeft = midNode;
            } else {
                topNode.getParent.setRight = midNode;
            }
            midNode.setParent = topNode.getParent;
        }

        //Set left child of B to be A
        //Set parent of A to be B
        midNode.setLeft = topNode;
        topNode.setParent = midNode;

        // alert("top - " + topNode.getId + " parent - " + topNode.getParent.getId + " left - " + topNode.getLeft + " right - " + topNode.getRight);
        // alert("mid - " + midNode.getId + " parent - " + midNode.getParent.getId + " left - " + midNode.getLeft + " right - " + midNode.getRight);
        this.queue.addCommand("swap", [topNode.getId, midNode.getId]);  
        this.queue.addCommand("recMove", [midNode]); 
        this.queue.addCommand("redrawTree", [this.getRoot, midNode]);
        this.swapNodeColour(topNode);
        this.swapNodeColour(midNode);
    }

    clockwiseRotation(topNode, midNode) {

        //Creates the connection between the top node and the right child of the mid node.
        if (midNode.getRight != null) {
            topNode.setLeft = midNode.getRight;
            midNode.getRight.setParent = topNode;
        } else {
            topNode.setLeft = null;
        }

        //If the top node is the root then it changes the root to be the middle node.
        if (this.getRoot.getId == topNode.getId) {
            this.setRoot = midNode;
            midNode.setParent = null;
        } else {
            //Sets the child of the parent of the top node to be the middle node.
            if(topNode.getId < topNode.getParent.getId) {
                topNode.getParent.setLeft = midNode;
            } else {
                topNode.getParent.setRight = midNode;
            }
            midNode.setParent = topNode.getParent;
        }
        
        //Creates the new connection between the top and mid nodes.
        midNode.setRight = topNode;
        topNode.setParent = midNode;

        this.queue.addCommand("swap", [topNode.getId, midNode.getId]);
        this.queue.addCommand("recMove", [midNode]);
        this.queue.addCommand("redrawTree", [this.getRoot, midNode]);
        this.swapNodeColour(topNode);
        this.swapNodeColour(midNode);
    }
}