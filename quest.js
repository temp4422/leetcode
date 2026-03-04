'use strict'

import { testFunction, arrayToLinkedList, arrayToBinaryTree, TreeNode } from './helper.js'

// Q1. Concatenation of Array, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function (nums) {
  return nums.concat(nums)
}
// testFunction(getConcatenation).input([1, 2, 1]).output([1, 2, 1, 1, 2, 1]) //?

// Q2. Shuffle the Array, Easy
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  const newArr = []
  for (let i = 0; i < n; i++) {
    newArr.push(nums[i], nums[i + n])
  }
  return newArr
}
// testFunction(shuffle).input([2, 5, 1, 3, 4, 7], 3).output([2, 3, 5, 4, 1, 7]) //?

// Q3. Max Consecutive Ones, Easy
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let maxConsecutive = 0
  let consecutive = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      consecutive++
      maxConsecutive = Math.max(maxConsecutive, consecutive)
    } else {
      consecutive = 0
    }
  }
  return maxConsecutive
}
// testFunction(findMaxConsecutiveOnes).input([1, 1, 0, 1, 1, 1]).output(3) //?

// Q1. Set Mismatch, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  // 1. Find duplicate
  let duplicate
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) duplicate = nums[i]
    else map.set(nums[i], 1)
  }
  // 2. Find missing
  let missing
  const sequentialNums = Array.from({ length: nums.length }, (_, i) => i + 1)
  for (let i = 0; i < sequentialNums.length; i++) {
    if (!map.has(sequentialNums[i])) missing = sequentialNums[i]
    else continue
  }
  // 3. Return both
  return [duplicate, missing]
  //
  // Alternative https://leetcode.com/problems/set-mismatch/solutions/3026921/645-set-mismatch-typescript-solution-by-ft0cc
  //
  // const arr = new Array(nums.length + 1).fill(0)
  // for (let i = 0; i < nums.length; i++) {
  //   arr[nums[i]]++
  // }
  // return [arr.indexOf(2), arr.lastIndexOf(0)]
}
// testFunction(findErrorNums).input([1, 2, 2, 4]).output([2, 3]) //?
// testFunction(findErrorNums).input([1, 1]).output([1, 2]) //?
// testFunction(findErrorNums).input([2, 2]).output([2, 1]) //?
// testFunction(findErrorNums).input([2, 3, 2]).output([2, 1]) //?
// testFunction(findErrorNums).input([3, 2, 3, 4, 6, 5]).output([3, 1]) //?
// testFunction(findErrorNums).input([3, 2, 2]).output([2, 1]) //?

// Q2. How Many Numbers Are Smaller Than the Current Number, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {
  const smallerNums = []
  for (let i = 0; i < nums.length; i++) {
    let count = 0
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] < nums[i]) count++
    }
    smallerNums.push(count)
  }
  return smallerNums
}
// testFunction(smallerNumbersThanCurrent).input([8, 1, 2, 2, 3]).output([4, 0, 1, 1, 3]) //?
// testFunction(smallerNumbersThanCurrent).input([6, 5, 4, 8]).output([2, 1, 0, 3]) //?

// Q3. Find All Numbers Disappeared in an Array, Easy
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const set = new Set(nums)
  const missedNums = []
  for (let i = 1; i < nums.length + 1; i++) {
    if (!set.has(i)) missedNums.push(i)
  }
  return missedNums

  // // Time Limit Exceeded
  // const missedNums = []
  // for (let i = 1; i < nums.length + 1; i++) {
  //   if (nums.indexOf(i) == -1) missedNums.push(i)
  // }
  // return missedNums
  //
  // // Time Limit Exceeded
  // const sequentialNums = Array.from({ length: nums.length }, (_, i) => i + 1)
  // const missedNums = []
  // for (let i = 0; i < sequentialNums.length; i++) {
  //   if (nums.indexOf(sequentialNums[i]) == -1) missedNums.push(sequentialNums[i])
  // }
  // return missedNums
  //
  // // Time Limit Exceeded
  // const sequentialNums = Array.from({ length: nums.length }, (_, i) => i + 1)
  // const missedNums = []
  // for (let i = 0; i < sequentialNums.length; i++) {
  //   if (!nums.includes(sequentialNums[i])) missedNums.push(sequentialNums[i])
  // }
  // return missedNums
}
// testFunction(findDisappearedNumbers).input([4, 3, 2, 7, 8, 2, 3, 1]).output([5, 6]) //?

// Q1. Build an Array With Stack Operations, Medium
/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
var buildArray = function (target, n) {
  // const stream = Array.from({ length: n }, (_, i) => i + 1)
  // const stack = []
  // const stackOperations = []
  // for (let i = 0; i <= n; i++) {
  //   if (stack[i] == target[i]) {
  //     continue
  //   } else if (!stack[i]) {
  //     stack.push(stream.shift())
  //     stackOperations.push('Push')
  //     i--
  //   } else if (stack[i] < target[i]) {
  //     stack.pop()
  //     stackOperations.push('Pop')
  //     i--
  //   } else if (stack[i] > target[i]) {
  //     stack.push(stream.shift())
  //     stackOperations.push('Push')
  //   }
  // }
  // return stackOperations
  //
  // // Alternative https://leetcode.com/problems/build-an-array-with-stack-operations/solutions/4241460/3-approaches-brute-forcetwo-pointers-sta-c6nb
  // const stackOperations = []
  // let current = 1
  // for (let i = 0; i < target.length; i++) {
  //   while (current < target[i]) {
  //     stackOperations.push('Push')
  //     stackOperations.push('Pop')
  //     current++
  //   }
  //   stackOperations.push('Push')
  //   current++
  // }
  // return stackOperations
  //
  // Alternative with set https://leetcode.com/problems/build-an-array-with-stack-operations/solutions/4241217/9980-iterative-set-stack-simulation-by-v-vljo
  const targetSet = new Set(target)
  const stackOperations = []
  for (let i = 1; i <= target.at(-1); i++) {
    if (targetSet.has(i)) {
      stackOperations.push('Push')
    } else {
      stackOperations.push('Push')
      stackOperations.push('Pop')
    }
  }
  return stackOperations
}
// testFunction(buildArray).input([1, 3], 3).output(['Push', 'Push', 'Pop', 'Push']) //?

// Q2. Evaluate Reverse Polish Notation
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = []
  const operators = new Set(['+', '-', '*', '/'])

  for (let i = 0; i < tokens.length; i++) {
    if (operators.has(tokens[i])) {
      let operand1 = stack.pop()
      let operand2 = stack.pop()
      let operator = tokens[i]
      let evaluation = Math.trunc(eval(`(${operand2})${operator}(${operand1})`))
      stack.push(evaluation)
    } else {
      stack.push(Number(tokens[i]))
    }
  }
  return stack.pop()
}
// testFunction(evalRPN).input(['2', '1', '+', '3', '*']).output(9) //?
// testFunction(evalRPN).input(['4', '13', '5', '/', '+']).output(6) //?
// testFunction(evalRPN).input(['4', '-2', '/', '2', '-3', '-', '-']).output(-7) //?

// Q3. Exclusive Time of Functions, Medium
/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
var exclusiveTime = function (n, logs) {
  const result = new Array(n).fill(0)
  const stack = []
  let previousTime = 0

  for (const log of logs) {
    let [functionId, startOrEnd, timestamp] = log.split(':')
    functionId = Number(functionId)
    timestamp = Number(timestamp)

    if (startOrEnd === 'start') {
      // Add time to currently running function
      if (stack.length) {
        result[stack[stack.length - 1]] += timestamp - previousTime
      }

      stack.push(functionId)
      previousTime = timestamp
    } else {
      // Function ends
      result[stack.pop()] += timestamp - previousTime + 1
      previousTime = timestamp + 1
    }
  }

  return result
  // // https://leetcode.com/problems/exclusive-time-of-functions/solutions/1430688/js-using-stack-by-wintryleo-b0qn
  // const results = new Array(n).fill(0)
  // const stack = []

  // for (let i = 0; i < logs.length; i++) {
  //   let [functionID, startOrEnd, timestamp] = logs[i].split(':')
  //   functionID = Number(functionID)
  //   timestamp = Number(timestamp)

  //   if (startOrEnd === 'start') {
  //     stack.push([functionID, timestamp])
  //   } else {
  //     // Get function from stack and save time to results
  //     let [currentFunctionID, currentTime] = stack.pop()
  //     let time = timestamp - currentTime + 1
  //     results[functionID] += time

  //     if (stack.length) {
  //       // Modify time of function that currently on stack
  //       let [lastFunctionID, lastTime] = stack[stack.length - 1]
  //       results[lastFunctionID] -= time
  //     }

  //     // if (stack.length) result[stack.at(-1)[0]] -= time
  //     // if (stack.length) result[[stack.length - 1][0]] -= time
  //   }
  // }

  // return results
}
// prettier-ignore
// testFunction(exclusiveTime).input(2, ["0:start:0","1:start:2","1:end:5","0:end:6"]).output([3,4]) //?
// prettier-ignore
// testFunction(exclusiveTime).input(1, ["0:start:0","0:start:2","0:end:5","0:start:6","0:end:6","0:end:7"]).output([8]) //?
// prettier-ignore
// testFunction(exclusiveTime).input(2, ["0:start:0","0:start:2","0:end:5","1:start:6","1:end:6","0:end:7"]).output([7,1]) //?

// Q1. Final Prices With a Special Discount in a Shop, Easy
/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function (prices) {
  const answer = [...prices]
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] <= prices[i]) {
        answer[i] = prices[i] - prices[j]
        break
      }
    }
  }
  return answer
}
// testFunction(finalPrices).input([8, 4, 6, 2, 3]).output([4, 2, 4, 2, 3]) //?
