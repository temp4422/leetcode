'use strict'
// Array to Linked list converter. JS doesn't have many use cases because natively implemented ways of handling collections https://www.raulmelo.me/en/blog/data-structure-with-javascript-linked-list
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
export function arrayToLinkedList(arr) {
  /**
   * LeetCode Definition for singly-linked list.
   * function ListNode(val, next) {
   *     this.val = (val===undefined ? 0 : val)
   *     this.next = (next===undefined ? null : next)
   * }
   */
  let list = null
  for (let i = arr.length - 1; i > -1; i--) {
    list = {
      val: arr[i],
      next: list, // Insert current list inside list
    }
  }
  return list
}

// Array to binary tree converter
// LeetCode  definition for a binary tree node
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
// Generated with Bard AI https://bard.google.com/chat/e653f234e0874958
// Assuming a level-order (breadth-first) arrangement of values in the array:
export function arrayToBinaryTree(arr) {
  if (!arr.length) return null

  const root = new TreeNode(arr[0])
  const queue = [root]
  let i = 1

  while (queue.length > 0 && i < arr.length) {
    const current = queue.shift()

    // Create left child if it exists
    if (arr[i] !== null) {
      current.left = new TreeNode(arr[i])
      queue.push(current.left)
    }

    i++

    // Create right child if it exists
    if (i < arr.length && arr[i] !== null) {
      current.right = new TreeNode(arr[i])
      queue.push(current.right)
    }

    i++
  }

  return root
}
