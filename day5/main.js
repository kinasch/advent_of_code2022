const fs = require('fs');

function readFromFile(){
    try {
        let iPath = "./day5/input", tPath = "./day5/test/test1.txt";
        let data = fs.readFileSync(iPath).toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();
let data1 = data.slice(), data2 = data.slice();
// Find out amount of stacks
let rowBeforeNumbers = data.findIndex(e => e === '');
let amountOfStacks = parseInt(
    data[rowBeforeNumbers-1]
    .replace(/[^0-9]/g,'')
    .split('')
    .pop()
);
// Set up stacks
let stacks1 = [], stacks2 = [];
for (let stack = 0; stack < amountOfStacks; stack++) {
    stacks1.push([]);
    stacks2.push([]);
}

// 1
// Create the stacks
for (let dataIndex = rowBeforeNumbers-2; dataIndex >= 0; dataIndex--) {
    let letterRow = data1[dataIndex].replace(/[^A-Z]/g,'').split('');
    letterRow.forEach((element) => {
        let correspondingStack = (data1[dataIndex].indexOf(element)-1)/4;
        data1[dataIndex] = data1[dataIndex].replace(element,' ');
        stacks1[correspondingStack].push(element)
    });
}

// Process procedures
for (let i = rowBeforeNumbers+1; i < data1.length; i++) {
    let instructionNumbers = data[i].replace(/[a-z]/g,'').split('  ');
    for (let instructionIndex = 0; instructionIndex < instructionNumbers[0]; instructionIndex++) {
        stacks1[instructionNumbers[2]-1].push(stacks1[instructionNumbers[1]-1].pop());
    }
}


let firstLetters = "";
stacks1.forEach(element => {
    firstLetters += element.pop();
});
console.log(firstLetters);


// 2
// Create the stacks
for (let dataIndex = rowBeforeNumbers-2; dataIndex >= 0; dataIndex--) {
    let letterRow = data2[dataIndex].replace(/[^A-Z]/g,'').split('');
    letterRow.forEach((element) => {
        let correspondingStack = (data2[dataIndex].indexOf(element)-1)/4;
        data2[dataIndex] = data2[dataIndex].replace(element,' ');
        stacks2[correspondingStack].push(element)
    });
}

// Process procedures
for (let i = rowBeforeNumbers+1; i < data2.length; i++) {
    let instructionNumbers = data[i].replace(/[a-z]/g,'').split('  ');

    let tempStack = [...stacks2[instructionNumbers[1]-1]];
    stacks2[instructionNumbers[2]-1] = [
        ...stacks2[instructionNumbers[2]-1],
        ...tempStack.slice(tempStack.length-instructionNumbers[0],tempStack.length)
    ]

    for (let instructionIndex = 0; instructionIndex < instructionNumbers[0]; instructionIndex++) {
        stacks2[instructionNumbers[1]-1].pop();
    }
}


firstLetters = "";
stacks2.forEach(element => {
    firstLetters += element.pop();
});
console.log(firstLetters);