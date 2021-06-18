import { dayToGridIndex, timeToGridIndex } from "./data"

export function getBlocks(subject) {
  let blocks = []
  for (let i = 0; i < subject.hoursPerWeek; i++) {
    blocks.push(
      <div>
        <h4>{subject.instructor}</h4>
        <h4>{subject.name}</h4>
        <p>
          {subject.startTime} - {subject.endTime}
        </p>
      </div>
    )
  }

  return blocks
}

export function getStyles(day, startsAt, endsAt) {
  return [
    dayToGridIndex[day],
    timeToGridIndex[startsAt],
    timeToGridIndex[endsAt],
  ]
}
