// #region Alternative Hash map expressions
const map = new Map()
const chars = ['a', 'b', 'c', 'c', 'c']

for (const char of chars) {
  // 1. Nullish coalescing operator, handle '0' ⭐️
  map.set(char, (map.get(char) ?? 0) + 1)

  // 2. Logical OR operator, handle '0'
  // map.set(char, (map.get(char) || 0) + 1)

  // 3. Logical OR operator, misbehave with '0'
  // map.set(char, map.get(char) + 1 || 1)

  // 4. Ternary operator, handle '0'
  // map.set(char, map.has(char) ? map.get(char) + 1 : 1)

  // 5. if...else conditions, misbehave with '0'
  // if (map.get(char)) {
  //   map.set(char, map.get(char) + 1)
  // } else {
  //   map.set(char, 1)
  // }
}
// #endregion

// #region Hash map manipulation
// Sort map by value [['a', 1], ['b', 2] ['c', 3]]
const sortedMap = [...map.entries()].sort((a, b) => a[1] - b[1])

// Get key or value at some index
const key = [...sortedMap.keys()].at(0)
const value = [...sortedMap.values()].at(0)
// #endregion

// #region Binary search
const binarySearch = function (array, target) {
  let low = 0
  let high = array.length - 1

  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    let guess = array[mid]

    if (guess === target) return guess
    else if (guess > target) high = mid - 1
    else if (guess < target) low = mid + 1
  }

  return -1 // Target not found
}
// const testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const item = 6
// binarySearch(testArray, item)
// #endregion
