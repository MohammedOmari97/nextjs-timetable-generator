import { useState, useRef } from "react"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import { AnimatePresence, motion } from "framer-motion"
import styles from "./styles/subject.module.scss"
import { useDispatch } from "react-redux"
import { deleteSubjectFromSchedule } from "../store/reducers"
import Modal from "./modal"
import Button from "./button"

function SubjectGridBlock({
  name,
  instructor,
  startTime,
  endTime,
  blockStyles,
  color,
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 })
  const menuRef = useRef(null)
  useOnClickOutside(menuRef, () => setShowMenu(false))

  const [showConfirmation, setShowConfirmation] = useState(false)

  const dispatch = useDispatch()

  return (
    <motion.div
      positionTransition
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className={styles.subject}
      style={{
        gridRow: blockStyles[0],
        gridColumn: `${blockStyles[1]} / ${blockStyles[2]}`,
        background: color,
      }}
      onContextMenu={(e) => {
        e.preventDefault()
        const rect = e.target.getBoundingClientRect()
        const left = e.pageX - rect.left
        const top = e.pageY - rect.top
        setMenuPos({ top, left })
        setShowMenu(true)
      }}
    >
      <p>{name}</p>
      <p style={{ fontSize: "14px", marginBottom: "3px" }}>{instructor}</p>
      <p>
        {startTime} - {endTime}
      </p>
      <AnimatePresence initial={false}>
        {showMenu && (
          <motion.div
            positionTransition
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ ease: "easeOut", duration: 0.12 }}
            className={styles.menu}
            style={{ left: menuPos.left, top: menuPos.top }}
            ref={menuRef}
          >
            <ul>
              <li>Edit Subject</li>
              <li
                onClick={() => {
                  setShowConfirmation(true)
                  setShowMenu(false)
                }}
              >
                Delete Subject
              </li>
              <li>Subject's Info</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showConfirmation && (
          <Modal
            isOpen={showConfirmation}
            close={() => setShowConfirmation(false)}
          >
            <div className={styles.modal}>
              <h2>Delete Subject</h2>
              <p>
                Are you sure you want to delete <strong>({name})</strong>{" "}
                subject from schedule
              </p>
              <Button
                onClick={() => {
                  dispatch(deleteSubjectFromSchedule(name))
                  setShowConfirmation(false)
                }}
              >
                Delete
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SubjectGridBlock
