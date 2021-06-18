import { combineReducers } from "redux"
import { getColor } from "../utils/getColor"
import generateTimes from "../utils/generateTimes"
import { getTimeString } from "../utils/generateSchedule"

const subjectsList = []
const schedule = { schedule: null }

function subjectsReducer(state = subjectsList, action) {
  if (action.type === "add-subject") {
    const { name, instructor, hpw, level, id } = action.payload

    return [...state, { name, instructor, hpw, level, id }]
  } else if (action.type === "edit-subject") {
    const { name, instructor, hpw, level, id } = action.payload

    console.log(action.payload)

    return state.map((subject) => {
      if (subject.id === id) {
        subject.name = name
        subject.instructor = instructor
        subject.level = level
        subject.hpw = hpw
        console.log(subject)
        return subject
      } else {
        console.log(subject)
        return subject
      }
    })
  } else if (action.type === "delete-subject") {
    return state.filter((subject) => subject.id !== action.payload.id)
  } else {
    return state
  }
}

function scheduleReducer(state = schedule, action) {
  if (action.type === "schedule-generated") {
    return { schedule: action.payload.schedule }
  } else if (action.type === "add-subject-to-schedule") {
    console.log(action.payload.subject)

    let found = false
    let tries = 0

    let subjects = state.schedule.result.subjects

    while (tries++ < 10000) {
      found = true

      for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].overlap(action.payload.subject)) {
          found = false
          break
        }
      }

      if (found) break

      let { days, startTime, endTime } = generateTimes(
        action.payload.subject.hpw
      )
      action.payload.subject.days = [...days]
      action.payload.subject.startTime = startTime
      action.payload.subject.endTime = endTime
    }

    if (!found) {
      throw new Error("No time slots available for this subject!")
    }

    action.payload.subject.startTime = getTimeString(
      action.payload.subject.startTime
    )
    action.payload.subject.endTime = getTimeString(
      action.payload.subject.endTime
    )

    state.schedule.result.subjects.push(action.payload.subject)

    return { ...state, schedule: state.schedule }
    // return state
  } else if (action.type === "delete-subject-from-schedule") {
    let schedule = state.schedule
    schedule.result.subjects = schedule.result.subjects.filter(
      (subject) => subject.name !== action.payload.subject
    )
    console.log(schedule)
    return { ...state, schedule }
  } else {
    return state
  }
}

function colorsReducer(state = {}, action) {
  if (action.type === "add-subject-color") {
    return { ...state, [action.payload.subject]: getColor() }
  } else if (action.type === "delete-subject-color") {
    // this is when the subject get deleted, so we need to remove the color it took from taken colors
    return state
  } else {
    return state
  }
}

function addSubject(name, instructor, hpw, level, id) {
  return {
    type: "add-subject",
    payload: {
      name,
      instructor,
      hpw,
      level,
      id,
    },
  }
}

function deleteSubject(id) {
  return { type: "delete-subject", payload: { id } }
}

function editSubject(id, name, instructor, level, hpw) {
  return { type: "edit-subject", payload: { id, name, instructor, level, hpw } }
}

function addColorForSubject(subject) {
  return { type: "add-subject-color", payload: { subject } }
}

function deleteSubjectColor(subject) {
  return { type: "delete-subject-color", payload: { subject } }
}

function scheduleGenerated(schedule) {
  return { type: "schedule-generated", payload: { schedule } }
}

function addSubjectToSchedule(subject) {
  return { type: "add-subject-to-schedule", payload: { subject } }
}

function deleteSubjectFromSchedule(subject) {
  return { type: "delete-subject-from-schedule", payload: { subject } }
}

export {
  addSubject,
  addColorForSubject,
  deleteSubjectColor,
  scheduleGenerated,
  addSubjectToSchedule,
  deleteSubjectFromSchedule,
  editSubject,
  deleteSubject,
}

export default combineReducers({
  subjectsReducer,
  scheduleReducer,
  colorsReducer,
})
