const fs = require('fs')

function parseInput(filename, delimeter = '\n') {
  const contents = fs.readFileSync(filename, 'utf-8')
  return contents.split(delimeter)
}

const logSolution = (title, answers) => {
  console.log(title)

  console.group()
  for (let [key, answer] of Object.entries(answers)) {
    console.log(`Part ${key}: ${answer}`)
  }
  console.groupEnd()

  console.log('\n')
}

module.exports = {
  parseInput,
  logSolution,
}
