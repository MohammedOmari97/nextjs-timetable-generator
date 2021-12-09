const takenColors = []

const colors = [
  "#200ac3",
  "#ff5832",
  "#3366ff",
  "#ff4c4c",
  "#8a7967",
  "#f47721",
  "#279b37",
  "#7552cc",
  "#00c16e",
  "#fd5c63",
  "#050f2c",
  "#8ec06c",
  "#2a5934",
]

let subjectsColors = {}

function getColor(subject) {
  let id = Math.floor(Math.random() * colors.length)

  while (takenColors.includes(id)) {
    id = Math.floor(Math.random() * colors.length)
  }

  takenColors.push(id)
  subjectsColors[subject] = colors[id]
  return colors[id]
}

function deleteColor(id) {
  takenColors.splice(takenColors.indexOf(id), 1)
}

export { getColor, deleteColor }
