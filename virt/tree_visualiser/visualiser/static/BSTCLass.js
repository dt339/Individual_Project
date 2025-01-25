class BSTTree {
    //Getters and setters for Tree variables
    constructor() {
        this.rootNode = null;
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

    insert(newNodeVal, nodeArr) {
        //Creates a new node from the value given.
        var newNode = new Node(parseInt(newNodeVal, 10));
        //Checks to see if the tree currently has a root.
        if (this.getRoot == null) {
            highlightLine("L1");
            //Sets the root of the tree to be the inserted node.
            this.setRoot = newNode;
            createRoot(newNode.getId, newNode.getId);
            highlightNode(newNode.getId, "lightblue");
            setTimeout(() => highlightNode(newNode.getId, "white"), 2000/getAnimSpeed());

            //Checks to see if the node was inserted as a single value
            //Or if it was inserted as part of a list of values to be inserted.
            if(nodeArr.length > 1) {
                //Removes the first value in the list of values.
                nodeArr.shift();
                //Inserts the next node in the list.
                setTimeout(() => this.insert(nodeArr[0], nodeArr), 4000/getAnimSpeed());
            } else {
                //If no other nodes exist in the list then insertion is over.
                setTimeout(() => setCurrProcess("none"), 4000/getAnimSpeed());
            }
        } else {
            //Calls a recursive function to insert the node if a root exists.
            this.recursiveInsert(newNode, this.getRoot, 1, nodeArr);
        }
    }

    recursiveInsert(newNode, curNode, depth, nodeArr) {

        //Highlights the current node and un-highlights the previous node
        highlightNode(curNode.getId, "lightblue");
        if (curNode.getParent) {
            highlightNode(curNode.getParent.getId, "white");
        }
        highlightLine("L2");

        //Checks to see if the new node is greater than the node currently being checked.
        if (newNode.getId > curNode.getId) {
            //Checks to see if the current node has a right child.
            if (curNode.getRight == null) {
                //If no right child exists, sets the new node as the right child.
                newNode.setParent = curNode;
                curNode.setRight = newNode;

                //Calls a function to create the visual representation of the node.
                setTimeout(() => newElem(newNode.getId, newNode.getId, curNode.getId, 'r', depth), 2000/getAnimSpeed());
                setTimeout(() => highlightNode(newNode.getId, "lightblue"), 2000/getAnimSpeed());       

                highlightLine("L7");
                setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                setTimeout(() => highlightNode(newNode.getId, "white"), 4000/getAnimSpeed());

                if(nodeArr.length > 1) {
                    //Removes the first node in the list of nodes
                    nodeArr.shift();
                    //Inserts the next node in the list.
                    setTimeout(() => this.insert(nodeArr[0], nodeArr), 4000/getAnimSpeed());
                } else {
                    //If no other nodes exist in the list then insertion is over.
                    setTimeout(() => setCurrProcess("none"), 4000/getAnimSpeed());
                }
            } else {
                //If a right child exists, compare the new node to the right child.
                //(Recursion)                
                depth++;
                highlightLine("L5");
                setTimeout(() => this.recursiveInsert(newNode, curNode.getRight, depth, nodeArr), 2000/getAnimSpeed());
            }
        } else if (newNode.getId < curNode.getId) {
            //Checks to see if the new node is less than the current node.
            //If the current node has no left child, set the new node as the left child.
            if (curNode.getLeft == null) {
                newNode.setParent = curNode;
                curNode.setLeft = newNode;

                //Calls a function to create the visual representation of the node.
                setTimeout(() => newElem(newNode.getId, newNode.getId, curNode.getId, 'l', depth), 2000/getAnimSpeed());
                setTimeout(() => highlightNode(newNode.getId, "lightblue"), 2000/getAnimSpeed());    

                highlightLine("L12");
                setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                setTimeout(() => highlightNode(newNode.getId, "white"), 4000/getAnimSpeed());
                
                if(nodeArr.length > 1) {
                    //Removes the first node in the list of nodes
                    nodeArr.shift();
                    //Inserts the next node in the list.
                    setTimeout(() => this.insert(nodeArr[0], nodeArr), 4000/getAnimSpeed());
                } else {
                    //If no other nodes exist in the list then insertion is over.
                    setTimeout(() => setCurrProcess("none"), 4000/getAnimSpeed());
                }
            } else {
                //If a left child exists, compare the new node and the left child.
                depth++;
                //this.recursiveInsert(newNode, curNode.getLeft, depth);
                highlightLine("L10");
                setTimeout(() => this.recursiveInsert(newNode, curNode.getLeft, depth, nodeArr), 2000/getAnimSpeed());
            }
            //If the new node is equal to the current node it already exists and cannot be enetered.
        } else if (newNode.getId == curNode.getId) {
            alert("Node already exists!");
            highlightNode(curNode.getId, "red");
            highlightLine("L14");
            setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
            
            if(nodeArr.length > 1) {
                //Removes the first node in the list of nodes
                nodeArr.shift();
                //Inserts the next node in the list.
                setTimeout(() => this.insert(nodeArr[0], nodeArr), 4000/getAnimSpeed());
            } else {
                //If no other nodes exist in the list then insertion is over.
                setTimeout(() => setCurrProcess("none"), 4000/getAnimSpeed());
            }
        }
    }

    //Removes the node logically and visually.
    removeNode(nodeToRem) {
        //Checks if the node has 0 children.
        if (nodeToRem.getLeft == null && nodeToRem.getRight == null) {
            //Sets the parent of the node to not have it as a child.
            if (nodeToRem.getId > nodeToRem.getParent.getId) {
                nodeToRem.getParent.setRight = null;
            } else {
                nodeToRem.getParent.setLeft = null;
            }
            //Deletes the node from the user's view.
            const nodeElem = document.getElementById(nodeToRem.getId);
            nodeElem.remove();

            //Redraws the tree so that there are no unecessary branches.
            const canv = document.getElementById("myCanvas");
            const ctx = canv.getContext("2d");
            ctx.clearRect(0,0, canv.width, canv.height);
            redrawTree(this.getRoot, null);

            highlightLine("L4");
            setTimeout(() => setCurrProcess("none"), 2000/getAnimSpeed());

        } else {
            //Checks to see if the node has only a right child.
            if (nodeToRem.getLeft == null && nodeToRem.getRight != null) {
                //Sets the parent of the node to have the removed node's right child as it's own child..
                if(nodeToRem.getId > nodeToRem.getParent.getId) {
                    nodeToRem.getParent.setRight = nodeToRem.getRight;
                } else {
                    nodeToRem.getParent.setLeft = nodeToRem.getRight;
                }
                nodeToRem.getRight.setParent = nodeToRem.getParent;

                //Calls a function to visually move nodes to be in the correct position.
                initialMove(nodeToRem.getRight, nodeToRem.getId);

                //Deletes the node from the user's view.
                const remNode = document.getElementById(nodeToRem.getId);
                remNode.remove();

                //Redraws the tree so there are no unecessary branches.
                const canv = document.getElementById("myCanvas");
                const ctx = canv.getContext("2d");
                ctx.clearRect(0,0, canv.width, canv.height);
                redrawTree(this.getRoot, nodeToRem.getRight.getId);

                highlightLine("L6");
                setTimeout(() => setCurrProcess("none"), 2000/getAnimSpeed());

            //Checks to see if the node has only a left child.
            } else if (nodeToRem.getLeft != null && nodeToRem.getRight == null) {
                //Sets the parent of the remove node to have its child be the left child of the removed node.
                if(nodeToRem.getId > nodeToRem.getParent.getId) {
                    nodeToRem.getParent.setRight = nodeToRem.getLeft;
                } else {
                    nodeToRem.getParent.setLeft = nodeToRem.getLeft;
                }
                nodeToRem.getLeft.setParent = nodeToRem.getParent;

                //Calls a function to visually move nodes into place.
                initialMove(nodeToRem.getLeft, nodeToRem.getId);

                //Removes the visual representation of the node.
                const remNode = document.getElementById(nodeToRem.getId);
                remNode.remove();

                //Redraws the tree to remove any unecessary branches.
                const canv = document.getElementById("myCanvas");
                const ctx = canv.getContext("2d");
                ctx.clearRect(0,0, canv.width, canv.height);
                redrawTree(this.getRoot, nodeToRem.getLeft.getId);

                highlightLine("L6");
                setTimeout(() => setCurrProcess("none"), 2000/getAnimSpeed());

            //Checks to see if the removed node has two children.
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

                //Sets the children of the parent of the removed node to be the Precessor.
                if(nodeToRem.getId > nodeToRem.getParent.getId) {
                    nodeToRem.getParent.setRight = maxNode;
                } else {
                    nodeToRem.getParent.setLeft = maxNode;
                }          
                
                //Calls a function to visualy move all necessary nodes.
                initialMove(maxNode, nodeToRem.getId);

                //Removes the visual representation of the removed node.
                const remNode = document.getElementById(nodeToRem.getId);
                remNode.remove();

                //Redraws the tree to remove any unecessary brances.
                const canv = document.getElementById("myCanvas");
                const ctx = canv.getContext("2d");
                ctx.clearRect(0,0, canv.width, canv.height);                
                redrawTree(this.getRoot, maxNode.getId);

                highlightLine("L8");
                setTimeout(() => setCurrProcess("none"), 4000/getAnimSpeed());

                //}
                
            } else{
                alert("Something went wrong");
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

    //Recursively searches for the specified node.
    search(curNode, searchNode) {

        //Highlights the current node being checked.
        highlightNode(curNode.getId, "lightblue");
        if (curNode.getParent) {
            highlightNode(curNode.getParent.getId, "white");
        }
        highlightLine('L2');
        
        //Compares the current node to the value being searched for.
        if (curNode.getId == searchNode) {
            highlightLine('L3');            
            setTimeout(() => setCurrProcess("none"), 2000/getAnimSpeed());

            //Highlights the node in green.
            //As the specified node has been found.
            highlightNode(curNode.getId, "lightgreen");
            setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
            return curNode;
        } else {
            if (searchNode > curNode.getId) {
                
                if (curNode.getRight != null) {
                    //If the current node has a right child
                    //Then calls this function and compares against the right child of the current node.
                    highlightLine('L6');
                    return setTimeout(() => this.search(curNode.getRight, searchNode), 2000/getAnimSpeed());
                } else {
                    //If the current node has no right child
                    //The specified value does not exist in the tree
                    highlightLine('L8');
                    setTimeout(() => setCurrProcess("none"), 2000/getAnimSpeed());
                    //Highlights the closest node in red to signify it does not exist.
                    highlightNode(curNode.getId, "red");
                    setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                    return null;
                }                
            } else {
                if (curNode.getLeft != null) {
                    //If the current node has a left child
                    //Then calls this function and compares against the left child of the current node.
                    highlightLine('L11');
                    return setTimeout(() => this.search(curNode.getLeft, searchNode), 2000/getAnimSpeed());
                } else {
                    //If the current node has no left child
                    //The specified value does not exist in the tree
                    highlightLine('L13');
                    setTimeout(() => setCurrProcess("none"), 2000/getAnimSpeed());
                    //Highlights the closest node in red to signify it does not exist.
                    highlightNode(curNode.getId, "red");
                    alert("Value does not exist!");
                    setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                    return null;
                }      
            }            
        }
    }

    //Recursively searches for a node so it can be removed.
    remove(curNode, searchNode) {
        highlightLine("L0");
        highlightNode(curNode.getId, "lightblue");
        if (curNode.getParent) {
            highlightNode(curNode.getParent.getId, "white");
        }

        //Compares the current node against the value being searched for.
        if (curNode.getId == searchNode) {

            //If the current node is equal to the value being searched for
            //Then the value has been found and the node can be removed.
            highlightNode(curNode.getId, "red");
            highlightLine("L2");
            setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
            //Calls a function to remove the node.
            setTimeout(() => this.removeNode(curNode), 2000/getAnimSpeed());
            return curNode;
        } else {
            //Searches for the value in the same way as nodeSearch.
            if (searchNode > curNode.getId) {
                if (curNode.getRight != null) {
                    return setTimeout(() => this.remove(curNode.getRight, searchNode), 2000/getAnimSpeed());
                } else {
                    highlightNode(curNode.getId, "red");
                    alert("Value does not exist!");
                    setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                    return null;
                }                
            } else {
                if (curNode.getLeft != null) {
                    return setTimeout(() => this.remove(curNode.getLeft, searchNode), 2000/getAnimSpeed());
                } else {
                    highlightNode(curNode.getId, "red");
                    alert("Value does not exist!");
                    highlightLine("L10");
                    setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                    setTimeout(() => setCurrProcess("none"), 2000/getAnimSpeed());
                    return null;
                }      
            }            
        }
    }

}

