import { Box, colors, Typography } from '@mui/material';
import React from 'react';

const Scoreboard = ({ usersData }) => {
  const timeConverter = (prev, cur) => {
    prev = prev.split(':');
    cur = cur.split(':');
    return ~~prev[0] * 60 + ~~prev[1] - (~~cur[0] * 60 + ~~cur[1]);
  };
  usersData = usersData['Newbie'];
  // Modify it once you started to develop dashboard.
  // Dashboard should contain carousel of scores from 3 modes(Newbie, Skilled, Crazy)
  const DataParse = Object.keys(usersData)
    .sort((prev, cur) => timeConverter(usersData[prev], usersData[cur]))
    .map((el) => (
      <Box key={el}>
        <Typography variant="h3">
          {el} | {usersData[el]}
        </Typography>
      </Box>
    ));
  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block" width="auto">
      {DataParse}
    </Box>
  );
};

export default Scoreboard;
