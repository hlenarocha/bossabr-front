import InputMask from "react-input-mask";

interface InputTextProps {
  title: string;
  placeholder: string;
  isMandatory: boolean;
  width: string;
  height: string;
  stringType?: string;
  mask?: string;
  isReadOnly?: boolean;
  borderColor?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = (props: InputTextProps) => {

  return (
    <>
      <div className={`flex flex-col mb-4 ${props.width}`}>
        <div className="text-sm mt-4 font-black mb-1 text-white">
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
        <InputMask
          onChange={(e) => {
            // handleValidation(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          className={` ${
            props.height
          } ${props.isReadOnly ? "pointer-events-none caret-transparent" : ""} bg-customInputGray py-2 px-4 border outline-none  rounded-[400px] ${props.borderColor} `}
          placeholder={props.placeholder}
          type="text"
          mask={props.mask || ""}
          readOnly={props.isReadOnly || false} // atribui somente leitura ao input
        ></InputMask>
      </div>
    </>
  );
};

export default InputText;
