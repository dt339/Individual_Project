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
        //alert("I've inserted a node - " + e.getId)
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

    getAll(type) {
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var output = [];
            var finished = false;

            while (!finished) {
                if (type=="id") {
                    output.push(curElem.getHeldNode.getId);
                } else if (type=="node") {
                    output.push(curElem.getHeldNode);
                }
                
                curElem = curElem.getRightPointer;
                if (curElem==this.getHead) {
                    finished=true;
                }
            }
            return output;
        } else {
            //alert("List is empty");
            return null;
        }
    }

    findMin() {
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var curMin = this.getHead;
            var finished = false;

            while (!finished) {
                if (curElem.getHeldNode.getId < curMin.getHeldNode.getId) {
                    curMin = curElem;
                }
                curElem = curElem.getRightPointer;
                if (curElem==this.getHead) {
                    finished=true;
                }
            }
            
            return curMin.getHeldNode;
        } else {
            alert("no other nodes in heap");
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

    checkMinNode(newNode) {
        if (this.getMinNode==null) {
            this.setMinNode = newNode;
            this.queue.addCommand("highlightNode", [this.getMinNode.getId, "lime"]);
        } else if (newNode.getId < this.getMinNode.getId) {
            this.queue.addCommand("highlightNode", [this.getMinNode.getId, "white"]);
            this.setMinNode = newNode;
            this.queue.addCommand("highlightNode", [this.getMinNode.getId, "lime"]);
        }
        
    }

    insert(nodeVal, nodeArr) {
        var newNode = new FibonacciNode(parseInt(nodeVal, 10));
        newNode.setChildList = new CDLinkedList();
        this.rootList.insertElement(newNode);
        this.changeNumOfNodes(1);
        this.rootList.print();
        this.queue.addCommand("addFibRoot", [nodeVal, this.rootList.getAll("node")]);
        this.queue.addCommand("rootLines", [this.rootList.getAll("node")]);        
        this.checkMinNode(newNode);
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

    removeMin() {
        var toRemove = this.getMinNode;
        if (toRemove!= null) {
            this.queue.addCommand("highlightNode", [toRemove.getId, "red"]);
            this.queue.addCommand("removeNode", [toRemove.getId]);
            var childList = toRemove.getChildList;
            var childArr = childList.getAll("node");
            if (childArr!=null) {
                for (let i = 0; i < childArr.length; i++) {
                    this.rootList.insertElement(childArr[i]);
                    childArr[i].setParent = null;
                    //this.queue.addCommand("addFibRoot", [childArr[i].getId, this.rootList.getAll("id")]);
                }
                this.queue.addCommand("rootLines", [this.rootList.getAll("id")]);
            }

            this.rootList.removeElement(toRemove.getId);
            this.changeNumOfNodes(-1);

            this.setMinNode = this.rootList.findMin();
            if (this.getMinNode != null) {
                this.consolidate();
            }
            
            this.queue.addCommand("highlightNode", [this.getMinNode.getId, "lime"]);
        } else {
            alert("No nodes in heap!");
        }
        this.rootList.print();
        this.queue.addCommand("setProcess", ["none"]);
        this.queue.runCommands();
    }

    consolidate() {
        var degreeArray = new Array(this.getNumOfNodes).fill(null);
        var rootArray = this.rootList.getAll("node");
        for (let i = 0; i < rootArray.length; i++) {
            var curRoot = rootArray[i];
            //alert("cur root - " + curRoot.getId);
            var curDegree = curRoot.getDegree;
            while (degreeArray[curDegree]!=null) {
                var joinRoot = degreeArray[curDegree];
                if (curRoot.getId>joinRoot.getId) {
                    var hold = curRoot;
                    curRoot = joinRoot;
                    joinRoot = hold;
                } 
                this.joinRoots(curRoot, joinRoot);
                degreeArray[curDegree]=null;
                curDegree += 1;
            }
            degreeArray[curDegree] = curRoot;
        }
        this.setMinNode = this.rootList.findMin();
    }

    joinRoots(smallNode, largeNode) {
        this.rootList.removeElement(largeNode.getId);
        smallNode.getChildList.insertElement(largeNode); 
        largeNode.setParent = smallNode;
        largeNode.setMarked = false;
        smallNode.changeDegree(1);
        this.queue.addCommand("allignRoots", [this.rootList.getAll("node")]);
        this.queue.addCommand("allignChildren", [smallNode, this.rootList.getAll("node")]);
        this.queue.addCommand("rootLines", [this.rootList.getAll("node")]);        
    }

}