import { useState } from "react";

interface DropAreaProps {
  // setShowDrop: React.Dispatch<React.SetStateAction<boolean>>;
  showDrop: boolean;
}

const DropArea = (props: DropAreaProps) => {


  // mudar lógica para que apareçam os DropArea na coluna em que está OnDrag
  return (
    <>
      <div
      // onDragEnter={() => props.setShowDrop(true)}
      className={`${props.showDrop ? "hidden" : "block"} w-full h-2`} ></div>

        <section
          // onDragEnd={() => setShowDrop(false)}
          className={`${props.showDrop ? "block" : "hidden"} w-full justify-center items-center flex text-customYellow bg-white bg-opacity-10 mt-4 mb-4 px-4 transition-all ease-in-out h-11 rounded-[400px] border-dashed border-2 border-customYellow`}
        >SOLTE AQUI</section>
    </>
  );
};

export default DropArea;