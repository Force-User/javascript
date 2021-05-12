"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var form = document.querySelector(".form");
var baseSelect = document.querySelector("#baseSelect");
var symbolSelect = document.querySelector("#symbolSelect");
var baseInput = document.querySelector("#baseValue");
var symbolInput = document.querySelector("#symbolValue");
var ratesData = null;

var createOptionElement = function createOptionElement(value) {
  var option = document.createElement("option");
  option.textContent = value;
  return option;
};

var setDisableInput = function setDisableInput() {
  baseInput.disabled = true;
  baseInput.placeholder = "Loading...";
  symbolInput.value = "";
  symbolInput.placeholder = "Loading...";
};

var setActiveInput = function setActiveInput() {
  baseInput.placeholder = "Base";
  baseInput.disabled = false;
  symbolInput.placeholder = "Symbol";
};

var convert = function convert() {
  var currentRate = ratesData[symbolSelect.value];
  symbolInput.value = (currentRate * baseInput.value).toFixed(3);
};

var getData = function getData() {
  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "USD";
  return fetch("https://api.ratesapi.io/api/latest?access_key=6a923b27d388ad15283a17eb2db960c5&base=".concat(base)).then(function (response) {
    if (response.ok) return response.json();
    throw "Request failed";
  })["catch"](function (err) {
    return alert(err);
  });
};

form.addEventListener("input", function (e) {
  if (e.target === baseInput || e.target === symbolSelect) return convert();

  if (e.target === baseSelect) {
    setDisableInput();
    getData(baseSelect.value).then(function (data) {
      ratesData = data.rates;
      setActiveInput();
      convert();
    });
  }
});
setDisableInput();
getData().then(function (data) {
  ratesData = data.rates;
  var ratesKeys = Object.keys(data.rates);
  var symbolElements = ratesKeys.map(function (key) {
    return createOptionElement(key);
  });
  var baseElements = ratesKeys.map(function (key) {
    return createOptionElement(key);
  });
  baseSelect.append.apply(baseSelect, _toConsumableArray(baseElements));
  symbolSelect.append.apply(symbolSelect, _toConsumableArray(symbolElements));
  baseSelect.value = data.base;
  setActiveInput();
});