import IngredientInput from "../components/create-recipe/IngredientInput";
import Layout from "../components/layout/Layout";
import Heading from "../components/ui/Heading";
import Input from "../components/ui/Input";
import TextArea from "../components/ui/TextArea";
import { useState } from "react";

interface Ingredient {
  name: string;
  qty: string;
  unit: string;
}

const CreateNewRecipePage = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "Example Ingredient", qty: "1/2", unit: "tsp" },
  ]);
  const addNewIngredient = (name:string,qty:string,unit:string) => {
    console.log({name,qty,unit})
    setIngredients(state => [...state,{name,qty,unit}])
  }
  return (
    <Layout>
      <form>
        <Heading
          title="Post your recipe"
          subtitle="Share your unique recipe to the world."
        />
        <div className="mt-4 flex flex-col gap-4 ">
          <Input
            label="Recipe Title"
            placeholder="Enter title for your recipe"
          />
          <TextArea
            label="Instructions / Steps "
            rows={8}
            placeholder="Enter instructions to cook step by step"
          />
          <p className="font-medium text-xl">Ingredients</p>
          <ul>
            {ingredients.map((item, id) => (
              <li key={id}>{`${item.name} -  ${item.qty} ${item.unit} `} </li>
            ))}
          </ul>
         <IngredientInput handleAdd={addNewIngredient}/>
        </div>
      </form>
    </Layout>
  );
};

export default CreateNewRecipePage;
