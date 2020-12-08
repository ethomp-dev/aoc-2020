const { parseInput, logSolution } = require('../util')

const instructions = parseInput(__dirname + '/input.txt')

const OPERATION = {
  jump: 'jmp',
  accumulate: 'acc',
  none: 'nop',
}

const executeProgram = (instructions) => {
  let accumulator = 0
  const history = new Set()
  let duplicate = false
  let index = 0

  while (index < instructions.length && !duplicate) {
    if (!history.has(index)) {
      let [operation, arg] = instructions[index].split(' ')
      history.add(index)

      switch (operation) {
        case OPERATION.jump:
          index += parseInt(arg)
          break
        case OPERATION.accumulate:
          accumulator += parseInt(arg)
        default:
          index++
      }
    } else {
      // break the loop once repeat operation is found
      duplicate = true
    }
  }

  return { accumulator, history, duplicate }
}

const healProgram = (index, history, instructions) => {
  const { accumulator, duplicate } = executeProgram(instructions)

  if (duplicate === false) {
    return { accumulator, instructions }
  } else {
    const record = Array.from(history)[index]
    const patchedInstructions = [...instructions]

    const [currentOp, newOp] = patchedInstructions[record].includes(OPERATION.none)
      ? [OPERATION.none, OPERATION.jump]
      : [OPERATION.jump, OPERATION.none]

    patchedInstructions[record] = patchedInstructions[record].replace(currentOp, newOp)

    return healProgram(index - 1, history, patchedInstructions)
  }
}

const PartOne = () => {
  return executeProgram(instructions)
}

const PartTwo = (history) => {
  return healProgram(history.size - 1, history, instructions)
}

const answerOne = PartOne()
const answerTwo = PartTwo(answerOne.history)

logSolution('Day 8: Handheld Halting', {
  1: answerOne.accumulator,
  2: answerTwo.accumulator,
})
