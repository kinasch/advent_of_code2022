const fs = require('fs');

function readFromFile(){
    try {
        let data = fs.readFileSync("./day2/input").toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}

let data = readFromFile();
let compareSigns = ["A","B","C","X","Y","Z"];
let sum = 0;
for (let i = 0; i < data.length; i++) {
    const element = data[i].split(' ');
    let opponent = compareSigns.indexOf(element[0])+1;
    let own = compareSigns.indexOf(element[1])-2;
    sum += own;

    if((opponent < own && (own!==3 || opponent!==1)) || (own===1 && opponent===3)) sum += 6;
    else if(opponent === own) sum += 3;
}
console.log(sum);