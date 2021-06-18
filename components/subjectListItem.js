import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Modal from "./modal"
import styles from "./styles/subjectListItem.module.scss"
import EditSubjectModal from "./editSubjectModal"
import { deleteSubject } from "../store/reducers"
import { useDispatch } from "react-redux"

function SubjectListItem({ subject }) {
  const [showOptions, setShowOptions] = useState(false)
  const [showEditSubjectModal, setShowEditPanelModal] = useState(false)

  const dispatch = useDispatch()

  return (
    <motion.li
      positionTransition
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={styles.subjectListItem}
      onHoverStart={() => {
        setShowOptions(true)
      }}
      onHoverEnd={() => {
        setShowOptions(false)
      }}
      // key={subject.id}
    >
      {/* <li
      key={subject.id}
      className={styles.subjectListItem}
      onMouseEnter={() => {
        setShowOptions(true)
      }}
      onMouseLeave={() => {
        setShowOptions(false)
      }}
    > */}
      <div>
        <h4>{subject.name}</h4>
        <h4>{subject.instructor}</h4>
        <div>
          <p>Hours Per Week: ({subject.hpw})</p>
          <p>Level: ({subject.level})</p>
        </div>
        <AnimatePresence>
          {showOptions && (
            <motion.div
              positionTransition
              // initial={{ opacity: 0, x: "calc(-50% + 0px)" }}
              initial={{ opacity: 0, x: 5 }}
              // animate={{ opacity: 1, x: "calc(-50% + 5px)" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                // x: "calc(-50% + 5px)",
                // x: "-50%",
                x: 5,
                transition: { duration: 0.2 },
              }}
              className={styles.options}
            >
              <button
                onClick={() => {
                  dispatch(deleteSubject(subject.id))
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowEditPanelModal(true)
                }}
              >
                Edit
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

{
  /* <li
      key={subject.id}
      className={styles.subjectListItem}
      onMouseEnter={() => {
        setShowOptions(true)
      }}
      onMouseLeave={() => {
        setShowOptions(false)
      }}
    ></li> */
}

export default SubjectListItem
