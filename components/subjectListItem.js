import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Modal from "./modal"
import styles from "./styles/subjectListItem.module.scss"
import EditSubjectModal from "./editSubjectModal"
import { deleteSubject } from "../store/reducers"
import { useDispatch } from "react-redux"
import EditIcon from "../public/edit.svg"
import DeleteIcon from "../public/delete.svg"
import { IoTrashBinOutline } from "react-icons/io5"
import { FiTrash2, FiEdit } from "react-icons/fi"

function SubjectListItem({ subject, editable }) {
  const [showOptions, setShowOptions] = useState(false)
  const [showEditSubjectModal, setShowEditPanelModal] = useState(false)

  const dispatch = useDispatch()

  return (
    <motion.li
      positionTransition
      initial={{ opacity: 0, y: 5 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
      exit={{
        opacity: 0,
        x: 20,
        transition: { duration: 0.2, ease: "easeInOut" },
      }}
      className={styles.subjectListItem}
      onHoverStart={() => {
        setShowOptions(true)
      }}
      onHoverEnd={() => {
        setShowOptions(false)
      }}
    >
      <div>
        <h4>{subject.name}</h4>
        <h4>{subject.instructor}</h4>
        <div>
          <p>Hours Per Week: ({subject.hpw})</p>
          <p>Level: ({subject.level})</p>
        </div>
        <AnimatePresence>
          {showOptions && editable && (
            <motion.div
              positionTransition
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: 5,
                transition: { duration: 0.2 },
              }}
              className={styles.options}
            >
              <button
                onClick={() => {
                  dispatch(deleteSubject(subject.name))
                }}
              >
                <FiTrash2 />
              </button>
              <button
                onClick={() => {
                  setShowEditPanelModal(true)
                }}
              >
                <FiEdit />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showEditSubjectModal && (
            <EditSubjectModal
              isOpen={showEditSubjectModal}
              close={() => setShowEditPanelModal(false)}
              subject={subject}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  )
}

export default SubjectListItem
