const rows = 10, cols = 10;
let grid = [];
let start = [0, 0], end = [9, 9];

document.addEventListener("DOMContentLoaded", createGrid);

function createGrid() {
    const container = document.getElementById("grid");
    container.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (i === start[0] && j === start[1]) cell.classList.add("start");
            if (i === end[0] && j === end[1]) cell.classList.add("end");
            container.appendChild(cell);
            grid[i][j] = cell;
        }
    }
}

function runBFS() {
    let queue = [[...start]], visited = new Set();
    while (queue.length) {
        let path = queue.shift();
        let [x, y] = path[path.length - 1];
        if (x === end[0] && y === end[1]) return highlightPath(path);
        for (let [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
            let [nx, ny] = [x+dx, y+dy];
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited.has(`${nx},${ny}`)) {
                visited.add(`${nx},${ny}`);
                grid[nx][ny].classList.add("visited");
                queue.push([...path, [nx, ny]]);
            }
        }
    }
}

function runDFS() {
    let stack = [[...start]], visited = new Set();
    while (stack.length) {
        let path = stack.pop();
        let [x, y] = path[path.length - 1];
        if (x === end[0] && y === end[1]) return highlightPath(path);
        for (let [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
            let [nx, ny] = [x+dx, y+dy];
            if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && !visited.has(`${nx},${ny}`)) {
                visited.add(`${nx},${ny}`);
                grid[nx][ny].classList.add("visited");
                stack.push([...path, [nx, ny]]);
            }
        }
    }
}

function highlightPath(path) {
    path.forEach(([x, y]) => grid[x][y].classList.add("path"));
}
