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
                return null;
            } else {
                return [node.getId, this.traverse(node.getLeft), this.traverse(node.getRight)];
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
        this.queue.addCommand("highlightLine", ["L1"]);
        if (toFind == curNode.getId) {
            this.queue.addCommand("highlightLine", ["L2"]);
            this.queue.addCommand("highlightLine", ["L3"]);
            this.queue.addCommand("highlightBorder", [curNode.getId, "lime"]);
            this.queue.addCommand("highlightBorder", [curNode.getId, "black"]);
            // this.queue.addCommand("setProcess", ["none"]);
            // this.queue.runCommands();
            return curNode;
        } else if (toFind > curNode.getId) {
            this.queue.addCommand("highlightLine", ["L4"]);
            if (curNode.getRight.getIsNull==false) {
                this.queue.addCommand("highlightLine", ["L5"]);
                this.queue.addCommand("highlightLine", ["L6"]);
                return this.search(curNode.getRight, toFind);
            } else {
                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightLine", ["L8"]);
                this.queue.addCommand("highlightBorder", [curNode.getId, "red"]);
                this.queue.addCommand("highlightBorder", [curNode.getId, "black"]);
                // this.queue.addCommand("setProcess", ["none"]);
                // this.queue.runCommands();
                return null;
            }
        } else if (toFind < curNode.getId) {
            this.queue.addCommand("highlightLine", ["L9"]);
            if (curNode.getLeft.getIsNull==false) {
                this.queue.addCommand("highlightLine", ["L10"]);
                this.queue.addCommand("highlightLine", ["L11"]);
                return this.search(curNode.getLeft, toFind);
            } else {
                this.queue.addCommand("highlightLine", ["L12"]);
                this.queue.addCommand("highlightLine", ["L13"]);
                this.queue.addCommand("highlightBorder", [curNode.getId, "red"]);
                this.queue.addCommand("highlightBorder", [curNode.getId, "black"]);
                // this.queue.addCommand("setProcess", ["none"]);
                // this.queue.runCommands();
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
       
        if (this.getRoot.getIsNull) {
            this.queue.addCommand("highlightLine", ["L0"]);
            this.queue.addCommand("highlightLine", ["L1"]);
        } else {
            this.queue.addCommand("highlightLine", ["L2"]);
            this.queue.addCommand("highlightLine", ["L3"]);
        }

        while (canInsert&&currentNode.getIsNull==false) {
            this.queue.addCommand("highlightBorder", [currentNode.getId, "blue"]);
            if (currentNode.getParent!=null) {
                this.queue.addCommand("highlightBorder", [currentNode.getParent.getId, "black"]);
            }
            depth++;
            lastNode=currentNode;
            if (newNode.getId<currentNode.getId) {
                this.queue.addCommand("highlightLine", ["L9"]);
                if (currentNode.getLeft.getIsNull) {
                    this.queue.addCommand("highlightLine", ["L12"]);
                    this.queue.addCommand("highlightLine", ["L13"]);
                } else {
                    this.queue.addCommand("highlightLine", ["L10"]);
                    this.queue.addCommand("highlightLine", ["L11"]);
                }
                currentNode=currentNode.getLeft;
            } else if (newNode.getId>currentNode.getId) {
                this.queue.addCommand("highlightLine", ["L4"]);
                if (currentNode.getRight.getIsNull) {
                    this.queue.addCommand("highlightLine", ["L7"]);
                    this.queue.addCommand("highlightLine", ["L8"]);
                } else {
                    this.queue.addCommand("highlightLine", ["L5"]);
                    this.queue.addCommand("highlightLine", ["L6"]);
                }
                currentNode=currentNode.getRight;
            } else {
                this.queue.addCommand("highlightLine", ["L14"]);
                this.queue.addCommand("highlightLine", ["L15"]);
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
            
            this.queue.addCommand("highlightLine", ["L16"]);
            this.queue.addCommand("setProcess", ["insertFixup"]);
            this.insertFixup(newNode);

        }

        this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), null]);
        if (nodeArr.length > 1) {
            nodeArr.shift();
            this.queue.addCommand("setProcess", ["insert"]);
            this.insert(nodeArr[0], nodeArr);
        } else {
            //Set process to none.
            this.queue.addCommand("setProcess", ["none"]);  
            this.queue.runCommands();
        }

        // this.queue.addCommand("setProcess", ["none"]);
        // this.queue.runCommands();
    } 

    insertFixup(curNode) {
        //This relies on javascript evaluating the first condition before the second.
        //If the current node has no parent, it will not check if the parent is red.
        //This way of calculating it prevents an error from occuring.
        var changeOccured = false;
        this.queue.addCommand("highlightLine", ["L0"]);
        // this.queue.addCommand("highlightBorder", [lastNode.getId, "black"]);
        while (curNode.getParent!=null) {
            
            this.queue.addCommand("highlightBorder", [curNode.getId, "lime"]);
            if (curNode.getIsRed && curNode.getParent.getIsRed) {
                this.queue.addCommand("highlightLine", ["L1"]);
                if (curNode.getParent.getParent!= null) {
                    if (curNode.getParent==curNode.getParent.getParent.getLeft) {
                        let uncle = curNode.getParent.getParent.getRight;
                        if (uncle.getIsRed) {
                            this.queue.addCommand("highlightLine", ["L2"]);
                            // curNode.getParent.setIsRed = false;
                            // uncle.setIsRed = false;
                            // curNode.getParent.getParent.setIsRed = true;
                            this.queue.addCommand("highlightLine", ["L3"]);
                            this.setNodeColour(curNode.getParent, false);
                            this.queue.addCommand("highlightLine", ["L4"]);
                            this.setNodeColour(uncle, false);
                            this.queue.addCommand("highlightLine", ["L5"]);
                            this.setNodeColour(curNode.getParent.getParent, true);
                        } else {
                            this.queue.addCommand("highlightLine", ["L6"]);
                            if (curNode==curNode.getParent.getRight) {
                                this.queue.addCommand("highlightBorder", [curNode.getId, "black"]);
                                curNode = curNode.getParent;
                                this.queue.addCommand("highlightBorder", [curNode.getId, "lime"]);
                                //this.leftRotation(curNode);
                                this.leftRotationPrep(curNode);
                            }
                            // curNode.getParent.setIsRed = false;
                            // curNode.getParent.getParent.setIsRed = true;
                            this.queue.addCommand("highlightLine", ["L7"]);
                            this.setNodeColour(curNode.getParent, false)
                            this.queue.addCommand("highlightLine", ["L8"]);;
                            this.setNodeColour(curNode.getParent.getParent, true);
                            this.queue.addCommand("highlightLine", ["L9"]);
                            this.rightRotation(curNode.getParent.getParent);
                            changeOccured=true;
                        }
                    } else {
                        let uncle = curNode.getParent.getParent.getLeft;
                        if (uncle.getIsRed) {
                            this.queue.addCommand("highlightLine", ["L2"]);
                            // curNode.getParent.setIsRed = false;
                            // uncle.setIsRed = false;
                            // curNode.getParent.getParent.setIsRed = true;
                            this.queue.addCommand("highlightLine", ["L3"]);
                            this.setNodeColour(curNode.getParent, false);
                            this.queue.addCommand("highlightLine", ["L4"]);
                            this.setNodeColour(uncle, false);
                            this.queue.addCommand("highlightLine", ["L5"]);
                            this.setNodeColour(curNode.getParent.getParent, true);
                        } else {
                            this.queue.addCommand("highlightLine", ["L6"]);
                            if (curNode==curNode.getParent.getLeft) {                                
                                curNode = curNode.getParent;
                                //this.rightRotation(curNode);
                                this.rightRotationPrep(curNode);
                            }
                            // curNode.getParent.setIsRed = false;
                            // curNode.getParent.getParent.setIsRed = true;
                            this.queue.addCommand("highlightLine", ["L7"]);
                            this.setNodeColour(curNode.getParent, false);
                            this.queue.addCommand("highlightLine", ["L8"]);
                            this.setNodeColour(curNode.getParent.getParent, true);
                            this.queue.addCommand("highlightLine", ["L9"]);
                            this.leftRotation(curNode.getParent.getParent);
                            changeOccured=true;
                        }                        
                    }
       
                }
            }
            this.queue.addCommand("highlightBorder", [curNode.getId, "black"]);
            this.queue.addCommand("highlightLine", ["L10"]);
            curNode = curNode.getParent;
            
        }
        if (changeOccured) {
            // this.queue.addCommand("RBRecMove", [this.getRoot, 1]); 
            this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot),null]);
            this.queue.addCommand("recMoveArr", [this.traverse(this.getRoot), 1]); 
            // this.queue.addCommand("RBredrawTree", [this.getRoot, null]); 
        }
        this.queue.addCommand("highlightLine", ["L11"]);
        //this.queue.addCommand("RBredrawTree", [this.getRoot, this.getRoot]);
        this.setNodeColour(this.getRoot, false);
    }

    remove(removeVal, nodeArr) {
        this.queue.addCommand("highlightLine", ["L0"]);
        var toRemove = null;
        if (this.getRoot.getIsNull==false) {
            toRemove = this.search(this.getRoot, removeVal);      
        }  
        
        //alert("to remove? = " + toRemove);
        if (toRemove != null) {
            this.queue.addCommand("setProcess", ["remove"]);
            this.queue.addCommand("highlightBorder", [toRemove.getId, "red"]);    
            this.queue.addCommand("highlightLine", ["L1"]);    

            var x = null;
            var y = toRemove;
            var yOrigIsRed = y.getIsRed;

            if (toRemove.getLeft.getIsNull) {
                this.queue.addCommand("highlightLine", ["L2"]);
                this.queue.addCommand("highlightLine", ["L3"]);
                x = toRemove.getRight;
                if (x.getIsNull==false) {
                    this.queue.addCommand("highlightBorder", [x.getId, "lime"]);                    
                    this.queue.addCommand("highlightBorder", [x.getId, "black"]);
                }
                this.transplant(toRemove, toRemove.getRight);
                this.queue.addCommand("removeNode", [toRemove.getId]);
            } else if (toRemove.getRight.getIsNull) {
                this.queue.addCommand("highlightLine", ["L4"]);
                this.queue.addCommand("highlightLine", ["L5"]);
                x = toRemove.getLeft;
                if (x.getIsNull==false) {
                    this.queue.addCommand("highlightBorder", [x.getId, "lime"]);                  
                    this.queue.addCommand("highlightBorder", [x.getId, "black"]);
                }
                
                this.transplant(toRemove, toRemove.getLeft);
                this.queue.addCommand("removeNode", [toRemove.getId]);
                
            } else {
                this.queue.addCommand("highlightLine", ["L6"]);
                this.queue.addCommand("highlightLine", ["L7"]);
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
                this.queue.addCommand("removeNode", [toRemove.getId]);
                this.queue.addCommand("highlightLine", ["L8"]);
                this.setNodeColour(y, toRemove.getIsRed);
                this.queue.addCommand("highlightBorder", [y.getId, "black"]);
            }
            
            if (yOrigIsRed==false) {
                this.queue.addCommand("highlightLine", ["L9"]);
                this.queue.addCommand("highlightLine", ["L10"]);
                this.queue.addCommand("setProcess", ["deleteFixup"]);
                this.deleteFixup(x);
            }                
            
            
            // this.queue.addCommand("RBredrawTree", [this.getRoot, null]); 
            this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), null]);

            if (nodeArr.length > 1) {
                nodeArr.shift();
                this.queue.addCommand("setProcess", ["remove"]);
                this.remove(nodeArr[0], nodeArr);
            } else {
                //Set process to none.
                this.queue.addCommand("setProcess", ["none"]);  
                this.queue.runCommands();
            }

            // this.queue.addCommand("setProcess", ["none"]);
            // this.queue.runCommands();

        } else {
            alert("Value does not exist");

            if (nodeArr.length > 1) {
                nodeArr.shift();
                this.queue.addCommand("setProcess", ["remove"]);
                this.remove(nodeArr[0], nodeArr);
            } else {
                //Set process to none.
                this.queue.addCommand("setProcess", ["none"]);  
                this.queue.runCommands();
            }

            // this.queue.addCommand("setProcess", ["none"]);
            // this.queue.runCommands();
        }
    }

    deleteFixup(curNode) {
        var changeOccured = false;
        this.queue.addCommand("highlightLine", ["L0"]);
        while (curNode.getParent!=null&&curNode.getIsRed==false) {
            this.queue.addCommand("highlightLine", ["L1"]);
            //if (curNode.getIsRed==false) {
                if (curNode==curNode.getParent.getLeft) {
                    var sibling = curNode.getParent.getRight;
                    if (sibling.getIsRed) {
                        this.queue.addCommand("highlightLine", ["L2"]);
                        // sibling.setIsRed=false;
                        // curNode.getParent.setIsRed = true;
                        this.queue.addCommand("highlightLine", ["L3"]);
                        this.setNodeColour(sibling, false);
                        this.queue.addCommand("highlightLine", ["L4"]);
                        this.setNodeColour(curNode.getParent.setIsRed, false);
                        this.queue.addCommand("highlightLine", ["L5"]);
                        this.leftRotation(curNode.getParent);
                        sibling = curNode.getParent;
                    }
                    if (sibling.getLeft.getIsRed==false&&sibling.getRight.getIsRed==false) {
                        this.queue.addCommand("highlightLine", ["L6"]);
                        // sibling.setIsRed = true;
                        this.queue.addCommand("highlightLine", ["L7"]);
                        this.setNodeColour(sibling, true);
                        this.queue.addCommand("highlightLine", ["L8"]);
                        curNode=curNode.getParent;
                    } else {
                        this.queue.addCommand("highlightLine", ["L9"]);
                        if (sibling.getRight.getIsRed==false) {
                            this.queue.addCommand("highlightLine", ["L10"]);
                            // sibling.getLeft.setIsRed = false;
                            // sibling.setIsRed = true;
                            this.queue.addCommand("highlightLine", ["L11"]);
                            this.setNodeColour(sibling.getLeft, false);
                            this.queue.addCommand("highlightLine", ["L12"]);
                            this.setNodeColour(sibling, true);
                            //this.rightRotation(sibling);
                            this.queue.addCommand("highlightLine", ["L13"]);
                            this.rightRotationPrep(sibling);
                            sibling = curNode.getParent.getRight;
                        }
                        // sibling.setIsRed=curNode.getParent.getIsRed;
                        // curNode.getParent.setIsRed = false;
                        // sibling.getRight.setIsRed = false;
                        this.queue.addCommand("highlightLine", ["L14"]);
                        this.setNodeColour(sibling, curNode.getParent.getIsRed);
                        this.queue.addCommand("highlightLine", ["L15"]);
                        this.setNodeColour(curNode.getParent, false);
                        this.queue.addCommand("highlightLine", ["L16"]);
                        this.setNodeColour(sibling.getRight, false);
                        this.queue.addCommand("highlightLine", ["L17"]);
                        this.leftRotation(curNode.getParent);
                        curNode = this.getRoot;
                    }
                } else {
                    var sibling = curNode.getParent.getLeft;
                    if (sibling.getIsRed) {
                        this.queue.addCommand("highlightLine", ["L2"]);
                        // sibling.setIsRed=false;
                        // curNode.getParent.setIsRed = true;
                        this.queue.addCommand("highlightLine", ["L3"]);
                        this.setNodeColour(sibling, false);
                        this.queue.addCommand("highlightLine", ["L4"]);
                        this.setNodeColour(curNode.getParent, true);
                        this.queue.addCommand("highlightLine", ["L5"]);
                        this.rightRotation(curNode.getParent);
                        sibling = curNode.getParent;
                    }
                    if (sibling.getLeft.getIsRed==false&&sibling.getRight.getIsRed==false) {
                        this.queue.addCommand("highlightLine", ["L6"]);
                        // sibling.setIsRed = true;
                        this.queue.addCommand("highlightLine", ["L7"]);
                        this.setNodeColour(sibling, true);
                        this.queue.addCommand("highlightLine", ["L8"]);
                        curNode=curNode.getParent;
                    } else {
                        this.queue.addCommand("highlightLine", ["L9"]);
                        if (sibling.getLeft.getIsRed==false) {
                            // sibling.getRight.setIsRed = false;
                            // sibling.setIsRed = true;
                            this.queue.addCommand("highlightLine", ["L10"]);
                            this.queue.addCommand("highlightLine", ["L11"]);
                            this.setNodeColour(sibling.getRight, false);
                            this.queue.addCommand("highlightLine", ["L12"]);
                            this.setNodeColour(sibling, true);
                            // this.leftRotation(sibling);
                            this.queue.addCommand("highlightLine", ["L3"]);
                            this.leftRotationPrep(sibling);
                            sibling = curNode.getParent.getLeft;
                        }
                        // sibling.setIsRed=curNode.getParent.getIsRed;
                        // curNode.getParent.setIsRed = false;
                        // sibling.getLeft.setIsRed = false;
                        this.queue.addCommand("highlightLine", ["L14"]);
                        this.setNodeColour(sibling, curNode.getParent.getIsRed);
                        this.queue.addCommand("highlightLine", ["L15"]);
                        this.setNodeColour(curNode.getParent, false);
                        this.queue.addCommand("highlightLine", ["L16"]);
                        this.setNodeColour(sibling.getLeft, false);
                        this.queue.addCommand("highlightLine", ["L17"]);
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
            // this.queue.addCommand("RBRecMove", [this.getRoot, 1]); 
            // this.queue.addCommand("RBredrawTree", [this.getRoot, null]); 
            this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), null]);
            this.queue.addCommand("recMoveArr", [this.traverse(this.getRoot), 1]); 
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
            //this.queue.addCommand("swap", [parent.getId, child.getId]);
            // this.queue.addCommand("initMove", [child, parent.getId]);
            var tempParent = child.getParent;
            var lineParent = null;
            if (tempParent!=null) {
                lineParent = tempParent.getId;
            }
            this.queue.addCommand("initMoveArr", [child.getId, lineParent, parent.getId, this.traverse(child), child.calcDepth()]);
        }
    }

    leftRotationPrep(topNode) {
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

        this.queue.addCommand("preRotationAllignment", [topNode, child, 'l', this.traverse(this.getRoot)]);
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

        //this.queue.addCommand("swap", [topNode.getId, child.getId]);  
        // this.queue.addCommand("RBRecMove", [child, child.calcDepth()+1]); 
        this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), child.getId]);
        this.queue.addCommand("recMoveArr", [this.traverse(child), child.calcDepth()+1]); 

        var parent = child.getParent;
        if (parent != null) {
            // this.queue.addCommand("RBRecMove", [parent, parent.calcDepth()]);
            this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), parent.getId]);
            this.queue.addCommand("recMoveArr", [this.traverse(parent), parent.calcDepth()+1]); 
        } else {
            // this.queue.addCommand("moveToRoot", [child]);
            this.queue.addCommand("moveToRootArray", [this.traverse(child)]);
        }

        //this.queue.addCommand("recMove", [child]); 
        //this.queue.addCommand("RBredrawTree", [this.getRoot, child]);
    }

    rightRotationPrep(topNode) {
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

        this.queue.addCommand("preRotationAllignment", [topNode, child, 'r', this.traverse(this.getRoot)]);
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

        // this.queue.addCommand("RBRecMove", [child, child.calcDepth()+1]); 
        this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), child.getId]);
        this.queue.addCommand("recMoveArr", [this.traverse(child), child.calcDepth()+1]); 

        var parent = child.getParent;
        if (parent != null) {
            // this.queue.addCommand("RBRecMove", [parent, parent.calcDepth()]);
            this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), parent.getId]);
            this.queue.addCommand("recMoveArr", [this.traverse(parent), parent.calcDepth()+1]); 
        } else {
            // this.queue.addCommand("moveToRoot", [child]);
            this.queue.addCommand("moveToRootArray", [this.traverse(child)]);
        }

        // this.queue.addCommand("swap", [topNode.getId, child.getId]);  
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
   