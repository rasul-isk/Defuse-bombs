import React from 'react';
import { Typography } from '@mui/material';
import { colors } from '../theme';

const HeaderTitle = ({ title }) => {
  return (
    <Typography variant="h3" textAlign="center" color={colors.primary[500]} mb="30px">
      {title}
    </Typography>
  );
};

export default HeaderTitle;
