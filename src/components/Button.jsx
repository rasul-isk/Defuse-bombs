import React from 'react';
import { IconButton } from '@mui/material';
const Button = ({ className, onClick, Icon, state }) => {
  return state ? (
    <IconButton onClick={() => onClick(state)} className={className}>
      <Icon fontSize="large" />
    </IconButton>
  ) : (
    <IconButton onClick={() => onClick()} className={className}>
      <Icon fontSize="large" />
    </IconButton>
  );
};
export default Button;
