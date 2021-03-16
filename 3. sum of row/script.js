const findeMinMaxSum = findSum();
console.group();
console.log(findeMinMaxSum(10, 2));
console.log(findeMinMaxSum(10, "5"));
console.log(findeMinMaxSum(10, 5));
console.log(findeMinMaxSum(10, Infinity));
console.log(findeMinMaxSum(10, "12w"));
console.log(findeMinMaxSum(100, 1));
console.groupEnd();

function findSum() {
  const cache = {};

  return (min, max) => {
    if (min > max) {
      [min, max] = [max, min];
    }
    const stringArguments = `${min} ${max}`;
    if (!cache[stringArguments]) {
      cache[stringArguments] = (Number(min) + Number(max)) * (max / 2);
    }

    switch (true) {
      case cache[stringArguments] > Number.MAX_SAFE_INTEGER:
        console.error("The maximum integer number has been exceeded");
        break;
      case Number.isNaN(cache[stringArguments]):
        console.error("Invalid number");
        break;
      default:
        return cache[stringArguments];
    }
  };
}
