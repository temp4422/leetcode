// Alternative map expressions
const map = new Map()
const chars = ['a', 'b', 'c', 'c', 'c']

for (const char of chars) {
  // Logical OR operator, misbehave with '0'
  // map.set(char, map.get(char) + 1 || 1)

  // Logical OR operator, handle '0'
  // map.set(char, (map.get(char) || 0) + 1)

  // Nullish coalescing operator, handle '0' ⭐️
  map.set(char, (map.get(char) ?? 0) + 1)

  // Ternary operator, handle '0'
  // map.set(char, map.has(char) ? map.get(char) + 1 : 1)

  // if...else conditions, misbehave with '0'
  // if (map.get(char)) {
  //   map.set(char, map.get(char) + 1)
  // } else {
  //   map.set(char, 1)
  // }
}

// Sort map by value [['a', 1], ['b', 2] ['c', 3]]
const sortedMap = [...map.entries()].sort((a, b) => a[1] - b[1])

// Get key or value at some index
let key = [...sortedMap.keys()].at(0)
let value = [...sortedMap.values()].at(0)
