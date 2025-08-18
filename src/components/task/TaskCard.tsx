import { formatDateToBR } from "@/utils/formatDate";

export interface TaskCardProps {
  title: string;
  status: string;
  setActiveCard?: React.Dispatch<React.SetStateAction<number | null>>;
  indexCard: number;
  activeCard?: number | null;
  onClick?: () => void; // Optional click handler for additional functionality
  prazo: string;
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
      // draggable={!!props.setActiveCard}
      // onDragStart={() => props.setActiveCard?.(props.indexCard)}
      // onDragEnd={() => props.setActiveCard?.(null)}
      title="Ver detalhes"
      onClick={props.onClick}
      className={`
        ${props.activeCard === props.indexCard ? "border-2 border-[#F6BC0A]" : "border border-[#2d2d2d]"}
        bg-customBlackBackground rounded-xl px-4 py-3 mb-3 hover:bg-zinc-700 cursor-pointer shadow-md flex items-center gap-4 transition-transform
        ${props.setActiveCard ? "cursor-grab" : "cursor-default"}
      `}
    >
      {/* Bolinha de status */}
      <div className={`w-3 h-3 rounded-full ${statusColor[props.status as keyof typeof statusColor]}`}></div>

      {/* Conteúdo principal */}
      <div className="flex-1">
        <p className="text-white font-medium text-sm">{props.title}</p>
        <p className="text-xs text-gray-400 mt-1">Prazo: {formatDateToBR(props.prazo)}</p> 
      </div>
        {/* select para mudar status */}
        {/* <select
          onChange={(e) => console.log(e.target.value)}
          className="bg-zinc-700 text-white text-sm rounded-md px-2 py-1"
          value={props.status}
        >
          <option value="não iniciada">Não Iniciada</option>
          <option value="em andamento">Em Andamento</option>
          <option value="concluída">Concluída</option>
          <option value="atrasada">Atrasada</option>
        </select> */}
      {/* Botão de ação */}
      
      <button
      className={`bg-zinc-700 text-white text-sm rounded-md px-2 py-1
      ${props.status === "não iniciada" ? "hover:bg-[#F6BC0A]" : "hover:bg-zinc-600"}
      `}
      onClick={() => console.log("Clicou no botão")}
      >
      {props.status === "não iniciada" ? (
        <i className="fa-solid fa-play"></i>
      ) : props.status === "em andamento" ? (
        <i className="fa-solid fa-edit"></i>
      ) : props.status === "concluída" ? (
        <i className="fa-solid fa-flag-checkered"></i>
      ) : (
        <i className="fa-solid fa-exclamation-triangle"></i>
      )}

      </button>
    </div>
  );
};

export default TaskCard;
