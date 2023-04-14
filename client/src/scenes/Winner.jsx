import { Box, colors } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';
import { stringToSeconds } from '../components/ProcessingMethods';
const Winner = ({ insertName, showScoreBoard, gameInfo }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    let submitObject = { fullname: name, difficulty: gameInfo.difficulty, score: stringToSeconds(gameInfo.timer), date: gameInfo.winTime };

    axios.post('http://localhost:5000/admin/scores/add', submitObject).catch((err) => console.log(err));
    // insertName(name); #REMOVE
    showScoreBoard();
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };
  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block" width="auto">
      <HeaderTitle title={'You won!'} />
      <form onSubmit={handleSubmit}>
        {/* <Typograp hy variant="h4"> Enter your name</Typograp> */}

        <input type="text" id="name" value={name} onChange={handleChange} />
        <input type="submit" />
      </form>
    </Box>
  );
};

export default Winner;
