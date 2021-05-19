export const setDisableInput = (baseInput, symbolInput) => {
	baseInput.disabled = true;
	baseInput.placeholder = 'Loading...';
	symbolInput.value = '';
	symbolInput.placeholder = 'Loading...';
};
export const setActiveInput = (baseInput, symbolInput) => {
	baseInput.placeholder = 'Base';
	baseInput.disabled = false;
	symbolInput.placeholder = 'Symbol';
};
