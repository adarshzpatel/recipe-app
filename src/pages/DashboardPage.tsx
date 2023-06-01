import { Query } from "appwrite";
import {
  DATABASE_ID,
  RECIPE_COLLECTION_ID,
  database,
} from "../appwrite/client";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import useCurrentUser from "../components/hooks/useCurrentUser";
import Heading from "../components/ui/Heading";
import { Recipe } from "./ExploreRecipesPage";
import RecipeCard from "../components/explore-recipes/RecipeCard";
import { getFilePreview } from "../components/libs/utils";
import DashboardRecipeCard from "../components/dashboard/DashboardRecipeCard";

export const DashboardPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { user } = useCurrentUser();

  useEffect(() => {
    if (user?.accountId) getRecipesById(user?.accountId);
  }, [user]);

  const getRecipesById = async (accountId: string) => {
    const response = await database.listDocuments(
      DATABASE_ID,
      RECIPE_COLLECTION_ID,
      [Query.equal("authorId", accountId)]
    );
    const data = response.documents.map(item=>{
      const url = getFilePreview(item.thumbnail)
      return {...item,thumbnail:url.href} as Recipe
    })
    setRecipes(data)
  };

  return (
    <Layout>
      <Heading
        title="My Recipes"
        subtitle="List of recipes have shared ."
      />
      <div className="grid sm:grid-cols-2 mt-4 md:grid-cols-3 gap-4">
        {recipes?.map((recipe) => (<DashboardRecipeCard key={recipe?.$id} data={recipe}  />))}
      </div>
    </Layout>
  );
};
