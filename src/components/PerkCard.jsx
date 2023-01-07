import { Box, Typography } from '@mui/material';
import React from 'react';
import { colors } from '../theme';
import Operator from './Operator';
const PerkCard = ({ title, update, price, description, amount, coins }) => {
  let maximum = title !== 'Fortune' ? 3 : 1;
  let boolean = coins >= price && amount < maximum;
  return (
    <Box className="container-item" bgcolor={colors.primary[500]} sx={{ display: 'block', padding: '30px 0', height: 'auto', minWidth: '240px' }}>
      <Box align-content="flex-end">
        <Typography variant="h5" maxWidth="240px" color={colors.red[500]} mb="40px" p="15px">
          {description}
        </Typography>
        <Typography variant="h2" fontSize="26px" textAlign="left" color={colors.red[500]} p="0 15px">
          {title}
        </Typography>
        <Typography variant="h3" textAlign="left" color={colors.red[500]} p="0 15px">
          Price: <strong>{price}</strong>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" textAlign="left" color={colors.red[500]} p="0 15px">
          Max: <strong>{maximum}</strong>
        </Typography>
        <Box display="flex" justifyContent="space-between" pr="10px">
          <Box display="flex">
            <Operator mr="20px" operator="-" boolean={amount > 0} title={title} update={update} price={price} />
            <Operator operator="+" boolean={boolean} title={title} update={update} price={price} />
          </Box>
          <Typography variant="h5">{amount}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PerkCard;
