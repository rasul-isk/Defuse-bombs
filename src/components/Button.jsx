import React from 'react';
import { IconButton } from '@mui/material';
const Button = ({ className, onClick, Icon }) => {
  return (
    <IconButton onClick={() => onClick()} className={className}>
      <Icon fontSize="large" />
    </IconButton>
  );
};
export default Button;
