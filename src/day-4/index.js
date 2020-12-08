const { parseInput, logSolution } = require('../util')

const passports = parseInput(__dirname + '/input.txt', '\n\n')

const PartOne = () => {
  const validPassports = []

  const fields = [
    { key: 'byr', required: true, label: 'Birth Year' },
    { key: 'iyr', required: true, label: 'Issue Year' },
    { key: 'eyr', required: true, label: 'Expiration Year' },
    { key: 'hgt', required: true, label: 'Height' },
    { key: 'hcl', required: true, label: 'Hair Color' },
    { key: 'ecl', required: true, label: 'Eye Color' },
    { key: 'pid', required: true, label: 'Passport ID' },
    { key: 'cid', required: false, label: 'Country ID' },
  ]

  for (let passport of passports) {
    let isValid = true

    for (let field of fields) {
      if (field.required === true && !passport.includes(`${field.key}:`)) {
        isValid = false
        break
      }
    }

    if (isValid) {
      validPassports.push(passport)
    }
  }

  return validPassports.length
}

const PartTwo = () => {
  const validPassports = []

  const fields = [
    { key: 'byr', required: true, length: 4, min: 1920, max: 2002, label: 'Birth Year' },
    { key: 'iyr', required: true, length: 4, min: 2010, max: 2020, label: 'Issue Year' },
    { key: 'eyr', required: true, length: 4, min: 2020, max: 2030, label: 'Expiration Year' },
    {
      key: 'hgt',
      required: true,
      pattern: /[0-9]{1,3}(cm|in)/g,
      ranges: { cm: { min: 150, max: 193 }, in: { min: 59, max: 76 } },
      label: 'Height',
    },
    { key: 'hcl', required: true, pattern: /^#[0-9|a-f]{6}$/gm, label: 'Hair Color' },
    { key: 'ecl', required: true, pattern: /(amb|blu|brn|gry|grn|hzl|oth)/g, label: 'Eye Color' },
    { key: 'pid', required: true, pattern: /^[0-9]{9}$/gm, label: 'Passport ID' },
    { key: 'cid', required: false, label: 'Country ID' },
  ]

  for (let passport of passports) {
    let isValid = true

    for (let field of fields) {
      if (field.required === true) {
        let keyIndex = passport.indexOf(`${field.key}:`)

        let value = passport.substring(keyIndex + 4, passport.length)
        value = value.split(' ')[0].split('\n')[0]

        let rangeKey = value.replace(/[0-9]/g, '')
        let range = field.ranges ? field.ranges[rangeKey] : null

        if (
          keyIndex < 0 ||
          (field.length && value.length !== field.length) ||
          (field.min && value < field.min) ||
          (field.max && value > field.max) ||
          (field.pattern && !value.match(field.pattern)) ||
          (range && (parseInt(value) < range.min || parseInt(value) > range.max))
        ) {
          isValid = false
          break
        }
      }
    }

    if (isValid) {
      validPassports.push(passport)
    }
  }

  return validPassports.length
}

logSolution('Day 4: Passport Processing', {
  1: PartOne(),
  2: PartTwo(),
})
