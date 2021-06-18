import styles from "./styles/actionButton.module.scss"

function ActionButton({ onClick, children, style }) {
  return (
    <button
      className={styles.button}
      onClick={() => {
        onClick()
      }}
      style={{ ...style }}
    >
      {children}
    </button>
  )
}

export default ActionButton
