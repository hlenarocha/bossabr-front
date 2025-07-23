
interface InputNumberProps {
  title: string;
  isMandatory: boolean;
  width?: string;
  height?: string; 
  min?: number;
  max?: number;
  step?: number;
  value: number; // 'value' é agora obrigatório para um componente controlado
  onChange: (value: number) => void; // 'onChange' também é obrigatório
  isReadOnly?: boolean;
  borderColor?: string;
  errorMessage?: string;
}

const InputNumber = (props: InputNumberProps) => {
  const {
    title,
    isMandatory,
    width,
    height = "h-[40px]",
    min = 0,
    max = 99,
    step = 1,
    value,
    onChange,
    isReadOnly,
    borderColor,
    errorMessage,
  } = props;

  const handleIncrement = () => {
    const newValue = value + step;
    if (newValue <= max) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const isDecrementDisabled = isReadOnly || value <= min;
  const isIncrementDisabled = isReadOnly || value >= max;

  return (
    <div className={`flex flex-col mb-2 ${width}`}>
      <div className="text-md mt-2 font-black mb-1 text-white">
        {title}
        <span
          className={`${
            isMandatory ? "visible" : "hidden"
          } text-customYellow`}
        >
          {" "}
          *
        </span>
      </div>

      <div
        className={`flex flex-row items-center justify-between bg-customInputGray w-fit rounded-[20px] p-1 ${height} ${
          isReadOnly ? "opacity-50" : ""
        } ${borderColor || "border-transparent"} border`}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
          className="w-10 h-full text-white font-bold text-lg rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          -
        </button>

        <span className="text-white font-semibold text-center w-12 select-none">
          {value}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={isIncrementDisabled}
          className="w-10 h-full text-white font-bold text-lg rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          +
        </button>
      </div>

      <div className="text-xs text-customRedAlert mt-1">{errorMessage}</div>
    </div>
  );
};

export default InputNumber;