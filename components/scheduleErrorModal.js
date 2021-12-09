import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import Modal from "./modal"
import styles from "./styles/scheduleErrorModal.module.scss"

function ScheduleErrorModal({ isOpen, close }) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <h2>Action not completed!</h2>
        <p>There is no time slots remaining for this subject!</p>
      </div>
    </Modal>
  )
}

export default ScheduleErrorModal
