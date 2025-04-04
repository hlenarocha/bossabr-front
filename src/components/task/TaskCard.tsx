export interface TaskCardProps {
  title: string;
  status: string;
  setActiveCard: React.Dispatch<React.SetStateAction<number | null>>;
  indexCard: number;
  activeCard: number | null;
}
const TaskCard = (props: TaskCardProps) => {
  return (
    <>
      <div
        draggable
        onDragStart={() => props.setActiveCard(props.indexCard)}
        onDragEnd={() => props.setActiveCard(null)}

        className={`${
          props.status === "não iniciada"
            ? "bg-customYellowTask"
            : props.status === "em andamento"
            ? "bg-customBlueTask"
            : props.status === "concluída"
            ? "bg-customGreenTask"
            : props.status === "atrasada"
            ? "bg-customRedTask"
            : ""
        }  ${props.activeCard === props.indexCard ? "border-4 border-white" : ""}
          flex cursor-grab items-center px-4 mb-2 h-11 rounded-[400px] shadow-[inset_5px_5px_20px_0px_rgba(82,82,82,0.16)]`}
      >
        <p>{props.title}</p>
      </div>
    </>
  );
};

export default TaskCard;