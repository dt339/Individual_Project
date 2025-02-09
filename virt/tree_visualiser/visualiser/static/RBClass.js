class RedBlackNode extends Node {
    constructor(id, red, isNull) {
        super(id);        
        this.isRed = red;        
        this.isNull = isNull;
    }

    get getIsRed() {
        return this.isRed;
    }

    set setIsRed(r) {
        this.isRed = r;
    }

    get getIsNull() {
        return this.isNull;
    }

    set setIsNull(n) {
        this.isNull = n;
    }

}

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
                return 'x';
            } else {
                if (node.getIsRed) {
                    return ["(",(node.getId+"red"), this.traverse(node.getLeft), this.traverse(node.getRight),")"];
                } else {
                    return ["(",(node.getId+"black"), this.traverse(node.getLeft), this.traverse(node.getRight),")"];
                }
            }
           
        } 
    }  

    search(curNode, toFind) {
        if (toFind == curNode.getId) {
            return curNode;
        } else if (toFind > curNode.getId) {
            if (curNode.getRight.getIsNull==false) {
                return this.search(curNode.getRight, toFind);
            } else {
                return null;
            }
        } else if (toFind < curNode.getId) {
            if (curNode.getLeft.getIsNull==false) {
                return this.search(curNode.getLeft, toFind);
            } else {
                return null;
            }
        }

    }

    insert(nodeVal, nodeArr) {
        var newNode = new RedBlackNode(parseInt(nodeVal, 10), true, false);

        var lastNode = null;
        var currentNode = this.getRoot;
       
        while (currentNode.getIsNull==false) {
            lastNode=currentNode;
            if (newNode.getId<currentNode.getId) {
                currentNode=currentNode.getLeft;
            } else {
                currentNode=currentNode.getRight;
            }
        }

        newNode.setParent = lastNode;
        if (lastNode==null) {
            this.setRoot=newNode;
        } else if (newNode.getId<lastNode.getId) {
            lastNode.setLeft = newNode;
        } else {
            lastNode.setRight = newNode;
        }
        
        newNode.setLeft = new RedBlackNode(0, false, true);
        newNode.setRight = new RedBlackNode(0, false, true);
        newNode.setIsRed = true;
        this.insertFixup(newNode);
    } 

    insertFixup(curNode) {
        //This relies on javascript evaluating the first condition before the second.
        //If the current node has no parent, it will not check if the parent is red.
        //This way of calculating it prevents an error from occuring.
        while (curNode.getParent!=null) {
            if (curNode.getIsRed && curNode.getParent.getIsRed) {
                if (curNode.getParent.getParent!= null) {
                    if (curNode.getParent==curNode.getParent.getParent.getLeft) {
                        let uncle = curNode.getParent.getParent.getRight;
                        if (uncle.getIsRed) {
                            curNode.getParent.setIsRed = false;
                            uncle.setIsRed = false;
                            curNode.getParent.getParent.setIsRed = true;
                        } else {
                            if (curNode==curNode.getParent.getRight) {
                                curNode = curNode.getParent;
                                this.leftRotation(curNode);
                            }
                            curNode.getParent.setIsRed = false;
                            curNode.getParent.getParent.setIsRed = true;
                            this.rightRotation(curNode.getParent.getParent);
                        }
                    } else {
                        let uncle = curNode.getParent.getParent.getLeft;
                        if (uncle.getIsRed) {
                            curNode.getParent.setIsRed = false;
                            uncle.setIsRed = false;
                            curNode.getParent.getParent.setIsRed = true;
                        } else {
                            if (curNode==curNode.getParent.getLeft) {
                                
                                curNode = curNode.getParent;
                                this.rightRotation(curNode);
                            }
                            curNode.getParent.setIsRed = false;
                            curNode.getParent.getParent.setIsRed = true;
                            this.leftRotation(curNode.getParent.getParent);
                        }
                    }
                }
            }
            curNode = curNode.getParent;
            
        }
        this.getRoot.setIsRed = false;
    }

    remove(theRoot, removeVal) {
        alert("the fuck?")
        var toRemove = this.search(this.getRoot, removeVal);
        alert("to remove? = " + toRemove);
        if (toRemove != null) {
            alert("to remove? = " + toRemove.getId);
            alert("to remove left? = " + toRemove.getLeft);
            alert("to remove left id? = " + toRemove.getLeft.getId);
            var x = null;
            var y = toRemove;
            var yOrigIsRed = y.getIsRed;

            if (toRemove.getLeft.getIsNull) {
                alert("NO LEFT CHILD!!!");
                x = toRemove.getRight;
                alert("x.getId - " + x.getId + x.getIsNull);
                this.transplant(toRemove, toRemove.getRight);
                alert("after");
            } else if (toRemove.getRight.getIsNull) {
                x = toRemove.getLeft;
                this.transplant(toRemove, toRemove.getLeft);
            } else {
                y = this.getSuccessor(toRemove.getRight);
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
                y.setIsRed = toRemove.getIsRed;
            }

            if (yOrigIsRed==false) {
                this.deleteFixup(x);
            }
        }
    }

    deleteFixup(curNode) {
        alert("curNode - " + curNode.getId);
        while (curNode.getParent!=null&&curNode.getIsRed==false) {
            //if (curNode.getIsRed==false) {
                if (curNode==curNode.getParent.getLeft) {
                    alert("replacement is left");
                    var sibling = curNode.getParent.getRight;
                    if (sibling.getIsRed) {
                        sibling.setIsRed=false;
                        curNode.getParent.setIsRed = true;
                        this.leftRotation(curNode.getParent);
                        sibling = curNode.getParent;
                    }
                    if (sibling.getLeft.getIsRed==false&&sibling.getRight.getIsRed==false) {
                        sibling.setIsRed = true;
                        curNode=curNode.getParent;
                    } else {
                        if (sibling.getRight.getIsRed==false) {
                            sibling.getLeft.setIsRed = false;
                            sibling.setIsRed = true;
                            this.rightRotation(sibling);
                            sibling = curNode.getParent.getRight;
                        }
                        sibling.setIsRed=curNode.getParent.getIsRed;
                        curNode.getParent.setIsRed = false;
                        sibling.getRight.setIsRed = false;
                        this.leftRotation(curNode.getParent);
                        curNode = this.getRoot;
                    }
                } else {
                    alert("replacement is right");
                    var sibling = curNode.getParent.getLeft;
                    if (sibling.getIsRed) {
                        sibling.setIsRed=false;
                        curNode.getParent.setIsRed = true;
                        this.rightRotation(curNode.getParent);
                        sibling = curNode.getParent;
                    }
                    if (sibling.getLeft.getIsRed==false&&sibling.getRight.getIsRed==false) {
                        sibling.setIsRed = true;
                        curNode=curNode.getParent;
                    } else {
                        if (sibling.getLeft.getIsRed==false) {
                            sibling.getRight.setIsRed = false;
                            sibling.setIsRed = true;
                            this.leftRotation(sibling);
                            sibling = curNode.getParent.getLeft;
                        }
                        sibling.setIsRed=curNode.getParent.getIsRed;
                        curNode.getParent.setIsRed = false;
                        sibling.getLeft.setIsRed = false;
                        this.rightRotation(curNode.getParent);
                        curNode = this.getRoot;
                    }
                }
            //}
        }
        curNode.setIsRed = false;
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
    }

    getSuccessor(curNode) {
        if (curNode.getLeft.getIsNull) {
            return curNode;
        } else {
            return curNode.getLeft;
        }
    } 

}
   