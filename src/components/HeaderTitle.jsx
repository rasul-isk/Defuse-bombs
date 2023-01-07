import { Typography } from '@mui/material';
import React from 'react';
import { colors } from '../theme';

const HeaderTitle = ({ title }) => {
  return (
    <Typography variant="h3" fontSize="42px" textAlign="center" color={colors.primary[500]} mb="30px">
      {title}
    </Typography>
  );
};

export default HeaderTitle;
