import DropArea from "./DropArea";
import TaskCard, { TaskCardProps } from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: TaskCardProps[];
  status: string;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  activeCard: number | null;
}

const TaskColumn = (props: TaskColumnProps) => {
  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <div className="font-bold text-md text-center mb-4">{props.title}</div>

        {props.tasks.map((task, index) =>
          task.status === props.status ? (
            <div key={index} className="flex flex-col ">
              <DropArea />

              <TaskCard
                title={task.title}
                status={task.status}
                setActiveCard={props.setActiveCard}
                index={task.index}
                activeCard={props.activeCard}
              />
              <DropArea />
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default TaskColumn;