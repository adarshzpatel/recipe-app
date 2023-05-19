import Input from "../ui/Input";
import Button from "../ui/Button";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";


interface Props{
  handleAdd:(name:string,qty:string,unit:string) => void
}

const IngredientInput = ({handleAdd}: Props) => {
  const [state,setState] = useState({
    name:"",
    quantity:"",
    unit:""
  })

  return (
    <div className="flex flex-wrap gap-4">
      <Input onChange={(e)=>setState({...state,name:e.target.value})} placeholder="Name" className="w-80" />
      <Input onChange={(e)=>setState({...state,quantity:e.target.value})} placeholder="Quantity" />
      <Input onChange={(e)=>setState({...state,unit:e.target.value})} placeholder="Unit" />
      <Button 
        onClick={()=>{
          handleAdd(state.name,state.quantity,state.unit)
          setState({name:"",quantity:"",unit:""})
        }}
        type="button" 
        text="Add Ingredient"
        icon={FiPlus} 
      />
    </div>
  );
};

export default IngredientInput;
