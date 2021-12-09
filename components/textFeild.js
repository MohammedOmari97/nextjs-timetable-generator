import { useEffect, useState, forwardRef } from "react"
import styles from "./styles/textField.module.scss"

const TextFeild = forwardRef(function TextFeild(
  { value, placeholder, pattern, label, className, onChange, id },
  ref
) {
  const [valid, setValid] = useState(false)
  const [didFocus, setDidFocus] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (didFocus && value?.trim().length > 3) {
      setValid(true)
      setError(false)
    } else if (didFocus && value?.trim().length < 3) {
      setValid(false)
    }
  }, [value])

  return (
    <div className={styles.container}>
      <label for={id}>{label}</label>
      <div>
        <input
          className={`${styles.input} ${error ? styles.inputError : undefined}`}
          value={value}
          onChange={(e) => {
            onChange(e)
          }}
          type="text"
          aria-labelledBy={label}
          id={id}
          placeholder={placeholder}
          onFocus={() => {
            setDidFocus(true)
          }}
          onBlur={() => {
            if (!value || value.trim().length < 3) {
              setValid(false)
              // setError(true)
            }
          }}
          required
          ref={ref}
        />
        <svg
          class="octicon octicon-check js-clipboard-check-icon mx-1 d-inline-block color-text-success d-none"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true"
          hidden={valid === false}
        >
          <path
            fill-rule="evenodd"
            d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
          ></path>
        </svg>
      </div>
    </div>
  )
})

export default TextFeild
