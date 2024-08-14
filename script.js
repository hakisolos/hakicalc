// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
});
moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';

// Calculator functionality
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let displayValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (value === '=') {
            try {
                displayValue = eval(displayValue);
                if (isNaN(displayValue)) {
                    displayValue = 'Error';
                }
            } catch {
                displayValue = 'Error';
            }
        } else if (value === 'C') {
            displayValue = '';
        } else if (value === 'DEL') {
            displayValue = displayValue.slice(0, -1);
        } else if (['Math.sin', 'Math.cos', 'Math.tan', 'Math.log'].includes(value)) {
            displayValue += `${value}(`;
        } else {
            displayValue += value;
        }

        display.value = displayValue;
    });
});

// Clear and Delete button functionalities
document.getElementById('clear').addEventListener('click', () => {
    displayValue = '';
    display.value = '';
});

document.getElementById('delete').addEventListener('click', () => {
    displayValue = displayValue.slice(0, -1);
    display.value = displayValue;
});

// Currency converter functionality
const convertButton = document.getElementById('convert');
const conversionResult = document.getElementById('conversion-result');

convertButton.addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('currency-from').value;
    const toCurrency = document.getElementById('currency-to').value;

    if (amount === '' || isNaN(amount)) {
        conversionResult.textContent = 'Please enter a valid amount.';
        return;
    }

    try {
        // Replace 'YOUR-API-KEY' with your actual API key
        const response = await fetch(`https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === 'success') {
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            conversionResult.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            conversionResult.textContent = 'Conversion failed. Please try again later.';
        }
    } catch (error) {
        conversionResult.textContent = 'Error fetching conversion rate. Please try again later.';
    }
});
