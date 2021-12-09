import { useState } from "react"
import styles from "./styles/teachersLoadModal.module.scss"
import Modal from "./modal"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"

function TeachersLoadModalContent() {
  const schedule = useSelector((state) => state.scheduleReducer)

  const [selectedTeacher, setSelectedTeacher] = useState()

  return (
    <div className={styles.container}>
      <h2>Teachers Load</h2>
      <div className={styles.modalContent}>
        <div className={styles.teachersSection}>
          {schedule.schedule.result.subjects
            .map((subject) => subject.teacher)
            .filter((teacher, i, array) => array.indexOf(teacher) == i)
            .map((teacher) => {
              return (
                <button
                  onClick={() => {
                    setSelectedTeacher(teacher)
                  }}
                  className={
                    teacher === selectedTeacher ? styles.selected : undefined
                  }
                >
                  {teacher}
                </button>
              )
            })}
        </div>
        <div className={styles.subjectsSection}>
          <AnimatePresence>
            {schedule.schedule.result.subjects.map((subject) => {
              if (subject.teacher === selectedTeacher) {
                return (
                  <motion.div
                    positionTransition
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ease: "easeOut", duration: 0.3 }}
                    className={styles.subjectListItem}
                    key={`${subject.name}-${subject.teacher}`}
                  >
                    <p>
                      <b>{subject.name}</b>
                    </p>
                    <p>
                      <strong>Level:</strong> ({subject.level})
                    </p>
                    <p>
                      <strong>Hours Per Week: </strong>({subject.hpw})
                    </p>
                  </motion.div>
                )
              }
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function TeachersLoadModal({ isOpen, close }) {
  return (
    <Modal isOpen={isOpen} close={close} height="70%">
      <TeachersLoadModalContent />
    </Modal>
  )
}

export default TeachersLoadModal
