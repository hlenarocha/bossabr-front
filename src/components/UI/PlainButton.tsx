interface PlainButtonProps {
  title: string;
  width?: string;
  height?: string;
  color: string;
}

const PlainButton = (props: PlainButtonProps) => {
  return <button className={`px-4 py-2 mt-5 rounded-[400px] bg-${props.color} ${props.width} ${props.height}`}>{props.title}</button>;
}

export default PlainButton;