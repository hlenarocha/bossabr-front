
import SearchableSelect, { SelectOption } from './SearchableSelect'; // Ajuste o caminho do import se necessário

interface FilterSelectProps {
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  className?: string; 
}

const FilterSelect = ({
  options,
  value,
  onChange,
  placeholder,
  className = 'w-full',
}: FilterSelectProps) => {

  const selectedOption = options.find((option) => option.value === value) || null;

  const handleChange = (option: SelectOption | null) => {
    onChange(option ? String(option.value) : null);
  };

  return (
    <div className={className}>
      <SearchableSelect
        title="" 
        isMandatory={false}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        // Desativa a busca, tornando-o um dropdown simples
        isSearchable={false}
        height="h-[40px]"
      />
    </div>
  );
};

export default FilterSelect;