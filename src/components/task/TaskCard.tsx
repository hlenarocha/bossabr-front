import { formatDateToBR } from "@/utils/formatDate";

export interface TaskCardProps {
  title: string;
  status:
    | "não iniciada"
    | "em andamento"
    | "concluída"
    | "em aprovação"
    | "atrasada";
  indexCard: number;
  prazo: string;
  onClick?: () => void;
  onActionClick?: (event: React.MouseEvent) => void;
}

// Mapeamento de cores para a bolinha de status
const statusColor = {
  "não iniciada": "bg-gray-500",
  "em andamento": "bg-blue-500",
  concluída: "bg-green-500",
  "em aprovação": "bg-purple-500",
  atrasada: "bg-red-500",
};

// Mapeamento de estilos para o botão de ação à direita
const actionStyles = {
  "não iniciada": {
    icon: "fa-solid fa-play",
    hover: "hover:bg-yellow-500",
    title: "Iniciar Demanda",
  },
  "em andamento": {
    icon: "fa-solid fa-plus",
    hover: "hover:bg-blue-500",
    title: "Registrar Atividade",
  },
  concluída: {
    icon: "fa-solid fa-flag-checkered",
    hover: "hover:bg-green-500",
    title: "Ver Entrega",
  },
  "em aprovação": {
    icon: "fa-solid fa-hourglass-half",
    hover: "hover:bg-purple-500",
    title: "Aguardando Aprovação",
  },
  atrasada: {
    icon: "fa-solid fa-exclamation-triangle",
    hover: "hover:bg-red-500",
    title: "Resolver Pendência",
  },
};

const TaskCard = (props: TaskCardProps) => {
  const currentAction = actionStyles[props.status];

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.onActionClick) {
      props.onActionClick(e);
    }
  };

  return (
    <div
      onClick={props.onClick}
      className="bg-zinc-800 rounded-xl px-4 py-3 mb-3 hover:bg-zinc-700 cursor-pointer shadow-md flex items-center gap-4 transition-colors"
    >
      {/* Bolinha de status à esquerda */}
      <div
        className={`w-3 h-3 rounded-full flex-shrink-0 ${
          statusColor[props.status]
        }`}
        title={`Status: ${props.status}`}
      ></div>

      {/* Conteúdo principal (ocupa o espaço restante) */}
      <div className="flex-1">
        <p className="text-white font-medium text-sm">{props.title}</p>
        <p className="text-xs text-gray-400 mt-1">
          Prazo: {formatDateToBR(props.prazo)}
        </p>
      </div>

      {/* Botão de ação à direita */}
      <button
        className={`w-10 h-10 flex items-center justify-center bg-zinc-700 text-white text-lg rounded-full transition-colors flex-shrink-0 ${currentAction.hover}`}
        title={currentAction.title}
        onClick={handleActionClick}
      >
        <i className={currentAction.icon}></i>
      </button>
    </div>
  );
};

export default TaskCard;
