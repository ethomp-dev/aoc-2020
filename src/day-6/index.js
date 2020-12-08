const { parseInput, logSolution } = require('../util')

const groups = parseInput(__dirname + '/input.txt', '\n\n')
const questions = [...Array(26)].reduce((a) => a + String.fromCharCode(i++), '', (i = 97))

const PartOne = () => {
  const groupSums = []

  for (let group of groups) {
    let positives = group
      .replace(/\n/g, '')
      .split('')
      .filter((char, index, self) => self.indexOf(char) === index)

    groupSums.push(positives.length)
  }

  return groupSums.reduce((a, b) => a + b)
}

const PartTwo = () => {
  const groupSums = []

  for (let group of groups) {
    let members = group.split('\n')
    let positives = []

    for (let question of questions) {
      let negative = false

      for (let member of members) {
        if (member.indexOf(question) < 0) {
          negative = true
          break
        }
      }

      if (negative === false) {
        positives.push(question)
      }
    }

    groupSums.push(positives.length)
  }

  return groupSums.reduce((a, b) => a + b)
}

logSolution('Day 6: Custom Customs', {
  1: PartOne(),
  2: PartTwo(),
})
