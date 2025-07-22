interface TableItemProps {
  // array de colunas com largura especificada e conteúdo
  itemWidth: string;
  itemHeight: string;
  columns: { width: string; content: React.ReactNode }[];
  icon: string;
  onClick?: () => void;
}

const TableItem = (props: TableItemProps) => {
  return (
    <>
      <div
        className={`${props.itemWidth} ${props.itemHeight} bg-customItemBackgroundGray flex-row px-2 py-0  items-center rounded-[400px] mt-4 flex`}
        style={{
          display: "grid grid-row-1",
          gridTemplateColumns: props.columns.map((col) => col.width).join(" "),
        }}
      >
        {props.columns.map((col, index) => (
          <div
            key={index}
            className={`${col.width} ml-4 h-8 items-center flex flex-row justify-start border-r-2`}
          >
            {col.content}
          </div>
        ))}
        <div className="w-[10%] justify-center flex">
          <i onClick={props.onClick}
            className={`${props.icon} fa-solid text-md cursor-pointer hover:opacity-80`}
          ></i>
        </div>
      </div>
    </>
  );
};

export default TableItem;
