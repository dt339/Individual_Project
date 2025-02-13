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

    calcDepth() {
        var curNode = this;
        var depth = 0;
        while (curNode!=null) {
            depth++;
            curNode=curNode.getParent;
        }
        alert(this.getId + " = " + depth);
        return depth;
    }
}

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

class FibonacciNode {
    constructor(id) {
        this.id = id;
        this.parent = null;
        this.child = null;
        this.marked = false;
        this.degree = 0;
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

    changeDegree(changeAmount) {
        this.setDegree = this.getDegree + changeAmount;
    }
    

}