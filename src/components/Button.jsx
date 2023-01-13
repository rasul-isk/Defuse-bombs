import { IconButton, Typography } from '@mui/material';
import React from 'react';
const Button = ({ className, onClick, Icon, state, text, size, style }) => {
  return state ? (
    <IconButton sx={style} onClick={() => onClick(state)} className={className}>
      {text && <Typography variant={size === 'small' ? 'h5' : 'h3'}>{text}</Typography>}
      <Icon fontSize={size ? size : 'large'} />
    </IconButton>
  ) : (
    <IconButton sx={style} onClick={() => onClick()} className={className}>
      {text && <Typography variant={size === 'small' ? 'h5' : 'h3'}>{text}</Typography>}
      <Icon fontSize={size ? size : 'large'} />
    </IconButton>
  );
};
export default Button;
