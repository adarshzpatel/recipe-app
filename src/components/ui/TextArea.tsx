interface TextAreaProps {
  label?: string
  className?: string
  id?: string
  disabled?: boolean
  placeholder?:string
  rows?:number
}

const TextArea = ({ label, className, id, disabled,placeholder,rows=4, ...props }: TextAreaProps) => {
  return (
    <div className="block ">
      {label &&
        <label id={id} htmlFor={id} className=" text-gray-600 block mb-1">
          {label}
        </label>
      }
      <textarea
        id={id}
        disabled={disabled}

        placeholder={placeholder}
        rows={rows}
        className={`
            flex
            w-full
            rounded-xl
            border
            border-gray-300
            p-4
            bg-white
            text-sm
            ring-offset-background
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            focus-visible:outline-none
            focus-visible:border-gray-500
            disabled:cursor-not-allowedß
            disabled:opacity-50
            ${className}`
        }
        {...props}
      />
    </div>
  );
}

export default TextArea