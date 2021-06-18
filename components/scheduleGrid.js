import { useState, useRef } from "react"
import { getStyles } from "../utils/utils"
import Subject from "./subject"
import styles from "./styles/scheduleGrid.module.scss"
import { AnimatePresence } from "framer-motion"

function ScheduleGrid({ subjects, level, subjectsColors }) {
  const [showCursor, setShowCursor] = useState(false)
  const [cursorShift, setCursorShift] = useState(0)

  const containerRef = useRef()

  return (
    <div
      className={styles.container}
      // onMouseEnter={() => setShowCursor(true)}
      // onMouseLeave={() => setShowCursor(false)}
      // onMouseMove={(e) => {
      //   const rect = e.target.getBoundingClientRect()
      //   setCursorShift(e.pageX - rect.left)
      // }}
      ref={containerRef}
    >
      <div
        className={styles.cursor}
        style={{ opacity: showCursor ? 1 : 0, left: cursorShift }}
      >
        <div
          className={styles.cursorDot}
          style={{ opacity: showCursor ? 1 : 0 }}
        ></div>
      </div>

      <div className={`${styles.hBorder} ${styles.hBorder1}`}></div>
      <div className={`${styles.hBorder} ${styles.hBorder2}`}></div>
      <div className={`${styles.hBorder} ${styles.hBorder3}`}></div>
      <div className={`${styles.hBorder} ${styles.hBorder4}`}></div>
      <div className={`${styles.hBorder} ${styles.hBorder5}`}></div>

      <div className={`${styles.vBorder} ${styles.vBorder1}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder2}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder3}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder4}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder5}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder6}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder7}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder8}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder9}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder10}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder11}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder12}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder13}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder14}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder15}`}></div>
      <div className={`${styles.vBorder} ${styles.vBorder16}`}></div>
      {/* <div className={`${styles.vBorder16}`}></div> */}

      <AnimatePresence initial={false}>
        {subjects?.map((subject) => {
          if (subject.level === level) {
            return (
              <Subject
                name={subject.name}
                instructor={subject.teacher}
                startTime={subject.startTime}
                endTime={subject.endTime}
                days={subject.days}
                color={subjectsColors[subject.name]}
                key={subject.name}
              />
            )
          }
        })}
      </AnimatePresence>
    </div>
  )
}

export default ScheduleGrid
