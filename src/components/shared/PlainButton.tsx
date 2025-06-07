interface PlainButtonProps {
  title: string;
  width?: string;
  height?: string;
  color: string;
  titleStyle?: string;
  onClick?: () => void;
}

const PlainButton = (props: PlainButtonProps) => {
  return (
    <button onClick={props.onClick}
    className={`px-4 py-2 mt-5 rounded-[400px] ${props.width} ${props.height} ${
      props.color ? `${props.color}` : ""
    }`}>
    
      <span className={`font-bold text-customTextGray ${props.titleStyle}`}>{props.title}</span>
    </button>
  );
};

export default PlainButton;
