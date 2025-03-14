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

    //Performs a pre-order traversal on the tree.
    //Used to get the current state of the tree for animation.
    traverse(node) {
        if (node != null) {
            return [node.getId, this.traverse(node.getLeft), this.traverse(node.getRight)];
        } else {
            return null;
        }
    }    

    //Removes a node from the tree.
    remove(nodeVal, nodeArr) {
        this.queue.addCommand("highlightLine", ["L0"]);

        var toRemove = null;

        //Searches for the node to be removed if the tree is not empty.
        if (this.getRoot!=null) {
            this.queue.addCommand("setProcess", ["search"]);
            toRemove = this.search(this.getRoot, nodeVal);
        }
        
        //Stores the node that should be started at when checking the balance of the tree.
        var balanceStart = null;

        if (toRemove != null) {
            this.queue.addCommand("setProcess", ["remove"]);
            this.queue.addCommand("highlightLine", ["L1"]);
            this.queue.addCommand("highlightLine", ["L2"]);

            //If the removed node has no children.
            if (toRemove.getLeft == null && toRemove.getRight == null) {

                //Sets the tree as empty if the removed node was the root.
                if (this.getRoot.getId == toRemove.getId) {
                    this.setRoot = null;
                } else {
                    //Sets the parent of the node to have a null node in place of the removed node.
                    if (toRemove.getId > toRemove.getParent.getId) {
                        toRemove.getParent.setRight = null;
                    } else {
                        toRemove.getParent.setLeft = null;
                    }
                    balanceStart = toRemove.getParent;
                    
                }
                
                this.queue.addCommand("removeNode", [toRemove.getId]);
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

                } else {
                    balanceStart = toRemove.getParent;
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

                var parent = successor.getParent;
                var lineParent = null;
                if (parent!=null) {
                    lineParent = parent.getId;
                }
                this.queue.addCommand("initMoveArr", [successor.getId, lineParent, toRemove.getId, this.traverse(successor), successor.calcDepth()]);

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

                var parent = precessor.getParent;
                var lineParent = null;
                if (parent!=null) {
                    lineParent = parent.getId;
                }
                this.queue.addCommand("initMoveArr", [precessor.getId, lineParent, toRemove.getId, this.traverse(precessor), precessor.calcDepth()]);                
                this.queue.addCommand("highlightNode", [precessor.getId, "white"]);
            }

            //Checks the tree for any imbalances caused by the removal.
            //The node it starts from is the lowest node included in the removal operation.
            this.queue.addCommand("removeNode", [toRemove.getId]);
            this.queue.addCommand("highlightLine", ["L9"]);
            this.queue.addCommand("setProcess", ["balance"]);

            //Calls a function that checks if the tree is balanced after the operation.
            this.checkBalance(balanceStart);

            var arrayRep = this.traverse(this.getRoot);
            this.queue.addCommand("redrawFromArray", [arrayRep, null]);

            //Checks to see if there are any other values in the input to be removed.
            //Allows for multiple operations in one input
            if (nodeArr.length > 1) {
                //Removes the first value in the input
                nodeArr.shift();
                //Calls for the next value to be removed.
                this.queue.addCommand("setProcess", ["remove"]);
                this.remove(nodeArr[0], nodeArr);
            } else {
                //Set process to none.
                //Starts the animation.
                this.queue.addCommand("setProcess", ["none"]);  
                this.queue.runCommands();
            }

        } else {
            this.queue.addCommand("highlightLine", ["L10"]);
            this.queue.addCommand("highlightLine", ["L11"]);

            //Checks to see if there are any other values in the input to be removed.
            //Allows for multiple operations in one input
            if (nodeArr.length > 1) {
                //Removes the first value in the input
                nodeArr.shift();
                //Calls for the next value to be removed.
                this.queue.addCommand("setProcess", ["remove"]);
                this.remove(nodeArr[0], nodeArr);
            } else {
                //Set process to none.
                //Starts the animation.
                this.queue.addCommand("setProcess", ["none"]);  
                this.queue.runCommands();
            }

        }        
    }

    //Finds the largest node in the left subtree of initialNode
    getPrecessor(initialNode) {
        //The largest node is the rightmost node, meaning it is the first node with no right child.
        this.queue.addCommand("highlightNode", [initialNode.getId, "lightblue"]);
        if (initialNode.getRight == null) {
            this.queue.addCommand("highlightNode", [initialNode.getId, "lightgreen"]);
            this.queue.addCommand("highlightNode", [initialNode.getId, "white"]);
            return initialNode;
        } else {
            this.queue.addCommand("highlightNode", [initialNode.getId, "white"]);
            return this.getPrecessor(initialNode.getRight);
        }
    }   

    //Finds the smallest node in the right subtree of initialNode.
    getSuccessor(initialNode) {        
        //The smallesr node is the leftmonst node, meaning it is the first node with no left child.
        this.queue.addCommand("highlightNode", [initialNode.getId, "lightblue"]);        
        if (initialNode.getLeft == null) {
            this.queue.addCommand("highlightNode", [initialNode.getId, "lightgreen"]);
            this.queue.addCommand("highlightNode", [initialNode.getId, "white"]);
            return initialNode;
        } else {
            this.queue.addCommand("highlightNode", [initialNode.getId, "white"]);
            return this.getSuccessor(initialNode.getLeft);
        }
    }

    //Inserts a node into the tree.
    insert(nodeVal, nodeArr) {

        //Creates a new node object to be inserted
        var newNode = new Node(parseInt(nodeVal, 10));

        this.queue.addCommand("highlightLine", ["L0"]);

        //If the tree is empty, sets the root of the tree to be the new value.
        if (this.getRoot == null) {
            this.queue.addCommand("highlightLine", ["L1"]);
            this.queue.addCommand("highlightLine", ["L2"]);
            
            this.setRoot = newNode;
            this.queue.addCommand("createRoot", [nodeVal]);
            this.queue.addCommand("highlightNode", [newNode.getId, "lightblue"]);
            this.queue.addCommand("highlightNode", [newNode.getId, "white"]);

            //Inserts the next value in the input list.
            if (nodeArr.length > 1) {
                nodeArr.shift();
                this.insert(nodeArr[0], nodeArr);
            } else {
                //Set process to none.
                //Begins the animation.
                this.queue.addCommand("setProcess", ["none"]);  
                this.queue.runCommands();
            }

        //Finds the location to insert the node into if the tree is not empty.
        } else {
            this.queue.addCommand("highlightLine", ["L3"]);

            //Inserts the node.
            this.recursiveInsert(newNode, this.getRoot, 1, nodeArr);

            //Redraws the tree to fix any visual errors caused by animations.
            var arrayRep = this.traverse(this.getRoot);
            this.queue.addCommand("redrawFromArray", [arrayRep, null]);

            //Inserts the next value in the input list.
            if (nodeArr.length > 1) {
                nodeArr.shift();
                this.insert(nodeArr[0], nodeArr);
            } else {
                //Set process to none.
                //Begins the animation.
                this.queue.addCommand("setProcess", ["none"]);  
                this.queue.runCommands();
            }
        }    
    }

    //Searches for the location to insert the new node into.
    recursiveInsert(newNode, curNode, depth, nodeArr) {
        this.queue.addCommand("highlightLine", ["L4"]);
        this.queue.addCommand("highlightNode", [curNode.getId, "lightblue"]);
        if (curNode.getParent) {
            this.queue.addCommand("highlightNode", [curNode.getParent.getId, "white"]);
        }

        if (newNode.getId > curNode.getId) {
            this.queue.addCommand("highlightLine", ["L7"]);
            if (curNode.getRight == null) {
                //Inserts the node as the right child of the current node.
                curNode.setRight = newNode;
                newNode.setParent = curNode;      
                          
                this.queue.addCommand("highlightLine", ["L10"]);
                this.queue.addCommand("highlightLine", ["L11"]);

                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'r', depth]);
                this.queue.addCommand("highlightNode", [newNode.getId, "lightblue"]);
                this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
                this.queue.addCommand("highlightNode", [newNode.getId, "white"]);

                //Checks the balance of the tree.
                this.queue.addCommand("setProcess", ["balance"]);
                this.checkBalance(newNode);  

            } else {   
                //Searches the right child of the current node.             
                this.queue.addCommand("highlightLine", ["L8"]);
                this.queue.addCommand("highlightLine", ["L9"]);

                depth++;
                this.recursiveInsert(newNode, curNode.getRight, depth, nodeArr);
            }
        } else if (newNode.getId < curNode.getId) {
            this.queue.addCommand("highlightLine", ["L12"]);
            if (curNode.getLeft == null) {
                //Inserts the node as the left child of the current node.
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
                //Searches the left child of the current node.
                this.queue.addCommand("highlightLine", ["L13"]);
                this.queue.addCommand("highlightLine", ["L14"]);

                depth++;
                this.recursiveInsert(newNode, curNode.getLeft, depth, nodeArr);
            }
        } else if (newNode.getId == curNode.getId) {
            //The node already exists in the tree and cannot be inserted.
            //Nodes must be unique in order for the animation to function.

            this.queue.addCommand("highlightLine", ["L5"]);
            this.queue.addCommand("highlightLine", ["L6"]);

            this.queue.addCommand("highlightNode", [curNode.getId, "red"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
            this.queue.addCommand("setProcess", ["none"]);

        } else {
            //The code should never reach here.
            alert("Something has gone wrong.");
        }
    }

    //Searches for a specified value.
    search(currentNode, targetNode) {
        this.queue.addCommand("highlightLine", ["L1"]);
        this.queue.addCommand("highlightNode", [currentNode.getId, "lightblue"]);

        //Compares the current node against the value being searched for
        if (targetNode == currentNode.getId) {
            this.queue.addCommand("highlightLine", ["L2"]);
            this.queue.addCommand("highlightLine", ["L3"]);
            this.queue.addCommand("highlightNode", [currentNode.getId, "lightgreen"]);
            this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
            //Returns the node that matches the value.
            return currentNode;
        } else if (targetNode > currentNode.getId) {
            this.queue.addCommand("highlightLine", ["L4"]);
            if (currentNode.getRight != null) {
                this.queue.addCommand("highlightLine", ["L5"]);
                this.queue.addCommand("highlightLine", ["L6"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
                //Searches the right subtree of the current node.
                return this.search(currentNode.getRight, targetNode);
            } else {
                //The node does not exist in the tree so searching stops.
                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightLine", ["L8"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "red"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
                return null;
            }
        } else if (targetNode < currentNode.getId) {
            this.queue.addCommand("highlightLine", ["L9"]);
            if (currentNode.getLeft != null) {
                this.queue.addCommand("highlightLine", ["L10"]);
                this.queue.addCommand("highlightLine", ["L11"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
                //Searches the left subtree of the current node.
                return this.search(currentNode.getLeft, targetNode);
            } else {
                this.queue.addCommand("highlightLine", ["L12"]);
                this.queue.addCommand("highlightLine", ["L13"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "red"]);
                this.queue.addCommand("highlightNode", [currentNode.getId, "white"]);
                //The node does not exist in the tree so searching stops.
                return null;
            }
        }  

    }

    //Performs a rotation on the specified node to balance that part of the tree.
    rebalance(targetNode, balanceFactor) {
       
        //Checks which direction of rotation is needed.
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
                this.queue.addCommand("preRotationAllignment", [midNode, bottomNode, 'r', this.traverse(this.getRoot)]);
                
                //Changes the connections between nodes to prepare them for a rotation.
                //Changes the bottom node to become the middle node.

                targetNode.setRight = bottomNode;
                bottomNode.setParent = targetNode;
                               
                midNode.setLeft = bottomNode.getRight;
                if (bottomNode.getRight != null) {
                    bottomNode.getRight.setParent = midNode;
                }

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
                this.queue.addCommand("preRotationAllignment", [midNode, bottomNode, 'l', this.traverse(this.getRoot)]);

                //Changes the connections between nodes to prepare them for a rotation.
                //Changes the bottom node to become the middle node.
                targetNode.setLeft = bottomNode;
                bottomNode.setParent = targetNode;

                midNode.setRight = bottomNode.getLeft;
                if (bottomNode.getLeft != null) {
                    bottomNode.getLeft.setParent = midNode;
                }

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

    //Performs a anticlockwise rotation on the specified nodes.
    antiClockwiseRotation(topNode, midNode) {

        //Changes the connections of all nodes involved in the rotation.
        if (midNode.getLeft != null) {
            topNode.setRight = midNode.getLeft;
            midNode.getLeft.setParent = topNode;
        } else {
            topNode.setRight= null;
        }
        
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

        midNode.setLeft = topNode;
        topNode.setParent = midNode;

        //Calls the necessary animation functions to show the rotation accurately.
        this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), midNode.getId]);
        this.queue.addCommand("recMoveArr", [this.traverse(midNode), midNode.calcDepth()+1]);         

        var parent = midNode.getParent;
        if (parent != null) {
            this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), parent.getId]);
            this.queue.addCommand("recMoveArr", [this.traverse(parent), parent.calcDepth()]);
        } else {
            this.queue.addCommand("moveToRootArray", [this.traverse(midNode)]);
            
        }

        var arrayRep = this.traverse(this.getRoot);
        this.queue.addCommand("redrawFromArray", [arrayRep, null]);
    }

    //Performs a clockwise rotation on the specified nodes.
    clockwiseRotation(topNode, midNode) {

        //Changes the connections of all nodes involved in the rotation.
        if (midNode.getRight != null) {
            topNode.setLeft = midNode.getRight;
            midNode.getRight.setParent = topNode;
        } else {
            topNode.setLeft = null;
        }

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
        
        midNode.setRight = topNode;
        topNode.setParent = midNode;

        //Calls the necessary animation functions to show the rotation accurately.
        this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), midNode.getId]);
        this.queue.addCommand("recMoveArr", [this.traverse(midNode), midNode.calcDepth()+1]);

        var parent = midNode.getParent;
        if (parent != null) {
            this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), parent.getId]);
            this.queue.addCommand("recMoveArr", [this.traverse(parent), parent.calcDepth()]);
        } else {
            this.queue.addCommand("moveToRootArray", [this.traverse(midNode)]);
        }

        var arrayRep = this.traverse(this.getRoot);
        this.queue.addCommand("redrawFromArray", [arrayRep, null]);
    }

    //Moves up the tree from a starting node and checks the balance of each one.
    //If an unbalanced node is found then it is balanced.
    checkBalance(curNode) {
        var curBalance = this.calculateBalance(curNode);
        this.queue.addCommand("highlightLine", ["L0"]);
        this.queue.addCommand("highlightNode", [curNode.getId, "lightblue"]);
        if (curBalance > 1 || curBalance <-1) {
            //The node is unalanced and must be balanced.
            this.queue.addCommand("highlightNode", [curNode.getId, "red"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
            this.rebalance(curNode, curBalance);
        } else {
            this.queue.addCommand("highlightLine", ["L10"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "lightgreen"]);
            this.queue.addCommand("highlightLine", ["L11"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "white"]);

            //Checks the balance of the parent of the current node if one exists.
            if (curNode.getParent != null) {
                this.queue.addCommand("highlightLine", ["L14"]);
                this.queue.addCommand("highlightLine", ["L15"]);
                this.checkBalance(curNode.getParent);
            } else {
                this.queue.addCommand("highlightLine", ["L12"]);
                this.queue.addCommand("highlightLine", ["L13"]);
                //The tree has been checked and must be balanced.
            }
            
        }
    }

    //Calculates the balance of the given node.
    calculateBalance(checkNode) {
        var balanceFactor = this.calculateHeight(checkNode.getRight) - this.calculateHeight(checkNode.getLeft);
        return balanceFactor;
    }

    //Calculates the height of the given node.
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