import { useState, useRef } from "react"
import Button from "./button"
import styles from "./styles/form.module.scss"
import { addSubject, addRandomColorForSubject } from "../store/reducers"
import { useDispatch } from "react-redux"
import TextFeild from "./textFeild"
import NumberField from "./numberField"
import Link from "next/link"
import ActionButton from "./actionButton"
import { useSelector } from "react-redux"

function Form() {
  const [name, setName] = useState()
  const [nameError, setNameError] = useState()
  const [instructor, setInstructor] = useState()
  const [instructorError, setInstructorError] = useState()
  const [hpw, setHpw] = useState(1)
  const [level, setLevel] = useState(1)
  const dispatch = useDispatch()

  const [error, setError] = useState(null)

  const textInputRef = useRef(null)

  const subjects = useSelector((state) => state.subjectsReducer)

  return (
    <form className={styles.form}>
      <TextFeild
        placeholder="Enter the subject's name"
        label="Subject's name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={nameError}
        ref={textInputRef}
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

          let duplicated = false

          for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].name === name) {
              duplicated = true
              break
            }
          }

          if (!name || !instructor) {
            setError("All fields are required")
            return
          } else if (duplicated) {
            setError("This subject is already added!")
            return
          } else {
            setError(null)
            dispatch(
              addSubject(name, instructor, hpw, level, new Date().getTime())
            )
            dispatch(addRandomColorForSubject(name))
            setName("")
            setInstructor("")
            textInputRef.current.focus()
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
