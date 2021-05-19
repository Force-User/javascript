import { getData } from './modules/api.js';
import { setDisableInput, setActiveInput } from './modules/statesFields.js';

const form = document.querySelector('.form');
const baseSelect = document.querySelector('#baseSelect');
const symbolSelect = document.querySelector('#symbolSelect');
const baseInput = document.querySelector('#baseValue');
const symbolInput = document.querySelector('#symbolValue');
let ratesData = null;

const createOptionElement = (value) => {
	const option = document.createElement('option');
	option.textContent = value;
	return option;
};

form.addEventListener('input', (e) => {
	if (e.target === baseInput || e.target === symbolSelect) {
		return import('./modules/convert.js').then((dynamicImport) => {
			dynamicImport.convert(ratesData, symbolInput, baseInput);
		});
	}

	if (e.target === baseSelect) {
		setDisableInput(baseInput, symbolInput);
		getData(baseSelect.value).then((data) => {
			ratesData = data.rates;
			setActiveInput(baseInput, symbolInput);
			import('./modules/convert.js').then((dynamicImport) => {
				dynamicImport.convert(ratesData, symbolInput, baseInput);
			});
		});
	}
});

setDisableInput(baseInput, symbolInput);
getData().then((data) => {
	ratesData = data.rates;
	const ratesKeys = Object.keys(data.rates);
	const symbolElements = ratesKeys.map((key) => createOptionElement(key));
	const baseElements = ratesKeys.map((key) => createOptionElement(key));
	baseSelect.append(...baseElements);
	symbolSelect.append(...symbolElements);
	baseSelect.value = data.base;
	setActiveInput(baseInput,symbolInput);
}).catch(err => console.log(err));
