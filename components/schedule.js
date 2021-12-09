import { useState, useEffect, useRef, useMemo } from "react"
import ScheduleGrid from "./scheduleGrid"
import { classes } from "../utils/data"
import { getBlocks } from "../utils/utils"
import styles from "./styles/schedule.module.scss"
import { Subject, Population } from "../utils/generateSchedule"
import { AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { scheduleGenerated, addRandomColorForSubject } from "../store/reducers"

function Schedule({ subjects, level }) {
  const dispatch = useDispatch()

  const scheduledSubjects = useSelector(
    (state) => state.scheduleReducer.schedule?.result?.subjects
  )
  const subjectsColors = useSelector((state) => state.colorsReducer)

  useEffect(() => {
    for (let i = 0; i < subjects.length; i++) {
      if (!subjectsColors?.[subjects[i].name]) {
        dispatch(addRandomColorForSubject(subjects[i].name))
      }
    }
  }, [subjects])

  useEffect(() => {
    let _subjects

    _subjects = subjects.map(({ name, instructor, hpw, level }) => {
      return new Subject(name, instructor, hpw, level)
    })

    const pop = new Population(_subjects, 5)

    dispatch(scheduleGenerated(pop))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.daysOfWeek}>
        <p>Sat</p>
        <p>Sun</p>
        <p>Mon</p>
        <p>Tue</p>
        <p>Wed</p>
      </div>
      <div className={styles.times}>
        <div>
          <p>08:00</p>
        </div>
        <div>
          <p>08:30</p>
        </div>
        <div>
          <p>09:00</p>
        </div>
        <div>
          <p>09:30</p>
        </div>
        <div>
          <p>10:00</p>
        </div>
        <div>
          <p>10:30</p>
        </div>
        <div>
          <p>11:00</p>
        </div>
        <div>
          <p>11:30</p>
        </div>
        <div>
          <p>12:00</p>
        </div>
        <div>
          <p>12:30</p>
        </div>
        <div>
          <p>01:00</p>
        </div>
        <div>
          <p>01:30</p>
        </div>
        <div>
          <p>02:00</p>
        </div>
        <div>
          <p>02:30</p>
        </div>
        <div>
          <p>03:00</p>
        </div>
        <div>
          <p>03:30</p>
        </div>
        <div>
          <p>04:00</p>
        </div>
      </div>

      {scheduledSubjects ? (
        <ScheduleGrid
          subjects={scheduledSubjects}
          level={level}
          subjectsColors={subjectsColors}
        />
      ) : (
        <p>loading...</p>
      )}
    </div>
  )
}

export default Schedule
