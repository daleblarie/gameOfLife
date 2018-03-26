/* global document Grid Coord Cell */
const GRID_SIZE = 15;

const newGridButton = document.getElementById('newGrid');
const startLoopButton = document.getElementById('startGenerator');
const stopLoopbutton = document.getElementById('stopGenerator');

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
sheet.insertRule(`.cell {width: ${1080 / GRID_SIZE}px ; height: ${1080 / GRID_SIZE}px }`, 0);

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

grid.cells['0, 0'].isAlive = true;
grid.cells['1, 0'].isAlive = true;
grid.cells['0, 1'].isAlive = true;
grid.listen();
grid.draw();

//
function assignToButton(but, func, paramArr) {
  function funct() {
    if (paramArr) {
      func(...paramArr);
    } else {
      func();
    }
  }
  but.addEventListener('click', () => { funct(); });
}

let loop;

const startLoop = () => {
  loop = setInterval(() => {
    console.log('started');
    grid.setNextGen();
    grid.draw();
  }, 500);
};
const stopLoop = () => {
  clearInterval(loop);
  console.log('stop');
};
const clearGrid = function clearGrid(obj, loopName) {
  stopLoop(loopName);
  console.log('clear');
  obj.clear();
  obj.draw();
};

assignToButton(startLoopButton, startLoop);
assignToButton(stopLoopbutton, stopLoop, [loop]);
assignToButton(newGridButton, clearGrid, [grid, loop]);
