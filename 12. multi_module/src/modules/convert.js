export const convert = (ratesData,symbolInput,baseInput) => {
	const currentRate = ratesData[symbolSelect.value];
	symbolInput.value = (currentRate * baseInput.value).toFixed(3);
};