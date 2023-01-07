import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { colors } from '../theme';
import HeaderTitle from './HeaderTitle';
import PerkCard from './PerkCard';

const Shop = ({ setAbilities, difficulty }) => {
  if (difficulty === 'Crazy') setAbilities('none');

  const [coins, setCoins] = useState(difficulty === 'Newbie' ? 750 : 500);
  const [radar, setRadar] = useState(0);
  const [kamikaze, setKamikaze] = useState(0);
  const [fortune, setFortune] = useState(0);

  let update = (title, operation, amount) => {
    //writing as object? why switch sucks
    switch (title) {
      case 'Radar':
        if (operation === '+') {
          setCoins((prev) => (prev -= amount));
          setRadar((prev) => (prev += 1));
        } else {
          setCoins((prev) => (prev += amount));
          setRadar((prev) => (prev -= 1));
        }
        break;
      case 'Kamikaze':
        if (operation === '+') {
          setCoins((prev) => (prev -= amount));
          setKamikaze((prev) => (prev += 1));
        } else {
          setCoins((prev) => (prev += amount));
          setKamikaze((prev) => (prev -= 1));
        }
        break;
      case 'Fortune':
        if (operation === '+') {
          setCoins((prev) => (prev -= amount));
          setFortune((prev) => (prev += 1));
        } else {
          setCoins((prev) => (prev += amount));
          setFortune((prev) => (prev -= 1));
        }
        break;
      default:
        break;
    }
  };

  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block" width="auto">
      <HeaderTitle title="Buy Abilities!" />

      <Box display="flex" justifyContent="space-between">
        <PerkCard title="Radar" description="Radar Radar description (max x3)" update={update} amount={radar} coins={coins} price={250} />
        <PerkCard title="Kamikaze" description="Kamikaze Kamikaze description (max x3)" update={update} amount={kamikaze} coins={coins} price={500} />
        <PerkCard title="Fortune" description="Fortune description (max x1)" update={update} amount={fortune} coins={coins} price={750} />
      </Box>

      <Typography variant="h2" fontSize="26px" padding="30px 20px">
        Balance:{coins}
        <MonetizationOnIcon fontSize="large" sx={{ color: coins === 0 ? colors.primary[400] : colors.green[400] }}>
          {coins}
        </MonetizationOnIcon>
      </Typography>
    </Box>
  );
};

export default Shop;
