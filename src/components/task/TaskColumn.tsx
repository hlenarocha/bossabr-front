import { useState } from "react";
import DropArea from "./DropArea";
import TaskCard, { TaskCardProps } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: TaskCardProps[];
  status: string;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  activeCard: number | null;
  onDrop: (status: string, position: number) => void;
}

const TaskColumn = (props: TaskColumnProps) => {
  const [activeDropIndex, setActiveDropIndex] = useState<number | null>(null);


  const handleDragOver = (index: number) => {
    setActiveDropIndex(index);
  };

  const handleDragLeave = () => {
    setActiveDropIndex(null);
  };

  return (
    <div 
      className="flex flex-col w-full h-[250px]"
      onDragLeave={handleDragLeave}
    >
      <div className="font-bold text-md text-center mb-4">{props.title}</div>
      <div 
        className="overflow-y-auto"
        onDragOver={(e) => {
          e.preventDefault();
          // Ativa o drop area do topo quando entra na coluna
          if (activeDropIndex === null) {
            setActiveDropIndex(-1);
          }
        }}
      >
        {/* Drop area no topo da coluna */}
        <DropArea
          status={props.status}
          onDrop={() => {
            props.onDrop(props.status, 0);
            setActiveDropIndex(null);
          }}
          isActive={activeDropIndex === -1}
        />

        {props.tasks.map((task, index) =>
          task.status === props.status ? (
            <div 
              key={index} 
              className="relative"
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(index);
              }}
            >
              {/* Task card */}
              <TaskCard
                title={task.title}
                status={task.status}
                setActiveCard={props.setActiveCard}
                indexCard={task.indexCard}
                activeCard={props.activeCard}
              />


              {/* Drop area abaixo de cada item */}
              <DropArea
                status={props.status}
                onDrop={() => {
                  props.onDrop(props.status, index + 1);
                  setActiveDropIndex(null);
                }}
                isActive={activeDropIndex === index}
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TaskColumn;