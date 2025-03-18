import PlainButton from "../UI/PlainButton";

interface PropsModal {
  description?: string;
  title?: string;
  buttonTitle1?: string;
  buttonTitle2?: string;
  buttonColor1?: string;
  buttonColor2: string;
  onClick1?: () => void;
  onClick2?: () => void;
  isModalVisible: boolean;
  iconImage?: string;
  iconName?: string;
}

const Modal = (props: PropsModal) => {
  return (
    <>
      <div
        className={`${
          props.isModalVisible ? "visible" : "hidden"
        } fixed top-0 left-0  right-0 bottom-0 backdrop-blur-sm bg-black bg-opacity-5 z-50 flex items-center justify-center`}
      >
        <div className="p-8 gap-4 justify-center relative text-white shadow-[10px_10px_30px_0px_rgba(0,0,0,0.30)] w-[600px] h-72 flex flex-col rounded-[20px] bg-customBoxGray border-[5px] border-customYellow">
          <div className="flex flex-row items-center gap-2">
            <img src={props.iconImage}></img>
            {props.iconName && (<i className={`fa-solid ${props.iconName} text-4xl text-customYellow mr-2`}></i>)}

            <p className="text-2xl font-bold">{props.title}</p>
          </div>

          <p>{props.description}</p>
          <hr></hr>

          <div className="flex gap-4 justify-center w-[100%]">
            <PlainButton
              onClick={props.onClick1}
              titleStyle="text-lg font-bold"
              title={props.buttonTitle1 || ""}
              color={props.buttonColor1 || "customYellow"}
              width="w-[50%]"
            ></PlainButton>
            {props.buttonTitle2 && props.onClick2 && props.buttonColor2 && (
              <PlainButton
                onClick={props.onClick2}
                titleStyle="text-lg font-bold"
                title={props.buttonTitle2}
                color={props.buttonColor2}
                width="w-[50%]"
              ></PlainButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
