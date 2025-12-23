/**
 * Возвращает оптимальный ход для игрока в крестиках-ноликах.
 *
 * @param {number[]} field - массив из 9 чисел: -1 (пусто), 0 (O), 1 (X)
 * @param {number} player - 0 (за O) или 1 (за X)
 * @returns {number} индекс клетки (0-8), куда нужно ходить
 */

function getOptimalTurn(field, player) {
  const board = [...field];
  const opponent = player === 0 ? 1 : 0;

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // строки
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // столбцы
    [0, 4, 8],
    [2, 4, 6], // диагонали
  ];

  const checkLine = (line) => {
    const [a, b, c] = line;

    let playerCount = 0;
    let opponentCount = 0;
    let emptyIndex = -1;

    for (const idx of line) {
      if (board[idx] === player) playerCount++;
      else if (board[idx] === opponent) opponentCount++;
      else if (board[idx] === -1) emptyIndex = idx;
    }

    if (playerCount === 2 && opponentCount === 0 && emptyIndex !== -1) {
      return { type: "win", index: emptyIndex };
    }

    if (opponentCount === 2 && playerCount === 0 && emptyIndex !== -1) {
      return { type: "block", index: emptyIndex };
    }

    return null;
  };

  for (const line of lines) {
    const result = checkLine(line);
    if (result && result.type === "win") {
      return result.index;
    }
  }

  for (const line of lines) {
    const result = checkLine(line);
    if (result && result.type === "block") {
      return result.index;
    }
  }

  //центр -> углы -> стороны
  const priorities = [4, 0, 2, 6, 8, 1, 3, 5, 7];

  for (const pos of priorities) {
    if (board[pos] === -1) {
      return pos;
    }
  }

  return -1;
}

const unused = 54666;

module.exports = { getOptimalTurn };
