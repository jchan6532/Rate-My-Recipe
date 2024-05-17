import { ColorModeContext, useMode } from './theme';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CustomDrawer from './components/CustomDrawer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';
import Settings from './pages/Settings';
import useQueryClient from './hooks/useQueryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import Topbar from './components/Topbar';
import Login from './pages/Authentication/Login';
import { useAuthContext } from './contexts/AuthContext';

const App = () => {
  const [theme, colorMode] = useMode();
  const { queryClient } = useQueryClient();
  const { authenticated } = useAuthContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='app'>
            {/* <Sidebar /> */}
            {authenticated && <CustomDrawer />}
            <main className='content'>
              {authenticated && <Topbar />}
              <Routes>
                <Route path='/welcomeback' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path={`/profile/:userId`} element={<Profile />} />
                <Route path='/recipe/:recipeId' element={<Recipe />} />
                <Route path='/settings' element={<Settings />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
