import Select, { StylesConfig } from "react-select";

// Interface para as opções, padrão do react-select
export interface SelectOption {
  value: number | string;
  label: string;
}

// Interface de props seguindo o padrão dos seus componentes
interface SearchableSelectProps {
  title: string;
  isMandatory: boolean;
  options: SelectOption[];
  value?: SelectOption | null;
  onChange: (option: SelectOption | null) => void;
  width?: string;
  height?: string;
  placeholder?: string;
  errorMessage?: string;
  name?: string;
  onBlur?: () => void;
  isSearchable?: boolean;
}

const SearchableSelect = ({
  title,
  isMandatory,
  options,
  value,
  onChange,
  width = "w-full",
  height = "h-[40px]",
  placeholder = "Selecione...",
  errorMessage,
  name,
  onBlur,
  isSearchable = true,
}: SearchableSelectProps) => {

  // Objeto de estilos usando os valores HEX diretos do seu tailwind.config.js
  const customStyles: StylesConfig<SelectOption, false> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#555555', // Cor customInputGray
      borderWidth: "1px",
      borderRadius: "20px",
      borderColor: errorMessage
        ? '#E43131' // Cor customRedAlert
        : state.isFocused
        ? '#F6BC0A' // Cor customYellow
        : '#F6BC0A', // Cor customGray para a borda neutra
      boxShadow: "none",
      minHeight: height.replace(/\[|\]/g, ''),
      "&:hover": {
        borderColor: errorMessage
          ? '#E43131' // Cor customRedAlert
          : '#F6BC0A', // Cor customYellow
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 16px",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
      margin: '0px',
      padding: '0px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#ababab", // Usando customGray para o placeholder
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#555555', // Cor customInputGray
      borderRadius: "10px",
      border: "1px solid #F6BC0A", // Cor customYellow
      overflow: 'hidden',
    }),
    option: (provided, state) => ({
      ...provided,
      color: "white",
      backgroundColor: state.isSelected
        ? 'rgba(246, 188, 10, 0.4)' // customYellow com transparência
        : state.isFocused
        ? 'rgba(246, 188, 10, 0.2)' // customYellow com transparência
        : '#555555', // Cor customInputGray
      "&:active": {
        backgroundColor: 'rgba(246, 188, 10, 0.5)',
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div className={`flex flex-col mb-2 ${width}`}>
      <div className="text-md mt-2 font-black mb-1 text-white">
        {title}
        <span className={`${isMandatory ? "visible" : "hidden"} text-customYellow`}>
          {" "}*
        </span>
      </div>

      <Select
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={isSearchable}
        onBlur={onBlur}
        placeholder={placeholder}
        styles={customStyles}
        noOptionsMessage={() => "Nenhuma opção encontrada"}
      />

      <div className="text-xs text-customRedAlert mt-1">
        {errorMessage || ""}
      </div>
    </div>
  );
};

export default SearchableSelect;