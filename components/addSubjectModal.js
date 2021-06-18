import { useState } from "react"
import styles from "./styles/addSubjectModal.module.scss"
import Modal from "./modal"
import TextFeild from "./textFeild"
import NumberField from "./numberField"
import Button from "./button"
import { useDispatch } from "react-redux"
import { addColorForSubject, addSubjectToSchedule } from "../store/reducers"
import { Subject } from "../utils/generateSchedule"

function AddSubjectModalContent({ close, setShowAddSubjectModal }) {
  const [name, setName] = useState()
  const [instructor, setInstructor] = useState()
  const [level, setLevel] = useState(1)
  const [hpw, setHpw] = useState(1)

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
          // error={nameError}
        />
        <TextFeild
          placeholder="Enter the subject's instructor"
          label="Subject's instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          id="instructor"
          // error={instructorError}
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
        <Button
          onClick={(e) => {
            e.preventDefault()
            dispatch(addColorForSubject(name))
            dispatch(
              addSubjectToSchedule(new Subject(name, instructor, hpw, level))
            )
            close()
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
