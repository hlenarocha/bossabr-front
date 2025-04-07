interface ActivityCardProps {
  width: string;
  title: string;
  details: string;
  


}

const ActivityCard = (props: ActivityCardProps) => {
  return (
    <div className={`${props.width} h-12 bg-white p-4 rounded-[400px] flex flex-col justify-center shadow-[0px_10px_15px_0px_rgba(104,104,104,0.25)]`}>
      <div className="text-zinc-700 text-xs">{props.title}</div>
      <div className="text-stone-500 text-[8px]">{props.details}</div>
      
    </div>
  );
}

export default ActivityCard;