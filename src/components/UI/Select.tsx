interface SelectProps {
  title: string;
  isMandatory: boolean;
  width?: string;
  height?: string;
  options: { id: number; name: string, className?: string; }[];
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
        onChange={props.onChange}
        className={` ${props.height} bg-customInputGray py-2 px-4 border outline-none  rounded-[400px] border-customYellow`}
      >
        {props.options.map((option) => (
          <option 
          key={option.id} 
          value={option.id}
          className={option.className}
          >
            {option.name}
          </option>

        ))}
      </select>
      <div className="text-xs text-customRedAlert mt-1">
          {props.errorMessage}
        </div>
    </div>
  );
};

export default Select;
