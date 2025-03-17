class Node {
    constructor(id) {
        this.left = null;
        this.right = null;
        this.id = id;
        this.parent = null;
    }

    //getters and setters for node values
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

    set setLeft(newLeft) {
        this.left = newLeft;
    }

    set setRight(newRight) {
        this.right = newRight;
    }

    set setParent(parentId) {
        this.parent = parentId;
    }

    //Calculates the depth of the node by traversing upwards through the tree.
    calcDepth() {
        var curNode = this;
        var depth = 0;
        while (curNode!=null) {
            depth++;
            curNode=curNode.getParent;
        }
        return depth;
    }
}


//Specialised form of the node class for red-black trees
//Holds the colour and isNull values for each node
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

//A specialised node for fibonacci heaps
//Stores the degree of a node and the marked attribute.
class FibonacciNode {
    constructor(id) {
        this.id = id;
        this.parent = null;
        this.child = null;
        this.marked = false;
        this.degree = 0;
        this.childList = null; 
    }

    get getId() {
        return this.id;
    }

    get getchild() {
        return this.child;
    }

    get getParent() {
        return this.parent;
    }

    get getMarked() {
        return this.marked;
    }

    get getDegree() {
        return this.degree;
    }

    get getChildList() {
        return this.childList;
    }

    set setId(i) {
        this.id = i;
    }

    set setChild(c) {
        this.child = c;
    }

    set setParent(p) {
        this.parent = p;
    }

    set setMarked(m) {
        this.marked = m;
    }

    set setDegree(d) {
        this.degree = d;
    }

    set setChildList(l) {
        this.childList = l;
    }

    changeDegree(changeAmount) {
        this.setDegree = this.getDegree + changeAmount;
    }
    

}