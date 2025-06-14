const rows = 20;
const cols = 20;
let grid = [];

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = { top: true, right: true, bottom: true, left: true };
}

function createGrid() {
    grid = [];
    for (let y = 0; y < rows; y++) {
        let row = [];
        for (let x = 0; x < cols; x++) {
            row.push(new Cell(x, y));
        }
        grid.push(row);
    }
}

function generateMaze() {
    createGrid();
    let stack = [];
    let current = grid[0][0];
    current.visited = true;

    do {
        let next = checkNeighbours(current);
        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        }
    } while (stack.length > 0);

    drawMaze();
}

function checkNeighbours(cell) {
    const { x, y } = cell;
    const neighbours = [];

    if (y > 0 && !grid[y - 1][x].visited) neighbours.push(grid[y - 1][x]);
    if (x < cols - 1 && !grid[y][x + 1].visited) neighbours.push(grid[y][x + 1]);
    if (y < rows - 1 && !grid[y + 1][x].visited) neighbours.push(grid[y + 1][x]);
    if (x > 0 && !grid[y][x - 1].visited) neighbours.push(grid[y][x - 1]);

    if (neighbours.length > 0) {
        const randIndex = Math.floor(Math.random() * neighbours.length);
        return neighbours[randIndex];
    } else {
        return undefined;
    }
}

function removeWalls(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    if (dx === 1) {
        a.walls.left = false;
        b.walls.right = false;
    } else if (dx === -1) {
        a.walls.right = false;
        b.walls.left = false;
    }

    if (dy === 1) {
        a.walls.top = false;
        b.walls.bottom = false;
    } else if (dy === -1) {
        a.walls.bottom = false;
        b.walls.top = false;
    }
}

function drawMaze() {
    const maze = document.getElementById('maze');
    maze.style.gridTemplateColumns = `repeat(${cols}, 25px)`;
    maze.innerHTML = '';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const walls = grid[y][x].walls;
            if (walls.top) cell.classList.add('wall-top');
            if (walls.right) cell.classList.add('wall-right');
            if (walls.bottom) cell.classList.add('wall-bottom');
            if (walls.left) cell.classList.add('wall-left');
            maze.appendChild(cell);
        }
    }
}

generateMaze();

