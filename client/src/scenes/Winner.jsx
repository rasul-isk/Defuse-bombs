import { Box, colors } from '@mui/material';
import React, { useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';

const Winner = ({ insertName, showScoreBoard }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    insertName(name);
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
