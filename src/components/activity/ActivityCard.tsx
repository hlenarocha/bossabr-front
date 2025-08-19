export interface ActivityCardProps {
  message: string;
  user: string;
  date: string;
  event: string; // ex: "adicionou", "atualizou", "deletou"
}

const eventStyles: { [key: string]: { icon: string; color: string } } = {
  adicionou: { icon: "fa-solid fa-plus", color: "text-green-500" },
  atualizou: { icon: "fa-solid fa-pencil", color: "text-blue-500" },
  deletou: { icon: "fa-solid fa-trash", color: "text-red-500" },
  restaurou: { icon: "fa-solid fa-undo", color: "text-yellow-500" },
  default: { icon: "fa-solid fa-info-circle", color: "text-gray-400" },
};


const ActivityCard = (props: ActivityCardProps) => {
  const style = eventStyles[props.event] || eventStyles.default;

  return (
    <div className="w-full bg-zinc-800 p-3 rounded-lg flex items-center gap-4 shadow-sm mb-2">
      {/* Círculo com o ícone do evento */}
      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-zinc-900 ${style.color}`}>
        <i className={style.icon}></i>
      </div>

      {/* Conteúdo de texto */}
      <div className="flex-1 overflow-hidden">
        <p className="text-white text-sm font-medium truncate" title={props.message}>
          {props.message}
        </p>
        <p className="text-zinc-400 text-[10px]">{props.user} - {props.date}</p>
      </div>
    </div>
  );
}

export default ActivityCard;
