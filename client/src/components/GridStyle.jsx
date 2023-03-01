import FlagIcon from '@mui/icons-material/Flag';
import BombIcon from '../pics/bomb.png';
import { colors } from '../theme';

const generalStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center' };
const hiddenCell = { ...generalStyle, background: colors.black[300], border: `1px solid ${colors.teal[500]}` };
const openedCell = { ...generalStyle, background: colors.black[100], border: `1px solid ${colors.teal[300]}`, color: colors.black[500] };
const explodedCell = { ...generalStyle, background: colors.red[500], border: `1px solid ${colors.black[500]}` };
const focusedCell = { background: 'red', cursor: 'crosshair' };
const flagStyle = { maxWidth: '90%', maxHeight: '90%', color: colors.red[500] };

export const allStyles = (focused) => ({ 'game over': { ...explodedCell }, hidden: { ...hiddenCell, ...(focused ? focusedCell : {}) }, 'not hidden': { ...openedCell } });
export const Bomb = <img src={BombIcon} style={{ maxWidth: '90%', maxHeight: '90%' }} alt="bomb" />;
export const Flag = (focused) => <FlagIcon sx={{ ...flagStyle, ...(focused ? { color: 'black' } : {}) }} />;
