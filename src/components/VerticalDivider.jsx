import { Box } from '@mui/system';
import React from 'react';
import { colors } from '../theme';

const VerticalDivider = () => {
  return <Box sx={{ display: 'block', border: `1px dashed ${colors.green[400]}`, height: 'auto', width: 'auto', m: '0 10px' }} />;
};

export default VerticalDivider;
