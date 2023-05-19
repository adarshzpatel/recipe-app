
interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-3xl font-bold">{title}</div>
      <div className="text-neutral-500 mt-2 text-lg ">{subtitle}</div>
    </div>
  );
};

export default Heading;
