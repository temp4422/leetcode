'use strict'

// My helper functions, speed up debugging
import { testFunction, arrayToLinkedList } from './helper.js'

// 1306. Jump Game III, Medium
// Array, Depth-first search, Breadth-first search
/*****************************************************************************/
/*
Positioned at start index of the array, check if you can reach to any index with value 0 ?
TODO: Use DFS for undirected unweighted acyclic graph to find target.
Steps:
  1. build graph with all indexes (hash map)
    [4, 2, 3, 0, 3, 1, 2] values
    [0, 1, 2, 3, 4, 5, 6] indicesk
    Map { 0 => [ 4, null ], each record corespond to jump indicies: jump from index 0 to index -4(null) and 4
          1 => [ 3, null ],
          2 => [ 5, null ],
          3 => [ 3, 3 ],
          4 => [ null, 1 ],
          5 => [ 6, 4 ],
          6 => [ null, 4 ] }
  2. traverse the graph to find if it containt target
*/
/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
const canReach = function (arr, start) {
  // 1. Build graph as hash map
  const graph = new Map()
  function buildGraph() {
    // 1.1 Check if index lower/bigger than arr, if so return empty values
    function check(item) {
      let left = item - arr[item]
      let right = item + arr[item]
      if (left == right) return [item] // Target
      if (left < 0 && right > arr.length - 1) return [] // Empty
      if (left < 0) return [right] // Only right
      if (right > arr.length - 1) return [left] // Only left
      return [left, right] // Both values valid
    }
    // 1.2 Set each node in graph (index) to adjecent nodes (indices) = i [i + arr.at(i), i - arr.at(i)]
    // i.e. Make nodes and conections to other nodes
    for (let i = 0; i < arr.length; i++) {
      graph.set(i, check(i))
    }
  }
  buildGraph()
  // ;(arr = [4, 2, 3, 0, 3, 1, 2]), (start = 5) // Output: true
  // ;(arr = [4, 2, 3, 0, 3, 1, 2]), (start = 0) // Output: true
  // ;(arr = [3, 0, 2, 1, 2]), (start = 2) // Output: false
  // ;(arr = [0, 1]), (start = 1) // true
  // ;(arr = [47, 26, 216, 78, 179, 101, 42, 233, 185, 56, 303, 310, 169, 338, 51, 104, 308, 162, 81, 82, 169,41, 106, 150, 285, 298, 33, 251, 289, 236, 256, 227, 197, 186, 267, 326, 268, 243, 89, 347, 72, 0,89, 157, 90, 333, 327, 76, 106, 68, 355, 124, 234, 70, 43, 248, 259, 280, 199, 201, 312, 327, 217,278, 330, 258, 348, 351, 223, 240, 143, 244, 64, 343, 339, 101, 193, 18, 140, 312, 71, 225, 111,79, 199, 226, 321, 344, 31, 177, 362, 115, 341, 79, 146, 303, 348, 291, 250, 169, 78, 307, 325,33, 338, 316, 201, 343, 37, 37, 0, 15, 341, 38, 44, 67, 280, 128, 31, 106, 220, 172, 349, 142,339, 181, 102, 351, 81, 209, 41, 181, 59, 216, 230, 170, 257, 52, 5, 338, 28, 75, 208, 307, 108,103, 34, 342, 82, 233, 263, 12, 167, 358, 316, 150, 337, 158, 78, 231, 26, 22, 147, 81, 12, 319,161, 12, 75, 129, 54, 119, 131, 334, 292, 253, 255, 98, 39, 67, 146, 15, 329, 120, 80, 347, 89,124, 303, 315, 235, 55, 1, 100, 290, 187, 333, 326, 87, 138, 48, 41, 153, 118, 192, 152, 279, 69,154, 71, 152, 273, 61, 153, 267, 51, 106, 225, 204, 327, 50, 15, 202, 244, 328, 3, 150, 355, 240,240, 188, 92, 107, 244, 280, 102, 265, 273, 328, 115, 70, 221, 357, 101, 186, 251, 116, 24, 125,58, 185, 34, 356, 21, 108, 221, 169, 208, 230, 226, 235, 336, 304, 315, 334, 329, 229, 190, 20,104, 348, 132, 66, 265, 55, 212, 102, 167, 52, 2, 328, 114, 101, 196, 99, 155, 158, 337, 191, 119,14, 347, 127, 305, 142, 156, 92, 340, 358, 58, 7, 178, 79, 355, 289, 199, 251, 233, 351, 57, 115,306, 179, 31, 42, 123, 87, 101, 218, 71, 193, 205, 300, 180, 42, 19, 280, 233, 293, 181, 147, 359,190, 168, 191, 5, 58, 198, 154, 139, 29, 342, 261, 245, 141, 26, 251, 162, 360, 219, 233, 297,287, 262, 112, 87, 261, 21, 205, 131, 98, 161, 103, 57,]), (start = 313) // true
  // ;(arr = [4, 2, 3, 0, 3, 1, 2]), (start = 5) // true
  // ;(arr = [4, 4, 1, 3, 0, 3]), (start = 2) // true
  // ;(arr = [5, 11, 18, 16, 21, 3, 19, 0, 16, 4, 9, 20, 2, 13, 0, 2, 23, 8, 19, 22, 16, 19, 19, 25, 25, 15, 7,]),(start = 18) // false
  // ;(arr = [1, 1, 1, 1, 1, 1, 1, 1, 0]), (start = 3) // true
  // ;(arr = [4, 2, 3, 0, 3, 1, 2]), (start = 0) // true
  // console.log(graph)

  // 2. BFS, DFS, DFS-Recursive
  // Breadth-first search on grpah
  function bfs() {
    const visited = new Set()
    const stack = [start]
    for (let i = 0; i < stack.length; i++) {
      const idx = stack[i]
      if (arr[idx] === 0) return true
      if (!visited.has(idx)) {
        visited.add(idx)
        stack.push(...graph.get(idx))
      }
    }
    return false
  }
  // return bfs()

  // Depth-first search on graph
  function dfs() {
    const visited = new Set()
    const stack = [start]
    while (stack.length > 0) {
      const idx = stack.pop() // Current index = last item in stack
      if (arr[idx] === 0) return true // Found target
      if (!visited.has(idx)) {
        visited.add(idx) // Add current item to visited, so won't execute same item later
        stack.push(...graph.get(idx)) // Get current node neighbors into stack
      }
    }
    return false
  }
  // return dfs()

  // Depth-first search recursive on graph
  const visited = new Set()
  const stack = []
  function dfsRecursive() {
    if (arr[start] === 0) return true
    visited.add(start)
    stack.push(...graph.get(start)) // Add adjacent nodes to stack
    for (let i = stack.length - 1; i >= 0; i--) {
      // Cycle from end to start
      start = stack[i]
      // 'arr' and 'start' taken from outer function, while 'visited' and 'stack' should be declared inside recursive function manullay. So this: 'recursive(visited, stack)' - also valid.
      if (!visited.has(start)) return dfsRecursive(arr, start, visited, stack)
    }
    return false
  }
  // return dfsRecursive()
}
// console.log(canReach(arr, start))

// 2648. Generate Fibonacci Sequence, Easy
// callCount = 5 // Output: [0,1,1,2,3]
// callCount = 0 // Output: []
/**
 * @return {Generator<number>}
 */
var fibGenerator = function* () {
  // Xn = Xn-1 + Xn-2
  let fib = [0, 1]
  for (let i = 1; i < fib.length; i++) {
    let curr = fib.at(-1) + fib.at(-2)
    fib.push(curr)
    yield fib[i - 1]
  }
}
// const gen = fibGenerator()
// console.log(gen.next().value) // 0
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 2
// console.log(gen.next().value) // 3
// console.log(gen.next().value) // 5
// console.log(gen.next().value) // 8

// 206. Reverse Linked List, Easy
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // Explanation:
  // 1) Declare basics. Add two pointers to watch for the list
  let p1 = null // Point pointer 1 to null
  let p2 = head // Point pointer 2 to head

  // 2) Move pointers and head references
  while (head) {
    p2 = p2.next // 1) Point p2 to next node
    head.next = p1 // 2) Point head to new node
    p1 = head // 3) Point p1 to old head
    head = p2 // 4) Point head to next node (thus head become new head)
  }

  // 3) Pointer 1 become new head, that points to reversed list
  return p1
}
// const head = arrayToLinkedList([1, 2, 3, 4, 5]) //?
// const expected = arrayToLinkedList([5, 4, 3, 2, 1]) //?
// console.log(reverseList(head))

// 2649. Nested Array Generator, Medium
/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function* (arr) {
  const flatArr = []

  function flatting(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flatting(arr[i])
      } else {
        flatArr.push(arr[i])
      }
    }
  }
  flatting(arr)

  for (let i = 0; i < flatArr.length; i++) {
    yield flatArr[i]
  }
}
// const gen = inorderTraversal([1, [2, 3]])
// const gen = inorderTraversal([[[[[]]]]])
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 2
// console.log(gen.next().value) // 3

// 2693. Call Function with Custom Context, Medium
/**
 * @param {Object} context
 * @param {Array} args
 * @return {null|boolean|number|string|Array|Object}
 */
Function.prototype.callPolyfill = function (context, ...args) {
  return this.bind(context)(...args)
}
// //prettier-ignore
// function increment() {return ++this.count}
// console.log(increment.callPolyfill({ count: 1 })) //2
// function tax(price, taxRate) {
//   const totalCost = price * (1 + taxRate)
//   console.log(`The cost of ${this.item} is ${totalCost}`)
// }
// console.log(tax.callPolyfill({ item: 'burger' }, 10, 1.1))

// 35. Search Insert Position, Easy
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let tmp = nums.indexOf(target)
  if (tmp === -1) {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > target) return i
      if (i === nums.length - 1) return i + 1
    }
  } else {
    return tmp
  }
}
// let nums = [1, 3, 5, 6], target = 5 //2
// let nums = [1, 3, 5, 6],target = 2 // 1
// let nums = [1, 3, 5, 6], target = 7 //4
// console.log(searchInsert(nums, target))

// 70. Climbing Stairs, Easy
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // https://leetcode.com/problems/climbing-stairs/solutions/2810612/4-ways-to-solve-with-detailed-diagrams-no-memoization-beats-100-time-memory/
  // ways to reach given step = ways to reach last step + ways to reach second-last step

  let step = 1
  let previousStep = 0

  for (let i = 0; i < n; i++) {
    // ;[previousStep, step] = [step, previousStep + step]
    let tmp = previousStep
    previousStep = step
    step = tmp + step
  }

  return step
}
// console.log(climbStairs(1)) // 1
// console.log(climbStairs(2)) // 2
// console.log(climbStairs(3)) // 3
// console.log(climbStairs(4)) // 5
// console.log(climbStairs(5)) // 8

// 260. Single Number III, Medium
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      if (map.get(nums[i]).length < 1) map.get(nums[i]).push(nums[i])
      if (map.get(nums[i]).length === 1) map.delete(nums[i])
    } else {
      map.set(nums[i], [])
    }
  }

  // Destructure map iterator object
  const result = [...map.keys()]
  return result
}
// console.log(singleNumber([1, 2, 1, 3, 2, 5]))

// 83. Remove Duplicates from Sorted List, Easy
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head || !head.next) return head // Check base condition

  // Create new dummy node that points to head, need to  return later
  const dummy = new ListNode(0, head)

  // Loop through nodes until reach `null`
  while (head) {
    // Drop `if` because of redundant code, but functions same way as without
    // if (head.next && head.val === head.next.val) {while ...}

    while (head.next && head.val === head.next.val) {
      // If face duplicate, skip next node, i.e. link this node pointer to node after the next node (next.next)
      head.next = head.next.next
    }

    // Cycle through all nodes
    head = head.next
  }

  // Return head
  return dummy.next
}
// Alternative with single loop
// var deleteDuplicates = function (head) {
//   if (!head || head.next === null) return head

//   let dummy = head

//   while (dummy.next) {
//     if (dummy.val === dummy.next.val) {
//       dummy.next = dummy.next.next
//     } else {
//       dummy = dummy.next
//     }
//   }

//   return head
// }
// const head = arrayToLinkedList([1, 1, 2])
// const head2 = arrayToLinkedList([1,1,2,3,3])
// console.log(deleteDuplicates(head)) // Output [1,2]
// console.log(deleteDuplicates(head2)) // Output [1,2,3]
//
// testFunction = deleteDuplicatesEasy
// const inputX = arrayToLinkedList([1, 2, 3, 3, 3, 4, 4, 5])
// const outputX = arrayToLinkedList([1, 2, 3, 4, 5])
// input(inputX).output(outputX) //?

// 171. Excel Sheet Column Number, Easy
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  // Get UTF-16 code (ASCII table) value, by subtracting all characters before UPPERCASE UTF-16 index
  // I.e. 31 characters are reserved, so we start from ' ' (space) what correspond to 32
  // ' ' -> 32, '0' -> 48, 'A' -> 65, 'a' -> 97
  // So 'A' at 65 index minus 64 = 1, we got starting value to count from
  // Now simply count as it's base 26 integers that we should calculate

  let result = 0
  // Reverse string to start count from end
  columnTitle = columnTitle.split('').reverse().join('')

  for (let i = 0; i < columnTitle.length; i++) {
    // result += (columnTitle.charCodeAt(i) - 64) * Math.pow(26, i)
    let char = columnTitle.charCodeAt(i) - 64
    let pow = Math.pow(26, i)
    result += char * pow
  }
  return result
}
// console.log(titleToNumber('A')) // Output: 1
// console.log(titleToNumber('AB')) // Output: 28
// console.log(titleToNumber('ZY')) // Output: 701
// console.log(titleToNumber('AAE')) // Output: 707

// 168. Excel Sheet Column Title, Easy
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  let result = ''
  while (columnNumber > 0) {
    // Adjust columnNumber to 0-based index ? WHY ? So below reminder calculations is possible with 0, thus we start from 65 -> 'A'
    columnNumber--
    // Get the character corresponding to the remainder after dividing by 26
    let char = String.fromCharCode((columnNumber % 26) + 65)
    // Append character in front of result string
    result = char + result
    // Divide columnNumber by 26 to move forward
    columnNumber = Math.floor(columnNumber / 26)
  }
  return result
}
// console.log(convertToTitle(1)) // Output: "A"
// console.log(convertToTitle(28)) // Output: "AB"
// console.log(convertToTitle(701)) // Output: "ZY"
// console.log(convertToTitle(707)) // Output: "AAE"

// 344. Reverse String, Easy
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  // s.reverse()
  const length = s.length
  for (let i = 1; i < length + 1; i++) s.push(s.at(length - i))
  s.splice(0, length)
  return s
}
// reverseString(['h', 'e', 'l', 'l', 'o']) // Output: ["o","l","l","e","h"]
// reverseString(['H', 'a', 'n', 'n', 'a', 'h']) // Output: ["h","a","n","n","a","H"]

// 387. First Unique Character in a String, Easy
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  let tmp = []

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] === s[j]) {
        tmp.push(s[i])
        break
      }
    }
    // After inner loop ends, check for unique character
    if (tmp.includes(s[i])) continue
    else return i
  }

  return -1
}
// console.log(firstUniqChar('leetcode')) // Output: 0
// console.log(firstUniqChar('loveleetcode')) // Output: 2
// console.log(firstUniqChar('aabb')) // Output: -1
// console.log(firstUniqChar('z')) // Output: 0
// console.log(firstUniqChar('dddccdbba')) // Output: 8

// 412. Fizz Buzz, Easy
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  const answer = []

  for (let i = 1; i < n + 1; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      answer.push('FizzBuzz')
    } else if (i % 3 === 0) {
      answer.push('Fizz')
    } else if (i % 5 === 0) {
      answer.push('Buzz')
    } else {
      answer.push(i.toString())
    }
  }
  return answer
}
// console.log(fizzBuzz(3)) // Output: ["1","2","Fizz"]
// console.log(fizzBuzz(5)) // Output: ["1","2","Fizz","4","Buzz"]
// console.log(fizzBuzz(15)) // Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

// 521. Longest Uncommon Subsequence I, Easy
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function (a, b) {
  // Set longest string
  let long = a.length >= b.length ? a : b
  // Return longest string length if no common subsequence (if uncommon is true)
  for (let i = 0; i < long.length; i++) {
    if (a[i] != b[i]) return long.length
  }
  return -1
}
// console.log(findLUSlength('aba', 'cdc')) // 3
// console.log(findLUSlength('aaa', 'bbb')) // 3
// console.log(findLUSlength('aaa', 'aaa')) // -1
// console.log(findLUSlength('aefawfawfawfaw', 'aefawfeawfwafwaef')) // 17

// 415. Add Strings, Easy
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  // return (BigInt(num1) + BigInt(num2)).toString() // Alternative

  // Test PPP (Pseudocode Programming Process)

  // Decalare vars
  let ans = ''
  let len1 = num1.length - 1
  let len2 = num2.length - 1
  let carry = 0

  // Get longer string
  let longer = len1 >= len2 ? len1 : len2
  // Go through each character in longer string from end to start
  for (let i = longer; i > -1; i--) {
    // Get integer at index, but also check if index overflow below 0
    let int1 = len1 >= 0 ? parseInt(num1.at(len1)) : 0
    let int2 = len2 >= 0 ? parseInt(num2.at(len2)) : 0

    // Initialize sum and add integers
    let sum = 0

    // If carry
    if (carry) {
      sum = int1 + int2 + 1
      carry = 0 // reset carry
    } else {
      sum = int1 + int2
    }

    // If sum > 9 add 1 to carry and subtract 10
    if (sum > 9) {
      carry++
      sum = sum - 10
    }

    // Add sum to answer
    ans = sum + ans

    // Decrease len1 & len2
    len1--
    len2--
  }

  // Check if carry still exists
  if (carry) ans = carry + ans

  return ans
}
// console.log(addStrings('11', '123')) // Output: "134"
// console.log(addStrings('456', '77')) // Output: "533"
// console.log(addStrings('0', '0')) // Output: "0"
// console.log(addStrings('9333852702227987', '85731737104263')) // Output: "9419584439332250"
// console.log(addStrings('1', '9')) // Output: "10"

// 2769. Find the Maximum Achievable Number, Easy
// Math
/**
 * @param {number} num
 * @param {number} t
 * @return {number}
 */
var theMaximumAchievableX = function (num, t) {
  for (let i = 0; i < t; i++) {
    num += 1
  }
  return num + t
}
//prettier-ignore
// let num = 4, t = 1 // Output: 6
// let num = 3, t = 2 // Output: 7
// console.log(theMaximumAchievableX(num, t))

// 2469. Convert the Temperature, Easy, Math
/**
 * @param {number} celsius
 * @return {number[]}
 */
var convertTemperature = function (celsius) {
  const kelvin = celsius + 273.15
  const fahrenheit = celsius * 1.80 + 32.00
  return [kelvin, fahrenheit]
}
// console.log(convertTemperature(36.5)) // Output: [309.65000,97.70000]

// 2942. Find Words Containing Character, Easy
/**
 * @param {string[]} words
 * @param {character} x
 * @return {number[]}
 */
var findWordsContaining = function (words, x) {
  const result = []
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(x)) {
      result.push(i)
    }
  }
  return result
}
// console.log(findWordsContaining(['leet', 'code'], 'e'))

// 1108. Defanging an IP Address, Easy
/**
 * @param {string} address
 * @return {string}
 */
var defangIPaddr = function (address) {
  // return address.replace(/\./g, "[.]")
  let newAddress = ''
  for (let i = 0; i < address.length; i++) {
    if (address[i] === '.') {
      newAddress += '[.]'
      continue
    }
    newAddress += address[i]
  }
  return newAddress
}

// 118. Pascal's Triangle, Easy
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  // Basic conditions
  if (numRows < 1) return []
  if (numRows === 1) return [[1]]

  // Fill result with first 2 rows of Pascal's Triangle
  const result = [[1], [1, 1]]

  // Count from second row, because of `filled result` above
  for (let row = 2; row < numRows; row++) {
    let lastRow = result.at(-1) // Select lastRow from result, start from `[1, 1]`
    let newNums = [] // Init temporal empty array to hold new calculated numbers

    // Create inner piece of new row (newNums) by adding numbers, one by one, from last row
    for (let num = 1; num < lastRow.length; num++) {
      newNums.push(lastRow[num - 1] + lastRow[num]) // Add numbers, one by one, in a row
      // Alternative: start fron num = 0 and check for out of array value `if (!lastRow[num + 1]) break`
    }

    // Add `1, ..., 1` on each new row, because of pascal triangle properties
    let newRow = [1, ...newNums, 1] // Use spread `...` syntax to incorporate nums into newRow
    result.push(newRow)
  }

  // console.log(result)
  return result
}
//prettier-ignore
// testFunction(generate).input(5).output([[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]) //?

// 1512. Number of Good Pairs, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  let goodPairs = 0

  for (let i = 0; i < nums.length; i++) {
    for (let j = i+1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        goodPairs++
      }
    }
  }

  return goodPairs
}
// testFunction(numIdenticalPairs).input([1, 2, 3, 1, 1, 3]).output(4) //?

// 1929. Concatenation of Array, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function (nums) {
  return nums.concat(nums)
}
// testFunction(getConcatenation).input([1, 2, 1]).output([1, 2, 1, 1, 2, 1]) //?

// 119. Pascal's Triangle II, Easy
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  if (rowIndex === 0) return [1]
  if (rowIndex === 1) return [1, 1]

  const pascalTriangle = [[1], [1, 1]]

  for (let row = 2; row < rowIndex + 1; row++) {
    let lastRow = pascalTriangle.at(-1)
    let newNums = []

    for (let num = 1; num < lastRow.length; num++) {
      newNums.push(lastRow[num - 1] + lastRow[num])
    }

    let newRow = [1, ...newNums, 1]
    pascalTriangle.push(newRow)
  }

  return pascalTriangle.pop()
}
// testFunction(getRow).input(3).output([1, 3, 3, 1]) //?

// 217. Contains Duplicate, Easy
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  const set = new Set(nums)
  const newArr = Array.from(set)
  // If there are less elements in new array it's mean, original array has duplicates
  return newArr.length < nums.length ? true : false
  // Alternative return set.size !== nums.length
}
// testFunction(containsDuplicate).input([1, 2, 3, 1]).output(true) //?

// 231. Power of Two, Easy
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  if (n === 0) return false

  let result = 0
  let multiplier = 0

  while (result < n) {
    result = Math.pow(2, multiplier)
    multiplier++
  }

  // If we count before or past our input 'number', this mean it's not a power of two.
  return result === n ? true : false
}
// testFunction(isPowerOfTwo).input(0).output(false) //?
// testFunction(isPowerOfTwo).input(1).output(true) //?
// testFunction(isPowerOfTwo).input(3).output(false) //?
// testFunction(isPowerOfTwo).input(6).output(false) //?

// 283. Move Zeroes, Easy
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  const zeroes = []

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      nums.splice(i, 1)
      zeroes.push(0)
      i--
    }
  }

  nums.push(...zeroes)

  return nums
}
// testFunction(moveZeroes).input([0, 1, 0, 3, 12]).output([1, 3, 12, 0, 0]) //?
// testFunction(moveZeroes).input([0, 0, 1]).output([1, 0, 0]) //?

// 292. Nim Game, Easy
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function (n) {
  /*
    The winning strategy for the two-player version of this game is to always say a multiple of 4
    -> https://en.wikipedia.org/wiki/Nim#The_21_game
    Calculate modulo of 4
    If number can be divided by 4 without reminder, this mean we will always lose if we do first move.
    Explanation: doesn't metter what step we take, opponent, will always take last nim in this case.
    So we generalize all possible cases, to where we will face upon last 4 nims, and if it's our move - than we lose.
    If the number is divided by 4 without reminder, we will face situation where we will meet this criteria bad for us.
    Optimal step is to leave your oponent with number that will be divided by 4 wihout reminder ( n % 4 === 0), so if your oponent face last 4 nims - than you win.
    If two players always make optimal moves, the one who make first move - always win.
  */
  return n % 4 === 0 ? false : true
}
// testFunction(canWinNim).input(0).output(false) //?
// testFunction(canWinNim).input(1).output(true) //?
// testFunction(canWinNim).input(2).output(true) //?
// testFunction(canWinNim).input(3).output(true) //?
// testFunction(canWinNim).input(4).output(false) //?
// testFunction(canWinNim).input(5).output(true) //?

// 258. Add Digits, Easy
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
  let newNum = num.toString()

  while (newNum.length > 1) {
    let addend1 = newNum.slice(0, 1)
    let addend2 = parseInt(newNum.slice(1))
    newNum = eval(`${addend1} + ${addend2}`).toString()
  }

  return parseInt(newNum)
  // Alternative  return (num == 0) ? 0 :(num % 9 == 0) ? 9 : num % 9 ;
}
// testFunction(addDigits).input(38).output(2) //?
// testFunction(addDigits).input(635915053).output(1) //?

// 263. Ugly Number, Easy
/**
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (n) {
  // Time Limit Exceeded!
  // if (n <= 0) return false
  // const primeFactors = []
  // let divisor = 2
  // while (n >= 2) {
  //   if (n % divisor === 0) {
  //     n /= divisor
  //     primeFactors.push(divisor)
  //   } else {
  //     divisor++
  //   }
  // }
  // const filteredPrimeFactors = primeFactors.filter((i) => i === 2 || i === 3 || i === 5)
  // return primeFactors.length === filteredPrimeFactors.length

  // https://leetcode.com/problems/ugly-number/solutions/541479/easy-js-solution
  if (n <= 0) return false
  while (n > 1) {
    if (n % 2 == 0) n /= 2
    else if (n % 3 == 0) n /= 3
    else if (n % 5 == 0) n /= 5
    else return false
  }
  return n === 1 ? true : false
}
// testFunction(isUgly).input(6).output(true) //?
// testFunction(isUgly).input(1010).output(false) //?
// testFunction(isUgly).input(-2147483648).output(false) //?
// testFunction(isUgly).input(1369479539).output(false) //?

// 268. Missing Number, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let n = nums.length
  nums.sort((a, b) => a - b)

  if (nums[0] !== 0) return 0

  for (let i = 1; i < n; i++) {
    let previous = nums[i - 1]
    let current = nums[i]
    if (previous + 1 != current) return current - 1
  }

  // Alternative
  // for (let i = 1; i < nums.length; i++){
  // if (nums[i] !== i) return i}

  return n // If no number in the middle
}
// testFunction(missingNumber).input([3, 0, 1]).output(2) //?
// testFunction(missingNumber).input([0, 1]).output(2) //?
// testFunction(missingNumber).input([1]).output(0) //?

// 278. First Bad Version, Easy
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */
/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    // Binary search algorithm
    let start = 1
    let end = n

    while (start < end) {
      let mid = Math.floor((start + end) / 2)
      // If we found bad version we keep search from mid to right (end)
      if (isBadVersion(mid)) {
        end = mid
        // If we found good version we keep search from mid to left (start)
      } else {
        // Add 1 to mid, because mid is 100% 'good version', so we skip it and go to next after it, otherwise we may be traped in infinity loop
        start = mid + 1
      }
    }

    // After full search, we face 'mid === start === end', so we break while loop
    return start
  }
}
// const isBadVersion = function (version) {
//   return version === 4 ? true : false
// }
// const testBadVersion = solution(isBadVersion)
// testBadVersion(5)

// 303. Range Sum Query - Immutable, Easy
// /**
//  * @param {number[]} nums
//  */
// var NumArray = function (nums) {
//   this.nums = nums
// }
// /**
//  * @param {number} left
//  * @param {number} right
//  * @return {number}
//  */
// NumArray.prototype.sumRange = function (left, right) {
//   const cut = this.nums.slice(left, right + 1)
//   const sum = cut.reduce((a, b) => a + b)
//   return sum
// }
// /**
//  * Your NumArray object will be instantiated and called as such:
//  * var obj = new NumArray(nums)
//  * var param_1 = obj.sumRange(left,right)
//  */
// Aletrnative
class NumArray {
  constructor(nums) {
    this.nums = nums
  }
  sumRange(left, right) {
    const cut = this.nums.slice(left, right + 1)
    const sum = cut.reduce((a, b) => a + b)
    return sum
  }
}
// const numArray = new NumArray([-2, 0, 3, -5, 2, -1])
// numArray.sumRange(0, 2) // return (-2) + 0 + 3 = 1
// numArray.sumRange(2, 5) // return 3 + (-5) + 2 + (-1) = -1
// numArray.sumRange(0, 5) // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3

// 338. Counting Bits, Easy
/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  const ans = []
  for (let i = 0; i < n + 1; i++) {
    let decimalToBinary = i.toString(2)
    //prettier-ignore
    // Convert to array -> map string to number -> count 1's
    let countOnes = decimalToBinary.split('').map(i => Number(i)).reduce((a,b)=> a+b)
    ans.push(countOnes)
  }
  return ans
}
// testFunction(countBits).input(2).output([0, 1, 1]) //?
// testFunction(countBits).input(5).output([0, 1, 1, 2, 1, 2]) //?

// 345. Reverse Vowels of a String, Easy
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const newString = s.split('')
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  const foundVowels = []

  // Save all vowels as foundVowels array
  for (let i = 0; i < newString.length; i++) {
    if (vowels.includes(s[i])) {
      foundVowels.push(s[i])
    }
  }
  // Replace each vowel in string with vowels from foundVowels array by poping them from back of array
  for (let i = 0; i < newString.length; i++) {
    if (vowels.includes(s[i])) {
      newString.splice(i, 1, foundVowels.pop())
    }
  }

  return newString.join('')
}
// testFunction(reverseVowels).input('hello').output('holle') //?

// 349. Intersection of Two Arrays, Easy
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  const set = new Set()
  const longArr = nums1.length >= nums2.length ? nums1 : nums2
  const shortArr = nums1.length < nums2.length ? nums1 : nums2

  for (let i = 0; i < shortArr.length; i++) {
    if (longArr.includes(shortArr[i])) {
      set.add(shortArr[i])
    }
  }

  return Array.from(set)

  // Alternative
  // let set1 = new Set(nums1);
  // let set2 = new Set(nums2);
  // return Array.from(new Set([...set1].filter(x => set2.has(x))))
}
// testFunction(intersection).input([1, 2, 2, 1], [2, 2]).output([2]) //?
// testFunction(intersection).input([1, 2], [1, 1]).output([1]) //?

// 350. Intersection of Two Arrays II, Easy
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const intersectArr = []

  const longArr = nums1.length >= nums2.length ? nums1 : nums2
  const shortArr = nums1.length < nums2.length ? nums1 : nums2

  for (let i = 0; i < shortArr.length; i++) {
    if (longArr.includes(shortArr[i])) {
      intersectArr.push(shortArr[i])
      longArr.splice(longArr.indexOf(shortArr[i]), 1)
    }
  }

  return intersectArr
}
// testFunction(intersect).input([1, 2, 2, 1], [2, 2]).output([2, 2]) //?
// testFunction(intersect).input([1, 2], [1, 1]).output([1]) //?
// testFunction(intersect).input([2, 1], [1, 1]).output([1]) //?

// 225. Implement Stack using Queues, Easy
class MyStack {
  constructor() {
    this.stack = []
  }
  /**
   * @param {number} x
   * @return {void}
   */
  push = function (x) {
    this.stack.push(x)
  }

  /**
   * @return {number}
   */
  pop = function () {
    return this.stack.pop()
  }

  /**
   * @return {number}
   */
  top = function () {
    return this.stack.at(-1)
  }

  /**
   * @return {boolean}
   */
  empty = function () {
    return this.stack.length === 0 ? true : false
  }
}
// var obj = new MyStack()
// obj.push('x')
// var param_2 = obj.pop()
// var param_3 = obj.top()
// var param_4 = obj.empty()

// 232. Implement Queue using Stacks, Easy
class MyQueue {
  constructor() {
    this.queue = []
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push = function (x) {
    this.queue.push(x)
  }

  /**
   * @return {number}
   */
  pop = function () {
    return this.queue.shift()
  }

  /**
   * @return {number}
   */
  peek = function () {
    return this.queue.at(0)
  }

  /**
   * @return {boolean}
   */
  empty = function () {
    return this.queue.length === 0 ? true : false
  }
}
// var obj = new MyQueue()
// obj.push('x')
// var param_2 = obj.pop()
// var param_3 = obj.peek()
// var param_4 = obj.empty()

// 326. Power of Three, Easy
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
  if (n === 0) return false
  let powerOfThree = 0
  let i = 0
  while (powerOfThree <= n) {
    if (powerOfThree === n) return true
    powerOfThree = Math.pow(3, i)
    i++
  }
  return false
  // Alternative 1 (division)
  // while (n > 1) {
  //   n /= 3
  // }
  // return n === 1
  // https://leetcode.com/problems/power-of-three/solutions/2468437/javascript-solution-faster-and-less-than-85
  // Alternative 2
  // return n > 0 && 1162261467 % n === 0
  // Since 3 is a prime number, any power of 3 will only be divisible by any power of 3 that is equal or smaller. We can use this to our advantage by taking the largest possible power of 3 within our constraints (3^19 = 1162261467) and performing a modulo n operation on it. If the result is a 0, then n is a power of 3.
  // https://leetcode.com/problems/power-of-three/solutions/1178718/js-python-java-c-easy-logarithm-modulo-solutions-w-explanation
}
// testFunction(isPowerOfThree).input(27).output(true) //?
// testFunction(isPowerOfThree).input(0).output(false) //?
// testFunction(isPowerOfThree).input(1).output(true) //?

// 342. Power of Four, Easy
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfFour = function (n) {
  while (n >= 1) {
    if (n === 1) return true
    n /= 4
  }
  return false
}
// testFunction(isPowerOfFour).input(16).output(true) //?

// 374. Guess Number Higher or Lower, Easy
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */
// Example
// let pick = 6
// function guess(num) {
//   if (num > pick) return -1
//   if (num < pick) return 1
//   if (num === pick) return 0
// }
/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  let low = 0
  let high = n

  while (low <= high) {
    let mid = Math.floor((low + high) / 2)
    let checkGuess = guess(mid)
    if (checkGuess === 0) {
      return mid
    } else if (checkGuess === 1) {
      // Add or Subtract 1, because we already checked 'mid' above 'guess(mid)' and that doesn't satisfy
      low = mid + 1
    } else if (checkGuess === -1) {
      // Add or Subtract 1, because we already checked 'mid' above 'guess(mid)' and that doesn't satisfy
      high = mid - 1
    }
  }
  // If 'guess(mid) === 0', we return last possible value
  return low
}
// testFunction(guessNumber).input(10).output(6) //?
// testFunction(guessNumber).input(2).output(1) //?

// 389. Find the Difference, Easy
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  s = s.split('').sort()
  t = t.split('').sort()
  for (let i = 0; i < t.length; i++) {
    if (t[i] != s[i]) {
      return t[i]
    }
  }
}
// testFunction(findTheDifference).input('abcd', 'abcde').output('e') //?

// 405. Convert a Number to Hexadecimal, Easy
/**
 * @param {number} num
 * @return {string}
 */
var toHex = function (num) {
  // Transform to positive representation of negative number
  // https://en.wikipedia.org/wiki/Two%27s_complement#Procedure
  if (num < 0) {
    num = 0xffffffff + num + 1
  }
  return num.toString(16)
  // Alternative
  // return num >= 0 ? num.toString(16) : (4294967296 + num).toString(16);
  // return ((num)>>>0).toString(16)
  // https://leetcode.com/problems/convert-a-number-to-hexadecimal/solutions/4210508/convert-a-number-to-hexadecimal-javascript-solution-by-bharadwaj
}
// testFunction(toHex).input(26).output('1a') //?
// testFunction(toHex).input(-1).output('ffffffff') //?

// 448. Find All Numbers Disappeared in an Array, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  // https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/solutions/2468452/javascript-solution-faster-than-90
  const set = new Set(nums)
  const result = []

  for (let i = 0; i < nums.length; i++) {
    if (!set.has(i + 1)) {
      result.push(i + 1)
    }
  }
  return result

  // Time Limit Exceeded. Testcases passed, but took too long.
  // const givenArr = Array.from(new Set(nums))
  // const fullArr = Array.from({ length: nums.length }, (v, k) => k + 1)
  // const result = []

  // for (let i = 0; i < fullArr.length; i++) {
  //   if (!givenArr.includes(fullArr[i])) {
  //     result.push(fullArr[i])
  //   }
  // }

  // return result
}
// testFunction(findDisappearedNumbers).input([4, 3, 2, 7, 8, 2, 3, 1]).output([5, 6]) //?
// testFunction(findDisappearedNumbers).input([1, 1]).output([2]) //?

// 455. Assign Cookies, Easy
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function (g, s) {
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)
  // let result = 0
  // let j = 0
  // // 'j' = child index and 'i' = cookie index
  // for (let i = 0; i < s.length; i++) {
  //   let cookieSize = s[i]
  //   let greedFactor = g[j]
  //   if (cookieSize >= greedFactor) {
  //     result++
  //     j++
  //   }
  // }
  // return result

  // Alternative "Clean Code" practice
  let contentChildren = 0
  let childIndex = 0
  let cookieIndex = 0
  while (cookieIndex < s.length && childIndex < g.length) {
    let cookieSize = s[cookieIndex]
    let greedFactor = g[childIndex]
    if (cookieSize >= greedFactor) {
      contentChildren++
      childIndex++
    }
    cookieIndex++
  }
  return contentChildren
}
// testFunction(findContentChildren).input([1, 2, 3], [1, 1]).output(1) //?
// testFunction(findContentChildren).input([1, 2], [1, 2, 3]).output(2) //?
// testFunction(findContentChildren).input([1, 2, 3], [3]).output(1) //?
// testFunction(findContentChildren).input([10, 9, 8, 7], [5, 6, 7, 8]).output(2) //?

// 459. Repeated Substring Pattern, Easy
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  let sliceIndex = 1

  while (sliceIndex < s.length) {
    let slice = s.slice(0, sliceIndex)
    let substring = slice
    while (substring.length < s.length) {
      substring += slice
    }
    if (substring === s) return true
    sliceIndex++
  }
  return false

  // // Time Limit Exceeded
  // let sliceIndex = -1
  // while (sliceIndex * -1 < s.length) {
  //   let slice = s.slice(0, sliceIndex) //?
  //   let regex = new RegExp(`${slice}`, 'g')
  //   let result = s.match(regex)
  //   if (result.join('') === s) {
  //     return true
  //   }
  //   sliceIndex--
  // }
  // return false
}
// testFunction(repeatedSubstringPattern).input('abab').output(true) //?
// testFunction(repeatedSubstringPattern).input('aba').output(false) //?

// 434. Number of Segments in a String, Easy
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  const splitStringArray = s.split(' ')
  let segments = 0
  for (let i = 0; i < splitStringArray.length; i++) {
    if (splitStringArray[i] != '') {
      segments++
    }
  }
  return segments
  // Alternative
  // return s.split(' ').filter((x) => x !== '').length
}
// testFunction(countSegments).input('Hello, my name is John').output(5) //?
// testFunction(countSegments).input('').output(0) //?

// 441. Arranging Coins, Easy
/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function (n) {
  let totalCoins = n
  let stairsCount = 0
  let usedCoins = 1
  while (totalCoins >= usedCoins) {
    totalCoins -= usedCoins
    usedCoins++
    stairsCount++
  }
  return stairsCount
  // // Time Limit Exceeded
  // const coins = Array(n).fill(1)
  // const staircase = []
  // for (let i = 1; i < n + 1; i++) {
  //   let row = []
  //   while (row.length < i) {
  //     if (coins.length === 0) return staircase.length // Out of coins
  //     row.push(coins.pop())
  //   }
  //   staircase.push(row)
  // }
  // return staircase.length
}
// testFunction(arrangeCoins).input(5).output(2) //?
// testFunction(arrangeCoins).input(1).output(1) //?
// testFunction(arrangeCoins).input(1804289383).output(60070) //?

// 414. Third Maximum Number, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  const sortedSet = Array.from(new Set(nums)).sort((a, b) => b - a)
  let thirdMaximumNumber = sortedSet[0]
  let lstMaximumNumber = thirdMaximumNumber
  let countToThree = 1

  for (let i = 1; i < sortedSet.length; i++) {
    if (thirdMaximumNumber > sortedSet[i] && countToThree <= 3) {
      lstMaximumNumber = thirdMaximumNumber
      thirdMaximumNumber = sortedSet[i]
      countToThree++
    }
    if (countToThree === 3) return thirdMaximumNumber
  }

  return lstMaximumNumber
}
// testFunction(thirdMax).input([3, 2, 1]).output(1) //?
// testFunction(thirdMax).input([1, 2]).output(2) //?
// testFunction(thirdMax).input([2, 2, 3, 1]).output(1) //?
// testFunction(thirdMax).input([1, 1, 1]).output(1) //?
// testFunction(thirdMax).input([1, 2, 2, 5, 3, 5]).output(2) //?

// 461. Hamming Distance, Easy
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let bigBinary = (x >= y ? x : y).toString(2)
  let smallBinary = (x < y ? x : y).toString(2)
  while (smallBinary.length < bigBinary.length) {
    smallBinary = '0' + smallBinary
  }

  let hammingDistance = 0
  for (let i = bigBinary.length; i >= 0; i--) {
    if (bigBinary[i] != smallBinary[i]) {
      hammingDistance++
    }
  }
  return hammingDistance
}
// testFunction(hammingDistance).input(1, 4).output(2) //?
// testFunction(hammingDistance).input(3, 1).output(1) //?

// 482. License Key Formatting, Easy
/**
 * @param {number[][]} grid
 * @return {number}
 */
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var licenseKeyFormatting = function (s, k) {
  let dashFreeLicenseKey = s.replace(/-/g, '').toUpperCase()
  let charactersGroup = k
  let reformattedLicenseKey = ''

  for (let i = dashFreeLicenseKey.length - 1; i >= 0; i--) {
    reformattedLicenseKey = dashFreeLicenseKey[i] + reformattedLicenseKey
    charactersGroup--
    if (charactersGroup === 0 && i > 0) {
      reformattedLicenseKey = '-' + reformattedLicenseKey
      charactersGroup = k
    }
  }
  return reformattedLicenseKey
}
// testFunction(licenseKeyFormatting).input('5F3Z-2e-9-w', 4).output('5F3Z-2E9W') //?
// testFunction(licenseKeyFormatting).input('2-5g-3-J', 2).output('2-5G-3J') //?

// 485. Max Consecutive Ones, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let maxConsecutiveOnes = 0
  let countConsecutiveOnes = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      countConsecutiveOnes++
    } else {
      countConsecutiveOnes = 0
    }
    if (countConsecutiveOnes > maxConsecutiveOnes) maxConsecutiveOnes = countConsecutiveOnes
  }
  return maxConsecutiveOnes
}
// testFunction(findMaxConsecutiveOnes).input([1, 1, 0, 1, 1, 1]).output(3) //?

// 495. Teemo Attacking, Easy
/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
  let poisonedDuration = duration
  for (let i = 1; i < timeSeries.length; i++) {
    let lastAttackTime = timeSeries[i - 1]
    let attackTime = timeSeries[i]
    let difference = attackTime - lastAttackTime
    if (difference >= duration) {
      poisonedDuration += duration
    } else {
      poisonedDuration += difference
    }
  }

  return poisonedDuration
}
// testFunction(findPoisonedDuration).input([1, 4], 2).output(4) //?
// testFunction(findPoisonedDuration).input([1, 2], 3).output(4) //?

// 496. Next Greater Element I, Easy
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const greaterElements = []

  for (let i = 0; i < nums1.length; i++) {
    let searchIndex = nums2.indexOf(nums1[i])
    let element = nums2[searchIndex]

    while (searchIndex < nums2.length) {
      let nextElement = nums2[searchIndex + 1]

      if (element < nextElement) {
        greaterElements.push(nextElement)
        break
      }
      if (searchIndex === nums2.length - 1) {
        greaterElements.push(-1)
        break
      }

      searchIndex++
    }
  }
  return greaterElements
}
// testFunction(nextGreaterElement).input([4, 1, 2], [1, 3, 4, 2]).output([-1, 3, -1]) //?
// testFunction(nextGreaterElement).input([2, 4], [1, 2, 3, 4]).output([3, -1]) //?
// testFunction(nextGreaterElement).input([1, 3, 5, 2, 4], [6, 5, 4, 3, 2, 1, 7]).output([7, 7, 7, 7, 7]) //?

// 500. Keyboard Row, Easy
/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (words) {
  return words.filter(
    (word) =>
      /\b[qwertyuiop]+\b/i.test(word) ||
      /\b[asdfghjkl]+\b/i.test(word) ||
      /\b[zxcvbnm]+\b/i.test(word)
  )
  // https://leetcode.com/problems/keyboard-row/solutions/97867/intuitive-javascript-solution/comments/102271

  // My Alternative
  // const oneRowWords = []
  // const firstRow = 'qwertyuiopQWERTYUIOP'
  // const secondRow = 'asdfghjklASDFGHJKL'
  // const thirdRow = 'zxcvbnmZXCVBNM'
  // for (const word of words) {
  //   for (let i = 0; i < word.length; i++) {
  //     let character = word[i]
  //     if (!firstRow.includes(character)) {
  //       break
  //     }
  //     if (i === word.length - 1) oneRowWords.push(word)
  //   }
  //   for (let i = 0; i < word.length; i++) {
  //     let character = word[i]
  //     if (!secondRow.includes(character)) {
  //       break
  //     }
  //     if (i === word.length - 1) oneRowWords.push(word)
  //   }
  //   for (let i = 0; i < word.length; i++) {
  //     let character = word[i]
  //     if (!thirdRow.includes(character)) {
  //       break
  //     }
  //     if (i === word.length - 1) oneRowWords.push(word)
  //   }
  // }
  // return oneRowWords
}
// testFunction(findWords).input(['Hello', 'Alaska', 'Dad', 'Peace']).output(['Alaska', 'Dad']) //?
// testFunction(findWords).input(['adsdf', 'sfd']).output(['adsdf', 'sfd']) //?
// testFunction(findWords).input(['omk']).output([]) //?

// 504. Base 7, Easy
/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num) {
  return num.toString(7)
}
// testFunction(convertToBase7).input(100).output('202') //?

// 506. Relative Ranks, Easy
/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function (score) {
  // Sort without mutating original array
  const sortedScore = [...score].sort((a, b) => b - a)
  // Save sorted score order
  const indexOfSortedScore = new Map()
  sortedScore.forEach((el, i) => indexOfSortedScore.set(sortedScore[i], i))

  const athleteRank = []
  for (let i = 0; i < score.length; i++) {
    let rank = (indexOfSortedScore.get(score[i]) + 1).toString()

    // Check medals
    if (rank === '1') rank = 'Gold Medal'
    if (rank === '2') rank = 'Silver Medal'
    if (rank === '3') rank = 'Bronze Medal'

    athleteRank.push(rank)
  }
  return athleteRank
}
//prettier-ignore
// testFunction(findRelativeRanks).input([5, 4, 3, 2, 1]).output(['Gold Medal', 'Silver Medal', 'Bronze Medal', '4', '5']) //?
//prettier-ignore
// testFunction(findRelativeRanks).input([10, 3, 8, 9, 4]).output(['Gold Medal', '5', 'Bronze Medal', 'Silver Medal', '4']) //?

// 520. Detect Capital, Easy
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  return /^[A-Z]*$|^[a-z]*$|^[A-Z][a-z]*$/.test(word)
}
// testFunction(detectCapitalUse).input('FlaG').output(false) //?
// testFunction(detectCapitalUse).input('USA').output(true) //?
// testFunction(detectCapitalUse).input('Google').output(true) //?
// testFunction(detectCapitalUse).input('leetcode').output(true) //?

// 541. Reverse String II, Easy
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  const splitString = []

  for (let i = 0; i < s.length; i += k) {
    let moduloChange = i % (2 * k) === 0 // Change on each 2k
    let innerString = s.substring(i, i + k)
    if (moduloChange) innerString = innerString.split('').reverse().join('')
    splitString.push(innerString)
  }

  return splitString.join('')
}
// testFunction(reverseStr).input('abcdefg', 2).output('bacdfeg') //?
// testFunction(reverseStr).input('abcd', 2).output('bacd') //?

// 557. Reverse Words in a String III, Easy
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  const words = s.split(' ')
  const reverseString = []
  for (const word of words) {
    let reverseWord = ''
    for (let i = word.length - 1; i > -1; i--) {
      reverseWord += word[i]
    }
    reverseString.push(reverseWord)
  }
  return reverseString.join(' ')

  // Alternative 1
  // return s.split(' ').map(word => word.split('').reverse().join('')).join(' ');
  // https://leetcode.com/problems/reverse-words-in-a-string-iii/solutions/4111436/94-58-split-join-two-pointers

  // Alternative 2
  // const words = s.split(' ')
  // for (let i = 0; i < words.length; i++) {
  //   words[i] = words[i].split('').reverse().join('')
  // }
  // return words.join(' ')
  // https://leetcode.com/problems/reverse-words-in-a-string-iii/solutions/4111458/91-55-easy-solution-reverse-join
}
// testFunction(reverseWords).input("Let's take LeetCode contest").output("s'teL ekat edoCteeL tsetnoc") //?

// 551. Student Attendance Record I, Easy
/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function (s) {
  let absentCount = 0
  let lateCount = 0

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'A') {
      absentCount++
      if (absentCount === 2) return false
    }
    if (s[i] === 'L') {
      if (s[i - 1] != 'L') lateCount = 0
      lateCount++
      if (lateCount === 3) return false
    }
  }
  return true

  // Alternative
  // return !/(A.*A|LLL)/.test(s)
  // return !/^.*(A.*A|L{3,}).*$/.test(s)
}
// testFunction(checkRecord).input('PPALLP').output(true) //?
// testFunction(checkRecord).input('PPALLL').output(false) //?

// 575. Distribute Candies, Easy
/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  const allowedCandies = candyType.length / 2
  const allowedCandyTypes = new Set()

  for (const candy of candyType) {
    if (allowedCandyTypes.size < allowedCandies) {
      allowedCandyTypes.add(candy)
    }
  }

  return allowedCandyTypes.size

  // Alternative
  // return Math.min(new Set(candies).size, candies.length / 2);
}
// testFunction(distributeCandies).input([1, 1, 2, 2, 3, 3]).output(3) //?
// testFunction(distributeCandies).input([1, 1, 2, 3]).output(2) //?

// 594. Longest Harmonious Subsequence, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLHS = function (nums) {
  let currentSequence = []
  let harmoniousLength = 0

  for (const [index, value] of nums.entries()) {
    currentSequence.push(value)

    for (let i = index + 1; i < nums.length; i++) {
      let nextValue = nums[i]
      if (value === nextValue || value + 1 === nextValue) {
        currentSequence.push(nextValue)
      }
    }

    if (currentSequence.length > harmoniousLength) {
      let same = currentSequence[0]
      let checkSame = currentSequence.every((value) => value === same)
      if (!checkSame) {
        harmoniousLength = currentSequence.length
      }
    }
    currentSequence = []

    currentSequence.push(value)

    for (let i = index + 1; i < nums.length; i++) {
      let nextValue = nums[i]
      if (value === nextValue || value - 1 === nextValue) {
        currentSequence.push(nextValue)
      }
    }

    if (currentSequence.length > harmoniousLength) {
      let same = currentSequence[0]
      let checkSame = currentSequence.every((value) => value === same)
      if (!checkSame) {
        harmoniousLength = currentSequence.length
      }
    }
    currentSequence = []
  }

  return harmoniousLength //?
}
// testFunction(findLHS).input([1, 3, 2, 2, 5, 2, 3, 7]).output(5) //?
// testFunction(findLHS).input([1, 2, 3, 4]).output(2) //?
// testFunction(findLHS).input([1, 1, 1, 1]).output(0) //?

// 682. Baseball Game, Easy
/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function (operations) {
  const record = []

  for (const operation of operations) {
    switch (operation) {
      case '+':
        record.push(record.at(-1) + record.at(-2))
        break
      case 'D':
        record.push(record.at(-1) * 2)
        break
      case 'C':
        record.pop()
        break
      default:
        record.push(parseInt(operation))
        break
    }
  }

  let totalSum = record.reduce((acc, cur) => acc + cur, 0)
  return totalSum
}
// testFunction(calPoints).input(['5', '2', 'C', 'D', '+']).output(30) //?

// 709. To Lower Case, Easy
/**
 * @param {string} s
 * @return {string}
 */
var toLowerCase = function (s) {
  return s.toLowerCase()
  // Alternative
  // let lowerCaseString = ''
  // for (let i = 0; i < s.length; i++) {
  //   lowerCaseString += s[i].toLowerCase()
  // }
  // return lowerCaseString
}
// testFunction(toLowerCase).input('Hello').output('hello') //?

// 744. Find Smallest Letter Greater Than Target, Easy
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  let greater = target.charCodeAt(0) + 1
  for (const letter of letters) {
    if (letter.charCodeAt(0) >= greater) return letter
  }
  return letters[0]
  // Alternative
  // return letters.find(character => character > target) || letters[0];
}
// testFunction(nextGreatestLetter).input(['c', 'f', 'j'], 'a').output('c') //?

// 748. Shortest Completing Word, Easy
/**
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
var shortestCompletingWord = function (licensePlate, words) {
  // https://leetcode.com/problems/shortest-completing-word/solutions/4264212/the-shortest-and-most-understandable-solution
  let filteredWord = licensePlate.toLowerCase().replace(/\d|\s/g, '')
  const sortedWords = words.sort((a, b) => a.length - b.length) // Shortest word at start

  for (const word of sortedWords) {
    let checkPattern = filteredWord // reset for each word

    for (let i = 0; i < word.length; i++) {
      checkPattern = checkPattern.replace(word[i], '')
      if (!checkPattern) return word
    }
  }
}
// testFunction(shortestCompletingWord).input('1s3 PSt', ["step","steps","stripe","stepple"]).output("steps") //?
// testFunction(shortestCompletingWord).input("1s3 456", ["looks","pest","stew","show"]).output("pest") //?

// 771. Jewels and Stones, Easy
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
var numJewelsInStones = function (jewels, stones) {
  const stonesArray = stones.split('')
  let matchingStones = 0
  for (const stone of stonesArray) {
    if (jewels.match(stone)) {
      matchingStones++
    }
  }
  return matchingStones
  // Alternative
  // return stones.split('').filter((stone) => jewels.includes(stone)).length
}
// testFunction(numJewelsInStones).input('aA', 'aAAbbbb').output(3) //?

// 796. Rotate String, Easy
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  for (let i = 0; i < s.length; i++) {
    let tmp = s.split('')
    tmp.push(tmp.at(0))
    tmp.shift()
    s = tmp.join('')
    if (s == goal) return true
  }
  return false
  // Alternative
  // return s.concat(s).includes(goal) // Have all possible shifts
}
// testFunction(rotateString).input('abcde', 'cdeab').output(true) //?
// testFunction(rotateString).input('abcde', 'abced').output(false) //?

// 705. Design HashSet, Easy
class MyHashSet {
  constructor() {
    this.set = []
  }
  /**
   * @param {number} key
   * @return {void}
   */
  add(key) {
    if (!this.set.includes(key)) {
      this.set.push(key)
    }
  }
  /**
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    if (this.set.includes(key)) {
      this.set.splice(this.set.indexOf(key), 1)
    }
  }
  /**
   * @param {number} key
   * @return {boolean}
   */
  contains(key) {
    return this.set.includes(key)
  }
}
// // Alternative
// class MyHashSet {
//   constructor() {
//     this.hashSet = {}
//   }
//   add(key) {
//     this.hashSet[key] = null
//   }
//   remove(key) {
//     delete this.hashSet[key]
//   }
//   contains(key) {
//     return this.hashSet.hasOwnProperty(key)
//   }
// }
// const testSet = new MyHashSet()
// testSet.add(5)
// testSet.remove(5)
// testSet.contains(5)

// 706. Design HashMap, Easy
class MyHashMap {
  constructor() {
    this.hashMap = {}
  }
  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    this.hashMap[key] = value
  }
  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    return (this.hashMap[key] ??= -1)
  }
  /**
   * @param {number} key
   * @return {void}
   */
  remove(key) {
    delete this.hashMap[key]
  }
}
// var obj = new MyHashMap()
// obj.put('test', 111)
// obj.get('test')
// obj.remove('test')

// 804. Unique Morse Code Words, Easy
/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function (words) {
  //prettier-ignore
  const morseCodeTable = {a:'.-',b:'-...',c:'-.-.',d:'-..',e:'.',f:'..-.',g:'--.',h:'....',i:'..',j:'.---',k:'-.-',l:'.-..',m:'--',n:'-.',o:'---',p:'.--.',q:'--.-',r:'.-.',s:'...',t:'-',u:'..-',v:'...-',w:'.--',x:'-..-',y:'-.--',z:'--..'}
  let transformation = ''
  let transformationArray = []

  for (const word of words) {
    for (let i = 0; i < word.length; i++) {
      transformation += morseCodeTable[word[i]]
    }
    transformationArray.push(transformation)
    transformation = ''
  }

  return new Set(transformationArray).size
}
// testFunction(uniqueMorseRepresentations).input(['gin', 'zen', 'gig', 'msg']).output(2) //?

// 806. Number of Lines To Write String, Easy
/**
 * @param {number[]} widths
 * @param {string} s
 * @return {number[]}
 */
var numberOfLines = function (widths, s) {
  const maxLineLength = 100
  let currentLineLength = 0
  let totalLineNumber = 1

  const alphlabet = 'abcdefghijklmnopqrstuvwxyz'
  const newLetterWidth = {}
  alphlabet.split('').forEach((letter, index) => {
    newLetterWidth[letter] = widths[index]
  })

  for (let i = 0; i < s.length; i++) {
    let currentLetterWidth = newLetterWidth[s[i]]

    if (currentLineLength + currentLetterWidth <= maxLineLength) {
      currentLineLength += currentLetterWidth
    } else {
      totalLineNumber++
      currentLineLength = 0
      currentLineLength += currentLetterWidth
    }
  }
  return [totalLineNumber, currentLineLength]
}
//prettier-ignore
// testFunction(numberOfLines).input([10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], "abcdefghijklmnopqrstuvwxyz").output([3,60]) //?
//prettier-ignore
// testFunction(numberOfLines).input([4,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10], "bbbcccdddaaa").output([2,4]) //?

// 819. Most Common Word, Easy
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function(paragraph, banned) {
  const cleanParagraph = paragraph.replace(/[^\w]/g, ' ').trim().toLowerCase()
  const tokens = cleanParagraph.split(/\s+/g)
  const map = new Map()

  for (const token of tokens) {
    if (map.get(token)) {
      map.set(token, map.get(token) + 1)
    } else {
      map.set(token, 1)
    }
    // Alternative
    // map.set(token, map.has(token) ? map.get(token) + 1 : 1)
  }

  const sortedEntries = [...map.entries()].sort((a, b) => b[1] - a[1])

  for (const entry of sortedEntries) {
    if (!banned.includes(entry[0])) return entry[0]
  }
}
// testFunction(mostCommonWord).input("Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"]).output("ball") //?
// testFunction(mostCommonWord).input("a, a, a, a, b,b,b,c, c", ["a"]).output("b") //?
// testFunction(mostCommonWord).input("..Bob hit a ball, the hit BALL flew far after it was hit.", ["hit"]).output("ball") //?

// 821. Shortest Distance to a Character, Easy
/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {
  const distanceIndicies = []

  let maxValue = Infinity
  for (let i = 0; i < s.length; i++) {
    if (s[i] === c) {
      distanceIndicies[i] = 0
      maxValue = i
    } else {
      let minValue = Math.abs(maxValue - i)
      distanceIndicies[i] = minValue
    }
  }

  maxValue = Infinity
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === c) {
      distanceIndicies[i] = 0
      maxValue = i
    } else {
      let minValue = Math.min(distanceIndicies[i], Math.abs(maxValue - i))
      distanceIndicies[i] = minValue
    }
  }

  return distanceIndicies
}
// testFunction(shortestToChar).input('loveleetcode', 'e').output([3, 2, 1, 0, 1, 0, 0, 1, 2, 2, 1, 0]) //?
// testFunction(shortestToChar).input('aaba', 'b').output([2, 1, 0, 1]) //?

// 824. Goat Latin, Easy
/**
 * @param {string} sentence
 * @return {string}
 */
var toGoatLatin = function (sentence) {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  const arraySentence = sentence.split(' ')
  const goatLatin = []
  let ending = 'a'

  for (let i = 0; i < arraySentence.length; i++) {
    let word
    if (vowels.includes(arraySentence[i].charAt(0).toLowerCase())) {
      word = arraySentence[i] + 'ma'
    } else {
      word = arraySentence[i].slice(1) + arraySentence[i].charAt(0) + 'ma'
    }
    word += ending
    ending += 'a'

    goatLatin.push(word)
  }

  return goatLatin.join(' ')
}
// testFunction(toGoatLatin).input('I speak Goat Latin').output('Imaa peaksmaaa oatGmaaaa atinLmaaaaa') //?

// 844. Backspace String Compare, Easy
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  let firstString = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '#') {
      firstString = firstString.substring(0, firstString.length - 1)
    } else {
      firstString += s[i]
    }
  }

  let secondString = ''
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '#') {
      secondString = secondString.substring(0, secondString.length - 1)
    } else {
      secondString += t[i]
    }
  }

  return firstString === secondString
}
// testFunction(backspaceCompare).input('ab#c', 'ad#c').output(true) //?
// testFunction(backspaceCompare).input('ab##', 'c#d#').output(true) //?

// 859. Buddy Strings, Easy
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  // 0. Edge cases
  if (s.length != goal.length || s.length < 2) return false

  // 1. Handle separately 2 letters
  if (s.length === 2) return s.at(-1) + s.at(0) === goal

  // 2. Check for more than 2 differences
  const diffIndex = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] != goal[i]) diffIndex.push(i)
    if (diffIndex.length > 2) return false
  }

  // 3. Check for twins. Two identical letters can be swapped.
  if (diffIndex.length === 0) {
    const set = new Set()
    for (let i = 0; i < s.length; i++) {
      if (set.has(s[i]) && s === goal) return true
      set.add(s[i])
    }
    return false
  }
  // Alternative
  // if(!diffIndex.length) return s.length != [...new Set(s)].length;

  // 4. Check swapped letters
  const [i, j] = diffIndex
  return s[i] == goal[j] && goal[i] == s[j]

  // Answer
  // https://leetcode.com/problems/buddy-strings/solutions/786309/javascript-clean-and-intuitive-solution
}
// testFunction(buddyStrings).input('ab', 'ba').output(true) //?
// testFunction(buddyStrings).input('ab', 'ab').output(false) //?
// testFunction(buddyStrings).input('aa', 'aa').output(true) //?
// testFunction(buddyStrings).input('abcd', 'abcd').output(false) //?
// testFunction(buddyStrings).input('abab', 'abab').output(true) //?
// testFunction(buddyStrings).input('abcaa', 'abcbb').output(false) //?
// testFunction(buddyStrings).input('abac', 'abad').output(false) //?
// testFunction(buddyStrings).input('aaaaaaabc', 'aaaaaaacb').output(true) //?
// testFunction(buddyStrings).input('abab', 'baba').output(false) //?
// testFunction(buddyStrings).input('abcd', 'bacd').output(true) //?

// 933. Number of Recent Calls, Easy
class RecentCounter {
  constructor() {
    this.requests = []
  }
  /**
   * @param {number} t
   * @return {number}
   */
  ping(t) {
    this.requests.push(t)
    let requestsNumber = 0

    for (let i = this.requests.length - 1; i >= 0; i--) {
      if (t - 3000 > this.requests[i]) {
        return requestsNumber
      } else {
        requestsNumber++
      }
    }
    return requestsNumber
  }
}
// const recentCounter = new RecentCounter()
// recentCounter.ping(1) //?
// recentCounter.ping(100) //?
// recentCounter.ping(3001) //?
// recentCounter.ping(3002) //?

// 884. Uncommon Words from Two Sentences, Easy
/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  const countWords = new Map()
  const concatenatedWords = [...s1.split(' '), ...s2.split(' ')]
  for (const word of concatenatedWords) {
    countWords.has(word) ? countWords.set(word, countWords.get(word) + 1) : countWords.set(word, 1)
  }

  const uncommonWords = []
  for (const [word, count] of countWords) {
    if (count === 1) {
      uncommonWords.push(word)
    }
  }
  return uncommonWords
}
// testFunction(uncommonFromSentences).input("this apple is sweet","this apple is sour").output(["sweet","sour"]) //?

// 888. Fair Candy Swap, Easy
/**
 * @param {number[]} aliceSizes
 * @param {number[]} bobSizes
 * @return {number[]}
 */
var fairCandySwap = function (aliceSizes, bobSizes) {
  const aliceCandies = aliceSizes.reduce((acc, curr) => acc + curr)
  const bobCandies = bobSizes.reduce((acc, curr) => acc + curr)
  const difference = (aliceCandies - bobCandies) / 2
  for (const bobCandy of bobSizes) {
    if (aliceSizes.includes(bobCandy + difference)) {
      return [bobCandy + difference, bobCandy]
    }
  }
}
// testFunction(fairCandySwap).input([1, 1], [2, 2]).output([1, 2]) //?
// testFunction(fairCandySwap).input([1, 2], [2, 3]).output([1, 2]) //?

// 917. Reverse Only Letters, Easy
/**
 * @param {string} s
 * @return {string}
 */
var reverseOnlyLetters = function (s) {
  let temporalArray = []
  let reverseStringArray = []

  for (let i = 0; i < s.length; i++) {
    if (s[i].match(/[a-zA-Z]/)) {
      temporalArray.push(s[i])
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i].match(/[a-zA-Z]/)) {
      reverseStringArray.push(temporalArray.pop())
    } else {
      reverseStringArray.push(s[i])
    }
  }

  return reverseStringArray.join('')
}
// testFunction(reverseOnlyLetters).input('ab-cd').output('dc-ba') //?
// testFunction(reverseOnlyLetters).input('a-bC-dEf-ghIj').output('j-Ih-gfE-dCba') //?
// testFunction(reverseOnlyLetters).input('Test1ng-Leet=code-Q!').output('Qedo1ct-eeLg=ntse-T!') //?

// 929. Unique Email Addresses, Easy
/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function (emails) {
  const formattedEmails = []
  for (const email of emails) {
    let firstEmailHalf = email.substring(0, email.indexOf('@')).replaceAll('.', '')
    if (firstEmailHalf.includes('+')) {
      firstEmailHalf = firstEmailHalf.substring(0, firstEmailHalf.indexOf('+'))
    }
    let seconEmaildHalf = email.substring(email.indexOf('@'))
    let newEmail = firstEmailHalf + seconEmaildHalf
    formattedEmails.push(newEmail)
  }
  return new Set(formattedEmails).size
}
// testFunction(numUniqueEmails).input(["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]).output(2) //?
// testFunction(numUniqueEmails).input(["a@leetcode.com","b@leetcode.com","c@leetcode.com"]).output(3) //?

// 942. DI String Match, Easy
/**
 * @param {string} s
 * @return {number[]}
 */
var diStringMatch = function (s) {
  const permutationArray = []
  let increment = 0
  let decrement = s.length

  for (let i = 0; i < s.length + 1; i++) {
    if (s[i] === 'I') {
      permutationArray.push(increment++)
    } else {
      permutationArray.push(decrement--)
    }
    // Alternative
    // permutationArray[i] = s[i] === 'I' ? increment++ : decrement--
  }
  return permutationArray
}
// testFunction(diStringMatch).input('IDID').output([0, 4, 1, 3, 2]) //?

// 944. Delete Columns to Make Sorted, Easy
/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  const stringColumns = []
  for (let i = 0; i < strs[0].length; i++) {
    let column = ''
    for (const string of strs) {
      column += string[i]
    }
    stringColumns.push(column)
  }

  let notSortedColumnsCount = 0
  for (const column of stringColumns) {
    if (column != column.split('').sort().join('')) {
      notSortedColumnsCount++
    }
  }

  return notSortedColumnsCount
}
// testFunction(minDeletionSize).input(['cba', 'daf', 'ghi']).output(1) //?

// 953. Verifying an Alien Dictionary, Easy
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  // 1. Map order of alphabet for faster lookup later
  const orderMap = {}
  order.split('').forEach((character, index) => (orderMap[character] = index))

  // 2. Create customSort function that sort based on order values
  // Complicated to comprehend: but custom function work together with sort function, that implicitly
  function customSort(wordA, wordB) {
    // Compare each character of comparing words, sort() function will implicitly do it for each word.
    const shorterWord = Math.min(wordA.length, wordB.length)
    for (let character = 0; character < shorterWord; character++) {
      if (wordA[character] !== wordB[character]) {
        return orderMap[wordA[character]] - orderMap[wordB[character]]
        // Alternative withour orderMap
        // return order.indexOf(wordA[character]) - order.indexOf(wordB[character])
      }
    }
    // If no result returned above, it's mean two words have same characters, so lets see if they differ in length
    return wordA.length - wordB.length
    // Above manipulations will either return: below 0 or 0 or above 0; Thus sort() function will execute properly with this values, same as "-1, 0, 1"
    // Details: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#parameters
  }

  // 3. Sort with customSort creating new array for later comparison
  let sortedWords = words.toSorted(customSort)

  // 4. Comapre sortedWords with original words
  for (let i = 0; i < words.length; i++) {
    if (words[i] != sortedWords[i]) return false
  }
  return true
}
// testFunction(isAlienSorted).input(['hello', 'leetcode'], 'hlabcdefgijkmnopqrstuvwxyz').output(true) //?
// // prettier-ignore
// testFunction(isAlienSorted).input(["word","world","row"], "worldabcefghijkmnpqstuvxyz").output(false) //?
// testFunction(isAlienSorted).input(['apple', 'app'], 'abcdefghijklmnopqrstuvwxyz').output(false) //?
// testFunction(isAlienSorted).input(['ubg', 'kwh'], 'qcipyamwvdjtesbghlorufnkzx').output(true) //?

// 1002. Find Common Characters, Easy
/**
 * @param {string[]} words
 * @return {string[]}
 */
var commonChars = function (words) {
  if (words.length <= 1) return words[0].split('')

  const showUpCharacters = []
  let included

  for (const character of words[0]) {
    for (let i = 1; i < words.length; i++) {
      if (!words[i].includes(character)) {
        included = false
        break
      }
      words[i] = words[i].replace(character, '')
      included = true
    }

    if (included) showUpCharacters.push(character)
  }

  return showUpCharacters
}
// testFunction(commonChars).input(['bella', 'label', 'roller']).output(['e', 'l', 'l']) //?
// testFunction(commonChars).input(['cool', 'lock', 'cook']).output(['c', 'o']) //?

// 1021. Remove Outermost Parentheses, Easy
/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
  const decompositionWithoutOuterParentheses = []
  let count = 0
  let lastIndex = 0

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      count++
    } else {
      count--
    }

    if (count === 0) {
      decompositionWithoutOuterParentheses.push(s.slice(lastIndex + 1, i)) // Also remove outer parentheses
      lastIndex = i + 1
    }
  }

  return decompositionWithoutOuterParentheses.join('')
}
// testFunction(removeOuterParentheses).input('(()())(())').output('()()()') //?

// 1160. Find Words That Can Be Formed by Characters, Easy
/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  function isGoodString(word) {
    let tempString = chars
    for (const character of word) {
      if (tempString.includes(character)) {
        // Ensure each character can only be used once, thus replace used symbol with empty one
        tempString = tempString.replace(character, '')
      } else {
        // Word can't be constructed from characters of chars
        return false
      }
    }
    return true
  }

  const goodStrings = []
  for (const word of words) {
    if (isGoodString(word)) {
      goodStrings.push(word)
    }
  }
  return goodStrings.reduce((accumulator, currentValue) => accumulator + currentValue.length, 0)
}
// testFunction(countCharacters).input(['cat', 'bt', 'hat', 'tree'], 'atach').output(6) //?
// testFunction(countCharacters).input(['hello', 'world', 'leetcode'], 'welldonehoneyr').output(10) //?

// 1047. Remove All Adjacent Duplicates In String, Easy
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function (s) {
  const stack = []
  for (const char of s) {
    if (char === stack[stack.length - 1]) {
      stack.pop()
    } else {
      stack.push(char)
    }
  }
  return stack.join('')

  // Alternative 1: Time Limit Exceeded
  // for (const char of s) {
  //   s = s.replaceAll(char + char, '')
  // }
  // return s

  // Alternative 2: Runtime Error
  // https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/solutions/389304/javascript-easy-to-understand-3-solutions
  // const s2 = s.replace(/(.)\1/g, '');
  // return s2.length === s.length ? s : removeDuplicates(s2);
}
// testFunction(removeDuplicates).input('abbaca').output('ca') //?
// testFunction(removeDuplicates).input('azxxzy').output('ay') //?
// testFunction(removeDuplicates).input('aaaaaaaa').output('') //?
// testFunction(removeDuplicates).input('aaaaaaaaa').output('a') //?
// testFunction(removeDuplicates).input('abbbabaaa').output('ababa') //?

// 1078. Occurrences After Bigram, Easy
/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function (text, first, second) {
  const thirdWords = []
  const splitedText = text.split(' ')

  for (let i = 0; i < splitedText.length; i++) {
    if (splitedText[i] === first && splitedText[i + 1] === second) {
      if (splitedText[i + 2]) {
        thirdWords.push(splitedText[i + 2])
      }
    }
  }

  return thirdWords
}
// testFunction(findOcurrences).input("alice is a good girl she is a good student", "a", "good").output(["girl","student"]) //?
// testFunction(findOcurrences).input("we will we will rock you", "we", "will").output(["we","rock"]) //?

// 1935. Maximum Number of Words You Can Type, Easy
/**
 * @param {string} text
 * @param {string} brokenLetters
 * @return {number}
 */
var canBeTypedWords = function (text, brokenLetters) {
  const words = text.split(' ')
  const regex = new RegExp(`[${brokenLetters}]`)
  const filteredWords = words.filter((word) => !regex.test(word))
  return filteredWords.length
}
// testFunction(canBeTypedWords).input('hello world', 'ad').output(1) //?

// 1507. Reformat Date, Easy
/**
 * @param {string} date
 * @return {string}
 */
var reformatDate = function (date) {
  //prettier-ignore
  const months = {"Jan":'01', "Feb":'02', "Mar":'03', "Apr":'04', "May":'05', "Jun":'06', "Jul":'07', "Aug":'08', "Sep":'09', "Oct":'10', "Nov":'11', "Dec":'12'}
  const dateArray = date.split(' ')
  let day = dateArray[0].replace(/[^0-9]+/, '')
  day = day.length === 1 ? 0 + day : day
  const convertedDate = [dateArray[2], months[dateArray[1]], day]
  return convertedDate.join('-')
}
// testFunction(reformatDate).input('20th Oct 2052').output('2052-10-20') //?
// testFunction(reformatDate).input('6th Jun 1933').output('1933-06-06') //?

// 1185. Day of the Week, Easy
/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 */
var dayOfTheWeek = function (day, month, year) {
  const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const thisDay = new Date(`${year}-${month}-${day}`).getDay()
  return dayOfWeek[thisDay]
}
// testFunction(dayOfTheWeek).input(31, 8, 2019).output('Saturday') //?

// 1957. Delete Characters to Make Fancy String, Easy
/**
 * @param {string} s
 * @return {string}
 */
var makeFancyString = function (s) {
  const splitS = s.split('')
  for (let i = 0; i < splitS.length; i++) {
    if (splitS[i] === splitS[i + 1] && splitS[i + 1] === splitS[i + 2]) {
      splitS[i] = ''
    }
  }
  return splitS.join('')
  // Alternative https://leetcode.com/problems/delete-characters-to-make-fancy-string/solutions/1873910/javascript-simple-regex-solution
  // return s.replace(/(.)\1\1+/g, '$1$1')
}
// testFunction(makeFancyString).input('leeetcode').output('leetcode') //?
// testFunction(makeFancyString).input('aaabaaaa').output('aabaa') //?

// 1221. Split a String in Balanced Strings, Easy
/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let isBalanced = 0 // if === 0, then true
  let balancedStrings = 0

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'R') {
      isBalanced++
    } else {
      isBalanced--
    }
    if (isBalanced === 0) {
      balancedStrings++
    }
  }
  return balancedStrings
}
// testFunction(balancedStringSplit).input('RLRRLLRLRL').output(4) //?
// testFunction(balancedStringSplit).input('RLRRRLLRLL').output(2) //?

// 2309. Greatest English Letter in Upper and Lower Case, Easy
/**
 * @param {string} s
 * @return {string}
 */
var greatestLetter = function (s) {
  const mapOfUpperCase = new Map()
  const mapOfLowerCase = new Map()
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) > 64 && s.charCodeAt(i) < 91) {
      mapOfUpperCase.set(s[i])
    } else if (s.charCodeAt(i) > 96 && s.charCodeAt(i) < 123) {
      mapOfLowerCase.set(s[i])
    }
  }

  const arrayOfUpperCase = [...mapOfUpperCase.entries()]
  const sortedArrayOfUpperCase = arrayOfUpperCase.sort().reverse()
  for (let i = 0; i < sortedArrayOfUpperCase.length; i++) {
    if (mapOfLowerCase.has(sortedArrayOfUpperCase[i][0].toLowerCase())) {
      return sortedArrayOfUpperCase[i][0]
    }
  }
  return ''

  // Alternative
  // https://leetcode.com/problems/greatest-english-letter-in-upper-and-lower-case/solutions/2253232/javascript-simple-easy-solution
  // s = s.split('').sort().reverse()
  // for (let i = 0; i < s.length; i++) {
  //   if (s[i] === s[i].toUpperCase() || s.length === 1) return ''
  //   if (s.includes(s[i].toUpperCase())) return s[i].toUpperCase()
  // }
}
// testFunction(greatestLetter).input('lEeTcOdE').output('E') //?
// testFunction(greatestLetter).input('arRAzFif').output('R') //?
// testFunction(greatestLetter).input('AbCdEfGhIjK').output('') //?

// 1287. Element Appearing More Than 25% In Sorted Array, Easy
/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function (arr) {
  if (arr.length <= 1) return arr[0]

  const map = new Map()
  const quarter = arr.length / 4

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1)
      if (map.get(arr[i]) > quarter) {
        return arr[i]
      }
    } else {
      map.set(arr[i], 1)
    }
  }
}
// testFunction(findSpecialInteger).input([1, 2, 2, 6, 6, 6, 6, 7, 10]).output(6) //?
// testFunction(findSpecialInteger).input([1]).output(1) //?
// testFunction(findSpecialInteger).input([1, 1, 2, 2, 3, 3, 3, 3]).output(3) //?
// testFunction(findSpecialInteger).input([1,2,3,4,5,6,7,8,9,10,11,12,12,12,12]).output(12) //?

// 2273. Find Resultant Array After Removing Anagrams, Easy
/**
 * @param {string[]} words
 * @return {string[]}
 */
var removeAnagrams = function (words) {
  for (let i = 1; i < words.length; i++) {
    if (words[i - 1].split('').sort().join('') === words[i].split('').sort().join('')) {
      words.splice(i, 1)
      i--
    }
  }
  return words
}
// testFunction(removeAnagrams).input(['abba', 'baba', 'bbaa', 'cd', 'cd']).output(['abba', 'cd']) //?

// 2215. Find the Difference of Two Arrays, Easy
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[][]}
 */
var findDifference = function (nums1, nums2) {
  const nums1DistinctIntegers = new Set()
  for (let i = 0; i < nums1.length; i++) {
    if (nums2.includes(nums1[i])) {
      continue
    } else {
      nums1DistinctIntegers.add(nums1[i])
    }
  }

  const nums2DistinctIntegers = new Set()
  for (let i = 0; i < nums2.length; i++) {
    if (nums1.includes(nums2[i])) {
      continue
    } else {
      nums2DistinctIntegers.add(nums2[i])
    }
  }

  return [Array.from(nums1DistinctIntegers), Array.from(nums2DistinctIntegers)]

  // Alternative https://leetcode.com/problems/find-the-difference-of-two-arrays/solutions/3833477/video-find-the-difference-of-two-arrays
  // let set1 = new Set(nums1)
  // let set2 = new Set(nums2)

  // let diff1 = [...set1].filter((x) => !set2.has(x))
  // let diff2 = [...set2].filter((x) => !set1.has(x))

  // return [diff1, diff2]
}
// testFunction(findDifference).input([1,2,3], [2,4,6]).output( [[1,3],[4,6]]) //?
// testFunction(findDifference).input([1,2,3,3], [1,1,2,2] ).output( [[3],[]]) //?

// 1309. Decrypt String from Alphabet to Integer Mapping, Easy
/**
 * @param {string} s
 * @return {string}
 */
var freqAlphabets = function (s) {
  const stringTokens = []
  for (let i = s.length - 1; i > -1; i--) {
    if (s[i] === '#') {
      stringTokens.push(s[i - 2] + s[i - 1] + s[i])
      i -= 2
    } else {
      stringTokens.push(s[i])
    }
  }

  //prettier-ignore
  const customAlphabet = {'1':'a','2':'b','3':'c','4':'d','5':'e','6':'f','7':'g','8':'h','9':'i','10#':'j','11#':'k','12#':'l','13#':'m','14#':'n','15#':'o','16#':'p','17#':'q','18#':'r','19#':'s','20#':'t','21#':'u','22#':'v','23#':'w','24#':'x','25#':'y','26#':'z'}
  let decryptedString = ''
  for (let i = stringTokens.length - 1; i > -1; i--) {
    decryptedString += customAlphabet[stringTokens[i]]
  }

  return decryptedString

  // Alternative https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping/solutions/595256/javascript-solution-99-100-using-regex
  // return s.match(/\d{2}(?=#)|\d/g).map((num) => String.fromCharCode(96 + +num)).join('')
}
// testFunction(freqAlphabets).input('10#11#12').output('jkab') //?
// testFunction(freqAlphabets).input('1326#').output('acz') //?

// 1332. Remove Palindromic Subsequences, Easy
/**
 * @param {string} s
 * @return {number}
 */
var removePalindromeSub = function (s) {
  return s === s.split('').reverse().join('') ? 1 : 2
}
// testFunction(removePalindromeSub).input('ababa').output(1) //?
// testFunction(removePalindromeSub).input('abb').output(2) //?

// 1370. Increasing Decreasing String, Easy
/**
 * @param {string} s
 * @return {string}
 */
var sortString = function (s) {
  // Alternative https://leetcode.com/problems/increasing-decreasing-string/solutions/4570077/javascript-short-and-efficient-solution
  const charactersFrequency = {}
  const uniqueCharacters = [...new Set(s)].sort()

  for (const char of s) {
    charactersFrequency[char] = (charactersFrequency[char] || 0) + 1
  }

  let resultString = ''
  while (resultString.length < s.length) {
    for (const char of uniqueCharacters) {
      if (charactersFrequency[char]) {
        resultString += char
        charactersFrequency[char]--
      }
    }
    uniqueCharacters.reverse()
  }

  return resultString

  // Time Limit Exceeded
  // 1. Find all larger characters in sorted string
  const sortedString = s.split('').sort().join('')
  const increasingArray = [sortedString[0]]
  let smalletsCharacter = sortedString[0]
  for (let i = 1; i < s.length; i++) {
    if (sortedString.charCodeAt(i) > smalletsCharacter.charCodeAt()) {
      increasingArray.push(sortedString[i])
      smalletsCharacter = sortedString[i]
    }
  }

  // 2. Generate new string
  const arrayS = sortedString.split('')
  let incDecString = ''
  let j = 0
  while (arrayS.length) {
    for (let i = 0; i < arrayS.length; i++) {
      if (arrayS[i] === increasingArray[j]) {
        incDecString += arrayS[i]
        arrayS.splice(i, 1)
        j++
      }
    }
    j--

    for (let i = arrayS.length - 1; i > -1; i--) {
      if (arrayS[i] === increasingArray[j]) {
        incDecString += arrayS[i]
        arrayS.splice(i, 1)
        j--
      }
    }
    j++
  }

  return incDecString
}
// testFunction(sortString).input('aaaabbbbcccc').output('abccbaabccba') //?
// testFunction(sortString).input('rat').output('art') //?

// 1374. Generate a String With Characters That Have Odd Counts, Easy
/**
 * @param {number} n
 * @return {string}
 */
var generateTheString = function (n) {
  const charArray = Array(n).fill('a')
  if (n % 2 === 0) charArray[n - 1] = 'b'
  return charArray.join('')

  // Alternative https://leetcode.com/problems/generate-a-string-with-characters-that-have-odd-counts/solutions/543710/javascript-o-n-96-100
  // return n % 2 === 0 ? 'a'.repeat(n - 1) + 'b' : 'a'.repeat(n)
}
// testFunction(generateTheString).input(4).output('pppz') //?

// 1408. String Matching in an Array, Easy
/**
 * @param {string[]} words
 * @return {string[]}
 */
var stringMatching = function (words) {
  const uniqueMatchingSubstrings = new Set()
  for (let i = 0; i < words.length; i++) {
    for (const word of words) {
      if (words[i].match(word) && words[i] != word) {
        uniqueMatchingSubstrings.add(word)
      }
    }
  }
  return Array.from(uniqueMatchingSubstrings)

  // Alternative https://leetcode.com/problems/string-matching-in-an-array/solutions/642653/1408-1-line-javascript-solution
  return words.filter((n) => words.some((h) => h !== n && h.includes(n)))
}
// testFunction(stringMatching).input(['mass', 'as', 'hero', 'superhero']).output(['as', 'hero']) //?
// //prettier-ignore
// testFunction(stringMatching).input(["leetcoder","leetcode","od","hamlet","am"]).output(["leetcode","od","am"]) //?

// 1431. Kids With the Greatest Number of Candies, Easy
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const maxCandies = Math.max(...candies)
  const result = []
  for (let i = 0; i < candies.length; i++) {
    result.push(candies[i] + extraCandies >= maxCandies ? true : false)
    // Alternative
    // if (candies[i] + extraCandies >= maxCandies) {
    //   result.push(true)
    // } else {
    //   result.push(false)
    // }
  }
  return result

  // Alternative https://leetcode.com/problems/kids-with-the-greatest-number-of-candies/solutions/4149854/short-method-2-lines-of-code-0ms-c
  // const mostCandies = Math.max(...candies);
  // return candies.map((candyAmount) => candyAmount + extraCandies >= mostCandies)
}
// testFunction(kidsWithCandies).input([2, 3, 5, 1, 3], 3).output([true, true, true, false, true]) //?

// 1417. Reformat The String, Easy
/**
 * @param {string} s
 * @return {string}
 */
var reformat = function (s) {
  // Check if difference between digits and letters greater than 1, thus it's impossible to make proper permutation
  const letters = s.replace(/[0-9]/g, '')
  const digits = s.replace(/[a-z]/g, '')
  if (Math.abs(letters.length - digits.length) > 1) return ''

  // Reformat letters and digits to string
  let reformattedString = ''
  if (letters.length >= digits.length) {
    for (let i = 0; i < letters.length; i++) {
      reformattedString += letters[i] + (digits[i] ?? '')
    }
  }
  if (digits.length > letters.length) {
    for (let i = 0; i < digits.length; i++) {
      reformattedString += digits[i] + (letters[i] ?? '')
    }
  }
  return reformattedString
}
// testFunction(reformat).input('a0b1c2').output('a0b1c2') //?
// testFunction(reformat).input('leetcode').output('') //?
// testFunction(reformat).input('1229857369').output('') //?

// 1422. Maximum Score After Splitting a String, Easy
/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  if (!s.match(/1/g) || !s.match(/0/g)) return s.length - 1

  let maximumScore = 0
  for (let i = 1; i < s.length; i++) {
    let left = s.substring(0, i).replace(/1/g, '')
    let right = s.substring(i, s.length).replace(/0/g, '')

    maximumScore = Math.max(maximumScore, left.length + right.length)
  }

  return maximumScore
}
// testFunction(maxScore).input('011101').output(5) //?
// testFunction(maxScore).input('1111').output(3) //?
// testFunction(maxScore).input('0100').output(2) //?
// testFunction(maxScore).input('11100').output(2) //?

// 1446. Consecutive Characters, Easy
/**
 * @param {string} s
 * @return {number}
 */
var maxPower = function (s) {
  let stringPower = 1
  let count = 1

  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++
    } else {
      count = 1
    }
    if (count > stringPower) {
      stringPower = count
    }
  }
  return stringPower
}
// testFunction(maxPower).input('leetcode').output(2) //?
// testFunction(maxPower).input('abbcccddddeeeeedcba').output(5) //?

// 1460. Make Two Arrays Equal by Reversing Subarrays, Easy
/**
 * @param {number[]} target
 * @param {number[]} arr
 * @return {boolean}
 */
var canBeEqual = function (target, arr) {
  return target.sort().toString() === arr.sort().toString()
}
// testFunction(canBeEqual).input([1, 2, 3, 4], [2, 4, 1, 3]).output(true) //?

// 1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence, Easy
/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
var isPrefixOfWord = function (sentence, searchWord) {
  const array = sentence.split(' ')
  const regex = new RegExp(`^${searchWord}`, 'g')
  for (let i = 0; i < array.length; i++) {
    if (array[i].match(regex)) {
      return i + 1
    }
  }
  return -1
  // Alternative https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/solutions/2408073/typescript-javascript-quite-a-short-one-liner
  // return sentence.split(' ').findIndex(e => e.startsWith(searchWord)) + 1 || -1;
}
// testFunction(isPrefixOfWord).input('i love eating burger', 'burg').output(4) //?
// testFunction(isPrefixOfWord).input('this problem is an easy problem', 'pro').output(2) //?
// testFunction(isPrefixOfWord).input('i am tired', 'you').output(-1) //?
// testFunction(isPrefixOfWord).input('hellohello hellohellohello', 'ell').output(-1) //?

// 1470. Shuffle the Array, Easy
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  const shuffledArray = []
  for (let i = 0; i < n; i++) {
    shuffledArray.push(nums[i], nums[i + n])
  }
  return shuffledArray
}
// testFunction(shuffle).input([2, 5, 1, 3, 4, 7], 3).output([2, 3, 5, 4, 1, 7]) //?

// 1528. Shuffle String, Easy
/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function (s, indices) {
  const shuffledString = []
  for (let i = 0; i < s.length; i++) {
    shuffledString[indices[i]] = s[i]
  }
  return shuffledString.join('')
}
// testFunction(restoreString).input('codeleet', [4, 5, 6, 7, 0, 2, 1, 3]).output('leetcode') //?

// 1544. Make The String Great, Easy
/**
 * @param {string} s
 * @return {string}
 */
var makeGood = function (s) {
  const arrayS = s.split('')

  for (let i = 1; i < arrayS.length; i++) {
    if (badChars(arrayS[i - 1], arrayS[i])) {
      arrayS.splice(i - 1, 2)
      i = 0
    }
  }

  function badChars(first, second) {
    if (
      first === first.toLowerCase() &&
      second === second.toUpperCase() &&
      first.toLowerCase() === second.toLowerCase()
    ) {
      return true
    }
    if (
      first === first.toUpperCase() &&
      second === second.toLowerCase() &&
      first.toLowerCase() === second.toLowerCase()
    ) {
      return true
    }
  }

  return arrayS.join('')
}
// testFunction(makeGood).input('leEeetcode').output('leetcode') //?
// testFunction(makeGood).input('abBAcC').output('') //?
// testFunction(makeGood).input('s').output('s') //?

// 1576. Replace All ?'s to Avoid Consecutive Repeating Characters, Easy
/**
 * @param {string} s
 * @return {string}
 */
var modifyString = function (s) {
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '?') {
      if (s[i - 1] != 'a' && s[i + 1] != 'a') {
        s = s.replace('?', 'a')
      } else if (s[i - 1] != 'b' && s[i + 1] != 'b') {
        s = s.replace('?', 'b')
      } else if (s[i - 1] != 'c' && s[i + 1] != 'c') {
        s = s.replace('?', 'c')
      }
    }
  }
  return s
}
// testFunction(modifyString).input('?zs').output('azs') //?

// 1523. Count Odd Numbers in an Interval Range, Easy
/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countOdds = function (low, high) {
  // Math problem. There is every next odd number between low and high, we only need to check if low and high itself is odd.
  // https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/solutions/775870/javascript-o-1-solution-64-ms-36-2-mb-beats-98-88
  let oddNums = Math.round((high - low) / 2)
  if (low % 2 === 1 && high % 2 === 1) oddNums = oddNums + 1
  return oddNums

  // Runtime Error, out of memroy
  // const oddNums = []
  // for (let i = low; i < high + 1; i++) {
  //   if (i % 2 == 1) {
  //     oddNums.push(i)
  //   }
  // }
  // return oddNums.length
}
// testFunction(countOdds).input(3, 7).output(3) //?
// testFunction(countOdds).input(8, 10).output(1) //?
// testFunction(countOdds).input(2, 2).output(0) //?
// testFunction(countOdds).input(11, 11).output(1) //?
// testFunction(countOdds).input(21, 22).output(1) //?

// 1207. Unique Number of Occurrences, Easy
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function (arr) {
  const map = new Map()
  for (const num of arr) {
    map.set(num, (map.get(num) ?? 0) + 1)
  }
  return map.size === new Set(map.values()).size
  // Alternative
  // for (let i = 0; i < arr.length; i++) {
  //   if (map.has(arr[i])) {
  //     map.set(arr[i], map.get(arr[i]) + 1)
  //   } else {
  //     map.set(arr[i], 1)
  //   }
  // }
  // const isUnique = [...map.values()].length === Array.from(new Set([...map.values()])).length
  // return isUnique
}
// testFunction(uniqueOccurrences).input([1, 2, 2, 1, 1, 3]).output(true) //?
// testFunction(uniqueOccurrences).input([1, 2]).output(false) //?

// 1323. Maximum 69 Number, Easy
/**
 * @param {number} num
 * @return {number}
 */
var maximum69Number = function (num) {
  let numArr = num.toString().split('')
  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i] === '6') {
      numArr[i] = '9'
      return Number(numArr.join(''))
    }
  }
  return num
  // Alternative https://leetcode.com/problems/maximum-69-number/solutions/484939/javascript-easy-to-understand-3-solutions
  return Number(num.toString().replace('6', '9'))
  // Alternative
  //prettier-ignore
  const map = {6: 9,9: 9,66: 96,69: 99,96: 99,99: 99,666: 966,669: 969,696: 996,699: 999,966: 996,969: 999,996: 999,999: 999,6666: 9666,6669: 9669,6696: 9696,6699: 9699,6966: 9966,6969: 9969,6996: 9996,6999: 9999,9666: 9966,9669: 9969,9696: 9996,9699: 9999,9966: 9996,9969: 9999,9996: 9999,9999: 9999}
  return map[num]
}
// testFunction(maximum69Number).input(9669).output(9969) //?

// 509. Fibonacci Number, Easy
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  // https://leetcode.com/problems/fibonacci-number/solutions/1159381/js-python-java-c-simple-o-1-o-1-solution-w-explanation
  if (n < 2) return n
  let base = 0
  let fibonacci = 1
  for (let i = 1; i < n; i++) {
    ;[base, fibonacci] = [fibonacci, base + fibonacci]
  }
  return fibonacci
}
// testFunction(fib).input(2).output(1) //?
// testFunction(fib).input(3).output(2) //?
// testFunction(fib).input(4).output(3) //?

// 1071. Greatest Common Divisor of Strings, Easy
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  // Solution by https://leetcode.com/problems/greatest-common-divisor-of-strings/solutions/4920455/95-better-no-slice-no-recursion-basic-math-commented-solution
  // handle the base case
  if (str1 + str2 !== str2 + str1) return ''
  let a = str1.length
  let b = str2.length

  // loop (divide) until you find the
  // highest common factor (length of string)
  // like we did in maths
  while (b) {
    ;[a, b] = [a, a % b]
    let temp = b
    b = a % b
    a = temp
  }
  return str1.substring(0, a)

  // Alternative NOT PASSING ALL TESTS
  // if (str1 + str2 !== str2 + str1) return '' // Check if we possibly can divide them
  // const [smallerString, longerString] = [str1, str2].sort((a, b) => a.length - b.length)
  // let divisor = smallerString

  // for (let i = 0; i < smallerString.length; i++) {
  //   let regex = new RegExp(`${divisor}`, 'g')
  //   let gcd = longerString.replaceAll(regex, '')
  //   if (!gcd) {
  //     return divisor
  //   }
  //   divisor = divisor.slice(0, -1)
  // }
  // return ''
}
// testFunction(gcdOfStrings).input('ABCABC', 'ABC').output('ABC') //?
// testFunction(gcdOfStrings).input('ABABAB', 'ABAB').output('AB') //?
// testFunction(gcdOfStrings).input('LEET', 'CODE').output('') //?
// //prettier-ignore
// testFunction(gcdOfStrings).input('TAUXXTAUXXTAUXXTAUXXTAUXX',  'TAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXX').output('TAUXX') //? TAUXXTAUXXTAUXX

// 1103. Distribute Candies to People, Easy
/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */
var distributeCandies = function (candies, num_people) {
  const distributedCandies = new Array(num_people).fill(0)
  let giveCandy = 1
  let person = 0

  while (candies > 0) {
    // Give candy and subtract given candy from candies
    distributedCandies[person] = distributedCandies[person] += giveCandy
    candies -= giveCandy
    giveCandy++
    if (giveCandy > candies) giveCandy = candies

    // Reset counter if reach last person in num_people array
    person++
    if (person + 1 > num_people) person = 0
  }
  return distributedCandies
}
// testFunction(distributeCandies).input(7, 4).output([1, 2, 3, 1]) //?
// testFunction(distributeCandies).input(10, 3).output([5, 2, 3]) //?
// //prettier-ignore
// testFunction(distributeCandies).input(600, 40).output([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,5,0,0,0,0,0]) //?

// 1122. Relative Sort Array, Easy
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  // Split arr1 into two arrays
  const mainArr = []
  const secondaryArr = []
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      mainArr.push(arr1[i])
    } else {
      secondaryArr.push(arr1[i])
    }
  }

  // Sort main array according to arr2 order
  mainArr.sort((a, b) => arr2.indexOf(a) - arr2.indexOf(b))

  // Sort secondary array in ascending order
  secondaryArr.sort((a, b) => a - b)

  // Concatenate and return final array
  return mainArr.concat(secondaryArr)
}
// // prettier-ignore
// testFunction(relativeSortArray).input([2,3,1,3,2,4,6,7,9,2,19],[2,1,4,3,9,6]).output([2,2,2,1,4,3,3,9,6,7,19]) //?

// 1154. Day of the Year, Easy
/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function (date) {
  // Solution by https://leetcode.com/problems/day-of-the-year/solutions/501726/1-line-javascript-solution-48ms
  return (new Date(date) - new Date(date.slice(0, 4)) + 86400000) / 86400000 // one day timestamp = 86400000 = 1000 * 60 * 60 * 24
}
// testFunction(dayOfYear).input('2019-01-09').output(9) //?
// testFunction(dayOfYear).input('2019-02-10').output(41) //?
// testFunction(dayOfYear).input('2004-03-01').output(61) //?

// 1342. Number of Steps to Reduce a Number to Zero, Easy
/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
  let countSteps = 0
  while (num != 0) {
    num % 2 === 0 ? (num /= 2) : (num -= 1)
    countSteps++
  }
  return countSteps
}
// testFunction(numberOfSteps).input(14).output(6) //?

// 1394. Find Lucky Integer in an Array, Easy
/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
  const map = new Map()
  for (const num of arr) {
    map.set(num, (map.get(num) ?? 0) + 1)
  }

  let luckyInteger = -1
  for (const [num, value] of map) {
    if (num === value) {
      luckyInteger = Math.max(luckyInteger, num)
      //Alternative luckyInteger = num > luckyInteger ? num : luckyInteger
    }
  }
  return luckyInteger
}
// testFunction(findLucky).input([2, 2, 3, 4]).output(2) //?
// testFunction(findLucky).input([1, 2, 2, 3, 3, 3]).output(3) //?
// testFunction(findLucky).input([2, 2, 2, 3, 3]).output(-1) //?
// // prettier-ignore
// testFunction(findLucky).input([19,12,11,14,18,8,6,6,13,9,8,3,10,10,1,10,5,12,13,13,9]).output(1) //?

// 1403. Minimum Subsequence in Non-Increasing Order, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minSubsequence = function (nums) {
  const arrSum = nums.reduce((a, i) => a + i, 0)
  const minSum = arrSum / 2
  const sortedArr = nums.sort((a, b) => b - a)
  const minSubsequence = []
  let currentSum = 0

  for (const num of sortedArr) {
    minSubsequence.push(num)
    currentSum += num
    if (currentSum > minSum) {
      return minSubsequence
    }
  }
}
// testFunction(minSubsequence).input([4, 3, 10, 9, 8]).output([10, 9]) //?

// 1450. Number of Students Doing Homework at a Given Time, Easy
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
var busyStudent = function (startTime, endTime, queryTime) {
  let numberOfStudentsDoingHomework = 0
  for (let i = 0; i < startTime.length; i++) {
    if (queryTime >= startTime[i] && queryTime <= endTime[i]) {
      numberOfStudentsDoingHomework++
    }
  }
  return numberOfStudentsDoingHomework
}
// testFunction(busyStudent).input([1, 2, 3], [3, 2, 7], 4).output(1) //?

// 1475. Final Prices With a Special Discount in a Shop, Easy
/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function (prices) {
  // https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/solutions/2698007/js-two-easy-solution
  const finalPrices = []
  for (let i = 0; i < prices.length; i++) {
    let newPrice = prices[i]

    for (let j = i + 1; j < prices.length; j++) {
      if (prices[i] >= prices[j]) {
        newPrice = prices[i] - prices[j]
        break
      }
    }

    finalPrices.push(newPrice)
  }
  return finalPrices
}
// testFunction(finalPrices).input([8, 4, 6, 2, 3]).output([4, 2, 4, 2, 3]) //?
// testFunction(finalPrices).input([10, 2, 5, 2, 8]).output([8, 0, 3, 2, 8]) //?

// 1518. Water Bottles, Easy
/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
  let maximumWaterBottles = numBottles
  let remainEmptyBottles = 0
  while (numBottles >= numExchange) {
    remainEmptyBottles = numBottles % numExchange
    numBottles = Math.floor(numBottles / numExchange)
    maximumWaterBottles = maximumWaterBottles + numBottles
    numBottles = numBottles + remainEmptyBottles
  }
  return maximumWaterBottles
}
// testFunction(numWaterBottles).input(9, 3).output(13) //?
// testFunction(numWaterBottles).input(15, 4).output(19) //?
// testFunction(numWaterBottles).input(12, 4).output(15) //?

// 1534. Count Good Triplets, Easy
/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number}
 */
var countGoodTriplets = function (arr, a, b, c) {
  const goodTriplets = []
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (
          Math.abs(arr[i] - arr[j]) <= a &&
          Math.abs(arr[j] - arr[k]) <= b &&
          Math.abs(arr[i] - arr[k]) <= c
        ) {
          goodTriplets.push([arr[i], arr[j], arr[k]])
        }
      }
    }
  }
  return goodTriplets.length
}
// testFunction(countGoodTriplets).input([3, 0, 1, 1, 9, 7], 7, 2, 3).output(4) //?
// testFunction(countGoodTriplets).input([1, 1, 2, 2, 3], 0, 0, 1).output(0) //?

// 1556. Thousand Separator, Easy
/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
  const numArr = n.toString().split('').reverse()
  let count = 0
  for (let i = 0; i < numArr.length; i++) {
    count++
    if (count === 4) {
      numArr.splice(i, 0, '.')
      count = 0
    }
  }
  return numArr.reverse().join('') //?

  // Alternative
  // return n.toLocaleString('de-DE')
  // https://leetcode.com/problems/thousand-separator/solutions/867448/javascript
}
// testFunction(thousandSeparator).input(1234).output('1.234') //?
// testFunction(thousandSeparator).input(123456789).output('123.456.789') //?

// 1592. Rearrange Spaces Between Words, Easy
/**
 * @param {string} text
 * @return {string}
 */
var reorderSpaces = function (text) {
  const countSpaces = text.replace(/\w+/g, '').length
  const countWords = text.trim().split(/\s+/).length
  if (countWords === 1) {
    return text.trim().concat(' '.repeat(countSpaces))
  }

  const insertSpaces = Math.floor(countSpaces / (countWords - 1))
  const insertSpacesRemain = countSpaces % (countWords - 1)

  let newText = text.trim().replace(/\s+/g, ' '.repeat(insertSpaces))
  newText = newText.concat(' '.repeat(insertSpacesRemain))

  return newText
}
// testFunction(reorderSpaces).input('  this   is  a sentence ').output('this   is   a   sentence') //?
// testFunction(reorderSpaces).input('  hello').output('hello  ') //?

// 1598. Crawler Log Folder, Easy
/**
 * @param {string[]} logs
 * @return {number}
 */
var minOperations = function (logs) {
  let logsStack = 0
  for (let i = 0; i < logs.length; i++) {
    switch (logs[i]) {
      case '../':
        logsStack--
        if (logsStack < 0) logsStack = 0
        break
      case './':
        break
      default:
        logsStack++
        break
    }
  }
  return logsStack
}
// testFunction(minOperations).input(['d1/', 'd2/', '../', 'd21/', './']).output(2) //?
// testFunction(minOperations).input(["./","wz4/","../","mj2/","../","../","ik0/","il7/"]).output(2) //?

// 1636. Sort Array by Increasing Frequency, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function (nums) {
  // 1. Count frequency
  const map = new Map()
  for (const num of nums) {
    map.set(num, map.get(num) + 1 || 1)
    // Alternative map expressions
    // map.set(num, (map.get(num) || 0) + 1)
    // map.set(num, (map.get(num) ?? 0) + 1)
    // map.set(num, map.has(num) ? map.get(num) + 1 : 1)
    // if (map.get(num)) {
    //   map.set(num, map.get(num) + 1)
    // } else {
    //   map.set(num, 1)
    // }
  }
  // 2. Sort descending by number value
  const sortedEntriesByNum = [...map.entries()].sort((a, b) => b[0] - a[0])
  // 3. Sort ascending by number frequency
  const sortedEntriesByFrequency = sortedEntriesByNum.sort((a, b) => a[1] - b[1])
  // 4. Generate new array from sorted values and their frequencies
  const sortedArr = []
  for (const pair of sortedEntriesByFrequency) {
    for (let i = 0; i < pair[1]; i++) {
      sortedArr.push(pair[0])
    }
  }

  return sortedArr
}
// testFunction(frequencySort).input([1, 1, 2, 2, 2, 3]).output([3, 1, 1, 2, 2, 2]) //?
// testFunction(frequencySort).input([2, 3, 1, 3, 2]).output([1, 3, 3, 2, 2]) //?
// testFunction(frequencySort).input([-1,1,-6,4,5,-6,1,4,1]).output([5,-1,4,4,-6,-6,1,1,1]) //?

// 1624. Largest Substring Between Two Equal Characters, Easy
/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function (s) {
  let longestSubstring = -1
  for (let left = 0; left < s.length; left++) {
    for (let right = s.length - 1; right > left; right--) {
      if (s[left] === s[right]) {
        longestSubstring = Math.max(longestSubstring, right - left - 1)
      }
    }
  }
  return longestSubstring
}
// testFunction(maxLengthBetweenEqualCharacters).input('aa').output(0) //?
// testFunction(maxLengthBetweenEqualCharacters).input('abca').output(2) //?
// testFunction(maxLengthBetweenEqualCharacters).input('cbzxy').output(-1) //?
// testFunction(maxLengthBetweenEqualCharacters).input('mgntdygtxrvxjnwksqhxuxtrv').output(18) //?

// 1629. Slowest Key, Easy
/**
 * @param {number[]} releaseTimes
 * @param {string} keysPressed
 * @return {character}
 */
var slowestKey = function (releaseTimes, keysPressed) {
  const keyDuration = []
  keyDuration.push([keysPressed[0], releaseTimes[0]])
  for (let i = 1; i < keysPressed.length; i++) {
    keyDuration.push([keysPressed[i], releaseTimes[i] - releaseTimes[i - 1]])
  }
  // prettier-ignore
  const sortedLexicographically = keyDuration.sort((a, b) => a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0)
  // Alternative
  // const sortedLexicographically = keyDuration.sort((a, b) => {
  //   if (a[0] < b[0]) {
  //     return 1
  //   }
  //   if (a[0] > b[0]) {
  //     return -1
  //   }
  //   return 0
  // })

  const sortedByDuration = sortedLexicographically.sort((a, b) => b[1] - a[1])

  return sortedByDuration[0][0]
}
// testFunction(slowestKey).input([9, 29, 49, 50], 'cbcd').output('c') //?
// testFunction(slowestKey).input([12, 23, 36, 46, 62], 'spuda').output('a') //?

// 1652. Defuse the Bomb, Easy
/**
 * @param {number[]} code
 * @param {number} k
 * @return {number[]}
 */
var decrypt = function (code, k) {
  const decryptedCode = []

  if (k > 0) {
    for (let i = 0; i < code.length; i++) {
      let cipher = 0
      let steps = k
      let pointer = i + 1
      while (steps) {
        if (pointer > code.length - 1) pointer = 0
        cipher += code[pointer]
        pointer++
        steps--
      }
      decryptedCode.push(cipher)
    }
  }

  if (k < 0) {
    for (let i = 0; i < code.length; i++) {
      let cipher = 0
      let steps = Math.abs(k)
      let pointer = i - 1
      while (steps) {
        if (pointer > code.length - 1) pointer = 0
        if (pointer < 0) pointer = code.length - 1
        cipher += code[pointer]
        pointer--
        steps--
      }
      decryptedCode.push(cipher)
    }
  }

  if (k === 0) {
    for (let i = 0; i < code.length; i++) {
      decryptedCode.push(0)
    }
    // Alternative
    // return Array(code.length).fill(0)
  }

  return decryptedCode
}
// testFunction(decrypt).input([5, 7, 1, 4], 3).output([12, 10, 16, 13]) //?
// testFunction(decrypt).input([2, 4, 9, 3], -2).output([12, 5, 6, 13]) //?
// testFunction(decrypt).input([1, 2, 3, 4], 0).output([0, 0, 0, 0]) //?

// 1668. Maximum Repeating Substring, Easy
/**
 * @param {string} sequence
 * @param {string} word
 * @return {number}
 */
var maxRepeating = function (sequence, word) {
  let repeat = 0
  let checkString = word
  while (sequence.includes(checkString)) {
    repeat++
    checkString += word
  }
  return repeat
}
// testFunction(maxRepeating).input('ababc', 'ab').output(2) //?
// testFunction(maxRepeating).input('ababc', 'ba').output(1) //?
// testFunction(maxRepeating).input('ababc', 'ac').output(0) //?
// testFunction(maxRepeating).input('aaabaaaabaaabaaaabaaaabaaaabaaaaba', 'aaaba').output(5) //?
// testFunction(maxRepeating).input('bababbbaabbaaabbbabbaaaaabaabbaaabaab', 'a').output(5) //?

// 1656. Design an Ordered Stream, Easy
class OrderedStream {
  /**
   * @param {number} n
   */
  constructor(streamLength) {
    this.stream = Array(streamLength + 1).fill([])
    this.count = 1
    this.lastReturnedId = 1
  }

  /**
   * @param {number} idKey
   * @param {string} value
   * @return {string[]}
   */
  insert(idKey, value) {
    this.stream[idKey] = [value]
    this.count++

    let chunk = []
    for (let i = this.lastReturnedId; i < this.count; i++) {
      if (!this.stream[i][0]) break
      chunk.push(this.stream[i][0])
      this.lastReturnedId++
    }

    return chunk
  }
}
// const orderedStream1 = new OrderedStream(5)
// const param_1 = orderedStream1.insert(3, 'ccccc') //? []
// const param_2 = orderedStream1.insert(1, 'aaaaa') //? ["aaaaa"]
// const param_3 = orderedStream1.insert(2, 'bbbbb') //? ["bbbbb", "ccccc"]
// const param_4 = orderedStream1.insert(5, 'eeeee') //? []
// const param_5 = orderedStream1.insert(4, 'ddddd') //? ["ddddd", "eeeee"]

// 1662. Check If Two String Arrays are Equivalent, Easy
/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function (word1, word2) {
  return word1.join('') === word2.join('')
}
// testFunction(arrayStringsAreEqual).input(['ab', 'c'], ['a', 'bc']).output(true) //?

// 1646. Get Maximum in Generated Array, Easy
/**
 * @param {number} n
 * @return {number}
 */
var getMaximumGenerated = function (n) {
  if (n === 0) return 0

  const nums = [0, 1]
  for (let i = 2; i < n + 1; i++) {
    if (i % 2 === 0) {
      nums.push(nums[i / 2])
    } else {
      nums.push(nums[(i - 1) / 2] + nums[(i - 1) / 2 + 1])
    }
  }
  return Math.max(...nums)
}
// testFunction(getMaximumGenerated).input(7).output(3) //?
// testFunction(getMaximumGenerated).input(2).output(1) //?
// testFunction(getMaximumGenerated).input(3).output(2) //?

// 1684. Count the Number of Consistent Strings, Easy
/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (allowed, words) {
  const regex = new RegExp(`^[${allowed}]+$`)
  return words.filter((word) => word.match(regex)).length

  // Alternative 1
  // const regex = new RegExp(`^[${allowed}]+$`)
  // let count = 0
  // words.forEach((word) => {
  //   if (word.match(regex)) count++
  // })
  // return count

  // Alternative 2
  // const regex = new RegExp(`[${allowed}]`, 'g')
  // let count = 0
  // for (let word of words) {
  //   word = word.replace(regex, '')
  //   if (word === '') count++
  // }
  // return count
}
// testFunction(countConsistentStrings).input('ab', ['ad', 'bd', 'aaab', 'baa', 'badab']).output(2) //?

// 1672. Richest Customer Wealth, Easy
/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
  return Math.max(...accounts.map((account) => account.reduce((acc, curr) => acc + curr)))

  // Alternative
  // let maxWealth = 0
  // for (const account of accounts) {
  //   maxWealth = Math.max(
  //     maxWealth,
  //     account.reduce((a, b) => a + b)
  //   )
  // }
  // return maxWealth
}
// testFunction(maximumWealth).input([[1,2,3],[3,2,1]]).output(6) //?

// 1678. Goal Parser Interpretation, Easy
/**
 * @param {string} command
 * @return {string}
 */
var interpret = function (command) {
  return command.replaceAll('()', 'o').replaceAll('(al)', 'al')
}
// testFunction(interpret).input('G()(al)').output('Goal') //?

// 1700. Number of Students Unable to Eat Lunch, Easy
/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function (students, sandwiches) {
  let countQueue = 0
  while (sandwiches.length) {
    if (sandwiches[0] === students[0]) {
      sandwiches.shift()
      students.shift()
      countQueue = 0
    } else {
      students.push(students.shift())
      countQueue++
      if (countQueue > students.length) break
    }
  }
  return students.length
}
// testFunction(countStudents).input([1, 1, 0, 0], [0, 1, 0, 1]).output(0) //?
// testFunction(countStudents).input([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]).output(3) //?

// 1688. Count of Matches in Tournament, Easy
/**
 * @param {number} n
 * @return {number}
 */
var numberOfMatches = function (n) {
  return n - 1

  // Alternative
  // let matches = 0
  // while (n > 1) {
  //   if (n % 2 === 0) {
  //     n = n / 2
  //     matches += n
  //   } else {
  //     n = (n - 1) / 2
  //     matches += n
  //     n++
  //   }
  // }
  // return matches
}
// testFunction(numberOfMatches).input(7).output(6) //?

// 1694. Reformat Phone Number, Easy
/**
 * @param {string} number
 * @return {string}
 */
var reformatNumber = function (number) {
  const rawNumber = number.replace(/-|\s/g, '')
  let result = ''

  if (rawNumber.length % 3 === 1) {
    let firstPart = rawNumber.slice(0, -4)
    firstPart = firstPart.replace(/(...)/g, '$1' + '-')

    let secondPart = rawNumber.slice(-4)
    secondPart = secondPart.replace(/(..)/g, '$1' + '-')

    result = firstPart + secondPart
  } else {
    result = rawNumber.replace(/(...)/g, '$1' + '-')
  }

  if (result.at(-1) === '-') result = result.slice(0, -1)

  return result
}
// testFunction(reformatNumber).input('1-23-45 6').output('123-456') //?
// testFunction(reformatNumber).input('123 4-567').output('123-45-67') //?
// testFunction(reformatNumber).input('123 4-5678').output('123-456-78') //?
// testFunction(reformatNumber).input('--17-5 229 35-39475 ').output('175-229-353-94-75') //?

// 1716. Calculate Money in Leetcode Bank, Easy
/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function (n) {
  let totalMoney = 0
  let weekDayMoney = 1
  let weekFirstDayValue = 1

  for (let i = 0; i < n; i++) {
    totalMoney += weekDayMoney
    weekDayMoney++
    if (weekDayMoney === weekFirstDayValue + 7) {
      weekFirstDayValue++
      weekDayMoney = weekFirstDayValue
    }
  }
  return totalMoney
}
// testFunction(totalMoney).input(4).output(10) //?
// testFunction(totalMoney).input(10).output(37) //?

// 1704. Determine if String Halves Are Alike, Easy
/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']
  let countLeft = 0
  let countRight = 0

  for (let left = 0, right = s.length - 1; left < s.length / 2; left++, right--) {
    if (vowels.includes(s[left])) countLeft++
    if (vowels.includes(s[right])) countRight++
  }

  return countLeft === countRight
}
// testFunction(halvesAreAlike).input('book').output(true) //?

// 1710. Maximum Units on a Truck, Easy
/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  const sortedBoxes = boxTypes.sort((a, b) => b[1] - a[1])

  let totalUnitsInTruck = 0
  let i = 0

  while (truckSize && i < boxTypes.length) {
    totalUnitsInTruck += boxTypes[i][0] * boxTypes[i][1]
    truckSize -= boxTypes[i][0]

    // Remove boxes if put too much (reverse below zero)
    if (truckSize < 0) {
      while (truckSize < 0) {
        totalUnitsInTruck -= boxTypes[i][1]
        truckSize++
      }
      break
    }

    i++
  }

  return totalUnitsInTruck
}
// // prettier-ignore
// testFunction(maximumUnits).input([[1,3],[2,2],[3,1]], 4).output(8) //?
// // prettier-ignore
// testFunction(maximumUnits).input([[5,10],[2,5],[4,7],[3,9]], 10).output(91) //?
// // prettier-ignore
// testFunction(maximumUnits).input([[1,3],[5,5],[2,5],[4,2],[4,1],[3,1],[2,2],[1,3],[2,5],[3,2]], 35).output(76) //?

// 1732. Find the Highest Altitude, Easy
/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  let highestAltitude = 0
  let netGain = 0
  for (let i = 0; i < gain.length; i++) {
    netGain += gain[i]
    highestAltitude = Math.max(netGain, highestAltitude)
  }
  return highestAltitude
}
// testFunction(largestAltitude).input([-5, 1, 5, 0, -7]).output(1) //?
// testFunction(largestAltitude).input([-4, -3, -2, -1, 4, 3, 2]).output(0) //?

// 1742. Maximum Number of Balls in a Box, Easy
/**
 * @param {number} lowLimit
 * @param {number} highLimit
 * @return {number}
 */
var countBalls = function (lowLimit, highLimit) {
  const boxMap = new Map()
  for (let i = lowLimit; i < highLimit + 1; i++) {
    // prettier-ignore
    let boxNumber = Number(i.toString().split('').reduce((a, b) => +a + +b))
    boxMap.set(boxNumber, boxMap.get(boxNumber) + 1 || 1)
  }
  return Math.max(...boxMap.values())
}
// testFunction(countBalls).input(1, 10).output(2) //?

// 1748. Sum of Unique Elements, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfUnique = function (nums) {
  const map = {}
  for (const num of nums) {
    map[num] = map[num] + 1 || 1
  }

  let sumOfUnique = 0
  for (const num in map) {
    if (map[num] === 1) {
      sumOfUnique += Number(num)
    }
  }
  return sumOfUnique

  // Alternative with hashmap
  // const map = new Map()
  // for (const num of nums) {
  //   map.set(num, map.get(num) + 1 || 1)
  // }
  // let sumOfUnique = 0
  // for (const num of map) {
  //   if (num[1] === 1) {
  //     sumOfUnique += num[0]
  //   }
  // }
  // return sumOfUnique
}
// testFunction(sumOfUnique).input([1, 2, 3, 2]).output(4) //?
// testFunction(sumOfUnique).input([1, 1, 1, 1, 1]).output(0) //?
// testFunction(sumOfUnique).input([1, 2, 3, 4, 5]).output(15) //?

// 1763. Longest Nice Substring, Easy
/**
 * @param {string} s
 * @return {string}
 */
var longestNiceSubstring = function (s) {
  function isNiceString(string) {
    const set = new Set(string)
    for (const character of set) {
      if (!set.has(character.toLowerCase()) || !set.has(character.toUpperCase())) {
        return false
      }
    }
    return true
  }

  let longestSubstring = ''
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      let currentSubstring = s.slice(i, j + 1)
      if (isNiceString(currentSubstring) && currentSubstring.length > longestSubstring.length) {
        longestSubstring = currentSubstring
      }
    }
  }

  return longestSubstring
}
// testFunction(longestNiceSubstring).input('YazaAay').output('aAa') //?

// 1752. Check if Array Is Sorted and Rotated, Easy
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function (nums) {
  // 1. Rotate arr to start from minimal number
  const startIndex = nums.indexOf(Math.min(...nums))
  for (let i = 0; i < startIndex; i++) {
    nums.push(nums.shift())
  }

  // 2. Create sorted copy of original arr
  const sortedNums = nums.toSorted((a, b) => a - b)

  // 3. Remove duplicates
  const numsSet = [...new Set(nums)]
  const sortedNumsSet = [...new Set(sortedNums)]

  // 4. Compare if sorted arr equal to original
  return JSON.stringify(numsSet) === JSON.stringify(sortedNumsSet)
}
// testFunction(check).input([3, 4, 5, 1, 2]).output(true) //?
// testFunction(check).input([2, 1, 3, 4]).output(false) //?
// testFunction(check).input([6, 10, 6]).output(true) //?

// 1758. Minimum Changes To Make Alternating Binary String, Easy
/**
 * @param {string} split
 * @return {number}
 */
var minOperations = function (s) {
  /*
  10010100 - Original string

  10101010 - If count as is: 5 alterations
    ^^^^^
  01010101 - If count with first bit flipped: 3 alterations
  ^^     ^
  */
  // Alternative https://leetcode.com/problems/minimum-changes-to-make-alternating-binary-string/solutions/4449189/daily-leetcode-problem-optimized-easy-explanation-c-java-python-javascript
  let count1 = 0
  let count2 = 0
  for (let i = 0; i < s.length; ++i) {
    if (i % 2 === 0) {
      count1 += s[i] !== '0' ? 1 : 0
      count2 += s[i] !== '1' ? 1 : 0
    } else {
      count1 += s[i] !== '1' ? 1 : 0
      count2 += s[i] !== '0' ? 1 : 0
    }
  }
  return Math.min(count1, count2)

  // Alternative: Two loops, single logic (2 iterations, 1 selections)
  // Slower by 1-1.5 times but eaasy to understand
  // const splitS = s.split('')
  // let countS = 0
  // for (let i = 1; i < splitS.length; i++) {
  //   if (splitS[i] === splitS[i - 1]) {
  //     countS++
  //     splitS[i] = splitS[i] === '1' ? '0' : '1'
  //   }
  // }
  // const splitSMod = s.split('')
  // splitSMod[0] = splitSMod[0] === '1' ? '0' : '1'
  // let countSMod = 1
  // for (let i = 1; i < splitSMod.length; i++) {
  //   if (splitSMod[i] === splitSMod[i - 1]) {
  //     countSMod++
  //     splitSMod[i] = splitSMod[i] === '1' ? '0' : '1'
  //   }
  // }
  // return Math.min(countS, countSMod)

  // Alternative: with single loop but double logic (1 iterations, 2 selections)
  // const splitS = s.split('')
  // let countS = 0
  // const splitSMod = s.split('')
  // splitSMod[0] = splitSMod[0] === '1' ? '0' : '1'
  // let countSMod = 1
  // for (let i = 1; i < splitS.length; i++) {
  //   if (splitS[i] === splitS[i - 1]) {
  //     countS++
  //     splitS[i] = splitS[i] === '1' ? '0' : '1'
  //   }
  //   if (splitSMod[i] === splitSMod[i - 1]) {
  //     countSMod++
  //     splitSMod[i] = splitSMod[i] === '1' ? '0' : '1'
  //   }
  // }
  // return Math.min(countS, countSMod)
}
// testFunction(minOperations).input('0100').output(1) //?
// testFunction(minOperations).input('1111').output(2) //?
// testFunction(minOperations).input('110010').output(2) //?
// testFunction(minOperations).input('10010100').output(3) //?

// 1768. Merge Strings Alternately, Easy
/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function (word1, word2) {
  const long = Math.max(word1.length, word2.length)
  let mergedWords = ''
  for (let i = 0; i < long; i++) {
    if (word1[i]) mergedWords += word1[i]
    if (word2[i]) mergedWords += word2[i]
  }
  return mergedWords //?

  // Alternative https://leetcode.com/problems/merge-strings-alternately/solutions/1081404/javascript-elegant-and-clean-solution-using-nullish-coalescing-operator-o-n
  // const maxLength = Math.max(a.length, b.length)
  // let result = ''
  // for (let i = 0; i < maxLength; i++) {
  //   result += (a[i] ?? '') + (b[i] ?? '')
  // }
  // return result
}
// testFunction(mergeAlternately).input('abc', 'pqr').output('apbqcr') //?
// testFunction(mergeAlternately).input('ab', 'pqrs').output('apbqrs') //?
// testFunction(mergeAlternately).input('abcd', 'pq').output('apbqcd') //?

// 1773. Count Items Matching a Rule, Easy
/**
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function (items, ruleKey, ruleValue) {
  if (ruleKey === 'type') {
    return items.filter((item) => item[0] === ruleValue).length
  }
  if (ruleKey === 'color') {
    return items.filter((item) => item[1] === ruleValue).length
  }
  if (ruleKey === 'name') {
    return items.filter((item) => item[2] === ruleValue).length
  }
  return
}
// testFunction(countMatches).input([["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]], "color", "silver").output(1) //?

// 1796. Second Largest Digit in a String, Easy
/**
 * @param {string} s
 * @return {number}
 */
var secondHighest = function (s) {
  const digits = s.replace(/\D/g, '')
  const digitsSet = new Set(digits)
  const sortedDigitsSet = [...digitsSet].sort((a, b) => b - a)
  return sortedDigitsSet.length > 1 ? parseInt(sortedDigitsSet[1]) : -1
}
// testFunction(secondHighest).input('dfa12321afd').output(2) //?
// testFunction(secondHighest).input('abc1111').output(-1) //?
// testFunction(secondHighest).input('ck077').output(0) //?

// 1790. Check if One String Swap Can Make Strings Equal, Easy
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var areAlmostEqual = function (s1, s2) {
  if (s1 === s2) return true

  const s1Arr = s1.split('')
  const s2Arr = s2.split('')

  let swapValue
  let swapIndex
  for (let i = 0; i < s1Arr.length; i++) {
    if (s1Arr[i] != s2Arr[i]) {
      if (swapValue) {
        s2Arr[swapIndex] = s2Arr[i]
        s2Arr[i] = swapValue
        break // No more swaps allowed
      } else {
        swapValue = s2Arr[i]
        swapIndex = i
      }
    }
  }

  return s1Arr.join('') === s2Arr.join('')
}
// testFunction(areAlmostEqual).input('bank', 'kanb').output(true) //?

// 1812. Determine Color of a Chessboard Square, Easy
/**
 * @param {string} coordinates
 * @return {boolean}
 */
var squareIsWhite = function (coordinates) {
  // https://leetcode.com/problems/determine-color-of-a-chessboard-square/solutions/3180117/1812-is-one-line-solution
  return (coordinates.codePointAt(0) + coordinates.codePointAt(1)) % 2 === 1

  // Alternative
  // const blackOdd = ['a', 'c', 'e', 'g', '1', '3', '5', '7']
  // const blackEven = ['b', 'd', 'f', 'h', '2', '4', '6', '8']
  // if (blackOdd.includes(coordinates[0]) && blackOdd.includes(coordinates[1])) return false
  // if (blackEven.includes(coordinates[0]) && blackEven.includes(coordinates[1])) return false
  // return true
}
// testFunction(squareIsWhite).input('a1').output(false) //?
// testFunction(squareIsWhite).input('h3').output(true) //?
// testFunction(squareIsWhite).input('b2').output(false) //?

// 1816. Truncate Sentence, Easy
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var truncateSentence = function (s, k) {
  return s.split(' ', k).join(' ')
}
// testFunction(truncateSentence).input("Hello how are you Contestant", 4).output("Hello how are you") //?

// 1844. Replace All Digits with Characters, Easy
/**
 * @param {string} s
 * @return {string}
 */
var replaceDigits = function (s) {
  const sArr = s.split('')
  for (let i = 0; i < sArr.length; i++) {
    if (i % 2 != 0) {
      sArr[i] = String.fromCharCode(sArr[i - 1].charCodeAt(0) + Number(sArr[i]))
    }
  }
  return sArr.join('')
}
// testFunction(replaceDigits).input('a1c1e1').output('abcdef') //?

// 1832. Check if the Sentence Is Pangram, Easy
/**
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function (sentence) {
  return new Set(sentence).size === 26
}
// testFunction(checkIfPangram).input('thequickbrownfoxjumpsoverthelazydog').output(true) //?

// 1859. Sorting the Sentence, Easy
/**
 * @param {string} s
 * @return {string}
 */
var sortSentence = function (s) {
  const sArr = s.split(' ')
  sArr.sort((a, b) => Number(a.at(-1)) - Number(b.at(-1)))
  for (let i = 0; i < sArr.length; i++) {
    sArr[i] = sArr[i].slice(0, -1)
  }
  return sArr.join(' ')
}
// testFunction(sortSentence).input('is2 sentence4 This1 a3').output('This is a sentence') //?

// 1854. Maximum Population Year, Easy
/**
 * @param {number[][]} logs
 * @return {number}
 */
var maximumPopulation = function (logs) {
  const frequencyMap = new Map()
  const checkedYears = []
  for (const [birthYear, deathYear] of logs) {
    if (checkedYears.includes(birthYear)) continue // Skip year duplicates
    for (let i = 0; i < logs.length; i++) {
      if (birthYear >= logs[i][0] && birthYear < logs[i][1]) {
        frequencyMap.set(birthYear, frequencyMap.get(birthYear) + 1 || 1)
      }
    }
    checkedYears.push(birthYear)
  }

  const frequencyMapArr = [...frequencyMap.entries()].sort((a, b) => a[0] - b[0])

  let maxPopulationYear = 0
  let maxPopulationCount = 0
  for (let i = 0; i < frequencyMapArr.length; i++) {
    if (frequencyMapArr[i][1] > maxPopulationCount) {
      maxPopulationCount = frequencyMapArr[i][1]
      maxPopulationYear = frequencyMapArr[i][0]
    }
  }

  return maxPopulationYear
}
// testFunction(maximumPopulation).input([[1993,1999],[2000,2010]]).output(1993) //?
// testFunction(maximumPopulation).input([[1950,1961],[1960,1971],[1970,1981]]).output(1960) //?
// testFunction(maximumPopulation).input([[2033,2034],[2039,2047],[1998,2042],[2047,2048],[2025,2029],[2005,2044],[1990,1992],[1952,1956],[1984,2014]]).output(2005) //?
// testFunction(maximumPopulation).input([[1987,2047],[1952,2006],[2021,2042],[2047,2049],[2036,2040],[1994,2009]]).output(1994) //?
// testFunction(maximumPopulation).input([[1966,1968],[1954,2030],[1966,1994],[2030,2044],[1988,2036],[1977,2050],[2036,2046],[1989,2048],[2049,2050],[2008,2019],[2022,2031],[1970,2024],[1957,1996],[1991,2034],[1956,1996],[1959,1969],[2021,2050]]).output(1991) //?

// 1876. Substrings of Size Three with Distinct Characters, Easy
/**
 * @param {string} s
 * @return {number}
 */
var countGoodSubstrings = function (s) {
  let goodSubstringsCount = 0
  for (let i = 0; i < s.length - 2; i++) {
    if (s.slice(i, i + 3).length === new Set(s.slice(i, i + 3)).size) {
      goodSubstringsCount++
    }
  }
  return goodSubstringsCount
}
// testFunction(countGoodSubstrings).input('xyzzaz').output(1) //?

// 1351. Count Negative Numbers in a Sorted Matrix, Easy
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function (grid) {
  let countNegatives = 0
  for (const arr of grid) {
    for (let i = arr.length - 1; i > -1; i--) {
      if (arr[i] > -1) break
      countNegatives++
    }
  }
  return countNegatives

  // Alternative
  // return grid.flat().filter((ele) => ele < 0).length
}
// testFunction(countNegatives).input([[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]).output(8) //?

// 1897. Redistribute Characters to Make All Strings Equal, Easy
/**
 * @param {string[]} words
 * @return {boolean}
 */
var makeEqual = function (words) {
  const lettersFrequency = new Map()
  for (const word of words) {
    for (const letter of word) {
      lettersFrequency.set(letter, lettersFrequency.get(letter) + 1 || 1)
    }
  }

  for (const frequency of lettersFrequency.values()) {
    if (frequency % words.length != 0) {
      return false
    }
  }
  return true
}
// testFunction(makeEqual).input(['abc', 'aabc', 'bc']).output(true) //?
// testFunction(makeEqual).input(['abc', 'cba']).output(true) //?
// testFunction(makeEqual).input(['bc', 'de']).output(false) //?
// testFunction(makeEqual).input(['aabbccdde', 'e']).output(true) //?
// testFunction(makeEqual).input(["caaaaa","aaaaaaaaa","a","bbb","bbbbbbbbb","bbb","cc","cccccccccccc","ccccccc","ccccccc","cc","cccc","c","cccccccc","c"]).output(true) //?

// 1941. Check if All Characters Have Equal Number of Occurrences, Easy
/**
 * @param {string} s
 * @return {boolean}
 */
var areOccurrencesEqual = function (s) {
  const map = new Map()
  for (const char of s) {
    map.set(char, map.get(char) + 1 || 1)
  }
  const set = new Set([...map.values()])
  return set.size === 1
}
// testFunction(areOccurrencesEqual).input('abacbc').output(true) //?

// 1903. Largest Odd Number in String, Easy
/**
 * @param {string} num
 * @return {string}
 */
var largestOddNumber = function (num) {
  while (num.length) {
    if (Number(num.at(-1)) % 2 === 0) {
      num = num.slice(0, -1)
    } else {
      return num
    }
  }
  return ''
}
// testFunction(largestOddNumber).input('52').output('5') //?
// testFunction(largestOddNumber).input('239537672423884969653287101').output('239537672423884969653287101') //?

// 1920. Build Array from Permutation, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var buildArray = function (nums) {
  return nums.map((num) => nums[num])

  // Alternative
  // const permutationArr = []
  // for (const num of nums) {
  //   permutationArr[num] = nums[nums[num]]
  // }
  // return permutationArr
}
// testFunction(buildArray).input([0, 2, 1, 5, 3, 4]).output([0, 1, 2, 4, 5, 3]) //?

// 1880. Check if Word Equals Summation of Two Words, Easy
/**
 * @param {string} firstWord
 * @param {string} secondWord
 * @param {string} targetWord
 * @return {boolean}
 */
var isSumEqual = function (firstWord, secondWord, targetWord) {
  // prettier-ignore
  const letterValues = {a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9}
  // prettier-ignore
  let firstNum = '', secondNum = '', targetNum = ''

  for (const letter of firstWord) firstNum += letterValues[letter]
  for (const letter of secondWord) secondNum += letterValues[letter]
  for (const letter of targetWord) targetNum += letterValues[letter]

  return Number(firstNum) + Number(secondNum) === Number(targetNum)
}
// testFunction(isSumEqual).input('acb', 'cba', 'cdb').output(true) //?

// 1909. Remove One Element to Make the Array Strictly Increasing, Easy
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canBeIncreasing = function (nums) {
  let issueNumIndex
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      issueNumIndex = i
      break
    }
  }

  let flagHigh = 0
  let checkHigh = nums.toSpliced(issueNumIndex - 1, 1)
  for (let i = 1; i < checkHigh.length; i++) {
    if (checkHigh[i] <= checkHigh[i - 1]) {
      flagHigh = 1
      break
    }
  }

  let flagLow = 0
  let checkLow = nums.toSpliced(issueNumIndex, 1)
  for (let i = 1; i < checkLow.length; i++) {
    if (checkLow[i] <= checkLow[i - 1]) {
      flagLow = 1
      break
    }
  }

  if (flagHigh === 0 || flagLow === 0) return true
  else return false
}
// testFunction(canBeIncreasing).input([1, 2, 10, 5, 7]).output(true) //?
// testFunction(canBeIncreasing).input([2, 3, 1, 2]).output(false) //?
// testFunction(canBeIncreasing).input([1, 1, 1]).output(false) //?
// testFunction(canBeIncreasing).input([105, 924, 32, 968]).output(true) //?

// 1913. Maximum Product Difference Between Two Pairs, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProductDifference = function (nums) {
  let maxNum = Math.max(...nums)
  let minNum = Math.min(...nums)

  if (nums.length > 2) {
    nums.splice(nums.indexOf(maxNum), 1)
    nums.splice(nums.indexOf(minNum), 1)
  }

  let nearMaxNum = Math.max(...nums)
  let nearMinNum = Math.min(...nums)

  return maxNum * nearMaxNum - minNum * nearMinNum

  // Alternative
  // https://leetcode.com/problems/maximum-product-difference-between-two-pairs/solutions/2084079/c-c-java-c-javascript-typescript-o-n-solutions-easy-to-understand
  // // prettier-ignore
  // let min1 = 1e4, min2 = min1, max1 = 0, max2 = 0;
  // for (const num of nums) {
  //   if (num > max1 || num > max2) {
  //     max2 = Math.max(max1, max2)
  //     max1 = num
  //   }
  //   if (num < min1 || num < min2) {
  //     min2 = Math.min(min1, min2)
  //     min1 = num
  //   }
  // }
  // return max1 * max2 - min1 * min2

  // Alternative
  // https://leetcode.com/problems/maximum-product-difference-between-two-pairs/solutions/4418141/c-java-python-javascript-2-approaches-explained
  // nums.sort((a, b) => a - b)
  // const n = nums.length
  // return nums[n - 2] * nums[n - 1] - nums[0] * nums[1]
}
// testFunction(maxProductDifference).input([5, 6, 2, 7, 4]).output(34) //?
// testFunction(maxProductDifference).input([4, 2, 5, 9, 7, 4, 8]).output(64) //?
// testFunction(maxProductDifference).input([5, 9, 4, 6]).output(34) //?
// testFunction(maxProductDifference).input([1, 6, 7, 5, 2, 4, 10, 6, 4]).output(68) //?
// testFunction(maxProductDifference).input([8, 3, 5, 7]).output(41) //?
// testFunction(maxProductDifference).input([10, 10, 10, 10]).output(0) //?
// testFunction(maxProductDifference).input([2, 9, 5, 9, 1]).output(79) //?

// 1945. Sum of Digits of String After Convert, Easy
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var getLucky = function (s, k) {
  // prettier-ignore
  const alphabet = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8, i:9, j:10 ,k:11, l:12, m:13, n:14, o:15, p:16, q:17, r:18, s:19, t:20, u:21, v:22, w:23, x:24, y:25, z:26}

  let digitsString = ''
  for (const char of s) {
    digitsString += alphabet[char]
  }

  let digitsSum
  while (k > 0) {
    digitsSum = 0
    for (const digit of digitsString) {
      digitsSum += Number(digit)
    }
    digitsString = String(digitsSum)
    k--
  }

  return digitsSum
}
// testFunction(getLucky).input('iiii', 1).output(36) //?
// testFunction(getLucky).input('leetcode', 2).output(6) //?

// 1974. Minimum Time to Type Word Using Special Typewriter, easy
/**
 * @param {string} word
 * @return {number}
 */
var minTimeToType = function (word) {
  // prettier-ignore
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let pointer = 'a'
  let seconds = 0

  for (const char of word) {
    if (pointer === char) {
      seconds++
      continue
    } else {
      let difference = Math.abs(alphabet.indexOf(pointer) - alphabet.indexOf(char))

      if (difference <= Math.floor(alphabet.length / 2)) {
        seconds += difference
      } else {
        difference = alphabet.length - difference
        seconds += difference
      }

      pointer = char
      seconds++
    }
  }

  return seconds
}
// testFunction(minTimeToType).input('abc').output(5) //?
// testFunction(minTimeToType).input('bza').output(7) //?
// testFunction(minTimeToType).input('zjpc').output(34) //?

// 1961. Check If String Is a Prefix of Array, Easy
/**
 * @param {string} s
 * @param {string[]} words
 * @return {boolean}
 */
var isPrefixString = function (s, words) {
  let prefix = ''
  for (const word of words) {
    prefix += word
    if (prefix === s) return true
  }
  return false
}
// testFunction(isPrefixString).input("iloveleetcode", ["i","love","leetcode","apples"]).output(true) //?

// 1967. Number of Strings That Appear as Substrings in Word, Easy
/**
 * @param {string[]} patterns
 * @param {string} word
 * @return {number}
 */
var numOfStrings = function (patterns, word) {
  let countSubstrings = 0
  for (const pattern of patterns) {
    // if (word.match(new RegExp(`${pattern}`, 'g'))) countSubstrings++
    if (word.includes(pattern)) countSubstrings++
  }
  return countSubstrings

  // Alternative
  // https://leetcode.com/problems/number-of-strings-that-appear-as-substrings-in-word/solutions/1404563/c-javascript-typescript-1-liner-easysimple
  // return [...patterns].filter((x) => word.includes(x)).length
}
// testFunction(numOfStrings).input(['a', 'abc', 'bc', 'd'], 'abc').output(3) //?

// 1991. Find the Middle Index in Array, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMiddleIndex = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    const before = nums.slice(0, i).reduce((a, b) => a + b, 0) || 0
    const after = nums.slice(i + 1).reduce((a, b) => a + b, 0) || 0
    if (before === after) return i
  }
  return -1
}
// testFunction(findMiddleIndex).input([2, 3, -1, 8, 4]).output(3) //?
// testFunction(findMiddleIndex).input([1, -1, 4]).output(2) //?
// testFunction(findMiddleIndex).input([2, 5]).output(-1) //?
// testFunction(findMiddleIndex).input([1]).output(0) //?
// testFunction(findMiddleIndex).input([4, 0]).output(0) //?
// testFunction(findMiddleIndex).input([1, 1]).output(-1) //?
// testFunction(findMiddleIndex).input([1, 3, 5, 9]).output(-1) //?
// testFunction(findMiddleIndex).input([-5]).output(0) //?
// testFunction(findMiddleIndex).input([3, -4, 1, -4]).output(3) //?

// 1979. Find Greatest Common Divisor of Array, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function (nums) {
  let largetsNum = Math.max(...nums) //?
  let smallestNum = Math.min(...nums) //?

  const largeDivisors = []
  const smallDivisors = []

  for (let i = 1; i < largetsNum; i++) {
    if (!(largetsNum % i)) {
      largeDivisors.push(largetsNum / i)
    }
    if (!(smallestNum % i)) {
      smallDivisors.push(smallestNum / i)
    }
  }

  for (let i = 0; i < smallDivisors.length; i++) {
    if (largeDivisors.includes(smallDivisors[i])) {
      return smallDivisors[i]
    }
  }

  return 1
}
// testFunction(findGCD).input([2, 5, 6, 9, 10]).output(2) //?
// testFunction(findGCD).input([7, 5, 6, 8, 3]).output(1) //?
// testFunction(findGCD).input([3, 3]).output(3) //?

// 1995. Count Special Quadruplets, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var countQuadruplets = function (nums) {
  let count = 0
  for (let a = 0; a < nums.length; a++) {
    for (let b = a + 1; b < nums.length; b++) {
      for (let c = b + 1; c < nums.length; c++) {
        for (let d = c + 1; d < nums.length; d++) {
          if (nums[a] + nums[b] + nums[c] === nums[d]) count++
        }
      }
    }
  }
  return count
}
// testFunction(countQuadruplets).input([1, 2, 3, 6]).output(1) //?
// testFunction(countQuadruplets).input([3, 3, 6, 4, 5]).output(0) //?
// testFunction(countQuadruplets).input([1, 1, 1, 3, 5]).output(4) //?
// testFunction(countQuadruplets).input([2, 16, 9, 27, 3, 39]).output(2) //?

// 2000. Reverse Prefix of Word, Easy
/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
var reversePrefix = function (word, ch) {
  // prettier-ignore
  return word.slice(0, word.indexOf(ch) + 1).split('').reverse().join('') + word.slice(word.indexOf(ch) + 1)
}
// testFunction(reversePrefix).input('abcdefd', 'd').output('dcbaefd') //?

// 2022. Convert 1D Array Into 2D Array, Easy
/**
 * @param {number[]} original
 * @param {number} m
 * @param {number} n
 * @return {number[][]}
 */
var construct2DArray = function (original, m, n) {
  if (original.length != n * m) return []

  const newArr = []
  let index = 0
  for (let i = 0; i < m; i++) {
    let row = []
    for (let j = 0; j < n; j++) {
      row.push(original[index])
      index++
    }
    newArr.push(row)
  }
  return newArr
}
// testFunction(construct2DArray).input([1,2,3,4], 2, 2).output([[1,2],[3,4]]) //?
// testFunction(construct2DArray).input([1,2,3], 1, 3).output([[1,2,3]]) //?
// testFunction(construct2DArray).input([1,2], 1, 1).output([]) //?
// testFunction(construct2DArray).input([3], 1, 2).output([]) //?
// testFunction(construct2DArray).input([5], 3, 1).output([]) //?
// testFunction(construct2DArray).input([6,2,6,8], 4, 2).output([]) //?
// testFunction(construct2DArray).input([1,3,3,5], 3, 1).output([]) //?

// 2011. Final Value of Variable After Performing Operations, Easy
/**
 * @param {string[]} operations
 * @return {number}
 */
var finalValueAfterOperations = function (operations) {
  let value = 0
  for (const operation of operations) {
    if (operation === 'X++' || operation === '++X') {
      value++
    }
    if (operation === 'X--' || operation === '--X') {
      value--
    }
  }
  return value

  // Alternative https://leetcode.com/problems/final-value-of-variable-after-performing-operations/solutions/3440605/one-line-solution
  // return operations.reduce((acc,i) => i.includes('+') ? acc += 1 : acc -= 1, 0)
}
// testFunction(finalValueAfterOperations).input(['--X', 'X++', 'X++']).output(1) //?

// 2037. Minimum Number of Moves to Seat Everyone, Easy
/**
 * @param {number[]} seats
 * @param {number[]} students
 * @return {number}
 */
var minMovesToSeat = function (seats, students) {
  seats.sort((a, b) => a - b)
  students.sort((a, b) => a - b)

  let moves = 0
  for (let i = 0; i < seats.length; i++) {
    moves += Math.abs(seats[i] - students[i])
  }
  return moves
}
// testFunction(minMovesToSeat).input([3, 1, 5], [2, 7, 4]).output(4) //?
// testFunction(minMovesToSeat).input([4, 1, 5, 9], [1, 3, 2, 6]).output(7) //?
// testFunction(minMovesToSeat).input([2, 2, 6, 6], [1, 3, 2, 6]).output(4) //?

// 2027. Minimum Moves to Convert String, Easy
/**
 * @param {string} s
 * @return {number}
 */
var minimumMoves = function (s) {
  let moves = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'X') {
      moves++
      i += 2
    }
  }

  return moves
}
// testFunction(minimumMoves).input('XXX').output(1) //?
// testFunction(minimumMoves).input('XXOX').output(2) //?
// testFunction(minimumMoves).input('OOOO').output(0) //?
// testFunction(minimumMoves).input('OXOX').output(1) //?
// testFunction(minimumMoves).input('OXOOX').output(2) //?

// 2032. Two Out of Three, Easy
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @return {number[]}
 */
var twoOutOfThree = function (nums1, nums2, nums3) {
  const nums1Set = new Set(nums1)
  const nums2Set = new Set(nums2)
  const nums3Set = new Set(nums3)
  const values = []
  for (const num of [...nums1Set, ...nums2Set, ...nums3Set]) {
    if (nums1Set.has(num) && nums2Set.has(num)) {
      values.push(num)
    }
    if (nums1Set.has(num) && nums3Set.has(num)) {
      values.push(num)
    }
    if (nums2Set.has(num) && nums3Set.has(num)) {
      values.push(num)
    }
  }
  return [...new Set(values)]
}
// testFunction(twoOutOfThree).input([1, 1, 3, 2], [2, 3], [3]).output([3, 2]) //?
// testFunction(twoOutOfThree).input([1, 2, 2], [4, 3, 3], [5]).output([]) //?

// 2053. Kth Distinct String in an Array, Easy
/**
 * @param {string[]} arr
 * @param {number} k
 * @return {string}
 */
var kthDistinct = function (arr, k) {
  const map = new Map()
  for (const string of arr) {
    map.set(string, map.get(string) + 1 || 1)
  }

  const distinctStrings = [...map.entries()].filter((entry) => entry[1] === 1)

  return distinctStrings[k - 1] ? distinctStrings[k - 1][0] : ''
}
// testFunction(kthDistinct).input(['d', 'b', 'c', 'b', 'c', 'a'], 2).output('a') //?
// testFunction(kthDistinct).input(['a', 'b', 'a'], 3).output('') //?

// 2042. Check if Numbers Are Ascending in a Sentence, Easy
/**
 * @param {string} s
 * @return {boolean}
 */
var areNumbersAscending = function (s) {
  // prettier-ignore
  let numbers = s.replace(/[a-z]/g, '').split(' ').filter(num=> num != '')
  for (let i = 1; i < numbers.length; i++) {
    if (+numbers[i] <= +numbers[i - 1]) return false
  }
  return true
}
// testFunction(areNumbersAscending).input("1 box has 3 blue 4 red 6 green and 12 yellow marbles").output(true) //?

// 2047. Number of Valid Words in a Sentence, Easy
/**
 * @param {string} sentence
 * @return {number}
 */
var countValidWords = function (sentence) {
  const tokens = sentence.trim('').split(/\s+/)
  const regex = /\d|^-|-$|.*-.*-.*|-[!,\.]|!(?=.)|,(?=.)|\.(?=.)/g
  const filteredTokens = tokens.filter((token) => !token.match(regex))
  return filteredTokens.length
}
// testFunction(countValidWords).input('cat and  dog').output(3) //?
// testFunction(countValidWords).input('!this  1-s b8d!').output(0) //?
// testFunction(countValidWords).input('alice and  bob are playing stone-game10').output(5) //?
// testFunction(countValidWords).input("a-b-c").output(0) //?
// testFunction(countValidWords).input("!g 3 !sy ").output(0) //?

// 2068. Check Whether Two Strings are Almost Equivalent, Easy
/**
 * @param {string} word1
 * @param {string} word2
 * @return {boolean}
 */
var checkAlmostEquivalent = function (word1, word2) {
  const map = new Map()

  for (let i = 0; i < word1.length; i++) {
    map.set(word1[i], (map.get(word1[i]) ?? 0) + 1)
    map.set(word2[i], (map.get(word2[i]) ?? 0) - 1)
  }

  for (const [letter, frequency] of map) {
    if (Math.abs(frequency) > 3) return false
  }
  return true

  // // Alternative
  // // Set characters frequency
  // const map1 = new Map()
  // const map2 = new Map()

  // // word1.length === word2.length
  // for (let i = 0; i < word1.length; i++) {
  //   map1.set(word1[i], map1.get(word1[i]) + 1 || 1)
  //   map2.set(word2[i], map2.get(word2[i]) + 1 || 1)
  // }

  // // Get all available charcters
  // const set = [...new Set(word1.concat(word2))]

  // // Count difference for each character
  // const diffMap = new Map()
  // for (const char of set) {
  //   let difference = Math.abs((map1.get(char) || 0) - (map2.get(char) || 0))
  //   diffMap.set(char, difference)
  // }

  // // Find difference more than 3
  // for (const [key, value] of diffMap) {
  //   if (value > 3) return false
  // }

  // return true
}
// testFunction(checkAlmostEquivalent).input('aaaa', 'bccb').output(false) //?
// testFunction(checkAlmostEquivalent).input('abcdeef', 'abaaacc').output(true) //?
// testFunction(checkAlmostEquivalent).input('cccddabba', 'babababab').output(true) //?
// testFunction(checkAlmostEquivalent).input('aaaa', 'aaaa').output(true) //?
// testFunction(checkAlmostEquivalent).input('zzzyyy', 'iiiiii').output(false) //?

// 2057. Smallest Index With Equal Value, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestEqual = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (i % 10 === nums[i]) return i
  }
  return -1

  // Alternative
  // return nums.findIndex((num, index) => index % 10 === num)
}
// testFunction(smallestEqual).input([0, 1, 2]).output(0) //?

// 2062. Count Vowel Substrings of a String, Easy
/**
 * @param {string} word
 * @return {number}
 */
var countVowelSubstrings = function (word) {
  // https://leetcode.com/problems/count-vowel-substrings-of-a-string/solutions/2177576/javascript-set-solution
  const vowels = new Set(['a', 'e', 'i', 'o', 'u'])
  const set = new Set()
  let countVowelsSubstring = 0

  for (let i = 0; i < word.length; i++) {
    set.clear()

    for (let j = 0; j + i < word.length; j++) {
      let character = word[j + i]
      if (!vowels.has(character)) break
      set.add(character)
      if (set.size === vowels.size) countVowelsSubstring++
    }
  }

  return countVowelsSubstring

  // Alternative
  // let start = 0
  // let end = start + 5
  // let countVowelsSubstring = 0
  // const regexNon = /[^aeiou]+/
  // const regex = /(?=.*a)(?=.*e)(?=.*i)(?=.*o)(?=.*u)/
  // while (start < word.length - 4) {
  //   let substring = word.slice(start, end)
  //   if (substring.match(regexNon)) {
  //     if (end < word.length && end - start === 5) {
  //       start++
  //       end++
  //     } else {
  //       start++
  //       end = start + 5
  //     }
  //     continue
  //   }
  //   if (substring.match(regex)) {
  //     countVowelsSubstring++
  //   }
  //   if (end < word.length) {
  //     end++
  //   } else {
  //     start++
  //     end = start + 5
  //   }
  // }
  // return countVowelsSubstring
}
// testFunction(countVowelSubstrings).input('aeiouu').output(2) //?
// testFunction(countVowelSubstrings).input('cuaieuouac').output(7) //?
// testFunction(countVowelSubstrings).input('unicornarihan').output(0) //?
// testFunction(countVowelSubstrings).input('poazaeuioauoiioaouuouaui').output(31) //?
// testFunction(countVowelSubstrings).input('duuebuaeeeeeeuaoeiueaoui').output(81) //?

// 2085. Count Common Words With One Occurrence, Easy
/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {number}
 */
var countWords = function (words1, words2) {
  const longerStringLength = words1.length > words2.length ? words1.length : words2.length
  const map1 = new Map()
  const map2 = new Map()

  for (let i = 0; i < longerStringLength; i++) {
    if (words1[i]) map1.set(words1[i], (map1.get(words1[i]) ?? 0) + 1)
    if (words2[i]) map2.set(words2[i], (map2.get(words2[i]) ?? 0) + 1)
  }

  let countCommon = 0
  for (const word of words1) {
    if (map1.get(word) === 1 && map2.get(word) === 1) countCommon++
  }

  // Alternative with map iterator
  // let countCommon = 0
  // const iterator1 = map1.keys()
  // for (let i = 0; i < map1.size; i++) {
  //   let map1Key = iterator1.next().value
  //   if (map1.get(map1Key) === 1 && map2.get(map1Key) === 1) countCommon++
  // }

  return countCommon
}
// testFunction(countWords).input(["leetcode","is","amazing","as","is"], ["amazing","leetcode","is"]).output(2) //?

// 2073. Time Needed to Buy Tickets, Easy
/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function (tickets, k) {
  let seconds = 0
  let index = 0

  while (tickets[k] > 0) {
    if (index === tickets.length) index = 0
    // Alternative to reset index
    // index = index % tickets.length

    if (tickets[index] === 0) {
      index++
      continue
    }
    tickets[index]--
    index++
    seconds++

    // Alternative
    // if (tickets[index]) {
    //   tickets[index]--
    //   seconds++
    // }
    // index++
  }
  return seconds
}
// testFunction(timeRequiredToBuy).input([2, 3, 2], 2).output(6) //?
// testFunction(timeRequiredToBuy).input([5, 1, 1, 1], 0).output(8) //?

// 2078. Two Furthest Houses With Different Colors, Easy
/**
 * @param {number[]} colors
 * @return {number}
 */
var maxDistance = function (colors) {
  const diffs = []

  for (let i = 0; i < colors.length; i++) {
    let leftColor = colors[i]

    for (let j = colors.length - 1; j > 0; j--) {
      let rightColor = colors[j]

      if (leftColor != rightColor) {
        diffs.push(Math.abs(i - j))
      }
    }
  }

  return Math.max(...diffs)
}
// testFunction(maxDistance).input([1, 1, 1, 6, 1, 1, 1]).output(3) //?
// testFunction(maxDistance).input([1, 8, 3, 8, 3]).output(4) //?
// testFunction(maxDistance).input([0, 1]).output(1) //?
// testFunction(maxDistance).input([4, 4, 4, 11, 4, 4, 11, 4, 4, 4, 4, 4]).output(8) //?

// 2089. Find Target Indices After Sorting Array, Easy
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var targetIndices = function (nums, target) {
  const sortedNums = nums.sort((a, b) => a - b)
  const targetNumsIndexes = []
  for (let i = 0; i < sortedNums.length; i++) {
    if (sortedNums[i] === target) {
      targetNumsIndexes.push(i)
    }
  }
  return targetNumsIndexes
}
// testFunction(targetIndices).input([1, 2, 5, 2, 3], 2).output([1, 2]) //?

// 2114. Maximum Number of Words Found in Sentences, Easy
/**
 * @param {string[]} sentences
 * @return {number}
 */
var mostWordsFound = function (sentences) {
  let maxNumberOfWords = 0
  for (const sentence of sentences) {
    const words = sentence.split(' ')
    if (words.length >= maxNumberOfWords) maxNumberOfWords = words.length
  }
  return maxNumberOfWords

  // Alternative https://leetcode.com/problems/maximum-number-of-words-found-in-sentences/solutions/1896320/1-line
  // return Math.max(...sentences.map((item) => item.split(' ').length))
}
// testFunction(mostWordsFound).input(["alice and bob love leetcode", "i think so too", "this is great thanks very much"]).output(6) //?

// 2103. Rings and Rods, Easy
/**
 * @param {string} rings
 * @return {number}
 */
var countPoints = function (rings) {
  const map = new Map()
  for (let i = 0; i < rings.length; i += 2) {
    map.set(rings[i + 1], (map.get(rings[i + 1]) ?? []).concat(rings[i]))

    // Alternative 1
    // let ring = rings[i + 1]
    // let colors = map.get(rings[i + 1]) ?? []
    // colors.push(rings[i])
    // map.set(ring, colors)

    // Alternative 2
    // let ring = rings[i + 1]
    // let colors = [...(map.get(rings[i + 1]) ?? []), rings[i]]
    // map.set(ring, colors)
  }

  let rodsWithRings = 0
  for (const [index, value] of map) {
    if (value.includes('R') && value.includes('G') && value.includes('B')) {
      rodsWithRings++
    }
  }

  return rodsWithRings
}
// testFunction(countPoints).input('B0B6G0R6R0R6G9').output(1) //?

// 2108. Find First Palindromic String in the Array, Easy
/**
 * @param {string[]} words
 * @return {string}
 */
var firstPalindrome = function (words) {
  for (const word of words) {
    if (word === word.split('').reverse().join('')) {
      return word
    }
  }
  return ''
}
// testFunction(firstPalindrome).input(['abc', 'car', 'ada', 'racecar', 'cool']).output('ada') //?

// 2129. Capitalize the Title, Easy
/**
 * @param {string} title
 * @return {string}
 */
var capitalizeTitle = function (title) {
  const newTitle = []
  for (const word of title.split(' ')) {
    let newWord = word.toLocaleLowerCase()
    if (word.length > 2) newWord = newWord.replace(/^./, newWord[0].toUpperCase())
    newTitle.push(newWord)
  }
  return newTitle.join(' ')
}
// testFunction(capitalizeTitle).input('capiTalIze tHe titLe').output('Capitalize The Title') //?
// testFunction(capitalizeTitle).input('First leTTeR of EACH Word').output('First Letter of Each Word') //?

// 2119. A Number After a Double Reversal, Easy
/**
 * @param {number} num
 * @return {boolean}
 */
var isSameAfterReversals = function (num) {
  if (num === 0) return true
  let reversedNum1 = num.toString().split('').reverse().join('').replace(/^0+/, '')
  let reversedNum2 = reversedNum1.split('').reverse().join('')
  return reversedNum2 === num.toString()
}
// testFunction(isSameAfterReversals).input(526).output(true) //?
// testFunction(isSameAfterReversals).input(0).output(true) //?

// 2124. Check if All A's Appears Before All B's, Easy
/**
 * @param {string} s
 * @return {boolean}
 */
var checkString = function (s) {
  return s.indexOf('ba') === -1

  // Alternative https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/solutions/1661296/javascript-2124-check-if-all-a-s-appears-before-all-b-s
  // return (
  //   s.indexOf('b') === -1 || // is b is not there ?
  //   s.lastIndexOf('a') < s.indexOf('b') // is  last a  before  1st b ?
  // )

  // Alternative
  // if (s.indexOf('b') === -1) return true
  // return s.lastIndexOf('a') < s.indexOf('b')

  // Alternative
  // return s.lastIndexOf('a') < (s.indexOf('b') === -1 ? 101 : s.indexOf('b'))
}
// testFunction(checkString).input('aaabbb').output(true) //?
// testFunction(checkString).input('abab').output(false) //?
// testFunction(checkString).input('bbb').output(true) //?
// testFunction(checkString).input('a').output(true) //?

// 2144. Minimum Cost of Buying Candies With Discount, Easy
/**
 * @param {number[]} cost
 * @return {number}
 */
var minimumCost = function (cost) {
  const sortedCost = cost.sort((a, b) => b - a)

  let minimumCost = 0
  for (let i = 0; i < sortedCost.length; i++) {
    if ((i + 1) % 3 === 0) {
      //do nothing
    } else {
      minimumCost += sortedCost[i]
    }
  }
  console.log(minimumCost)

  return minimumCost
}
// testFunction(minimumCost).input([1, 2, 3]).output(5) //?
// testFunction(minimumCost).input([6, 5, 7, 9, 2, 2]).output(23) //?
// testFunction(minimumCost).input([5, 5]).output(10) //?

// 2133. Check if Every Row and Column Contains All Numbers, Easy
/**
 * @param {number[][]} matrix
 * @return {boolean}
 */
var checkValid = function (matrix) {
  // Alternative
  // const columnMatrix = []
  // for (let i = 0; i < matrix.length; i++) {
  //   let column = []
  //   for (let j = 0; j < matrix.length; j++) {
  //     column.push(matrix[j][i])
  //   }
  //   columnMatrix.push(column)
  // }

  const columnMatrix = matrix[0].map((_, i) => matrix.map((row) => row[i]))

  for (const row of matrix) {
    const rowSet = new Set(row)
    if (rowSet.size !== matrix.length) return false
  }

  for (const column of columnMatrix) {
    const rowSet = new Set(column)
    if (rowSet.size !== columnMatrix.length) return false
  }

  return true
}
// testFunction(checkValid).input([[1,2,3],[3,1,2],[2,3,1]]).output(true) //?
// testFunction(checkValid).input([[2,2,2],[2,2,2],[2,2,2]]).output(false) //?

// 2138. Divide a String Into Groups of Size k, Easy
/**
 * @param {string} s
 * @param {number} k
 * @param {character} fill
 * @return {string[]}
 */
var divideString = function (s, k, fill) {
  const groupComposition = []
  for (let i = 0; i < s.length; i++) {
    let group = ''
    for (let j = 0; j < k; j++) {
      if (i >= s.length) {
        group += fill
      } else {
        group += s[i]
        i++
      }
    }
    groupComposition.push(group)
    i--
  }
  return groupComposition

  // Alternative https://leetcode.com/problems/divide-a-string-into-groups-of-size-k/solutions/5277891/typescript-slice-with-padend
  // const chunks = []
  // for (let i = 0; i < s.length; i += k) {
  //   chunks.push(s.slice(i, i + k).padEnd(k, fill))
  // }
  // return chunks
}
// testFunction(divideString).input('abcdefghi', 3, 'x').output(['abc', 'def', 'ghi']) //?
// testFunction(divideString).input('abcdefghij', 3, 'x').output(['abc', 'def', 'ghi', 'jxx']) //?

// 2160. Minimum Sum of Four Digit Number After Splitting Digits, Easy
/**
 * @param {number} num
 * @return {number}
 */
var minimumSum = function (num) {
  let numString = num.toString().split('')
  let numArr = numString.map((num) => parseInt(num))
  let numSorted = numArr.toSorted((a, b) => a - b)
  let newNum1 = parseInt(`${numSorted[0]}${numSorted[2]}`)
  let newNum2 = parseInt(`${numSorted[1]}${numSorted[3]}`)
  return newNum1 + newNum2

  // Alternative https://leetcode.com/problems/minimum-sum-of-four-digit-number-after-splitting-digits/solutions/3440231/my-minimumsum
  // let str = num.toString().split('').sort()
  // return parseInt(str[0] + str[2]) + parseInt(str[1] + str[3])
}
// testFunction(minimumSum).input(2932).output(52) //?
// testFunction(minimumSum).input(4009).output(13) //?

// 2169. Count Operations to Obtain Zero, Easy
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var countOperations = function (num1, num2) {
  let count = 0
  while (num1 && num2) {
    num1 >= num2 ? (num1 -= num2) : (num2 -= num1)
    count++
  }
  return count
}
// testFunction(countOperations).input(2, 3).output(3) //?

// 2185. Counting Words With a Given Prefix, Easy
/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function (words, pref) {
  const regex = new RegExp(`^${pref}`)
  let prefixCount = 0
  for (const word of words) {
    if (word.match(regex)) prefixCount++
    // Alternative
    // if (word.startsWith(pref)) prefixCount++
  }
  return prefixCount

  // Alternative https://leetcode.com/problems/counting-words-with-a-given-prefix/solutions/1814309/javascript-easy-to-understand-1-line
  // return words.filter((word) => word.startsWith(pref)).length
}
// testFunction(prefixCount).input(['pay', 'attention', 'practice', 'attend'], 'at').output(2) //?

// 2206. Divide Array Into Equal Pairs, Easy
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var divideArray = function (nums) {
  // Alternative https://leetcode.com/problems/divide-array-into-equal-pairs/solutions/1894695/javascript-clean-and-easy-to-understand
  const map = new Map()
  for (const num of nums) {
    map.has(num) ? map.delete(num) : map.set(num, true)
  }
  return map.size === 0

  // // Alternative https://leetcode.com/problems/divide-array-into-equal-pairs/solutions/2205079/easy-javascript-solution
  // nums = nums.sort((a, b) => a - b)
  // for (let i = 0; i < nums.length - 1; i += 2) {
  //   if (nums[i] !== nums[i + 1]) return false
  // }
  // return true

  // // Alternative
  // let numsLength = nums.length
  // const pairs = []
  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = i + 1; j < nums.length; j++) {
  //     if (nums[i] === nums[j]) {
  //       pairs.push([nums[i], nums[j]])
  //       nums.splice(i, 1)
  //       nums.splice(j - 1, 1)
  //       i--
  //       break
  //     }
  //   }
  // }
  // return numsLength === pairs.length * 2
}
// testFunction(divideArray).input([3, 2, 3, 2, 2, 2]).output(true) //?

// 2255. Count Prefixes of a Given String, Easy
/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
var countPrefixes = function (words, s) {
  // Alternative https://leetcode.com/problems/count-prefixes-of-a-given-string/solutions/2461131/3-different-fastest-approaches-with-javascript-including-one-liner
  // return words.filter((word) => s.indexOf(word) == 0).length

  let count = 0
  for (const word of words) {
    if (s.startsWith(word)) count++

    // Alternative
    // let regex = new RegExp(`^${word}`)
    // if (s.match(regex)) count++
  }
  return count
}
// testFunction(countPrefixes).input(['a', 'b', 'c', 'ab', 'bc', 'abc'], 'abc').output(3) //?

// 2224. Minimum Number of Operations to Convert Time, Easy
/**
 * @param {string} current
 * @param {string} correct
 * @return {number}
 */
var convertTime = function (current, correct) {
  // Calculate difference
  let currentMinutes = parseInt(current.slice(0, 2)) * 60 + parseInt(current.slice(3))
  let correctMinutes = parseInt(correct.slice(0, 2)) * 60 + parseInt(correct.slice(3))
  let differenceMinutes = correctMinutes - currentMinutes

  // Subtract number from difference until zero
  let numberMinutes = [60, 15, 5, 1]
  let operationsCount = 0

  for (let number of numberMinutes) {
    while (differenceMinutes >= number) {
      differenceMinutes -= number
      operationsCount++
    }
  }

  return operationsCount

  // Alternative loop
  // while (differenceMinutes) {
  //   for (let number of numberMinutes) {
  //     if (differenceMinutes - number >= 0) {
  //       differenceMinutes -= number
  //       operationsCount++
  //       break
  //     }
  //   }
  // }

  // // Alternative
  // // Time Limit Exceeded
  // // Using JS Date object
  // let operationsCount = 0
  // while (current != correct) {
  //   let currentDate = new Date(`1970-01-01T${current}:00.000Z`).getTime()
  //   // Add time in epoch miliseconds
  //   let plus60 = new Date(currentDate + 3_600_000).toISOString().slice(11, 16)
  //   let plus15 = new Date(currentDate + 900_000).toISOString().slice(11, 16)
  //   let plus5 = new Date(currentDate + 300_000).toISOString().slice(11, 16)
  //   let plus1 = new Date(currentDate + 60_000).toISOString().slice(11, 16)
  //   if (plus60 <= correct) {
  //     current = plus60
  //   } else if (plus15 <= correct) {
  //     current = plus15
  //   } else if (plus5 <= correct) {
  //     current = plus5
  //   } else if (plus1 <= correct) {
  //     current = plus1
  //   }
  //   operationsCount++
  // }
  // return operationsCount
}
// testFunction(convertTime).input('02:30', '04:35').output(3) //?
// testFunction(convertTime).input('11:00', '11:01').output(1) //?

// 2264. Largest 3-Same-Digit Number in String, Easy
/**
 * @param {string} num
 * @return {string}
 */
var largestGoodInteger = function (num) {
  const regex = new RegExp(/(.)\1\1/g)
  let matchArray = num.match(regex)
  if (!matchArray) return ''
  matchArray.sort((a, b) => parseInt(b) - parseInt(a))
  return matchArray[0]

  // Alternative https://leetcode.com/problems/largest-3-same-digit-number-in-string/solutions/4361963/beats-100-easy-to-understand
  // for (let i = 9; i >= 0; i--) {
  //   if (num.includes(`${i}${i}${i}`)) {
  //     return `${i}${i}${i}`
  //   }
  // }
  // return ''
}
// testFunction(largestGoodInteger).input('6777133339').output('777') //?
// testFunction(largestGoodInteger).input('2300019').output('000') //?
// testFunction(largestGoodInteger).input('42352338').output('') //?
// testFunction(largestGoodInteger).input('000400059').output('000') //?

// 2243. Calculate Digit Sum of a String, Easy
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var digitSum = function (s, k) {
  while (s.length > k) {
    let newString = ''
    for (let i = 0; i < s.length; i += k) {
      let groupSum = 0
      for (let j = i; j < i + k; j++) {
        if (s[j]) groupSum += parseInt(s[j]) // Prevent array NaN values
      }
      newString += groupSum.toString()

      // Alternative
      // let group = s.slice(i, i + k)
      // for (let j = 0; j < group.length; j++) {
      //   groupSum += parseInt(group[j])
      // }
      // newString += groupSum.toString()

      // Alternative https://leetcode.com/problems/calculate-digit-sum-of-a-string/solutions/1958014/a-concise-javascript-solution
      // newString += s.substring(i, i + k).split("").reduce((acc, val) => acc + (+val), 0);
    }

    s = newString
  }
  return s
}
// testFunction(digitSum).input('11111222223', 3).output('135') //?
// testFunction(digitSum).input('00000000', 3).output('000') //?

// 2190. Most Frequent Number Following Key In an Array, Easy
/**
 * @param {number[]} nums
 * @param {number} key
 * @return {number}
 */
var mostFrequent = function (nums, key) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === key) {
      map.set(nums[i + 1], (map.get(nums[i + 1]) ?? 0) + 1)
    }
  }

  const sortedMapArray = [...map.entries()].sort((a, b) => b[1] - a[1])

  return sortedMapArray[0][0]
}
// testFunction(mostFrequent).input([1, 100, 200, 1, 100], 1).output(100) //?
// testFunction(mostFrequent).input([2, 2, 2, 2, 3], 2).output(2) //?
// testFunction(mostFrequent).input([11, 22, 11, 33, 11, 33], 11).output(33) //?

// 2278. Percentage of Letter in String, Easy
/**
 * @param {string} s
 * @param {character} letter
 * @return {number}
 */
var percentageLetter = function (s, letter) {
  let countLetter = 0
  for (const char of s) {
    if (char === letter) countLetter++
  }
  return Math.floor((countLetter / s.length) * 100)
}
// testFunction(percentageLetter).input('foobar', 'o').output(33) //?
// testFunction(percentageLetter).input('sgawtb', 's').output(16) //?
