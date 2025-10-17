import { formatDateToBR } from "@/utils/formatDate";
import { useMemo } from "react";

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
  lastActivityStatus?: string | null;
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

  const feedbackIcon = useMemo(() => {
    if (!props.lastActivityStatus) return null;

    const lastStatus = props.lastActivityStatus.toLowerCase();

    if (lastStatus === "aprovada") {
      return (
        <div
          className=" bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
          title="Última atividade aprovada"
        >
          <i className="fa-solid fa-check text-xs"></i>
        </div>
      );
    }

    if (lastStatus === "reprovada") {
      return (
        <div
          className=" bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
          title="Última atividade reprovada (requer ajustes)"
        >
          <i className="fa-solid fa-times text-xs"></i>
        </div>
      );
    }

    return null; // Não mostra ícone para outros status como "Em execução"
  }, [props.lastActivityStatus]);

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (props.onActionClick) {
      props.onActionClick(e);
    }
  };

  return (
    <div
      onClick={props.onClick}
      className="bg-zinc-800 rounded-xl px-4 py-3 mb-3 hover:bg-zinc-700 cursor-pointer shadow-md flex items-center gap-4 transition-colors relative"
    >
      {/* Bolinha de status à esquerda */}
      <div
        className={`w-3 h-3 rounded-full flex-shrink-0 ${
          statusColor[props.status]
        }`}
        title={`Status: ${props.status}`}
      ></div>

      <div className="flex-1 min-w-0">
        {/*
         'line-clamp-2'.
        */}
        <p
          title={props.title}
          className="text-white font-medium text-sm line-clamp-2"
        >
          {props.title}
        </p>
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
        {feedbackIcon ? feedbackIcon : <i className={currentAction.icon}></i>}
      </button>
    </div>
  );
};

export default TaskCard;
