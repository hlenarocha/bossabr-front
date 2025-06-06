interface SearchBarProps {
  placeholder: string;
  marginTop?: string;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <div className={`${props.marginTop} relative flex`}>
      <input
        className={` w-96 h-12 px-4 text-white placeholder:text-gray-300 bg-customItemBackgroundGray pl-14 focus:border-2 focus:border-customYellow outline-none rounded-[400px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}
        type="text"
        placeholder={props.placeholder}
      />
      <i className="fa-solid absolute left-4 top-2 text-2xl text-gray-300 fa-magnifying-glass"></i>
    </div>
  );
};

export default SearchBar;
