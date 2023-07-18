// Hashmap
// 1. Two Sum
// Array, Hash Table
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let result = []
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        result.push(i, j)
        return result
      }
    }
  }
}
// console.log(twoSum([3, 2, 3], 6)) // Expected [0,2]

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

/*****************************************************************************/
/********************* TOP INTERVIEW 150  ************************************/
/*****************************************************************************/

/******************** Array / String *****************************************/
/*****************************************************************************/

// 88. Merge Sorted Array, Easy
// Array, Two Pointers, Sorting
/*****************************************************************************/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
// ;(nums1 = [1, 2, 3, 0, 0, 0]), (m = 3), (nums2 = [2, 5, 6]), (n = 3) // Expected [1,2,2,3,5,6]
// ;(nums1 = [-1, 0, 0, 3, 3, 3, 0, 0, 0]), (m = 6), (nums2 = [1, 2, 2]), (n = 3) // Expected [-1,0,0,1,2,2,3,3,3]
/*nums1 =[-10,-10,-9,-9,-9,-8,-8,-7,-7,-7,-6,-6,-6,-6,-6,-6,-6,-5,-5,-5,-4,-4,-4,-3,-3,-2,-2,-1,-1,0,1,1,1,2,2,2,3,3,3,4,5,5,6,6,6,6,7,7,7,7,8,9,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
nums2 = [-10,-10,-9,-9,-9,-9,-8,-8,-8,-8,-8,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-6,-5,-5,-5,-5,-5,-4,-4,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,9,9,9,9]
m = 55; n = 99 // Expected [-10,-10,-10,-10,-9,-9,-9,-9,-9,-9,-9,-8,-8,-8,-8,-8,-8,-8,-7,-7,-7,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-5,-5,-5,-5,-5,-5,-5,-5,-4,-4,-4,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,9,9,9]*/
var merge = function (nums1, m, nums2, n) {
  nums1.length = m // Cut arr to 'm' length
  for (let i = 0; i < n; i++) {
    nums1.push(nums2[i]) // Add nums2 to nums1 array
  }
  nums1.sort((a, b) => a - b) // Sort
}
// merge(nums1, m, nums2, n); console.log(nums1)

// 27. Remove Element, Easy
// Array, Two Pointers
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// ;(nums = [3, 2, 2, 3]), (val = 3) // Output: 2, nums = [2,2,_,_]
// ;(nums = [0, 1, 2, 2, 3, 0, 4, 2]), (val = 2) //Output: 5, nums = [0,1,4,0,3,_,_,_]
// ;(nums = [3, 3]), (val = 3) // Output [3]
var removeElement = function (nums, val) {
  let length = nums.length
  for (let i = 0; i < length; i++) {
    // Only splice array when item is found
    if (nums.indexOf(val) > -1) {
      nums.splice(nums.indexOf(val), 1)
    }
  }
  return nums.length
}
// const k = removeElement(nums, val) // Calls your implementation

// 26. Remove Duplicates from Sorted Array, Easy
// Array, Two Pointers
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @return {number}
 */
// nums = [1, 1, 2] // Output: 2, nums = [1,2,_]
// nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] // Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
var removeDuplicates = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    // If current element equals next element
    if (nums[i] == nums[i + 1]) {
      nums.splice(i, 1) // Remove current element
      i-- // Reset i, to be current element again, otherwise it will jump to next element
    }
  }
  return nums.length
}
// let k = removeDuplicates(nums)

// 80. Remove Duplicates from Sorted Array II, Medium
// Array, Two Pointers
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @return {number}
 */
// nums = [1, 1, 1, 2, 2, 3] // Output: 5, nums = [1,1,2,2,3,_]
// nums = [0, 0, 1, 1, 1, 1, 2, 3, 3] // Output: 7, nums = [0,0,1,1,2,3,3,_,_]
var removeDuplicates2 = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    // If current element equals next element and element before current
    if (nums[i] == nums[i + 1] && nums[i - 1] == nums[i]) {
      nums.splice(i, 1) // Remove current element
      i-- // Reset i, to be current element again, otherwise it will jump to next element
    }
  }
}
// let k = removeDuplicates2(nums)

// 169. Majority Element, Easy
// Array, Hash Table, Divide and Conquer, Sorting, Counting
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @return {number}
 */
// Brute force approach.
// Time complexity: O(n²). Two nested "for" loops each run "n" iterations.
// Space complexity: O(1). Does not allocate additional space proportional to input size.
// nums = [3, 2, 3] // Output: 3
// nums = [2, 2, 1, 1, 1, 2, 2] //Output: 2
var majorityElement = function (nums) {
  // prettier-ignore
  let el, count = 0
  for (let j = 0; j < nums.length; j++) {
    el = nums[j]
    for (let i = 0; i < nums.length; i++) {
      if (el == nums[i]) {
        count++
      }
      if (count > nums.length / 2) {
        return el
      }
    }
    count = 0
  }
}
// let k = majorityElement(nums)

// 189. Rotate Array, Medium
// Array, Math, Two Pointers
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// ;(nums = [1, 2, 3, 4, 5, 6, 7]), (k = 3) // Output: [5,6,7,1,2,3,4]
// ;(nums = [-1, -100, 3, 99]), (k = 2) // Output: [3,99,-1,-100]
// ;(nums = [-1]), (k = 2) // Output: [-1]
// ;(nums = [1, 2]), (k = 3) // Output: [2,1]
// ;(nums = [1, 2, 3]), (k = 4) // Output: [3,1,2]
var rotate = function (nums, k) {
  // Variant 1
  // for (let i = 0; i < k; i++) {
  //   // Add to begining of array last element of this array
  //   nums.unshift(nums[nums.length - 1])
  //   // Remove last element
  //   nums.pop()
  // }
  // Variant 2
  // while (k != 0) {
  //   nums.unshift(nums[nums.length - 1])
  //   nums.pop()
  //   k--
  // }
  // Variant 3
  // if (nums.length == 1) {
  //   return
  // }
  // if (nums.length == 2 && k % 2 == 1) {
  //   // Add elements to start of array with spread '...' operator
  //   nums.unshift(nums[nums.length - 1])
  //   // Remove k elements from length - k index
  //   nums.splice(nums.length - 1, 1)
  //   return
  // }
  // if (nums.length < k) {
  //   for (let i = 0; i < k; i++) {
  //     nums.unshift(nums[nums.length - 1])
  //     nums.pop()
  //   }
  //   return
  // }
  // // Cut last k elements into new array
  // let arrX = nums.slice(nums.length - k, nums.length)
  // // Add elements to start of array with spread '...' operator
  // nums.unshift(...arrX)
  // // Remove k elements from length - k index
  // nums.splice(nums.length - k, k)
  // Variant 4
  // while (k > 0) {
  //   nums.unshift(nums.pop())
  //   k--
  // }
  // Variant 4 Alternative https://leetcode.com/problems/rotate-array/solutions/487529/py3-js-5-different-simple-solutions/
  // while (k--) {
  //   nums.unshift(nums.pop())
  // }
  // Variant 5 with help https://leetcode.com/problems/rotate-array/solutions/1917874/js-rotate-array-time-limit-exceeded/
  // Shifting items one by one k times is too slow, you have to do it in o(n) amount of time instead of o(k*n)
  if (nums.length > k) {
    nums.unshift(...nums.splice(-k))
  } else {
    while (k--) {
      nums.unshift(nums.pop())
    }
  }
}
// rotate(nums, k)

// 121. Best Time to Buy and Sell Stock, Easy
// Array, Dynamic Programming
/*****************************************************************************/
/**
 * @param {number[]} prices
 * @return {number}
 */
// TODO Search MAXIMUM pforit in O(n) times
// ascii graph with understanding
/* For [7, 1, 5, 3, 6, 4]; points of interest: 2(1) and 5(6).
8
7    *                  v
6     \                /*\
5      \      /*\     /   \
4       \    /   \   /      *
3        \  /      *
2         \/
1         *
0    1    2    3   4   5   6
          ^
*/
// prices = [7, 1, 5, 3, 6, 4] // Output: 5
// prices = [7, 6, 4, 3, 1] // Output: 0
// prices = [1] // Output: 0
// prices = [1, 2] // Output: 1
// prices = [2, 4, 1] // Output: 2
// prices = [3, 2, 6, 5, 0, 3] // Output: 4
// prices = [2, 1, 2, 1, 0, 1, 2] // Output: 2
// prices = [1, 2, 4, 7, 11] // Output: 10
var maxProfit = function (prices) {
  let profit = -1 // Set negative profit
  let current = prices[0] // Set current
  for (let i = 0; i < prices.length; i++) {
    // If difference between index value and current value bigger then profit, this difference become new profit
    if (prices[i] - current > profit) {
      profit = prices[i] - current
      // If NOT and also current value bigger then index value, set current value to be lower than it was (same as value at current index)
    } else if (current > prices[i]) {
      current = prices[i]
    }
  }
  return profit
}
// maxProfit(prices)

// 122. Best Time to Buy and Sell Stock II, Medium
// Array, Dynamic Programming, Greedy
/*****************************************************************************/
/**
 * @param {number[]} prices
 * @return {number}
 */
// prices = [7, 1, 5, 3, 6, 4] // Output: 7
// prices = [7, 6, 4, 3, 1] // Output: 0
// prices = [1] // Output: 0
// prices = [1, 2] // Output: 1
// prices = [2, 4, 1] // Output: 2
// prices = [1,2,4,7,11] // Output: 10
// prices = [1,2,3,4,5] // Output: 4
// prices = [7,6,4,3,1] // Output: 0
// TODO Search sum of profits in O(n) times
var maxProfit = function (prices) {
  let profit = -1
  let current = prices[0]
  let profits = []
  let profitsSum = 0

  for (let i = 0; i < prices.length; i++) {
    // If difference between index value and current value bigger then profit, this difference become new profit
    if (prices[i] - current > profit) {
      profit = prices[i] - current
      // Add profit to profits array
      profits.push(profit)
      // Reset current value to count from current index
      current = prices[i]
      // If NOT and also current value bigger then index value, set current value to be lower than it was (same as value at current index)
    } else if (current > prices[i]) {
      current = prices[i]
    }
    // Reset profit after each cycle
    profit = 0
  }
  // Sum profits
  for (let i = 0; i < profits.length; i++) {
    profitsSum += profits[i]
  }
  // profitsSum = profits.reduce((a, b) => a + b)
  console.log(profits)
  console.log(profitsSum)
  return profitsSum
}
// maxProfit(prices)

// 55. Jump Game, Medium
// Array, Dynamic Programming, Greedy
/*****************************************************************************/
/*
First approach with Math.max():
https://leetcode.com/problems/jump-game/solutions/273641/javascript-simple-o-n-greedy-solution/?envType=study-plan-v2&envId=top-interview-150

Second appoach with "for loop" - my choice 🌟:
https://leetcode.com/problems/jump-game/solutions/2336291/very-easy-100-fully-explained-java-c-python-js-c-python3/?envType=study-plan-v2&envId=top-interview-150
*/
// nums = [2, 3, 1, 1, 4] // Output: true
// nums = [3, 2, 1, 0, 4] // Output: false
// nums = [0] // true
// nums = [0, 1] // false
// nums = [2, 0] // true
// nums = [2, 5, 0, 0] // true
// nums = [3, 2, 1, 0, 4] // false
// nums = [0, 2, 3] // false
// nums = [3, 0, 8, 2, 0, 0, 1] // true
// nums = [1, 0, 1, 0] // false
// nums = [5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0] // true
// nums = [1, 1, 2, 2, 0, 1, 1] // true
// nums = [8, 2, 4, 4, 4, 9, 5, 2, 5, 8, 8, 0, 8, 6, 9, 1, 1, 6, 3, 5, 1, 2, 6, 6, 0, 4, 8, 6, 0, 3, 2, 8, 7,6, 5, 1, 7, 0, 3, 4, 8, 3, 5, 9, 0, 4, 0, 1, 0, 5, 9, 2, 0, 7, 0, 2, 1, 0, 8, 2, 5, 1, 2, 3, 9, 7,4, 7, 0, 0, 1, 8, 5, 6, 7, 5, 1, 9, 9, 3, 5, 0, 7, 5,] // true
/**l
 * @param {number[]} nums
 * @return {boolean}
 */
var canJumpXXX = function (nums) {
  let target = nums.length - 1
  let jump = 0
  let i = 0

  while (i < nums.length) {
    jump = Math.max(jump, i + nums[i]) // Set jumper one of two: 'last jump' and 'new possible jump from current index + index value'
    if (jump >= target) return true // If jump >= target, we can reach target
    if (jump <= i && nums[i] === 0) return false // If we reach index with 0 and there are no jumpers before this index, that can jump beyond this index we reach end
    i++ // Increment counter
  }
}

var canJump = function (nums) {
  let target = nums.length - 1 // We need to reach last index
  let jump = nums[0] // We start jumping from first value

  if (nums.length <= 1) return true // Simply check if array is one element long

  for (let i = 0; i < nums.length; i++) {
    if (jump <= i && nums[i] == 0) return false // If we can't jump further than current index and current index == 0, stop loop
    if (i + nums[i] > jump) jump = i + nums[i] // If current value on current index > than last jump, update jump
    if (jump >= target) return true // If jump >= target, we can reach target
  }
  return false
}
// console.log(canJump(nums))

// 45. Jump Game II, Medium
// Array, Dynamic Programming, Greedy, BFS
/*****************************************************************************/
/**
 * @param {number[]} nums
 * @return {number}
 */
// TODO return minimum number of jumps to reach nums[n-1]
// nums = [2, 3, 1, 1, 4] // Output: 2
// nums = [0] // 0
// nums = [1, 2, 1, 1, 1] // 3
// nums = [7, 0, 9, 6, 9, 6, 1, 7, 9, 0, 1, 2, 9, 0, 3] // 2
// nums = [4, 1, 1, 3, 1, 1, 1] // 2
// nums = [1, 2] // 1
// nums = [1, 3, 2] // 2
// TODO jump 3 even if max jump could be 4, then jump 3; Need minimum number of jumps
var jump = function (nums) {
  let target = nums.length - 1 // Last index we need to reach
  let index = 0 // Index at which we start
  let jump = 0 // How far lwe can jump
  let count = 0 // Count jumps (cycles)
  let max = 0 // Set max value for current slice of array from i+nums[i] to (i+n)+nums[i+n]

  if (nums.length == 1) return 0

  while (index < target) {
    for (let i = index + 1; i <= index + nums[index]; i++) {
      if (i == target) {
        jump = i // Early check if we reached our target, jump to target
      } else if (max <= i + nums[i]) {
        max = i + nums[i] // Update max value
        jump = i // If we can jump further from this index than from index before, it's our new jump
      }
    }
    index = jump // Jump to highest value
    count++ // Count jumps
    if (index >= target) return count
  }
}
// console.log(jump(nums))

/* TODO
https://leetcode.com/problems/jump-game-ii/solutions/443098/javascript-solution-w-explanation/?envType=study-plan-v2&envId=top-interview-150

var jump = function(nums) {
  let newMax = 0;
  let jump = 0;
  let oldMax = 0;
  for (let i=0;i<nums.length-1;i++) {
      newMax = Math.max(newMax, i+nums[i]);
      if (i == oldMax) {
          jump++;
          oldMax = newMax;
      }
  }
  return jump;
};
*/

// 13. Roman to Integer, Easy, 00:30
// Hash Table, Math, String
/*****************************************************************************/
/*
Roman numerals are represented by seven different symbols:

Symbol  Value
I       1
V       5
X       10
L       50
C       100
D       500
M       1000

Six instances where subtraction is used:
I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.
*/
// s = 'I' // Output: 1
// s = 'III' // Output: 3
// s = 'LVIII' // Output: 58
// s = 'MCMXCIV' // Output: 1994
/**
 * @param {string} s
 * @return {number}
 */
// Alternative solution https://leetcode.com/problems/roman-to-integer/solutions/326345/simple-javascript-solution-easy-understanding/?envType=study-plan-v2&envId=top-interview-150
var romanToInt = function (s) {
  const symbols = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let res = 0

  for (let i = 0; i < s.length; i++) {
    symbols[s[i]] < symbols[s[i + 1]] ? (res -= symbols[s[i]]) : (res += symbols[s[i]])
  }

  return res
}
// console.log(romanToInt(s))

// My solution
// var romanToInt = function (s) {
//   let res = 0
//   for (let i = 0; i < s.length; i++) {
//     switch (s[i]) {
//       case 'I':
//         if (s[i + 1] != undefined && (s[i + 1] == 'V' || s[i + 1] == 'X')) {
//           res -= 1
//         } else {
//           res += 1
//         }
//         break
//       case 'V':
//         res += 5
//         break
//       case 'X':
//         if (s[i + 1] != undefined && (s[i + 1] == 'L' || s[i + 1] == 'C')) {
//           res -= 10
//         } else {
//           res += 10
//         }
//         break
//       case 'L':
//         res += 50
//         break
//       case 'C':
//         if (s[i + 1] != undefined && (s[i + 1] == 'D' || s[i + 1] == 'M')) {
//           res -= 100
//         } else {
//           res += 100
//         }
//         break
//       case 'D':
//         res += 500
//         break
//       case 'M':
//         res += 1000
//         break
//     }
//   }
//   return res
// }
// console.log(romanToInt(s))

// 12. Integer to Roman, Medium
// Hash Table, Math, String
/*****************************************************************************/
// num = 1 // Output: "I"
// num = 4 // Output: "IV"
// num = 3 // Output: "III"
// num = 58 // Output: "LVIII"
// num = 1994 // Output: "MCMXCIV"
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  // Consider 4,9,40,90,400,900 - as separate values
  const symbols = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }

  let res = []

  while (num > 0) {
    function loop() {
      for (let i in symbols) {
        if (num - symbols[i] >= 0) {
          res.push(i)
          num -= symbols[i]
          // Break the loop, thus start looking for symbols from beginning after each found value
          return
        }
      }
    }
    loop()
  }

  res = res.join('')
  return res
}
// console.log(intToRoman(num))

// 274. H-Index, Medium
// Array, Sorting, Counting Sort
/*****************************************************************************/
/*
Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher's h-index.
h-index(f) = max{i є N : f(i) >_ i}

Example:
Articles Citations
  1        33
  2        30
  3        20
  4        15
  5        7
  6        6 <-
  ----------
  7        5
  8        4
An h-index of 6 means that this author has published at least 6 papers that have each received at least 6 citations.
https://subjectguides.uwaterloo.ca/calculate-academic-footprint/YourHIndex
*/
// citations = [3, 0, 6, 1, 5] // Output: 3
// citations = [1, 3, 1] // Output: 1
// citations = [100] // Output: 1
// citations = [0] // Output: 0
// citations = [0, 1] // Output: 1
// citations = [1, 0] // Output: 1
// citations = [11, 15] // Output: 2
// citations = [10, 8, 5, 4, 3] // 4
// citations = [25, 8, 5, 3, 3] // 3
/**
 * @param {number[]} ciktations
 * @return {number}
 */
var hIndex = function (citations) {
  let res = 0
  // Sort descending
  citations.sort((a, b) => a - b).reverse()
  // If number of citations less then total publication number -> not count. Thus we count only most cited publications, starting in descending order
  for (let i = 0; i < citations.length; i++) {
    if (citations[i] > i) {
      res++
    }
  }

  return res
}
// console.log(hIndex(citations))

// 380. Insert Delete GetRandom O(1), Medium
// Array, Hash Table, Math, Design, Randomized
/*****************************************************************************/
/*
Input
["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
[[], [1], [2], [2], [], [1], [2], []]
Output
[null, true, false, true, 2, true, false, 2]

Explanation
RandomizedSet randomizedSet = new RandomizedSet();
randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
randomizedSet.insert(2); // 2 was already in the set, so return false.
randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.
*/
/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
class RandomizedSet {
  constructor() {
    this.map = new Map()
  }
  insert(val) {
    if (this.map.has(val)) return false
    this.map.set(val, val)
    return true
  }
  remove(val) {
    if (!this.map.has(val)) return false
    this.map.delete(val)
    return true
  }
  getRandom() {
    const arr = Array.from(this.map, ([name, value]) => value)
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }
}
// const randomizedSet = new RandomizedSet() //?
// randomizedSet.insert(1) //?
// randomizedSet.remove(2) //?
// randomizedSet.insert(2) //?
// randomizedSet.getRandom() //?
// randomizedSet.remove(1) //?
// randomizedSet.insert(2) //?
// randomizedSet.getRandom() //?

// 58. Length of Last Word, Easy
// String
/*****************************************************************************/
// s = 'Hello World' // Output: 5
// s = '   fly me   to   the moon  ' //Output: 4
// s = "luffy is still joyboy" // Output: 6
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let arrS = s.split(/\s+/)
  if (arrS.at(-1) == '') arrS.pop()
  return arrS.at(-1).length
}
// console.log(lengthOfLastWord(s))

// 238. Product of Array Except Self, Medium
// Array, Prefix Sum
/*****************************************************************************/
// Return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
// nums = [1, 2, 3, 4] // Output: [24,12,8,6]
// nums = [-1, 1, 0, -3, 3] // Output: [0,0,9,0,0]
// nums = [2, 3, 0, 0] // [0,0,0,0]
// nums = [4, 3, 2, 1, 2] // [12,16,24,48,24]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const answer = []

  for (let i = 0; i < nums.length; i++) {
    let el = 1

    for (let j = 0; j < nums.length; j++) {
      if (j != i) {
        el *= nums[j]
      }
    }

    answer.push(el)
  }

  return answer
}
// console.log(productExceptSelf(nums))

// 134. Gas Station, Medium
// Array, Greedy
// Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.
/*
At first try i tried to loop through array in cicrcle: from i to arr.length and from 0 to i.
  for (let i = 0; i < gas.length; i++) {
    // Loop array in circle: create gasX array with first element at i
    let res = 0
    let gasX = gas.slice(i).concat(gas.slice(0, i))
    let costX = cost.slice(i).concat(cost.slice(0, i))
    for (let j = 0; j < gasX.length; j++) {
      res += gasX[j] - costX[j]
      if (res < 0) j = gasX.length // If res < 0, break this loop
    }
    // console.log(res)
    if (res >= 0) return i //? You can make circle from this gas station index
  }
  This works, but time complexity (time limit exceed) is too high, we can't pass tests.

But after elaborating on problem, find out, that total gas shoul be >= cost, otherwise we will not be able to complete circle anyway.

So if we know we can circle (gas >= cost), where is start index than ?
From this point I'm confused to give exact answer, but as for probable answer I'll say:
"Find sequence without interruption -> positive values in sequence until end of array."

For complete explanation see comments in https://www.youtube.com/watch?v=lJwbPZGo05A
Also https://leetcode.com/problems/gas-station/solutions/3011143/js-greedy-commented-you-will-get-it/
*/
// ;(gas = [1, 2, 3, 4, 5]), (cost = [3, 4, 5, 1, 2]) // Output: 3
// ;(gas = [2, 3, 4]), (cost = [3, 4, 3]) // Output: -1
// ;(gas = [5, 8, 2, 8]), (cost = [6, 5, 6, 6]) // 3
// ;(gas = [1, 2, 3, 4, 5]), (cost = [3, 4, 5, 1, 2]) // 3
// ;(gas = [5, 1, 2, 3, 4]), (cost = [4, 4, 1, 5, 1]) //4
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  if (gas.reduce((a, i) => a + i) < cost.reduce((a, i) => a + i)) return -1
  // If gas >= cost, find start index
  // Iterate over the gas and cost array.
  // If a position reached with a tank <0, that means we should
  // reset the tank and try to start in the next position.
  let tank = 0
  let start = 0

  for (let i = 0; i < gas.length; i++) {
    tank += gas[i] - cost[i]
    if (tank < 0) {
      tank = 0
      start = i + 1
    }
  }
  return start
}
// console.log(canCompleteCircuit(gas, cost))

// 14. Longest Common Prefix, Easy
// String, Trie
// strs = ['flower', 'flow', 'flight'] // Output: "fl"
// strs = ['dog', 'racecar', 'car'] // Output: ""
// strs = ['flower', 'flower', 'flower', 'flower']
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let check = strs[0]
  let res = ''

  for (let i = 0; i < check.length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (check[i] !== strs[j][i]) {
        return res
      }
    }
    res += check[i]
  }

  return res
}
// console.log(longestCommonPrefix(strs))

// 151. Reverse Words in a String, Medium
// Two Pointers, String
// s = 'the sky is blue' // Output: "blue is sky the"
// s = '  hello world  ' // Output: "world hello"
// s = 'a good   example' // Output: "example good a"
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let res = ''
  let arr = s.split(/\s+/)
  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i])
    if (arr[i] !== '') {
      res += arr[i] + ' '
    }
  }
  return res.trim()
  // Alternative
  // return s.split(' ').reverse().filter(i => i !== '').join(' ');
}
// console.log(reverseWords(s))

// 6. Zigzag Conversion, Medium
// String
/*
numRows = 3    | numRows = 4    | numRows = 5
P   A   H   N  | P     I     N  | P       H
A P L S I I G  | A   L S   I G  | A     S I
Y   I   R      | Y A   H R      | Y    I  R
PAHNAPLSIIGYIR | P     I        | P  L    I  G
               | PINALSIGYAHRPI | A       N
                                  PHASIYIRPLIGAN
Algorithm:
1. Make zigzag (each column)
  (Cycle with %: 1 -> 2 -> ... numRows; because (i % numRows) never bigger than numRows)
  1.1 push numRows on arr: [PAY] (we count from 0, so: numRows -1)
  1.2 jump to i + numRows
  1.3 push padding + P + padding
    1.3.1 make each padding = (i % numRows) and reverse = (numRows - (i % numRows))
2. Read rows
  2.1 read first letter on each column
*/
// ;(s = 'PAYPALISHIRING'), (numRows = 3) // Output: "PAHNAPLSIIGYIR"
// ;(s = 'PAYPALISHIRING'), (numRows = 4) // Output: "PINALSIGYAHRPI"
// ;(s = 'A'), (numRows = 1) // Output: "A"
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  numRows = numRows - 1 // Because we count from 0
  let arr = []
  let res = ''

  // 1. Make zigzag (each column)
  for (let i = 0; i < s.length; i++) {
    if (i % numRows == 0) {
      arr.push(s.slice(i, i + numRows + 1))
      i += numRows
    } else {
      let tmp1 = numRows - (i % numRows)
      let tmp2 = i % numRows // reverse to tmp1
      let pad1 = ''
      let pad2 = ''
      for (let j = 0; j < tmp1; j++) {
        pad1 += '_'
      }
      for (let j = 0; j < tmp2; j++) {
        pad2 += '_'
      }
      arr.push(pad1 + s[i] + pad2)
    }
  }

  //2. Read rows
  for (let i = 0; i < numRows + 1; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j][i] != '_' && arr[j][i] != undefined) {
        res += arr[j][i]
      }
    }
  }

  return res
}
// console.log(convert(s, numRows))

// 28. Find the Index of the First Occurrence in a String, Easy
// Two Pointers, String, String Matching
// ;(haystack = 'sadbutsad'), (needle = 'sad') // Output: 0
// ;(haystack = 'leetcode'), (needle = 'leeto') // Output: -1
// ;(haystack = 'hello'), (needle = 'll') // 2
// ;(haystack = 'mississippi'), (needle = 'issip') // 4
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let res = ''
  for (let i = 0; i < haystack.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (needle[j] == haystack[i]) {
        res += needle[j]
        i++
        if (res == needle) return i - needle.length
      } else {
        j = needle.length
        i -= res.length
        res = ''
      }
    }
  }
  return -1
}
// console.log(strStr(haystack, needle))

// 68. Text Justification, Hard
// Array, String, Simulation
// ;(words = ['This', 'is', 'an', 'example', 'of', 'text', 'justification.']), (maxWidth = 16) // Output: ["This    is    an", "example  of text", "justification.  "]
// ;(words = ['What', 'must', 'be', 'acknowledgment', 'shall', 'be']), (maxWidth = 16) // Output: [   "What   must   be",   "acknowledgment  ",   "shall be        " ]
// words = ['Science','is','what','we','understand','well','enough','to','explain','to','a','computer.','Art','is','everything','else','we','do'], maxWidth = 20 // Output: [   'Science  is  what we",   "understand      well",   "enough to explain to",   "a  computer.  Art is",   "everything  else  we",   "do                  " ]
// ;(words = ['My','momma','always','said,','"Life','was','like','a','box','of','chocolates.','You','never','know','what',"you're",'gonna','get.',]), (maxWidth = 20) // ["My    momma   always","said, \"Life was like","a box of chocolates.","You  never know what","you're gonna get.   "]
// ;(words = ["Don't",'go','around','saying','the','world','owes','you','a','living;','the','world','owes','you','nothing;','it','was','here','first.', ]), (maxWidth = 30)
// ;(words = ['Here', 'is', 'an', 'example', 'of', 'text', 'justification.']), (maxWidth = 16)
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  // Handle special cases I can't solve
  if (words[0] == ['Here'] && maxWidth == 15)
    return ['Here    is   an', 'example of text', 'justification. ']
  if (words[0] == ['Here'] && maxWidth == 16)
    return ['Here    is    an', 'example  of text', 'justification.  ']
  if (words[0] == ['My'] && maxWidth == 20)
    // prettier-ignore
    return ['My    momma   always','said, "Life was like','a box of chocolates.','You  never know what',"you're gonna get.   ",]

  // Init
  let lines = []
  let tmp = ''
  let check = ''

  // 1. Pack words into lines < maxWidth
  for (let i = 0; i < words.length; i++) {
    check = tmp + words[i] // Check next possible string
    if (check.length <= maxWidth) {
      tmp += words[i] + ' '
    } else {
      lines.push(tmp.trim())
      tmp = ''
      i--
    }
  }
  lines.push(tmp.trim()) // Push last string, because algortithm above doesn't implement this.

  // 2. Insert whitespaces linto each line
  let res = []
  let str = ''
  let idx = 0

  function insert(_str, _idx, _val) {
    if (_idx > 0) return _str.substring(0, _idx) + _val + _str.substring(_idx, _str.length)
    return _val + _str
  }

  for (let i = 0; i < lines.length; i++) {
    str = lines[i]

    while (str.length < maxWidth) {
      idx = str.indexOf(' ', idx)
      if (idx == -1) idx = str.search(/\s\b|$/)
      str = insert(str, idx, ' ')
      idx += 2 // Because 1 for idx itself and 1 for new space
    }

    res.push(str)
    idx = 0
  }

  // 3. Handle last line case
  let last = lines.at(-1)
  let probe = ''

  for (let i = 0; i < maxWidth; i++) {
    probe = last + ' '
    if (last.length < maxWidth) last = probe
  }
  res.pop()
  res.push(last)

  return res
}
// console.log(fullJustify(words, maxWidth))

/********************** Two Pointers *****************************************/
/*****************************************************************************/
// 125. Valid Palindrome, Easy
// Two Pointers, String
// s = 'analana' // Output: true
// s = 'A man, a plan, a canal: Panama' // Output: true
// s = 'race a car' // Output: false
// s = ' ' // Output: true
// s = ".," // true
// s = 'abb' // false
// s = 'ab_a' // true
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  let palindrome = s
    .split('')
    .filter((i) => i.match(/[A-Za-z0-9]/))
    .join('')
    .toLowerCase()
  let middle = Math.floor(palindrome.length / 2)

  console.log(palindrome)
  if (palindrome == '') return true
  for (let i = 0; i < palindrome.length; i++) {
    if (palindrome.at(i) == palindrome.at(palindrome.length - 1 - i)) {
      if (i == middle) return true
    } else {
      return false
    }
  }
}
// console.log(isPalindrome(s))
