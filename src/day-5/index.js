const { parseInput, logSolution } = require('../util')

const passes = parseInput(__dirname + '/input.txt')

const calculateMin = (min, max) => Math.ceil(min + (max - min) / 2)
const calculateMax = (min, max) => Math.floor(max - (max - min) / 2)

const PartOne = () => {
  const seatIds = []
  let rows, cols

  for (let pass of passes) {
    rows = pass.substring(0, 7)
    cols = pass.substring(7, pass.length)

    let minRow = 0,
      maxRow = 127
    for (let row of rows) {
      if (row === 'F') {
        maxRow = calculateMax(minRow, maxRow)
      } else {
        minRow = calculateMin(minRow, maxRow)
      }
    }

    let minCol = 0,
      maxCol = 7
    for (let col of cols) {
      if (col === 'L') {
        maxCol = calculateMax(minCol, maxCol)
      } else {
        minCol = calculateMin(minCol, maxCol)
      }
    }

    seatIds.push(minRow * 8 + minCol)
  }

  return seatIds
}

const PartTwo = (seatIds) => {
  let missingId
  const sortedIds = seatIds.sort((a, b) => a - b)
  const startId = sortedIds[0]

  for (let i = 0; i < sortedIds.length; i++) {
    if (sortedIds.indexOf(i + startId) == -1) {
      missingId = i + startId
    }
  }

  return missingId
}

const seatIds = PartOne()

logSolution('Day 5: Binary Boarding', {
  1: Math.max(...seatIds),
  2: PartTwo(seatIds),
})
