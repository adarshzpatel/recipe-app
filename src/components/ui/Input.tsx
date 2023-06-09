interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string
  label?: string
  className?: string
  id?: string
  disabled?: boolean
  placeholder?:string
  required?:boolean
}

const Input = ({ required,type, label, className, id, disabled,placeholder, ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label &&
        <label id={id} htmlFor={id} className="text-gray-600 block mb-1">
          {label}{required && <span className="text-red-500"> *</span>}
        </label>
      }
      <input
        id={id}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        className={`
            flex
            h-12
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-2
            bg-white
            ring-offset-background
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            focus:ring 
            focus:ring-gray-100
            focus-visible:outline-none
            focus-visible:border-gray-400
            disabled:cursor-not-allowedß
            disabled:opacity-50
            ${className}`
        }
        {...props}
      />
    </div>
  );
}

export default Input
