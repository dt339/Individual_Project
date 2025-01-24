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
}