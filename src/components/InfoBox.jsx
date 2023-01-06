import React from 'react';
import { Typography, Box } from '@mui/material';
import { colors } from '../theme';

const InfoBox = () => {
  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block">
      <Typography variant="h2" color={colors.primary[500]}>
        Welcome to RESCUER!
      </Typography>

      <Typography variant="h3" color={colors.primary[500]}>
        My Mission (down icon)
      </Typography>

      <Typography variant="h4" color={colors.primary[500]}>
        Your mission is to save people by defusing all bombs in given area! First click always is safe one.
      </Typography>
      <br />

      <Typography variant="h3" color={colors.primary[500]}>
        How to play (down icon)
      </Typography>

      <Typography variant="h4" color={colors.primary[500]}>
        You open squares with the left mouse button and put flags on mines with the right mouse button. Pressing the right mouse button again changes your flag into a questionmark. When you open a
        square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers. First click always is
        safe one.
      </Typography>

      <Typography variant="h3" color={colors.primary[500]}>
        Rules (down icon)
      </Typography>

      <Typography variant="h4" color={colors.primary[500]}>
        The game ends when all safe squares have been opened. A counter shows the number of mines without flags, and a clock shows your time in seconds. The game saves your best time for each
        difficulty level. You can check top scores by clicking on icon of Highscore Table.
      </Typography>
    </Box>
  );
};

export default InfoBox;
