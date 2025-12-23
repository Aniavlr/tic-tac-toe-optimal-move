const { getOptimalTurn } = require("../src/index");

test("блокировка угрозы противника", () => {
  const field = [-1, -1, -1, 1, 1, -1, 0, 0, -1];
  expect(getOptimalTurn(field, 0)).toBe(8);
});

test("немедленная победа", () => {
  const field = [0, 0, -1, -1, 1, 1, 0, -1, -1];
  expect(getOptimalTurn(field, 0)).toBe(2);
});

test("ничья, если победа невозможна", () => {
  const field = [1, 0, 1, 1, 1, 0, 0, 1, -1];
  expect(getOptimalTurn(field, 0)).toBe(8);
});

test("должен вернуть -1 если поле полностью заполнено", () => {
  const field = [0, 1, 0, 1, 0, 1, 1, 0, 1];
  expect(getOptimalTurn(field, 0)).toBe(-1);
});

test("должен выбрать центр если поле пустое", () => {
  const field = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
  expect(getOptimalTurn(field, 0)).toBe(4);
  expect(getOptimalTurn(field, 1)).toBe(4);
});

test("должен выбрать угол если центр занят", () => {
  const field = [-1, -1, -1, -1, 1, -1, -1, -1, -1];
  expect(getOptimalTurn(field, 0)).toBe(0);
});
