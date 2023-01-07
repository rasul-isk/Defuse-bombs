import { Box } from '@mui/material';
import React from 'react';
import { colors } from '../theme';
import HeaderTitle from './HeaderTitle';

export const Game = ({ play, difficulty, setTimer, timer }) => {
  setTimer('00:01');
  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block">
      <HeaderTitle title={play === 'started' ? 'Game Started!' : 'Game Paused'} />
    </Box>
  );
};
