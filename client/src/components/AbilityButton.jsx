import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../theme';
const AbilityButton = ({ dispatchGame, Icon, state, text, size, boolean }) => {
  let innerMaterial = (
    <>
      {text && <Typography variant={size === 'small' ? 'h5' : 'h3'}>{text} </Typography>}
      <Icon fontSize={size ? size : 'large'} />
    </>
  );
  return (
    <Box>
      {/* Radar & Kamikaze button */}
      {boolean && !text && (
        <IconButton className="main-button" onClick={() => dispatchGame(state)} style={{ opacity: '100%', cursor: 'pointer' }}>
          {innerMaterial}
        </IconButton>
      )}
      {/* Not active, 60% opacity button */}
      {!boolean && text !== 'Active' && (
        <IconButton className="main-button" style={{ opacity: '60%', cursor: 'default' }}>
          {innerMaterial}
        </IconButton>
      )}
      {/* Fortune Active state */}
      {text === 'Active' && (
        <IconButton className="main-button" sx={{ opacity: '100%', cursor: 'pointer', color: `${colors.teal[400]} !important` }}>
          {innerMaterial}
        </IconButton>
      )}
    </Box>
  );
};
export default AbilityButton;
