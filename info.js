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
