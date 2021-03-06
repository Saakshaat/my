import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./modal.module.scss"

export default function ModalCard({ children }) {
  const [isOpened, setOpened] = useState(false);
  const closed = children.length > 1 ? children[0] : null;
  const open = children.length > 1 ? children[1] : children[0];
  const node = useRef();
  const handleClick = (e) => {
    setOpened(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    if (isOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpened]);

  return (
    <AnimatePresence>
      {isOpened ? (
        <motion.div
          key={"modal"}
          ref={node}
          className={styles.modal}
          onClick={() => {
            setOpened(false);
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: "0.2",
          }}
        >
          {open}
        </motion.div>
      ) : (
        <motion.div
          onClick={() => {
            setOpened(true);
          }}
        >
          {closed}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
