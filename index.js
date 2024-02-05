'use strict'

// My helper functions, speed up debugging
import { arrayToLinkedList } from './helper.js'

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

// 2621. Sleep, Easy
// timeout = 100
/**
 * @param {number} millis
 */
// v0 Explained
async function sleep(timeout) {
  // alternative use 'await'
  // Create new promise and  set setTimeout() to return 'resolve' of this promise after 'timeout'
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(timeout)
    }, timeout)
  })
}
// // v1
// async function sleep(millis) {
//   await new Promise((resolve) => setTimeout(resolve, millis))
// }
// // v2 Oneline
// const sleep = async (millis) => new Promise((resolve) => setTimeout(() => resolve(millis), millis))
// // v3 Oneline shortenting setTimeout()
// const sleep = async (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))
// let t = Date.now()
// sleep(timeout).then(() => console.log(Date.now() - t)) // 100

// 2620. Counter, Easy
// n = 10 // Output: [10,11,12]
// n = -2 // Output: [-2,-1,0,1,2]
/**
 * @param {number} n
 * @return {Function} counter
 */
var createCounter = function (n) {
  let tmp = n // Alternative 'n - 1'
  return function () {
    // First evaluate value, then increment: return tmp && tmp += 1
    return tmp++ // Alternative '++tmp'
  }
}
// const counter = createCounter(n)
// console.log(counter()) // 10
// console.log(counter()) // 11

// 2619. Array Prototype Last, Easy
// nums = [1, 2, 3]
// nums = [null, {}, 3] // Output: 3
// nums = [] // Output: -1
Array.prototype.last = function () {
  const arr = [...this]
  if (arr.length == 0) {
    return -1
  } else {
    return arr[arr.length - 1]
  }
  // return this.length ? this[this.length - 1] : -1;
}
// console.log(nums.last()) // 3

// 2629. Function Composition, Easy
// ;(functions = [(x) => x + 1, (x) => x * x, (x) => 2 * x]), (x = 4) // Output: 65
// ;(functions = [(x) => 10 * x, (x) => 10 * x, (x) => 10 * x]), (x = 1) // Output: 1000
// ;(functions = []), (x = 42) // Output: 42
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    if (functions.length === 0) {
      return x
    } else {
      // Declare 'result' variable to store output from functions and initialize it with argument from 'fn' function
      let result = x

      // Loop through array of functions from end to start (right to left)
      for (let i = functions.length - 1; i >= 0; i--) {
        // Apply function to output of another function and save in result variable
        result = functions[i](result)
      }
      return result
    }
  }
}
// const fn = compose([(x) => x + 1, (x) => 2 * x])
// const fn = compose(functions)
// console.log(fn(x)) // 9

// 2634. Filter Elements from Array, Easy
//prettier-ignore
// arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; } // Output: [20,30]
//prettier-ignore
// arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; } // Output: [1]
//prettier-ignore
// arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 } // Output: [-2,0,1,2]
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function (arr, fn) {
  let arrX = []

  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      arrX.push(arr[i])
    }
  }
  return arrX
}
// console.log(filter(arr, fn))

// 2635. Apply Transform Over Each Element in Array, Easy
//prettier-ignore
// arr = [1,2,3], fn = function plusone(n) { return n + 1; } //Output: [2,3,4]
//prettier-ignore
// arr = [1,2,3], fn = function plusI(n, i) { return n + i; } //Output: [1,3,5]
//prettier-ignore
// arr = [10,20,30], fn = function constant() { return 42; } //Output: [42,42,42]
/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var map = function (arr, fn) {
  let arrX = []

  for (let i = 0; i < arr.length; i++) {
    arrX.push(fn(arr[i], i))
  }
  return arrX
}
// console.log(map(arr, fn))

// 2626. Array Reduce Transformation, Easy
//prettier-ignore
// nums = [1,2,3,4], fn = function sum(accum, curr) { return accum + curr; }, init = 0 //Output: 10
//prettier-ignore
// nums = [1,2,3,4], fn = function sum(accum, curr) { return accum + curr * curr; }, init = 100 //Output: 130
//prettier-ignore
// nums = [], fn = function sum(accum, curr) { return 0; }, init = 25 //Output: 25
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
  if (nums.length === 0) {
    return init
  }

  let arrX = []
  let tmp = init

  for (let i = 0; i < nums.length; i++) {
    tmp = fn(tmp, nums[i])
    arrX.push(tmp)
  }
  return arrX[arrX.length - 1]
}
// console.log(reduce(nums, fn, init))

// 2648. Generate Fibonacci Sequence, Easy
// callCount = 5 // Output: [0,1,1,2,3]
// callCount = 0 // Output: []
/**
 * @return {Generator<number>}
 */
var fibGenerator = function* () {
  // Xn = Xn-1 + Xn-2
  let fib = [0, 1]
  for (let i = 1; i < fib.length; i++) {
    let curr = fib.at(-1) + fib.at(-2)
    fib.push(curr)
    yield fib[i - 1]
  }
}
// const gen = fibGenerator()
// console.log(gen.next().value) // 0
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 2
// console.log(gen.next().value) // 3
// console.log(gen.next().value) // 5
// console.log(gen.next().value) // 8

// 2665. Counter II, Easy
// ;(init = 5), (calls = ['increment', 'reset', 'decrement']) // Output: [6,5,4]
// ;(init = 0), (calls = ['increment', 'increment', 'decrement', 'reset', 'reset']) // Output: [1,2,1,0,0]
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (init) {
  const val = init
  let tmp = val

  //prettier-ignore
  const obj = {
    increment() {return ++tmp},
    decrement() {return --tmp},
    reset() {return tmp = val},
  }

  return obj
}
// const counter = createCounter(5)
// console.log(counter.increment()) // 6
// console.log(counter.reset()) // 5
// console.log(counter.decrement()) // 4

// 2666. Allow One Function Call, Easy
//prettier-ignore
// fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]] // Output: [{"calls":1,"value":6}]
// prettier-ignore
// fn = (a,b,c) => (a * b * c), calls = [[5,7,4],[2,3,6],[4,6,8]] // Output: [{"calls":1,"value":140}]
/**
 * @param {Function} fn
 * @return {Function}
 */
var once = function (fn) {
  let flag = true // If function was called once, it changes to false

  return function (...args) {
    if (flag) {
      flag = false
      return fn(...args)
    } else {
      return undefined
    }
  }
}
// let fn = (a, b, c) => a + b + c
// let onceFn = once(fn)
// console.log(onceFn(1, 2, 3)) // 6
// console.log(onceFn(2, 3, 6)) // returns undefined without calling fn

// 2677. Chunk Array, Easy
// ;(arr = [1, 2, 3, 4, 5]), (size = 1) // Output: [[1],[2],[3],[4],[5]]
// ;(arr = [1, 9, 6, 3, 2]), (size = 3) // Output: [[1,9,6],[3,2]]
// ;(arr = [8, 5, 3, 2, 6]), (size = 6) // Output: [[8,5,3,2,6]]
// ;(arr = []), (size = 1) // Output: []
/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
var chunk = function (arr, size) {
  const arrX = []

  for (let i = 0; i < arr.length; i = i + size) {
    arrX.push(arr.slice(i, i + size))
  }

  return arrX
}
// console.log(chunk(arr, size))

// 2695. Array Wrapper, Easy
//prettier-ignore
// nums = [[1, 2],[3, 4],], operation = 'Add' // Output: 10
// ;(nums = [[23, 98, 42, 70]]), (operation = 'String') // Output: "[23,98,42,70]"
// ;(nums = [[], []]), (operation = 'Add') // Output: 0
/**
 * @param {number[]} nums
 * @return {void}
 */
var ArrayWrapper = function (nums) {
  this.nums = nums
}
/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function () {
  return this.nums.reduce((a, c) => a + c, 0)
}
/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function () {
  return `[${this.nums.join()}]`
}
// const obj1 = new ArrayWrapper([1, 2])
// const obj2 = new ArrayWrapper([3, 4])
// console.log(obj1 + obj2) // 10
// console.log(String(obj1)) // "[1,2]"
// console.log(String(obj2)) // "[3,4]"

// Explanation https://leetcode.com/problems/array-wrapper/solutions/3584650/2695-array-wrapper-level-up-your-js-skills-with-these-intuitive-implementations-day-28/

// Alternative with Class Declaration
// class ArrayWrapper2 {
//   constructor(nums) {
//     this.nums = nums
//   }
//   valueOf() {
//     return this.nums.reduce((acc, curr) => acc + curr, 0) // override the default behavior of valueOf()
//   }
//   toString() {
//     return `[${this.nums.join()}]` // override the default behavior of toString()
//   }
// }
// const obj1 = new ArrayWrapper2([1, 2])
// const obj2 = new ArrayWrapper2([3, 4])
// console.log(obj1)
// console.log(obj1.valueOf())
// console.log(obj1.toString())
// console.log(obj1 + obj2) // Same as .valueOf()
// console.log(String(obj1)) // Same as .toString()

/*
  The valueOf method is defined on the prototype of the ArrayWrapper class. This method is automatically called when the instance is used in a context where a primitive value is expected, such as addition with the + operator.

  The toString method is also defined on the prototype of the ArrayWrapper class. This method is automatically called when the instance is converted to a string, such as when using String(obj) or implicitly during string concatenation.
*/

// Alternative TypeScript
/*
  Implementing in a production system, you generally want to cache the results of the reduce and toString operations so they are not re-executed on every call of the methods. A best practice would be to compute them in the constructor and store the results in private properties. This practice avoids unnecessary computational cost and optimizes your code performance.
*/
// interface IArrayWrapper {
//   valueOf(): number;
//   toString(): string;
// }
// class ArrayWrapper implements IArrayWrapper {
//   private val: number;
//   private str: string;
//   constructor(nums: number[]) {
//       this.val = nums.reduce((a, c) => a + c, 0);
//       this.str = `[${nums.toString()}]`;
//   }
//   valueOf(): number {
//       return this.val;
//   }
//   toString(): string {
//       return this.str;
//   }
// }

// 2667. Create Hello World Function, Easy
// args = [] // Output: "Hello World"
// args = [{}, null, 42] // Output: "Hello World"
/**
 * @return {Function}
 */
var createHelloWorld = function () {
  return function (...args) {
    return 'Hello World'
  }
}
// const f = createHelloWorld()
// console.log(f())

// 2704. To Be Or Not To Be, Easy
// func = () => expect(5).toBe(5) // Output: {"value": true}
// func = () => expect(5).toBe(null) // Output: {"error": "Not Equal"}
// func = () => expect(5).notToBe(null) // Output: {"value": true}
/**
 * @param {string} val
 * @return {Object}
 */
const expect = function (val) {
  return {
    toBe(val2) {
      if (val === val2) return true
      if (val !== val2) throw new Error('Not Equal')
    },
    notToBe(val2) {
      if (val !== val2) return true
      if (val === val2) throw new Error('Equal')
    },
  }
}
// console.log(expect(5).toBe(5)) // true
// console.log(expect(5).notToBe(5)) // throws "Equal"

// 2703. Return Length of Arguments Passed, Easy, Companies
/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
var argumentsLength = function (...args) {
  let tmp = [...args]
  // console.log([...args])
  return [...args].length
}
// args = [5] // Output: 1
// args = [{}, null, '3'] // Output: 3
// console.log(argumentsLength(args)) // 3

// 2715. Timeout Cancellation, Easy
/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
var cancellable = function (fn, args, t) {
  // Prepare (put) function in event loop queue for later execution.
  // I.e.: start execution of fn() with delay of 't'
  const timeoutId = setTimeout(() => {
    // Also fn() take all arguments in array form with rest operator -> '...args'
    fn(...args) // Not executed yet, until 't' goes out
  }, t)

  // If we call cancelFn() before 't' goes out, it will remove fn() from event loop execution queue (macrotask queue)
  // If 't' goes out first, fn() will be executed anyway
  const cancelFn = () => {
    clearTimeout(timeoutId)
  }

  return cancelFn // return this function but not call
  // If we call someOtherFunction() wich got assigned to cancelFn() before 't' (what depends on 'cancelT')
  // Than clearTimeout(timeoutId) will be executed and setTimeout() (what set above) will be interrupted
}
// Example
// ;(fn = (x) => x * 5), (args = [2]), (t = 20), (cancelT = 50) // Output: [{"time": 20, "returned": 10}]
// ;(fn = (x) => x ** 2), (args = [2]), (t = 100), (cancelT = 50) // Output: []
// ;(fn = (x1, x2) => x1 * x2), (args = [2, 4]), (t = 30), (cancelT = 100) // Output: [{"time": 30, "returned": 8}]
// const result = []
// const fn = (x) => x * 5
// const args = [2], t = 20, cancelT = 50
// const start = performance.now()
// const log = (...argsArr) => {
//   const diff = Math.floor(performance.now() - start)
//   result.push({ time: diff, returned: fn(...argsArr) })
// }
// const cancel = cancellable(log, args, t)
// const maxT = Math.max(t, cancelT)
// setTimeout(() => {
//   cancel()
// }, cancelT)
// setTimeout(() => {
//   console.log(result) // [{"time":20,"returned":10}]
// }, maxT + 15)

// 2725. Interval Cancellation, Easy
/**
 * @param {Function} fn
 * @param {Array} args
 * @param {number} t
 * @return {Function}
 */
// var cancellable = function (fn, args, t) {
//   fn(...args)
//   const intervalID = setInterval(() => fn(...args), t)
//   const cancelFn = () => clearInterval(intervalID)
//   return cancelFn
// }

// 2723. Add Two Promises, Easy
/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function (promise1, promise2) {
  // const promise1 = () => new Promise((resolve) => setTimeout(() => resolve(2), 20))
  // const promise2 = () => new Promise((resolve) => setTimeout(() => resolve(5), 60))
  const val1 = await promise1
  const val2 = await promise2
  return val1 + val2
}
// addTwoPromises(promise1, promise2) // 4
// addTwoPromises(Promise.resolve(2), Promise.resolve(2)).then(console.log) // 4

// 2724. Sort By, Easy
/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function (arr, fn) {
  const sorted = arr.sort((a, b) => fn(a) - fn(b))
  return sorted
}
// console.log(sortBy(arr, fn))
// arr = [5, 4, 1, 2, 3], fn = (x) => x // Output: [1, 2, 3, 4, 5]
// arr = [{"x": 1}, {"x": 0}, {"x": -1}], fn = (d) => d.x // Output: [{"x": -1}, {"x": 0}, {"x": 1}]
// arr = [[3, 4], [5, 2], [10, 1]], fn = (x) => x[1] // Output: [[10, 1], [5, 2], [3, 4]]

// 206. Reverse Linked List, Easy
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  // Explanation:
  // 1) Declare basics. Add two pointers to watch for the list
  let p1 = null // Point pointer 1 to null
  let p2 = head // Point pointer 2 to head

  // 2) Move pointers and head references
  while (head) {
    p2 = p2.next // 1) Point p2 to next node
    head.next = p1 // 2) Point head to new node
    p1 = head // 3) Point p1 to old head
    head = p2 // 4) Point head to next node (thus head become new head)
  }

  // 3) Pointer 1 become new head, that points to reversed list
  return p1
}
// const head = arrayToLinkedList([1, 2, 3, 4, 5]) //?
// const expected = arrayToLinkedList([5, 4, 3, 2, 1]) //?
// console.log(reverseList(head))

// 2726. Calculator with Method Chaining, Easy
class Calculator {
  /**
   * @param {number} value
   */
  constructor(value) {
    // Within a class constructor, the value of `this` points to the newly created instance. You can assign properties to it, or read existing properties.
    // The `this` value will be automatically returned as the result of `new`. You are advised to not return any value from the constructor — because if you return a non-primitive value, it will become the value of the `new` expression, and the value of `this` is dropped.
    this.num = value
    return this
  }
  /**
   * @param {number} value
   * @return {Calculator}
   */
  add(value) {
    this.num = this.num + value
    return this
  }
  /**
   * @param {number} value
   * @return {Calculator}
   */
  subtract(value) {
    this.num = this.num - value
    return this
  }
  /**
   * @param {number} value
   * @return {Calculator}
   */
  multiply(value) {
    this.num = this.num * value
    return this
  }
  /**
   * @param {number} value
   * @return {Calculator}
   */
  divide(value) {
    if (value === 0) {
      // throw new Error("Division by zero is not allowed");
      throw new Error('Division by zero is not allowed')
    } else {
      this.num = this.num / value
      return this
    }
  }
  /**
   * @param {number} value
   * @return {Calculator}
   */
  power(value) {
    this.num = this.num ** value
    return this
  }
  /**
   * @return {number}
   */
  getResult() {
    return this.num
  }
}
// Input: actions = ["Calculator", "add", "subtract", "getResult"], values = [10, 5, 7] // Output: 8
// const result = new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8

// 2727. Is Object Empty, Easy
/**
 * @param {Object|Array} obj
 * @return {boolean}
 */
var isEmpty = function (obj) {
  // Aletrnative return !Object.keys(obj).length;
  if (obj instanceof Array) {
    if (obj.length > 0) return false
    else return true
  } else {
    if (Object.keys(obj).length > 0) return false
    else return true
  }
}
// obj = { x: 5, y: 42 } // Output: false
// obj = {} // Output: true
// obj = [null, false, 0] // Output: false
// obj = [] // Output: true
// console.log(isEmpty(obj))

// 2623. Memoize, Medium
/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  const map = new Map()

  return function (...args) {
    const fnArgs = [...args].toString()
    if (map.has(fnArgs)) {
      return map.get(fnArgs)
    } else {
      const fnOut = fn(...args)
      map.set(fnArgs, fnOut)
      return fnOut
    }
  }
}
// let callCount = 0
// const memoizedFn = memoize(function (a, b) {
//   callCount += 1
//   return a + b
// })
// console.log(memoizedFn(2, 3))
// console.log(memoizedFn(2, 4))
// console.log(memoizedFn(2, 3))
// console.log(callCount)

// 2631. Group By, Medium
/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function (fn) {
  const arr = this // this array
  const result = {}

  for (let i = 0; i < arr.length; i++) {
    let item = fn(arr[i])

    // Check if item (given function output) already exist in result object
    if (item in result) {
      result[item].push(arr[i])
    } else {
      result[item] = [arr[i]]
    }
  }

  return result
}
// 1
// console.log([1, 2, 3].groupBy(String)) // {"1":[1],"2":[2],"3":[3]}
// 2
// ;(array = [{ id: '1' }, { id: '1' }, { id: '2' }]), (fn = (item) => item.id)
// console.log(array.groupBy(fn)) // Output: {"1": [{"id": "1"}, {"id": "1"}], "2": [{"id": "2"}]}
// 3
// prettier-ignore
// array = [[1, 2, 3], [1, 3, 5], [1, 5, 9]], fn = (list) => String(list[0]);
// console.log(array.groupBy(fn)) // Output: {"1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]]}
// 4
// array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], fn =  (n) => String(n > 5);
// console.log(array.groupBy(fn)) // Output: {"true": [6, 7, 8, 9, 10], "false": [1, 2, 3, 4, 5]}

// 2627. Debounce, Medium
/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function(fn, t) {
  let timeoutId

  return function(...args) {
    // On each call of this function: clear and run timeout (with timeoutId from closure of it's lexical environment), i.e. reset timeout.
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(...args)
    }, t)
  }
}
// //Input: t = 50, calls = [ {"t": 50, inputs: [1]}, {"t": 75, inputs: [2]}]
// //Output: [{"t": 125, inputs: [2]}]
// let start = Date.now()
// function log(...inputs) {
//   console.log([Date.now() - start, inputs])
// }
// const dlog = debounce(log, 50)
// setTimeout(() => dlog(1), 50)
// setTimeout(() => dlog(2), 75)

// 2637. Promise Time Limit, Medium
/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  return async function (...args) {
    const promise1 = new Promise((resolve, reject) =>
      setTimeout(() => {
        reject('Time Limit Exceeded')
      }, t)
    )
    const promise2 = fn(...args)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
    const firstResponse = await Promise.race([promise1, promise2])
    return firstResponse
  }
}
// /**
//  * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
//  * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
//  */
// fn = async (n) => {
//   await new Promise((res) => setTimeout(res, 100))
//   return n * n
// }
// inputs = [5]
// t = 50

// const limited = timeLimit(fn, t)
// const start = performance.now()
// let result
// try {
//   const res = await limited(...inputs)
//   result = { resolved: res, time: Math.floor(performance.now() - start) }
// } catch (err) {
//   result = { rejected: err, time: Math.floor(performance.now() - start) }
// }
// console.log(result) // Output
// // Expected Output: {"rejected":"Time Limit Exceeded","time":50}

// 2622. Cache With Time Limit, Medium
// var TimeLimitedCache = function () {
// }
// /**
//  * @param {number} key
//  * @param {number} value
//  * @param {number} duration time until expiration in ms
//  * @return {boolean} if un-expired key already existed
//  */
// TimeLimitedCache.prototype.set = function (key, value, duration) {
// }
// /**
//  * @param {number} key
//  * @return {number} value associated with key
//  */
// TimeLimitedCache.prototype.get = function (key) {}
// /**
//  * @return {number} count of non-expired keys
//  */
// TimeLimitedCache.prototype.count = function () {}
class TimeLimitedCache {
  constructor() {
    this.cache = {}
  }

  set(key, value, duration) {
    const keyExist = this.cache[key]

    if (keyExist) {
      clearTimeout(this.cache[key][1])
      delete this.cache[key]
    }

    const timeoutId = setTimeout(() => {
      delete this.cache[key]
    }, duration)

    this.cache[key] = [value, timeoutId]

    return keyExist ? true : false
  }

  get(key) {
    return this.cache[key] ? this.cache[key][0] : -1
  }

  count() {
    return Object.keys(this.cache).length
  }
}
// const timeLimitedCache = new TimeLimitedCache()
// // Exmaple 2
// console.log(timeLimitedCache.set(1, 42, 50)) // false
// setTimeout(() => {
//   console.log(timeLimitedCache.set(1, 50, 100)) // true
// }, 40)
// setTimeout(() => {
//   console.log(timeLimitedCache.get(1)) // 50
// }, 50)
// setTimeout(() => {
//   console.log(timeLimitedCache.get(1)) // 50
// }, 120)
// setTimeout(() => {
//   console.log(timeLimitedCache.get(1)) // -1
// }, 200)
// // Exmple 3
// console.log(timeLimitedCache.set(1, 'test1', 200)) // false
// console.log(timeLimitedCache.set(2, 'test2', 400)) // false
// console.log(timeLimitedCache.count()) // 2
// setTimeout(() => {
//   console.log(timeLimitedCache.count()) // 1
// }, 300)

// 2649. Nested Array Generator, Medium
/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function* (arr) {
  const flatArr = []

  function flatting(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flatting(arr[i])
      } else {
        flatArr.push(arr[i])
      }
    }
  }
  flatting(arr)

  for (let i = 0; i < flatArr.length; i++) {
    yield flatArr[i]
  }
}
// const gen = inorderTraversal([1, [2, 3]])
// const gen = inorderTraversal([[[[[]]]]])
// console.log(gen.next().value) // 1
// console.log(gen.next().value) // 2
// console.log(gen.next().value) // 3

// 2625. Flatten Deeply Nested Array, Medium
/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
  if (n === 0) return arr

  const newArr = []
  let count = 0

  function flatting(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && count < n) {
        // Don't let go inside more times than `count`
        count++
        flatting(arr[i])
      } else {
        newArr.push(arr[i])
      }
    }
    count--
  }
  flatting(arr)

  return newArr
}
// ;(arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]), (n = 1)
// console.log(flat(arr, n)) // Output [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]

// 2693. Call Function with Custom Context, Medium
/**
 * @param {Object} context
 * @param {Array} args
 * @return {null|boolean|number|string|Array|Object}
 */
Function.prototype.callPolyfill = function (context, ...args) {
  return this.bind(context)(...args)
}
// //prettier-ignore
// function increment() {return ++this.count}
// console.log(increment.callPolyfill({ count: 1 })) //2
// function tax(price, taxRate) {
//   const totalCost = price * (1 + taxRate)
//   console.log(`The cost of ${this.item} is ${totalCost}`)
// }
// console.log(tax.callPolyfill({ item: 'burger' }, 10, 1.1))

// 35. Search Insert Position, Easy
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let tmp = nums.indexOf(target)
  if (tmp === -1) {
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > target) return i
      if (i === nums.length - 1) return i + 1
    }
  } else {
    return tmp
  }
}
// let nums = [1, 3, 5, 6], target = 5 //2
// let nums = [1, 3, 5, 6],target = 2 // 1
// let nums = [1, 3, 5, 6], target = 7 //4
// console.log(searchInsert(nums, target))

// 70. Climbing Stairs, Easy
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // https://leetcode.com/problems/climbing-stairs/solutions/2810612/4-ways-to-solve-with-detailed-diagrams-no-memoization-beats-100-time-memory/
  // ways to reach given step = ways to reach last step + ways to reach second-last step

  let step = 1
  let previousStep = 0

  for (let i = 0; i < n; i++) {
    // ;[previousStep, step] = [step, previousStep + step]
    let tmp = previousStep
    previousStep = step
    step = tmp + step
  }

  return step
}
// console.log(climbStairs(1)) // 1
// console.log(climbStairs(2)) // 2
// console.log(climbStairs(3)) // 3
// console.log(climbStairs(4)) // 5
// console.log(climbStairs(5)) // 8

// 260. Single Number III, Medium
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      if (map.get(nums[i]).length < 1) map.get(nums[i]).push(nums[i])
      if (map.get(nums[i]).length === 1) map.delete(nums[i])
    } else {
      map.set(nums[i], [])
    }
  }

  // Destructure map iterator object
  const result = [...map.keys()]
  return result
}
// console.log(singleNumber([1, 2, 1, 3, 2, 5]))

// 83. Remove Duplicates from Sorted List, Easy
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  if (!head || head.next === null) return head

  let dummy = head

  while (dummy.next) {
    if (dummy.val === dummy.next.val) {
      dummy.next = dummy.next.next
    } else {
      dummy = dummy.next
    }
  }

  return head
}
// const head = arrayToLinkedList([1, 1, 2])
// const head2 = arrayToLinkedList([1,1,2,3,3])
// console.log(deleteDuplicates(head)) // Output [1,2]
// console.log(deleteDuplicates(head2)) // Output [1,2,3]

// 171. Excel Sheet Column Number, Easy
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  // Get UTF-16 code (ASCII table) value, by subtracting all characters before UPPERCASE UTF-16 index
  // I.e. 31 characters are reserved, so we start from ' ' (space) what correspond to 32
  // ' ' -> 32, '0' -> 48, 'A' -> 65, 'a' -> 97
  // So 'A' at 65 index minus 64 = 1, we got starting value to count from
  // Now simply count as it's base 26 integers that we should calculate

  let result = 0
  // Reverse string to start count from end
  columnTitle = columnTitle.split('').reverse().join('')

  for (let i = 0; i < columnTitle.length; i++) {
    // result += (columnTitle.charCodeAt(i) - 64) * Math.pow(26, i)
    let char = columnTitle.charCodeAt(i) - 64
    let pow = Math.pow(26, i)
    result += char * pow
  }
  return result
}
// console.log(titleToNumber('A')) // Output: 1
// console.log(titleToNumber('AB')) // Output: 28
// console.log(titleToNumber('ZY')) // Output: 701
// console.log(titleToNumber('AAE')) // Output: 707
