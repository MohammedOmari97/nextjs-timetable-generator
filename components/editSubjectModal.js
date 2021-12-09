import Modal from "./modal"
import styles from "./styles/editSubjectModal.module.scss"
import TextFeild from "./textFeild"
import NumberField from "./numberField"
import { useState, useRef } from "react"
import Button from "./button"
import { useDispatch, useSelector } from "react-redux"
import { editSubject } from "../store/reducers"

function EditSubjectModalContent({ close, subject }) {
  const [name, setName] = useState(subject.name)
  const [instructor, setInstructor] = useState(subject.instructor)
  const [level, setLevel] = useState(subject.level)
  const [hpw, setHpw] = useState(subject.hpw)

  const subjectName = useRef(subject.name)

  const [error, setError] = useState(null)
  const subjects = useSelector((state) => state.subjectsReducer)

  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <h2>Edit Subject</h2>
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
              if (
                subjects[i].name === name &&
                subjects[i].name !== subjectName.current
              ) {
                duplicated = true
              }
            }

            if (!name || !instructor) {
              setError("All fields are required")
              return
            } else if (duplicated) {
              setError("This subject already exist!")
              return
            } else {
              setError(null)
              dispatch(editSubject(subject.id, name, instructor, level, hpw))
              close()
            }
          }}
        >
          Save
        </Button>
      </form>
    </div>
  )
}

function EditSubjectModal({ isOpen, close, subject }) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <EditSubjectModalContent close={close} subject={subject} />
    </Modal>
  )
}

export default EditSubjectModal
