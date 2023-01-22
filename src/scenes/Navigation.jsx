import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import { Box, Typography } from '@mui/material';
import { colors } from '../theme';

import Button from '../components/Button';

const Header = ({ scoreboard, toggleScoreboard, timer, difficulty, information, play, volume, togglePlay, toggleVolume, toggleInformation, restart }) => {
  return (
    <Box className="container-item header" bgcolor={colors.red[500]} justifyContent="space-between">
      <Typography variant="h1" color={colors.primary[500]}>
        RESCUER
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ color: colors.primary[500], pr: '10px' }}>
          {timer !== '00:00' ? timer : ''}
        </Typography>
        {(play === 'not started' || play === 'paused') && <Button className="main-button" Icon={PlayCircleRoundedIcon} onClick={togglePlay} state="started" />}
        {play === 'started' && <Button className="main-button" Icon={PauseCircleRoundedIcon} onClick={togglePlay} state="paused" />}
        {difficulty !== 'not chosen' && <Button className="main-button" Icon={RestartAltRoundedIcon} onClick={restart} />}
        {!volume && <Button className="main-button" Icon={VolumeOffRoundedIcon} onClick={toggleVolume} />}
        {volume && <Button className="main-button" Icon={VolumeUpRoundedIcon} onClick={toggleVolume} />}
        {!scoreboard && <Button className="main-button" Icon={ContentPasteSearchIcon} onClick={toggleScoreboard} />}
        {scoreboard && <Button className="main-button" Icon={ContentPasteOffIcon} onClick={toggleScoreboard} />}
        {information && <Button className="main-button" Icon={HighlightOffIcon} onClick={toggleInformation} />}
        {!information && <Button className="main-button" Icon={HelpRoundedIcon} onClick={toggleInformation} />}
      </Box>
    </Box>
  );
};

export default Header;
