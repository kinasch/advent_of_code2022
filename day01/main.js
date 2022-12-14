const fs = require('fs');

function readFromFile(){
    try {
        let data = fs.readFileSync("./day1/input").toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
function sumUpData(data){
    let arr = [], sum = 0;
    data.forEach(element => {
        if(element === ''){
            arr.push(sum);
            sum = 0;
        }
        else sum+=parseInt(element);
    });
    return arr;
}
function findHighestNumberAndItsIndex(arr){
    let highNum=0, highIndex=0;
    for (let index = 0; index < numberArray.length; index++) {
        if(numberArray[index] > highNum) {
            highNum = numberArray[index];
            highIndex = index;
        }
    }
    return {highestIndex: highIndex, highestNumber: highNum}
}

let data = readFromFile();
let numberArray = sumUpData(data);
//1
let firstSet = findHighestNumberAndItsIndex(numberArray);
console.log("1*: "+firstSet.highestNumber);
//2
let sum=0;
for (let i = 0; i < 3; i++) {
    let secondSet =findHighestNumberAndItsIndex(numberArray);
    sum += secondSet.highestNumber;
    numberArray[secondSet.highestIndex] = 0; // could use splice here, but why should I
}
console.log("2*: "+sum);