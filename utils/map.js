const Polygon = require("polygon");

var direction = {
  x: 1,
  y: 0,
};
var currentPostion = {
  x: 0,
  y: 0,
  maxX: 0,
  maxY: 0,
  minX: 0,
  minY: 0,
  len: 0,
};
const reset = () => {
  currentPostion = {
    x: 0,
    y: 0,
    maxX: 0,
    maxY: 0,
    minX: 0,
    minY: 0,
    len: 0,
  };
  direction = {
    x: 1,
    y: 0,
  };
};
const turn = (angle) => {
  console.log(direction);
  if (angle === "R") {
    if (direction.x === 1 && direction.y === 0) {
      direction.x = 0;
      direction.y = -1;
    } else if (direction.x === 0 && direction.y === -1) {
      direction.x = -1;
      direction.y = 0;
    } else if (direction.x === -1 && direction.y === 0) {
      direction.x = 0;
      direction.y = 1;
    } else {
      direction.x = 1;
      direction.y = 0;
    }
  }
  if (angle === "L") {
    if (direction.x === 1 && direction.y === 0) {
      direction.x = 0;
      direction.y = 1;
    } else if (direction.x === 0 && direction.y === 1) {
      direction.x = -1;
      direction.y = 0;
    } else if (direction.x === -1 && direction.y === 0) {
      direction.x = 0;
      direction.y = -1;
    } else {
      direction.x = 1;
      direction.y = 0;
    }
  }
};

const takeStep = () => {
  console.log(currentPostion);
  currentPostion.x += direction.x * 1;
  currentPostion.y += direction.y * 1;
  if (currentPostion.x > currentPostion.maxX)
    currentPostion.maxX = currentPostion.x;
  if (currentPostion.y > currentPostion.maxY)
    currentPostion.maxY = currentPostion.y;
  if (currentPostion.x < currentPostion.minX)
    currentPostion.minX = currentPostion.x;
  if (currentPostion.y < currentPostion.minY)
    currentPostion.minY = currentPostion.y;
  currentPostion.len += 1;
  return {x: currentPostion.x, y: currentPostion.y};
};
const getSize = () => {
  console.log(currentPostion);
  return (
    (currentPostion.maxX - currentPostion.minX) *
    (currentPostion.maxY - currentPostion.minY)
  );
};
const getPositionVector = (path) => {
  reset();
  var steps = [...path];
  var positions = [];
  steps.forEach((e) => {
    if (e === "G") {
      positions.push(takeStep());
    } else {
      turn(e);
    }
  });
  return positions;
};

const getArea = (vector) => {
  var poly = new Polygon(vector);
  return poly.area();
};

module.exports = {
  getPositionVector,
  getSize,
  getArea,
};
