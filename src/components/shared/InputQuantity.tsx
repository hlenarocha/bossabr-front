import { useState } from "react";

interface InputNumberProps {
  title: string;
  isMandatory: boolean;
  width?: string;
  height: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  isReadOnly?: boolean;
  borderColor?: string;
  errorMessage?: string;
  rounded?: string;
  onChange?: (value: number) => void;
}

const InputNumber = (props: InputNumberProps) => {
  const [value, setValue] = useState<number>(props.value || 1);
  const step = props.step || 1;

  const handleChange = (newValue: number) => {
    if (
      (!props.min || newValue >= props.min) &&
      (!props.max || newValue <= props.max)
    ) {
      setValue(newValue);
      if (props.onChange) props.onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      handleChange(newValue);
    }
  };

  const increment = () => handleChange(value + step);
  const decrement = () => handleChange(value - step);

  return (
    <div className={`flex flex-col mb-2 ${props.width}`}>
      <div className="text-sm mt-2 font-black mb-1 text-white">
        {props.title}
        <span
          className={`${
            props.isMandatory ? "visible" : "hidden"
          } text-customYellow text-xl`}
        >
          {" "}
          *
        </span>
      </div>
      <div className="flex flex-row gap-4 w-fit">
        <button
          type="button"
          onClick={decrement}
          className="bg-customYellow text-black hover:bg-opacity-80 rounded-full px-4 py-1 font-bold text-lg"
          disabled={props.isReadOnly}
        >
          -
        </button>

        <div className="flex items-center justify-center bg-customInputGray w-full rounded-[20px] overflow-hidden border px-4">
          <input
            type="number"
            value={value}
            onChange={handleInputChange}
            readOnly={props.isReadOnly || false}
            className={`appearance-none text-center bg-transparent outline-none w-12 ${
              props.height
            } ${
              props.isReadOnly ? "pointer-events-none caret-transparent" : ""
            }`}
            style={{
              MozAppearance: "textfield",
            }}
            onWheel={(e) => e.currentTarget.blur()} // previne scroll mudar valor
          />
        </div>
        <button
          type="button"
          onClick={increment}
          className="bg-customYellow text-black hover:bg-opacity-80 rounded-full px-4 py-1 font-bold text-lg"
          disabled={props.isReadOnly}
        >
          +
        </button>
      </div>

      <div className="text-xs text-customRedAlert mt-1">
        {props.errorMessage}
      </div>
    </div>
  );
};

export default InputNumber;
