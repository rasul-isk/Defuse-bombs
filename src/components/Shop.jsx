import { Box } from '@mui/material';
import React from 'react';
import { colors } from '../theme';
import HeaderTitle from './HeaderTitle';

const Shop = ({ setAbilities, difficulty }) => {
  if (difficulty === 'Crazy') setAbilities('none');
  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block">
      <HeaderTitle title="Buy Abilities!" />
    </Box>
  );
};

export default Shop;
