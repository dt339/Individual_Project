class Node {
    constructor(val, id) {
        this.nodeVal = val;
        this.left = null;
        this.right = null;
        this.id = id;
        this.parent = null;
    }

    //getters and setters for node values
    get getVal() {
        return this.nodeVal;
    }

    get getLeft() {
        return this.left;
    }

    get getRight() {
        return this.right;
    }

    get getId() {
        return this.id;
    }

    get getParent() {
        return this.parent;
    }

    set setVal(newVal) {
        this.nodeVal = newVal;
    }

    set setLeft(newLeft) {
        this.left = newLeft;
    }

    set setRight(newRight) {
        this.right = newRight;
    }

    set setParent(parentId) {
        this.parent = parentId;
    }
}

class Tree {
    constructor() {
        this.rootNode = null;
    }

    get getRoot() {
        return this.rootNode;
    }    

    set setRoot(r) {
        this.rootNode = r;
    }

    insert(newNode) {
        if (this.getRoot == null) {
            this.setRoot = newNode;
            createRoot(newNode.getVal, newNode.getVal);
            highlightNode(newNode.getVal, "lightblue");
            setTimeout(() => highlightNode(newNode.getVal, "white"), 2000/getAnimSpeed());
        } else {
            this.recursiveInsert(newNode, this.getRoot, 0);
        }
    }

    recursiveInsert(newNode, curNode, depth) {

        //Highlights the current node and un-highlights the previous node
        highlightNode(curNode.getId, "lightblue");
        if (curNode.getParent) {
            highlightNode(curNode.getParent.getId, "white");
        }

        //Checks to see if the new node is greater than the node currently being checked.
        if (newNode.getVal > curNode.getVal) {
            //Checks to see if the current node has a right child.
            if (curNode.getRight == null) {
                //If no right child exists, sets the new node as the right child.
                newNode.setParent = curNode;
                curNode.setRight = newNode;
                newElem(newNode.getVal, newNode.getVal, curNode.getId, 'r', depth);
                highlightNode(newNode.getId, "lightblue");
                setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                setTimeout(() => highlightNode(newNode.getId, "white"), 4000/getAnimSpeed());
            } else {
                //If a right child exists, compare the new node to the right child.
                //(Recursion)                
                depth++;
                //this.recursiveInsert(newNode, curNode.getRight, depth);
                setTimeout(() => this.recursiveInsert(newNode, curNode.getRight, depth), 2000/getAnimSpeed());
            }
        } else if (newNode.getVal < curNode.getVal) {
            //Checks to see if the new node is less than the current node.
            //If the current node has no left child, set the new node as the left child.
            if (curNode.getLeft == null) {
                newNode.setParent = curNode;
                curNode.setLeft = newNode;
                newElem(newNode.getVal, newNode.getVal, curNode.getId, 'l', depth);
                highlightNode(newNode.getId, "lightblue");
                setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                setTimeout(() => highlightNode(newNode.getId, "white"), 4000/getAnimSpeed());
            } else {
                //If a left child exists, compare the new node and the left child.
                depth++;
                //this.recursiveInsert(newNode, curNode.getLeft, depth);
                setTimeout(() => this.recursiveInsert(newNode, curNode.getLeft, depth), 2000/getAnimSpeed());
            }
            //If the new node is equal to the current node it already exists and cannot be enetered.
        } else if (newNode.getVal == curNode.getVal) {
            alert("Node already exists!");
            highlightNode(curNode.getId, "red");
            setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
        }
    }

    removeNode(nodeToRem, passedRoot) {
  
        if (nodeToRem.getLeft == null && nodeToRem.getRight == null) {
            alert("leaf");
            if (nodeToRem.getVal > nodeToRem.getParent.getVal) {
                nodeToRem.getParent.setRight = null;
            } else {
                nodeToRem.getParent.setLeft = null;
            }
            const nodeElem = document.getElementById(nodeToRem.getId);
            nodeElem.remove();
            alert("LEAF so removed");

            const canv = document.getElementById("myCanvas");
            const ctx = canv.getContext("2d");
            ctx.clearRect(0,0, canv.width, canv.height);
            redrawTree(passedRoot, null);

        } else {
            if (nodeToRem.getLeft == null && nodeToRem.getRight != null) {
                if(nodeToRem.getVal > nodeToRem.getParent.getVal) {
                    nodeToRem.getParent.setRight = nodeToRem.getRight;
                } else {
                    nodeToRem.getParent.setLeft = nodeToRem.getRight;
                }
                nodeToRem.getRight.setParent = nodeToRem.getParent;

                initialMove(nodeToRem.getRight, nodeToRem.getId);

                const remNode = document.getElementById(nodeToRem.getId);
                remNode.remove();

                const canv = document.getElementById("myCanvas");
                const ctx = canv.getContext("2d");
                ctx.clearRect(0,0, canv.width, canv.height);

                redrawTree(passedRoot, nodeToRem.getRight.getId);

                alert("Node removed!");
            } else if (nodeToRem.getLeft != null && nodeToRem.getRight == null) {
                if(nodeToRem.getVal > nodeToRem.getParent.getVal) {
                    nodeToRem.getParent.setRight = nodeToRem.getLeft;
                } else {
                    nodeToRem.getParent.setLeft = nodeToRem.getLeft;
                }
                nodeToRem.getLeft.setParent = nodeToRem.getParent;

                initialMove(nodeToRem.getLeft, nodeToRem.getId);

                const remNode = document.getElementById(nodeToRem.getId);
                remNode.remove();

                const canv = document.getElementById("myCanvas");
                const ctx = canv.getContext("2d");
                ctx.clearRect(0,0, canv.width, canv.height);
                redrawTree(passedRoot, nodeToRem.getLeft.getId);

                alert("Node removed!")
            } else if (curNode.getLeft != null && curNode.getRight != null) {
                if(nodeToRem.getVal > nodeToRem.getParent.getVal) {
                    nodeToRem.getParent.setRight = curNode.getLeft;
                } else {
                    nodeToRem.getParent.setLeft = curNode.getLeft;
                }
                
            } else{
                alert("Something went wrong");
            }
        }
        
    }

    nodeSearch(curNode, searchNode, endFunc) {
        highlightNode(curNode.getId, "lightblue");
        if (curNode.getParent) {
            highlightNode(curNode.getParent.getId, "white");
        }
        if (curNode.getVal == searchNode) {
            highlightNode(curNode.getId, "lightgreen");
            setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
            if(endFunc != null) {
                highlightNode(curNode.getId, "red")
                setTimeout(() => endFunc(curNode, this.getRoot), 2000/getAnimSpeed());
            }
            return curNode;
        } else {
            if (searchNode > curNode.getVal) {
                if (curNode.getRight != null) {
                    setTimeout(() => this.nodeSearch(curNode.getRight, searchNode, endFunc), 2000/getAnimSpeed());
                } else {
                    highlightNode(curNode.getId, "red");
                    alert("Value does not exist!");
                    setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                    return null;
                }                
            } else {
                if (curNode.getLeft != null) {
                    setTimeout(() => this.nodeSearch(curNode.getLeft, searchNode, endFunc), 2000/getAnimSpeed());
                } else {
                    highlightNode(curNode.getId, "red");
                    alert("Value does not exist!");
                    setTimeout(() => highlightNode(curNode.getId, "white"), 2000/getAnimSpeed());
                    return null;
                }      
            }            
        }
    }

}

