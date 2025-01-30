class BinaryHeap {
    //Getters and setters for Tree variables
    constructor() {
        this.rootNode = null;
        this.queue = new AnimQueue;
        this.nextPos = 1;
    }

    get getRoot() {
        return this.rootNode;
    }    

    set setRoot(r) {
        this.rootNode = r;
    }

    get getNextPos() {
        return this.nextPos;
    }

    set setNextPos(n) {
        this.nextPos = n;
    }

    traverse(node) {
        if (node != null) {
            return ["(",node.getId, this.traverse(node.getLeft), this.traverse(node.getRight),")"];
        } else {
            return 'x';
        }
    }  

    insert(nodeVal, nodeArr) {
        //Creates a new node from the entered data
        var newNode = new Node(parseInt(nodeVal, 10));
        if (this.getRoot == null) {
            //If the tree is empty, sets the root of the tree to be the new value.
            this.setRoot = newNode;
            this.setNextPos = 2;
            this.queue.addCommand("createRoot", [newNode.getId, newNode.getId]);
            this.queue.addCommand("highlightNode", [newNode.getId, 'lightblue']);
            this.queue.addCommand("highlightNode", [newNode.getId, 'white']);
        } else {
            var path = this.calculatePath();            
            //Increases the next position.
            this.setNextPos = this.getNextPos+1;
            //alert(path);
            this.recursiveInsert(newNode, this.getRoot, 1, nodeArr, path);
        }    
        //this.queue.addCommand("setProcess", ["none"]);  
        this.queue.runCommands();
    }

    recursiveInsert(newNode, curNode, depth, nodeArr, path) {
        this.queue.addCommand("highlightNode", [curNode.getId, 'lightblue']);
        if (curNode.getParent!=null) {
            this.queue.addCommand("highlightNode", [curNode.getParent.getId, 'white']);
        }
        //alert("path - " + path);
        if (path.length > 1) {
            //alert("recurse again")
            depth++;
            if (path.shift() == "1") {
                this.recursiveInsert(newNode, curNode.getRight, depth++, nodeArr, path);
            } else {
                this.recursiveInsert(newNode, curNode.getLeft, depth++, nodeArr, path);
            }
        } else {
            //alert("insert")
            if (path.shift() == "1") {
                //alert("right")
                curNode.setRight = newNode;
                newNode.setParent = curNode;
                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'r', depth]);
                this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                this.heapifyUp(newNode);
            } else {
                //alert("left")
                curNode.setLeft = newNode;
                newNode.setParent = curNode;
                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'l', depth]);
                this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                this.heapifyUp(newNode);
            }
        }
    }

    remove(theRoot, curNode) {
        //Find node at newest position
        //Swap root and that node
        //Remove root
        //heap sort down tree

        this.setNextPos = this.getNextPos - 1;
        var pathToNode = this.calculatePath();
        alert("path - " + pathToNode);
        var replacementNode = this.findNode(this.getRoot, pathToNode);
        alert("rep - " + replacementNode.getId);
        var rootNode = this.getRoot;
        //Swap root and node

        this.queue.addCommand("highlightNode", [replacementNode.getId, 'lightgreen']);
        this.queue.addCommand("swap", [this.getRoot.getId, replacementNode.getId]);
        this.queue.addCommand("highlightNode", [replacementNode.getId, 'white']);
        this.queue.addCommand("removeNode", [this.getRoot.getId]);

        replacementNode.setLeft = rootNode.getLeft;
        replacementNode.setRight = rootNode.getRight;

        rootNode.getLeft.setParent = replacementNode;
        rootNode.getRight.setParent = replacementNode;

        if (replacementNode.getParent.getRight == replacementNode) {
            replacementNode.getParent.setRight = null;
        } else {
            replacementNode.getParent.setLeft = null;
        }
        replacementNode.setParent = null;

        this.setRoot = replacementNode;

        
        this.heapifyDown(this.getRoot);
        this.queue.runCommands();
        this.queue.addCommand("redrawTree", [this.getRoot, null]);
    }

    findNode(curNode, path) {
        if (path.length > 1) {       
            if (path.shift() == "1") {
                return this.findNode(curNode.getRight, path)
            } else {
                return this.findNode(curNode.getLeft, path)
            }
        } else {
            if (path.shift() == "1") {
                return curNode.getRight;
            } else {
                return curNode.getLeft;
            }
        }
    }

    calculatePath() {
        //alert("next pos - " + this.getNextPos);
        //Converts the next position into binary.
        var binaryPath = this.getNextPos.toString(2);
        //alert("binary path - " + binaryPath);
        //Converts binary number to array of binary digits.
        var pathArray = [...binaryPath];
        //alert("array path - " + pathArray);
        //Removes the first emelent of the array for a correct path.
        pathArray.shift();
        //alert("path array - " + pathArray);
        return pathArray;
    }

    heapifyDown(curNode) {
        var leftChild = curNode.getLeft;
        var rightChild = curNode.getRight;

        //Checks to see if the node has any children.
        if (leftChild == null && rightChild == null) {
            //Heap order maintained because node now a leaf.
        } else if (leftChild != null && rightChild == null) {
            //If the node has only a left child
            //Compares it against the only child.
            if (leftChild.getId < curNode.getId) {
                //If the left child is smaller, swap the two nodes around.
                //swap
                this.queue.addCommand("highlightNode", [curNode.getId, 'red']);
                this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                this.swapNodes(curNode, leftChild);
                this.heapifyDown(curNode);
            } else {
                //ordered
            }
        } else if (leftChild != null && rightChild != null) {
            //If the node has 2 children
            //Check to find the smaller of the two
            //Swap with the smallest node if it is smaller than the current node.
            if (leftChild.getId < rightChild.getId) {
                if (leftChild.getId < curNode.getId) {
                    this.queue.addCommand("highlightNode", [curNode.getId, 'red']);
                    this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                    this.swapNodes(curNode, leftChild);
                    this.heapifyDown(curNode);
                } else {

                }
            } else {
                if (rightChild.getId < curNode.getId) {
                    //swap
                    this.queue.addCommand("highlightNode", [curNode.getId, 'red']);
                    this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                    this.swapNodes(curNode, rightChild);
                    this.heapifyDown(curNode);
                } else {
                    //ordered
                } 
            }
        }
    }

    swapNodes(parent, child) {
        //Swap current and parent node.
        var parent = child.getParent;
        var grandParent = parent.getParent;
        //alert("cur - " + child.getId + " parent - " + parent.getId);

        child.setParent = grandParent;
        if (grandParent != null) {
            //alert(" - grandparent - " + grandParent.getId);
            if (parent == grandParent.getRight) {
                grandParent.setRight = child;
            } else {
                grandParent.setLeft = child;
            }
        } else {
            this.setRoot = child;
        }

        if (child.getLeft != null) {
            child.getLeft.setParent = parent;
        }
        if (child.getRight != null) {
            child.getRight.setParent = parent;
        }

        if (parent.getRight != null) {
            var holdNode = null;

            if (parent.getRight.getId == child.getId) {
                //alert("right + cur - " + child.getId);
                holdNode = parent.getLeft;
                //alert("parent - " + parent.getId + " - hold - " + holdNode.getId);
                parent.setLeft = child.getLeft;
                parent.setRight = child.getRight;
                child.setRight = parent;
                child.setLeft = holdNode;
            } else {
                //alert("left + cur - " + child.getId);
                holdNode = parent.getRight;
                parent.setLeft = child.getLeft;
                parent.setRight = child.getRight;
                child.setLeft = parent;
                child.setRight = holdNode;
            }
            
            holdNode.setParent = child;
        } else {
            //If the parent has no right child then the sole left child cannot have any children itself.
            child.setLeft = parent;
            parent.setLeft = null;
        }

        parent.setParent = child;
        this.queue.addCommand("swap", [parent.getId, child.getId]);


        // //Check to see if the parent is the root of the tree.
        // if (parent.getParent == null) {
        //     this.setRoot = child;
        // }

        // child.setParent = parent.getParent;
        // parent.setParent = child;

        // if (child.getLeft != null) {
        //     child.getLeft.setParent = parent;
        // }
        // if (child.getRight != null) {
        //     child.getRight.setParent = parent;
        // }

        // var holdNode = null;
        // if (parent.getLeft == child) {
        //     holdNode = parent.getRight;
        //     parent.setLeft = child.getLeft;
        //     parent.setRight = child.getRight;
        //     child.setLeft = parent;
        //     child.setRight = holdNode;
        //     holdNode.setParent = child;
        // } else {
        //     holdNode = parent.getLeft;
        //     parent.setLeft = child.getLeft;
        //     parent.setRight = child.getRight;
        //     child.setRight = parent;
        //     child.setLeft = holdNode;
        //     holdNode.setParent = child;
        // }
    }

    heapifyUp(curNode) {
        //alert("traversal - " + this.traverse(this.getRoot));
        if (curNode.getParent != null) {

            if (curNode.getId < curNode.getParent.getId) {
                this.swapNodes(curNode.getParent, curNode);
                this.heapifyUp(curNode);
            }
        } 
    }

    
}