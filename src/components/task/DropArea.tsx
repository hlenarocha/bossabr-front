import { useState } from "react";

const DropArea = () => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <>
        <section
          onDragEnter={() => setShowDrop(true)}
          onDragLeave={() => setShowDrop(false)}
          className="w-full px-4 transition-all ease-in-out h-11 rounded-[400px] border-dashed border-2 border-customYellow"
        ></section>
    </>
  );
};

export default DropArea;