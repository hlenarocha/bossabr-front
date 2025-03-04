import { useState } from "react";
import InputMask from "react-input-mask";

interface InputTextProps {
  title: string;
  placeholder: string;
  isMandatory: boolean;
  width: string;
  height: string;
  stringType?: string;
  mask?: string;
  borderColor?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = (props: InputTextProps) => {
  const [error, setError] = useState(false);

  // const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (props.stringType === "email") {
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //     if (!emailRegex.test(e.target.value)) {
  //       setError(true);
  //     } else {
  //       setError(false);
  //     } 

  //   } else if (props.stringType === "text") {
  //     const textRegex = /^[A-Za-z\s]+$/;
      
  //     if (!textRegex.test(e.target.value) || e.target.value.length === 0 || e.target.value.length > 50) {
  //       setError(true);
  //     } else {
  //       setError(false);
  //     }
  //   }
  // };

  return (
    <>
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
        <InputMask
          onChange={(e) => {
            // handleValidation(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          className={` ${
            props.height
          } bg-customInputGray py-2 px-4 border outline-none  rounded-[400px] ${props.borderColor} `}
          placeholder={props.placeholder}
          type="text"
          mask={props.mask || ""}
        ></InputMask>
      </div>
    </>
  );
};

export default InputText;
