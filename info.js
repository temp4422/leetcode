// Alternative map expressions
const map = new Map()
const nums = ['a', 'b', 'c', 'c', 'c']

for (const num of nums) {
  // Logical OR operator, misbehave with '0'
  // map.set(num, map.get(num) + 1 || 1)

  // Logical OR operator, handle '0'
  // map.set(num, (map.get(num) || 0) + 1)

  // Nullish coalescing operator, handle '0' ⭐️
  map.set(num, (map.get(num) ?? 0) + 1)

  // Ternary operator, handle '0'
  // map.set(num, map.has(num) ? map.get(num) + 1 : 1)

  // if...else conditions, misbehave with '0'
  // if (map.get(num)) {
  //   map.set(num, map.get(num) + 1)
  // } else {
  //   map.set(num, 1)
  // }
}
