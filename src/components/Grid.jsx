import { Box } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { colors } from '../theme';

const hiddenCell = { display: 'block', background: colors.black[300], border: `1px solid ${colors.teal[300]}` };
const openedCell = { display: 'block', background: colors.black[100], border: `1px solid ${colors.teal[300]}` };

const Cell = ({ state, setCellState, squareSize, xy }) => {
  const size = { height: `${squareSize}px`, width: `${squareSize}px` };

  // let state = 'hidden';
  return <Box onClick={() => Action(setCellState, xy)} state={state} xy={xy} sx={state === 'hidden' ? { ...hiddenCell, ...size } : { ...openedCell, ...size }} />;
};

const Action = (setCellState, xy) => {
  setCellState((prev) => ({ ...prev, [xy]: 'none' }));
  // console.log(props()));
  // props.target.attributes.set_cell_state('no');
  // console.log(props.target.attributes.state.value);
  // let [x, y] = props.target.attributes.xy.value.split('-').map((el) => ~~el);
  // console.log(props);
  // props.target.attributes.setCellState((prev) => ({ ...prev, [props.target.attributes.xy.value]: 'none' }));
};

const Grid = ({ difficulty, width }) => {
  const [cellState, setCellState] = useState({});
  let squareSize = width / { Newbie: 10, Skilled: 15, Crazy: 20 }[difficulty];
  let size = { Newbie: 10, Skilled: 15, Crazy: 20 }[difficulty];

  let table = useMemo(() => renderOfMatrix(size, squareSize, setCellState), [size, squareSize]);

  // setCellState((prev) => ({ ...prev, ...cellsMatrix }));

  console.log(cellState)
  return table;
};

const renderOfMatrix = (size, squareSize, setCellState) => {
  console.log('rerenderOfMatrixnd');
  let table = [];
  let cellsMatrix = {};
  for (let y = 1; y <= size; y++) {
    for (let x = 1; x <= size; x++) {
      table.push(<Cell key={`${x}-${y}`} xy={`${x}-${y}`} state={'hidden'} setCellState={setCellState} squareSize={squareSize} />);
      cellsMatrix = { ...cellsMatrix, [`${x}-${y}`]: 'hidden' };
    }
  }
  setCellState((prev) => ({ ...prev, ...cellsMatrix }));

  return table;
};

export default Grid;
