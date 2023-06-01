import { useContext } from "react";
import RecipeContext, { type IRecipeContext } from "../contexts/RecipesContext";

const useRecipes = () => {
  const recipes = useContext<IRecipeContext>(RecipeContext);
  return recipes;
};

export default useRecipes;
