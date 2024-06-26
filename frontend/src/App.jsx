import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider, Fab } from '@mui/material';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import CustomDrawer from './components/CustomDrawer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import MyRecipes from './pages/MyRecipes';
//import useQueryClient from './hooks/useQueryClient';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Topbar from './components/Topbar';
import Login from './pages/Authentication/Login';
import { useAuthContext } from './contexts/AuthContext';
import { isValidPath } from './services/validPaths';
import CreateRecipe from './modals/CreateRecipe';

const qc = new QueryClient();

const App = () => {
  const [theme, colorMode] = useMode();
  //const { queryClient } = useQueryClient();
  const { authenticated } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();
  if (!isValidPath(location.pathname)) navigate('/notfound');

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
                <Route exact path='/myrecipes' element={<MyRecipes />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
              <CreateRecipe />
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
