import { combineReducers } from "redux"
import { getColor } from "../utils/getColor"
import generateTimes from "../utils/generateTimes"
import { getTimeString } from "../utils/generateSchedule"

const subjectsList = []
const schedule = { schedule: null, error: null }

function subjectsReducer(state = subjectsList, action) {
  if (action.type === "add-subject") {
    const { name, instructor, hpw, level, id } = action.payload

    return [...state, { name, instructor, hpw, level, id }]
  } else if (action.type === "edit-subject") {
    const { name, instructor, hpw, level, id } = action.payload

    return state.map((subject) => {
      if (subject.id === id) {
        subject.name = name
        subject.instructor = instructor
        subject.level = level
        subject.hpw = hpw
        return subject
      } else {
        return subject
      }
    })
  } else if (action.type === "delete-subject") {
    // return state.filter((subject) => subject.id !== action.payload.id)
    return state.filter((subject) => subject.name !== action.payload.name)
  } else {
    return state
  }
}

function scheduleReducer(state = schedule, action) {
  if (action.type === "schedule-generated") {
    return { ...state, schedule: action.payload.schedule }
  } else if (action.type === "add-subject-to-schedule") {
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
      return { ...state, error: "No time slots for this subject!" }
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
    return { ...state, schedule }
  } else if (action.type === "reset-schedule-error") {
    return { ...state, error: null }
  } else {
    return state
  }
}

function colorsReducer(state = {}, action) {
  if (action.type === "add-random-subject-color") {
    return {
      ...state,
      [action.payload.subject]: getColor(action.payload.subject),
    }
  } else if (action.type === "add-subject-color") {
    return { ...state, [action.payload.subject]: action.payload.color }
  } else if (action.type === "delete-subject-color") {
    // this is when the subject get deleted, so we need to remove the color it took from taken colors
    return state
  } else {
    return state
  }
}

function devtoolsReducer(state = { useDevtoolsTime: true }, action) {
  if (action.type === "toggle-use-devtools") {
    return { ...state, useDevtoolsTime: !state.useDevtoolsTime }
  } else {
    return state
  }
}

// -------------------------------------------------------------------------------

function toggleUseDevtoolsTime() {
  return { type: "toggle-use-devtools" }
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

function deleteSubject(name) {
  // return { type: "delete-subject", payload: { id } }
  return { type: "delete-subject", payload: { name } }
}

function editSubject(id, name, instructor, level, hpw) {
  return { type: "edit-subject", payload: { id, name, instructor, level, hpw } }
}

function addRandomColorForSubject(subject) {
  return { type: "add-random-subject-color", payload: { subject } }
}

function addSubjectColor(subject, color) {
  return { type: "add-subject-color", payload: { subject, color } }
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

function resetScheduleError() {
  return { type: "reset-schedule-error" }
}

export {
  addSubject,
  addRandomColorForSubject,
  addSubjectColor,
  deleteSubjectColor,
  scheduleGenerated,
  addSubjectToSchedule,
  deleteSubjectFromSchedule,
  editSubject,
  deleteSubject,
  resetScheduleError,
  toggleUseDevtoolsTime,
}

export default combineReducers({
  subjectsReducer,
  scheduleReducer,
  colorsReducer,
  devtoolsReducer,
})
