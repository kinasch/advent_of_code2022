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

