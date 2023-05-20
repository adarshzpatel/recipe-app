import IngredientInput from "../components/create-recipe/IngredientInput";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import Heading from "../components/ui/Heading";
import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";

interface Ingredient {
  name: string;
  qty: string;
  unit: string;
}

const CreateNewRecipePage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Example Ingredient", qty: "1/2", unit: "tsp" },
  ]);
  const addNewIngredient = (name: string, qty: string, unit: string) => {
    console.log({ name, qty, unit });
    setIngredients((state) => [...state, { name, qty, unit }]);
  };
  return (
    <Layout>
      <form>
        <Heading
          title="Post your recipe"
          subtitle="Share your unique recipe to the world."
        />
        <div className="flex gap-4">
          <div className="mt-4 flex flex-col gap-4 max-w-screen-md ">
            <Input
              label="Recipe Title"
              placeholder="Enter title for your recipe"
            />
            <TextArea
              label="Instructions / Steps "
              rows={8}
              placeholder="Enter instructions to cook step by step"
            />
            <ul className="divide-y border rounded-xl overflow-hidden ">
            <p className="font-medium text-lg bg-gray-100 px-4 py-2">Ingredients</p>
              {ingredients.map((item, id) => (
                <li
                  key={id}
                  className=" py-2 px-4 flex justify-between items-center text-gray-600 gap-4 hover:bg-gray-50 "
                >
                  <span className="flex-1">

                  {item.name} 
                  </span>

                  <span className=""> {item.qty} {item.unit}</span>
                    <button className="bg-red-500 p-2 text-white rounded-lg "><FiTrash/></button>

                </li>
              ))}
            </ul>
            <IngredientInput handleAdd={addNewIngredient} />
          </div>
          <div className="p-4 flex-1">
            <label className="text-gray-600 block mb-1">Upload Thumbnail </label>
            <div className="border-2 border-gray-300 border-dashed aspect-video w-full rounded-xl bg-gray-50 flex items-center justify-center">
                Upload file
            </div>
            
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CreateNewRecipePage;
