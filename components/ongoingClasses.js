import { TimeContext } from "./devtools"
import { useSelector } from "react-redux"
import { useState, useContext, useEffect } from "react"
import SubjectListItem from "./subjectListItem"
import styles from "./styles/ongoingClasses.module.scss"
import { motion, AnimatePresence } from "framer-motion"

function ClassItem({ subject }) {
  return (
    <motion.li
      className={styles.classItem}
      positionTransition
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    >
      <div className={styles.content}>
        <h3>
          {subject.name}{" "}
          <span>
            - ({subject.startTime} - {subject.endTime})
          </span>
        </h3>
        <h3>{subject.teacher}</h3>
        <div>
          <p>Subject's Hours Per Week: ({subject.hpw})</p>
          <p>Subject's Level: ({subject.level})</p>
        </div>
      </div>
    </motion.li>
  )
}

function OngoingClasses() {
  const subjects = useSelector(
    (state) => state.scheduleReducer.schedule?.result?.subjects
  )
  const { hours, minutes } = useContext(TimeContext)
  const { useDevtoolsTime } = useSelector((state) => state.devtoolsReducer)

  let activeHours
  let activeMinutes

  if (useDevtoolsTime) {
    activeHours = hours
    activeMinutes = minutes
  } else {
    activeHours = new Date().getHours()
    activeMinutes = new Date().getMinutes()
  }

  const [ongoingClasses, setOngoingClasses] = useState([])

  useEffect(() => {
    if (!useDevtoolsTime) {
      let id = setInterval(() => {
        setOngoingClasses(
          subjects
            ?.map((subject) => {
              let duration = subject.getNumberTime()
              let startTimeHours
              let startTimeMinutes
              let endTimeHours
              let endTimeMinutes

              if (Number.isInteger(duration[0])) {
                startTimeHours = duration[0]
                startTimeMinutes = 0
              } else {
                startTimeHours = parseInt(duration[0])
                startTimeMinutes = 30
              }

              if (Number.isInteger(duration[1])) {
                endTimeHours = duration[1]
                endTimeMinutes = 0
              } else {
                endTimeHours = parseInt(duration[1])
                endTimeMinutes = 30
              }

              if (startTimeHours > 0 && startTimeHours < 5) {
                startTimeHours += 12
              }

              if (endTimeHours > 0 && endTimeHours < 5) {
                endTimeHours += 12
              }

              const subjectStartTime = new Date().setHours(
                startTimeHours,
                startTimeMinutes
              )
              const subjectEndTime = new Date().setHours(
                endTimeHours,
                endTimeMinutes
              )
              // const now = new Date().setHours(hours, minutes)
              const now = new Date().setHours(activeHours, activeMinutes)
              if (subjectStartTime - now <= 0 && subjectEndTime - now > 0) {
                return subject
              }
            })
            .filter((subject) => subject != null)
        )
      }, 60000)

      return () => clearTimeout(id)
    } else {
      setOngoingClasses(
        subjects
          ?.map((subject) => {
            let duration = subject.getNumberTime()
            let startTimeHours
            let startTimeMinutes
            let endTimeHours
            let endTimeMinutes

            if (Number.isInteger(duration[0])) {
              startTimeHours = duration[0]
              startTimeMinutes = 0
            } else {
              startTimeHours = parseInt(duration[0])
              startTimeMinutes = 30
            }

            if (Number.isInteger(duration[1])) {
              endTimeHours = duration[1]
              endTimeMinutes = 0
            } else {
              endTimeHours = parseInt(duration[1])
              endTimeMinutes = 30
            }

            if (startTimeHours > 0 && startTimeHours < 5) {
              startTimeHours += 12
            }

            if (endTimeHours > 0 && endTimeHours < 5) {
              endTimeHours += 12
            }

            const subjectStartTime = new Date().setHours(
              startTimeHours,
              startTimeMinutes
            )
            const subjectEndTime = new Date().setHours(
              endTimeHours,
              endTimeMinutes
            )
            // const now = new Date().setHours(hours, minutes)
            const now = new Date().setHours(activeHours, activeMinutes)
            if (subjectStartTime - now <= 0 && subjectEndTime - now > 0) {
              return subject
            }
          })
          .filter((subject) => subject != null)
      )
    }
  }, [minutes, hours, useDevtoolsTime])

  return (
    <div className={styles.container}>
      <h2>Classes currently in progress:</h2>
      <ul>
        <AnimatePresence>
          {ongoingClasses?.length > 0 ? (
            ongoingClasses?.map((subject) => {
              return <ClassItem subject={subject} key={subject.name} />
            })
          ) : (
            <div className={styles.noActiveClasses}>
              <p>No active classes at the moment!</p>
            </div>
          )}
        </AnimatePresence>
      </ul>
    </div>
  )
}

export default OngoingClasses
