import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RadarIcon from '@mui/icons-material/Radar';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AbilityButton from '../components/AbilityButton';
import Grid from '../components/Grid';
import HeaderTitle from '../components/HeaderTitle';
import VerticalDivider from '../components/VerticalDivider';
import { colors } from '../theme';

export const Game = ({ gameInfo, dispatchGame }) => {
  const [allZeroesOpen, setAllZeroesOpen] = useState(false);
  const [usedFortune] = useState(gameInfo.abilities.fortune);
  let mapSize = Object.entries(gameInfo.map).length;
  let bombs = Object.entries(gameInfo.map).filter((el) => el[1] === 'X').length;
  // const [activeAbility, setActiveAbility] = useState('');

  useEffect(() => {
    if (gameInfo.firstClick !== '') {
      dispatchGame({ switch: 'gameOver', value: false });
      dispatchGame({ switch: 'firstClick', value: '' });
    }
  }, [gameInfo.firstClick, dispatchGame]);

  useEffect(() => {
    //WIN SITUATION

    if (!gameInfo.gameOver && mapSize === Object.entries(gameInfo.history).length + bombs) {
      dispatchGame({ switch: 'gameStatus', value: 'finished' });
    }
  }, [gameInfo.gameOver, mapSize, gameInfo.history, bombs, dispatchGame]);

  useEffect(() => {
    //if all zeroes open, do not look for cells (with value 0) and their nearby cells that can be unhided
    if (!allZeroesOpen) {
      let totalZeroesOnMap = Object.entries(gameInfo.map).filter((el) => el[1] === '0').length;
      let zeroesLeft = totalZeroesOnMap - Object.entries(gameInfo.map).filter((el) => el[1] === '0' && gameInfo.history[el[0]] === 'not hidden').length;

      if (zeroesLeft > 0) {
        let y = 1;
        while (y <= mapSize) {
          let x = 1;
          while (x <= mapSize) {
            if (gameInfo.history[`${x}-${y}`] === 'not hidden' && gameInfo.map[`${x}-${y}`] === '0') {
              let possibilities = [`${x - 1}-${y}`, `${x}-${y - 1}`, `${x - 1}-${y - 1}`, `${x - 1}-${y + 1}`, `${x + 1}-${y}`, `${x}-${y + 1}`, `${x + 1}-${y + 1}`, `${x + 1}-${y - 1}`];
              let zeroesArrToOpen = possibilities.filter((el) => gameInfo.map[el] === '0' && gameInfo.history[el] !== 'not hidden');
              if (zeroesArrToOpen.length) {
                let cellsAsObject = zeroesArrToOpen.reduce((acc, cur) => ({ ...acc, [cur]: 'not hidden' }), {});
                dispatchGame({ switch: 'addToHistory', value: cellsAsObject });
              }
            }
            x++;
          }
          y++;
        }
      } else {
        setAllZeroesOpen(true);
      }
    }
  }, [gameInfo.map, gameInfo.history, allZeroesOpen, mapSize, dispatchGame]);

  useEffect(() => {
    // Time counting + finishing game + finishing at 59:59 with "game over"
    if (gameInfo.timer === '59:59' || (gameInfo.gameOver && gameInfo.gameStatus !== 'finished')) dispatchGame({ switch: 'gameStatus', value: 'finished' });
    else {
      const counter = gameInfo.gameStatus !== 'finished' && gameInfo.timer !== '59:59' && setInterval(() => dispatchGame({ switch: 'countTime' }), 1000);

      return () => clearInterval(counter);
    }
  }, [gameInfo.gameOver, gameInfo.timer, gameInfo.gameStatus, dispatchGame]);

  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block">
      {gameInfo.gameStatus === 'started' && <HeaderTitle title={'Game Started'} />}

      <Box onClick={() => dispatchGame({ switch: 'gameStatus', value: 'finished' })}>HERE</Box>

      {/* {activeAbility === 'Radar' && <Typography variant="h4P">Choose 3x3 place to scan...</Typography>} */}
      {gameInfo.gameStatus === 'paused' && <HeaderTitle title={'Game Paused'} />}
      {gameInfo.gameStatus === 'finished' && gameInfo.gameOver && <HeaderTitle title={'GAME OVER'} />}
      <Box display="flex">
        <Box sx={{ height: '400px', width: '400px', display: 'flex', flexWrap: 'wrap' }}>
          <Grid gameInfo={gameInfo} dispatchGame={dispatchGame} width={400} />
        </Box>
        <VerticalDivider flex={0.05} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', flexDirection: 'column' }} flex={1}>
          <Box sx={{ display: 'block' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4P" sx={{}}>
                Abilities
              </Typography>
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', pt: '15px' }}>
              <Typography variant="h4P">Radar: {gameInfo.abilities.radar}</Typography>
              <AbilityButton size="large" boolean={!gameInfo.gameOver && gameInfo.abilities.radar > 0} onClick={dispatchGame} Icon={RadarIcon} state={{ switch: 'useAbility', value: 'radar' }} />
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', pt: '5px' }}>
              <Typography variant="h4P">Kamikaze: {gameInfo.abilities.kamikaze}</Typography>
              <AbilityButton
                size="large"
                boolean={!gameInfo.gameOver && gameInfo.abilities.kamikaze > 0}
                onClick={dispatchGame}
                Icon={AirplaneTicketIcon}
                state={{ switch: 'useAbility', value: 'kamikaze' }}
              />
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', pt: '5px' }}>
              <Typography variant="h4P">Fortune: </Typography>
              {gameInfo.abilities.fortune === 1 ? (
                <AbilityButton size="large" Icon={EventAvailableIcon} state={'fortune'} text={'Active'} />
              ) : (
                <AbilityButton size="large" Icon={EventBusyIcon} state={'fortune'} text={usedFortune === gameInfo.abilities.fortune ? 'None' : 'Used'} />
              )}
            </Box>
          </Box>

          {gameInfo.gameOver && (
            <Box sx={{ display: 'block', textAlign: 'center', mb: '30px' }}>
              <Typography variant="h4P">{'Mines exploded. All people dead SAD EMODJI'}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
