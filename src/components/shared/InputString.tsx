import React from "react";
import { IMaskInput } from "react-imask";
import { MaskedOptions } from "imask";

interface InputStringProps {
  title: string;
  placeholder: string;
  isMandatory: boolean;
  width?: string;
  height: string;
  mask?: MaskedOptions["mask"];
  isReadOnly?: boolean;
  borderColor?: string;
  errorMessage?: string;
  value?: string;
  name?: string;
  onChange?: (event: any) => void;
  onBlur?: () => void;
}

const InputString = React.forwardRef<HTMLInputElement, InputStringProps>(
  (props, ref) => {
    const {
      title,
      placeholder,
      isMandatory,
      width,
      height,
      mask,
      isReadOnly,
      borderColor,
      errorMessage,
      value,
      name,
      onChange,
      onBlur,
    } = props;

    const commonProps = {
      name,
      value: value || "",
      onBlur,
      placeholder,
      className: `${height} ${
        isReadOnly ? "pointer-events-none caret-transparent" : ""
      } bg-customInputGray py-2 px-4 border outline-none rounded-[20px] ${borderColor}`,
      readOnly: isReadOnly || false,
    };

    return (
      <div className={`flex flex-col mb-2 ${width}`}>
        <div className="text-md mt-2 font-black mb-1 text-white">
          {title}
          <span className={`${isMandatory ? "visible" : "hidden"} text-customYellow`}>
            {" "}
            *
          </span>
        </div>

        {mask ? (
          <IMaskInput
            {...commonProps}
            mask={mask as any} // forçando compatibilidade com IMaskInput
            unmask={true}
            lazy={false}
            inputRef={ref}
            onAccept={(val: any) => {
              onChange?.({ target: { value: val ?? "" } });
            }}
          />
        ) : (
          <input
            {...commonProps}
            ref={ref}
            onChange={onChange}
          />
        )}

        <div className="text-xs text-customRedAlert mt-1">{errorMessage}</div>
      </div>
    );
  }
);

InputString.displayName = "InputString";

export default InputString;
