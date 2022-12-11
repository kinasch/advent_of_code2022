const fs = require('fs');

function readFromFile(){
    try {
        let iPath = "./day7/input", tPath = "./day7/test/test1.txt";
        let data = fs.readFileSync(tPath).toString();
        if(data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();

// if the lines does not start with a $, then check if it's already in the folder it's in currently
// lines with ls can be ignored, lines with change current folder
let system = {}; // basically '/'
let currentFolder = system;
let history = [];
for (let i = 0; i < data.length; i++) {
    if(data[i].includes("$")) {
        if(data[i].includes(" cd")){
            if(data[i].slice(5) === "..") {
                history.shift();
                currentFolder = history.length > 0 ? currentFolder[history[0]] : system;
            }
            else if(data[i].slice(5) === "/") currentFolder = system;
            else {
                history.unshift(data[i].slice(5));
                currentFolder = currentFolder[data[i].slice(5)];
            }
        }
    }
    else {
        if(data[i].includes("dir")){
            if(!currentFolder.hasOwnProperty(data[i].slice(4))) currentFolder[data[i].slice(4)] = {};
        }
        else{ // files
            let file = data[i].split(' ');
            currentFolder[file[1]] = parseInt(file[0]);
        }
    }
}