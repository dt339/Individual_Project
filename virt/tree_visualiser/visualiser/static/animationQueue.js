//this class holds information for each animation function that must be executed.
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

//Holds the queue of animation function commands
//Can then run them each sequentially with a delay to perform the animation produced by the logic of the data structure.
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

    //Inserts a new command into the queue.
    addCommand(type, params) {
        let newCom = new Command(type, params);
        this.setBack = this.getBack + 1;
        this.getQueue.push(newCom);
    }

    //Runs each function in the queue sequentially with a delay.
    runCommands() {
        //Gets and removes the command at the front of the queue.
        var currentCommand = this.getQueue.shift(); 
        
        // alert("cur command - " + currentCommand.getType)
        
        //Calls for the command to run the corresponding function in animationHandler
        this.exeCommand(currentCommand);
        this.setBack = this.getBack - 1;        

        //Runs the next command in the queue if one exists.
        //Waits a certain amount of time that is dependant on the speed of animation specified by the user.
        if (this.getBack != 0) {
            //If the command is to highlight a line of pseudocode then
            //A delay is only added if the pseudocode is visible.
            //This ensures animation is fast when pseudocode is not showing.
            if (currentCommand.getType == "highlightLine") {
                if (getIsShowing()) {
                    setTimeout(() => this.runCommands(), 15000/getAnimSpeed());
                } else {
                    this.runCommands();
                }
            } else {
                //Runs the next command as usual with a delay.
                setTimeout(() => this.runCommands(), 15000/getAnimSpeed());
            }
            
            
        }     

    }

    //Runs the corresponding function of the given command
    exeCommand(com) {
        var paramArray = com.getParams;
        //Finds the needed function
        //Runs the function with the given parameters
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
            redrawTree(paramArray[3], paramArray[1].getId);
            preRotationAllignment(paramArray[0], paramArray[1], paramArray[2]);
        } else if (com.getType=="allignFib") {
            clearCanvas();
            allignFib(paramArray[0]);
        } else if (com.getType=="redrawTree") {
            clearCanvas();
            redrawTree(paramArray[0], paramArray[1]);
        } else if (com.getType=="recMove") {
            recursiveMove(paramArray[0], paramArray[1]);
        } else if (com.getType == "initMove") {
            initMove(paramArray[0], paramArray[1], paramArray[2], paramArray[3], paramArray[4]);
        } else if (com.getType == "moveToRoot") {
            moveToRoot(paramArray[0]);
        }
        
        
    }
}