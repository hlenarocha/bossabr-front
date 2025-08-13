interface InputTitleProps {
  title: React.ReactNode;
  marginTop?: string;
}

const InputTitle = (props: InputTitleProps) => {
  return (
    <>
      <div className={`flex flex-col ${props.marginTop}`}>
        <div className="text-xl text-white font-sans font-black">
          {props.title}
        </div>
        <div className="bg-customYellow rounded-sm w-10 h-2 mt-1"></div>
      </div>
    </>
  );
};

export default InputTitle;
