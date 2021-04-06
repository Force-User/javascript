const array = [
  47,46,48,31,63,47,36,48,36,49,50,31,50,59,63,
  38,35,31,50,59,63,45,36,46,38,40,35,31,45,45,
  58,53,63,47,46,35,31,48,42,46,33,63,46,50,63,
  38,40,39,45,40,63,31,63,49,31,44,46,44,51,63,
  35,36,43,31,50,59,63,38,40,39,45,59,
];

printMostRepeatLetters(findRepeatLettersNumber(array));
console.log(getEncryptedText(array));

function findRepeatLettersNumber(array) {
  const map = new Map();
  for (let item of array) {
    map.has(item) ? map.set(item, map.get(item) + 1) : map.set(item, 1);
  }
  return getMostRepeatLetters(sortRepeatLetters(map));
}
function sortRepeatLetters(map) {
  return Array.from(map.entries()).sort((a, b) => (a[1] < b[1] ? 1 : -1));
}
function getMostRepeatLetters(arr) {
  return arr.filter((item, index, arr) => {
    if (item[1] !== arr[index + 1][1]) {
      return true;
    } else {
      arr.splice(index);
    }
  });
}
function printMostRepeatLetters(map) {
  const alphabet = `абвгдеёжзийклмнопрстуфхцчшщыьэюя `;
  console.group();
  for (item of map) {
    console.log(
      `Value ${item[0]} repeats ${item[1]}: letter - [${alphabet[item[0] - 31]}]`
    );
  }
  console.groupEnd();
}
function getEncryptedText(arrayCode) {
  const alphabet = `абвгдеёжзийклмнопрстуфхцчшщыьэюя `;
  return arrayCode.map((item) => alphabet[item - 31]).join("");
}
