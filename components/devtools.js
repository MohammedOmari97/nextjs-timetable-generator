import { createContext, useContext, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./styles/devtools.module.scss"
import NumberField from "./numberField"
import { toggleUseDevtoolsTime } from "../store/reducers"
import { useDispatch, useSelector } from "react-redux"

export const TimeContext = createContext()

export function TimeProvider({ children }) {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(12)
  const [selectedDay, setSelectedDay] = useState("Sat")

  const { useDevtoolsTime } = useSelector((state) => state.devtoolsReducer)

  useEffect(() => {
    if (useDevtoolsTime) {
      const timer = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 59) {
            setMinutes((minutes) => {
              if (minutes === 59) {
                setHours((hours) => {
                  if (hours === 23) {
                    return 0
                  } else {
                    return hours + 1
                  }
                })
                return 0
              } else {
                return minutes + 1
              }
              return 0
            })
            return 0
          } else {
            return seconds + 1
          }
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [useDevtoolsTime])

  return (
    <TimeContext.Provider
      value={{
        seconds,
        setSeconds,
        minutes,
        setMinutes,
        hours,
        setHours,
        selectedDay,
        setSelectedDay,
      }}
    >
      {children}
    </TimeContext.Provider>
  )
}

function Devtools() {
  const [showDevtools, setShowDevtools] = useState(false)

  const {
    minutes,
    hours,
    seconds,
    setMinutes,
    setHours,
    setSeconds,
    selectedDay,
    setSelectedDay,
  } = useContext(TimeContext)
  const dispatch = useDispatch()
  const { useDevtoolsTime } = useSelector((state) => state.devtoolsReducer)

  return (
    <div className={styles.container}>
      <button onClick={() => setShowDevtools((show) => !show)}></button>
      <AnimatePresence>
        {showDevtools && (
          <motion.div
            positionTransition
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.5,
              x: -10,
              transition: { ease: "easeOut", duration: 0.2 },
            }}
            className={styles.devtools}
          >
            <div>
              <div className={styles.toggleUseDevtoolsTimeContainer}>
                <label htmlFor="useDevtoolsTime">Use devtools time</label>
                <input
                  type="checkbox"
                  id="useDevtoolsTime"
                  onChange={() => {
                    dispatch(toggleUseDevtoolsTime())
                  }}
                  checked={useDevtoolsTime}
                />
              </div>
            </div>
            <div
              className={styles.timeInputs}
              style={{ opacity: useDevtoolsTime ? 1 : 0.5 }}
            >
              <NumberField
                min={0}
                max={59}
                label="Seconds"
                id="seconds"
                placeholder="Seconds"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                disabled={!useDevtoolsTime}
              />
              <NumberField
                min={0}
                max={59}
                label="Minutes"
                id="minutes"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                disabled={!useDevtoolsTime}
              />
              <NumberField
                min={0}
                max={23}
                label="Hours"
                id="hours"
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                disabled={!useDevtoolsTime}
              />
            </div>
            <div className={styles.days}>
              {["Sat", "Sun", "Mon", "Tue", "Wed"].map((day) => {
                const isSelected = day === selectedDay
                return (
                  <button
                    onClick={() => setSelectedDay(day)}
                    data-selected={isSelected}
                    key={day}
                    disabled={!useDevtoolsTime}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Devtools
