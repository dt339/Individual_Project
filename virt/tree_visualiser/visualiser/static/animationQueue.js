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
        //alert("curr - " + currentCommand.getType);
        this.exeCommand(currentCommand);
        this.setBack = this.getBack - 1;        

        if (this.getBack != 0) {
            setTimeout(() => this.runCommands(), 10000/getAnimSpeed());
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
            //alert("createRoot - " + paramArray[0]);
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
            recursiveMove(paramArray[0]);
        } else if (com.getType == "removeNode") {
            removeElem(paramArray[0]);
        } else if (com.getType == "highlightNode") {
            highlightNode(paramArray[0], paramArray[1]);
        } else if (com.getType == "highlightLine") {
            highlightLine(paramArray[0]);
        } else if (com.getType == "setProcess") {
            setCurrProcess(paramArray[0]);
        }

        
    }
}