import { Box, Typography } from '@mui/material';
import React from 'react';

const Operator = ({ operator, boolean, title, update, price }) => {
  return (
    <Box>
      {boolean && (
        <Typography variant="h5" sx={{ color: '#1FFFB8', mr: '10px', opacity: '100%', cursor: 'pointer' }} onClick={() => update(title, operator, price)}>
          <strong>{operator}</strong>
        </Typography>
      )}
      {!boolean && (
        <Typography variant="h5" sx={{ color: '#DB3A34', mr: '10px', opacity: '50%', cursor: 'default' }}>
          <strong>{operator}</strong>
        </Typography>
      )}
    </Box>
  );
};

export default Operator;
