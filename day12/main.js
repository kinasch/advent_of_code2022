/* 
####################
DISCLAIMER: This solution takes an algorithm from another source (I basically gave up making a search alogrithm by myself).
            As marked further below, the pathfinding algorithm is taken from this source:
            - Author: Sushant Ranjan (github.com/RanjanSushant)
            - Link: https://gist.github.com/RanjanSushant/4dd689b7c95cb7ccf56c41dcfc8db22e 
####################
*/
const fs = require('fs');

function readFromFile() {
    try {
        let iPath = "./day12/input", tPath = "./day12/test/test1.txt";
        let data = fs.readFileSync(iPath).toString();
        if (data === null) return;
        return data.split(/\r?\n/);
    } catch (err) {
        console.log(err);
        return null
    }
}
let data = readFromFile();

// y,x
let width = 0, height = 0;
let endCoords,startCoords;
let grid = [];
for (let y = 0; y < data.length; y++) {
    grid.push([]);
    if (height === 0) height = data.length;
    for (let x = 0; x < data[y].split('').length; x++) {

        grid[y].push(data[y].split('')[x]);

        if(grid[y][x] === 'S') {
            startCoords = {"y":y,"x":x};
            grid[y][x] = 'z';
        }
        if(grid[y][x] === 'E') {
            endCoords = {"y":y,"x":x};
            grid[y][x] = 'z';
        }
        if (width === 0) width = data[y].split('').length;
    }
}

/* 
####################
DISCLAIMER: Everything from this point on (except some minor modifications) is taken from:
            - Author: Sushant Ranjan (github.com/RanjanSushant)
            - Link: https://gist.github.com/RanjanSushant/4dd689b7c95cb7ccf56c41dcfc8db22e
####################
*/

let aGrid = Array.from(grid); //array of all the grid points

let cols = height, rows = width;

let openSet = []; //array containing unevaluated grid points
let closedSet = []; //array containing completely evaluated grid points

let start; //starting grid point
let end; // ending grid point (goal)
let path = [];

//heuristic we will be using - Manhattan distance
//for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
function heuristic(position1, position0) {
    let d1 = Math.abs(position1.x - position0.x);
    let d2 = Math.abs(position1.y - position0.y);

    return d1 + d2;
}

//constructor function to create all the grid points as objects containind the data for the points
function GridPoint(x, y, letter) {
    this.x = x; //x location of the grid point
    this.y = y; //y location of the grid point
    this.letter = letter; // letter at the grid point
    this.f = 0; //total cost function
    this.g = 0; //cost function from start to the current grid point
    this.h = 0; //heuristic estimated cost function from current grid point to the goal
    this.neighbors = []; // neighbors of the current grid point
    this.parent = undefined; // immediate source of the current grid point

    // update neighbors array for a given grid point
    this.updateNeighbors = function (grid) {

        let i = this.x;
        let j = this.y;
        let charCode = grid[i][j].letter.charCodeAt(0)+1;
        if (i < cols - 1) {
            if ((grid[i + 1][j].letter.charCodeAt(0)) <= charCode) this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            if ((grid[i - 1][j].letter.charCodeAt(0)) <= charCode) this.neighbors.push(grid[i - 1][j]);
        }
        if (j < rows - 1) {
            if ((grid[i][j + 1].letter.charCodeAt(0)) <= charCode) this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            if ((grid[i][j - 1].letter.charCodeAt(0)) <= charCode) this.neighbors.push(grid[i][j - 1]);
        }
    };
}

//initializing the grid
function init() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            aGrid[i][j] = new GridPoint(i, j, grid[i][j]);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            aGrid[i][j].updateNeighbors(aGrid);
        }
    }

    start = aGrid[startCoords.y][startCoords.x];
    end = aGrid[endCoords.y][endCoords.x];

    openSet.push(start);
}

//A star search implementation
function search() {
    init();
    while (openSet.length > 0) {
        //assumption lowest index is the first one to begin with
        let lowestIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) {
                lowestIndex = i;
            }
        }
        let current = openSet[lowestIndex];

        if (current === end) {
            let temp = current;
            path.push(temp);
            while (temp.parent) {
                path.push(temp.parent);
                temp = temp.parent;
            }
            // return the traced path
            return path.reverse();
        }

        //remove current from openSet
        openSet.splice(lowestIndex, 1);
        //add current to closedSet
        closedSet.push(current);

        let neighbors = current.neighbors;

        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (!closedSet.includes(neighbor)) {
                let possibleG = current.g + 1;

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                } else if (possibleG >= neighbor.g) {
                    continue;
                }

                neighbor.g = possibleG;
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
            }
        }
    }

    //no solution by default
    return [];
}

console.log(search().length-1);