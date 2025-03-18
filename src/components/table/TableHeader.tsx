interface TableHeaderProps {
  columns: { width: string; content: string }[];
}

const TableHeader = (props: TableHeaderProps) => {
  return (
    <>
      <div
        className="w-full  justify-center text-white font-black font-sans flex flex-row px-2 py-0 items-center mt-4 mb-4"
        style={{
          width: "calc(100% - 86px)",
          display: "grid grid-row-1",
          gridTemplateColumns: props.columns.map((col) => col.width).join(" "),
        }}
      >
        {props.columns.map((col, index) => (
          <span
          key={index}
          className={`${col.width} text-center font-bold`}
          
          >
            {col.content}

          </span>        ))}
      </div>
    </>
  );
};

export default TableHeader;
