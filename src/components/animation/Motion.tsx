import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionProps {
  children: ReactNode;
}

export const Motion = ({ children }: MotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};