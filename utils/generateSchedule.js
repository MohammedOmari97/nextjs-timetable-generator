import generateTimes from "./generateTimes"
import { deepClone } from "./deepClone"

export class Subject {
  constructor(name, teacher, hpw, level, id) {
    this.name = name
    this.teacher = teacher
    this.hpw = hpw
    this.level = level
    // this.subClasses = subClasses;
    let { days, startTime, endTime } = generateTimes(this.hpw)
    this.startTime = startTime
    this.endTime = endTime
    this.days = [...days]
    this.id = id
  }

  overlap(subject) {
    // time overlap and days overlap

    const thisStartTime =
      typeof this.startTime === "number"
        ? this.startTime
        : getTimeNumber(this.startTime)
    const thisEndTime =
      typeof this.endTime === "number"
        ? this.endTime
        : getTimeNumber(this.endTime)
    const subjectStartTime =
      typeof subject.startTime === "number"
        ? subject.startTime
        : getTimeNumber(subject.startTime)
    const subjectEndTime =
      typeof subject.endTime === "number"
        ? subject.endTime
        : getTimeNumber(subject.endTime)

    let timeOverlap =
      Math.max(times.indexOf(thisStartTime), times.indexOf(subjectStartTime)) <
        Math.min(times.indexOf(thisEndTime), times.indexOf(subjectEndTime)) &&
      this.days.filter((day) => subject.days.includes(day)).length != 0

    let teacherOverlap = this.teacher === subject.teacher

    let levelOverlap = this.level === subject.level

    return (timeOverlap && teacherOverlap) || (timeOverlap && levelOverlap)

    // let timeOverlap =
    //   Math.max(
    //     times.indexOf(this.startTime),
    //     times.indexOf(subject.startTime)
    //   ) <
    //     Math.min(times.indexOf(this.endTime), times.indexOf(subject.endTime)) &&
    //   this.days.filter((day) => subject.days.includes(day)).length != 0

    // let teacherOverlap = this.teacher === subject.teacher

    // let levelOverlap = this.level === subject.level

    // return (timeOverlap && teacherOverlap) || (timeOverlap && levelOverlap)
  }

  getStringTime() {
    return typeof this.startTime === "string"
      ? [this.startTime, this.endTime]
      : [getTimeString(this.startTime), getTimeString(this.endTime)]
  }

  getNumberTime() {
    return typeof this.startTime === "number"
      ? [this.startTime, this.endTime]
      : [getTimeNumber(this.startTime), getTimeNumber(this.endTime)]
  }
}

class Timetable {
  constructor() {
    this.subjects = []
    this.fitness = 0
  }

  pushSubject(subject) {
    this.subjects.push(subject)
  }

  clear() {
    this.subjects = []
  }

  evaluate() {
    for (let i = 0; i < this.subjects.length; i++) {
      for (let j = 0; j < i; j++) {
        if (this.subjects[i].overlap(this.subjects[j])) this.fitness++
      }
    }
  }

  crossover(parent) {
    const random = Math.floor(Math.random() * this.subjects.length)
    const firstHalf = this.subjects.slice(0, random)
    const secondHalf = parent.subjects.slice(random)
    const childSubjects = firstHalf.concat(secondHalf)
    const childTimetable = new Timetable()
    childTimetable.subjects = childSubjects
    return childTimetable
  }

  mutation() {
    let randomSubject =
      this.subjects[Math.floor(Math.random() * this.subjects.length)]
    let { days, startTime, endTime } = generateTimes(randomSubject.hpw)
    randomSubject.days = [...days]
    randomSubject.startTime = startTime
    randomSubject.endTime = endTime
  }
}

export class Population {
  constructor(subjects = [], popSize) {
    this.population = []
    this.matingpool = []
    this.found = false
    this.result = null

    let subjectsTemp = deepClone(subjects)
    for (let j = 0; j < popSize; j++) {
      let timetable = new Timetable()
      subjectsTemp = deepClone(subjects)

      for (let i = 0; i < subjectsTemp.length; i++) {
        let { days, startTime, endTime } = generateTimes(subjectsTemp[i].hpw)
        subjectsTemp[i].days = [...days]
        subjectsTemp[i].startTime = startTime
        subjectsTemp[i].endTime = endTime
        timetable.pushSubject(subjectsTemp[i])
      }
      this.population.push(timetable)
    }
    let i = 0
    while (true) {
      console.log(i++)
      let maxFit = Infinity
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].evaluate()
        if (this.population[i].fitness === 0) {
          this.found = true
          this.result = this.population[i]
        }

        if (this.population[i].fitness < maxFit) {
          maxFit = this.population[i].fitness
        }
      }

      if (this.found) break

      for (let i = 0; i < this.population.length; i++) {
        this.population[i].fitness = maxFit / this.population[i].fitness
      }

      for (let i = 0; i < this.population.length; i++) {
        let n = Math.floor(this.population[i].fitness * 10)
        for (let j = 0; j < n; j++) {
          this.matingpool.push(this.population[i])
        }
      }

      let newPop = []

      for (let i = 0; i < popSize; i++) {
        let child = this.selection()
        if (child.fitness === 0) {
          this.found = true
          this.result = child
        } else {
          newPop.push(child)
        }
      }

      if (this.found) break
      this.population = []
      this.population = deepClone(newPop)
      this.matingpool = []
    }

    console.log(this.result)
    this.result.subjects = this.result.subjects.map((subject) => {
      subject.days = Array.from(subject.days)
      subject.startTime = timesStrings[times.indexOf(subject.startTime)]
      subject.endTime = timesStrings[times.indexOf(subject.endTime)]
      return subject
    })
  }

  selection() {
    let parentA =
      this.matingpool[Math.floor(Math.random() * this.matingpool.length)]
    let parentB =
      this.matingpool[Math.floor(Math.random() * this.matingpool.length)]
    let child = parentA.crossover(parentB)
    child.mutation()
    child.evaluate()
    return child
  }

  add(subject) {
    let result = deepClone(this.result)
    let subjects = Array.from(result.subjects)
    let levelSubjects = subjects.filter(
      (_subject) => _subject.level === subject.level
    )
    let found = true

    while (true) {
      found = true
      for (let i = 0; i < levelSubjects.length; i++) {
        if (levelSubjects[i].overlap(subject)) {
          found = false
          break
        }
      }
      if (found) break
      let { days, startTime, endTime } = generateTimes(subject.hpw)
      subject.days = [...days]
      subject.startTime = startTime
      subject.endTime = endTime
    }

    this.result.subjects.push(subject)
  }
}

let subject1 = new Subject("web", "hammad", 3, 2)
let subject6 = new Subject("web-1", "TA1", 1, 2)

let subject2 = new Subject("OS", "hammad", 3, 2)
let subject7 = new Subject("OS-1", "TA1", 1, 2)

let subject3 = new Subject("DB", "hammad", 3, 2)
let subject8 = new Subject("DB-1", "TA2", 1, 2)

let subject4 = new Subject("DS", "hammad", 3, 2)
let subject9 = new Subject("DS-1", "TA2", 1, 2)

let subject5 = new Subject("Java", "hammad", 3, 2)
let subject10 = new Subject("Java-1", "TA3", 1, 2)

const times = [8, 9, 9.5, 10, 11, 12, 12.5, 1, 2, 3, 4, 5, 6, 7]
const timesStrings = [
  "8:00",
  "9:00",
  "9:30",
  "10:00",
  "11:00",
  "12:00",
  "12:30",
  "1:00",
  "2:00",
  "3:00",
  "4:00",
]

export function getTimeString(time) {
  return timesStrings[times.indexOf(time)]
}

function getTimeNumber(time) {
  return times[timesStrings.indexOf(time)]
}

// const pop = new Population(
//   [
//     subject1,
//     subject2,
//     subject3,
//     subject4,
//     subject5,
//     subject6,
//     subject7,
//     subject8,
//     subject9,
//     subject10,
//   ],
//   5
// );

// pop.result.subjects.map((subject) => {
//   subject.days = Array.from(subject.days);
//   subject.startTime = timesStrings[times.indexOf(subject.startTime)]
//   subject.endTime = timesStrings[times.indexOf(subject.endTime)]
//   return subject;
// });

// console.log(JSON.stringify(pop.result, null, 2));
