interface TableHeaderProps {
  columns: { width: string; content: string }[];
}

const TableHeader = (props: TableHeaderProps) => {
  return (
    <>
      <div
        className="w-full flex ml-4 justify-start text-white font-black items-center mt-4 mb-2"
        style={{
          // width: "calc(100% - 10%)",
          display: "grid grid-row-1",
          gridTemplateColumns: props.columns.map((col) => col.width).join(" "),
        }}
      >
        {props.columns.map((col, index) => (
          <span
          key={index}
          className={`${col.width} items-center justify-start text-center flex font-bold`}
          
          >
            {col.content}

          </span>        ))}
      </div>
    </>
  );
};

export default TableHeader;
