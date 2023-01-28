import ContentPasteOffIcon from '@mui/icons-material/ContentPasteOff';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import { Box, Typography } from '@mui/material';
import { colors } from '../theme';

import Button from '../components/Button';

const Header = ({ timer, difficulty, commonUI, dispatchUI, gameStatus, restart, togglePlay }) => {
  return (
    <Box className="container-item header" bgcolor={colors.red[500]} justifyContent="space-between">
      <Typography variant="h1" color={colors.primary[500]}>
        RESCUER
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ color: colors.primary[500], pr: '10px' }}>
          {timer !== '00:00' ? timer : ''}
        </Typography>
        {(gameStatus === 'not started' || gameStatus === 'paused') && <Button className="main-button" Icon={PlayCircleRoundedIcon} onClick={togglePlay} state="started" />}
        {gameStatus === 'started' && <Button className="main-button" Icon={PauseCircleRoundedIcon} onClick={togglePlay} state="paused" />}
        {difficulty !== 'not chosen' && <Button className="main-button" Icon={RestartAltRoundedIcon} onClick={restart} />}
        {!commonUI.volume && <Button className="main-button" Icon={VolumeOffRoundedIcon} onClick={dispatchUI} state={{ switch: 'volume' }} />}
        {commonUI.volume && <Button className="main-button" Icon={VolumeUpRoundedIcon} onClick={dispatchUI} state={{ switch: 'volume' }} />}
        {!commonUI.scoreboard && <Button className="main-button" Icon={ContentPasteSearchIcon} onClick={dispatchUI} state={{ switch: 'scoreboard' }} />}
        {commonUI.scoreboard && <Button className="main-button" Icon={ContentPasteOffIcon} onClick={dispatchUI} state={{ switch: 'scoreboard' }} />}
        {commonUI.information && <Button className="main-button" Icon={HighlightOffIcon} onClick={dispatchUI} state={{ switch: 'information' }} />}
        {!commonUI.information && <Button className="main-button" Icon={HelpRoundedIcon} onClick={dispatchUI} state={{ switch: 'information' }} />}
      </Box>
    </Box>
  );
};

export default Header;
