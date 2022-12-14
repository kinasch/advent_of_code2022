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

// 1
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

// 2
sum = 0;
for (let i = 0; i < data.length; i++) {
    const element = data[i].split(' ');
    let opponent = compareSigns.indexOf(element[0])+1;
    let ownMod = compareSigns.indexOf(element[1])-4;
    let own = opponent + ownMod;
    own = own > 3 ? 1 : own; own = own < 1 ? 3 : own;
    sum += own;

    if(ownMod === 0) sum += 3;
    else if(ownMod === 1) sum += 6;
}
console.log(sum);