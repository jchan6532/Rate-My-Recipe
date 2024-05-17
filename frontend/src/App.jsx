import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
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

const App = () => {
  const [theme, colorMode] = useMode();
  const { queryClient } = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='app'>
            {/* <Sidebar /> */}
            <CustomDrawer />
            <main className='content'>
              <Topbar />
              <Routes>
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
