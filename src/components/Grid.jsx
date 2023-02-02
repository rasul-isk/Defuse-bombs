import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import BombIcon from '../pics/bomb.png';
import { colors } from '../theme';

const hiddenCell = { display: 'flex', background: colors.black[300], border: `1px solid ${colors.teal[500]}`, justifyContent: 'center', alignItems: 'center' };
const openedCell = { display: 'flex', background: colors.black[100], border: `1px solid ${colors.teal[300]}`, justifyContent: 'center', alignItems: 'center', color: colors.black[500] };
const explodedCell = { display: 'flex', background: colors.red[500], border: `1px solid ${colors.black[500]}`, justifyContent: 'center', alignItems: 'center' };
const Bomb = <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" />;

const Cell = ({ squareSize, xy, gameInfo, dispatchGame }) => {
  const size = { height: `${squareSize}px`, width: `${squareSize}px` };
  let state = gameInfo.history[xy] || 'hidden';
  let flag = false; //change it to ->  gameInfo.flags[xy] || false;
  let value = gameInfo.map[xy];

  let stateStyle = { 'game over': { ...explodedCell }, hidden: { ...hiddenCell }, 'not hidden': { ...openedCell } }[state]; //background: colors.red[500];

  return (
    <Box
      onClick={gameInfo.gameOver ? () => {} : () => Action(dispatchGame, xy, value, gameInfo.firstClick)}
      state={state}
      xy={xy}
      sx={{ ...stateStyle, ...size }}
      onContextMenu={(e) => {
        e.preventDefault(); // prevent the default behaviour when right clicked
        console.log('Right Click line 28 Grid.jsx');
      }}
    >
      {state === 'game over' && (value === 'X' ? Bomb : value)}
      {/* {state === 'not hidden' && (value === 'X' ? Bomb : value !== '0' && value)} */}
      {state === 'hidden' && !flag && (value === 'X' ? Bomb : value !== '0' && value)}
      {/* {state === 'hidden' && flag && (value === 'X' ? Bomb : value !== '0' && value)} */}
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
  let table = useMemo(() => renderOfMatrix(gameInfo, dispatchGame, size, squareSize), [gameInfo.map, gameInfo.firstClick, gameInfo.history, size, squareSize, gameInfo.gameOver]);
  return table;
};

const renderOfMatrix = (gameInfo, dispatchGame, size, squareSize) => {
  let table = [];

  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      table.push(<Cell key={`${x}-${y}`} xy={`${x}-${y}`} squareSize={squareSize} gameInfo={gameInfo} dispatchGame={dispatchGame} />);
    }
  }
  return table;
};

export default Grid;
