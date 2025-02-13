class AVLTree {
    //Getters and setters for Tree variables
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

    getTreeName() {
        //alert("I'm a AVL");
        this.queue.runCommands();
    }

    preOrder(cur) {
        if (cur != null) {
            alert(cur.getId);
            this.inOrder(cur.getLeft);
            this.inOrder(cur.getRight);
        }

    }

    traverse(node) {
        if (node != null) {
            return ["(",node.getId, this.traverse(node.getLeft), this.traverse(node.getRight),")"];
        } else {
            return 'x';
        }
    }    

    asdf() {
        alert("root: " + this.getRoot.getId + " - left: " + this.getRoot.getLeft.getId + " - right: " + this.getRoot.getRight.getId);
    }

    remove(nodeVal) {
        this.queue.addCommand("highlightLine", ["L0"]);
        this.queue.addCommand("setProcess", ["search"]);
        var toRemove = this.search(this.getRoot, nodeVal);
        this.queue.addCommand("setProcess", ["remove"]);
        var balanceStart = null;

        if (toRemove != null) {
            this.queue.addCommand("highlightLine", ["L1"]);
            this.queue.addCommand("highlightLine", ["L2"]);
            //If the removed node has no children.
            if (toRemove.getLeft == null && toRemove.getRight == null) {
                if (this.getRoot.getId == toRemove.getId) {
                    this.setRoot = null;
                } else {
                    if (toRemove.getId > toRemove.getParent.getId) {
                        toRemove.getParent.setRight = null;
                    } else {
                        toRemove.getParent.setLeft = null;
                    }
                    balanceStart = toRemove.getParent;
                    
                }
                
                this.queue.addCommand("removeNode", [toRemove.getId]);
                this.queue.addCommand("redrawTree", [this.getRoot, null]);
                this.queue.addCommand("highlightLine", ["L3"]);
                this.queue.addCommand("highlightLine", ["L4"]);

            //If the removed node has only a right child.
            } else if (toRemove.getLeft == null && toRemove.getRight != null) {
                //Sets the successor and parent nodes for easier use.
                var successor = this.getSuccessor(toRemove.getRight);                

                //Will be null if removed node is root.
                var parentOfRemoved = toRemove.getParent;

                //If the successor is not the right child of the removed node.
                if (successor.getParent.getId != toRemove.getId) {

                    //If the successor has a right subtree.
                    if (successor.getRight != null) {
                        //Creates the relationship between the child of the successor and the parent of the successor.
                        successor.getParent.setLeft = successor.getRight;
                        successor.getRight.setParent = successor.getParent;
                        balanceStart = successor.getRight;
                    } else {
                        balanceStart = successor.getParent;
                    }

                    //Creates the connection between the successor and the right child of the removed node.
                    successor.setRight = toRemove.getRight;
                    toRemove.getRight.setParent = successor;

                }

                if (parentOfRemoved == null) {
                    this.setRoot = successor;
                } else {
                    //Sets the child of the parent of the removed node to be the successor.
                    if (parentOfRemoved.getId > toRemove.getId) {
                        parentOfRemoved.setLeft = successor;
                    } else {
                        parentOfRemoved.setRight = successor;
                    }
                }

                successor.setParent = parentOfRemoved;

                this.queue.addCommand("highlightLine", ["L2"]);
                this.queue.addCommand("highlightLine", ["L5"]);
                this.queue.addCommand("highlightLine", ["L6"]);
                this.queue.addCommand("highlightNode", [successor.getId, "lightgreen"]);
                this.queue.addCommand("initMove", [successor, toRemove.getId]);
                this.queue.addCommand("highlightNode", [successor.getId, "white"]);
                

            //If the removed node has only a left child or 2 children.
            //The tree will always replace the removed node with the Precessor when it can.
            } else {
                var precessor = this.getPrecessor(toRemove.getLeft);

                //Will be null is removed node is root.
                var parentOfRemoved = toRemove.getParent;

                if (precessor.getParent.getId != toRemove.getId) {
                    if (precessor.getLeft != null) {
                        //Creates the relationship between the child of the precessor and the parent of the precessor.                    
                        precessor.getLeft.setParent = precessor.getParent;
                        balanceStart = precessor.getLeft;
                    } else {
                        balanceStart = precessor.getParent;
                    }

                    precessor.getParent.setRight = precessor.getLeft;
                    precessor.setLeft = toRemove.getLeft;
                    toRemove.getLeft.setParent = precessor;
                } else {
                    balanceStart = precessor;
                }

                if (parentOfRemoved == null) {
                    this.setRoot = precessor;
                } else {
                    //Creates the connnection between the precessor and the parent of the removed node.
                    if (parentOfRemoved.getId > toRemove.getId) {
                        parentOfRemoved.setLeft = precessor;  
                    } else {
                        parentOfRemoved.setRight = precessor;
                    }
                }

                precessor.setParent = parentOfRemoved;       
                
                if (toRemove.getRight != null) {
                    toRemove.getRight.setParent = precessor;
                    precessor.setRight = toRemove.getRight;
                }

                this.queue.addCommand("highlightLine", ["L2"]);
                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightLine", ["L8"]);
                this.queue.addCommand("highlightNode", [precessor.getId, "lightgreen"]);
                this.queue.addCommand("initMove", [precessor, toRemove.getId]);
                this.queue.addCommand("highlightNode", [precessor.getId, "white"]);
            }

            //Checks the tree for any imbalances caused by the removal.
            //The node it starts from is the lowest node included in the removal operation.
            
            this.queue.addCommand("removeNode", [toRemove.getId]);
            this.queue.addCommand("highlightLine", ["L9"]);
            this.queue.addCommand("setProcess", ["balance"]);
            this.checkBalance(balanceStart);
            this.queue.addCommand("redrawTree", [this.getRoot, null]);
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();
        } else {
            this.queue.addCommand("highlightLine", ["L10"]);
            this.queue.addCommand("highlightLine", ["L11"]);
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();
            alert("Value does not exist so cannot be rmeoved");
        }

        
    }

    getPrecessor(initialNode) {
        this.queue.addCommand("highlightNode", [initialNode.getId, "lightblue"]);
        //Finds the largest node in the left subtree of initialNode;
        if (initialNode.getRight == null) {
            this.queue.addCommand("highlightNode", [initialNode.getId, "lightgreen"]);
            this.queue.addCommand("highlightNode", [initialNode.getId, "white"]);
            //alert("precessor - " + initialNode.getId);
            return initialNode;
        } else {
            this.queue.addCommand("highlightNode", [initialNode.getId, "white"]);
            return this.getPrecessor(initialNode.getRight);
        }
    }   

    getSuccessor(initialNode) {        
        this.queue.addCommand("highlightNode", [initialNode.getId, "lightblue"]);
        //Finds the smallest node in the right subtree of initialNode;
        if (initialNode.getLeft == null) {
            //alert("precessor - " + initialNode.getId);
            this.queue.addCommand("highlightNode", [initialNode.getId, "lightgreen"]);
            this.queue.addCommand("highlightNode", [initialNode.getId, "white"]);
            return initialNode;
        } else {
            this.queue.addCommand("highlightNode", [initialNode.getId, "white"]);
            return this.getSuccessor(initialNode.getLeft);
        }
    }

    insert(nodeVal, nodeArr) {
        var newNode = new Node(parseInt(nodeVal, 10));
        this.queue.addCommand("highlightLine", ["L0"]);
        if (this.getRoot == null) {
            this.queue.addCommand("highlightLine", ["L1"]);
            this.queue.addCommand("highlightLine", ["L2"]);
            //If the tree is empty, sets the root of the tree to be the new value.
            this.setRoot = newNode;
            this.queue.addCommand("createRoot", [nodeVal]);
            this.queue.addCommand("highlightNode", [newNode.getId, "lightblue"]);
            this.queue.addCommand("highlightNode", [newNode.getId, "white"]);

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
        this.queue.addCommand("highlightLine", ["L4"]);
        this.queue.addCommand("highlightNode", [curNode.getId, "lightblue"]);
        if (curNode.getParent) {
            this.queue.addCommand("highlightNode", [curNode.getParent.getId, "white"]);
        }

        if (newNode.getId > curNode.getId) {
            this.queue.addCommand("highlightLine", ["L7"]);
            if (curNode.getRight == null) {
                //inserts the node as the right child 
                curNode.setRight = newNode;
                newNode.setParent = curNode;      
                          
                this.queue.addCommand("highlightLine", ["L10"]);
                this.queue.addCommand("highlightLine", ["L11"]);

                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'r', depth]);
                this.queue.addCommand("highlightNode", [newNode.getId, "lightblue"]);
                this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
                this.queue.addCommand("highlightNode", [newNode.getId, "white"]);

                
                this.queue.addCommand("setProcess", ["balance"]);
                this.checkBalance(newNode);  

            } else {                
                this.queue.addCommand("highlightLine", ["L8"]);
                this.queue.addCommand("highlightLine", ["L9"]);

                depth++;
                this.recursiveInsert(newNode, curNode.getRight, depth, nodeArr);
            }
        } else if (newNode.getId < curNode.getId) {
            this.queue.addCommand("highlightLine", ["L12"]);
            if (curNode.getLeft == null) {

                curNode.setLeft = newNode;
                newNode.setParent = curNode;

                this.queue.addCommand("highlightLine", ["L15"]);
                this.queue.addCommand("highlightLine", ["L16"]); 

                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'l', depth]);
                this.queue.addCommand("highlightNode", [newNode.getId, "lightblue"]);
                this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
                this.queue.addCommand("highlightNode", [newNode.getId, "white"]);

                this.queue.addCommand("setProcess", ["balance"]);
                this.checkBalance(newNode);               
                
                
            } else {
                this.queue.addCommand("highlightLine", ["L13"]);
                this.queue.addCommand("highlightLine", ["L14"]);

                depth++;
                this.recursiveInsert(newNode, curNode.getLeft, depth, nodeArr);
            }
        } else if (newNode.getId == curNode.getId) {
            //Show node already exists.
            alert("Value already exists in the tree");

            this.queue.addCommand("highlightLine", ["L5"]);
            this.queue.addCommand("highlightLine", ["L6"]);
            this.queue.addCommand("setProcess", ["none"]);

        } else {
            alert("Something has gone wrong.");
        }
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


        // if (currentNode == null) {
        //     //Value does not exist.
        //     alert("Value does not exist");

        //     this.queue.runCommands();
        //     return null;
        // } else {
        //     this.queue.addCommand("highlightNode", [currentNode.getId, "lightblue"]);
        //     if (targetNode == currentNode.getId) {
        //         this.queue.addCommand("highlightNode", [currentNode.getId, "lightgreen"]);
        //         this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
        //         this.queue.runCommands();
        //         alert("Found - " + currentNode.getId);
        //         return currentNode;
        //     } else {
        //         this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
        //         if (targetNode > currentNode.getId) {
        //             return this.search(currentNode.getRight, targetNode);
        //         } else if (targetNode < currentNode.getId) {
        //             return this.search(currentNode.getLeft, targetNode);
        //         }                
        //     }    
        // }     

    }

    rebalance(targetNode, balanceFactor) {
        //alert("Rebalance! - " + targetNode.getId);
        if (balanceFactor > 1) {
            this.queue.addCommand("highlightLine", ["L2"]);
            //anticlockwise rotation
            var midNode = targetNode.getRight;

            if(this.calculateHeight(midNode.getLeft) < this.calculateHeight(midNode.getRight)) {
                //Regular rotation
                this.queue.addCommand("highlightLine", ["L5"]);
                this.antiClockwiseRotation(targetNode, midNode);
            } else {
                //Special rotation

                var bottomNode = midNode.getLeft;

                //Set right child of A to be C
                //Set parent of C to be A
                targetNode.setRight = bottomNode;
                bottomNode.setParent = targetNode;
                
                //Set left child of B to be Y
                //Set parent of Y to be B
                midNode.setLeft = bottomNode.getRight;
                if (bottomNode.getRight != null) {
                    bottomNode.getRight.setParent = midNode;
                }

                //Set right child of C to be B
                //Set parent of B to be C
                bottomNode.setRight = midNode;
                midNode.setParent = bottomNode;

                this.queue.addCommand("highlightLine", ["L3"]);
                this.queue.addCommand("highlightLine", ["L4"]);
                this.queue.addCommand("highlightLine", ["L5"]);
                this.antiClockwiseRotation(targetNode, bottomNode);
            }


        } else {
            //clockwise rotation
            var midNode = targetNode.getLeft;
            this.queue.addCommand("highlightLine", ["L6"]);
            if (this.calculateHeight(midNode.getLeft) > this.calculateHeight(midNode.getRight)) {
                //Regular rotation
                this.queue.addCommand("highlightLine", ["L9"]);
                this.clockwiseRotation(targetNode, midNode);

            } else {
                //Special rotation
                
                var bottomNode = midNode.getRight;

                //Set left child of A to be C
                //Set parent of C to be A
                targetNode.setLeft = bottomNode;
                bottomNode.setParent = targetNode;

                //Set right child of B to be Z
                //Set parent of Z to be B 
                midNode.setRight = bottomNode.getLeft;
                if (bottomNode.getLeft != null) {
                    bottomNode.getLeft.setParent = midNode;
                }

                //Set parent of B to be C
                //Set left child of C to be B
                midNode.setParent = bottomNode;
                bottomNode.setLeft = midNode;

                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightLine", ["L8"]);
                this.queue.addCommand("highlightLine", ["L9"]);
                this.clockwiseRotation(targetNode, bottomNode);
                
            }
        }
        this.checkBalance(targetNode);
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

        this.queue.addCommand("swap", [topNode.getId, midNode.getId]);  
        this.queue.addCommand("recMove", [midNode, midNode.calcDepth()]); 
        this.queue.addCommand("redrawTree", [this.getRoot, midNode]);
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
        this.queue.addCommand("recMove", [midNode, midNode.calcDepth()]);
        this.queue.addCommand("redrawTree", [this.getRoot, midNode]);
    }

    checkBalance(curNode) {
        var curBalance = this.calculateBalance(curNode);
        this.queue.addCommand("highlightLine", ["L0"]);
        this.queue.addCommand("highlightNode", [curNode.getId, "lightblue"]);
        if (curBalance > 1 || curBalance <-1) {
            //UNBALANCED
            //alert("unbalanced - " + curNode.getId);
            this.queue.addCommand("highlightNode", [curNode.getId, "red"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
            this.rebalance(curNode, curBalance);
        } else {
            this.queue.addCommand("highlightLine", ["L10"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "lightgreen"]);
            this.queue.addCommand("highlightLine", ["L11"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
            if (curNode.getParent != null) {
                this.queue.addCommand("highlightLine", ["L14"]);
                this.queue.addCommand("highlightLine", ["L15"]);
                this.checkBalance(curNode.getParent);
            } else {
                this.queue.addCommand("highlightLine", ["L12"]);
                this.queue.addCommand("highlightLine", ["L13"]);
            }
            
        }



        // if (curNode == null) {
        //     //No imbalance
        //     alert("5");
        // } else {
        //     var curBalance = this.calculateBalance(curNode);
        //     //this.queue.addCommand("highlightLine", ["L0"]);
        //     this.queue.addCommand("highlightNode", [curNode.getId, "lightblue"]);
        //     if (curBalance > 1 || curBalance <-1) {
        //         //UNBALANCED
        //         alert("unbalanced - " + curNode.getId);
        //         this.queue.addCommand("highlightNode", [curNode.getId, "red"]);
        //         this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
        //         this.rebalance(curNode, curBalance);
        //     } else {
        //         this.queue.addCommand("highlightLine", ["L10"]);
        //         this.queue.addCommand("highlightNode", [curNode.getId, "lightgreen"]);
        //         this.queue.addCommand("highlightLine", ["L11"]);
        //         this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
        //         this.checkBalance(curNode.getParent);
        //     }
        // }
    }

    calculateBalance(checkNode) {
        var balanceFactor = this.calculateHeight(checkNode.getRight) - this.calculateHeight(checkNode.getLeft);
        return balanceFactor;
    }

    calculateHeight(checkNode) {
        if(checkNode == null) {
            return -1;
        } else {
            var rightHeight = this.calculateHeight(checkNode.getRight);
            var leftHeight = this.calculateHeight(checkNode.getLeft);
            if (rightHeight > leftHeight) {
                return (1+rightHeight);
            } else {
                return (1+leftHeight);
            }

        }
    }

}