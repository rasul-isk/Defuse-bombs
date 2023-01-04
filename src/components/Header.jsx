import { colors } from '../theme';
import { Typography, Box } from '@mui/material';

const Header = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography variant="h2" color={colors.primary[500]} fontWeight="bold" sx={{ mb: '5px' }}>
        {title}
      </Typography>
      <Typography variant="h5" color={colors.green[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
