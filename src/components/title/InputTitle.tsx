interface InputTitleProps {
  title: string;
}

const InputTitle = (props: InputTitleProps) => {
  return (
    <>
    <div className="text-xl text-white font-sans font-black">{props.title}</div>
    <div className="bg-customYellow w-10 h-1 mt-1"></div>
    </>
  );
}

export default InputTitle;