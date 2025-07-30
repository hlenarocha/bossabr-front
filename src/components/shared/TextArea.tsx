import { forwardRef } from "react";

interface TextAreaProps {
  title: string;
  placeholder: string;
  isMandatory: boolean;
  width?: string;
  height: string;
  isReadOnly?: boolean;
  borderColor?: string;
  errorMessage?: string;
  rounded?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return (
      <div className={`flex flex-col mb-2 ${props.width}`}>
        <label className="text-md mt-2 font-black mb-1 text-white">
          {props.title}
          <span
            className={`${
              props.isMandatory ? "visible" : "hidden"
            } text-customYellow`}
          >
            {" "}
            *
          </span>
        </label>

        <textarea
          ref={ref}
          value={props.value || ""}
          onChange={(e) => {
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          className={`
          ${props.height}
          ${props.isReadOnly ? "pointer-events-none caret-transparent" : ""}
          bg-customInputGray py-2 px-4 border outline-none
          ${props.rounded ? props.rounded : "rounded-[20px]"}
          ${props.borderColor}
        `}
          placeholder={props.placeholder}
          readOnly={props.isReadOnly || false}
        ></textarea>

        {props.errorMessage && (
          <div className="text-xs text-customRedAlert mt-1">
            {props.errorMessage}
          </div>
        )}
      </div>
    );
  }
);

export default TextArea;
