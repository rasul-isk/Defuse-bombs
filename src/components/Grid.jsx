import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import BombIcon from '../pics/bomb.png';
import { colors } from '../theme';

const hiddenCell = { display: 'flex', background: colors.black[300], border: `1px solid ${colors.teal[500]}`, justifyContent: 'center', alignItems: 'center' };
const openedCell = { display: 'flex', background: colors.black[100], border: `1px solid ${colors.teal[300]}`, justifyContent: 'center', alignItems: 'center', color: colors.black[500] };
const explodedCell = { display: 'flex', background: colors.red[500], border: `1px solid ${colors.black[500]}`, justifyContent: 'center', alignItems: 'center' };

const Cell = ({ state, value, squareSize, xy, gameInfo, dispatchGame }) => {
  const size = { height: `${squareSize}px`, width: `${squareSize}px` };
  let stateStyle = { 'game over': { ...explodedCell }, hidden: { ...hiddenCell }, 'not hidden': { ...openedCell } }[state]; //background: colors.red[500];
  return (
    <Box onClick={gameInfo.gameOver ? () => {} : () => Action(dispatchGame, xy, value, gameInfo.firstClick)} state={state} xy={xy} sx={{ ...stateStyle, ...size }}>
      {state === 'game over' && (value === 'X' ? <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" /> : value)}
      {/* {state === 'not hidden' && (value === 'X' ? <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" /> : value !== '0' && value)} */}
      {state === 'hidden' && (value === 'X' ? <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" /> : value !== '0' && value)}
    </Box>
  );
};

const Action = (dispatchGame, xy, value, firstClick) => {
  let newState = value === 'X' ? 'game over' : 'not hidden';
  dispatchGame({ switch: 'addToHistory', value: { [xy]: newState } });

  if (newState === 'game over' && firstClick === '') {
    dispatchGame({ switch: 'gameOver', value: true });
  }
};

const Grid = ({ gameInfo, dispatchGame, width }) => {
  let squareSize = width / { Newbie: 10, Skilled: 15, Crazy: 20 }[gameInfo.difficulty];
  let size = { Newbie: 10, Skilled: 15, Crazy: 20 }[gameInfo.difficulty];
  console.log('reaches here grid 34 line');
  let table = useMemo(() => renderOfMatrix(gameInfo, dispatchGame, size, squareSize), [gameInfo.map, gameInfo.firstClick, gameInfo.history, size, squareSize, gameInfo.gameOver]);
  return table;
};

const renderOfMatrix = (gameInfo, dispatchGame, size, squareSize) => {
  let table = [];

  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      table.push(
        <Cell
          key={`${x}-${y}`}
          xy={`${x}-${y}`}
          state={gameInfo.history[`${x}-${y}`] || 'hidden'}
          squareSize={squareSize}
          value={gameInfo.map[`${x}-${y}`]}
          gameInfo={gameInfo}
          dispatchGame={dispatchGame}
        />
      );
    }
  }
  console.log(table);

  return table;
};

export default Grid;
