'use strict'

// #region Test framework for faster iteration
// Check if input eqaul to output and return boolean true/false
// Usage: testFunction(<FUNCTION_TO_TEST>).input(<INPUT>).output(<OUTPUT>)
export function testFunction(funtionToTest) {
  return {
    input(...inputArguments) {
      // Insert the input argument into the function that we're going to test
      let functionOutput = funtionToTest(...inputArguments)
      return {
        output(outputValue) {
          // If primitive value
          if (
            typeof functionOutput === 'boolean' ||
            typeof functionOutput === 'string' ||
            typeof functionOutput === 'number' ||
            typeof functionOutput === 'undefined' ||
            typeof functionOutput === 'symbol' ||
            typeof functionOutput === 'bigint'
          ) {
            if (functionOutput === outputValue) return true
            if (functionOutput !== outputValue) return false
          }
          // If object value
          if (typeof functionOutput === 'object' || typeof functionOutput === 'function') {
            if (JSON.stringify(functionOutput) === JSON.stringify(outputValue)) return true
            if (JSON.stringify(functionOutput) !== JSON.stringify(outputValue)) return false
          }
        },
      }
    },
  }
}
// #endregion

// #region Create single node from value
// LeetCode Definition for singly-linked list
export function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
// #endregion

// #region Array to Linked list converter
// JS doesn't have many use cases because natively implemented ways of handling collections https://www.raulmelo.me/en/blog/data-structure-with-javascript-linked-list
// From array [1, 2, 3] to linked list with nodes: {val: 1, next: {val: 2, next: {val: 3, next: null}}}
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
export function arrayToLinkedList(array) {
  let list = null
  for (let i = array.length - 1; i > -1; i--) {
    list = {
      val: array[i],
      next: list, // Insert current list inside list
    }
  }
  return list
}
// #endregion

// #region Array to Binary tree converter
// LeetCode  definition for a binary tree node
export function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
// Generated with Bard AI https://bard.google.com/chat/e653f234e0874958
// Assuming a level-order (breadth-first) arrangement of values in the array:
export function arrayToBinaryTree(array) {
  if (!array.length) return null

  const root = new TreeNode(array[0])
  const queue = [root]
  let i = 1

  while (queue.length > 0 && i < array.length) {
    const current = queue.shift()

    // Create left child if it exists
    if (array[i] !== null) {
      current.left = new TreeNode(array[i])
      queue.push(current.left)
    }
    i++

    // Create right child if it exists
    if (i < array.length && array[i] !== null) {
      current.right = new TreeNode(array[i])
      queue.push(current.right)
    }
    i++
  }

  return root
}
// #endregion
