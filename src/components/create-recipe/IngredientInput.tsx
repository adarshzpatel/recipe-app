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
    <div className="flex gap-4 flex-wrap md:flex-nowrap">
      <Input onChange={(e)=>setState({...state,name:e.target.value})} value={state.name} placeholder="Name" className="flex-1 sm:w-72" />
      <Input onChange={(e)=>setState({...state,quantity:e.target.value})} value={state.quantity} placeholder="Quantity" className=""/>
      <Input onChange={(e)=>setState({...state,unit:e.target.value})} value={state.unit} placeholder="Unit" className=""/>
      <Button 
        onClick={()=>{
          if(!state.name || !state.quantity || !state.unit) return
          handleAdd(state.name,state.quantity,state.unit)
          setState({name:"",quantity:"",unit:""})
        }}
        type="button" 
        text="Add Ingredient"
        icon={FiPlus}
        variant="secondary" 
      />
    </div>
  );
};

export default IngredientInput;
