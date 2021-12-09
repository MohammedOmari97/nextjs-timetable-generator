import styles from "./styles/numberField.module.scss"

function NumberField({
  value,
  min,
  max,
  label,
  id,
  onChange,
  placeholder,
  style,
  disabled,
}) {
  return (
    <div className={styles.container}>
      <label for={id}>{label}</label>
      <input
        type="number"
        id={id}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e) => {
          onChange(e)
        }}
        value={value}
        style={{ ...style }}
        disabled={disabled}
      />
    </div>
  )
}

export default NumberField
