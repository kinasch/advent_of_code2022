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
const navigator = (obj, path) => path.reduce((a, b) => a && a[b], obj);
for (let i = 0; i < data.length; i++) {
    if(data[i].includes("$")) {
        if(data[i].includes(" cd")){
            if(data[i].slice(5) === "..") {
                history.pop();
                // macht kein sinn aber hat funktioniert??
                currentFolder = history.length > 0 ? navigator(system,history) : system;
            }
            else if(data[i].slice(5) === "/") currentFolder = system;
            else {
                history.push(data[i].slice(5));
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

let sumObject = {};
rec(system,"/");
function rec(systemObject,folder){
    for(var key in systemObject){
        if (typeof sumObject[folder] !== "number") sumObject[folder] = 0;

        if(typeof systemObject[key] === "object") {
            rec(systemObject[key],key);
            sumObject[folder] += sumObject[key];
        } else {
            sumObject[folder] += systemObject[key];
        }
    }
}

let sum = 0;
for (const key in sumObject) {
    if(sumObject[key] <= 100000) sum += sumObject[key];
}

console.log(sum);