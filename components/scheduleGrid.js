import { useState, useRef, useContext, useEffect } from "react"
import { getStyles } from "../utils/utils"
import Subject from "./subject"
import styles from "./styles/scheduleGrid.module.scss"
import { AnimatePresence } from "framer-motion"
import { TimeContext } from "./devtools"
import { useSelector } from "react-redux"

function ScheduleGrid({ subjects, level, subjectsColors }) {
  const [showCursor, setShowCursor] = useState(true)
  const [cursorShift, setCursorShift] = useState(0)

  const containerRef = useRef()

  const [update, setUpdate] = useState(0)

  const { hours, minutes, seconds } = useContext(TimeContext)

  const { useDevtoolsTime } = useSelector((state) => state.devtoolsReducer)

  const currentHours = new Date().getHours()
  const currentMinutes = new Date().getMinutes()
  const currentSeconds = new Date().getSeconds()

  const activeHours = useDevtoolsTime ? hours : currentHours
  const activeMinutes = useDevtoolsTime ? minutes : currentMinutes
  const activeSeconds = useDevtoolsTime ? seconds : currentSeconds

  let shouldDisplayCursor

  if (activeHours > 7) {
    if (activeHours < 17) {
      if (
        activeHours < 16 ||
        (activeHours === 16 && activeMinutes === 0 && activeSeconds === 0)
      ) {
        shouldDisplayCursor = true
      } else {
        shouldDisplayCursor = false
      }
    }
  }

  const timeDiff =
    (new Date().setHours(8, 0, 0) -
      new Date().setHours(activeHours, activeMinutes, activeSeconds)) /
    36e5
  const pastTimePerc =
    timeDiff <= 0
      ? Number.parseFloat(((2 * timeDiff) / 17 - 1 / 17) * -100).toFixed(4) +
        "%"
      : undefined

  useEffect(() => {
    if (!useDevtoolsTime) {
      let id = setInterval(() => {
        setUpdate((update) => {
          return update + 1
        })
      }, 1000)
      return () => clearInterval(id)
    }
  }, [useDevtoolsTime])

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
        // style={{ opacity: showCursor ? 1 : 0, left: cursorShift }}
        style={{
          display: shouldDisplayCursor ? "block" : "none",
          opacity: showCursor ? 1 : 0,
          left: pastTimePerc,
        }}
      >
        <div
          className={styles.cursorDot}
          style={{
            display: shouldDisplayCursor ? "block" : "none",
            opacity: showCursor ? 1 : 0,
          }}
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
