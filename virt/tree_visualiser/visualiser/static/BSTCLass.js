class BSTTree {
    //Getters and setters for Tree variables
    constructor() {
        this.rootNode = null;
        this.queue = new AnimQueue();
    }

    get getRoot() {
        return this.rootNode;
    }    

    set setRoot(r) {
        this.rootNode = r;
    }

    getTreeName() {
        alert("I'm a BST");
    }

    traverse(curNode) {
        if (curNode != null) {
            return [curNode.getId, this.traverse(curNode.getLeft), this.traverse(curNode.getRight)];                 
        } else {
            return null;
        }
    }

    insert(newNodeVal, nodeArr) {
        //Creates a new node from the value given.
        var newNode = new Node(parseInt(newNodeVal, 10));
        //Checks to see if the tree currently has a root.
        if (this.getRoot == null) {
            this.queue.addCommand("highlightLine", ["L1"]);
            //Sets the root of the tree to be the inserted node.
            this.setRoot = newNode;
            this.queue.addCommand("createRoot", [newNode.getId, newNode.getId]);
            this.queue.addCommand("highlightNode", [newNode.getId, "lightblue"]);
            this.queue.addCommand("highlightNode", [newNode.getId, "white"]);

            //Checks to see if the node was inserted as a single value
            //Or if it was inserted as part of a list of values to be inserted.
            if(nodeArr.length > 1) {
                //Removes the first value in the list of values.
                nodeArr.shift();
                //Inserts the next node in the list.
                this.insert(nodeArr[0], nodeArr);
            } else {
                //If no other nodes exist in the list then insertion is over.
                this.queue.addCommand("setProcess", ["none"]);
                this.queue.runCommands();
            }
        } else {
            //Calls a recursive function to insert the node if a root exists.
            this.recursiveInsert(newNode, this.getRoot, 1, nodeArr);
        }

    }

    recursiveInsert(newNode, curNode, depth, nodeArr) {

        //Highlights the current node and un-highlights the previous node
        this.queue.addCommand("highlightNode", [curNode.getId, "lightblue"]);
        if (curNode.getParent) {
            this.queue.addCommand("highlightNode", [curNode.getParent.getId, "white"]);
        }
        this.queue.addCommand("highlightLine", ["L2"]);

        //Checks to see if the new node is greater than the node currently being checked.
        if (newNode.getId > curNode.getId) {
            //Checks to see if the current node has a right child.
            if (curNode.getRight == null) {
                //If no right child exists, sets the new node as the right child.
                newNode.setParent = curNode;
                curNode.setRight = newNode;

                //Calls a function to create the visual representation of the node.

                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'r', depth]);
                this.queue.addCommand("highlightNode", [newNode.getId, "lightblue"]);     

                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightNode", [curNode.getId, "white"]);   
                this.queue.addCommand("highlightNode", [newNode.getId, "white"]);   

                if(nodeArr.length > 1) {
                    //Removes the first node in the list of nodes
                    nodeArr.shift();
                    //Inserts the next node in the list.
                    this.insert(nodeArr[0], nodeArr)
                } else {
                    //If no other nodes exist in the list then insertion is over.
                    this.queue.addCommand("setProcess", ["none"]);
                    this.queue.runCommands();
                }
            } else {
                //If a right child exists, compare the new node to the right child.
                //(Recursion)                
                depth++;
                this.queue.addCommand("highlightLine", ["L5"]);
                this.recursiveInsert(newNode, curNode.getRight, depth, nodeArr)
            }
        } else if (newNode.getId < curNode.getId) {
            //Checks to see if the new node is less than the current node.
            //If the current node has no left child, set the new node as the left child.
            if (curNode.getLeft == null) {
                newNode.setParent = curNode;
                curNode.setLeft = newNode;

                //Calls a function to create the visual representation of the node.
                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'l', depth]);
                this.queue.addCommand("highlightNode", [newNode.getId, "lightblue"]);

                this.queue.addCommand("highlightLine", ["L12"]);
                this.queue.addCommand("highlightNode", [curNode.getId, "white"]);   
                this.queue.addCommand("highlightNode", [newNode.getId, "white"]);   
                
                if(nodeArr.length > 1) {
                    //Removes the first node in the list of nodes
                    nodeArr.shift();
                    //Inserts the next node in the list.
                    this.insert(nodeArr[0], nodeArr)
                } else {
                    //If no other nodes exist in the list then insertion is over.
                    this.queue.addCommand("setProcess", ["none"]);
                    this.queue.runCommands();
                }
            } else {
                //If a left child exists, compare the new node and the left child.
                depth++;
                //this.recursiveInsert(newNode, curNode.getLeft, depth);
                this.queue.addCommand("highlightLine", ["L10"]);
                this.recursiveInsert(newNode, curNode.getLeft, depth, nodeArr)
            }
            //If the new node is equal to the current node it already exists and cannot be enetered.
        } else if (newNode.getId == curNode.getId) {
            alert("Node already exists!");
            this.queue.addCommand("highlightNode", [curNode.getId, "red"]);
            this.queue.addCommand("highlightLine", ["L14"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
            
            if(nodeArr.length > 1) {
                //Removes the first node in the list of nodes
                nodeArr.shift();
                //Inserts the next node in the list.
                this.insert(nodeArr[0], nodeArr)
            } else {
                //If no other nodes exist in the list then insertion is over.
                this.queue.addCommand("setProcess", ["none"]);
                this.queue.runCommands();
            }
        }
    }

    searchMax(curNode) {
        //Searches for the node with the highest value.
        //This node will be the node with no right child.
        if (curNode.getRight == null) {
            return curNode;
        } else {
            return this.searchMax(curNode.getRight);
        }
    }

    searchMin(curNode) {
        //Searches for the node with the lowest value.
        //This node will be the node with no left child.
        if (curNode.getLeft == null) {
            return curNode;
        } else {
            return this.searchMin(curNode.getLeft);
        }
    }

    search(curNode, searchNode) {
        this.queue.addCommand("highlightLine", ["L1"]);
        this.queue.addCommand("highlightNode", [curNode.getId, "lightblue"]);
        if (curNode.getParent) {
            this.queue.addCommand("highlightNode", [curNode.getParent.getId, "white"]);
        }

        if (curNode.getId==searchNode) {
            this.queue.addCommand("highlightLine", ["L2"]);
            this.queue.addCommand("highlightLine", ["L3"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "lime"]);
            this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
            // this.queue.addCommand("setProcess", ["none"]);
            // this.queue.runCommands();
            return curNode;
        } else {
            if (searchNode>curNode.getId) {
                this.queue.addCommand("highlightLine", ["L4"]);
                if (curNode.getRight==null) {
                    this.queue.addCommand("highlightLine", ["L7"]);
                    this.queue.addCommand("highlightLine", ["L8"]);
                    this.queue.addCommand("highlightNode", [curNode.getId, "red"]);
                    this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
                    // this.queue.addCommand("setProcess", ["none"]);
                    // this.queue.runCommands();
                    return null;
                } else {
                    this.queue.addCommand("highlightLine", ["L5"]);
                    this.queue.addCommand("highlightLine", ["L6"]);
                    return this.search(curNode.getRight, searchNode);
                }
            } else {
                this.queue.addCommand("highlightLine", ["L9"]);
                if (curNode.getLeft==null) {
                    this.queue.addCommand("highlightLine", ["L12"]);
                    this.queue.addCommand("highlightLine", ["L13"]);
                    this.queue.addCommand("highlightNode", [curNode.getId, "red"]);
                    this.queue.addCommand("highlightNode", [curNode.getId, "white"]);
                    // this.queue.addCommand("setProcess", ["none"]);
                    // this.queue.runCommands();
                    return null;
                } else {
                    this.queue.addCommand("highlightLine", ["L10"]);
                    this.queue.addCommand("highlightLine", ["L11"]);
                    return this.search(curNode.getLeft, searchNode);
                }
            }
        }
    }

    remove(removeVal, nodeArr) {
        this.queue.addCommand("highlightLine", ["L0"]);   

        var nodeToRem = null;
        if (this.getRoot!=null) {     
            this.queue.addCommand("setProcess", ["search"]);
            nodeToRem = this.search(this.getRoot, removeVal);
        }       

        if (nodeToRem!=null) {
            this.queue.addCommand("setProcess", ["remove"]);
            this.queue.addCommand("highlightLine", ["L1"]);
            this.queue.addCommand("highlightLine", ["L2"]);
            this.queue.addCommand("highlightNode", [removeVal, "red"]);

            if (nodeToRem.getLeft == null && nodeToRem.getRight == null) {
                //If the removed node is removed then sets the root of the tree to be null / empty
                if (this.getRoot.getId == nodeToRem.getId) {
                    this.setRoot = null;
                } else {
                    //Sets the parent of the node to not have it as a child.
                    if (nodeToRem.getId > nodeToRem.getParent.getId) {
                        nodeToRem.getParent.setRight = null;
                    } else {
                        nodeToRem.getParent.setLeft = null;
                    }
                }
                
                //Deletes the node from the user's view.
                this.queue.addCommand("removeNode", [removeVal]);                

                //Redraws the tree so that there are no unecessary branches.
                // this.queue.addCommand("redrawTree", [this.getRoot, null]);

                var arrayRep = this.traverse(this.getRoot);
                this.queue.addCommand("redrawFromArray", [arrayRep, null]);

                this.queue.addCommand("highlightLine", ["L3"]);
                this.queue.addCommand("highlightLine", ["L4"]);
            } else if (nodeToRem.getLeft == null && nodeToRem.getRight != null) {

                //If the removed node is removed then sets the root of the tree to be null / empty
                if (this.getRoot.getId == nodeToRem.getId) {
                    this.setRoot = nodeToRem.getRight;
                } else {
                    //Sets the parent of the node to have the removed node's right child as it's own child..
                    if(nodeToRem.getId > nodeToRem.getParent.getId) {
                        nodeToRem.getParent.setRight = nodeToRem.getRight;
                    } else {
                        nodeToRem.getParent.setLeft = nodeToRem.getRight;
                    }
                }
                nodeToRem.getRight.setParent = nodeToRem.getParent;

                //Calls a function to visually move nodes to be in the correct position.
                this.queue.addCommand("initMove", [nodeToRem.getRight, nodeToRem.getId]);

                //Deletes the node from the user's view.
                this.queue.addCommand("removeNode", [removeVal]);                         
                
                //Redraws the tree so there are no unecessary branches.
                // this.queue.addCommand("redrawTree", [this.getRoot, nodeToRem.getRight]);

                var arrayRep = this.traverse(this.getRoot);
                this.queue.addCommand("redrawFromArray", [arrayRep, null]);

                this.queue.addCommand("highlightLine", ["L5"]);
                this.queue.addCommand("highlightLine", ["L6"]);

            } else if (nodeToRem.getLeft != null && nodeToRem.getRight == null) {
                //If the removed node is removed then sets the root of the tree to be null / empty
                if (this.getRoot.getId == nodeToRem.getId) {
                    this.setRoot = nodeToRem.getLeft;
                } else {
                    //Sets the parent of the remove node to have its child be the left child of the removed node.
                    if(nodeToRem.getId > nodeToRem.getParent.getId) {
                        nodeToRem.getParent.setRight = nodeToRem.getLeft;
                    } else {
                        nodeToRem.getParent.setLeft = nodeToRem.getLeft;
                    }
                }              
                
                nodeToRem.getLeft.setParent = nodeToRem.getParent;

                //Calls a function to visually move nodes to be in the correct position.
                this.queue.addCommand("initMove", [nodeToRem.getLeft, nodeToRem.getId]);

                //Deletes the node from the user's view.
                this.queue.addCommand("removeNode", [removeVal]);                  
                
                //Redraws the tree so there are no unecessary branches.
                // this.queue.addCommand("redrawTree", [this.getRoot, null]);
                var arrayRep = this.traverse(this.getRoot);
                this.queue.addCommand("redrawFromArray", [arrayRep, null]);

                this.queue.addCommand("highlightLine", ["L5"]);
                this.queue.addCommand("highlightLine", ["L6"]);
            } else if (nodeToRem.getLeft != null && nodeToRem.getRight != null) {
                //Finds the largest node in the left subtree of the node to be removed.
                //The Precessor.
                var maxNode = this.searchMax(nodeToRem.getLeft);

                //Sets the parent of the right child to the parent of the removed node.
                nodeToRem.getRight.setParent = maxNode;  
                maxNode.setRight = nodeToRem.getRight;

                if (maxNode.getLeft != null) {
                    //If the Precessor has a left child then
                    //Sets up the relationship bewtee the child and parent of the Precessor.
                    maxNode.getParent.setRight = maxNode.getLeft;
                    maxNode.getLeft.setParent = maxNode.getParent;
                } else {
                    //Otherwise removes the link between the parent and the Precessor.
                    maxNode.getParent.setRight = null;
                }                

                //Sets the parent of the Precessor to be the parent of the removed node.
                maxNode.setParent = nodeToRem.getParent;                
                
                //If the Precessor was not the only left child of the removed node.
                if (maxNode.getId != nodeToRem.getLeft.getId) {
                    //Then it sets the child of the Precessor to be the child of the removed node.
                    maxNode.setLeft = nodeToRem.getLeft;
                    nodeToRem.getLeft.setParent = maxNode;
                }

                if (nodeToRem.getId == this.getRoot.getId) {
                    this.setRoot = maxNode;
                } else {
                    //Sets the children of the parent of the removed node to be the Precessor.
                    if(nodeToRem.getId > nodeToRem.getParent.getId) {
                        nodeToRem.getParent.setRight = maxNode;
                    } else {
                        nodeToRem.getParent.setLeft = maxNode;
                    }        
                }

                //Calls a function to visualy move all necessary nodes.
                this.queue.addCommand("initMove", [maxNode, nodeToRem.getId]);

                //Removes the visual representation of the removed node.
                this.queue.addCommand("removeNode", [removeVal]);  
                
                //Redraws the tree to remove any unecessary brances.
                // this.queue.addCommand("redrawTree", [this.getRoot, maxNode]);
                var arrayRep = this.traverse(this.getRoot);
                this.queue.addCommand("redrawFromArray", [arrayRep, null]);

                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightLine", ["L8"]);
            }

        } else {
            this.queue.addCommand("highlightLine", ["L9"]);
            this.queue.addCommand("highlightLine", ["L10"]);

        }

        if(nodeArr.length > 1) {
            //Removes the first value in the list of values.
            nodeArr.shift();
            //Removes the next node in the list.
            this.remove(nodeArr[0], nodeArr);
        } else {
            //If no other nodes exist in the list then insertion is over.
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();
        }
        // this.queue.addCommand("setProcess", ["none"]);
        // this.queue.runCommands();

    }

    

}

