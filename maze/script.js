const rows = 20;
const cols = 20;
let grid = [];

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = { top:true, right:true, bottom:true, left:true };
  }
}

function initGrid() {
  grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push(new Cell(x, y));
    }
    grid.push(row);
  }
}

function generateMaze() {
  initGrid();
  const stack = [];
  let current = grid[0][0];
  current.visited = true;
  do {
    const next = getNeighbour(current);
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length) {
      current = stack.pop();
    }
  } while (stack.length);
  draw();
}

function getNeighbour(cell) {
  const { x, y } = cell;
  const neighbours = [];
  if (y>0 && !grid[y-1][x].visited)    neighbours.push(grid[y-1][x]);
  if (x<cols-1 && !grid[y][x+1].visited) neighbours.push(grid[y][x+1]);
  if (y<rows-1 && !grid[y+1][x].visited) neighbours.push(grid[y+1][x]);
  if (x>0 && !grid[y][x-1].visited)    neighbours.push(grid[y][x-1]);
  if (!neighbours.length) return null;
  return neighbours[Math.floor(Math.random()*neighbours.length)];
}

function removeWalls(a, b) {
  const dx = a.x - b.x;
  if (dx === 1) { a.walls.left = false;  b.walls.right = false; }
  if (dx === -1){ a.walls.right = false; b.walls.left = false; }
  const dy = a.y - b.y;
  if (dy === 1) { a.walls.top = false;   b.walls.bottom = false; }
  if (dy === -1){ a.walls.bottom = false;b.walls.top = false; }
}

function draw() {
  const container = document.getElementById('maze');
  container.innerHTML = '';
  for (let y=0; y<rows; y++) {
    for (let x=0; x<cols; x++) {
      const cell = grid[y][x];
      const el = document.createElement('div');
      el.classList.add('cell');
      if (cell.walls.top)    el.classList.add('top');
      if (cell.walls.right)  el.classList.add('right');
      if (cell.walls.bottom) el.classList.add('bottom');
      if (cell.walls.left)   el.classList.add('left');
      container.appendChild(el);
    }
  }
}

document.getElementById('btn').addEventListener('click', generateMaze);
window.addEventListener('DOMContentLoaded', generateMaze);
