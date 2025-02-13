class CDLLNode {
    constructor(n) {
        this.heldNode = n;
        this.leftPointer = null;
        this.rightPointer = null;
    }

    get getHeldNode() {
        return this.heldNode;
    }

    set setHeldNode(n) {
        this.heldNode = n;
    }

    get getLeftPointer() {
        return this.leftPointer;
    }

    set setleftPointer(p) {
        this.leftPointer = p;
    }

    get getRightPointer() {
        return this.rightPointer;
    }

    set setRightPointer(p) {
        this.rightPointer = p;
    }
}

class CDLinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    get getHead() {
        return this.head;
    }

    set setHead(h) {
        this.head = h;
    }

    get getLength() {
        return this.length;
    }

    set setLength(l) {
        this.length = l;
    }

    chnangeLength(changeValue) {
        this.setLength = this.getLength + changeValue;
    }

    insertElement(e) {
        var newElem = new CDLLNode(e);
        if (this.getHead==null) {
            this.setHead = newElem;
            newElem.setleftPointer = newElem;
            newElem.setRightPointer = newElem;
        } else {
            var tail = this.getHead.getLeftPointer;
            tail.setRightPointer = newElem;
            newElem.setleftPointer = tail;
            newElem.setRightPointer = this.head;
            this.getHead.setleftPointer = newElem;
        }
        this.chnangeLength(1);
    }

    removeElement(e) {
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var foundElem = null;
            var found = false;

            while (found==false) {
                if (curElem.getHeldNode.getId == e) {
                    foundElem=curElem;
                    found = true;
                } else {
                    curElem=curElem.getRightPointer;
                }
                
                if (curElem==this.getHead) {
                    found=true;
                }
            }

            if (foundElem==null) {
                alert("Element did not exist in list");
            } else {
                if (this.getHead==foundElem) {
                    if (foundElem.getRightPointer==foundElem) {
                       this.setHead=null; 
                    } else {
                        this.setHead=foundElem.getRightPointer;
                    }
                    
                }
                if (foundElem.getRightPointer==foundElem) {
                    
                } else {
                    foundElem.getLeftPointer.setRightPointer = foundElem.getRightPointer;
                    foundElem.getRightPointer.setleftPointer = foundElem.getLeftPointer;
                }
                this.chnangeLength(-1);
            }

        }
    }

    print() {
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var output = [];
            var finished = false;

            while (!finished) {
                output.push(curElem.getHeldNode.getId);
                curElem = curElem.getRightPointer;
                if (curElem==this.getHead) {
                    finished=true;
                }
            }
            alert(output.join(" <-> "));
        } else {
            alert("List is empty");
        }
    }

    getAllValues() {
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var output = [];
            var finished = false;

            while (!finished) {
                output.push(curElem.getHeldNode.getId);
                curElem = curElem.getRightPointer;
                if (curElem==this.getHead) {
                    finished=true;
                }
            }
            return output;
        } else {
            alert("List is empty");
            return null;
        }
    }
}

class FibonacciHeap {
    constructor() {    
        this.minNode = null;
        this.numOfNodes = 0;
        this.rootList = new CDLinkedList;
        this.queue = new AnimQueue;
    }

    get getMinNode() {
        return this.minNode;
    }

    set setMinNode(m) {
        this.minNode = m;
    }

    get getNumOfNodes() {
        return this.numOfNodes;
    }

    set setNumOfNodes(n) {
        this.numOfNodes = n;
    }

    changeNumOfNodes(changeValue) {
        this.numOfNodes = this.getNumOfNodes + changeValue;
    }

    insert(nodeVal, nodeArr) {
        var newNode = new FibonacciNode(parseInt(nodeVal, 10));
        this.rootList.insertElement(newNode);
        this.changeNumOfNodes(1);
        this.rootList.print();
        this.queue.addCommand("addFibRoot", [nodeVal, this.rootList.getAllValues()]);
        this.queue.addCommand("setProcess", ["none"]);
        this.queue.runCommands();
    }

    remove(nodeVal) {
        this.rootList.removeElement(nodeVal);
        this.changeNumOfNodes(-1);
        this.rootList.print();
        this.queue.addCommand("setProcess", ["none"]);
        this.queue.runCommands();
    }

}