const fs = require('fs');

function readFromFile(){
    try {
        let iPath = "./day11/input", tPath = "./day11/test/test1.txt";
        let data = fs.readFileSync(iPath).toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();

let monkeys = [];

let amountOfMonkeys = (data.length+1)/7;
for (let i = 0; i < amountOfMonkeys; i++) {
    monkeys.push({});
    monkeys[i].itemList = data[i*7+1].substring(18).split(", ").map(e=>e=parseInt(e));
    let operationString = data[i*7+2].substring(19);
    monkeys[i].operation = function(old){return eval(operationString.replace("old",old))};
    monkeys[i].test = {
        "num":parseInt(data[i*7+3].substring(21)),
        "true":parseInt(data[i*7+4].substring(29)),
        "false":parseInt(data[i*7+5].substring(30))
    };
    monkeys[i].inspections = 0;
}

let rounds = 10000; // 20 for 1st and 10000 for 2nd star
// Calculate overhang to keep numbers small
// Credits for this step belong to https://github.com/adamczarnecki
// (Atleast I found it there)
let overhang = monkeys.map(monkey => monkey.test.num).reduce((a, x) => a*x);
for (let round = 0; round < rounds; round++) {
    for (let m = 0; m < monkeys.length; m++) {
        let itemListLength = monkeys[m].itemList.length
        for (let turn = 0; turn < itemListLength; turn++) {
            let curItem = monkeys[m].itemList.shift();
            curItem = monkeys[m].operation(curItem);
            //curItem = Math.floor(curItem/3); // Remove this for 2nd star
            let nextMonkey = curItem % monkeys[m].test.num === 0 ? monkeys[m].test.true : monkeys[m].test.false;
            // overhang to keep numbers small
            // Credits for this step belong to https://github.com/adamczarnecki
            // (Atleast I found it there)
            monkeys[nextMonkey].itemList.push(curItem%overhang);
            monkeys[m].inspections++;
        }
    }
}

let highest = [0,0];
for (let j=0;j<monkeys.length;j++) {
    if(monkeys[j].inspections>highest[0]){
        highest[1] = highest[0];
        highest[0] = monkeys[j].inspections;
    } else if(monkeys[j].inspections>highest[1]) highest[1] = monkeys[j].inspections;
    console.log(j+" "+monkeys[j].inspections);
}
console.log("1st star solution: "+(highest[0]*highest[1]));