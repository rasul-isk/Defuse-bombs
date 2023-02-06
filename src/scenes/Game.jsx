import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import RadarIcon from '@mui/icons-material/Radar';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AbilityButton from '../components/AbilityButton';
import Grid from '../components/Grid';
import HeaderTitle from '../components/HeaderTitle';
import { possibilities } from '../components/ProcessingMethods';
import VerticalDivider from '../components/VerticalDivider';
import { colors } from '../theme';

export const Game = ({ gameInfo, dispatchGame }) => {
  const [allZeroesOpen, setAllZeroesOpen] = useState(false);
  const [usedFortune] = useState(gameInfo.abilities.fortune);
  let mapSize = Object.entries(gameInfo.map).length;
  let rowSize = Math.sqrt(mapSize);
  let bombs = Object.entries(gameInfo.map).filter((el) => el[1] === 'X').length;

  useEffect(() => {
    if (gameInfo.firstClick !== '') {
      dispatchGame({ switch: 'gameOver', value: false });
      dispatchGame({ switch: 'firstClick', value: '' });
    }
  }, [gameInfo.firstClick, dispatchGame]);

  useEffect(() => {
    //WIN SITUATION
    let nonBombCells = Object.keys(gameInfo.history).filter((el) => gameInfo.map[el] !== 'X').length;
    const counter = !gameInfo.gameOver && mapSize === nonBombCells + bombs && setInterval(() => dispatchGame({ switch: 'gameStatus', value: 'finished' }), 3000);
    return () => clearInterval(counter);
  }, [gameInfo.gameOver, gameInfo.map, mapSize, gameInfo.history, bombs, dispatchGame]);

  useEffect(() => {
    //if all zeroes open, do not look for cells (with value 0) and their nearby cells that can be unhided
    if (!allZeroesOpen) {
      let totalZeroesOnMap = Object.entries(gameInfo.map).filter((el) => el[1] === '0').length;
      let notHiddenZeroes = Object.entries(gameInfo.map).filter((el) => el[1] === '0' && gameInfo.history[el[0]] === 'not hidden').length;
      let zeroesLeft = totalZeroesOnMap - notHiddenZeroes;
      let outOfMap = new RegExp(`(\\b0\\b)|(\\b${rowSize + 1}\\b)`);
      // console.log('2-11'.match(outOfMap));
      if (zeroesLeft > 0) {
        let y = 1;
        while (y <= rowSize) {
          let x = 1;
          while (x <= rowSize) {
            if (gameInfo.history[`${x}-${y}`] === 'not hidden' && gameInfo.map[`${x}-${y}`] === '0') {
              let cellsToOpen = possibilities(`${x}-${y}`).filter((el) => !el.match(outOfMap) && gameInfo.history[el] !== 'not hidden');
              if (cellsToOpen.length) {
                let cellsAsObject = cellsToOpen.reduce((acc, cur) => ({ ...acc, [cur]: 'not hidden' }), {});
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
  }, [gameInfo.map, gameInfo.history, rowSize, allZeroesOpen, mapSize, dispatchGame]);

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

      {gameInfo.activeAbility === 'radar' && <Typography variant="h5P">Choose area to scan...</Typography>}
      {gameInfo.activeAbility === 'kamikaze' && <Typography variant="h5P">Choose line to call kamikaze...</Typography>}
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
              <AbilityButton
                size="large"
                boolean={!gameInfo.gameOver && gameInfo.abilities.radar > 0 && !gameInfo.activeAbility}
                dispatchGame={dispatchGame}
                Icon={RadarIcon}
                state={{ switch: 'activeAbility', value: 'radar' }}
              />
            </Box>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', pt: '5px' }}>
              <Typography variant="h4P">Kamikaze: {gameInfo.abilities.kamikaze}</Typography>
              <AbilityButton
                size="large"
                boolean={!gameInfo.gameOver && gameInfo.abilities.kamikaze > 0 && !gameInfo.activeAbility}
                dispatchGame={dispatchGame}
                Icon={AirplaneTicketIcon}
                state={{ switch: 'activeAbility', value: 'kamikaze' }}
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
