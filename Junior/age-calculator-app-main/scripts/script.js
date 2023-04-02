const submitButton = document.querySelector('#submitButton');
const inputs = document.querySelectorAll('.input');
const errorMessages = document.querySelectorAll('.error-msg');
const day = document.querySelector('#input-day');
const month = document.querySelector('#input-month');
const year = document.querySelector('#input-year');
const yearNumber = document.querySelector('#year-number');
const monthNumber = document.querySelector('#month-number');
const dayNumber = document.querySelector('#day-number');

const validRequired = () => {
	inputs.forEach((input, index) => {
		errorMessages[index].style.display = 'none';
		errorMessages[index].textContent = 'This field is required';

		if (!input.value.trim()) {
			input.style.border = '1px solid red';
			errorMessages[index].style.display = 'block';
			input.previousElementSibling.style.color = 'red';
		} else {
			input.style.border = '1px solid hsl(0, 0%, 86%)';
			input.previousElementSibling.style.color = 'hsl(0, 1%, 44%)';
		}
	});

	return !Array.from(inputs).some((input) => !input.value.trim());
};

const validInputs = () => {
	const currentYear = new Date().getFullYear();
	let isValid = true;

	inputs.forEach((input, index) => {
		const inputId = input.id;
		const inputValue = parseInt(input.value);
		const errorElement = errorMessages[index];
		const labelElement = input.previousElementSibling;

		if (inputId === 'input-day' && (inputValue < 1 || inputValue > 31)) {
			showError(input, errorElement, 'Must be a valid day', labelElement);
			isValid = false;
		} else if (inputId === 'input-month' && (inputValue < 1 || inputValue > 12)) {
			showError(input, errorElement, 'Must be a valid month', labelElement);
			isValid = false;
		} else if (inputId === 'input-year' && inputValue > currentYear) {
			showError(input, errorElement, 'Must be in the past', labelElement);
			isValid = false;
		} else {
			showSuccess(input, labelElement);
		}
	});

	return isValid;
};

const validDate = () => {
	const daysInMonth = new Date(year.value, month.value, 0).getDate();

	let isValid = true;

	if (day.value > daysInMonth) {
		showError(day, errorMessages[0], 'Must be a valid date', day.previousElementSibling);
		isValid = false;
	} else {
		showSuccess(day, day.previousElementSibling);
	}

	return isValid;
};

const showError = (input, errorElement, message, labelElement) => {
	input.style.border = '1px solid red';
	errorElement.style.display = 'block';
	errorElement.textContent = message;
	labelElement.style.color = 'red';
};

const showSuccess = (input, labelElement) => {
	input.style.border = '1px solid hsl(0, 0%, 86%)';
	labelElement.style.color = 'hsl(0, 1%, 44%)';
};

const calculate = () => {
	const birthday = new Date(`${year.value}-${month.value}-${day.value}`);
	const today = new Date();
	let diffInYears = today.getFullYear() - birthday.getFullYear();

	const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
	if (today < thisYearBirthday) {
		diffInYears--;
	}

	const diffInMonths = today.getMonth() - birthday.getMonth() + 12 * diffInYears;
	const diffInDays = Math.floor((today - birthday) / (1000 * 60 * 60 * 24));

	yearNumber.textContent = diffInYears;
	monthNumber.textContent = diffInMonths;
	dayNumber.textContent = diffInDays;
};

submitButton.addEventListener('click', (e) => {
	e.preventDefault();

	if (!validRequired()) return;
	if (!validInputs()) return;
	if (!validDate()) return;

	calculate();
});
