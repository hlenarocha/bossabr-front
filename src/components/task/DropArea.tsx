import { AnimatePresence, motion } from "framer-motion";

interface DropAreaProps {
  dragOver: boolean;
  setDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  onDrop: () => void;
  status: string;
}

const DropArea = (props: DropAreaProps) => {
  return (
    <>
      <AnimatePresence>
        {props.dragOver && (
          <motion.section
            layout
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.5, ease: "backInOut" }}
            onDrop={() => {
              props.onDrop();
              props.setDragOver(false);
            }}
            onDragOver={(e) => {e.preventDefault()}}
            className={`${
              props.status === "não iniciada"
              ? "border-customYellowTask text-customYellowTask"
              : props.status === "em andamento"
              ? "border-customBlueTask text-customBlueTask"
              : props.status === "concluída"
              ? "border-customGreenTask text-customGreenTask"
              : props.status === "atrasada"
              ? "border-customRedTask text-customRedTask"
              : ""
              
            } w-full flex justify-center items-center bg-white bg-opacity-5 mb-2 px-4 h-11 rounded-[400px] border-dashed border-2 `}
          >
            SOLTE AQUI
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default DropArea;
