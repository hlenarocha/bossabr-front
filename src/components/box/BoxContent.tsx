import { ReactNode } from "react";

interface BoxProps {
  width: string;
  height: string;    
  children: ReactNode;
}

const ContentBox = (prop: BoxProps) => {
  return (
    <div className={`${prop.height} ${prop.width} bg-customBoxGray opacity-75 rounded-[20px] shadow-[5px_5px_10px_0px_rgba(17,17,17,0.15)] p-5 text-white mt-6`}>
      <div>{prop.children}</div>
    </div>
  );
}

export default ContentBox;