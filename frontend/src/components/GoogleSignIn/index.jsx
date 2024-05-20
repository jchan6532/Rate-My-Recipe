import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import './index.css';
import { useAuthContext } from '../../contexts/AuthContext';

const GoogleSignIn = ({ isSignUp }) => {
  const theme = useTheme();
  const { goolgeSignIn } = useAuthContext();

  const googleSignInHandler = async (event) => {
    event.preventDefault();
    try {
      await goolgeSignIn();
    } catch (error) {}
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      margin='20px'
    >
      <Button
        variant='contained'
        className='button-style'
        startIcon={
          <img height='28' alt='Goolge Logo' src='./images/google-logo.svg' />
        }
        onClick={googleSignInHandler}
      >
        <Typography
          variant='button'
          color={theme.palette.mode === 'dark' ? 'text.secondary' : '#ffffff'}
          noWrap
          align='center'
        >
          Sign {isSignUp ? 'Up' : 'In'} With Google
        </Typography>
      </Button>
    </Box>
  );
};

export default GoogleSignIn;
