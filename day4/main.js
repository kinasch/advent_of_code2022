const fs = require('fs');

function readFromFile(){
    try {
        let iPath = "./day4/input", tPath = "./day4/test/test1.txt";
        let data = fs.readFileSync(tPath).toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();

// 1
let sum=0;
for (let i = 0; i < data.length; i++) {
    // Split data into the single elves assignments
    let elves = data[i].split(',');
    let elf1Num1 = parseInt(elves[0].split('-')[0]), elf1Num2 = parseInt(elves[0].split('-')[1]);
    let elf2Num1 = parseInt(elves[1].split('-')[0]), elf2Num2 = parseInt(elves[1].split('-')[1]);

    if(elf1Num1 <= elf2Num1 && elf1Num2 >= elf2Num2 || elf1Num1 >= elf2Num1 && elf1Num2 <= elf2Num2) sum++;
}
console.log(sum);

// 2
sum=0;
for (let i = 0; i < data.length; i++) {
    // Split data into the single elves assignments
    let elves = data[i].split(',');
    let elf1Num1 = parseInt(elves[0].split('-')[0]), elf1Num2 = parseInt(elves[0].split('-')[1]);
    let elf2Num1 = parseInt(elves[1].split('-')[0]), elf2Num2 = parseInt(elves[1].split('-')[1]);

    elf1Num1<=elf2Num2&&elf1Num2>=elf2Num1||elf1Num1>=elf2Num2&&elf1Num2<=elf2Num1
    if(elf1Num1<=elf2Num2&&elf1Num2>=elf2Num1||elf1Num1>=elf2Num2&&elf1Num2<=elf2Num1) sum++;
}
console.log(sum);