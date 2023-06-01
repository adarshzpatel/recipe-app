import Layout from "../components/layout/Layout"
import RecipeCard from "../components/explore-recipes/RecipeCard";
import { DATABASE_ID, RECIPE_COLLECTION_ID, database } from "../appwrite/client";
import { getFilePreview } from "../components/libs/utils";
import {Models} from "appwrite"
import { useEffect, useState } from "react";
import Heading from "../components/ui/Heading";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import {BsFilter} from 'react-icons/bs'
import { tags } from "./CreateNewRecipePage";
import Tag from "../components/ui/Tag";

export interface Recipe extends Models.Document {
  authorId: string
  authorName:string
  ingredients: string[]
  instructions: string
  tags: string[]
  thumbnail: string
  title: string
}


const ExploreRecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchString,setSearchString] = useState("");
  const [selectedFilterTag,setSelectedFilterTag] = useState("")
  const [showTags,setShowTags] = useState(false);

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = () => {
    setLoading(true);
    database.listDocuments(
      DATABASE_ID,
      RECIPE_COLLECTION_ID,
    )
      .then((response) => {
        const data = response.documents.map(item=>{
          const url = getFilePreview(item.thumbnail)
          return {...item,thumbnail:url.href} as Recipe
        })
        setRecipes(data)
        console.log("recipies", data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  };

  const toggleShowTags = () => {
    setShowTags(state => {
      setSelectedFilterTag("")
      return !state
    })
  }

  const tagStyles = {
    selected: `border-gray-200 bg-rose-100 ring-1 ring-rose-500 text-black  rounded-full px-3 py-1`,
    default:`ring-1 ring-gray-300 bg-gray-50 hover:ring-gray-500 hover:bg-gray-100 text-gray-500 hover:text-gray-900 duration-200 ease-out cursor-pointer rounded-full px-3 py-1 `
  }

  return (
    <Layout>
      <Heading title="Explore Recipes" subtitle="Browse tasty recipes shared by people around the world."/>
      <div className="flex items-center gap-2 mt-4">
      <Input value={searchString} onChange={(e)=>setSearchString(e.target.value)} placeholder="Search recipes..."  />
      <Button variant="secondary" icon={BsFilter} text={showTags ? "Remove filter" : "Filter by tags"} onClick={toggleShowTags}/>
      </div> 
    {showTags && <div className="my-4 flex flex-wrap  gap-2">{
        tags.map((tag)=>(<div onClick={()=>{setSelectedFilterTag(tag.label)}} key={`filter-by-${tag.value}`} className={selectedFilterTag == tag.label ? tagStyles.selected : tagStyles.default}>{tag.label}</div>))
      }</div>}
      <div className="grid sm:grid-cols-2 mt-4 md:grid-cols-3 gap-4">
      {recipes.filter(it=>selectedFilterTag !== '' ? it.tags.includes(selectedFilterTag): true)?.map(recipe => (<RecipeCard data={recipe} key={recipe.$id} />))}
      </div>
    </Layout>
  )
}
export default ExploreRecipesPage
