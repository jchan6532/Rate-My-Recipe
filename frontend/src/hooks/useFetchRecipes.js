import { recipesApi } from '../services/recipes';

const useFetchRecipes = () => {
  const fetchRecipes = async () => {
    let recipes = null;
    try {
      recipes = await recipesApi.get('/all');
    } catch (error) {
      recipes = null;
    }

    return recipes;
  };

  return { fetchRecipes };
};

export default useFetchRecipes;
