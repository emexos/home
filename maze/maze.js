const rows = 10;
const cols = 10;
let maze = [];

function createMazeArray() {
    maze = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
            row.push({
                x,
                y,
                visited: false,
                walls: { top: true, right: true, bottom: true, left: true }
            });
        }
        maze.push(row);
    }
}

function generateMaze() {
    createMazeArray();
    let stack = [];
    let current = maze[0][0];
    current.visited = true;

    do {
        let next = getUnvisitedNeighbour(current);
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

function getUnvisitedNeighbour(cell) {
    const neighbours = [];
    const { x, y } = cell;

    if (y > 0 && !maze[y - 1][x].visited) neighbours.push(maze[y - 1][x]);
    if (x < cols - 1 && !maze[y][x + 1].visited) neighbours.push(maze[y][x + 1]);
    if (y < rows - 1 && !maze[y + 1][x].visited) neighbours.push(maze[y + 1][x]);
    if (x > 0 && !maze[y][x - 1].visited) neighbours.push(maze[y][x - 1]);

    if (neighbours.length > 0) {
        return neighbours[Math.floor(Math.random() * neighbours.length)];
    }
    return undefined;
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
    const mazeContainer = document.getElementById('maze');
    mazeContainer.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
    mazeContainer.innerHTML = '';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const walls = maze[y][x].walls;
            if (walls.top) cell.classList.add('wall-top');
            if (walls.right) cell.classList.add('wall-right');
            if (walls.bottom) cell.classList.add('wall-bottom');
            if (walls.left) cell.classList.add('wall-left');
            mazeContainer.appendChild(cell);
        }
    }
}

generateMaze();
