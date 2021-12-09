import { useState, useRef, useMemo, memo } from "react"
import styles from "./styles/subject.module.scss"
import { getStyles } from "../utils/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useOnClickOutside } from "../hooks/useOnClickOutside"
import SubjectGridBlock from "./subjectGridBlock"

const Subject = memo(function Subject({
  name,
  instructor,
  days,
  startTime,
  endTime,
  color,
}) {
  const [showMenu, setShowMenu] = useState(false)
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 })
  const menuRef = useRef(null)
  useOnClickOutside(menuRef, () => setShowMenu(false))

  return (
    <>
      {days.map((day) => {
        const blockStyles = getStyles(day, startTime, endTime)

        return (
          <SubjectGridBlock
            name={name}
            instructor={instructor}
            startTime={startTime}
            endTime={endTime}
            blockStyles={blockStyles}
            color={color}
            key={`${name}-${day}`}
            day={day}
          />
        )
      })}
    </>
  )
})

export default Subject
