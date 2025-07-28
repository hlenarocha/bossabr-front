import React from "react";

interface ToggleSwitchProps {
  title: string;
  isMandatory: boolean;
  isChecked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  isReadOnly?: boolean;
}

const ToggleSwitch = (props: ToggleSwitchProps) => {
  const trackBgColor = props.isChecked ? "bg-customGreenTask" : "bg-customRedTask";
  
  const thumbPosition = props.isChecked ? "translate-x-6" : "translate-x-1";

  return (
    <div className={`flex flex-col mb-2 ${props.width}`}>
      <div className="text-md mt-2 font-black mb-2 text-white">
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

      <label
        className={`relative inline-flex items-center cursor-pointer ${
          props.isReadOnly ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={props.onChange}
          className="sr-only peer"
          disabled={props.isReadOnly}
        />

        <div
          className={`w-12 h-6 rounded-full transition-colors duration-300 ${trackBgColor}`}
        ></div>
        
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${thumbPosition}`}
        ></div>
      </label>
    </div>
  );
};

export default ToggleSwitch;