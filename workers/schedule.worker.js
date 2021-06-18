// import generateTimes from "../utils/generateTimes"
// import { deepClone } from "../utils/deepClone"

// const [scheduledSubjects, setScheduledSubjects] = useState([])

// const [data, setData] = useState()
// console.log(data)

// useEffect(() => {
//   const worker = new Worker(new URL("./worker-copy.js", import.meta.url), { type: 'module' })

//   worker.postMessage(subjects)

//   worker.onmessage = function ({ data }) {
//     console.log(data)
//     setData(data)
//   }

//   return () => {
//     worker.terminate()
//   }
// }, [])

self.addEventListener("message", (data) => {
  self.postMessage([data])
})

// const times = [8, 9, 9.5, 10, 11, 12, 12.5, 1, 2, 3, 4, 5, 6, 7]
// const timesStrings = [
//   "8:00",
//   "9:00",
//   "9:30",
//   "10:00",
//   "11:00",
//   "12:00",
//   "12:30",
//   "1:00",
//   "2:00",
//   "3:00",
//   "4:00",
// ]

// class Subject {
//   constructor(name, teacher, hpw, level, id) {
//     this.name = name
//     this.teacher = teacher
//     this.hpw = hpw
//     this.level = level
//     // this.subClasses = subClasses;
//     let { days, startTime, endTime } = generateTimes(this.hpw)
//     this.startTime = startTime
//     this.endTime = endTime
//     this.days = [...days]
//     this.id = id
//   }

//   overlap(subject) {
//     // time overlap and days overlap
//     let timeOverlap =
//       Math.max(
//         times.indexOf(this.startTime),
//         times.indexOf(subject.startTime)
//       ) <
//         Math.min(times.indexOf(this.endTime), times.indexOf(subject.endTime)) &&
//       this.days.filter((day) => subject.days.includes(day)).length != 0

//     let teacherOverlap = this.teacher === subject.teacher

//     let levelOverlap = this.level === subject.level

//     return (timeOverlap && teacherOverlap) || (timeOverlap && levelOverlap)
//   }
// }

// class Timetable {
//   constructor() {
//     this.subjects = []
//     this.fitness = 0
//   }

//   pushSubject(subject) {
//     this.subjects.push(subject)
//   }

//   clear() {
//     this.subjects = []
//   }

//   evaluate() {
//     for (let i = 0; i < this.subjects.length; i++) {
//       for (let j = 0; j < i; j++) {
//         if (this.subjects[i].overlap(this.subjects[j])) this.fitness++
//       }
//     }
//   }

//   crossover(parent) {
//     const random = Math.floor(Math.random() * this.subjects.length)
//     const firstHalf = this.subjects.slice(0, random)
//     const secondHalf = parent.subjects.slice(random)
//     const childSubjects = firstHalf.concat(secondHalf)
//     const childTimetable = new Timetable()
//     childTimetable.subjects = childSubjects
//     return childTimetable
//   }

//   mutation() {
//     let randomSubject =
//       this.subjects[Math.floor(Math.random() * this.subjects.length)]
//     let { days, startTime, endTime } = generateTimes(randomSubject.hpw)
//     randomSubject.days = [...days]
//     randomSubject.startTime = startTime
//     randomSubject.endTime = endTime
//   }
// }

// export class Population {
//   constructor(subjects = [], popSize) {
//     this.population = []
//     this.matingpool = []
//     this.found = false
//     this.result = null

//     let subjectsTemp = deepClone(subjects)
//     for (let j = 0; j < popSize; j++) {
//       let timetable = new Timetable()
//       subjectsTemp = deepClone(subjects)

//       for (let i = 0; i < subjectsTemp.length; i++) {
//         let { days, startTime, endTime } = generateTimes(subjectsTemp[i].hpw)
//         subjectsTemp[i].days = [...days]
//         subjectsTemp[i].startTime = startTime
//         subjectsTemp[i].endTime = endTime
//         timetable.pushSubject(subjectsTemp[i])
//       }
//       this.population.push(timetable)
//     }
//     let i = 0
//     while (true) {
//       console.log(i++)
//       let maxFit = Infinity
//       for (let i = 0; i < this.population.length; i++) {
//         this.population[i].evaluate()
//         if (this.population[i].fitness === 0) {
//           this.found = true
//           this.result = this.population[i]
//         }

//         if (this.population[i].fitness < maxFit) {
//           maxFit = this.population[i].fitness
//         }
//       }

//       if (this.found) break

//       for (let i = 0; i < this.population.length; i++) {
//         this.population[i].fitness = maxFit / this.population[i].fitness
//       }

//       for (let i = 0; i < this.population.length; i++) {
//         let n = Math.floor(this.population[i].fitness * 10)
//         for (let j = 0; j < n; j++) {
//           this.matingpool.push(this.population[i])
//         }
//       }

//       let newPop = []

//       for (let i = 0; i < popSize; i++) {
//         let child = this.selection()
//         if (child.fitness === 0) {
//           this.found = true
//           this.result = child
//         } else {
//           newPop.push(child)
//         }
//       }

//       if (this.found) break
//       this.population = []
//       this.population = deepClone(newPop)
//       this.matingpool = []
//     }
//   }

//   selection() {
//     let parentA =
//       this.matingpool[Math.floor(Math.random() * this.matingpool.length)]
//     let parentB =
//       this.matingpool[Math.floor(Math.random() * this.matingpool.length)]
//     let child = parentA.crossover(parentB)
//     child.mutation()
//     child.evaluate()
//     return child
//   }

//   add(subject) {
//     let result = deepClone(this.result)
//     let subjects = Array.from(result.subjects)
//     let levelSubjects = subjects.filter(
//       (_subject) => _subject.level === subject.level
//     )
//     let found = true

//     while (true) {
//       found = true
//       for (let i = 0; i < levelSubjects.length; i++) {
//         if (levelSubjects[i].overlap(subject)) {
//           found = false
//           break
//         }
//       }
//       if (found) break
//       let { days, startTime, endTime } = generateTimes(subject.hpw)
//       subject.days = [...days]
//       subject.startTime = startTime
//       subject.endTime = endTime
//     }

//     this.result.subjects.push(subject)
//   }
// }

// self.addEventListener("message", ({ data }) => {
//   let subjects = []

//   for (let i = 0; i < data.subjects.length; i++) {
//     let { name, instructor, level, hpw } = data.subjects[i]
//     subjects.push(new Subject(name, instructor, hpw, level))
//   }

//   let pop = new Population(subjects)

//   pop.result.subjects.map((subject) => {
//     subject.days = Array.from(subject.days)
//     subject.startTime = timesStrings[times.indexOf(subject.startTime)]
//     subject.endTime = timesStrings[times.indexOf(subject.endTime)]
//     return subject
//   })

//   self.postMessage(pop)
// })
