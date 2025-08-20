import React from 'react';

// Define a estrutura de cada opção de filtro
export interface FilterOption {
  value: string;
  label: string;
  icon: string;
  baseColor: string;
  textColor: string;
}

// Define as props que o componente espera receber
interface FilterButtonGroupProps {
  options: FilterOption[];
  selectedValue: string;
  onFilterChange: (value: string) => void;
}

const FilterButtonGroup: React.FC<FilterButtonGroupProps> = ({ options, selectedValue, onFilterChange }) => {
  
  const getButtonClass = (option: FilterOption) => {
    const baseClass = "font-bold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2";
    if (selectedValue === option.value) {
      // Estilo para o botão ativo
      return `${baseClass} ${option.baseColor} ${option.textColor} ring-2 ring-offset-2 ring-offset-zinc-900 ring-white`;
    }
    // Estilo para botões inativos
    return `${baseClass} ${option.baseColor} ${option.textColor} opacity-60 hover:opacity-100`;
  };

  return (
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <button 
          key={option.value}
          onClick={() => onFilterChange(option.value)}
          className={getButtonClass(option)}
        >
          <i className={option.icon}></i>
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtonGroup;
