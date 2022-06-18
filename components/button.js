import { motion } from "framer-motion"
import styles from "./styles/button.module.scss"

function Button({ children, onClick, style }) {
  return (
    <motion.button
      className={styles.button}
      style={{ ...style }}
      onClick={(e) => {
        onClick && onClick(e)
      }}
      whileTap={{ "--pseudoScale": 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export default Button
