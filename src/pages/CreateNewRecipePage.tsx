import { MultiValue } from "react-select";
import IngredientInput from "../components/create-recipe/IngredientInput";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Input from "../components/ui/Input";
import TagInput, { Option } from "../components/ui/TagInput";
import TextArea from "../components/ui/TextArea";
import { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import UploadThumbnail from "../components/create-recipe/UploadThumbnail";
import {
  DATABASE_ID,
  RECIPE_COLLECTION_ID,
  STORAGE_BUCKET_ID,
  database,
  storage,
} from "../appwrite/client";
import { ID, Permission, Role } from "appwrite";
import useCurrentUser from "../components/hooks/useCurrentUser";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const tags = [
  { value: "chicken", label: "🍗 Chicken" },
  { value: "veggies", label: "🥬 Veggies" },
  { value: "dessert", label: "🧁 Dessert" },
  { value: "salad", label: "🥗 Salad" },
  { value: "potato", label: "🥔 Potato" },
];

const CreateNewRecipePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview,setThumbnailPreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([
    "1/2 teaspoon example",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<MultiValue<Option>>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const { user } = useCurrentUser();

  const handleCreateNewRecipe = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!thumbnailFile) return toast.error("Please upload thumbnail picture");
      if (!title) return toast.error("Please enter title.");
      if (!instructions) return toast.error("Please enter instructions.");
      if (ingredients.length == 0)
        return toast.error("Please enter ingredients.");
      if (tags.length == 0) return toast.error("Please enter tags.");
      const { $id: thumbnailFileId } = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        thumbnailFile
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

      const response = await database.createDocument(
        DATABASE_ID,
        RECIPE_COLLECTION_ID,
        ID.unique(),
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
      toast.success("Recipe creted successfully!");
      navigate(`/recipes/${response.$id}`);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="max-w-screen-md ">
      <form onSubmit={handleCreateNewRecipe} className="px-4">
        <Heading title="Create a new recipe" />
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
            <Button text="✨ Post Recipe ✨" className="w-60" />
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateNewRecipePage;
