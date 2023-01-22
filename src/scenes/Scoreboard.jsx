import { Box, Typography } from '@mui/material';
import React from 'react';

const Scoreboard = ({ usersData }) => {
  const timeConverter = (time) => {
    time = time.split(':');
    return ~~time[0] * 60 + ~~time[1];
  };
  const DataParse = Object.keys(usersData)
    .sort((prev, cur) => timeConverter(usersData[prev]) - timeConverter(usersData[cur]))
    .map((el) => (
      <Box key={el}>
        <Typography variant="h3">
          {el} | {usersData[el]}
        </Typography>
      </Box>
    ));
  return DataParse;
};

export default Scoreboard;
