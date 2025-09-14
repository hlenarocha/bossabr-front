import TaskCard, { TaskCardProps } from "./TaskCard";

interface Task {
  title: string;
  status: "não iniciada" | "em andamento" | "concluída" | "em aprovação" | "atrasada";
  indexCard: number;
  prazo: string;
}


interface TaskColumnProps {
  title: string;
  tasks: TaskCardProps[];
  status: string;
  onCardActionClick?: (event: React.MouseEvent, task: Task) => void;
  onCardClick?: (task: Task) => void; // Adicionada: Nova prop para o clique no card

}

const TaskColumn = (props: TaskColumnProps) => {
  const filteredTasks = props.tasks.filter(task => task.status === props.status);

  const statusColor = {
    "não iniciada": "bg-gray-500",
    "em andamento": "bg-blue-500",
    "concluída": "bg-green-500",
    "em aprovação": "bg-purple-500",
    "atrasada": "bg-red-500",

  };

  return (
    <div
      className="flex flex-col w-full h-[250px]"
    >
      <div className="flex bg-zinc-900 p-2 rounded-md items-center just gap-2 mb-4 px-4">
        <span className={`w-3 h-3 rounded-full ${statusColor[props.status as keyof typeof statusColor]}`} />
        <h2 className="font-bold text-md text-white">{props.title}</h2>
      </div>
      <div
        className="overflow-y-auto relative min-h-[200px]"
      >
      

        {filteredTasks.map((task) => (
          <div
            key={task.indexCard}
            className="relative"
          >
            <TaskCard
              title={task.title}
              status={task.status}
              indexCard={task.indexCard}
              prazo={task.prazo}
              onClick={() => props.onCardClick && props.onCardClick(task)}
              onActionClick={(e) => props.onCardActionClick && props.onCardActionClick(e, task)}
            />

          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;