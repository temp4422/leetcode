/*****************************************************************************/
/******************** 30 Days of JavaScript **********************************/
/*****************************************************************************/
// https://leetcode.com/studyplan/30-days-of-javascript/

// Closures
/*****************************************************************************/
// 2667. Create Hello World Function, Easy
/**
 * @return {Function}
 */
var createHelloWorld = function () {
  return function (...args) {
    return 'Hello World'
  }
}
// args = [] // Output: "Hello World"
// args = [{}, null, 42] // Output: "Hello World"
// const f = createHelloWorld()
// console.log(f())

// 2620. Counter, Easy
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
// n = 10 // Output: [10,11,12]
// n = -2 // Output: [-2,-1,0,1,2]
// const counter = createCounter(n)
// console.log(counter()) // 10
// console.log(counter()) // 11

// 2704. To Be Or Not To Be, Easy
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
// func = () => expect(5).toBe(5) // Output: {"value": true}
// func = () => expect(5).toBe(null) // Output: {"error": "Not Equal"}
// func = () => expect(5).notToBe(null) // Output: {"value": true}
// console.log(expect(5).toBe(5)) // true
// console.log(expect(5).notToBe(5)) // throws "Equal"

// 2665. Counter II, Easy
/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function (init) {
  const val = init
  let tmp = val

  //prettier-ignore
  return {
    increment() {return ++tmp},
    decrement() {return --tmp},
    reset() {return tmp = val},
  }
}
// ;(init = 5), (calls = ['increment', 'reset', 'decrement']) // Output: [6,5,4]
// ;(init = 0), (calls = ['increment', 'increment', 'decrement', 'reset', 'reset']) // Output: [1,2,1,0,0]
// const counter = createCounter(5)
// console.log(counter.increment()) // 6
// console.log(counter.reset()) // 5
// console.log(counter.decrement()) // 4

// Basic Array Transformations
/*****************************************************************************/
// 2635. Apply Transform Over Each Element in Array, Easy
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
//prettier-ignore
// arr = [1,2,3], fn = function plusone(n) { return n + 1; } //Output: [2,3,4]
//prettier-ignore
// arr = [1,2,3], fn = function plusI(n, i) { return n + i; } //Output: [1,3,5]
//prettier-ignore
// arr = [10,20,30], fn = function constant() { return 42; } //Output: [42,42,42]
// console.log(map(arr, fn))

// 2634. Filter Elements from Array, Easy
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
//prettier-ignore
// arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; } // Output: [20,30]
//prettier-ignore
// arr = [1,2,3], fn = function firstIndex(n, i) { return i === 0; } // Output: [1]
//prettier-ignore
// arr = [-2,-1,0,1,2], fn = function plusOne(n) { return n + 1 } // Output: [-2,0,1,2]
// console.log(filter(arr, fn))

// 2626. Array Reduce Transformation, Easy
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
  let arrX = []
  let tmp = init

  for (let i = 0; i < nums.length; i++) {
    tmp = fn(tmp, nums[i])
    arrX.push(tmp)
  }

  return tmp
}
//prettier-ignore
// nums = [1,2,3,4], fn = function sum(accum, curr) { return accum + curr; }, init = 0 //Output: 10
//prettier-ignore
// nums = [1,2,3,4], fn = function sum(accum, curr) { return accum + curr * curr; }, init = 100 //Output: 130
//prettier-ignore
// nums = [], fn = function sum(accum, curr) { return 0; }, init = 25 //Output: 25
// console.log(reduce(nums, fn, init))

// Function Transformations
/*****************************************************************************/
// 2629. Function Composition, Easy
/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    // Declare 'result' variable to store output from functions and initialize it with argument from 'fn' function
    let result = x
    // Loop through array of functions from end to start
    for (let i = functions.length - 1; i >= 0; i--) {
      // Apply function to output of another function and save in result variable
      result = functions[i](result)
    }
    return result
  }
}
// const functions = [(x) => x + 1, (x) => x * x, (x) => 2 * x], x = 4 // Output: 65
// const functions = [(x) => 10 * x, (x) => 10 * x, (x) => 10 * x], x = 1 // Output: 1000
// const functions = [], x = 42 // Output: 42
// const fn = compose([(x) => x + 1, (x) => 2 * x])
// const fn = compose(functions)
// console.log(fn(x)) // 9

// 2703. Return Length of Arguments Passed, Easy, Companies
/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
var argumentsLength = function (...args) {
  return [...args].length
}
// args = [5] // Output: 1
// args = [{}, null, '3'] // Output: 3
// console.log(argumentsLength(args)) // 3

// 2666. Allow One Function Call, Easy
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
//prettier-ignore
// fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]] // Output: [{"calls":1,"value":6}]
// prettier-ignore
// fn = (a,b,c) => (a * b * c), calls = [[5,7,4],[2,3,6],[4,6,8]] // Output: [{"calls":1,"value":140}]
// let fn = (a, b, c) => a + b + c
// let onceFn = once(fn)
// console.log(onceFn(1, 2, 3)) // 6
// console.log(onceFn(2, 3, 6)) // returns undefined without calling fn

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

// Promises and Time
/*****************************************************************************/
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

// 2621. Sleep, Easy
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
// async function sleep(timeout) {
//   await new Promise((resolve) => setTimeout(resolve, timeout))
// }
//
// // v2 Oneline
// const sleep = async (timeout) => new Promise((resolve) => setTimeout(() => resolve(timeout), timeout))
// // v3 Oneline shortenting setTimeout()
// const sleep = async (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))
//
// let timeout = 100
// let t = Date.now()
// sleep(timeout).then(() => console.log(Date.now() - t)) // 100

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
// const fn = (x) => x * 5, args = [2], t = 20, cancelT = 50 // Output: [{"time": 20, "returned": 10}]
// const fn = (x) => x ** 2, args = [2], t = 100, cancelT = 50 // Output: []
// const fn = (x1, x2) => x1 * x2, args = [2, 4], t = 30, cancelT = 100 // Output: [{"time": 30, "returned": 8}]
// const result = []
// const fn = (x) => x * 5
// const args = [2],
//   t = 20,
//   cancelT = 50
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
var cancellable = function (fn, args, t) {
  fn(...args)
  const intervalID = setInterval(() => fn(...args), t)
  const cancelFn = () => clearInterval(intervalID)
  return cancelFn
}

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
//
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

// 2627. Debounce, Medium
/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
  let timeoutId

  return function (...args) {
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

// 2721. Execute Asynchronous Functions in Parallel, Medium
/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
  // The aim is to replicate the functionality of JavaScript's built-in Promise.all()
  return new Promise((resolve, reject) => {
    const results = new Array(functions.length) // Create empty array that will hold results
    let count = 0 // Count fulfilled promises

    // All functions inside forEach must be `async`
    functions.forEach(async (fn, i) => {
      try {
        results[i] = await fn() // Save result of async function inside our array
        count++
        if (count === functions.length) resolve(results) // If all promises are fulfilled, return resolve() with all results
      } catch (error) {
        reject(error) // If we meet rejected promise, catch will be called, so we return this
      }
    })
  })

  // Alternative
  // Execute all functions with map() method: `functions.map((f) => f())` inside Promise.all method
  // return Promise.all(functions.map((f) => f()))
}
// const functions = [() => new Promise((resolve) => setTimeout(() => resolve(5), 200))] //Output: {"t": 200, "resolved": [5]}
// const functions = [
//   () => new Promise((resolve) => setTimeout(() => resolve(4), 50)),
//   () => new Promise((resolve) => setTimeout(() => resolve(10), 150)),
//   () => new Promise((resolve) => setTimeout(() => resolve(16), 100)),
// ]
// const functions = [
//   () => new Promise((resolve) => setTimeout(() => resolve(1), 200)),
//   () => new Promise((resolve, reject) => setTimeout(() => reject('Error'), 100)),
// ]
// console.log(await promiseAll(functions))

// JSON
/*****************************************************************************/
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

// 2677. Chunk Array, Easy
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
// ;(arr = [1, 2, 3, 4, 5]), (size = 1) // Output: [[1],[2],[3],[4],[5]]
// ;(arr = [1, 9, 6, 3, 2]), (size = 3) // Output: [[1,9,6],[3,2]]
// ;(arr = [8, 5, 3, 2, 6]), (size = 6) // Output: [[8,5,3,2,6]]
// ;(arr = []), (size = 1) // Output: []
// console.log(chunk(arr, size))

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

// # 2722. Join Two Arrays by ID, Medium

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

// # 2705. Compact Object, Medium

// Classes
/*****************************************************************************/
// # 2694. Event Emitter, Medium

// 2695. Array Wrapper, Easy
// v1 es6 Class Syntax
class ArrayWrapper {
  constructor(nums) {
    this.nums = nums
  }
  // override the default behavior of valueOf() and toString()
  valueOf() {
    return this.nums.reduce((a, c) => a + c, 0)
  }
  toString() {
    return `[${this.nums.join()}]`
  }
}
//
// v2 es5 Prototypal Inheritance
// /**
//  * @param {number[]} nums
//  * @return {void}
//  */
// var ArrayWrapper = function (nums) {
//   this.nums = nums
// }
// /**
//  * @return {number}
//  */
// ArrayWrapper.prototype.valueOf = function () {
//   return this.nums.reduce((a, c) => a + c, 0)
// }
// /**
//  * @return {string}
//  */
// ArrayWrapper.prototype.toString = function () {
//   return `[${this.nums.join()}]`
// }
//
// v3 Alternative TypeScript
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
//prettier-ignore
// const nums = [[1, 2],[3, 4],], operation = 'Add' // Output: 10
// const nums = [[23, 98, 42, 70]], operation = 'String' // Output: "[23,98,42,70]"
// const nums = [[], []], operation = 'Add' // Output: 0
// const obj1 = new ArrayWrapper([1, 2])
// const obj2 = new ArrayWrapper([3, 4])
// console.log(obj1 + obj2) // 10
// console.log(String(obj1)) // "[1,2]"
// console.log(String(obj2)) // "[3,4]"
//
// Explanation https://leetcode.com/problems/array-wrapper/solutions/3584650/2695-array-wrapper-level-up-your-js-skills-with-these-intuitive-implementations-day-28/
/*
  The valueOf method is defined on the prototype of the ArrayWrapper class. This method is automatically called when the instance is used in a context where a primitive value is expected, such as addition with the + operator.

  The toString method is also defined on the prototype of the ArrayWrapper class. This method is automatically called when the instance is converted to a string, such as when using String(obj) or implicitly during string concatenation.
*/

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

// Summarize Your 30-day Journey with Bonus Challenges!
/*****************************************************************************/
