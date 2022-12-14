const fs = require('fs');

function readFromFile(){
    try {
        let iPath = "./day9/input", tPath = "./day9/test/test1.txt";
        let data = fs.readFileSync(iPath).toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null;
    }
}
let data = readFromFile();

function proximity(objA,objB){
    if((objA.x<=objB.x+1&&objA.x>=objB.x-1) && (objA.y<=objB.y+1&&objA.y>=objB.y-1)) return true;
    else return false;
}

// 1
let head = {"x":0,"y":0},tail = {"x":0,"y":0};
let ins = {"U":{"dir":"y","mod":1},"D":{"dir":"y","mod":-1},"R":{"dir":"x","mod":1},"L":{"dir":"x","mod":-1}};
let tailPosList = {};
for (let i = 0; i < data.length; i++) {
    let instructions = {"direction":data[i].substring(0,1),"steps":parseInt(data[i].substring(2))};
    for (let steps = 0; steps < instructions.steps; steps++) {

        // move head
        let currentInstruction = ins[instructions.direction];
        head[currentInstruction.dir] += (currentInstruction.mod);

        // check head and tail
        if(!proximity(tail,head)){
            //move tail
            if(tail.x === head.x){
                // .....
                // .T.H.  same row
                // .....

                tail.y += head.y>tail.y?1:-1;
            }
            else if(tail.y === head.y){
                // ..T..
                // .....  same column
                // ..H..

                tail.x += head.x>tail.x?1:-1;
            }
            else{
                // .T...
                // .....  none
                // ..H..

                tail.x += head.x>tail.x?1:-1;
                tail.y += head.y>tail.y?1:-1;
            }
        }

        // add tails position
        if(tailPosList.hasOwnProperty("x"+tail.x+"y"+tail.y))tailPosList["x"+tail.x+"y"+tail.y] += 1;
        else tailPosList["x"+tail.x+"y"+tail.y] = 1;
    }
}

let sum=0;
for (const key in tailPosList) {
    sum++;
}
console.log(sum);


// 2
let ropeParts=[];
tailPosList = {};
for (let index = 0; index < 10; index++) {
    ropeParts[index]={"x":0,"y":0};
}
for (let i = 0; i < data.length; i++) {
    let instructions = {"direction":data[i].substring(0,1),"steps":parseInt(data[i].substring(2))};
    for (let steps = 0; steps < instructions.steps; steps++) {

        // move head
        let currentInstruction = ins[instructions.direction];
        ropeParts[0][currentInstruction.dir] += (currentInstruction.mod);

        // move parts
        for (let ri = 1; ri < ropeParts.length; ri++) {
            // check current head and tail
            if(!proximity(ropeParts[ri],ropeParts[ri-1])){
                //move tail
                if(ropeParts[ri].x === ropeParts[ri-1].x){
                    ropeParts[ri].y += ropeParts[ri-1].y>ropeParts[ri].y?1:-1;
                }
                else if(ropeParts[ri].y === ropeParts[ri-1].y){
                    ropeParts[ri].x += ropeParts[ri-1].x>ropeParts[ri].x?1:-1;
                }
                else{
                    ropeParts[ri].x += ropeParts[ri-1].x>ropeParts[ri].x?1:-1;
                    ropeParts[ri].y += ropeParts[ri-1].y>ropeParts[ri].y?1:-1;
                }
            }
        }

        // add tails position
        if(tailPosList.hasOwnProperty("x"+ropeParts[9].x+"y"+ropeParts[9].y))tailPosList["x"+ropeParts[9].x+"y"+ropeParts[9].y] += 1;
        else tailPosList["x"+ropeParts[9].x+"y"+ropeParts[9].y] = 1;
    }
}

sum=0;
for (const key in tailPosList) {
    sum++;
}
console.log(sum);