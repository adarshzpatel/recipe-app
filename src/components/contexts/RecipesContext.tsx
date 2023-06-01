import React, { createContext, useEffect, useState } from "react";
import { DATABASE_ID, RECIPE_COLLECTION_ID, database } from "../../appwrite/client";
import { Models } from "appwrite"
import { getFilePreview } from "../libs/utils";

export interface Recipe extends Models.Document {
  authorId: string
  authorName:string
  ingredients: string[]
  instructions: string
  tags: string[]
  thumbnail: string
  title: string
}

export interface IRecipeContext {
  recipes: Recipe[]
  loading: boolean
  getAllRecipes: () => void
}

export const RecipeContext = createContext<IRecipeContext>({
  recipes: [],
  loading: true,
  getAllRecipes: () => { return },
});


export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  

  return (
    <RecipeContext.Provider value={{ recipes, loading, getAllRecipes }}>
      {children}
    </RecipeContext.Provider>
  )
};

export default RecipeContext;
