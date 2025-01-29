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
        } else {
            var path = this.calculatePath();
            alert(path);
            this.recursiveInsert(newNode, this.getRoot, 1, nodeArr, path);
        }    
        // this.queue.addCommand("setProcess", ["none"]);  
        // this.queue.runCommands();
    }

    recursiveInsert(newNode, curNode, depth, nodeArr, path) {
        alert("path - " + path);
        if (path.length > 1) {
            alert("recurse again")
            if (path.shift() == "1") {
                this.recursiveInsert(newNode, curNode.getRight, depth++, nodeArr, path);
            } else {
                this.recursiveInsert(newNode, curNode.getLeft, depth++, nodeArr, path);
            }
        } else {
            alert("insert")
            if (path.shift() == "1") {
                alert("right")
                curNode.setRight = newNode;
            } else {
                alert("left")
                curNode.setLeft = newNode;
            }
        }
    }

    calculatePath() {
        alert("next pos - " + this.getNextPos);
        //Converts the next position into binary.
        var binaryPath = this.getNextPos.toString(2);
        alert("binary path - " + binaryPath);
        //Converts binary number to array of binary digits.
        var pathArray = [...binaryPath];
        alert("array path - " + pathArray);
        //Removes the first emelent of the array for a correct path.
        pathArray.shift();
        alert("path array - " + pathArray);
        //Increases the next position.
        this.setNextPos = this.getNextPos+1;
        return pathArray;
    }

    heapifyUp(curNode) {
        if (curNode.getParent != null) {
            if (curNode.getId < curNode.getParent.getId) {
                //Swap current and parent node.
                var parent = curNode.getParent;
                var grandParent = parent.getParent;
                
                curNode.setParent = grandParent;
                if (grandParent != null) {
                    if (parent.getId > grandParent.getId) {
                        grandParent.setRight = curNode;
                    } else {
                        grandParent.setLeft = curNode;
                    }
                }

                var holdNode = null;
                if (parent.getRight.getId == curNode.getId) {
                    holdNode = parent.getLeft;
                    curNode.setRight = parent;
                } else {
                    holdNode = parent.getRight;
                    curNode.setLeft = parent;
                }
                parent.setLeft = curNode.getLeft;
                parent.setRight = curNode.getRight;
                curNode.getLeft.setParent = parent;
                curNode.getRight.setParent = parent;
                parent.setParent = curNode;

                

            }
        } else {
            //Has been placed at the top
        }
    }

    
}