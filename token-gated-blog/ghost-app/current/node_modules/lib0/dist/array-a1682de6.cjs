'use strict';

var set = require('./set-0f209abb.cjs');

/**
 * Utility module to work with Arrays.
 *
 * @module array
 */

/**
 * Return the last element of an array. The element must exist
 *
 * @template L
 * @param {ArrayLike<L>} arr
 * @return {L}
 */
const last = arr => arr[arr.length - 1];

/**
 * @template C
 * @return {Array<C>}
 */
const create = () => /** @type {Array<C>} */ ([]);

/**
 * @template D
 * @param {Array<D>} a
 * @return {Array<D>}
 */
const copy = a => /** @type {Array<D>} */ (a.slice());

/**
 * Append elements from src to dest
 *
 * @template M
 * @param {Array<M>} dest
 * @param {Array<M>} src
 */
const appendTo = (dest, src) => {
  for (let i = 0; i < src.length; i++) {
    dest.push(src[i]);
  }
};

/**
 * Transforms something array-like to an actual Array.
 *
 * @function
 * @template T
 * @param {ArrayLike<T>|Iterable<T>} arraylike
 * @return {T}
 */
const from = Array.from;

/**
 * True iff condition holds on every element in the Array.
 *
 * @function
 * @template ITEM
 * @template {ArrayLike<ITEM>} ARR
 *
 * @param {ARR} arr
 * @param {function(ITEM, number, ARR):boolean} f
 * @return {boolean}
 */
const every = (arr, f) => {
  for (let i = 0; i < arr.length; i++) {
    if (!f(arr[i], i, arr)) {
      return false
    }
  }
  return true
};

/**
 * True iff condition holds on some element in the Array.
 *
 * @function
 * @template S
 * @template {ArrayLike<S>} ARR
 * @param {ARR} arr
 * @param {function(S, number, ARR):boolean} f
 * @return {boolean}
 */
const some = (arr, f) => {
  for (let i = 0; i < arr.length; i++) {
    if (f(arr[i], i, arr)) {
      return true
    }
  }
  return false
};

/**
 * @template ELEM
 *
 * @param {ArrayLike<ELEM>} a
 * @param {ArrayLike<ELEM>} b
 * @return {boolean}
 */
const equalFlat = (a, b) => a.length === b.length && every(a, (item, index) => item === b[index]);

/**
 * @template ELEM
 * @param {Array<Array<ELEM>>} arr
 * @return {Array<ELEM>}
 */
const flatten = arr => arr.reduce((acc, val) => acc.concat(val), []);

const isArray = Array.isArray;

/**
 * @template T
 * @param {Array<T>} arr
 * @return {Array<T>}
 */
const unique = arr => from(set.from(arr));

/**
 * @template T
 * @template M
 * @param {ArrayLike<T>} arr
 * @param {function(T):M} mapper
 * @return {Array<T>}
 */
const uniqueBy = (arr, mapper) => {
  /**
   * @type {Set<M>}
   */
  const happened = set.create();
  /**
   * @type {Array<T>}
   */
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    const mapped = mapper(el);
    if (!happened.has(mapped)) {
      happened.add(mapped);
      result.push(el);
    }
  }
  return result
};

var array = /*#__PURE__*/Object.freeze({
  __proto__: null,
  last: last,
  create: create,
  copy: copy,
  appendTo: appendTo,
  from: from,
  every: every,
  some: some,
  equalFlat: equalFlat,
  flatten: flatten,
  isArray: isArray,
  unique: unique,
  uniqueBy: uniqueBy
});

exports.appendTo = appendTo;
exports.array = array;
exports.copy = copy;
exports.create = create;
exports.equalFlat = equalFlat;
exports.every = every;
exports.flatten = flatten;
exports.from = from;
exports.isArray = isArray;
exports.last = last;
exports.some = some;
exports.unique = unique;
exports.uniqueBy = uniqueBy;
//# sourceMappingURL=array-a1682de6.cjs.map
