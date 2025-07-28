import PlainButton from "@/components/shared/PlainButton";

interface PropsModal {
  description?: string;
  title?: string;
  buttonTitle1?: string;
  buttonTitle2?: string;
  buttonColor1?: string;
  buttonColor2?: string;
  onClick1?: () => void;
  onClick2?: () => void;
  isModalVisible: boolean;
  iconImage?: string;
  iconName?: string;
  children?: React.ReactNode;
  iconColor?: string;
  isError?: boolean;
}

const Modal = (props: PropsModal) => {
  return (
    <>
      <div
        className={`${
          props.isModalVisible ? "visible" : "hidden"
        } fixed top-0 left-0  right-0 bottom-0 backdrop-blur-sm bg-black bg-opacity-5 z-50 flex items-center justify-center`}
      >
        <div
          className={`p-8 gap-4 justify-center relative text-white shadow-[10px_10px_30px_0px_rgba(0,0,0,0.30)] w-[600px] h-fit flex flex-col rounded-[20px] bg-zinc-800 border-[5px] ${
            props.isError ? "border-customRedTask" : "border-customYellow"
          }`}
        >
          <div className="flex flex-row items-center gap-2">
            <img src={props.iconImage}></img>
            {props.iconName && (
              <i
                className={`fa-solid ${props.iconName} text-4xl ${
                  props.iconColor ? props.iconColor : "text-customYellow"
                } mr-2`}
              ></i>
            )}

            <p className="text-2xl font-bold">{props.title}</p>
          </div>

          <p className="text-wrap text-ellipsis truncate">{props.description}</p>
          <hr></hr>
          <p>{props.children}</p>

          <div className="flex gap-4 justify-center w-[100%]">
            <PlainButton
              onClick={props.onClick1}
              titleStyle="text-lg font-bold"
              title={props.buttonTitle1 || ""}
              color={props.buttonColor1 || "bg-customYellow"}
              width="w-[50%]"
            ></PlainButton>
            {props.buttonTitle2 && props.onClick2 && props.buttonColor2 && (
              <PlainButton
                onClick={props.onClick2}
                titleStyle="text-lg font-bold"
                title={props.buttonTitle2}
                color={props.buttonColor2 || "bg-customRedAlert"}
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
