interface BackButtonProps {
  onClick?: () => void;
}

const BackButton = (props: BackButtonProps) => {

  return (
    <>
      <button onClick={props.onClick} className="flex flex-row items-center rounded-[11px] shadow-[10px_10px_30px_0px_rgba(0,0,0,0.30)]  justify-around bg-customYellow hover:bg-opacity-90 text-customTextGray w-[150px] p-2">
        <i className="fa-solid text-2xl fa-arrow-left"></i>
        <span className="text-[16px] font-bold">VOLTAR</span>
      </button>
    </>
  );
};

export default BackButton;
