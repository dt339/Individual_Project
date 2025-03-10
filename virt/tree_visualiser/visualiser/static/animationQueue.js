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

        if (currentCommand.getType!="highlightLine") {
            //alert("curr - " + currentCommand.getType + " - " + currentCommand.getParams);
        }
        
        
        this.exeCommand(currentCommand);
        this.setBack = this.getBack - 1;        

        if (this.getBack != 0) {
            if (currentCommand.getType == "highlightLine") {
                if (getIsShowing()) {
                    setTimeout(() => this.runCommands(), 15000/getAnimSpeed());
                } else {
                    this.runCommands();
                }
            } else {
                setTimeout(() => this.runCommands(), 15000/getAnimSpeed());
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
            newElem(paramArray[0],paramArray[1],paramArray[2],paramArray[3],paramArray[4]);
        } else if (com.getType == "swap") {
            swap(paramArray[0], paramArray[1]);
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
        } else if (com.getType=="highlightBorder") {
            highlightBorder(paramArray[0], paramArray[1]);
        } else if (com.getType=="addFibRoot") {
            addFibRoot(paramArray[0], paramArray[1]);
        } else if (com.getType=="updateId") {
            updateId(paramArray[0], paramArray[1]);
        } else if (com.getType=="preRotationAllignment") {
            clearCanvas();  
            redrawTreeFromArray(paramArray[3], paramArray[1].getId);
            preRotationAllignment(paramArray[0], paramArray[1], paramArray[2]);
        } else if (com.getType=="allignFromList") {
            clearCanvas();
            allignFromList(paramArray[0]);
        } else if (com.getType=="redrawFromArray") {
            clearCanvas();
            redrawTreeFromArray(paramArray[0], paramArray[1]);
        } else if (com.getType=="recMoveArr") {
            recursiveMoveArray(paramArray[0], paramArray[1]);
        } else if (com.getType == "initMoveArr") {
            initMoveArray(paramArray[0], paramArray[1], paramArray[2], paramArray[3], paramArray[4]);
        } else if (com.getType == "moveToRootArray") {
            moveToRootArray(paramArray[0]);
        }
        
        
    }
}