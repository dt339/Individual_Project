class RedBlackTree {
    constructor() {
        this.rootNode = new RedBlackNode(0, false, true);
        this.queue = new AnimQueue;
    }

    get getRoot() {
        return this.rootNode;
    }    

    set setRoot(r) {
        this.rootNode = r;
    }

    lmaolmao() {
        alert(this.getRoot.getId + " - " + this.getRoot.getRight);
    }

    asdf() {
        alert("root: " + this.getRoot.getId + " - left: " + this.getRoot.getLeft.getId + " - right: " + this.getRoot.getRight.getId);
    }

    traverse(node) {
        if (node != null) {
            if (node.getIsNull) {
                return 'x';
            } else {
                if (node.getIsRed) {
                    return ["(",(node.getId+"red"), this.traverse(node.getLeft), this.traverse(node.getRight),")"];
                } else {
                    return ["(",(node.getId+"black"), this.traverse(node.getLeft), this.traverse(node.getRight),")"];
                }
            }
           
        } 
    }  

    search(curNode, toFind) {
        if (curNode.getIsNull==false) {
            this.queue.addCommand("highlightBorder", [curNode.getId, "blue"]);
        }
        if (curNode.getParent!=null) {
            this.queue.addCommand("highlightBorder", [curNode.getParent.getId, "black"]);
        }
        if (toFind == curNode.getId) {
            this.queue.addCommand("highlightBorder", [curNode.getId, "lime"]);
            this.queue.addCommand("highlightBorder", [curNode.getId, "black"]);
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();
            return curNode;
        } else if (toFind > curNode.getId) {
            if (curNode.getRight.getIsNull==false) {
                return this.search(curNode.getRight, toFind);
            } else {
                this.queue.addCommand("highlightBorder", [curNode.getId, "red"]);
                this.queue.addCommand("highlightBorder", [curNode.getId, "black"]);
                this.queue.addCommand("setProcess", ["none"]);
                this.queue.runCommands();
                return null;
            }
        } else if (toFind < curNode.getId) {
            if (curNode.getLeft.getIsNull==false) {
                return this.search(curNode.getLeft, toFind);
            } else {
                this.queue.addCommand("highlightBorder", [curNode.getId, "red"]);
                this.queue.addCommand("highlightBorder", [curNode.getId, "black"]);
                this.queue.addCommand("setProcess", ["none"]);
                this.queue.runCommands();
                return null;
            }
        }

    }

    insert(nodeVal, nodeArr) {
        var newNode = new RedBlackNode(parseInt(nodeVal, 10), true, false);

        var canInsert = true;

        var lastNode = null;
        var currentNode = this.getRoot;
        var depth = 0;
       
        while (canInsert&&currentNode.getIsNull==false) {
            this.queue.addCommand("highlightBorder", [currentNode.getId, "blue"]);
            if (currentNode.getParent!=null) {
                this.queue.addCommand("highlightBorder", [currentNode.getParent.getId, "black"]);
            }
            depth++;
            lastNode=currentNode;
            if (newNode.getId<currentNode.getId) {
                currentNode=currentNode.getLeft;
            } else if (newNode.getId>currentNode.getId) {
                currentNode=currentNode.getRight;
            } else {
                alert("Value already exists");
                canInsert = false;
            }
        }
                
        if (canInsert) {
            newNode.setParent = lastNode;
            if (lastNode==null) {
                this.setRoot=newNode;
                this.queue.addCommand("createColouredRoot", [newNode.getId, 'red']);
            } else {
                if (newNode.getId<lastNode.getId) {
                    lastNode.setLeft = newNode;
                    this.queue.addCommand("createColouredNode", [newNode.getId, newNode.getId, lastNode.getId,'l', depth, 'red']);
        
                } else {
                    lastNode.setRight = newNode;
                    this.queue.addCommand("createColouredNode", [newNode.getId, newNode.getId, lastNode.getId,'r', depth, 'red']);
                }   
                this.queue.addCommand("highlightBorder", [newNode.getId, "blue"]);
                this.queue.addCommand("highlightBorder", [lastNode.getId, "black"]);
                this.queue.addCommand("highlightBorder", [newNode.getId, "black"]);
            }

            
            newNode.setLeft = new RedBlackNode(0, false, true);
            newNode.setRight = new RedBlackNode(0, false, true);
            newNode.setIsRed = true;
            
            this.insertFixup(newNode);
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();
        }
        
    } 

    insertFixup(curNode) {
        //This relies on javascript evaluating the first condition before the second.
        //If the current node has no parent, it will not check if the parent is red.
        //This way of calculating it prevents an error from occuring.
        var changeOccured = false;
        while (curNode.getParent!=null) {
            if (curNode.getIsRed && curNode.getParent.getIsRed) {
                if (curNode.getParent.getParent!= null) {
                    if (curNode.getParent==curNode.getParent.getParent.getLeft) {
                        let uncle = curNode.getParent.getParent.getRight;
                        if (uncle.getIsRed) {
                            // curNode.getParent.setIsRed = false;
                            // uncle.setIsRed = false;
                            // curNode.getParent.getParent.setIsRed = true;
                            this.setNodeColour(curNode.getParent, false);
                            this.setNodeColour(uncle, false);
                            this.setNodeColour(curNode.getParent.getParent, true);
                        } else {
                            if (curNode==curNode.getParent.getRight) {
                                curNode = curNode.getParent;
                                this.leftRotation(curNode);
                            }
                            // curNode.getParent.setIsRed = false;
                            // curNode.getParent.getParent.setIsRed = true;
                            this.setNodeColour(curNode.getParent, false);
                            this.setNodeColour(curNode.getParent.getParent, true);
                            this.rightRotation(curNode.getParent.getParent);
                            changeOccured=true;
                        }
                    } else {
                        let uncle = curNode.getParent.getParent.getLeft;
                        if (uncle.getIsRed) {
                            // curNode.getParent.setIsRed = false;
                            // uncle.setIsRed = false;
                            // curNode.getParent.getParent.setIsRed = true;
                            this.setNodeColour(curNode.getParent, false);
                            this.setNodeColour(uncle, false);
                            this.setNodeColour(curNode.getParent.getParent, true);
                        } else {
                            if (curNode==curNode.getParent.getLeft) {                                
                                curNode = curNode.getParent;
                                this.rightRotation(curNode);
                            }
                            // curNode.getParent.setIsRed = false;
                            // curNode.getParent.getParent.setIsRed = true;
                            this.setNodeColour(curNode.getParent, false);
                            this.setNodeColour(curNode.getParent.getParent, true);
                            this.leftRotation(curNode.getParent.getParent);
                            changeOccured=true;
                        }
                    }
       
                }
            }
            curNode = curNode.getParent;

            
        }
        if (changeOccured) {
            this.queue.addCommand("RBRecMove", [this.getRoot, 1]); 
            this.queue.addCommand("RBredrawTree", [this.getRoot, null]); 
        }
        //this.queue.addCommand("RBredrawTree", [this.getRoot, this.getRoot]);
        this.setNodeColour(this.getRoot, false);
    }

    remove(removeVal) {
        var toRemove = this.search(this.getRoot, removeVal);
        this.queue.addCommand("highlightBorder", [toRemove.getId, "red"]);
        //alert("to remove? = " + toRemove);
        if (toRemove != null) {
            var x = null;
            var y = toRemove;
            var yOrigIsRed = y.getIsRed;

            if (toRemove.getLeft.getIsNull) {
                x = toRemove.getRight;
                this.queue.addCommand("highlightBorder", [toRemove.getRight.getId, "lime"]);
                this.transplant(toRemove, toRemove.getRight);
                this.queue.addCommand("highlightBorder", [toRemove.getRight.getId, "black"]);
            } else if (toRemove.getRight.getIsNull) {
                x = toRemove.getLeft;
                this.queue.addCommand("highlightBorder", [toRemove.getLeft.getId, "lime"]);
                this.transplant(toRemove, toRemove.getLeft);
                this.queue.addCommand("highlightBorder", [toRemove.getLeft.getId, "black"]);
            } else {
                y = this.getSuccessor(toRemove.getRight);
                this.queue.addCommand("highlightBorder", [y.getId, "lime"]);
                yOrigIsRed = y.getIsRed;
                x = y.getRight;
                if (y.getParent==toRemove) {
                    x.setParent = y;
                } else {
                    this.transplant(y, y.getRight);
                    y.setRight = toRemove.getRight;
                    y.getRight.setParent = y;
                }
                this.transplant(toRemove, y);
                y.setLeft = toRemove.getLeft;
                y.getLeft.setParent = y;
                //y.setIsRed = toRemove.getIsRed;
                this.setNodeColour(y, toRemove.getIsRed);
                this.queue.addCommand("highlightBorder", [y.getId, "black"]);
            }
            
            if (yOrigIsRed==false) {
                this.deleteFixup(x);
            }                
            
            this.queue.addCommand("removeNode", [toRemove.getId]);
            this.queue.addCommand("RBredrawTree", [this.getRoot, null]); 
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();

        } else {
            alert("Value does not exist");
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();
        }
    }

    deleteFixup(curNode) {
        var changeOccured = false;
        while (curNode.getParent!=null&&curNode.getIsRed==false) {
            //if (curNode.getIsRed==false) {
                if (curNode==curNode.getParent.getLeft) {
                    var sibling = curNode.getParent.getRight;
                    if (sibling.getIsRed) {
                        // sibling.setIsRed=false;
                        // curNode.getParent.setIsRed = true;
                        this.setNodeColour(sibling, false);
                        this.setNodeColour(curNode.getParent.setIsRed, false);
                        this.leftRotation(curNode.getParent);
                        sibling = curNode.getParent;
                    }
                    if (sibling.getLeft.getIsRed==false&&sibling.getRight.getIsRed==false) {
                        // sibling.setIsRed = true;
                        this.setNodeColour(sibling, true);
                        curNode=curNode.getParent;
                    } else {
                        if (sibling.getRight.getIsRed==false) {
                            // sibling.getLeft.setIsRed = false;
                            // sibling.setIsRed = true;
                            this.setNodeColour(sibling.getLeft, false);
                            this.setNodeColour(sibling, true);
                            this.rightRotation(sibling);
                            sibling = curNode.getParent.getRight;
                        }
                        // sibling.setIsRed=curNode.getParent.getIsRed;
                        // curNode.getParent.setIsRed = false;
                        // sibling.getRight.setIsRed = false;
                        this.setNodeColour(sibling, curNode.getParent.getIsRed);
                        this.setNodeColour(curNode.getParent, false);
                        this.setNodeColour(sibling.getRight, false);
                        this.leftRotation(curNode.getParent);
                        curNode = this.getRoot;
                    }
                } else {
                    var sibling = curNode.getParent.getLeft;
                    if (sibling.getIsRed) {
                        // sibling.setIsRed=false;
                        // curNode.getParent.setIsRed = true;
                        this.setNodeColour(sibling, false);
                        this.setNodeColour(curNode.getParent, true);
                        this.rightRotation(curNode.getParent);
                        sibling = curNode.getParent;
                    }
                    if (sibling.getLeft.getIsRed==false&&sibling.getRight.getIsRed==false) {
                        // sibling.setIsRed = true;
                        this.setNodeColour(sibling, true);
                        curNode=curNode.getParent;
                    } else {
                        if (sibling.getLeft.getIsRed==false) {
                            // sibling.getRight.setIsRed = false;
                            // sibling.setIsRed = true;
                            this.setNodeColour(sibling.getRight, false);
                            this.setNodeColour(sibling, true);
                            this.leftRotation(sibling);
                            sibling = curNode.getParent.getLeft;
                        }
                        // sibling.setIsRed=curNode.getParent.getIsRed;
                        // curNode.getParent.setIsRed = false;
                        // sibling.getLeft.setIsRed = false;
                        this.setNodeColour(sibling, curNode.getParent.getIsRed);
                        this.setNodeColour(curNode.getParent, false);
                        this.setNodeColour(sibling.getLeft, false);
                        this.rightRotation(curNode.getParent);
                        curNode = this.getRoot;
                    }
                }
                
                changeOccured = true;
            //}
        }
        
        // curNode.setIsRed = false;
        if (this.getRoot.getIsNull==false) {
            this.setNodeColour(curNode, false);
            this.queue.addCommand("RBRecMove", [this.getRoot, 1]); 
            this.queue.addCommand("RBredrawTree", [this.getRoot, null]); 
        }
    }

    transplant(parent, child) {
        if (parent.getParent==null) {
            this.setRoot=child;
        } else if (parent==parent.getParent.getLeft) {
            parent.getParent.setLeft = child;
        } else {
            parent.getParent.setRight = child;
        }
        child.setParent = parent.getParent;

        if (child.getIsNull==false) {
            this.queue.addCommand("swap", [parent.getId, child.getId]);
        }
    }

    leftRotation(topNode) {
        var child = topNode.getRight;
        topNode.setRight = child.getLeft;
        child.getLeft.setParent=topNode;
        // if (child.getLeft.getIsNull==false) {
        //     child.getLeft.setParent=topNode;
        // }
        child.setParent=topNode.getParent;
        if (topNode.getParent==null) {
            this.setRoot = child;
        } else if (topNode==topNode.getParent.getLeft) {
            topNode.getParent.setLeft = child;
        } else {
            topNode.getParent.setRight = child;
        }
        child.setLeft = topNode;
        topNode.setParent = child;

        this.queue.addCommand("swap", [topNode.getId, child.getId]);  
        //this.queue.addCommand("recMove", [child]); 
        //this.queue.addCommand("RBredrawTree", [this.getRoot, child]);
    }

    rightRotation(topNode) {
        var child = topNode.getLeft;
        topNode.setLeft = child.getRight;
        child.getRight.setParent=topNode;
        // if (child.getRight.getIsNull==false) {
        //     child.getRight.setParent=topNode;
        // }
        child.setParent=topNode.getParent;
        if (topNode.getParent==null) {
            this.setRoot = child;
        } else if (topNode==topNode.getParent.getLeft) {
            topNode.getParent.setLeft = child;
        } else {
            topNode.getParent.setRight = child;
        }
        child.setRight = topNode;
        topNode.setParent = child;

        this.queue.addCommand("swap", [topNode.getId, child.getId]);  
        //this.queue.addCommand("recMove", [child]); 
        //this.queue.addCommand("RBredrawTree", [this.getRoot, child]);
    }

    getSuccessor(curNode) {
        if (curNode.getLeft.getIsNull) {
            return curNode;
        } else {
            return curNode.getLeft;
        }
    } 

    setNodeColour(node, isRed) {
        node.setIsRed = isRed;
        if (node.getIsNull==false) {
            if (isRed) {
                this.queue.addCommand("highlightNode", [node.getId, 'red']);
            } else {
                this.queue.addCommand("highlightNode", [node.getId, 'gray']);
            }
        }

    }

}
   