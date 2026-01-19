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
