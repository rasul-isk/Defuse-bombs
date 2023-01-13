import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../theme';
const AbilityButton = ({ onClick, Icon, state, text, size, boolean }) => {
  console.log(`Bool: ${boolean}`);
  return (
    <Box>
      {boolean && !text && (
        <IconButton className="main-button" onClick={() => onClick(state)} style={{ opacity: '100%', cursor: 'pointer' }}>
          {text && <Typography variant={size === 'small' ? 'h5' : 'h3'}>{text}</Typography>}
          <Icon fontSize={size ? size : 'large'} />
        </IconButton>
      )}
      {!boolean && text !== 'Active' && (
        <IconButton className="main-button" style={{ opacity: '60%', cursor: 'default' }}>
          {text && <Typography variant={size === 'small' ? 'h5' : 'h3'}>{text}</Typography>}
          <Icon fontSize={size ? size : 'large'} />
        </IconButton>
      )}
      {text === 'Active' && (
        <IconButton className="main-button" onClick={() => onClick(state)} sx={{ opacity: '100%', cursor: 'pointer', color: `${colors.teal[400]} !important` }}>
          {text && <Typography variant={size === 'small' ? 'h5' : 'h3'}>{text}</Typography>}
          <Icon fontSize={size ? size : 'large'} />
        </IconButton>
      )}
    </Box>
  );
};
export default AbilityButton;
