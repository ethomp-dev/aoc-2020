const { parseInput, logSolution } = require('../util')

const rulesets = parseInput(__dirname + '/input.txt')

const PartOne = () => {
  const validPasswords = rulesets.filter((set) => {
    const min = set.substring(0, set.indexOf('-'))
    const max = set.substring(set.indexOf('-') + 1, set.indexOf(' '))
    const char = set.substring(set.indexOf(' ') + 1, set.indexOf(':'))
    const password = set.substring(set.indexOf(':') + 2, set.length)

    const matches = password.match(new RegExp(char, 'g')) || []
    return matches.length >= min && matches.length <= max
  })

  return validPasswords.length
}

const PartTwo = () => {
  const validPasswords = rulesets.filter((set) => {
    const index1 = set.substring(0, set.indexOf('-')) - 1
    const index2 = set.substring(set.indexOf('-') + 1, set.indexOf(' ')) - 1
    const char = set.substring(set.indexOf(' ') + 1, set.indexOf(':'))
    const password = set.substring(set.indexOf(':') + 2, set.length)

    return (
      (password[index1] === char && password[index2] !== char) ||
      (password[index1] !== char && password[index2] == char)
    )
  })

  return validPasswords.length
}

logSolution('Day 2: Password Philosophy', {
  1: PartOne(),
  2: PartTwo(),
})
