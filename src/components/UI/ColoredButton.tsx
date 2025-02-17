interface ColoredButtonProps {
  title: string;
  width: string;
  icon: string;
  color: string;
}

const ColoredButton = (props: ColoredButtonProps) => {
  return (
    <>
      <div className={`${props.width} bg-${props.color} flex flex-row gap-4 font-sans p-2 cursor-pointer items-center justify-center text-white rounded-[11px] shadow-[10px_10px_30px_0px_rgba(0,0,0,0.30)]`}>
        <div className="text-1xl font-black">{props.title}</div>
          <i className={props.icon} aria-hidden="true"></i>
      </div>
    </>
  );
};

export default ColoredButton;
