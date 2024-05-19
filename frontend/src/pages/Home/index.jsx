import {
  Box,
  Button,
  Toolbar,
  Typography,
  useTheme,
  CircularProgress,
  Backdrop,
  Stack,
  Grid,
} from '@mui/material';
import { tokens } from '../../theme.js';
import Header from '../../components/Header/index.jsx';
import { useQuery } from '@tanstack/react-query';
import useFetchRecipes from '../../hooks/useFetchRecipes.js';
import RecipeCard from '../../components/RecipeCard/index.jsx';
import { useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { authenticated, user } = useAuthContext();
  const navigate = useNavigate();
  const { fetchRecipes } = useFetchRecipes();
  const { data, status, isLoading } = useQuery({
    queryFn: fetchRecipes,
    queryKey: ['recipes'],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 10,
  });

  useEffect(() => {
    if (!authenticated || !user) navigate('/welcomeback');
  }, [authenticated, user, navigate]);

  useEffect(() => {
    console.log(data, status, isLoading);
  }, [data, status, isLoading]);

  return (
    <Box margin={'0px'}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Header
          subtitle={'Choose A Catalog Of Recipes Right From Your Finger Tip'}
        />
      </Box>

      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        gap={10}
        pb='50px'
      >
        {isLoading || !data ? (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        ) : (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap={10}
            pl={'3%'}
          >
            <Grid container rowSpacing={8}>
              {data?.recipes?.map((recipe) => (
                <Grid item xs={18} sm={12} md={8} lg={6} key={recipe.id}>
                  <RecipeCard RecipeData={recipe} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
      <Toolbar />
    </Box>
  );
};

export default Home;
