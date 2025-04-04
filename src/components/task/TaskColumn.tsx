import DropArea from "./DropArea";
import TaskCard, { TaskCardProps } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: TaskCardProps[];
  status: string;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  activeCard: number | null;
  dragOver: boolean;
  indexColumn: number;
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  onDrop: (status: string, position: number) => void;
}

const TaskColumn = (props: TaskColumnProps) => {
  
  return (
    <>
      <div
        className="flex flex-col w-full h-[400px]"
        onDragOver={() => {
          props.setDragOver(true);
        }}
        onDragEnd={() => {
          props.setDragOver(false);
        }}
        key={props.indexColumn}
      >
        <div className="font-bold text-md text-center mb-4">{props.title}</div>
        {/* DropArea não aparece na mesma coluna que activeCard está OnDrag */}
        {props.activeCard !== null && props.tasks[props.activeCard].status !== props.status && (
          <DropArea showDrop={props.dragOver} />
        )}

        {props.tasks.map((task, index) =>
          task.status === props.status ? (
            <div key={index} className="flex flex-col">
              <TaskCard
                title={task.title}
                status={task.status}
                setActiveCard={props.setActiveCard}
                indexCard={task.indexCard}
                activeCard={props.activeCard}
              />
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default TaskColumn;
