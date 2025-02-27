class Command {
    constructor(type, params) {
        this.type = type;
        this.params = params;
    }

    get getType() {
        return this.type;
    }

    get getParams() {
        return this.params;
    }

    set setType(t) {
        this.type = t;
    }

    set setParams(p) {
        this.params = p;
    }

}

class AnimQueue {
    constructor () {
        this.front = 0;
        this.back = 0;
        this.queue = [];
    }

    get getFront() {
        return this.front;
    }

    get getBack() {
        return this.back;
    }

    get getQueue() {
        return this.queue;
    }

    set setFront(f) {
        this.front = f;
    }

    set setBack(b) {
        this.back = b;
    }

    addCommand(type, params) {
        let newCom = new Command(type, params);
        this.setBack = this.getBack + 1;
        this.getQueue.push(newCom);
        //alert("added - " + type);
    }

    runCommands() {
        var currentCommand = this.getQueue.shift();
        // alert("curr - " + currentCommand.getType + " - " + currentCommand.getParams);
        
        this.exeCommand(currentCommand);
        this.setBack = this.getBack - 1;        

        if (this.getBack != 0) {
            if (currentCommand.getType == "highlightLine") {
                if (getIsShowing()) {
                    setTimeout(() => this.runCommands(), 10000/getAnimSpeed());
                } else {
                    this.runCommands();
                }
            } else {
                setTimeout(() => this.runCommands(), 10000/getAnimSpeed());
            }
            
            // setTimeout(() => this.runCommands(), 10000/getAnimSpeed());
        } else {
            //alert("Queue is empty");
        }    

        // if (this.getBack != 0) {
        //     var currentCommand = this.getQueue.shift();
        //     //alert("curr - " + currentCommand.getType);
        //     this.exeCommand(currentCommand);
        //     this.setBack = this.getBack - 1;
        //     setTimeout(() => this.runCommands(), 10000/getAnimSpeed());

        // } else {
        //     alert("Queue is empty");
        // }        

    }

    exeCommand(com) {
        var paramArray = com.getParams;
        if (com.getType == "createRoot") {
            createRoot(paramArray[0], paramArray[0]);
        } else if (com.getType == "createNode") {   
            //alert("createNode - " + paramArray[0] + " - " + paramArray[1] + " - " + paramArray[2] + " - " + paramArray[3] + " - " + paramArray[4]);         
            newElem(paramArray[0],paramArray[1],paramArray[2],paramArray[3],paramArray[4]);
        } else if (com.getType == "redrawTree") {
            clearCanvas();
            redrawTree(paramArray[0],paramArray[1]);
        } else if (com.getType == "swap") {
            //alert("swapping  - " + paramArray[0] + " - " + paramArray[1]);
            swap(paramArray[0], paramArray[1]);
        } else if (com.getType == "initMove") {
            initialMove(paramArray[0], paramArray[1]);
        } else if (com.getType == "recMove") {
            clearCanvas();
            redrawTree(newTree.getRoot, paramArray[0].getId);
            recursiveMove(paramArray[0], paramArray[1]);
        } else if (com.getType == "removeNode") {
            removeElem(paramArray[0]);
        } else if (com.getType == "highlightNode") {
            highlightNode(paramArray[0], paramArray[1]);
        } else if (com.getType == "highlightLine") {
            highlightLine(paramArray[0]);
        } else if (com.getType == "setProcess") {
            setCurrProcess(paramArray[0]);
        } else if (com.getType == "createColouredRoot") {
            createRoot(paramArray[0], paramArray[0], paramArray[1]);
        } else if (com.getType == "createColouredNode") {      
            newElem(paramArray[0],paramArray[1],paramArray[2],paramArray[3],paramArray[4], paramArray[5]);
        } else if (com.getType == "RBredrawTree") {      
            clearCanvas();
            redBlackRedrawTree(paramArray[0],paramArray[1]);
        } else if (com.getType== "RBRecMove") {
            clearCanvas();
            redBlackRedrawTree(newTree.getRoot, paramArray[0].getId);
            RBRecursiveMove(paramArray[0], paramArray[1]);
        } else if (com.getType=="highlightBorder") {
            highlightBorder(paramArray[0], paramArray[1]);
        } else if (com.getType=="addFibRoot") {
            addFibRoot(paramArray[0], paramArray[1]);
        } else if (com.getType=="rootLines") {
            rootLines(paramArray[0]);
        } else if (com.getType=="allignRoots") {
            allignRoots(paramArray[0]);
        } else if (com.getType=="allignChildren") {
            allignChildren(paramArray[0], paramArray[1]);
        } else if (com.getType=="allignAll") {
            clearCanvas();
            allignAll(paramArray[0]);
        } else if (com.getType=="updateId") {
            updateId(paramArray[0], paramArray[1]);
        } else if (com.getType=="moveToRoot") {
            clearCanvas();
            moveToRoot(paramArray[0]);
        } else if (com.getType=="preRotationAllignment") {
            clearCanvas();
            if (thisPage=="RB") {
                redBlackRedrawTree(newTree.getRoot, paramArray[1].getId);
            } else {
                redrawTree(newTree.getRoot, paramArray[1].getId);
            }            
            preRotationAllignment(paramArray[0], paramArray[1], paramArray[2]);
        } else if (com.getType=="allignFromList") {
            clearCanvas();
            allignFromList(paramArray[0]);
        }
        
        
    }
}