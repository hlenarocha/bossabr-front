interface TableItemProps {
  // array de colunas com largura especificada e conteúdo
  itemWidth?: string;
  itemHeight?: string;
  columns: { width: string; content: React.ReactNode }[];
  icon?: string;
  onClick?: () => void;
  isTableHeader?: boolean
}

const TableItem = (props: TableItemProps) => {
  return (
    <div
      className={`${props.isTableHeader ? "bg-stone-800 font-black border-customYellow border" : "bg-customItemBackgroundGray"} ${props.itemHeight} w-full flex flex-row px-2 py-0 items-center rounded-[400px] mt-4`}
      style={{
        display: "grid",
        gridTemplateColumns: props.columns.map((col) => col.width).join(" "),
      }}
    >
      {props.columns.map((col, index) => (
        <div
          key={index}
          className="ml-4 flex items-center min-w-0 overflow-hidden"
        >
          <span
            className="truncate"
            title={typeof col.content === "string" ? col.content : undefined}
          >
            {col.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TableItem;
