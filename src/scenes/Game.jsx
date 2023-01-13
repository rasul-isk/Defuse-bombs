import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RadarIcon from '@mui/icons-material/Radar';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AbilityButton from '../components/AbilityButton';
import Grid from '../components/Grid';
import HeaderTitle from '../components/HeaderTitle';
import VerticalDivider from '../components/VerticalDivider';
import { colors } from '../theme';

const addOneSecond = (prev) => {
  let [minutes, seconds] = prev.split(':');
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  return [('0' + minutes).slice(-2), ('0' + seconds).slice(-2)].join(':');
};

export const Game = ({ play, difficulty, timer, setTimer, abilities, useAbility }) => {
  useEffect(() => {
    const counter = timer !== '59:59' && setInterval(() => setTimer((prev) => addOneSecond(prev)), 1000);
    return () => clearInterval(counter);
  }, [timer, setTimer]);
  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block">
      <HeaderTitle title={play === 'started' ? 'Game Started!' : 'Game Paused'} />
      <Box display="flex">
        <Box sx={{ height: '400px', width: '400px', display: 'flex', flexWrap: 'wrap' }}>
          <Grid difficulty={difficulty} width={400} />
        </Box>
        <VerticalDivider flex={0.05} />
        <Box sx={{ display: 'block' }} flex={1}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4P" sx={{}}>
              Abilities
            </Typography>
          </Box>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', pt: '15px' }}>
            <Typography variant="h4P">Radar: {abilities.radar}</Typography>
            <AbilityButton size="large" boolean={abilities.radar > 0} onClick={useAbility} Icon={RadarIcon} state={'radar'} />
          </Box>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', pt: '5px' }}>
            <Typography variant="h4P">Kamikaze: {abilities.kamikaze}</Typography>
            <AbilityButton size="large" boolean={abilities.kamikaze > 0} onClick={useAbility} Icon={AirplaneTicketIcon} state={'kamikaze'} />
          </Box>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', pt: '5px' }}>
            <Typography variant="h4P">Fortune: </Typography>
            {abilities.fortune === 1 && <AbilityButton size="large" Icon={EventAvailableIcon} state={'fortune'} text={'Active'} />}
            {abilities.fortune === 0 && <AbilityButton size="large" Icon={EventBusyIcon} state={'fortune'} text={`None`} />}
            {/* MAKE IT AUTOMATICALLY ACTIVE IF AVAILABLE OTHERWISE RED ICON NOT GREEN */}
            {/* ICONS SHOULDNT BE CLICKABLE IF COUNT IS NOT ZERO AND SHOULD BE RED */}
          </Box>
        </Box>
      </Box>

      {difficulty}
    </Box>
  );
};
