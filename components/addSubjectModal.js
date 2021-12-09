import { useRef, useState } from "react"
import styles from "./styles/addSubjectModal.module.scss"
import Modal from "./modal"
import TextFeild from "./textFeild"
import NumberField from "./numberField"
import Button from "./button"
import { useDispatch, useSelector } from "react-redux"
import {
  addRandomColorForSubject,
  addSubject,
  addSubjectToSchedule,
} from "../store/reducers"
import { Subject } from "../utils/generateSchedule"

function AddSubjectModalContent({ close, setShowAddSubjectModal }) {
  const [name, setName] = useState()
  const [instructor, setInstructor] = useState()
  const [level, setLevel] = useState(1)
  const [hpw, setHpw] = useState(1)

  const [error, setError] = useState()

  const subjects = useSelector((state) => state.subjectsReducer)
  console.log(subjects)

  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <h2>Add Subject</h2>
      <form>
        <TextFeild
          placeholder="Enter the subject's name"
          label="Subject's name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextFeild
          placeholder="Enter the subject's instructor"
          label="Subject's instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          id="instructor"
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
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            }}
          />
        </div>
        {error && <div className={styles.error}>* {error}</div>}
        <Button
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
              setError("All fields are required!")
              return
            } else if (duplicated) {
              setError("This subject already exist!")
              return
            } else {
              setError(null)
              dispatch(addRandomColorForSubject(name))
              dispatch(
                addSubjectToSchedule(new Subject(name, instructor, hpw, level))
              )
              // adding the subject to the `all subjects` array
              dispatch(addSubject(name, instructor, hpw, level))
              close()
            }
          }}
        >
          Add
        </Button>
      </form>
    </div>
  )
}

function AddSubjectModal({ isOpen, close }) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <AddSubjectModalContent close={close} />
    </Modal>
  )
}

export default AddSubjectModal
