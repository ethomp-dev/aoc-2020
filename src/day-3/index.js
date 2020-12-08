const { parseInput, logSolution } = require('../util')

const SPACE = {
  tree: '#',
  empty: '.',
}

const map = parseInput(__dirname + '/input.txt')
const mapHeight = map.length
const mapWidth = map[0].length

const PartOne = () => {
  let treeCount = 0
  let x = 0

  for (let y = 0; y < mapHeight; y++) {
    if (map[y][x] === SPACE.tree) {
      treeCount++
    }

    x += 3
    x = x % mapWidth
  }

  return treeCount
}

const PartTwo = () => {
  const countTrees = (slope) => {
    let treeCount = 0
    let x = 0

    for (let y = 0; y < mapHeight; y += slope.y) {
      if (map[y][x] === SPACE.tree) {
        treeCount++
      }

      x += slope.x
      x = x % mapWidth
    }

    return treeCount
  }

  const slopes = [
    countTrees({ x: 1, y: 1 }),
    countTrees({ x: 3, y: 1 }), // same as part one
    countTrees({ x: 5, y: 1 }),
    countTrees({ x: 7, y: 1 }),
    countTrees({ x: 1, y: 2 }),
  ]

  return slopes.reduce((a, b) => a * b)
}

logSolution('Day 3: Toboggan Trajectory', {
  1: PartOne(),
  2: PartTwo(),
})
