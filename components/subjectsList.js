import SubjectListItem from "./subjectListItem"
import styles from "./styles/subjectsList.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import { deleteSubject } from "../store/reducers"

function SubjectsList() {
  const subjects = useSelector((state) => state.subjectsReducer)
  const dispatch = useDispatch()

  return (
    <div className={styles.container}>
      <AnimatePresence initial={false}>
        {subjects.length > 0 ? (
          subjects.map((subject) => {
            return (
              <SubjectListItem subject={subject} key={subject.name} editable />
            )
          })
        ) : (
          <p>No subjects added yet!</p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SubjectsList
