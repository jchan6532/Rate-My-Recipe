import {
  Box,
  Icon,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { useAuthContext } from '../../contexts/AuthContext';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const signOutHandler = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      p={2}
      pt={4}
      position={'sticky'}
      top={0}
    >
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
        Rate My Recipe
      </Typography>

      <Box display={'flex'} gap={3}>
        <Box
          display={'flex'}
          backgroundColor={colors.primary[400]}
          borderRadius={3}
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder={'Search'} />
          <IconButton type={'button'} sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box display='flex'>
          <Tooltip
            title={theme.palette.mode === 'light' ? 'Dark Mode' : 'Light Mode'}
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: '0.70rem',
                },
              },
            }}
          >
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip
            title='Notifications'
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: '0.70rem',
                },
              },
            }}
          >
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title='Settings'
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: '0.70rem',
                },
              },
            }}
          >
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title='Profile'
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: '0.70rem',
                },
              },
            }}
          >
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title='Log Out'
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: '0.70rem',
                },
              },
            }}
          >
            <IconButton onClick={signOutHandler}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
