import { useState } from "react"
import Modal from "./modal"
import styles from "./styles/deleteSubjectModal.module.scss"
import TextFeild from "./textFeild"
import Button from "./button"
import { useDispatch } from "react-redux"
import {
  deleteSubjectColor,
  deleteSubjectFromSchedule,
} from "../store/reducers"

function DeleteSubjectModalContent({ close }) {
  const [name, setName] = useState()

  const dispatch = useDispatch()

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
        <Button
          onClick={(e) => {
            e.preventDefault()
            dispatch(deleteSubjectFromSchedule(name))
            dispatch(deleteSubjectColor(name))
            close()
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
