const calculator = {
    displayValue: '0',   // Display value shown on the screen
    firstOperand: null,  // First operand for the operation
    waitingForSecondOperand: false, // Flag to check if the second operand is being entered
    operator: null,      // Current operator (+, -, *, /)
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    // Check if we are waiting for the second operand
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;  // Replace the display with the new digit
        calculator.waitingForSecondOperand = false;
    } else {
        // Append digit to the display value
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    // Prevent multiple decimals being added
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);  // Convert the string to a number

    if (operator && calculator.waitingForSecondOperand) {
        // If operator is clicked after entering the first number but before entering the second, replace the operator
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        // If firstOperand is not yet set, set it now
        calculator.firstOperand = inputValue;
    } else if (operator) {
        // Calculate the result if there's already an operator
        const result = calculate(firstOperand, inputValue, operator);

        // Store the result in displayValue and update firstOperand
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;  // Now, waiting for the second operand
    calculator.operator = nextOperator;         // Set the new operator
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator() {
    // Reset the calculator state
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay() {
    // Update the display screen to show the current display value
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

// Add event listener to all the buttons
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;  // Get the clicked button
    if (!target.matches('button')) {  // Ensure it's a button
        return;
    }

    if (target.classList.contains('operator')) {
        // Handle operator buttons
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        // Handle decimal point
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        // Reset the calculator
        resetCalculator();
        updateDisplay();
        return;
    }

    // Handle number button clicks
    inputDigit(target.value);
    updateDisplay();
});

// Initialize the display on page load
updateDisplay();
