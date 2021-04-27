const getRandomInt = (min = 1100, max = 2000) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getSum = (...numbers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(numbers.reduce((acum, number) => acum + number, 0));
    }, getRandomInt());
  });
};
const getMinus = (...numbers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(numbers.reduce((acum, number) => acum - number));
    }, getRandomInt());
  });
};
const getMulti = (...numbers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(numbers.reduce((acum, number) => acum * number));
    }, getRandomInt());
  });
};
const getDil = (...numbers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(numbers.reduce((acum, number) => acum / number));
    }, getRandomInt());
  });
};
const getNumbers = (elements) => {
  const numbers = [];
  elements.every((element) => !isNaN(element) && numbers.push(Number(element)));
  return numbers;
};
const getSymbol = (elements) => {
  let symbol = null;
  elements.every((element) => {
    if (!isNaN(element)) return true;
    symbol = element;
  });
  return symbol;
};
const updateElements = (elements, numbers) => {
  return elements
    .filter((el, index) => (index > numbers.length ? true : false))
    .join(" ");
};
const getResultReversePolishNotation = async (notation) => {
  const elements = notation.split(" ");
  const numbers = getNumbers(elements);
  const symbol = getSymbol(elements);
  const newElements = updateElements(elements, numbers, symbol);
  switch (symbol) {
    case "+":
      return await getResultReversePolishNotation(
        `${await getSum(...numbers)} ${newElements}`
      );
    case "*":
      return await getResultReversePolishNotation(
        `${await getMulti(...numbers)} ${newElements}`
      );
    case "-":
      return await getResultReversePolishNotation(
        `${await getMinus(...numbers)} ${newElements}`
      );
    case "/":
      return await getResultReversePolishNotation(
        `${await getDil(...numbers)} ${newElements}`
      );
    default:
      return elements[0];
  }
};
getResultReversePolishNotation("1 2 + 3 * 4 +").then((res) => console.log(res));
