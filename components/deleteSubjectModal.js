import { useState } from "react"
import Modal from "./modal"
import styles from "./styles/deleteSubjectModal.module.scss"
import TextFeild from "./textFeild"
import Button from "./button"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteSubjectColor,
  deleteSubjectFromSchedule,
  deleteSubject,
} from "../store/reducers"

function DeleteSubjectModalContent({ close }) {
  const [name, setName] = useState()
  const dispatch = useDispatch()

  const [error, setError] = useState()

  const subjects = useSelector((state) => state.subjectsReducer)

  return (
    <div className={styles.container}>
      <h2>Delete Subject</h2>
      <form>
        <TextFeild
          placeholder="Enter the subject's name"
          label="Subject's name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // error={nameError}
        />
        {error && <div className={styles.error}>* {error}</div>}
        <Button
          onClick={(e) => {
            let exist = false

            for (let i = 0; i < subjects.length; i++) {
              if (subjects[i].name === name) {
                exist = true
                break
              }
            }

            e.preventDefault()

            if (!exist) {
              setError("This subject doesn't exist!")
              return
            } else {
              setError(null)
              dispatch(deleteSubjectFromSchedule(name))
              dispatch(deleteSubject(name))
              dispatch(deleteSubjectColor(name))
              close()
            }
          }}
          style={{ marginTop: "20px" }}
        >
          Delete
        </Button>
      </form>
    </div>
  )
}

function DeleteSubjectModal({ isOpen, close }) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <DeleteSubjectModalContent close={close} />
    </Modal>
  )
}

export default DeleteSubjectModal
