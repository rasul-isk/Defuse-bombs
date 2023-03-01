import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Typography } from '@mui/material';
import React, { useReducer } from 'react';
import { colors } from '../theme';

const InfoBox = () => {
  const defaultCase = { mission: false, howTo: false, rules: false };
  const dropdownReducer = (prev, cur) => {
    return {
      mission: { ...defaultCase, mission: !prev['mission'] },
      howTo: { ...defaultCase, howTo: !prev['howTo'] },
      rules: { ...defaultCase, rules: !prev['rules'] },
    }[cur.toggle];
  };

  const [dropdown, dispatch] = useReducer(dropdownReducer, defaultCase);

  let DownIcon = <ArrowDropDownIcon fontSize="large" />;
  let UpIcon = <ArrowDropUpIcon fontSize="large" />;

  return (
    <Box className="container-item" bgcolor={colors.red[500]} display="block">
      <Typography variant="h1" sx={{ textAlign: 'center', display: 'block' }} color={colors.primary[500]}>
        FAQ
      </Typography>

      <Typography variant="h3" fontSize={'40px'} m="30px" color={colors.primary[500]} onClick={() => dispatch({ toggle: 'mission' })} sx={{ cursor: 'pointer' }}>
        My Mission
        {dropdown.mission ? UpIcon : DownIcon}
      </Typography>

      {dropdown.mission && (
        <Typography variant="h4" m={'0 30px'} color={colors.primary[500]}>
          Your mission is to save people by defusing all bombs in given area!
        </Typography>
      )}

      <Typography variant="h3" fontSize={'40px'} m="30px" color={colors.primary[500]} onClick={() => dispatch({ toggle: 'howTo' })} sx={{ cursor: 'pointer' }}>
        How to play {dropdown.howTo ? UpIcon : DownIcon}
      </Typography>

      {dropdown.howTo && (
        <Typography variant="h4" m={'0 30px'} color={colors.primary[500]}>
          You open squares with the left mouse button and put flags on mines with the right mouse button. Pressing the right mouse button again changes your flag into a questionmark. When you open a
          square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers. First click always is
          safe one.
        </Typography>
      )}

      <Typography variant="h3" fontSize={'40px'} m="30px" color={colors.primary[500]} onClick={() => dispatch({ toggle: 'rules' })} sx={{ cursor: 'pointer' }}>
        Rules {dropdown.rules ? UpIcon : DownIcon}
      </Typography>

      {dropdown.rules && (
        <Typography variant="h4" m={'0 30px'} color={colors.primary[500]}>
          The game ends when all safe squares have been opened. A counter shows the number of mines without flags, and a clock shows your time in seconds. The game saves your best time for each
          difficulty level. You can check top scores by clicking on icon of Highscore Table.
        </Typography>
      )}
    </Box>
  );
};

export default InfoBox;
