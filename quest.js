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
