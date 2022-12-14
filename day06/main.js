const fs = require('fs');

function readFromFile(){
    try {
        let iPath = "./day6/input", tPath = "./day6/test/test1.txt";
        let data = fs.readFileSync(iPath).toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();
if(data[0].length < 4) throw new Error("Input string too short.");

let stars = [4,14]; // 0 for 1st star and 1 for 2nd star.

let lettersFromData = data[0].split('');
let letters = [...lettersFromData.splice(0,stars[1]-1)];
for (let i = 0; i < lettersFromData.length; i++) {
    letters.push(lettersFromData[i]);
    // check if any letter exists more than once
    if(letters.filter((item,index) => letters.indexOf(item) != index).length === 0) {
        console.log(i+stars[1]);
        return;
    }
    letters.shift();
}