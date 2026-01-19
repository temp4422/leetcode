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
