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
