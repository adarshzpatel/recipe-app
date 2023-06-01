import { IconType } from "react-icons";
import Loader from "./Loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: IconType;
  className?: string;
  variant?:"primary" | "secondary"
} 

const Button = ({ text, loading, disabled,className,variant='primary', icon: Icon,...props }: ButtonProps) => {
  const styles = {
    primary: `flex items-center justify-center gap-3
      font-medium
      text-white
      bg-rose-500
      px-5 
      py-2
      h-12 
      rounded-xl
      focus:bg-rose-600
      focus:outline-none
      focus:ring
      focus:ring-rose-200
      disabled:pointer-events-none
      disabled:opacity-70
      group
      active:scale-95 
      duration-100
      ${className}
    `,
    secondary: `
      flex items-center justify-center gap-3
      font-medium
      bg-gray-50
      text-gray-600
      ring-1
      ring-gray-300
      px-5 
      py-2
      h-12 
      rounded-xl
      hover:bg-rose-50
      hover:text-rose-500 
      hover:ring-rose-500
      focus:bg-rose-50
      focus:outline-none
      focus:ring-rose-500
      focus:text-rose-500
      disabled:pointer-events-none
      disabled:opacity-70
      group
      active:scale-95 
      duration-100
      ${className}
      `
  }
  return (
    <button
      disabled={disabled || loading}
      className={styles[variant]}
      {...props}
    >
      {Icon  && !loading && <Icon size={20} className="group-hover:-rotate-12 duration-200 ease-out"  />}
      {loading ? <Loader col='white' /> :  <span className="whitespace-nowrap "> {text }</span>}
      
      
    </button>
  );
};

export default Button;
