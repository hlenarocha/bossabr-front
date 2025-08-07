interface ColoredButtonProps {
  title: string;
  width: string;
  icon?: string;
  color: string;
  justify: string;
  marginTop?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const ColoredButton = (props: ColoredButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        type={props.type}
        className={`${props.width} border-customYellow border-2 bg-zinc-800 ${props.marginTop} flex flex-row gap-10 font-black font-sans py-2 px-4 cursor-pointer items-center ${props.justify} text-white rounded-[11px] shadow-[10px_10px_30px_0px_rgba(0,0,0,0.30)] hover:bg-opacity-30`}
      >
        <div className="text-xm font-black text-left">{props.title}</div>
        <div>
          <i className={`${props.icon} text-2xl`} aria-hidden="true"></i>
        </div>
      </button>
    </>
  );
};

export default ColoredButton;
