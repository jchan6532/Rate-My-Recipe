import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb={'30px'}>
      {title && (
        <Typography
          variant='h2'
          color={colors.grey[100]}
          sx={{
            mb: '5px',
            fontSize: '40px',
            lineHeight: 0.8,
            letterSpacing: 0.5,
            fontFamily: 'Shadows Into Light, cursive',
          }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant='h5'
          colors={colors.greenAccent[400]}
          sx={{
            fontFamily: 'Pacifico, cursive',
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default Header;
