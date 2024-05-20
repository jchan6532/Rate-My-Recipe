import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CustomDrawer from './components/CustomDrawer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
//import useQueryClient from './hooks/useQueryClient';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Topbar from './components/Topbar';
import Login from './pages/Authentication/Login';
import { useAuthContext } from './contexts/AuthContext';

const qc = new QueryClient();

const App = () => {
  const [theme, colorMode] = useMode();
  //const { queryClient } = useQueryClient();
  const { authenticated } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const validPaths = [
    '/welcomeback',
    '/',
    '/profile',
    '/recipe/:recipeId',
    '/settings',
  ];

  const isValidPath = validPaths.some((path) => {
    const regexPath = new RegExp(`^${path.replace(/:\w+/g, '[^/]+')}$`);
    return regexPath.test(location.pathname);
  });

  if (!isValidPath) navigate('/notfound');

  return (
    <QueryClientProvider client={qc}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='app'>
            {/* <Sidebar /> */}
            {authenticated && <CustomDrawer />}
            <main className='content'>
              {authenticated && <Topbar />}
              <Routes>
                <Route exact path='/welcomeback' element={<Login />} />
                <Route exact path='/' element={<Home />} />
                <Route exact path='/profile' element={<Profile />} />
                <Route exact path='/recipe/:recipeId' element={<Recipe />} />
                <Route exact path='/settings' element={<Settings />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
