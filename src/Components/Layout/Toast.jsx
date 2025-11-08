import { useSelector, useDispatch } from "react-redux";
import { clearToast } from "../../Store/toast/toastSlice";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const { type, message } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => dispatch(clearToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, x: 100 }}          // inicia fuera de pantalla
          animate={{ opacity: 1, x: 0 }}            // entra suavemente
          exit={{ opacity: 0, x: 100 }}             // se desliza de nuevo al salir
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium z-52
            ${type === "success" ? "bg-green-700" : "bg-red-700"}
          `}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

