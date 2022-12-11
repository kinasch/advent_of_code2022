const fs = require('fs');

function readFromFile(){
    try {
        let iPath = "./day8/input", tPath = "./day8/test/test1.txt";
        let data = fs.readFileSync(iPath).toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();

let grid = Array(data[0].split('').length).fill(null).map(() => Array(data.length).fill(0));

let length = data.length;
let width = data[0].split('').length;

for (let i = 0; i < data.length; i++) {
    let splitData = data[i].split('');
    for (let j = 0; j < splitData.length; j++) {
        grid[i][j] = parseInt(splitData[j]);
    }
}

let sum = (width-2)*2 + length*2;

for (let li = 1; li < length-1; li++) {
    for (let wi = 1; wi < width-1; wi++) {
        let checkNumber = grid[li][wi];
        let visible = 4;
        for (let n = li-1; n >= 0; n--) {
            if(checkNumber <= grid[n][wi]) {visible--; break;}
        }
        for (let w = wi-1; w >= 0; w--) {
            if(checkNumber <= grid[li][w]) {visible--; break;}
        }
        for (let s = li+1; s < length; s++) {
            if(checkNumber <= grid[s][wi]) {visible--; break;}
        }
        for (let e = wi+1; e < width; e++) {
            if(checkNumber <= grid[li][e]) {visible--; break;}
        }
        if(visible > 0) { sum++; }
    }
}

console.log(sum);