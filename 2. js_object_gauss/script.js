const numbersArray = createNumbersArray(10, randn_bm);
const objectGauss = createObjectGauss(numbersArray);
printSolution(objectGauss);
function randn_bm() {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return (Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 2) | 0;
}
function createNumbersArray(size, callback) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(callback());
  }
  return array.sort();
}
function createObjectGauss(arr) {
  const obj = {};
  let currentNumber = null;
  arr.forEach((item) => {
    if (!obj[item]) {
      currentNumber = item;
      obj[item] = 1;
    } else if (item === currentNumber) {
      obj[item]++;
    }
  });
  return obj;
}
function printSolution(obj) {
  let strOriginal = "|";
  for (key in obj) {
    strOriginal += `${key}|`;
  }
  strOriginal += "\n|";
  for (key in obj) {
    strOriginal += 
    `${key.length > 1 ? " ".repeat(key.length - 1) : ""}${obj[key]}|`;
  }
  console.log(array);
  console.log(obj);
  console.log(strOriginal);
}
