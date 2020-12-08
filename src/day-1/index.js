const { parseInput, logSolution } = require('../util')

const input = parseInput(__dirname + '/input.txt')
  .map((num) => parseInt(num))
  .sort((a, b) => a - b)

const sum = 2020

const PartOne = () => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      if (input[i] + input[j] === sum) {
        return input[i] * input[j]
      }
    }
  }

  return 0
}

const PartTwo = () => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        if (input[i] + input[j] + input[k] === sum) {
          return input[i] * input[j] * input[k]
        }
      }
    }
  }

  return 0
}

logSolution('Day 1: Report Repair', {
  1: PartOne(),
  2: PartTwo(),
})
