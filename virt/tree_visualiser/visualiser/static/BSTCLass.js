class Node {
    constructor(val, id) {
        this.nodeVal = val;
        this.left = null;
        this.right = null;
        this.id = id;
        this.parent = null;
    }

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
        } else {
            this.recursiveInsert(newNode, this.getRoot, 0);
        }
    }

    recursiveInsert(newNode, curNode, depth) {
        //Checks to see if the new node is greater than the node currently being checked.
        if (newNode.getVal > curNode.getVal) {
            //Checks to see if the current node has a right child.
            if (curNode.getRight == null) {
                //If no right child exists, sets the new node as the right child.
                newNode.setParent = curNode;
                curNode.setRight = newNode;
                newElem(newNode.getVal, newNode.getVal, curNode.getId, 'r', depth);
            } else {
                //If a right child exists, compare the new node to the right child.
                //(Recursion)                
                depth++;
                this.recursiveInsert(newNode, curNode.getRight, depth);
            }
        } else if (newNode.getVal < curNode.getVal) {
            //Checks to see if the new node is less than the current node.
            //If the current node has no left child, set the new node as the left child.
            if (curNode.getLeft == null) {
                newNode.setParent = curNode;
                curNode.setLeft = newNode;
                newElem(newNode.getVal, newNode.getVal, curNode.getId, 'l', depth);
            } else {
                //If a left child exists, compare the new node and the left child.
                depth++;
                this.recursiveInsert(newNode, curNode.getLeft, depth);
            }
            //If the new node is equal to the current node it already exists and cannot be enetered.
        } else if (newNode.getVal == curNode.getVal) {
            alert("Node already exists!");
        }
    }

    removeNode(toRem) {
        if (this.getRoot == null) {
            alert("No data in tree to be removed!");
        } else if (this.getRoot.getVal == toRem) {
            alert("Node Found!");
            if (this.getRoot.getLeft == null && this.getRoot.getRight == null) {
                alert("Removed")
                this.setRoot = null;
                const node = document.getElementById(toRem);
                node.remove();
            } else {
                alert("Node had children")
            }
            

        } else {
            this.recursiveRemove(toRem, this.getRoot);
        }
    }

    recursiveRemove(toRem, curNode) {
        if (curNode == null) {
            alert("Node Doesn't exist!");
        }
        if (toRem == curNode.getVal) {
            alert("Node Found!");
            alert("Parent - " + curNode.getParent.getVal);
            if (curNode.getLeft == null && curNode.getRight == null) {
                if (curNode.getVal > curNode.getParent.getVal) {
                    curNode.getParent.setRight = null;
                } else {
                    curNode.getParent.setLeft = null;
                }
                const node = document.getElementById(toRem);
                node.remove();
                alert("LEAF so removed");
            } else {
                if (curNode.getLeft == null && curNode.getRight != null) {
                    if(curNode.getVal > curNode.getParent.getVal) {
                        curNode.getParent.setRight = curNode.getRight;
                    } else {
                        curNode.getParent.setLeft = curNode.getRight;
                    }

                    setUpMove(curNode.getRight.getId, toRem);

                    const remNode = document.getElementById(toRem);
                    remNode.remove();
                    setTimeout(() => recursiveMove(curNode.getRight), 2000);
                    alert("Node removed!")
                } else if (curNode.getLeft != null && curNode.getRight == null) {
                    if(curNode.getVal > curNode.getParent.getVal) {
                        curNode.getParent.setRight = curNode.getLeft;
                    } else {
                        curNode.getParent.setLeft = curNode.getLeft;
                    }
                    
                    setUpMove(curNode.getLeft.getId, toRem);

                    const remNode = document.getElementById(toRem);
                    remNode.remove();
                    alert("Node removed!")
                } else if (curNode.getLeft != null && curNode.getRight != null) {
                    if(curNode.getVal > curNode.getParent.getVal) {
                        curNode.getParent.setRight = curNode.getLeft;
                    } else {
                        curNode.getParent.setLeft = curNode.getLeft;
                    }
                    
                } else{
                    alert("Something went wrong");
                }
            }          

        } else if (toRem > curNode.getVal) {
            this.recursiveRemove(toRem, curNode.getRight);
        } else if (toRem < curNode.getVal) {
            this.recursiveRemove(toRem, curNode.getLeft);
        }   
    }


    // if (direction == 'r') {
    //     const xx = (refPos.left - containerPos.left + refPos.width + ((10-depth)* 10));
    //     const yy = (refPos.top - containerPos.top + refPos.height + ((5-depth)* 10));
    //     elem.style.left = xx+ 'px';
    //     elem.style.top = yy+ 'px';
    // } else {
    //     const xx = (refPos.left - containerPos.left - refPos.width - ((10-depth)* 10));
    //     const yy = (refPos.top - containerPos.top + refPos.height + ((5-depth)* 10));
    //     elem.style.left = xx+ 'px';
    //     elem.style.top = yy+ 'px';
    // }

}

