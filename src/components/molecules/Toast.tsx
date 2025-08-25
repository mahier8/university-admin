// components/molecules/Toast.tsx
import styled from "@emotion/styled";
import { motion } from "framer-motion";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export const Toast = ({ message, onClose }: ToastProps) => {
  return (
    <ToastWrapper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      onClick={onClose}
    >
      {message}
    </ToastWrapper>
  );
};

const ToastWrapper = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #333;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 9999;
  margin-top: 10px;
`;
