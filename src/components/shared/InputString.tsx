import InputMask from "react-input-mask";

interface InputStringProps {
  title: string;
  placeholder: string;
  isMandatory: boolean;
  width?: string;
  height: string;
  stringType?: string;
  mask?: string;
  isReadOnly?: boolean;
  borderColor?: string;
  errorMessage?: string;
  rounded?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputString = (props: InputStringProps) => {
  return (
    <>
      <div className={`flex flex-col mb-2 ${props.width}`}>
        <div className="text-md mt-2 font-black mb-1 text-white">
          {props.title}
          <span
            className={` ${
              props.isMandatory ? "visible" : "hidden"
            } text-customYellow`}
          >
            {" "}
            *
          </span>
        </div>
        <InputMask
          onChange={(e) => {
            // handleValidation(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          className={` ${props.height} ${
            props.isReadOnly ? "pointer-events-none caret-transparent" : ""
          } bg-customInputGray py-2 px-4 border outline-none rounded-[20px] ${
            props.borderColor
          } `}
          placeholder={props.placeholder}
          type="text"
          mask={props.mask || ""}
          readOnly={props.isReadOnly || false} // atribui somente leitura ao input
        ></InputMask>
        <div className="text-xs text-customRedAlert mt-1">
          {props.errorMessage}
        </div>
      </div>
    </>
  );
};

export default InputString;
