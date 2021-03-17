const findeMinMaxSum = findSum();
console.group();
console.log("1. (10, 2) ", findeMinMaxSum(10, 2));
console.log("2. (1, '5')", findeMinMaxSum(1, "5"));
console.log("3. (1, 5)", findeMinMaxSum(1, 5));
console.log("4. (1, Infinity)", findeMinMaxSum(1, Infinity));
console.log("5. (1, '12w')", findeMinMaxSum(1, "12w"));
console.log("6. (1, {})", findeMinMaxSum(1, {}));
console.log("7. ({}, 1)", findeMinMaxSum({}, 1));
console.log("8. (true, false)", findeMinMaxSum(true, false));
console.log("9. (false, true)", findeMinMaxSum(false, true));
console.log("10. (1, 9007199254740992)", findeMinMaxSum(1, 9007199254740992));
console.log("11. (1, 10071)", findeMinMaxSum(1, 10071));
console.log("12. (-10, -1)", findeMinMaxSum(-10, -1));
console.log("13. (-1, 0)", findeMinMaxSum(-1, 0));
console.log("14. (1, 100)", findeMinMaxSum(1, 100));
console.groupEnd();

function findSum() {
  const cache = {};

  return (min, max) => {
    try {
      checkValue(min, max);
      const stringArguments = `${min} ${max}`;
      if (!cache[stringArguments]) {
        cache[stringArguments] = (min + max) * (max / 2);
      }
      isIntegerSafe(cache[stringArguments]);
      return cache[stringArguments];
    } catch (e) {
      console.error(e);
    }
  };
}

function checkValue(min, max) {
  if (min > max) {
    throw "The minimum value is greater than the maximum";
  } else if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw "Invalid Value";
  }
}

function isIntegerSafe(value) {
  if (value > Number.MAX_SAFE_INTEGER) {
    throw "The maximum iteger number has been exceeded";
  }
}
