const fs = require('fs');

function readFromFile(){
    try {
        let iPath = "./day10/input", tPath = "./day10/test/test1.txt";
        let data = fs.readFileSync(iPath).toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();

let cycles = [];

let currentValue = 1;
for (let i = 0; i < data.length; i++) {
    if(data[i]==="noop"){
        cycles.push(currentValue);
    }
    if(data[i].includes("addx")){
        cycles.push(currentValue);
        cycles.push(currentValue);
        currentValue += parseInt(data[i].slice(5));
    }
}
let sum = cycles[19]*20+cycles[59]*60+cycles[99]*100+cycles[139]*140+cycles[179]*180+cycles[219]*220;
console.log(sum);

let monitor="";
for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 40; y++) {
        let current = cycles.shift();
        if(y<=current+1&&y>=current-1) monitor+="#";
        else monitor+="."
    }
    monitor+="\n";
}
console.log(monitor);