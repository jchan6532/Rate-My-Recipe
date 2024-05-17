import { Box, Button, Toolbar, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme.js';
import Header from '../../components/Header/index.jsx';
import { useQuery } from '@tanstack/react-query';
import useFetchRecipes from '../../hooks/useFetchRecipes.js';
import RecipeCard from '../../components/RecipeCard/index.jsx';
import { useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { authenticated } = useAuthContext();
  const navigate = useNavigate();
  const { fetchRecipes } = useFetchRecipes();
  const { data, status, isLoading } = useQuery({
    queryFn: fetchRecipes,
    queryKey: 'recipes',
  });

  useEffect(() => {
    if (!authenticated) navigate('/welcomeback');
  }, [authenticated, navigate]);

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
        <RecipeCard
          RecipeData={{
            name: 'Lasagna',
            title: 'Homemade Lasagna',
            score: 'Justin Chan',
            description: 'Yummy Yummy Yummy Yummy Yummy Yummy Yummy',
          }}
          ButtonLabel='Search'
        />
        <RecipeCard
          RecipeData={{
            name: 'Lasagna',
            title: 'Homemade Lasagna',
            score: 'Justin Chan',
            description: 'Yummy Yummy Yummy Yummy Yummy Yummy Yummy',
          }}
          ButtonLabel='Search'
        />
        <RecipeCard
          RecipeData={{
            name: 'Lasagna',
            title: 'Homemade Lasagna',
            score: 'Justin Chan',
            description: 'Yummy Yummy Yummy Yummy Yummy Yummy Yummy',
          }}
          ButtonLabel='Search'
        />
      </Box>
      <Toolbar />
    </Box>
  );
};

export default Home;
