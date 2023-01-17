import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import BombIcon from '../pics/bomb.png';
import { colors } from '../theme';

const hiddenCell = { display: 'flex', background: colors.black[300], border: `1px solid ${colors.teal[300]}`, justifyContent: 'center', alignItems: 'center' };
const openedCell = { display: 'flex', background: colors.black[100], border: `1px solid ${colors.teal[300]}`, justifyContent: 'center', alignItems: 'center' };
const explodedCell = { display: 'flex', background: colors.red[500], border: `1px solid ${colors.teal[300]}`, justifyContent: 'center', alignItems: 'center' };

const Cell = ({ state, squareSize, xy, setHistory, value, setGameOver, gameOver }) => {
  const size = { height: `${squareSize}px`, width: `${squareSize}px` };
  let stateStyle = { 'game over': { ...explodedCell }, hidden: { ...hiddenCell }, 'not hidden': { ...openedCell } }[state]; //background: colors.red[500];
  return (
    <Box onClick={gameOver ? () => {} : () => Action(setHistory, xy, value, setGameOver)} state={state} xy={xy} sx={{ ...stateStyle, ...size }}>
      {state === 'game over' && (value === 'X' ? <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" /> : value)}
      {/* {state === 'not hidden' && (value === 'X' ? <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" /> : value !== '0' && value)} */}
      {state === 'not hidden' && (value === 'X' ? <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" /> : value !== '0' && value)}
    </Box>
  );
};

const Action = (setHistory, xy, value, setGameOver) => {
  let newState = value === 'X' ? 'game over' : 'not hidden';
  setHistory((prev) => ({ ...prev, [xy]: newState }));
  if (newState === 'game over') setGameOver(true);
};

const Grid = ({ map, history, setHistory, difficulty, width, setGameOver, gameOver }) => {
  let squareSize = width / { Newbie: 10, Skilled: 15, Crazy: 20 }[difficulty];
  let size = { Newbie: 10, Skilled: 15, Crazy: 20 }[difficulty];

  let table = useMemo(() => renderOfMatrix(map, history, setHistory, size, squareSize, setGameOver, gameOver), [map, history, setHistory, size, squareSize, setGameOver, gameOver]);
  return table;
};

const renderOfMatrix = (map, history, setHistory, size, squareSize, setGameOver, gameOver) => {
  let table = [];
  // console.log(Object.entries(map));
  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      table.push(
        <Cell
          key={`${x}-${y}`}
          xy={`${x}-${y}`}
          state={history[`${x}-${y}`] || 'hidden'}
          squareSize={squareSize}
          setHistory={setHistory}
          value={map[`${x}-${y}`]}
          setGameOver={setGameOver}
          gameOver={gameOver}
        />
      );
    }
  }
  return table;
};

export default Grid;
