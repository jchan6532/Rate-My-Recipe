import { Box, Toolbar, CircularProgress, Backdrop, Grid } from '@mui/material';
import Header from '../../components/Header/index.jsx';
import { useQuery } from '@tanstack/react-query';
import useFetchRecipes from '../../hooks/useFetchRecipes.js';
import RecipeCard from '../../components/RecipeCard/index.jsx';
import { useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const recipeCardVairants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const { authenticated, user } = useAuthContext();
  const navigate = useNavigate();
  const { fetchRecipes } = useFetchRecipes();
  const { data, status, error, isLoading } = useQuery({
    queryFn: fetchRecipes,
    queryKey: ['recipes'],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: 5000,
    staleTime: 2000,
  });

  useEffect(() => {
    if (!authenticated || !user) navigate('/welcomeback');
  }, [authenticated, user, navigate]);

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
                  <motion.div
                    initial='hidden'
                    animate='visible'
                    variants={recipeCardVairants}
                    transition={{ duration: 0.5, delay: recipe.id * 0.1 }}
                  >
                    <RecipeCard RecipeData={recipe} />
                  </motion.div>
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
