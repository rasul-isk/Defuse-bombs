export const possibilities = (xy) => {
  let [x, y] = xy.split('-').map((el) => ~~el);
  return [`${x - 1}-${y}`, `${x}-${y - 1}`, `${x - 1}-${y - 1}`, `${x - 1}-${y + 1}`, `${x + 1}-${y}`, `${x}-${y + 1}`, `${x + 1}-${y + 1}`, `${x + 1}-${y - 1}`];
};

export const bombCount = (bombs, xy) =>
  possibilities(xy)
    .reduce((prev, cur) => prev + (bombs[cur] ? 1 : 0), 0)
    .toString();

export const addOneSecond = (prev) => {
  let [minutes, seconds] = prev.split(':');
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  return [('0' + minutes).slice(-2), ('0' + seconds).slice(-2)].join(':');
};

export const horizontalLine = (xy, rowSize) => {
  let [x, y] = xy.split('-').map((el) => ~~el);
  let possibilities = [];
  for (x = 0; x <= rowSize; x++) possibilities.push(`${x}-${y}`);
  return possibilities;
};
