import { Box } from '@mui/material';
import React from 'react';
import { colors } from '../theme';

const Cell = ({ squareSize }) => {
  return <Box sx={{ display: 'block', background: colors.black[300], height: `${squareSize}px`, width: `${squareSize}px`, border: `1px solid ${colors.teal[300]}` }} />;
};

const Grid = ({ difficulty, width }) => {
  let size = {
    Newbie: 10,
    Skilled: 15,
    Crazy: 20,
  }[difficulty];

  let table = [];
  for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) table.push(<Cell key={`${x}-${y}`} squareSize={width / size} />);
  }

  return table;
};

export default Grid;
