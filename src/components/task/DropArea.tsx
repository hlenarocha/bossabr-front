import { AnimatePresence, motion } from "framer-motion";

interface DropAreaProps {
  isActive: boolean;
  onDrop: () => void;
  status: string;
}

const DropArea = (props: DropAreaProps) => {
  return (
    <AnimatePresence>
      {props.isActive && (
        <motion.div
          layout
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "40px" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          onDrop={props.onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full my-1 rounded-full border-2 border-customYellow border-dashed flex items-center justify-center"
        >
          <span className="text-customYellow">SOLTE AQUI</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropArea;