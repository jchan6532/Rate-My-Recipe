import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import Search from '@mui/icons-material/Search';
import { Stack, Typography } from '@mui/material';

const CustomDrawer = ({ page }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (toggle) => {
    return (event) => {
      if (
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }

      setOpen(toggle);
    };
  };

  const ListMarkUp = (
    <Box
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ width: '14.5vw', padding: '3vh', pl: '1vh' }}
    >
      <List>
        <ListItem>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Recipe Feed' />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate('/myrecipes')}>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <ListItemText primary='My Recipes' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        mt: '25px',
        ml: '35px',
        mr: '10px',
      }}
    >
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={toggleDrawer(true)}
      >
        <Stack direction='row' spacing={2} alignItems='center'>
          <MenuIcon style={{ color: colors.grey[100] }} />
          {page && <Typography variant='h4'>{page}</Typography>}
        </Stack>
      </IconButton>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <img
            alt='profile-user'
            width='100px'
            height='100px'
            src={`./images/default-recipe.jpg`}
            style={{ cursor: 'pointer', borderRadius: '50%' }}
          />
        </Box>
        {ListMarkUp}
      </Drawer>
    </Box>
  );
};

export default CustomDrawer;
