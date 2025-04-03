import DropArea from "./DropArea";
import TaskCard, { TaskCardProps } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: TaskCardProps[];
  status: string;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  activeCard: number | null;
  dragOver: boolean;
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskColumn = (props: TaskColumnProps) => {


  return (
    <>
      <div className="flex flex-col w-full h-[400px]"
      onDragOver={() => {props.setDragOver(true)}}
      onDragEnd={() => {props.setDragOver(false)}}
      >
        <div className="font-bold text-md text-center">{props.title}</div>

        {props.tasks.map((task, index) =>
          task.status === props.status ? (
            <div 
            
            
            key={index} className="flex flex-col">
              <DropArea showDrop={props.dragOver}

              />

              <TaskCard
                title={task.title}
                status={task.status}
                setActiveCard={props.setActiveCard}
                index={task.index}
                activeCard={props.activeCard}
              />
              {/* <DropArea  /> */}
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default TaskColumn;