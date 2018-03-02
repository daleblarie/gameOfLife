/* global document */
const GRID_SIZE = 10;

const sheetFunc = function sheetFunc() {
  // Create the <style> tag
  const style = document.createElement('style');

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")

  // WebKit hack :(
  style.appendChild(document.createTextNode(''));

  // Add the <style> element to the page
  document.head.appendChild(style);

  return style.sheet;
};
const sheet = sheetFunc();
sheet.insertRule(`.cell {width: ${960 / GRID_SIZE}px ; height: ${960 / GRID_SIZE}px }`, 0);


function Cell(pos, div, isAlive) {
  this.pos = pos;
  this.div = div;
  this.isAlive = isAlive;
}

Cell.prototype.draw = function draw() {
  this.classList.add('gridon');
};

Cell.prototype.unDraw = function unDraw() {
  this.classList.remove('gridon');
};

function Coord(row, col) {
  this.row = row;
  this.col = col;
}

Coord.prototype.toString = function toString() {
  return `${this.row}, ${this.col}`;
};

function Grid() {
  this.cells = {};
}

Grid.prototype.get = function get(coord) {
  return this.cells[coord.toString()];
};

Grid.prototype.add = function add(cell) {
  this.cells[cell.pos.toString()] = cell;
};

Grid.prototype.draw = function draw(livecells) {
  for (let i = 0; i < livecells.length; i += 1) {
    livecells[i].draw();
  }
};

// this function will take in a cell and return a array of cells that are neighbors to it
Grid.prototype.getNeighbors = function getNeighbors(cell) {
  const mainCellPos = cell.pos;
  const neighbors = [];
  for (let i = -1; i < 2; i += 1) {
    for (let j = -1; j < 2; j += 1) {
      const currentCoord = new Coord(mainCellPos[0] - i, mainCellPos[1] - j);
      const current = this.get(currentCoord);
      if (!(current === cell)) {
        if (current) {
          neighbors.push(current);
        }
      }
    }
  }

  return neighbors;
};

const grid = new Grid();

for (let i = 0; i < GRID_SIZE; i += 1) {
  const currentRow = document.createElement('div');
  currentRow.classList.add('row');
  document.getElementById('container').appendChild(currentRow);
  for (let j = 0; j < GRID_SIZE; j += 1) {
    const currentCell = document.createElement('div');
    currentCell.classList.add('cell');
    currentRow.appendChild(currentCell);
    const cell = new Cell(new Coord(i, j), currentCell, false);
    grid.add(cell);
  }
}
