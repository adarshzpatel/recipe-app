import { IconType } from "react-icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  loadingText?: string
  disabled?: boolean;
  icon?: IconType;
  className?: string;
} 

const Button = ({ text, loading,loadingText, disabled,className, icon: Icon,...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        ${Icon && "flex items-center justify-center gap-3"}
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
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon size={20} />}
      <span className="whitespace-nowrap">{(loading && loadingText ) ? loadingText : text }</span>
    </button>
  );
};

export default Button;
