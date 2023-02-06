import FlagIcon from '@mui/icons-material/Flag';
import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import BombIcon from '../pics/bomb.png';
import { colors } from '../theme';
import { horizontalLine, possibilities } from './ProcessingMethods';

function MouseOver(xy, dispatchGame, activeAbility, rowSize) {
  activeAbility === 'radar' && dispatchGame({ switch: 'cellsOnFocus', value: [xy, ...possibilities(xy)] });
  activeAbility === 'kamikaze' && dispatchGame({ switch: 'cellsOnFocus', value: [xy, ...horizontalLine(xy, rowSize)] });
}

const generalStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
const hiddenCell = { ...generalStyle, background: colors.black[300], border: `1px solid ${colors.teal[500]}` };
const focusedCell = { background: 'red', cursor: 'crosshair' };
const openedCell = { ...generalStyle, background: colors.black[100], border: `1px solid ${colors.teal[300]}`, color: colors.black[500] };
const explodedCell = { ...generalStyle, background: colors.red[500], border: `1px solid ${colors.black[500]}` };
const Bomb = <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" />;
const flagStyle = { maxWidth: '90%', maxHeight: '90%', color: colors.red[500] };

const Cell = ({ squareSize, xy, gameInfo, dispatchGame }) => {
  const size = { height: `${squareSize}px`, width: `${squareSize}px` };
  let rowSize = Math.sqrt(Object.entries(gameInfo.map).length);
  let state = gameInfo.history[xy] || 'hidden';
  let flag = gameInfo.flags[xy] || false;
  let value = gameInfo.map[xy];
  // console.log(xy + ' - ' + gameInfo.cellsOnFocus[xy]);
  let emptyHistory = Object.entries(gameInfo.history).length === 0;
  let stateStyle = {
    'game over': { ...explodedCell },
    hidden: { ...hiddenCell, ...(gameInfo.cellsOnFocus.includes(xy) ? focusedCell : {}) },
    'not hidden': { ...openedCell },
  }[state];

  const actionType = () => {
    if (gameInfo.activeAbility) {
      let outOfMap = new RegExp(`(\\b0\\b)|(\\b${rowSize + 1}\\b)`);
      let cellsToOpen = gameInfo.cellsOnFocus.filter((el) => !el.match(outOfMap) && gameInfo.history[el] !== 'not hidden');
      let cellsAsObject = cellsToOpen.reduce((acc, cur) => ({ ...acc, [cur]: 'not hidden' }), {});

      dispatchGame({ switch: 'useAbility', value: gameInfo.activeAbility });
      dispatchGame({ switch: 'addToHistory', value: cellsAsObject });
    } else if (!(gameInfo.gameOver || gameInfo.flags[xy])) {
      Action(dispatchGame, xy, value, gameInfo.abilities.fortune, emptyHistory);
    }
  };

  // console.log(actionType);
  if (state === 'not hidden' && value === 'X' && !gameInfo.gameOver) stateStyle['background'] = colors.teal[700];

  return (
    <Box
      onClick={() => state === 'hidden' && actionType()}
      state={state}
      xy={xy}
      sx={{ ...stateStyle, ...size }}
      onContextMenu={(e) => {
        e.preventDefault(); // prevent the default behaviour when right clicked
        !gameInfo.gameOver && !gameInfo.activeAbility && dispatchGame({ switch: 'addToFlags', value: { [xy]: (gameInfo.flags[xy] !== 'exist' && 'exist') || '' } });
      }}
      onMouseOver={state === 'hidden' && gameInfo.activeAbility ? () => MouseOver(xy, dispatchGame, gameInfo.activeAbility, rowSize) : () => {}}
    >
      {state === 'game over' && (value === 'X' ? Bomb : value)}
      {/* {state === 'not hidden' && (value === 'X' ? Bomb : value !== '0' && value)} */}
      {/* cheat for seeing cells below*/}
      {state === 'hidden' && !flag && (value === 'X' ? Bomb : value !== '0' && value)}
      {state === 'hidden' && flag && <FlagIcon sx={{ ...flagStyle, ...(gameInfo.cellsOnFocus.includes(xy) ? { color: 'black' } : {}) }} />}
    </Box>
  );
};

const Action = (dispatchGame, xy, value, fortune, emptyHistory) => {
  let newState = value === 'X' ? 'game over' : 'not hidden';
  dispatchGame({ switch: 'addToHistory', value: { [xy]: newState } });

  if (newState === 'game over' && !emptyHistory) {
    if (fortune) {
      dispatchGame({ switch: 'useAbility', value: 'fortune' });
      dispatchGame({ switch: 'addToHistory', value: { [xy]: 'not hidden' } });
    } else {
      dispatchGame({ switch: 'addToHistory', value: { [xy]: newState } });
      dispatchGame({ switch: 'gameOver', value: true });
    }
  } else {
    dispatchGame({ switch: 'addToHistory', value: { [xy]: newState } });
  }
};

const Grid = ({ gameInfo, dispatchGame, width }) => {
  // console.log('now I know, when I have active ability. current one: ' + gameInfo.activeAbility); //STOPPED HERE
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
