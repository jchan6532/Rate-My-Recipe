import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchRecipe = async () => {
  axios.create();
};

const Recipe = () => {
  const { recipeId } = useParams();
  //const { recipe, status } = useQuery('recipe', fetchRecipe);

  return (
    <div>
      <h1>Recipe {recipeId}</h1>
    </div>
  );
};

export default Recipe;
