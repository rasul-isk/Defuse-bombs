import { Box } from '@mui/material';
import React from 'react';
import { colors } from '../theme';
import DifficultyCard from './DifficultyCard';
import HeaderTitle from './HeaderTitle';

const Difficulty = ({ setDifficulty }) => {
  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block">
      <HeaderTitle title="Choose Difficulty!" />
      <Box display="flex" justifyContent="space-between">
        <DifficultyCard difficulty="Newbie" description="A lot of coins, small number of cells." onClick={setDifficulty} />
        <DifficultyCard difficulty="Skilled" description="Bunch of coins and moderate amount of cells." onClick={setDifficulty} />
        <DifficultyCard difficulty="Crazy" description="No coins at all and a lot of cells." onClick={setDifficulty} />
      </Box>
    </Box>
  );
};

export default Difficulty;
