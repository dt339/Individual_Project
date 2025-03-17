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

    getState() {
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var curState = [];
            var finished = false;

            while (!finished) {
                var thisTuple = [curElem.getHeldNode.getId, curElem.getHeldNode.getChildList.getState()];
                curState.push(thisTuple);
                curElem = curElem.getRightPointer;
                if (curElem==this.getHead) {
                    finished=true;
                }
            }
            return curState;
        } else {
            return null;
        }
    }

    //Creates a new linked list element that holds the node in the list.
    //Inserts this element into the list
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
        //Increases the held length of the list.
        this.chnangeLength(1);
    }

    removeElement(e) {
        //Removes the specified value from the list if found.
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var foundElem = null;
            var found = false;

            //Loops through all elements in the list
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
                //Removes the specified element
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
        //Loops through all elements in the list and returns the heap node id for each one
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

    get(e) {
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var toOutput = null; 
            var finished = false;

            while (!finished) {
                if (curElem.getHeldNode.getId==e) {
                    toOutput = curElem.getHeldNode;
                    finished=true;
                }
                curElem = curElem.getRightPointer;
                if (curElem==this.getHead) {
                    finished=true;
                }
            }
            return curElem;
        } else {
            alert("List is empty");
            return null;
        }
    }

    getAll(type) {
        if (this.getHead!=null) {
            var curElem = this.getHead;
            var output = [];
            var finished = false;

            //Loops through thr list and adds the value to an array.
            while (!finished) {
                //Adds the node id or the node obejct depending on the specified type.
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

            //Loops through the list and finds the smallest element
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

    get getRootList() {
        return this.rootList;
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
        //Checks to see if the newest inserted node is smaller than the current minimum node
        //highlights the minimum node green
        if (this.getMinNode==null) {
            this.setMinNode = newNode;
            this.queue.addCommand("highlightNode", [this.getMinNode.getId, "lime"]);
        } else if (newNode.getId < this.getMinNode.getId) {
            this.queue.addCommand("highlightNode", [this.getMinNode.getId, "white"]);
            this.setMinNode = newNode;
            this.queue.addCommand("highlightNode", [this.getMinNode.getId, "lime"]);
        }
        
    }

    search(curArr, nodeVal) {
        //Takes in the current list to be searched and the value to search for.
        //Performs depth first search.

        //Checks that the current list is not empty
        if (curArr!=null) {
            var searchedNode = null;
            //Loops through each node in the current list
            for (let i=0; i<curArr.length;i++) {
                //If the current node in the current list has the id of the value being searched for, the node is stored.
                if (curArr[i].getId==nodeVal) {
                    searchedNode = curArr[i];
                } else {
                    //Checks to see if the current node is smaller than the value being searched for.
                    //The node could only exist as a child of a smaller node than itself.
                    if (curArr[i].getId < nodeVal) {
                        if (searchedNode==null) {
                            //Searches the child list of the current node.
                            //Stores the result of it if the node is found.
                            var curSearch = this.search(curArr[i].getChildList.getAll("node"), nodeVal);
                            if (curSearch!=null) {
                                searchedNode = curSearch;
                            }
                        }
                    }
                    
                }
            }
            return searchedNode;
        } else {
            return null;
        }
    }

    insert(nodeVal, nodeArr) {
        this.queue.addCommand("setProcess", ["insert"]);
        if (nodeVal > 0) {
            //creates a new node for the inserted value
            var newNode = new FibonacciNode(parseInt(nodeVal, 10));
            newNode.setChildList = new CDLinkedList();
            
            //Inserts the new node into the root list
            this.rootList.insertElement(newNode);
            this.changeNumOfNodes(1);
            // this.rootList.print();
            this.queue.addCommand("highlightLine", ["L0"]);
            this.queue.addCommand("highlightLine", ["L1"]);
            //Rearranges the display the include the new inserted element
            this.queue.addCommand("addFibRoot", [nodeVal, this.rootList.getState()]);    

            if (this.getMinNode==null) {
                this.queue.addCommand("highlightLine", ["L2"]);
                this.queue.addCommand("highlightLine", ["L3"]);
                this.setMinNode = newNode;
                this.queue.addCommand("highlightNode", [this.getMinNode.getId, "lime"]);
            } else if (newNode.getId < this.getMinNode.getId) {
                this.queue.addCommand("highlightLine", ["L4"]);
                this.queue.addCommand("highlightLine", ["L5"]);
                this.queue.addCommand("highlightLine", ["L6"]);

                this.queue.addCommand("highlightNode", [this.getMinNode.getId, "white"]);
                this.setMinNode = newNode;
                this.queue.addCommand("highlightNode", [this.getMinNode.getId, "lime"]);
            }
            
        } else {
            alert("Nodes must have a value greater than 0!");
        }
        
        if (nodeArr.length > 1) {
            nodeArr.shift();
            this.queue.addCommand("setProcess", ["insert"]);
            this.insert(nodeArr[0], nodeArr);
        } else {
            //Set process to none.
            this.queue.addCommand("setProcess", ["none"]);  
            this.queue.runCommands();
        }

        // this.queue.addCommand("setProcess", ["none"]);
        // this.queue.runCommands();
    }

    decrease(nodeId, newVal) {
        var check = this.search(this.rootList.getAll("node") ,newVal);
        
        var toDecrease = this.search(this.rootList.getAll("node") ,nodeId);
        //alert("to decrease - " + toDecrease)

        if (check != null) {
            alert("A node already exists with the new value.")
        } else {
            if (newVal > toDecrease.getId) {
                this.queue.addCommand("highlightLine", ["L7"]);
                this.queue.addCommand("highlightLine", ["L8"]);
                alert("New value greater than node's current value");
            } else {
                this.queue.addCommand("highlightLine", ["L0"]);
                this.queue.addCommand("highlightLine", ["L1"]);
                this.queue.addCommand("highlightNode", [toDecrease.getId, "red"] );
                this.queue.addCommand("updateId", [toDecrease.getId, newVal] );
                toDecrease.setId = newVal;
                
                var parent = toDecrease.getParent;
                if (parent != null) {
                    this.queue.addCommand("highlightLine", ["L2"]);
                    if (toDecrease.getId < parent.getId) {
                        this.queue.addCommand("highlightLine", ["L3"]);
                        this.queue.addCommand("highlightLine", ["L4"]);
                        this.queue.addCommand("highlightLine", ["L5"]);
                        
                        this.cut(toDecrease, parent);
                        this.recursiveCut(parent);
                        // this.queue.addCommand("allignAll", [this.rootList.getAll("node")]);
                        var currentState = this.rootList.getState();
                        this.queue.addCommand("allignFib", [currentState]);  
                   
                    }
                }
                this.queue.addCommand("highlightNode", [toDecrease.getId, "white"] );
            }     
        }

        this.queue.addCommand("highlightLine", ["L6"]);
        this.checkMinNode(toDecrease);
        this.queue.addCommand("setProcess", ["none"]);
        this.queue.runCommands();
    }

    cut(curNode, parent) {
        //Removes the current node from its parent.
        parent.getChildList.removeElement(curNode.getId);
        parent.changeDegree(-1);
        //Inserts the current node into the root list of the tree.
        this.rootList.insertElement(curNode);
        curNode.setParent = null;
        curNode.setMarked = false;
    }

    recursiveCut(curNode) {
        var parent = curNode.getParent;
        if (parent != null) {
            if (curNode.getMarked == false) {
                curNode.setMarked = true;
            } else {
                this.cut(curNode, parent);
                this.recursiveCut(parent);
            }
        }
    }

    remove(nodeVal) {

        var toRemove = this.search(this.rootList.getAll("node"), nodeVal);
        if (toRemove!=null) {
            this.queue.addCommand("highlightLine", ["L0"]);
            this.queue.addCommand("highlightLine", ["L1"]);
            //Sets the node to have the smallest value in the tree.
            this.queue.addCommand("setProcess", ["FHdecrease"]);
            this.decrease(nodeVal, 0);
            this.queue.addCommand("setProcess", ["remove"]);
            this.queue.addCommand("highlightLine", ["L2"]);
            //Removes the smallest value in the tree which is now the node to be removed.
            this.queue.addCommand("setProcess", ["removeMin"]);
            this.removeMin();
            this.queue.addCommand("setProcess", ["remove"]);
            
        } else {
            alert("Specified value does not exist in tree");
            this.queue.addCommand("highlightLine", ["L3"]);
            this.queue.addCommand("highlightLine", ["L4"]);
        }

        this.queue.addCommand("setProcess", ["none"]);
        this.queue.runCommands();
    }

    removeMin() {
        var toRemove = this.getMinNode;
        if (toRemove!= null) {
            this.queue.addCommand("highlightLine", ["L0"]);
            this.queue.addCommand("highlightNode", [toRemove.getId, "red"]);
            this.queue.addCommand("highlightLine", ["L1"]);
            this.queue.addCommand("removeNode", [toRemove.getId]);
            var childList = toRemove.getChildList;
            var childArr = childList.getAll("node");
            
            //Adds all children of the removed node to the root list.
            this.queue.addCommand("highlightLine", ["L2"]);
            if (childArr!=null) {
                for (let i = 0; i < childArr.length; i++) {
                    this.rootList.insertElement(childArr[i]);
                    childArr[i].setParent = null;
                }
            }

            //Removes the specified value from the root list
            this.rootList.removeElement(toRemove.getId);
            this.changeNumOfNodes(-1);

            var currentState = this.rootList.getState();
            this.queue.addCommand("allignFib", [currentState]);  

            this.setMinNode = this.rootList.findMin();

            //Checks to see if consolidation is required
            if (this.getMinNode != null) {     
                this.queue.addCommand("highlightLine", ["L3"]);           
                this.queue.addCommand("highlightLine", ["L4"]);
                this.consolidate();
            }  else {
                this.queue.addCommand("highlightLine", ["L5"]);
                this.queue.addCommand("highlightLine", ["L6"]);
            }

            this.queue.addCommand("highlightNode", [this.getMinNode.getId, "lime"]);
        } else {
            this.queue.addCommand("highlightLine", ["L7"]);
            this.queue.addCommand("highlightLine", ["L8"]);
        }
        
        this.rootList.print();
        this.queue.addCommand("setProcess", ["none"]);
        this.queue.runCommands();
    }

    consolidate() {
        
        this.queue.addCommand("setProcess", ["FHConsolidate"]);
        //Creates an array with the length equal to the number of nodes in the heap.
        //Each position in the array is initialised to null
        var degreeArray = new Array(this.getNumOfNodes).fill(null);
        var rootArray = this.rootList.getAll("node");
        this.queue.addCommand("highlightLine", ["L0"]);
        //Loops through each root node in the root list
        for (let i = 0; i < rootArray.length; i++) {
            var curRoot = rootArray[i];
            this.queue.addCommand("highlightNode", [curRoot.getId, "lightblue"]);
            //Gets the degree of the current root.
            var curDegree = curRoot.getDegree;
            //If another root exists with the same degree as the current root
            //Those two roots are joined
            while (degreeArray[curDegree]!=null) {
                this.queue.addCommand("highlightLine", ["L1"]);
                //Gets the other root with the same degree
                var joinRoot = degreeArray[curDegree];
                //Ensures that the curRoot is the smallest root
                if (curRoot.getId>joinRoot.getId) {
                    var hold = curRoot;
                    curRoot = joinRoot;
                    joinRoot = hold;
                    this.queue.addCommand("highlightLine", ["L4"]);
                    this.queue.addCommand("highlightLine", ["L5"]);
                    
                    this.queue.addCommand("highlightNode", [curRoot.getId, "lightgreen"]);
                    this.queue.addCommand("highlightNode", [joinRoot.getId, "red"]);
                } else {                    
                    this.queue.addCommand("highlightLine", ["L2"]);
                    this.queue.addCommand("highlightLine", ["L3"]);
                    this.queue.addCommand("highlightNode", [joinRoot.getId, "red"]);
                    this.queue.addCommand("highlightNode", [curRoot.getId, "lightgreen"]);
                }
                //Joins the roots together
                this.joinRoots(curRoot, joinRoot);
                degreeArray[curDegree]=null;
                curDegree += 1;

                this.queue.addCommand("highlightNode", [joinRoot.getId, "white"]);
                this.queue.addCommand("highlightNode", [curRoot.getId, "lightblue"]);
            }
            this.queue.addCommand("highlightLine", ["L6"]);
            this.queue.addCommand("highlightLine", ["L9"]);
            this.queue.addCommand("highlightLine", ["L10"]);
            degreeArray[curDegree] = curRoot;
            this.queue.addCommand("highlightNode", [curRoot.getId, "white"]);
        }
        this.queue.addCommand("highlightLine", ["L7"]);
        this.queue.addCommand("highlightLine", ["L8"]);
        // this.queue.addCommand("allignAll", [this.rootList.getAll("node")]);
        var currentState = this.rootList.getState();
        this.queue.addCommand("allignFib", [currentState]);  
        this.setMinNode = this.rootList.findMin();
    }

    joinRoots(smallNode, largeNode) {
        //this.queue.addCommand("allignRoots", [this.rootList.getAll("node")]);
        //Removes the larger root from the root list
        this.rootList.removeElement(largeNode.getId);
        //Adds the larger root to the child list of the smaller root
        smallNode.getChildList.insertElement(largeNode); 
        largeNode.setParent = smallNode;
        largeNode.setMarked = false;
        smallNode.changeDegree(1);        
        
        var currentState = this.rootList.getState();

        this.queue.addCommand("allignFib", [currentState]);   

        // this.queue.addCommand("allignChildren", [smallNode, this.rootList.getAll("node")]);   
    }

}