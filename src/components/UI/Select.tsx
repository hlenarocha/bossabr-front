interface SelectProps {
  title: string;
  isMandatory: boolean;
  width?: string;
  height?: string;
  //options: string[];
}

const Select = (props: SelectProps) => {
  return (
    <div className={`flex flex-col mb-4 ${props.width}`}>
      <div className="text-sm mt-2 font-black mb-1 text-white">
        {props.title}
        <span
          className={` ${
            props.isMandatory ? "visible" : "hidden"
          } text-customYellow text-xl`}
        >
          {" "}
          *
        </span>
      </div>
      <select
        className={` ${props.height} bg-customInputGray py-2 px-4 border outline-none  rounded-[400px] border-customYellow`}
      >
        <option>Equipe 1</option>
        <option>Equipe 2</option>
        <option>Equipe 3</option>
      </select>
    </div>
  );
};

export default Select;
