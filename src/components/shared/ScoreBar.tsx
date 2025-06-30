
interface ScoreBarProps {
  user?: string;
}

const ScoreBar = (props: ScoreBarProps) => {

  return (
    <div className="flex relative text-customTextGray font-bold w-full items-center shadow-[0px_10px_15px_0px_rgba(0, 0, 0, 0.089)] bg-zinc-100 h-10 rounded-[400px] mt-4">
      <div className="bg-customYellow flex items-center p-4 rounded-l-[400px] absolute h-full w-2/3">
      <div>{props.user}</div>
      <div className="right-4 absolute">20</div>
      </div>
      <div className="right-4 text-customInputGray absolute">30</div>

    </div>
  );
};

export default ScoreBar;