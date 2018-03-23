function Cell(pos, div, isAlive) {
  this.pos = pos;
  this.div = div;
  this.isAlive = isAlive;
}

Cell.prototype.draw = function draw() {
  if (this.isAlive) {
    this.div.classList.add('gridon');
  } else {
    this.div.classList.remove('gridon');
  }
};

Cell.prototype.numLiveNeighbors = function numLiveNeighbors(grid) {
  const neighbors = grid.getNeighbors(this);
  let surroundingAlive = 0;
  for (let i = 0; i < neighbors.length; i += 1) {
    if (neighbors[i].isAlive) {
      surroundingAlive += 1;
    }
  }
  return surroundingAlive;
};

Cell.prototype.calculateFutureIsAlive = function calculateFutureIsAlive(grid) {
  if ((this.numLiveNeighbors(grid) < 4) && (this.numLiveNeighbors(grid)) > 1) {
    return true;
  }
  return false;
};
