import * as Components from '../Components';
import { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from '../../../components/GoogleSignIn';

const Login = () => {
  const [signIn, toggle] = useState(true);
  const [backgroundMode, setBackgroundMode] = useState('light');
  const { login, authenticated, user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated && user) navigate('/');
  }, [authenticated, user, navigate]);

  const signInHandler = (event) => {
    event.preventDefault();
    try {
      login();
    } catch (error) {}
  };
  const signUpHanlder = (event) => {
    event.preventDefault();
    try {
      login();
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        background: backgroundMode === 'light' ? '#cfcfcf' : '#261f36',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'Montserrat, sans-serif',
        height: '100vh',
        margin: '0',
      }}
    >
      <Components.Container>
        <Components.SignUpContainer signIn={signIn}>
          <IconButton
            onClick={() =>
              setBackgroundMode((prev) => (prev === 'light' ? 'dark' : 'light'))
            }
          >
            {backgroundMode === 'light' ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>{' '}
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <br />
            <Components.Input type='text' placeholder='First Name' />
            <Components.Input type='text' placeholder='Last Name' />
            <Components.Input type='email' placeholder='Email Address' />
            <Components.Input type='password' placeholder='Password' />
            <Components.Input type='password' placeholder='Confirm Password' />
            <Components.Button onClick={signUpHanlder}>
              Sign Up
            </Components.Button>
            <GoogleSignIn isSignUp />
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signIn={signIn}>
          <IconButton
            onClick={() =>
              setBackgroundMode((prev) => (prev === 'light' ? 'dark' : 'light'))
            }
          >
            {backgroundMode === 'light' ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
          <Components.Form>
            <Components.Title>Sign In</Components.Title>
            <br />
            <Components.Input type='email' placeholder='Email Address' />
            <Components.Input type='password' placeholder='Password' />
            <Components.Anchor href='#'>
              Forgot Your Password ?
            </Components.Anchor>
            <Components.Button onClick={signInHandler}>
              Sign In
            </Components.Button>
            <GoogleSignIn />
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signIn={signIn}>
          <Components.Overlay signIn={signIn}>
            <Components.LeftOverlayPanel signIn={signIn}>
              <Components.Title>Welcome Back</Components.Title>
              <Components.Paragraph>
                To Start Sharing Your Wonderful Recipes, Please Login With Your
                Personal Info First!
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signIn={signIn}>
              <Components.Title>
                Want To Start Sharing Your Personal Recipes With The Entire
                World ?
              </Components.Title>
              <Components.Paragraph>
                Create An Account To Start Sharing Your Personal Recipes With
                The Whole Wide World!
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Box>
  );
};

export default Login;
