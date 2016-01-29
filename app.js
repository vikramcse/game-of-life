var canvas = document.getElementById('canvas').getContext('2d');
canvas.strokeStyle = '#e1e1e1';
canvas.fillStyle = 'orange';

var cells = [];

grid();

function grid () {
  for (var i = 0; i < 64; i++) {
    cells[i] = [];
    for (var j = 0; j < 64; j++) {
      cells[i][j] = 0;
    }
  }

  var gosperGliderGun = [
    [1, 5], [1, 6], [2, 5], [2, 6], [11, 5], [11, 6], [11, 7], [12, 4], [12, 8],
    [13, 3], [13, 9], [14, 3], [14, 9], [15, 6], [16, 4], [16, 8], [17, 5], [17, 6],
    [17, 7], [18, 6], [21, 3], [21, 4], [21, 5], [22, 3], [22, 4], [22, 5], [23, 2],
    [23, 6], [25, 1], [25, 2], [25, 6], [25, 7], [35, 3], [35, 4], [36, 3], [36, 4]
  ];

  gosperGliderGun.forEach(function (p) {
    cells[p[0]][p[1]] = 1;
  });

  update();
}

function update () {
  var finalState = [];

  var _checkNeighbours = function (x, y) {
    var count = 0;

    var _isFilled = function (x, y) {
      return cells[x] && cells[x][y];
    };

    // top, right, left, bottom
    if (_isFilled(x, y + 1)) count++;
    if (_isFilled(x + 1, y)) count++;
    if (_isFilled(x - 1, y)) count++;
    if (_isFilled(x, y - 1)) count++;

    // top - right
    if (_isFilled(x + 1, y + 1)) count++;
    // right - bottom
    if (_isFilled(x + 1, y - 1)) count++;
    // bottom - left
    if (_isFilled(x - 1, y - 1)) count++;
    // left - top
    if (_isFilled(x - 1, y + 1)) count++;

    return count;
  };

  cells.forEach(function (row, x) {
    finalState[x] = [];
    row.forEach(function (cell, y) {
      var alive = 0;
      var total = _checkNeighbours(x, y);

      if (cell > 0) {
        if (total === 2 || total === 3) {
          alive = 1;
        } else {
          alive = 0;
        }
      } else {
        if (total === 3) {
          alive = 1;
        } else {
          alive = 0;
        }
      }

      finalState[x][y] = alive;
    });
  });

  cells = finalState;
  draw();
}

function draw () {
  canvas.clearRect(0, 0, 1512, 512);
  cells.forEach(function (row, x) {
    row.forEach(function (cell, y) {
      canvas.beginPath();
      canvas.rect(x * 8, y * 8, 8, 8);
      if (cell) {
        canvas.fill();
      } else {
        canvas.stroke();
      }
    });
  });

  setTimeout(function () {
    update();
  }, 60);
}
