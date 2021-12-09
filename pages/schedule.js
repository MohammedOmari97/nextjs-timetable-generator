import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import { initializeStore, useStore } from "../store/store"
import { Subject, Population } from "../utils/generateSchedule"
import styles from "../styles/schedule.module.scss"
import { useDispatch, useSelector } from "react-redux"
import ActionButton from "../components/actionButton"
import Schedule from "../components/schedule"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "../components/modal"
import withModalStyles from "../components/withModalStyles"
import addSubjectModalStyles from "../components/styles/addSubjectModal.module.scss"
import TextFeild from "../components/textFeild"
import Form from "../components/form"
import AddSubjectModal from "../components/addSubjectModal"
import Select from "react-select"
import DeleteSubjectModal from "../components/deleteSubjectModal"
import TeachersLoadModal from "../components/teachersLoadModal"
import Devtools from "../components/devtools"
import OngoingClasses from "../components/ongoingClasses"
import { resetScheduleError } from "../store/reducers"
import ScheduleErrorModal from "../components/scheduleErrorModal"

export default function Home(props) {
  const subjects = useSelector((store) => store.subjectsReducer)
  const [level, setLevel] = useState(1)

  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false)
  const [showDeleteSubjectModal, setShowDeleteSubjectModal] = useState(false)
  const [showTeachersLoadModal, setShowTeachersLoadModal] = useState(false)

  const { error: outOfTimeSlotsError } = useSelector((state) => {
    return state.scheduleReducer
  })

  const dispatch = useDispatch()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <h2>Islamic University Timetable Generator</h2>
        <div className={styles.toolbar}>
          <div className={styles.actionButtons}>
            <ActionButton
              onClick={() => {
                setShowAddSubjectModal(true)
              }}
            >
              Add Subject
            </ActionButton>
            <ActionButton
              onClick={() => {
                setShowDeleteSubjectModal(true)
              }}
            >
              Delete Subject
            </ActionButton>
            <ActionButton
              onClick={() => {
                setShowTeachersLoadModal(true)
              }}
            >
              View Intructors load
            </ActionButton>
          </div>
          <div className={styles.options}>
            <Select
              defaultValue={{ value: level, label: level }}
              options={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
              ]}
              onChange={(e) => {
                setLevel(e.value)
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  background: "#fff",
                  borderColor: "#9e9e9e",
                  minHeight: "30px",
                  height: "30px",
                  width: "60px",
                  boxShadow: state.isFocused ? null : null,
                }),
                valueContainer: (provided, state) => ({
                  ...provided,
                  height: "30px",
                  padding: "0 6px",
                }),
                input: (provided, state) => ({
                  ...provided,
                  margin: "0px",
                }),
                indicatorSeparator: (state) => ({
                  display: "none",
                }),
                indicatorsContainer: (provided, state) => ({
                  ...provided,
                  height: "30px",
                }),
              }}
            />
          </div>
        </div>
        <AnimatePresence>
          {showAddSubjectModal && (
            <AddSubjectModal
              isOpen={showAddSubjectModal}
              close={() => setShowAddSubjectModal(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showDeleteSubjectModal && (
            <DeleteSubjectModal
              isOpen={showDeleteSubjectModal}
              close={() => setShowDeleteSubjectModal(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showTeachersLoadModal && (
            <TeachersLoadModal
              isOpen={showTeachersLoadModal}
              close={() => setShowTeachersLoadModal(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {outOfTimeSlotsError && (
            <ScheduleErrorModal
              isOpen={outOfTimeSlotsError}
              close={() => dispatch(resetScheduleError())}
            />
          )}
        </AnimatePresence>
        <div style={{ overflow: "auto" }}>
          <Schedule subjects={subjects} level={level} />
        </div>

        <OngoingClasses />

        <Devtools />
      </div>
    </div>
  )
}

export function getServerSideProps() {
  const store = initializeStore()

  return { props: { initialState: store.getState() } }
}
