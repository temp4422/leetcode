/*

  MY HELPER FUNCTIONS START

*/
// Simple test framework for faster iteration
let testFunction // function placeholder to use inside 'input' function
const input = (inputValue, ...args) => {
  // Accept other multiple arguments with '...args'
  functionOutput = testFunction(inputValue, ...args) // set function result
  return {
    output(outputValue) {
      // Can NOT check equality for object types: [1,2,3] !== [1,2,3]
      if (functionOutput !== outputValue) return false
      if (functionOutput === outputValue) return true
    },
  }
}

// Array to Linked list converter. JS doesn't have many use cases because natively implemented ways of handling collections https://www.raulmelo.me/en/blog/data-structure-with-javascript-linked-list
// From array [1, 2, 3] to linked list with nodes: {val: 1, next: {val: 2, next: {val: 3, next: null}}}
function arrayToList(arr) {
  let list = null
  for (let i = arr.length - 1; i >= 0; i--) {
    list = {
      val: arr[i],
      next: list, // Insert current list inside list
    }
  }
  return list
  /**
   * LeetCode Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
}
/*

  MY HELPER FUNCTIONS END

*/

/*###########################################################################*/
/*#################### TOP INTERVIEW 150  ###################################*/
/*###########################################################################*/

/******************** Array / String *****************************************/
/*****************************************************************************/

// # 88. Merge Sorted Array, Easy
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

// # 27. Remove Element, Easy
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

// # 26. Remove Duplicates from Sorted Array, Easy
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

// # 80. Remove Duplicates from Sorted Array II, Medium
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

// # 169. Majority Element, Easy
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

// # 189. Rotate Array, Medium
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

// # 121. Best Time to Buy and Sell Stock, Easy
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

// # 122. Best Time to Buy and Sell Stock II, Medium
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

// # 55. Jump Game, Medium
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

// # 45. Jump Game II, Medium
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
/* Check
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

// # 274. H-Index, Medium
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

// # 380. Insert Delete GetRandom O(1), Medium
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

// # 238. Product of Array Except Self, Medium
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

// TODO
// 135. Candy, Hard
// Array, Greedy

// TODO
// 42. Trapping Rain Water, Hard
// Array, Two Pointers, Dynamic Programming, Stack, Monotonic Stack

// # 13. Roman to Integer, Easy, 00:30
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

// # 12. Integer to Roman, Medium
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

// # 58. Length of Last Word, Easy
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

// # 151. Reverse Words in a String, Medium
// Two Pointers, String
/*****************************************************************************/
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

// # 6. Zigzag Conversion, Medium
// String
/*****************************************************************************/
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

// # 28. Find the Index of the First Occurrence in a String, Easy
// Two Pointers, String, String Matching
/*****************************************************************************/
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

// # 68. Text Justification, Hard
// Array, String, Simulation
/*****************************************************************************/
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
// # 125. Valid Palindrome, Easy
// Two Pointers, String
/*****************************************************************************/
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

// # 392. Is Subsequence, Easy
// Two Pointers, String, Dynamic Programming
/*****************************************************************************/
// ;(s = 'abc'), (t = 'ahbgdc') // Output: true
// ;(s = 'axc'), (t = 'ahbgdc') // Output: false
// ;(s = ''), (t = '') // true
// ;(s = 'abc'), (t = '') // false
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  if (t.length == 0 && s.length == 0) return true
  let j = 0 // 's' pointer
  for (let i = 0; i < t.length; i++) {
    if (s[j] == t[i]) j++
    if (j == s.length) return true
  }
  return false
}
// console.log(isSubsequence(s, t))

// # 167. Two Sum II - Input Array Is Sorted, Medium
// Array, Two Pointers, Binary Search
/*****************************************************************************/
// ;(numbers = [2, 7, 11, 15]), (target = 9) // Output: [1,2]
// ;(numbers = [2, 3, 4]), (target = 6) // Output: [1,3]
// ;(numbers = [-1, 0]), (target = -1) // Output: [1,2]
// ;(numbers = [0, 0, 3, 4]), (target = 0) // [1,2]
// ;(numbers = [5, 25, 75]), (target = 100) // [2,3]
// ;(numbers = [1, 2, 3, 4, 4, 9, 56, 90]), (target = 8) // [4,5]
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[j] + numbers[i] == target) {
        return [i + 1, j + 1]
      }
    }
  }
}
// console.log(twoSum(numbers, target))

// # 11. Container With Most Water, Medium
// Array, Two Pointers, Greedy
/*****************************************************************************/
// height = [1, 8, 6, 2, 5, 4, 8, 3, 7] // Output: 49
// height = [1, 1] // Output: 1
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let result = 0
  let i = 0 // left pointer
  let j = height.length - 1 // right pointer
  let area, length, width // length * width

  while (i < j) {
    length = Math.min(height[i], height[j])
    width = j - i
    area = length * width
    result = Math.max(result, area)

    if (height[i] <= height[j]) i++
    else j--
  }
  return result
}
// console.log(maxArea(height))

// # 15. 3Sum, Medium
// Array Two Pointers Sorting
/*****************************************************************************/
// nums = [-1, 0, 1, 2, -1, -4] // Output: [[-1,-1,2],[-1,0,1]]
// nums = [0, 1, 1] // Output: []
// nums = [0, 0, 0] // Output: [[0,0,0]]
// nums = [0, 0, 0, 0] // Output: [[0,0,0]]
// nums = [0, 1, 1] // []
// nums = [-2, 0, 1, 1, 2] // [[-2,0,2],[-2,1,1]]
// nums = [-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6] // [[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]
// nums = [-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4] // [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const target = 0
  const result = []
  let sum
  let triplet

  if (nums.length < 3) return result
  nums.sort((a, b) => a - b)

  // Make 3 pointers move and check if triple == sum, if so -> push result, if duplicate -> skip
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > target) break // No need to go past target

    /*
      Remove duplicates logic
      If 'i>0' important -> skip nums[i] at position 0 (first element).
      Same logic for j and k, but there could be multiple dups, so we use while loop to cycle through them.
    */
    // Remove dup start
    if (i > 0 && nums[i] == nums[i - 1]) continue
    // Remove dup end

    let j = i + 1
    let k = nums.length - 1

    while (j < k) {
      sum = nums[i] + nums[j] + nums[k]
      triplet = [nums[i], nums[j], nums[k]]

      if (sum == target) {
        result.push(triplet)

        //Remove dup start
        while (nums[j] == nums[j + 1]) j++
        while (nums[k] == nums[k - 1]) k--
        // Remove dup end

        j++
        k--
      }
      if (sum < target) j++
      if (sum > target) k--
    }
  }

  return result
}
// console.log(threeSum(nums))

/********************** Sliding Window ***************************************/
/*****************************************************************************/
// # 209. Minimum Size Subarray Sum, Medium
// Array, Binary Search, Sliding Window, Prefix Sum
/*****************************************************************************/
// With help of https://leetcode.com/problems/minimum-size-subarray-sum/solutions/3732658/o-n-t-c-optimized-js-sol-explained-with-intuition-approach/?envType=study-plan-v2&envId=top-interview-150
// ;(target = 7), (nums = [2, 3, 1, 2, 4, 3]) // Output: 2 i.e. [4, 3]
// ;(target = 4), (nums = [1, 4, 4]) // Output: 1
// ;(target = 11), (nums = [1, 1, 1, 1, 1, 1, 1, 1]) // Output: 0
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let minLength = Infinity // Initialize the minimum length as positive infinity
  let sum = 0 // Variable to track the current sum
  let left = 0 // Pointer for the left end of the subarray

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right] // Add the current element to the sum

    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1) // Update the minimum length
      sum -= nums[left] // Remove the leftmost element from the sum
      left++ // Move the left pointer to the right
    }
  }
  return minLength === Infinity ? 0 : minLength // Return 0 if no subarray is found
}
// console.log(minSubArrayLen(target, nums))

// # 3. Longest Substring Without Repeating Characters, Medium
// Hash Table, String, Sliding Window
/*****************************************************************************/
// s = 'abcabcbb' // Output: 3
// s = 'bbbbb' // Output: 1
// s = 'pwwkew' // Output: 3
// s = 'dvdf' // 3
// s = 'ohvhjdml' // 6
// s = 'anviaj' // 5
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let max = 0
  let arr = []

  for (let i = 0; i < s.length; i++) {
    if (arr.includes(s[i])) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] != s[i]) {
          arr.shift()
          j -= 1 // Reset, loop arr from beginning
        } else {
          arr.shift()
          break
        }
      }
    }
    arr.push(s[i])
    if (arr.length > max) max = arr.length
  }
  return max
}
// console.log(lengthOfLongestSubstring(s))

// # 30. Substring with Concatenation of All Words, Hard
// Hash Table, String, Sliding Window
/*****************************************************************************/

// # 76. Minimum Window Substring, Hard
// Hash Table, String, Sliding Window
/*****************************************************************************/

/********************** Matrix ***********************************************/
/*****************************************************************************/
// # 36. Valid Sudoku, Medium
// Array, Hash Table, Matrix
/*****************************************************************************/

// # 54. Spiral, Medium
// Array, Simulation
/*****************************************************************************/

// # 48. Rotate Image, Medium
// Array, Math
/*****************************************************************************/

// # 73. Set Matrix Zeroes, Medium
// Array, Hash Table
/*****************************************************************************/

// # 289. Game of Life, Medium
// Array, Simulation
/*****************************************************************************/

/********************** Hashmap **********************************************/
/*****************************************************************************/
// 383. Ransom Note, Easy
// Original solution in leetcode.com;
// Here copy from https://leetcode.com/problems/ransom-note/solutions/2136886/javascript-readable/?envType=study-plan-v2&envId=top-interview-150
// Hash Table, String, Counting
// ;(ransomNote = 'a'), (magazine = 'b') // Output: false
// ;(ransomNote = 'aa'), (magazine = 'ab') // Output: false
// ;(ransomNote = 'aa'), (magazine = 'aab') // Output: true
// ;(ransomNote = 'bg'), (magazine = 'efjbdfbdgfjhhaiigfhbaejahgfbbgbjagbddfgdiaigdadhcfcj') // true
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  for (let char of ransomNote) {
    if (magazine.includes(char)) {
      magazine = magazine.replace(char, 0)
    } else {
      return false
    }
  }
  return true
}
// console.log(canConstruct(ransomNote, magazine))

// 205. Isomorphic Strings Easy
// Hash Table String
/*****************************************************************************/
// ;(s = 'egg'), (t = 'add') // true
// ;(s = 'foo'), (t = 'bar') // false
// ;(s = 'paper'), (t = 'title') // true
// ;(s = 'badc'), (t = 'baba') // false
// ;(s = 'egcd'), (t = 'adfd') // false
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  let map = new Map()
  let set = new Set()
  let count = t.length

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) continue
    if (set.has(t[i])) return false
    map.set(s[i], t[i])
    set.add(t[i])
  }

  for (let i = 0; i < s.length; i++) {
    if (t[i] == map.get(s[i])) {
      count--
    }
  }

  return count == 0 ? true : false
}
// console.log(isIsomorphic(s, t))

// 290. Word Pattern, Easy
// Hash Table, String
/*****************************************************************************/
// ;(pattern = 'abba'), (s = 'dog cat cat dog') // true
// ;(pattern = 'abba'), (s = 'dog cat cat fish') // false
// ;(pattern = 'aaaa'), (s = 'dog cat cat dog') // false
// ;(pattern = 'abba'), (s = 'dog dog dog dog') // false
// ;(pattern = 'aaa'), (s = 'aa aa aa aa') // false
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  let map = new Map()
  let set = new Set()
  let count = pattern.length
  let string = s.split(' ')

  if (pattern.length != string.length) return false

  for (let i = 0; i < pattern.length; i++) {
    if (map.has(pattern[i])) continue
    if (set.has(string[i])) return false
    map.set(pattern[i], string[i])
    set.add(string[i])
  }

  for (let i = 0; i < pattern.length; i++) {
    if (string[i] == map.get(pattern[i])) {
      count--
    }
  }

  return count == 0 ? true : false
}
// console.log(wordPattern(pattern, s))

// 242. Valid Anagram, Easy
// Hash Table, String, Sorting
/*****************************************************************************/
// ;(s = 'anagram'), (t = 'nagaram') //  true
// ;(s = 'rat'), (t = 'car') //  false
// ;(s = 'a'), (t = 'ab')
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (t.length > s.length) return false

  let count = s.length
  let j = 0

  s = s.split('').sort()
  t = t.split('').sort()

  for (let i = 0; i < s.length; i++) {
    if (s[i] == t[j]) {
      j++
      count--
    }
  }
  return count == 0 ? true : false
}
// console.log(isAnagram(s, t))

// 49. Group Anagrams, Medium
// Array, Hash Table, String, Sorting
/*****************************************************************************/
// strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'] // Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// strs = [''] // Output: [[""]]
// strs = ['a'] // Output: [["a"]]
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map()
  let result
  let tmp

  for (let i = 0; i < strs.length; i++) {
    tmp = strs[i].split('').sort().join('')

    if (map.has(tmp)) {
      map.set(tmp, [...map.get(tmp), strs[i]])
    } else {
      map.set(tmp, [strs[i]])
    }
  }

  result = [...map.values()]
  return result
}
// console.log(groupAnagrams(strs))

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

// 202. Happy Number, Easy
// Hash Table, Math, Two Pointers
/*****************************************************************************/
// n = 19 //Output: true
// n = 2 //Output: false
// n = 7 // true
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  let res = 0
  let set = new Set()
  if (n == 1) return true

  while (res != 1) {
    n = n.toString().split('')
    for (let i = 0; i < n.length; i++) {
      res += Math.pow(n[i], 2)
    }
    if (res == 1) return true
    if (set.has(res)) return false
    set.add(res)
    n = res
    res = 0
  }
}
// console.log(isHappy(n))

// 219. Contains Duplicate II, Easy
// Array, Hash Table, Sliding Window
/*****************************************************************************/
// ;(nums = [1, 2, 3, 1]), (k = 3) // Output: true
// ;(nums = [1, 0, 1, 1]), (k = 1) // Output: true
// ;(nums = [1, 2, 3, 1, 2, 3]), (k = 2) // Output: false
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  for (let j = 0; j < nums.length; j++) {
    for (let i = j + 1; i < nums.length; i++) {
      if (nums[i] == nums[j] && i - j <= k) {
        return true
      }
    }
  }
  return false
}
// console.log(containsNearbyDuplicate(nums, k))

// 128. Longest Consecutive Sequence, Medium
// Array, Hash Table, Union Find
/*****************************************************************************/
// nums = [100, 4, 200, 1, 3, 2] // Output: 4
// nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] // Output: 9
// nums = [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6] // 7
// nums = [1, 2, 0, 1] // 3
// nums = []
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length == 0) return 0
  let count = 1
  let max = 1

  nums.sort((a, b) => a - b)
  const set = new Set(nums)
  const numsX = Array.from(set)

  for (let i = 1; i < numsX.length; i++) {
    if (numsX[i - 1] + 1 == numsX[i]) {
      count++
      if (count > max) max = count
    } else {
      if (count > max) max = count
      count = 1
    }
  }
  return max
}
// console.log(longestConsecutive(nums))

/********************** Intervals ********************************************/
/*****************************************************************************/

// # 228. Summary Ranges, Easy
// Array
/*****************************************************************************/
// nums = [0, 1, 2, 4, 5, 7] // Output: ["0->2","4->5","7"]
// nums = [0, 2, 3, 4, 6, 8, 9] // Output: ["0","2->4","6","8->9"]
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  if (nums.length == 0) return []

  let tmp = [[nums[0]]]
  let ans = []
  let j = 0

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] == nums[i - 1] + 1) {
      tmp[j].push(nums[i])
    } else {
      tmp.push([])
      j++
      tmp[j].push(nums[i])
    }
  }

  for (let i = 0; i < tmp.length; i++) {
    let lastNum = tmp[i][tmp[i].length - 1]
    if (tmp[i].length > 1) {
      ans.push(`${tmp[i][0]}->${lastNum}`)
    } else {
      ans.push(`${tmp[i][0]}`)
    }
  }

  return ans
}
// console.log(summaryRanges(nums))

// # 56. Merge Intervals, Medium
// Array, Sorting
/*****************************************************************************/
//prettier-ignore
// intervals = [[1,3],[2,6],[8,10],[15,18]] // Output: [[1,6],[8,10],[15,18]]
// prettier-ignore
// intervals = [[1,4],[4,5]] // Output: [[1,5]]
// intervals = [[1,3]] // [[1,3]]
// intervals = [[1,4],[5,6]] // [[1,4],[5,6]]
// intervals = [[1,4],[0,4]] // [[0,4]]
// intervals = [[1,4],[0,1]] // [[0,4]]
// intervals = [[1,4],[0,0]] // [[0,0],[1,4]]
// intervals = [[1,4],[0,2],[3,5]] // [[0,5]]
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length <= 1) return intervals
  const result = []

  // Sort array in place
  const arr = intervals.sort((a, b) => a[0] - b[0])
  let prev = intervals[0]

  for (let i = 1; i < arr.length; i++) {
    let curr = arr[i]
    // If previous interval >= current interval, then replace previous interval with new one
    if (prev[1] >= curr[0]) {
      prev = [prev[0], Math.max(prev[1], curr[1])]
    } else {
      // Push previous interval and go to next interval
      result.push(prev)
      prev = curr
    }
  }
  result.push(prev) // Default push previous interval

  return result
}
// console.log(merge(intervals))
// https://leetcode.com/problems/merge-intervals/solutions/3462073/ex-amazon-explains-a-solution-with-a-video-python-javascript-java-and-c/?envType=study-plan-v2&envId=top-interview-150

// # 57. Insert Interval, Medium
// Array
/*****************************************************************************/
// prettier-ignore
// intervals = [[1,3],[6,9]], newInterval = [2,5] // Output: [[1,5],[6,9]]
// prettier-ignore
// intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8] // Output: [[1,2],[3,10],[12,16]]
// intervals = [], newInterval = [5,7] // [[5,7]]
// intervals = [[1,5]], newInterval = [0,3] // [[0,5]]
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
// Reused code from # 56. Merge Intervals, Medium
var insert = function (intervals, newInterval) {
  const result = []
  const tmp = intervals.concat([newInterval])

  const arr = tmp.sort((a, b) => a[0] - b[0])
  let prev = tmp[0]

  for (let i = 1; i < arr.length; i++) {
    let curr = arr[i]

    if (prev[1] >= curr[0]) {
      prev = [prev[0], Math.max(prev[1], curr[1])]
    } else {
      result.push(prev)
      prev = curr
    }
  }
  result.push(prev)

  return result
}
// console.log(insert(intervals, newInterval))

// # 452. Minimum Number of Arrows to Burst Balloons, Medium
// Array, Greedy, Sorting
/*****************************************************************************/
// prettier-ignore
// points = [[10,16],[2,8],[1,6],[7,12]] // Output: 2
// prettier-ignore
// points = [[1,2],[3,4],[5,6],[7,8]] // Output: 4
// prettier-ignore
// points = [[1,2],[2,3],[3,4],[4,5]] // Output: 2
// prettier-ignore
// points = [[3,9],[7,12],[3,8],[6,8],[9,10],[2,9],[0,9],[3,9],[0,6],[2,8]] // 2
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  const result = []
  // const arr = points.sort((a, b) => a[0] - b[0])
  const arr = points.sort((a, b) => a[1] - b[1])

  let prev = points[0]
  let tmp = points[0]

  for (let i = 1; i < arr.length; i++) {
    let curr = arr[i]

    if (prev[1] >= curr[0]) {
      tmp = [prev[0], curr[1]]
    } else {
      result.push(tmp)
      prev = curr
      tmp = prev
    }
  }
  result.push(tmp)

  return result.length
}
// console.log(findMinArrowShots(points))

/********************** Stack  ***********************************************/
/*****************************************************************************/

// # 20. Valid Parentheses, Easy
// String, Stack
/*****************************************************************************/
// s = '()' // Output: true
// s = '()[]{}' // Output: true
// s = '(]' // Output: false
// s = '(){}}{' // flase
// s = '{[]}' // true
// s = '[' // false
// s = '((' // false
// s = '){' // false
// s = '[[[[[[[[[[[[[[[[[[[' // false
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = []

  for (let i = 0; i < s.length; i++) {
    if (s[i] == '(') {
      stack.push(')')
    } else if (s[i] == '[') {
      stack.push(']')
    } else if (s[i] == '{') {
      stack.push('}')
    } else {
      if (stack.pop() == s[i]) continue
      return false
    }
  }

  return stack.length == 0 ? true : false
}
// console.log(isValid(s))

// # 71. Simplify Path, Medium
// String, Stack
/*****************************************************************************/
// path = '/a/../../b/../c//.///.../..hidden///.' // /c/.../..hidden
// path = '/home/' // Output: "/home"
// path = '/../' // Output: "/"
// path = '/home//foo//////' // Output: "/home/foo"
// path = '/a/./b/../../c/' // "/c"
// path = '/a/../../b/../c//.//' // "/c"
// path = '/' // /
// path = "///" // /
// path = '/...' // "/..."
// path = '/..hidden' // "/..hidden"
/**
 * @param {string} path
 * @return {string}
 */
// var simplifyPath = function (path) {
//   const stack = []

//   // Filter string
//   path = path.replace(/[\/]+/g, '/')
//   if (path.at(-1) == '/' && path.length > 1) path = path.slice(0, -1)

//   // Tokenize string to array
//   // i.e. Match all alphanumeric characters and dot = \w + '.' OR slash = /
//   path = path.match(/\/[A-Za-z0-9_.]+|\//g)

//   for (let i = 0; i < path.length; i++) {
//     if (path[i] == '/.') {
//       continue
//     } else if (path[i] == '/..' && stack.length >= 1) {
//       stack.pop()
//     } else if (path[i] == '/..' && stack.length == 0) {
//       continue
//     } else {
//       stack.push(path[i])
//     }
//   }

//   let result = stack.length > 0 ? stack.join('') : '/'
//   return result
// }

// Alternative
var simplifyPath = function (path) {
  const stack = []
  path = path.split('/')

  for (let i = 0; i < path.length; i++) {
    if (!path[i] || path[i] == '.') {
      continue
    } else if (path[i] == '..') {
      stack.pop()
    } else {
      stack.push(path[i])
    }
  }

  return '/' + stack.join('/')
}
// console.log(simplifyPath(path))

// # 155. Min Stack, Medium
// Stack, Design
/*****************************************************************************/
// ["MinStack","push","push","push","getMin","pop","top","getMin"][[],[-2],[0],[-3],[],[],[],[]] // [null,null,null,null,-3,null,0,-2]
class MinStack {
  constructor() {
    this.stack = []
  }
  push(val) {
    this.stack.push(val)
  }
  pop() {
    this.stack.pop()
  }
  top() {
    return this.stack.at(-1)
  }
  getMin() {
    return Math.min(...this.stack)
  }
}
// Alternative with O(1) speed
// var MinStack = function () {
//   this.stack = []
// }
// MinStack.prototype.push = function (val) {
//   if (this.stack.length === 0) {
//     this.stack.push({ value: val, minimum: val })
//   } else {
//     // Take min value from 2 values only, is faster than from array (class above)
//     let min = Math.min(val, this.stack.at(-1).minimum)
//     this.stack.push({ value: val, minimum: min })
//   }
// }
// MinStack.prototype.pop = function () {
//   this.stack.pop()
// }
// MinStack.prototype.top = function () {
//   return this.stack.at(-1).value
// }
// MinStack.prototype.getMin = function () {
//   return this.stack.at(-1).minimum
// }
// const minStack = new MinStack()
// minStack.push(-2)
// minStack.push(0)
// minStack.push(-3)
// minStack.getMin() // return -3
// minStack.pop()
// minStack.top() // return 0
// minStack.getMin() // return -2

// # 150. Evaluate Reverse Polish Notation, Medium
// Array, Math, Stack
/*****************************************************************************/
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = []
  const operators = ['+', '-', '*', '/']

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    if (operators.includes(token)) {
      let operator = token
      // Add parentheses for proper eval((2) - (-3))
      let operand2 = '(' + stack.pop() + ')'
      let operand1 = '(' + stack.pop() + ')'
      let result = eval(operand1 + operator + operand2)
      result = Math.trunc(result) // truncates toward zero
      stack.push(result)
    } else {
      stack.push(token)
    }
  }

  return stack.pop()
}
// testFunction = evalRPN
// input(['2', '1', '+', '3', '*']).output(9) //?
// input(['4', '13', '5', '/', '+']).output(6) //?
// input(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']).output(22) //?
// input(['2', '-3', '-']).output(5) //?
// input(['4', '-2', '/', '2', '-3', '-', '-']).output(-7) //?

// # 224. Basic Calculator, Hard
// Math, String, Stack
/*****************************************************************************/
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  // 1. Tokenize string to array
  const tokens = []
  let curr = ''

  for (let i = 0; i < s.length; i++) {
    // Filter spaces
    if (s[i] !== ' ') {
      // Tokenize
      if (['+', '-', '(', ')'].includes(s[i])) {
        if (curr) tokens.push(Number(curr))
        curr = ''
        tokens.push(s[i])
      } else {
        curr += s[i]
      }
    }
  }
  if (curr) tokens.push(Number(curr))

  // 2. Perform calculations on array
  const stack = []
  let result = 0
  let sign = 1 // Declare sign to change value +/- e.g. +1 or -1

  for (let i = 0; i < tokens.length; i++) {
    let item = tokens[i]

    switch (item) {
      case '(':
        // Push previous items to stack for later use
        stack.push(result)
        stack.push(sign)
        result = 0
        sign = 1
        break
      case ')':
        // Pop previous items from stack and calculate new result
        let lastSign = stack.pop()
        let lastResult = stack.pop()
        result = lastResult + lastSign * result
        break
      case '+':
        sign = 1 // Change sign to positive
        break
      case '-':
        sign = -1 // Change sign to negative
        break
      default: // item === number
        // Change item sign depending on preceding sign
        result += item * sign
        break
    }
  }
  return result
}
// testFunction = calculate
// input('1 + 1').output(2) //?
// input('2 - 1 + 2').output(3) //?
// input('10 - 11 - 1').output(-2) //?
// input('4+(3-2)').output(5) //?
// input('4-(3-2)').output(3) //?
// input('(1+(4+5+2)-3)+(6+8)').output(23) //?
// input('(2+2)-3').output(1) //?

// With help of https://www.youtube.com/watch?v=081AqOuasw0
// And alternative https://leetcode.com/problems/basic-calculator/solutions/2832796/javascript-linear-time-o-n/?envType=study-plan-v2&envId=top-interview-150
// var calculateX = function (s) {
//   let num = 0
//   let sign = 1
//   let stack = [0]

//   for (let char of s) {
//     if (char === ' ') continue
//     else if ('1234567890'.includes(char)) {
//       num = num * 10 + parseInt(char)
//     } else if (char === '+') {
//       stack[stack.length - 1] += num * sign
//       num = 0
//       sign = 1
//     } else if (char === '-') {
//       stack[stack.length - 1] += num * sign
//       num = 0
//       sign = -1
//     } else if (char === '(') {
//       stack.push(sign)
//       stack.push(num)
//       sign = 1
//       num = 0
//     } else if (char === ')') {
//       lastNum = (stack.pop() + num * sign) * stack.pop()
//       stack[stack.length - 1] += lastNum
//       num = 0
//       sign = 1
//     }
//   }
//   return stack[stack.length - 1] + num * sign
// }

/********************** Linked List ******************************************/
/*****************************************************************************/

// # 141. Linked List Cycle, Easy
// Hash Table, Linked List, Two Pointers
/*****************************************************************************/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// Solution from https://leetcode.com/problems/linked-list-cycle/solutions/3999014/99-68-two-pointer-hash-table/?envType=study-plan-v2&envId=top-interview-150
var hasCycle = function (head) {
  // head '[1]' to string: '{"val":1,"next":null}'. This mean there are nor 'next' pointer.
  const set = new Set()
  let node = head

  while (node) {
    if (set.has(node)) return true
    set.add(node)
    node = node.next
  }

  return false
}

// # 2. Add Two Numbers, Medium
// Linked List, Math, Recursion
/*****************************************************************************/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
/*
  Explanation of linked list

  Linked list !== array, so array methods not work on list

  Example:
  ┌────────┐   ┌────────┐   ┌────────┐   ┌────────┐
  |   3    |-->|   4    |-->|   2    |-->|   7    |
  └────────┘   └────────┘   └────────┘   └────────┘

  Code:

  let list = {
    val: 3,
    next: {
        val: 4,
        next: {
            val: 2,
            next: {
                val: 7,
                next: null
            }
        }
    }
  }

*/
// const l1 = arrayToList([2, 4, 3])
// const l2 = arrayToList([5, 6, 4])
// Expected [7,0,8]
// const l1 = arrayToList([0, 9])
// const l2 = arrayToList([0, 1])
// Expected [0,0,1]
// const l1 = arrayToList([9, 9, 9, 9, 9, 9, 9])
// const l2 = arrayToList([9, 9, 9, 9])
// Expected [8,9,9,9,0,0,0,1]

var addTwoNumbers = function (l1, l2) {
  // Define linked list, by LeetCode
  function ListNode(val, next) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }

  // Our result is new linked list composed of l1 and l2. Build with nodes
  let previousNode = new ListNode()
  let headNode = previousNode
  let sum = 0
  let carry = 0 // Carry if sum > 9

  // Check if object is not null.
  // Explanation: last object of linked list === null, so 'while loop' will reach 'null'
  // E.g. { val: 1, next: { val: 2, next: { val: 3, next:   >--> null <--<   }}}
  while (l1 || l2) {
    let num1 = 0
    let num2 = 0

    if (l1) {
      num1 = l1.val
      l1 = l1.next
    }
    if (l2) {
      num2 = l2.val
      l2 = l2.next
    }

    sum = num1 + num2 + carry

    carry = sum > 9 ? 1 : 0

    sum = sum % 10 // Cut tenths

    // Set linked list with sum
    let currentNode = new ListNode(sum)
    previousNode.next = currentNode
    previousNode = currentNode
  }
  // If carry, add 1
  if (carry) {
    let currentNode = new ListNode(carry)
    previousNode.next = currentNode
    previousNode = currentNode
  }

  return headNode.next
}
// console.log(addTwoNumbers(l1, l2))

// # 21. Merge Two Sorted Lists, Easy
// Linked List, Recursion
/*****************************************************************************/

// # 138. Copy List with Random Pointer, Medium
// Hash Table, Linked List
/*****************************************************************************/

// # 92. Reverse Linked List II, Medium
// Linked List,
/*****************************************************************************/

// # 25. Reverse Nodes in k-Group, Hard
// Linked List, Recursion
/*****************************************************************************/

// # 19. Remove Nth Node From End of List, Medium
// Linked List, Two Pointers
/*****************************************************************************/

// # 82. Remove Duplicates from Sorted List II, Medium
// Linked List, Two Pointers
/*****************************************************************************/

// # 61. Rotate List, Medium
// Linked List, Two Pointers
/*****************************************************************************/

// # 86. Partition List, Medium
// Linked List, Two Pointers
/*****************************************************************************/

// # 146. LRU Cache, Medium
// Hash Table, Linked List, Design, 1+
/*****************************************************************************/

/********************** Binary Tree General **********************************/
/*****************************************************************************/

// # 104. Maximum Depth of Binary Tree, Easy
// Tree, Depth-First Search, Breadth-First Search, 1+
/*****************************************************************************/

// # 100. Same Tree, Easy
// Tree, Depth-First Search, Breadth-First Search, 1+
/*****************************************************************************/

// # 226. Invert Binary Tree, Easy
// Tree, Depth-First Search, Breadth-First Search, 1+
/*****************************************************************************/

// # 101. Symmetric Tree, Easy
// Tree, Depth-First Search, Breadth-First Search, 1+
/*****************************************************************************/

// # 105. Construct Binary Tree from Preorder and Inorder Traversal, Medium
// Array, Hash Table, Divide and Conquer, 2+
/*****************************************************************************/

// # 106. Construct Binary Tree from Inorder and Postorder Traversal, Medium
// Array, Hash Table, Divide and Conquer, 2+
/*****************************************************************************/

// # 117. Populating Next Right Pointers in Each Node II, Medium
// Linked List, Tree, Depth-First Search, 2+
/*****************************************************************************/

// # 114. Flatten Binary Tree to Linked List, Medium
// Linked List, Stack, Tree, 2+
/*****************************************************************************/

// # 112. Path Sum, Easy
// Tree, Depth-First Search, Breadth-First Search, 1+
/*****************************************************************************/

// # 129. Sum Root to Leaf Numbers, Medium
// Tree, Depth-First Search, Binary Tree
/*****************************************************************************/

// # 124. Binary Tree Maximum Path Sum, Hard
// Dynamic Programming, Tree, Depth-First Search, 1+
/*****************************************************************************/

// # 173. Binary Search Tree Iterator, Medium
// Stack, Tree, Design, 3+
/*****************************************************************************/

// # 222. Count Complete Tree Nodes, Easy
// Binary Search, Tree, Depth-First Search, 1+
/*****************************************************************************/

// # 236. Lowest Common Ancestor of a Binary Tree, Medium
// Tree, Depth-First Search, Binary Tree
/*****************************************************************************/

/********************** Binary Tree BFS **************************************/
/*****************************************************************************/

// # 199. Binary Tree Right Side View, Medium
// Tree, Depth-First Search, Breadth-First Search, 1+
/*****************************************************************************/

// # 637. Average of Levels in Binary Tree, Easy
// Tree, Depth-First Search, Breadth-First Search, 1+
/*****************************************************************************/

// # 102. Binary Tree Level Order Traversal, Medium
// Tree, Breadth-First Search, Binary Tree,
/*****************************************************************************/

// # 103. Binary Tree Zigzag Level Order Traversal, Medium
// Tree, Breadth-First Search, Binary Tree,
/*****************************************************************************/

/********************** Binary Search Tree ***********************************/
/*****************************************************************************/

// # 530. Minimum Absolute Difference in BST, Easy
// Tree, Depth-First Search, Breadth-First Search, 2+
/*****************************************************************************/

// # 230. Kth Smallest Element in a BST, Medium
// Tree, Depth-First Search, Binary Search Tree, 1+
/*****************************************************************************/

// # 98. Validate Binary Search Tree, Medium
// Tree, Depth-First Search, Binary Search Tree, 1+
/*****************************************************************************/

/********************** Graph General ****************************************/
/*****************************************************************************/

// # 200. Number of Islands, Medium
// Array, Depth-First Search, Breadth-First Search, 2+
/*****************************************************************************/

// # 130. Surrounded Regions, Medium
// Array, Depth-First Search, Breadth-First Search, 2+
/*****************************************************************************/

// # 133. Clone Graph, Medium
// Hash Table, Depth-First Search, Breadth-First Search, 1+
/*****************************************************************************/

// # 399. Evaluate Division, Medium
// Array, Depth-First Search, Breadth-First Search, 3+
/*****************************************************************************/

// # 207. Course Schedule, Medium
// Depth-First Search, Breadth-First Search, Graph, 1+
/*****************************************************************************/

// # 210. Course Schedule II, Medium
// Depth-First Search, Breadth-First Search, Graph, 1+
/*****************************************************************************/

/********************** Graph BFS ********************************************/
/*****************************************************************************/

// # 909. Snakes and Ladders, Medium
// Array, Breadth-First Search, Matrix
/*****************************************************************************/

// # 433. Minimum Genetic Mutation, Medium
// Hash Table, String, Breadth-First Search
/*****************************************************************************/

// # 127. Word Ladder, Hard
// Hash Table, String, Breadth-First Search
/*****************************************************************************/

/********************** Trie *************************************************/
/*****************************************************************************/

// # 208. Implement Trie (Prefix Tree), Medium
// Hash Table, String, Design, 1+
/*****************************************************************************/

// # 211. Design Add and Search Words Data Structure, Medium
// String, Depth-First Search, Design, 1+
/*****************************************************************************/

// # 212. Word Search II, Hard
// Array, String, Backtracking, 2+
/*****************************************************************************/

/********************** Backtracking *****************************************/
/*****************************************************************************/

// # 17. Letter Combinations of a Phone Number, Medium
// Hash Table, String, Backtracking
/*****************************************************************************/

// # 77. Combinations, Medium
// Backtracking,
/*****************************************************************************/

// # 46. Permutations, Medium
// Array, Backtracking
/*****************************************************************************/

// # 39. Combination Sum, Medium
// Array, Backtracking
/*****************************************************************************/

// # 52. N-Queens II, Hard
// Backtracking,
/*****************************************************************************/

// # 22. Generate Parentheses, Medium
// String, Dynamic Programming, Backtracking
/*****************************************************************************/

// # 79. Word Search, Medium
// Array, Backtracking, Matrix
/*****************************************************************************/

/********************** Divide & Conquer *************************************/
/*****************************************************************************/

// # 108. Convert Sorted Array to Binary Search Tree, Easy
// Array, Divide and Conquer, Tree, 2+
/*****************************************************************************/

// # 148. Sort List, Medium
// Linked List, Two Pointers, Divide and Conquer, 2+
/*****************************************************************************/

// # 427. Construct Quad Tree, Medium
// Array, Divide and Conquer, Tree, 1+
/*****************************************************************************/

// # 23. Merge k Sorted Lists, Hard
// Linked List, Divide and Conquer, Heap (Priority Queue), 1+
/*****************************************************************************/

/********************** Kadane's Algorithm ***********************************/
/*****************************************************************************/

// # 53. Maximum Subarray, Medium
// Array, Divide and Conquer, Dynamic Programming
/*****************************************************************************/

// # 918. Maximum Sum Circular Subarray, Medium
// Array, Divide and Conquer, Dynamic Programming, 2+
/*****************************************************************************/

/********************** Binary Search ****************************************/
/*****************************************************************************/

// # 35. Search Insert Position, Easy
// Array, Binary Search
/*****************************************************************************/

// # 74. Search a 2D Matrix, Medium
// Array, Binary Search, Matrix
/*****************************************************************************/

// # 162. Find Peak Element, Medium
// Array, Binary Search
/*****************************************************************************/

// # 33. Search in Rotated Sorted Array, Medium
// Array, Binary Search
/*****************************************************************************/

// # 34. Find First and Last Position of Element in Sorted Array, Medium
// Array, Binary Search
/*****************************************************************************/

// # 153. Find Minimum in Rotated Sorted Array, Medium
// Array, Binary Search
/*****************************************************************************/

// # 4. Median of Two Sorted Arrays, Hard
// Array, Binary Search, Divide and Conquer
/*****************************************************************************/

/********************** Heap *************************************************/
/*****************************************************************************/

// # 215. Kth Largest Element in an Array, Medium
// Array, Divide and Conquer, Sorting, 2+
/*****************************************************************************/

// # 502. IPO, Hard
// Array, Greedy, Sorting, 1+
/*****************************************************************************/

// # 373. Find K Pairs with Smallest Sums, Medium
// Array, Heap (Priority Queue)
/*****************************************************************************/

// # 295. Find Median from Data Stream, Hard
// Two Pointers, Design, Sorting, 2+
/*****************************************************************************/

/********************** Bit Manipulation *************************************/
/*****************************************************************************/

// # 67. Add Binary, Easy
// Math, String, Bit Manipulation, 1+
/*****************************************************************************/

// # 190. Reverse Bits, Easy
// Divide and Conquer, Bit Manipulation
/*****************************************************************************/

// # 191. Number of 1 Bits, Easy
// Divide and Conquer, Bit Manipulation
/*****************************************************************************/

// # 136. Single Number, Easy
// Array, Bit Manipulation
/*****************************************************************************/

// # 137. Single Number II, Medium
// Array, Bit Manipulation
/*****************************************************************************/

// # 201. Bitwise AND of Numbers Range, Medium
// Bit Manipulation,
/*****************************************************************************/

/********************** Math *************************************************/
/*****************************************************************************/

// # 9. Palindrome Number, Easy
// Math,
/*****************************************************************************/

// # 66. Plus One, Easy
// Array, Math
/*****************************************************************************/

// # 172. Factorial Trailing Zeroes, Medium
// Math,
/*****************************************************************************/

// # 69. Sqrt(x), Easy
// Math, Binary Search
/*****************************************************************************/

// # 50. Pow(x, n), Medium
// Math, Recursion
/*****************************************************************************/

// # 149. Max Points on a Line, Hard
// Array, Hash Table, Math, 1+
/*****************************************************************************/

/********************** 1D DP ************************************************/
/*****************************************************************************/

// # 70. Climbing Stairs, Easy
// Math, Dynamic Programming, Memoization
/*****************************************************************************/

// # 198. House Robber, Medium
// Array, Dynamic Programming
/*****************************************************************************/

// # 139. Word Break, Medium
// Array, Hash Table, String, 3+
/*****************************************************************************/

// # 322. Coin Change, Medium
// Array, Dynamic Programming, Breadth-First Search
/*****************************************************************************/

// # 300. Longest Increasing Subsequence, Medium
// Array, Binary Search, Dynamic Programming
/*****************************************************************************/

/********************** Multidimensional DP **********************************/
/*****************************************************************************/

// # 120. Triangle, Medium
// Array, Dynamic Programming
/*****************************************************************************/

// # 64. Minimum Path Sum, Medium
// Array, Dynamic Programming, Matrix
/*****************************************************************************/

// # 63. Unique Paths II, Medium
// Array, Dynamic Programming, Matrix
/*****************************************************************************/

// # 5. Longest Palindromic Substring, Medium
// String, Dynamic Programming
/*****************************************************************************/

// # 97. Interleaving String, Medium
// String, Dynamic Programming
/*****************************************************************************/

// # 72. Edit Distance, Medium
// String, Dynamic Programming
/*****************************************************************************/

// # 123. Best Time to Buy and Sell Stock III, Hard
// Array, Dynamic Programming
/*****************************************************************************/

// # 188. Best Time to Buy and Sell Stock IV, Hard
// Array, Dynamic Programming
/*****************************************************************************/

// # 221. Maximal Square, Medium
// Array, Dynamic Programming, Matrix
/*****************************************************************************/
