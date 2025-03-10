class BinaryHeap {
    //Getters and setters for Tree variables
    constructor() {
        this.rootNode = null;
        this.queue = new AnimQueue;
        this.nextPos = 1;
        this.isMin = true;
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

    get getisMin() {
        return this.isMin;
    }

    set setIsMin(m) {
        this.isMin = m;
    }

    changeIsMin() {
        var heapTitle = document.getElementById("pageTitle");
        var switchButton = document.getElementById("changeTypeButton");
        if (this.getisMin) {
            this.setIsMin = false;
            heapTitle.textContent = "Binary Max Heap";
            switchButton.textContent = "Set to Min Heap";

            binaryHeapRemove[1] = "Remove Maximum Node";
            minHeapifyDown[1] = "  If C < the only child of C Then";
            minHeapifyDown[4] = "  Else If C > the only child of C Then";
            minHeapifyDown[7] = "  If C < L OR C < R Then";
            minHeapifyDown[8] = "     If L > R Then";
            minHeapifyUp[4] = "  If N > P Then";
        } else {
            this.setIsMin = true;
            heapTitle.textContent = "Binary Min Heap";
            switchButton.textContent = "Set to Max Heap";

            binaryHeapRemove[1] = "Remove Minimum Node";
            minHeapifyDown[1] = "  If C > the only child of C Then";
            minHeapifyDown[4] = "  Else If C < the only child of C Then";
            minHeapifyDown[7] = "  If C > L OR C > R Then";
            minHeapifyDown[8] = "     If L < R Then";
            minHeapifyUp[4] = "  If N < P Then";
        }
        clearBox();
        this.setRoot = null;
        this.setNextPos = 1;       
        
    }

    traverse(node) {
        if (node != null) {
            return [node.getId, this.traverse(node.getLeft), this.traverse(node.getRight)];
        } else {
            return null;
        }
        
    }  

    insert(nodeVal, nodeArr) {    
        this.queue.addCommand("highlightLine", ["L0"]);
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
            var searchRes = this.checkExists(this.getRoot, nodeVal);
            
            if (!searchRes) {
                var path = this.calculatePath();            
                //Increases the next position.
                this.setNextPos = this.getNextPos+1;
                //alert(path);
                this.recursiveInsert(newNode, this.getRoot, 1, nodeArr, path);
            } else {
                alert("Value already exists in heap")
            }

        }    
        
        if(nodeArr.length > 1) {
            //Removes the first node in the list of nodes
            nodeArr.shift();
            //Inserts the next node in the list.
            this.queue.addCommand("setProcess", ["insert"]);
            this.insert(nodeArr[0], nodeArr)
        } else {
            //If no other nodes exist in the list then insertion is over.
            this.queue.addCommand("setProcess", ["none"]);
            this.queue.runCommands();
        }
        // this.queue.addCommand("setProcess", ["none"]);          
        // this.queue.runCommands();
        
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
                
                curNode.setRight = newNode;
                newNode.setParent = curNode;
                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'r', depth]);
                this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                this.queue.addCommand("highlightLine", ["L2"]);
                this.queue.addCommand("setProcess", ["upHeap"]);
                this.heapifyUp(newNode);
                this.queue.addCommand("setProcess", ["none"]);
            } else {
                
                curNode.setLeft = newNode;
                newNode.setParent = curNode;
                this.queue.addCommand("createNode", [newNode.getId, newNode.getId, curNode.getId, 'l', depth]);
                this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                this.queue.addCommand("highlightLine", ["L2"]);
                this.queue.addCommand("setProcess", ["upHeap"]);
                this.heapifyUp(newNode);
                this.queue.addCommand("setProcess", ["none"]);
            }
        }
    }

    remove() {
        //Find node at newest position
        //Swap root and that node
        //Remove root
        //heap sort down tree        
        
        this.setNextPos = this.getNextPos - 1;
        if (this.getRoot.getLeft==null) {
            this.queue.addCommand("removeNode", [this.getRoot.getId]);
            this.queue.addCommand("setProcess", ["none"])
            this.queue.runCommands();
            this.setRoot = null;
        } else {
            var pathToNode = this.calculatePath();
            
            var replacementNode = this.findNode(this.getRoot, pathToNode);
            
            var rootNode = this.getRoot;
            //Swap root and node
            this.queue.addCommand("highlightLine", ["L0"]);
            this.queue.addCommand("highlightNode", [this.getRoot.getId, 'red']);
            this.queue.addCommand("highlightNode", [replacementNode.getId, 'lightgreen']);
            this.queue.addCommand("swap", [this.getRoot.getId, replacementNode.getId]);
            this.queue.addCommand("highlightNode", [replacementNode.getId, 'white']);
            this.queue.addCommand("highlightLine", ["L1"]);
            this.queue.addCommand("removeNode", [this.getRoot.getId]);
            this.queue.addCommand("highlightLine", ["L2"]);    
            
            replacementNode.setLeft = rootNode.getLeft;
            replacementNode.setRight = rootNode.getRight;
            
            if (rootNode.getLeft!=null) {
                rootNode.getLeft.setParent = replacementNode;
            }
            if (rootNode.getRight!=null) {
                rootNode.getRight.setParent = replacementNode;
            }            
            
            if (replacementNode.getParent.getRight == replacementNode) {
                replacementNode.getParent.setRight = null;
            } else {
                replacementNode.getParent.setLeft = null;
            }
            replacementNode.setParent = null;
            
            this.setRoot = replacementNode;    
            
            
            this.queue.addCommand("setProcess", ["downHeap"])
            this.heapifyDown(this.getRoot);
            this.queue.addCommand("setProcess", ["none"])
            this.queue.runCommands();
            this.queue.addCommand("redrawFromArray", [this.traverse(this.getRoot), null]);
        }
        
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
            this.queue.addCommand("highlightLine", ["L16"]);
            this.queue.addCommand("highlightLine", ["L17"]);
        } else if (leftChild != null && rightChild == null) {
            
            //If the node has only a left child
            //Compares it against the only child.
            this.queue.addCommand("highlightLine", ["L0"]);
            // if (leftChild.getId < curNode.getId) {
            
            if (this.checkCondition(leftChild.getId, curNode.getId)) {
                
                //If the left child is smaller, swap the two nodes around.
                //swap
                this.queue.addCommand("highlightLine", ["L1"]);
                this.queue.addCommand("highlightLine", ["L2"]);
                this.queue.addCommand("highlightLine", ["L3"]);
                this.queue.addCommand("highlightNode", [curNode.getId, 'red']);
                this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                this.swapNodes(curNode, leftChild);
                this.heapifyDown(curNode);
            } else {
                
                //ordered
                this.queue.addCommand("highlightLine", ["L4"]);
                this.queue.addCommand("highlightLine", ["L5"]);
            }
        } else if (leftChild != null && rightChild != null) {
            
            //If the node has 2 children
            //Check to find the smaller of the two
            //Swap with the smallest node if it is smaller than the current node.
            this.queue.addCommand("highlightLine", ["L6"]);
            // if (leftChild.getId < rightChild.getId) {
            if (this.checkCondition(leftChild.getId, rightChild.getId)) {
               
                // if (leftChild.getId < curNode.getId) {
                if (this.checkCondition(leftChild.getId, curNode.getId)) {
                    this.queue.addCommand("highlightLine", ["L7"]);
                    this.queue.addCommand("highlightLine", ["L8"]);
                    this.queue.addCommand("highlightLine", ["L9"]);
                    this.queue.addCommand("highlightNode", [curNode.getId, 'red']);
                    this.swapNodes(curNode, leftChild);                    
                    this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                    this.queue.addCommand("highlightLine", ["L10"]);
                    this.heapifyDown(curNode);
                } else {
                    this.queue.addCommand("highlightLine", ["L14"]);
                    this.queue.addCommand("highlightLine", ["L15"]);
                    this.queue.addCommand("highlightNode", [curNode.getId, 'lightgreen']);
                    this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                }
            } else {
                
                // if (rightChild.getId < curNode.getId) {
                if (this.checkCondition(rightChild.getId, curNode.getId)) {
                    //swap
                    this.queue.addCommand("highlightLine", ["L7"]);
                    this.queue.addCommand("highlightLine", ["L11"]);
                    this.queue.addCommand("highlightLine", ["L12"]);
                    this.queue.addCommand("highlightNode", [curNode.getId, 'red']);
                    this.swapNodes(curNode, rightChild);                    
                    this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                    this.queue.addCommand("highlightLine", ["L13"]);
                    this.heapifyDown(curNode);
                } else {
                    //ordered
                    this.queue.addCommand("highlightLine", ["L14"]);
                    this.queue.addCommand("highlightLine", ["L15"]);
                    this.queue.addCommand("highlightNode", [curNode.getId, 'lightgreen']);
                    this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
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


    }

    heapifyUp(curNode) {
        this.queue.addCommand("highlightNode", [curNode.getId, 'lightblue']);
        
        //alert("traversal - " + this.traverse(this.getRoot));
        if (curNode.getParent != null) {
            this.queue.addCommand("highlightLine", ["L3"]);
            // if (curNode.getId < curNode.getParent.getId) {
            if (this.checkCondition(curNode.getId, curNode.getParent.getId)) {
                this.queue.addCommand("highlightLine", ["L4"]);
                this.queue.addCommand("highlightNode", [curNode.getId, 'red']);
                this.queue.addCommand("highlightLine", ["L5"]);
                this.swapNodes(curNode.getParent, curNode);
                this.queue.addCommand("highlightLine", ["L6"]);
                this.heapifyUp(curNode);
            } else {
                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightNode", [curNode.getId, 'lightgreen']);
                this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
                this.queue.addCommand("highlightLine", ["L8"]);
            }
        } else {
            this.queue.addCommand("highlightLine", ["L0"]);
            this.queue.addCommand("highlightLine", ["L1"]);
            this.queue.addCommand("highlightNode", [curNode.getId, 'white']);
        }
    }

    checkCondition(n1, n2) {
        var conditionMet = true;
        if (this.getisMin) {
            if (n1<n2) {
                conditionMet = true;
            } else {
                conditionMet =false;
            }
        } else {
            if (n1>n2) {
                conditionMet = true;
            } else {
                conditionMet =false;
            }
        }
        
        return conditionMet;
    }

    checkExists(curNode, searchVal) {
        if (curNode.getId == searchVal) {
            return true;
        } else {
            var searchResult = false;
            if (curNode.getLeft != null) {
                var leftResult = this.checkExists(curNode.getLeft, searchVal);
                if (leftResult) {
                    searchResult = true;
                }
            }
            if (curNode.getRight != null) {
                var rightResult = this.checkExists(curNode.getRight, searchVal);
                if (rightResult) {
                    searchResult = true;
                }
            }
            return searchResult;
        }
    }
}