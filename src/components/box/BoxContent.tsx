import { ReactNode } from "react";

interface BoxProps {
  width?: string;
  height: string;    
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const ContentBox = (prop: BoxProps) => {
  return (
    <div className={`${prop.height} ${prop.width} bg-customBoxGray bg-opacity-50 cursor-default backdrop-blur-md rounded-[20px] shadow-[5px_5px_10px_0px_rgba(17,17,17,0.15)] p-8 text-white mt-6`}>
      <div className="text-white text-2xl font-extrabold">{prop.title}</div>
      <div className="text-white text-1xl mt-2 mb-5">{prop.subtitle}</div>
      <hr className="mb-5"/>
      {prop.children}

    </div>
  );
}

export default ContentBox;