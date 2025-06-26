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
          animate={{ opacity: 1, height: "70px" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          onDrop={props.onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="
            w-full my-2 px-4 py-3 rounded-xl border-2 border-[#F6BC0A] border-dashed
            bg-[#2a2a2a] text-center flex items-center justify-center
          "
        >
          <span className="text-[#F6BC0A] font-medium text-sm tracking-wide">
            SOLTE AQUI
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropArea;
