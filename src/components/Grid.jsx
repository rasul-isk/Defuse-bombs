import FlagIcon from '@mui/icons-material/Flag';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import BombIcon from '../pics/bomb.png';
import { colors } from '../theme';

const generalStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
const hiddenCell = { ...generalStyle, background: colors.black[300], border: `1px solid ${colors.teal[500]}` };
const openedCell = { ...generalStyle, background: colors.black[100], border: `1px solid ${colors.teal[300]}`, color: colors.black[500] };
const explodedCell = { ...generalStyle, background: colors.red[500], border: `1px solid ${colors.black[500]}` };

const Bomb = <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" />;
const flagStyle = { maxWidth: '90%', maxHeight: '90%', color: colors.red[500] };

const Cell = ({ squareSize, xy, gameInfo, dispatchGame }) => {
  const size = { height: `${squareSize}px`, width: `${squareSize}px` };
  let state = gameInfo.history[xy] || 'hidden';
  let flag = gameInfo.flags[xy] || false; //change it to ->  gameInfo.flags[xy] || false;
  let value = gameInfo.map[xy];
  let emptyHistory = Object.entries(gameInfo.history).length === 0;
  console.log('GAMEOVER?' + gameInfo.history[xy]);
  let stateStyle = { 'game over': { ...explodedCell }, hidden: { ...hiddenCell }, 'not hidden': { ...openedCell } }[state]; //background: colors.red[500];
  if (state === 'not hidden' && value === 'X' && !gameInfo.gameOver) stateStyle['background'] = colors.teal[700]; // && !gameInfo.gameOver
  // console.log(state + ' ' + value + ' ' + gameInfo.gameOver);

  return (
    <Box
      onClick={gameInfo.gameOver || gameInfo.flags[xy] ? () => {} : () => Action(dispatchGame, xy, value, gameInfo.abilities.fortune, emptyHistory)}
      state={state}
      xy={xy}
      sx={{ ...stateStyle, ...size }}
      onContextMenu={(e) => {
        e.preventDefault(); // prevent the default behaviour when right clicked
        let newState = gameInfo.flags[xy] !== 'exist' ? 'exist' : '';
        dispatchGame({ switch: 'addToFlags', value: { [xy]: newState } });
      }}
    >
      {state === 'game over' && (value === 'X' ? Bomb : value)}
      {state === 'not hidden' && (value === 'X' ? Bomb : value !== '0' && value)}
      {/* {state === 'hidden' && !flag && (value === 'X' ? Bomb : value !== '0' && value)} */}
      {state === 'hidden' && flag && <FlagIcon sx={{ ...flagStyle }} />}
    </Box>
  );
};

const Action = (dispatchGame, xy, value, fortune, emptyHistory) => {
  let newState = value === 'X' ? 'game over' : 'not hidden';
  console.log('fortune: ' + fortune);
  dispatchGame({ switch: 'addToHistory', value: { [xy]: newState } });

  if (newState === 'game over' && !emptyHistory) {
    if (fortune) {
      dispatchGame({ switch: 'useAbility', value: 'fortune' });
      dispatchGame({ switch: 'addToHistory', value: { [xy]: 'not hidden' } });
    } else dispatchGame({ switch: 'gameOver', value: true });
  }
};

const Grid = ({ gameInfo, dispatchGame, width }) => {
  let squareSize = width / { Newbie: 10, Skilled: 15, Crazy: 20 }[gameInfo.difficulty];
  let size = { Newbie: 10, Skilled: 15, Crazy: 20 }[gameInfo.difficulty];
  let table = useMemo(() => renderOfMatrix(gameInfo, dispatchGame, size, squareSize), [gameInfo, dispatchGame, size, squareSize]);
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
