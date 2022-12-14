const fs = require('fs');

function readFromFile(){
    try {
        let data = fs.readFileSync("./day3/input").toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();

// 1
let sum = 0;
for (let i = 0; i < data.length; i++) {
    let elementLength = data[i].length;
    let firstElement = data[i].slice(0,elementLength/2).split('');
    let lastElement = data[i].slice(elementLength/2).split('');
    
    let intersectionChar = firstElement.filter(value => lastElement.includes(value)).toString();
    let intersectionNumber = intersectionChar.charCodeAt(0);
    intersectionNumber = intersectionNumber > 90 ? intersectionNumber-96 : intersectionNumber-38;

    sum += intersectionNumber;
}
console.log(sum);

// 2
sum = 0;
for (let i = 0; i < data.length-2; i+=3) {
    let firstSack = data[i].split(''), secondSack = data[i+1].split(''), thirdSack = data[i+2].split('');
    
    let intersection1 = firstSack.filter(value => secondSack.includes(value));
    let intersection2 = intersection1.filter(value => thirdSack.includes(value)).toString();
    let intersectionNumber = intersection2.charCodeAt(0);
    intersectionNumber = intersectionNumber > 90 ? intersectionNumber-96 : intersectionNumber-38;

    sum += intersectionNumber;
}
console.log(sum);