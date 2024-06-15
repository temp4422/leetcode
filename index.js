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
