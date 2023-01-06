import { colors } from '../theme';
import { Typography, Box } from '@mui/material';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Button from './Button';

const Header = ({ timer, information, play, volume, togglePlay, toggleVolume, toggleInformation, restart }) => {
  return (
    <Box className="container-item header" bgcolor={colors.red[500]} justifyContent="space-between">
      <Typography variant="h1" color={colors.primary[500]}>
        RESCUER
      </Typography>

      <Box>
        {(play === 'not started' || play === 'paused') && <Button className="main-button" Icon={PlayCircleRoundedIcon} onClick={togglePlay} state="started" />}
        {play === 'started' && <Button className="main-button" Icon={PauseCircleRoundedIcon} onClick={togglePlay} state="paused" />}
        {timer !== '00:00' && <Button className="main-button" Icon={RestartAltRoundedIcon} onClick={restart} />}
        {volume && <Button className="main-button" Icon={VolumeOffRoundedIcon} onClick={toggleVolume} />}
        {!volume && <Button className="main-button" Icon={VolumeUpRoundedIcon} onClick={toggleVolume} />}
        {information && <Button className="main-button" Icon={HighlightOffIcon} onClick={toggleInformation} />}
        {!information && <Button className="main-button" Icon={HelpRoundedIcon} onClick={toggleInformation} />}
      </Box>
    </Box>
  );
};

export default Header;
