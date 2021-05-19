// add function
function add(array) {
    const sum = array.reduce((total,num) => {
        return total + num;
    }, 0);
    const result = checkAndFormatResult(sum);
    return result;
}

// subtract function
function subtract(array) {
    const difference = array.reduce((total,num) => {
        return total - num;
    });
    const result = checkAndFormatResult(difference);
    return result;
}

// divide function
function divide(array) {
    if (array[1] === 0) {
        return `ERROR`;
    }
    const quotient = array.reduce((total,num) => {
        return total / num;
    });
    const result = checkAndFormatResult(quotient);
    return result;
}

// multiply function 
function multiply(array) {
    const product = array.reduce((total,num) => {
        return total * num;
    }, 1);
    const result = checkAndFormatResult(product);
    return result;
}

function checkAndFormatResult(result) {
    const resultCheck = result.toString();
    if (resultCheck.length > calculatorObject.maxDisplayLength && result < 1) {
        return result.toExponential(4);
    } else if (resultCheck.length > calculatorObject.maxDisplayLength && result > 99999) {
        return result.toExponential(4);
    } else if (resultCheck.length > calculatorObject.maxDisplayLength && result < 99999) {
        return result.toFixed(5);
    }
    return result;
}

// operate function
function operate(num1, num2, operator) {
    const inputs = [];
    inputs.push(num1);
    inputs.push(num2);
    if (operator === `add`) {
        return add(inputs);
    } else if (operator === `subtract`) {
        return subtract(inputs);
    } else if (operator === `multiply`) {
        return multiply(inputs);
    } else if (operator === `divide`) {
        return divide(inputs);
    }
}

// create object
const calculatorObject = {
    numbers: [],
    operators: [],
    operatorSelected: false,
    equalsSelected: false,
    digitSelected: false,
    errorThrown: false,
    changeSign: false,
    percentUsed: false,
    multiplyStored: false,
    addStored: false,
    divideStored: false,
    subtractStored: false,
    maxDisplayLength: 13
}

// add listeners to digits
const digits = document.querySelectorAll(`.digit`);
const displayContainer = document.querySelector(`#display-container`);
const display = document.querySelector(`#display`);

digits.forEach((digits) => {
    digits.addEventListener(`click`, () => {
        if (!calculatorObject.errorThrown) {
            if (display.textContent === `0` || !calculatorObject.digitSelected) {
                display.textContent = ``;
            } else if (!calculatorObject.operatorSelected && !calculatorObject.operators[0]) {
                calculatorObject.numbers = [];
                calculatorObject.operators = [];
            }
            calculatorObject.operatorSelected = false;
            calculatorObject.digitSelected = true;
            calculatorObject.equalsSelected = false;
                if (display.textContent.length < 14) {
                    display.textContent += digits.id;
                }
            displayContainer.appendChild(display);
        }
    })
})

// add listeners to operators
const operators = document.querySelectorAll(`.operator`);
operators.forEach((operators) => {
    operators.addEventListener(`click`, () => {
        if (!calculatorObject.errorThrown && display.textContent !== `0.` && display.textContent !== `-` && display.textContent !== `-0.`) {
            if (calculatorObject.percentUsed || calculatorObject.changeSign) { // allows user to change sign or convert percent to decimal after a return using equals fxn
                if (!calculatorObject.operators[0] && calculatorObject.numbers[0]) {
                    calculatorObject.numbers[0] = Number(display.textContent);
                }
            }
            if (!calculatorObject.operators[0] && !calculatorObject.equalsSelected) {
                calculatorObject.numbers.push(Number(display.textContent));
                calculatorObject.operators.push(operators.id);
            } else if (calculatorObject.operators[0] && calculatorObject.numbers[0] && !calculatorObject.operatorSelected) {
                performOperationAndAdjustObject();
                calculatorObject.operators.push(operators.id);
            } else if (!calculatorObject.operators[0] && calculatorObject.numbers[0]) { // this else if works with the equals fxn
                calculatorObject.operators.push(operators.id);
            } else if (display.textContent === `ERROR`) {
                calculatorObject.errorThrown = true;
            }
            calculatorObject.operatorSelected = true;
            calculatorObject.digitSelected = false;
            calculatorObject.percentUsed = false;
            calculatorObject.changeSign = false;
        }
        toggleOperatorSelection();
    })
})

// executes the calculation and adjusts the calculatorObject
function performOperationAndAdjustObject() {
    calculatorObject.numbers.push(Number(display.textContent));
    display.textContent = operate(calculatorObject.numbers[0], calculatorObject.numbers[1], calculatorObject.operators[0]);
    calculatorObject.numbers.shift();
    calculatorObject.numbers[0] = Number(display.textContent);
    calculatorObject.operators.shift();
}

// add listener to equals sign
const equalsButton = document.querySelector(`#equals`);
equalsButton.addEventListener(`click`, () => {
    if (!calculatorObject.errorThrown && display.textContent !== `0.` && display.textContent !== `-` && display.textContent !== `-0.`) {
        if (calculatorObject.numbers.length === 1 && calculatorObject.operators && !calculatorObject.equalsSelected && calculatorObject.digitSelected) {
            performOperationAndAdjustObject();
            calculatorObject.equalsSelected = true;
            calculatorObject.operatorSelected = false;
        } else if (calculatorObject.numbers.length === 2) {
            display.textContent = operate(calculatorObject.numbers[0], calculatorObject.numbers[1], calculatorObject.operators[0]);
            calculatorObject.numbers.shift();
            calculatorObject.numbers[0] = Number(display.textContent);
            calculatorObject.percentUsed = false;
            calculatorObject.changeSign = false;
        } else if (display.textContent === `ERROR`) {
            calculatorObject.errorThrown = true;
        }
        calculatorObject.digitSelected = false;
    }
    toggleOperatorSelection();
})

// add listener to clear all button
const clearAll = document.querySelector(`#clear`);
clearAll.addEventListener(`click`, () => {
    display.textContent = `0`;
    calculatorObject.numbers = [];
    calculatorObject.operators = [];
    calculatorObject.operatorSelected = false;
    calculatorObject.equalsSelected = false;
    calculatorObject.digitSelected = false;
    calculatorObject.errorThrown = false;
    calculatorObject.percentUsed = false;
    calculatorObject.changeSign = false;
    toggleOperatorSelection();
})

// add listener to decimal point
const decimal = document.querySelector(`#decimal`);
decimal.addEventListener(`click`, () => {
    if (!calculatorObject.errorThrown) {
        const decimalCheck = Array.from(display.textContent);
        calculatorObject.digitSelected = true;
        if (!decimalCheck.includes(`.`) && (!calculatorObject.equalsSelected && !calculatorObject.operatorSelected)) {
            display.textContent += decimal.value;
            displayContainer.appendChild(display);
        } else if (display.textContent === `0` || !calculatorObject.digitSelected) {
            display.textContent = `0.`;
        } else if (calculatorObject.operatorSelected || calculatorObject.equalsSelected) {
            display.textContent = `0.`;
        }
    }
})

// add listener to backspace
const backspace = document.querySelector(`#backspace`);
backspace.addEventListener(`click`, () => {
    if (calculatorObject.digitSelected && display.textContent.length >= 1) {
        display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
    }
})

// add listener to percent
const percent = document.querySelector(`#percent`);
percent.addEventListener(`click`, () => {
    if (!calculatorObject.operatorSelected) {
        const percentCalculated = Number(display.textContent) / 100;
        display.textContent = percentCalculated;
        if (percentCalculated.toString().length > 12 && percentCalculated < 1) {
            display.textContent = percentCalculated.toExponential(4);
        }
        calculatorObject.percentUsed = true;
    }
})

// add listener to +/-
const positiveNegative = document.querySelector(`#changeSign`);
positiveNegative.addEventListener(`click`, () => {
    if (!calculatorObject.operatorSelected) {
        const negative = `-`;
        const numberDisplayed = display.textContent;
        if (display.textContent !== `0` && display.textContent[0] !== `-`) {
            display.textContent = negative.concat(``, numberDisplayed);
        } else if (display.textContent[0] === `-`) {
            display.textContent = display.textContent.slice(1, (display.textContent.length));
        }
        calculatorObject.changeSign = true;
    }
})


// this toggles the operator buttons to notify user which operation is stored
// user cannot change operation after pressing the button
const multiplyButton = document.querySelector(`#multiply`);
const addButton = document.querySelector(`#add`);
const divideButton = document.querySelector(`#divide`);
const subtractButton = document.querySelector(`#subtract`);
function toggleOperatorSelection() {
        if (calculatorObject.operators[0] === undefined) {
            calculatorObject.multiplyStored = false;
            calculatorObject.addStored = false;
            calculatorObject.divideStored = false;
            calculatorObject.subtractStored = false;
            multiplyButton.classList.remove(`activeOperator`);
            addButton.classList.remove(`activeOperator`);
            divideButton.classList.remove(`activeOperator`);
            subtractButton.classList.remove(`activeOperator`);
        } else if (calculatorObject.operators[0] === `multiply`) {
            calculatorObject.multiplyStored = true;
            calculatorObject.addStored = false;
            calculatorObject.divideStored = false;
            calculatorObject.subtractStored = false;
            multiplyButton.classList.add(`activeOperator`);
            addButton.classList.remove(`activeOperator`);
            divideButton.classList.remove(`activeOperator`);
            subtractButton.classList.remove(`activeOperator`);
        } else if (calculatorObject.operators[0] === `add`) {
            calculatorObject.multiplyStored = false;
            calculatorObject.addStored = true;
            calculatorObject.divideStored = false;
            calculatorObject.subtractStored = false;
            multiplyButton.classList.remove(`activeOperator`);
            addButton.classList.add(`activeOperator`);
            divideButton.classList.remove(`activeOperator`);
            subtractButton.classList.remove(`activeOperator`);
        } else if (calculatorObject.operators[0] === `divide`) {
            calculatorObject.multiplyStored = false;
            calculatorObject.addStored = false;
            calculatorObject.divideStored = true;
            calculatorObject.subtractStored = false;
            multiplyButton.classList.remove(`activeOperator`);
            addButton.classList.remove(`activeOperator`);
            divideButton.classList.add(`activeOperator`);
            subtractButton.classList.remove(`activeOperator`);
        } else if (calculatorObject.operators[0] === `subtract`) {
            calculatorObject.multiplyStored = false;
            calculatorObject.addStored = false;
            calculatorObject.divideStored = false;
            calculatorObject.subtractStored = true;
            multiplyButton.classList.remove(`activeOperator`);
            addButton.classList.remove(`activeOperator`);
            divideButton.classList.remove(`activeOperator`);
            subtractButton.classList.add(`activeOperator`);
        }
}