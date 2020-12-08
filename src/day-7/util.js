const getKey = (rule, index = 0) => {
  return rule.substring(index, rule.indexOf('bag') - 1)
}

const getContents = (rule) => {
  return rule.substring(rule.indexOf('contain') + 8, rule.length)
}

const mapContents = (contents) => {
  return contents
    .filter((str) => /\d/.test(str))
    .map((str) => ({
      key: getKey(str, 2),
      count: parseInt(str.substring(0, 1)),
    }))
}

const parseRules = (rules) => {
  const ruleset = new Set()

  for (let rule of rules) {
    let contents = getContents(rule).split(', ')

    ruleset.add({
      key: getKey(rule),
      contents: mapContents(contents),
    })
  }

  return ruleset
}

module.exports = {
  parseRules,
}
