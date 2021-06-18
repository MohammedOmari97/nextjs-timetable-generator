import { useState } from "react"
import Button from "./button"
import styles from "./styles/form.module.scss"
import { addSubject, addColorForSubject } from "../store/reducers"
import { useDispatch } from "react-redux"
import TextFeild from "./textFeild"
import NumberField from "./numberField"
import Link from "next/link"
import ActionButton from "./actionButton"
// import { useField } from "../hooks/useField"

function Form() {
  const [name, setName] = useState()
  const [nameError, setNameError] = useState()
  const [instructor, setInstructor] = useState()
  const [instructorError, setInstructorError] = useState()
  const [hpw, setHpw] = useState(1)
  const [level, setLevel] = useState(1)
  const dispatch = useDispatch()

  const [error, setError] = useState(null)

  return (
    <form className={styles.form}>
      <TextFeild
        placeholder="Enter the subject's name"
        label="Subject's name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
      />
      <TextFeild
        placeholder="Enter the subject's instructor"
        label="Subject's instructor"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
        id="instructor"
        error={instructorError}
      />
      <div className={styles.numberInputs}>
        <NumberField
          min={1}
          max={5}
          label="Level"
          id="level"
          placeholder="level"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          style={{
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
        />
        <NumberField
          min="1"
          max="4"
          id="hours per week"
          placeholder="Hours Per Week"
          label="Hours Per Week"
          value={hpw}
          onChange={(e) => setHpw(Number(e.target.value))}
          style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}
        />
      </div>
      {error && <p className={styles.errorMessage}>* {error}</p>}
      <Button
        style={{ marginTop: "20px" }}
        onClick={(e) => {
          e.preventDefault()
          if (!name || !instructor) {
            if (!name) {
              setNameError("This field is required!")
            }
            if (!instructor) {
              setInstructorError("This field is required!")
            }
          } else {
            dispatch(
              addSubject(name, instructor, hpw, level, new Date().getTime())
            )
            dispatch(addColorForSubject(name))
            setName("")
            setInstructor("")
          }
        }}
      >
        Add
      </Button>
      <Link href="/schedule">
        <a>
          <Button
            onClick={() => {
              console.log("generating the schedule")
            }}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            Generate Schedule
          </Button>
        </a>
      </Link>
    </form>
  )
}

export default Form
