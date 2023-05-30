// Hashmap
// 1. Two Sum
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

//*****************************************************************************
// Top Interview 150
//*****************************************************************************

// Array / String
//*****************************************************************************

// 88. Merge Sorted Array, Easy
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
;(nums1 = [1, 2, 3, 0, 0, 0]), (m = 3), (nums2 = [2, 5, 6]), (n = 3) // Expected [1,2,2,3,5,6]
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
