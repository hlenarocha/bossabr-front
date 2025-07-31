export interface TaskCardProps {
  title: string;
  status: string;
  setActiveCard?: React.Dispatch<React.SetStateAction<number | null>>;
  indexCard: number;
  activeCard?: number | null;
  onClick?: () => void; // Optional click handler for additional functionality
}

const statusColor = {
  "não iniciada": "bg-gray-500",
  "em andamento": "bg-blue-500",
  "concluída": "bg-green-500",
  "atrasada": "bg-red-500",
};

const TaskCard = (props: TaskCardProps) => {
  return (
    <div
      draggable={!!props.setActiveCard}
      onDragStart={() => props.setActiveCard?.(props.indexCard)}
      onDragEnd={() => props.setActiveCard?.(null)}
      onClick={props.onClick}
      className={`
        ${props.activeCard === props.indexCard ? "border-2 border-[#F6BC0A]" : "border border-[#2d2d2d]"}
        bg-customBlackBackground rounded-xl px-4 py-3 mb-3 shadow-md flex items-center gap-4 transition-transform
        ${props.setActiveCard ? "cursor-grab" : "cursor-default"}
      `}
    >
      {/* Bolinha de status */}
      <div className={`w-3 h-3 rounded-full ${statusColor[props.status as keyof typeof statusColor]}`}></div>

      {/* Conteúdo principal */}
      <div className="flex-1">
        <p className="text-white font-medium text-sm">{props.title}</p>
        <p className="text-xs text-gray-400 mt-1">Prazo: 15/08/2025</p> 
      </div>
    </div>
  );
};

export default TaskCard;
