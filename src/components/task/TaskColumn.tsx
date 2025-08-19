import { useState } from "react";
import DropArea from "./DropArea";
import TaskCard, { TaskCardProps } from "./TaskCard";

interface Task {
  title: string;
  status: "não iniciada" | "em andamento" | "concluída" | "atrasada";
  indexCard: number;
  prazo: string;
}


interface TaskColumnProps {
  title: string;
  tasks: TaskCardProps[];
  status: string;
  //setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  //activeCard: number | null;
  //onDrop: (status: string, position: number) => void;
  onCardActionClick?: (event: React.MouseEvent, task: Task) => void;

}

const TaskColumn = (props: TaskColumnProps) => {
  // const [activeDropIndex, setActiveDropIndex] = useState<number | null>(null);
  // const [isDraggingOverColumn, setIsDraggingOverColumn] = useState(false);

  const filteredTasks = props.tasks.filter(task => task.status === props.status);
  const isEmpty = filteredTasks.length === 0;

  const statusColor = {
    "não iniciada": "bg-gray-500",
    "em andamento": "bg-blue-500",
    "concluída": "bg-green-500",
    "atrasada": "bg-red-500",
  };

  // const handleDragOver = (e: React.DragEvent, index: number) => {
  //   e.preventDefault();
  //   setActiveDropIndex(index);
  // };

  // const handleColumnDragOver = (e: React.DragEvent) => {
  //   e.preventDefault();
  //   setIsDraggingOverColumn(true);
  //   if (isEmpty) {
  //     setActiveDropIndex(0); // Força mostrar o drop area em colunas vazias
  //   } else if (activeDropIndex === null) {
  //     setActiveDropIndex(-1); // Mostra área no topo
  //   }
  // };

  // const handleDragLeave = () => {
  //   setIsDraggingOverColumn(false);
  //   setActiveDropIndex(null);
  // };

  return (
    <div
      className="flex flex-col w-full h-[250px]"
      // onDragLeave={handleDragLeave}
    >
      <div className="flex items-center just gap-2 mb-4 px-4">
        <span className={`w-3 h-3 rounded-full ${statusColor[props.status as keyof typeof statusColor]}`} />
        <h2 className="font-bold text-md text-white">{props.title}</h2>
      </div>
      <div
        className="overflow-y-auto relative min-h-[100px]"
        // onDragOver={handleColumnDragOver}
      >
        {/* Área de drop permanente para colunas vazias */}
        {/* {isEmpty && (
          <div
            className="absolute inset-0"
            onDragOver={(e) => {
              e.preventDefault();
              setActiveDropIndex(0);
            }}
          >
            <DropArea
              status={props.status}
              onDrop={() => {
                props.onDrop(props.status, 0);
                setActiveDropIndex(null);
                setIsDraggingOverColumn(false);
              }}
              isActive={isDraggingOverColumn}
            />
          </div>
        )} */}

        {/* Área no topo para colunas não vazias */}
        {/* {!isEmpty && (
          <DropArea
            status={props.status}
            onDrop={() => {
              props.onDrop(props.status, 0);
              setActiveDropIndex(null);
            }}
            isActive={activeDropIndex === -1}
          />
        )} */}

        {filteredTasks.map((task, index) => (
          <div
            key={task.indexCard}
            className="relative"
            // onDragOver={(e) => handleDragOver(e, index)}
          >
            <TaskCard
              title={task.title}
              status={task.status}
              // setActiveCard={props.setActiveCard}
              indexCard={task.indexCard}
              prazo={task.prazo}
              onActionClick={(e) => props.onCardActionClick && props.onCardActionClick(e, task)}

              // activeCard={props.activeCard}
            />

            {/* <DropArea
              status={props.status}
              onDrop={() => {
                props.onDrop(props.status, index + 1);
                setActiveDropIndex(null);
              }} */}
              {/* // isActive={activeDropIndex === index}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;