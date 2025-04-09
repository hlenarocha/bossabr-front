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
  onDrop: (status: string, position: number) => void;
}

const TaskColumn = (props: TaskColumnProps) => {
 

  return (
    <>
      <div
        className="flex flex-col w-full h-[250px]"
        onDragOver={() => {
          props.setDragOver(true);
        }}
        onDragEnd={() => {
          props.setDragOver(false);
          props.setActiveCard(null);
        }}
      >
        <div className="font-bold text-md text-center mb-4 ">{props.title}</div>
        <div className="overflow-y-auto">
          {/* {props.activeCard !== null && activeTask?.status !== props.status && ( */}
            <DropArea
              status={props.status}
              onDrop={() => props.onDrop(props.status, 0)}
              setDragOver={props.setDragOver}
              dragOver={props.dragOver}
            />
          {/* )} */}

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
                {/* {props.activeCard !== null &&
                  activeTask?.status !== props.status && ( */}
                    <DropArea
                    status={props.status}
                      onDrop={() => props.onDrop(props.status, index + 1)}
                      setDragOver={props.setDragOver}
                      dragOver={props.dragOver}
                    />
                  {/* )} */}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default TaskColumn;
