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
  // A cor do "trilho" agora é verde quando ativo e vermelho quando desativado
  const trackBgColor = props.isChecked ? "bg-customGreenTask" : "bg-customRedTask";
  
  // A posição da "bolinha" muda com base no estado
  const thumbPosition = props.isChecked ? "translate-x-6" : "translate-x-1";

  return (
    <div className={`flex flex-col mb-2 ${props.width}`}>
      {/* Título e indicador de campo obrigatório */}
      <div className="text-sm mt-2 font-black mb-2 text-white">
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

      {/* O container do toggle */}
      <label
        className={`relative inline-flex items-center cursor-pointer ${
          props.isReadOnly ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {/* Input checkbox real, escondido para acessibilidade */}
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={props.onChange}
          className="sr-only peer"
          disabled={props.isReadOnly}
        />

        {/* O "trilho" do toggle com as novas cores */}
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-300 ${trackBgColor}`}
        ></div>
        
        {/* A "bolinha" (thumb) */}
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${thumbPosition}`}
        ></div>
      </label>
    </div>
  );
};

export default ToggleSwitch;