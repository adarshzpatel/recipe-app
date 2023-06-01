import { useNavigate, useParams } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Heading from "../components/ui/Heading"
import UploadThumbnail from "../components/create-recipe/UploadThumbnail"
import Input from "../components/ui/Input"
import { useEffect, useState } from "react"
import { MultiValue } from "react-select"
import TagInput, { Option } from "../components/ui/TagInput"
import useCurrentUser from "../components/hooks/useCurrentUser"
import TextArea from "../components/ui/TextArea"
import { FiPlus, FiTrash } from "react-icons/fi"
import Button from "../components/ui/Button"
import { toast } from "react-hot-toast"
import { tags } from "./CreateNewRecipePage"
import { DATABASE_ID, RECIPE_COLLECTION_ID, STORAGE_BUCKET_ID, database, storage } from "../appwrite/client"
import { Recipe } from "./ExploreRecipesPage"
import { getFilePreview } from "../components/libs/utils"
import { Permission, Role } from "appwrite"



const EditRecipePage = () => {
  const {recipeId} = useParams()
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([
    "1/2 teaspoon example",
  ]);
  const [thumbnailFileId,setThumbnailFileId] = useState<string>("");
  const [thumbnailPreview,setThumbnailPreview] = useState<string|null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<MultiValue<Option>>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const { user } = useCurrentUser();

  useEffect(()=>{
    if(recipeId){
      database.getDocument(DATABASE_ID,RECIPE_COLLECTION_ID,recipeId).then((response)=>{
          const data = response as Recipe
          setTitle(data.title)
          setInstructions(data.instructions)
          setIngredients(data.ingredients)
          const tags = data.tags.map((it)=>({label:it,value:it.split(" ")[1]}))
          const {href:thumbnailUrl} = getFilePreview(data?.thumbnail)
          setThumbnailPreview(thumbnailUrl)
          setSelectedTags(tags)
      }).catch(err=>toast.error(err.message)).finally(()=>setIsLoading(false))
    }
  },[recipeId])

  const handleUpdateRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if(!recipeId) return
      if (!thumbnailFile) return toast.error("Please upload thumbnail picture");
      if (!title) return toast.error("Please enter title.");
      if (!instructions) return toast.error("Please enter instructions.");
      if (ingredients.length == 0)
        return toast.error("Please enter ingredients.");
      if (tags.length == 0) return toast.error("Please enter tags.");
      
      const updateFile = await storage.updateFile(
        STORAGE_BUCKET_ID,
        thumbnailFileId
      );

      if (!user?.accountId) return;
      const data = {
        title,
        instructions,
        ingredients,
        tags: selectedTags?.map((it) => it.label) ?? [],
        thumbnail: thumbnailFileId,
        authorId: user?.accountId,
        authorName: user?.name,
      };

      const response = await database.updateDocument(
        DATABASE_ID,
        RECIPE_COLLECTION_ID,
        recipeId,
        data,
        [
          Permission.read(Role.any()),
          Permission.write(Role.user(user?.accountId)),
          Permission.update(Role.user(user?.accountId)),
          Permission.delete(Role.user(user?.accountId)),
        ]
      );
      // add this recipeId to the user recipes array
      console.log(response);
      toast.success("Recipe updated successfully!");
      navigate(`/recipes/${response.$id}`);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <Layout className="max-w-screen-md ">
  <form onSubmit={handleUpdateRecipe} className="px-4">
    <Heading title="Edit your recipe" />
    <div className="space-y-4 ">
      <label className="text-gray-600 block">Upload Thumbnail</label>
      <UploadThumbnail setFile={setThumbnailFile} preview={thumbnailPreview} setPreview={setThumbnailPreview} />
      <Input
        disabled={isLoading}
        id="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        label="Recipe Title"
        placeholder="Enter title for your recipe"
        required
      />
      <TextArea
        disabled={isLoading}
        id="instructions"
        onChange={(e) => setInstructions(e.target.value)}
        value={instructions}
        required
        label="Instructions / Steps "
        rows={8}
        placeholder="Enter instructions to cook step by step"
      />
      <ul className="divide-y  border rounded-xl overflow-hidden ">
        <p className="font-medium text-lg bg-gray-100 px-4 py-2">
          Ingredients
        </p>
        {ingredients.map((item, id) => (
          <li
            key={id}
            className=" py-2 px-4 flex justify-between items-center text-gray-600 gap-4 hover:bg-gray-50 "
          >
            <span className="flex-1">{item}</span>

            <button
              type="button"
              onClick={() =>
                setIngredients(ingredients.filter((it) => item != it))
              }
              className="bg-red-500 p-2 text-white rounded-lg "
            >
              <FiTrash />
            </button>
          </li>
        ))}
      </ul>
      {/* <IngredientInput handleAdd={addNewIngredient} /> */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4 items-cenetr">
        <Input
          id="ingredient"
          onChange={(e) => setIngredientInput(e.target.value)}
          value={ingredientInput}
          placeholder="Enter ingredient with quantity "
          required
        />
        <Button
          onClick={() => {
            if (!ingredientInput)
              return toast.error("Please write something");

            setIngredients([...ingredients, ingredientInput]);
            setIngredientInput("");
          }}
          type="button"
          text="Add Ingredient"
          icon={FiPlus}
          variant="secondary"
        />
      </div>
      <label className="text-gray-600 block mt-4 mb-1">Select Tags</label>

      <TagInput
        options={tags}
        selectedOptions={selectedTags}
        onChange={(newValues) => {
            setSelectedTags(newValues);
        }}
      />
      <div className="border-t pt-4">
        <Button text="✨ Update Recipe ✨" className="w-60" />
      </div>
    </div>
  </form>
</Layout>
}


export default EditRecipePage
