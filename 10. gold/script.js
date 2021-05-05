const form = document.querySelector(".form");
const baseSelect = document.querySelector("#baseSelect");
const symbolSelect = document.querySelector("#symbolSelect");
const baseInput = document.querySelector("#baseValue");
const symbolInput = document.querySelector("#symbolValue");
let ratesData = null;
const createOptionElement = (value) => {
  const option = document.createElement("option");
  option.textContent = value;
  return option;
};
const setDisableInput = () => {
  baseInput.disabled = true;
  baseInput.placeholder = "Loading...";
  symbolInput.value = "";
  symbolInput.placeholder = "Loading...";
};
const setActiveInput = () => {
  baseInput.placeholder = "Base";
  baseInput.disabled = false;
  symbolInput.placeholder = "Symbol";
};
const convert = () => {
  const currentRate = ratesData[symbolSelect.value];
  symbolInput.value = (currentRate * baseInput.value).toFixed(3);
};
const getData = (base = "USD") => {
  return fetch(
    `https://api.ratesapi.io/api/latest?access_key=6a923b27d388ad15283a17eb2db960c5&base=${base}`
  )
    .then((response) => {
      if (response.ok) return response.json();
      throw "Request failed";
    })
    .catch((err) => alert(err));
};

form.addEventListener("input", (e) => {
  if (e.target === baseInput || e.target === symbolSelect) return convert();
  if (e.target === baseSelect) {
    setDisableInput();
    getData(baseSelect.value).then((data) => {
      ratesData = data.rates;
      setActiveInput();
      convert();
    });
  }
});

setDisableInput();
getData().then((data) => {
  ratesData = data.rates;
  const ratesKeys = Object.keys(data.rates);
  const symbolElements = ratesKeys.map((key) => createOptionElement(key));
  const baseElements = ratesKeys.map((key) => createOptionElement(key));
  baseSelect.append(...baseElements);
  symbolSelect.append(...symbolElements);
  baseSelect.value = data.base;
  setActiveInput();
});
