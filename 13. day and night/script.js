const checkUserName = () => {
	if (localStorage.getItem('userName')) {
		form.classList.add('form--hidde');
		greatText.classList.add('great__text--show');
		greatText.textContent = `Hello ${localStorage.getItem('userName')}!`;
	}
};
const checkTheme = () => {
	if (localStorage.getItem('theme') === 'true') {
		appContainer.classList.add('app--night');
		input.checked = true;
	}
};

const appContainer = document.querySelector('.app');
const greatText = appContainer.querySelector('.great__text');
const switcher = appContainer.querySelector('.switch');
const input = switcher.querySelector('.check');
const form = appContainer.querySelector('.form');
const formInput = form.querySelector('.form-label__input');

checkUserName();
checkTheme();

switcher.addEventListener('click', (e) => {
	const elem = e.target.closest('input');
	if (elem) {
		localStorage.setItem('theme', elem.checked);
		appContainer.classList.toggle('app--night');
	}
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	localStorage.setItem('userName', formInput.value);
    formInput.value = '';
	checkUserName();
});
