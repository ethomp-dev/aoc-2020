const { parseInput, logSolution } = require('../util')
const { parseRules } = require('./util')

const rules = parseInput(__dirname + '/input.txt')
const ruleset = parseRules(rules)

const myBag = 'shiny gold'

const PartOne = () => {
  const findOuterBags = (bag, ruleset) => {
    let outerBags = new Set()

    for (let rule of ruleset) {
      if (rule.contents.find((obj) => obj.key === bag)) {
        outerBags.add(rule)
        outerBags = new Set([...outerBags, ...findOuterBags(rule.key, ruleset)])
      }
    }

    return outerBags
  }

  return findOuterBags(myBag, ruleset).size
}

const PartTwo = () => {
  const countInnerBags = (bag, ruleset) => {
    let totalBags = 0

    const rule = Array.from(ruleset).find((rule) => rule.key === bag)
    if (!rule) return 0

    for (let obj of rule.contents) {
      totalBags += obj.count + obj.count * countInnerBags(obj.key, ruleset)
    }

    return totalBags
  }

  return countInnerBags(myBag, ruleset)
}

logSolution('Day 7: Handy Haversacks', {
  1: PartOne(),
  2: PartTwo(),
})
