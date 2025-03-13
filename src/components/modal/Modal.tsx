import PlainButton from "../UI/PlainButton";
import IconHappy from "../../assets/images/famicons_happy.png";

interface PropsModal {
  // title: string;
  description?: string;
  buttonTile: string;
}

const Modal = (props: PropsModal) => {
  return (
    <>
      <div className="fixed top-0 left-0  right-0 bottom-0 backdrop-blur-sm bg-black bg-opacity-5 z-50 flex items-center justify-center">
        <div className="p-8 gap-4 justify-center relative text-white shadow-[10px_10px_30px_0px_rgba(0,0,0,0.30)] w-[600px] h-72 flex flex-col rounded-[20px] bg-customBoxGray border-[5px] border-customYellow">
          <div className="flex flex-row items-center gap-2">
            <img src={IconHappy}></img>

            <p className="text-2xl font-bold">{props.buttonTile}</p>
          </div>

          <p>{props.description}</p>
          <hr></hr>
          <PlainButton
            titleStyle="text-lg font-bold"
            title="OK"
            color="customYellow"
          ></PlainButton>
        </div>
      </div>
    </>
  );
};

export default Modal;
