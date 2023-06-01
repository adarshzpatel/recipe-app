import React from "react";
import { toast } from "react-hot-toast";
import Select, { MultiValue } from "react-select";

export interface Option {
  value:string 
  label:string 
}


interface TagInputProps {
  options: Option[]
  selectedOptions:MultiValue<Option>
  onChange?:(newValues:MultiValue<Option>) => void;
}
const TagInput = ({onChange,selectedOptions,options}:TagInputProps) => {

  return (
    <Select
      onMenuOpen={()=>{
        if(selectedOptions.length >= 3){

          toast.error("Max 3 tags allowed!")
        }
      }
      }
      value={selectedOptions}
      onChange={onChange}
      options={options}
      isMulti
      placeholder="Select Tags"
      isOptionDisabled={() => selectedOptions.length >= 3 }
      styles={{
        control: (provided) => ({
          ...provided,
          border: "1px solid #d1d5db",
          borderRadius: "0.7rem",
          "&:focus": {
            boxShadow: "none",
            outline: "none",
          },
          "&:hover": {
            border: "1px solid #9ca3af",
          },
          minHeight: "40px",
        }),
        multiValue: (prev) => ({
          ...prev,
          borderRadius: "0.5rem",
          padding: "0 2px",
          overflow: "hidden",
          background: "#e5e7eb",
        }),
      }}
      theme={(theme) => {
        return {
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#4b5563",
            primary25: "#f3f4f6",
          },
        };
      }}
    />
  );
};

export default TagInput;
