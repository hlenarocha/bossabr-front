interface InputTextProps {
  title: string;
  placeholder: string;
  isMandatory: boolean;
  width: string;
  height: string;
  
}


const InputText = (props: InputTextProps) => {
  return (
    <>
    <div className={`flex flex-col mb-4 ${props.width}`}>
    <div className="text-sm mt-2 font-black mb-1 text-white">{props.title}<span className={` ${props.isMandatory ? "visible" : "hidden"} text-customYellow text-xl`}> *</span></div>
    <input className={` ${props.height} bg-customInputGray py-2 px-4 border outline-none border-customYellow rounded-[400px]`} placeholder={props.placeholder} type="text"></input>

    </div>
    
    </>
  );

}

export default InputText;