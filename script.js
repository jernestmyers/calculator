// add function
function add(array) {
    const sum = array.reduce((total,num) => {
        return total + num;
    }, 0);
    const sumCheck = sum.toString();
    if (sumCheck.length > 10 && sum < 1) {
        return sum.toExponential(4);
    } else if (sumCheck.length > 10 && sum > 99999) {
        return sum.toExponential(4);
    } else if (sumCheck.length > 10 && sum < 99999) {
        return sum.toFixed(5);
    }
    return sum;
}

// subtract function
function subtract(array) {
    const difference = array.reduce((total,num) => {
        return total - num;
    });
    const differenceCheck = difference.toString();
    if (differenceCheck.length > 10 && difference < 1) {
        return difference.toExponential(4); 
    } else if (differenceCheck.length > 10 && difference > 99999) {
        return difference.toExponential(4);
    } else if (differenceCheck.length > 10 && difference < 99999) {
        return difference.toFixed(5);
    }
    return difference;
}

// divide function
function divide(array) {
    if (array[1] === 0) {
        return `ERROR`;
    }
    const quotient = array.reduce((total,num) => {
        return total / num;
    });
    const quotientCheck = quotient.toString();
    if (quotientCheck.length > 10 && quotient < 1) {
        return quotient.toExponential(4); 
    } else if (quotientCheck.length > 10 && quotient > 99999) {
        return quotient.toExponential(4);
    } else if (quotientCheck.length > 10 && quotient < 99999) {
        return quotient.toFixed(5);
    }
    return quotient;
}

// multiply function 
function multiply(array) {
    const product = array.reduce((total,num) => {
        return total * num;
    }, 1);
    const productCheck = product.toString();
    if (productCheck.length > 10) {
        return product.toExponential(4);
    }
    return product;
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
    subtractStored: false
}

// add listeners to digits
const digits = document.querySelectorAll(`.digit`);
const displayContainer = document.querySelector(`#display-container`);
const display = document.querySelector(`#display`);

digits.forEach((digits) => {
    digits.addEventListener(`click`, () => {
        if (calculatorObject.errorThrown === false) {
            if (display.textContent === `0` || calculatorObject.digitSelected === false) {
                display.textContent = ``;
            } else if (calculatorObject.operatorSelected === false && calculatorObject.operators[0] === undefined) {
                calculatorObject.numbers = [];
                calculatorObject.operators = [];
            }
            calculatorObject.operatorSelected = false;
            calculatorObject.digitSelected = true;
            calculatorObject.equalsSelected = false;
                if (display.textContent.length < 10) {
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
        if (calculatorObject.errorThrown === false && display.textContent !== `0.` && display.textContent !== `-` && display.textContent !== `-0.`) {
            if (calculatorObject.percentUsed === true || calculatorObject.changeSign === true) { // allows user to change sign or convert percent to decimal after a return using equals fxn
                if (calculatorObject.operators[0] === undefined && calculatorObject.numbers[0] !== undefined) {
                    calculatorObject.numbers[0] = Number(display.textContent);
                }
            }
            if (calculatorObject.operators[0] === undefined && calculatorObject.equalsSelected === false) {
                calculatorObject.numbers.push(Number(display.textContent));
                calculatorObject.operators.push(operators.id);
            } else if (calculatorObject.operators[0] !== undefined && calculatorObject.numbers[0] !== undefined && calculatorObject.operatorSelected === false) {
                performOperationAndAdjustObject();
                calculatorObject.operators.push(operators.id);
            } else if (calculatorObject.operators[0] === undefined && calculatorObject.numbers[0] !== undefined) { // this else if works with the equals fxn
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
    if (calculatorObject.errorThrown === false && display.textContent !== `0.` && display.textContent !== `-` && display.textContent !== `-0.`) {
        if (calculatorObject.numbers.length === 1 && calculatorObject.operators !== undefined && calculatorObject.equalsSelected === false && calculatorObject.digitSelected === true) {
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
    if (calculatorObject.errorThrown === false) {
        const decimalCheck = Array.from(display.textContent);
        calculatorObject.digitSelected = true;
        if (decimalCheck.includes(`.`) !== true && (calculatorObject.equalsSelected !== true && calculatorObject.operatorSelected !== true)) {
            display.textContent += decimal.value;
            displayContainer.appendChild(display);
        } else if (display.textContent === `0` || calculatorObject.digitSelected === false) {
            display.textContent = `0.`;
        } else if (calculatorObject.operatorSelected === true || calculatorObject.equalsSelected === true) {
            display.textContent = `0.`;
        }
    }
})

// add listener to backspace
const backspace = document.querySelector(`#backspace`);
backspace.addEventListener(`click`, () => {
    if (calculatorObject.digitSelected === true && display.textContent.length >= 1) {
        display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
    }
})

// add listener to percent
const percent = document.querySelector(`#percent`);
percent.addEventListener(`click`, () => {
    if (calculatorObject.operatorSelected === false) {
        const percentCalculated = Number(display.textContent) / 100;
        display.textContent = percentCalculated;
        if (percentCalculated.toString().length > 10 && percentCalculated < 1) {
            display.textContent = percentCalculated.toExponential(4);
        }
        calculatorObject.percentUsed = true;
    }
})

// add listener to +/-
const positiveNegative = document.querySelector(`#changeSign`);
positiveNegative.addEventListener(`click`, () => {
    if (calculatorObject.operatorSelected === false) {
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

// CLEARED %%bug%% pressing a number, operator, then equals returns the number double in whatever operator selected. so 5, multiply, equals returns 25.
// CLEARED %%bug%% program continues if user presses decimal for to produce "0." but should still require user to input another digit
// CLEARED %%bug%% when percent and changeSign is done after an operation the result is already pushed into the array, so need to replace the stored number with the updated number
// does it actually make sense to be able to changeSign or add percent after pressing an operator? i think doing so after equals makes sense because an operator would then be pressed
// afterwards, but i'm not sure it makes sense to be able to changeSign or add percent after doing the sequence 2+3-5 where 2+3 returns 5 upon pressing - and THEN you'd be changeing sign
// or adding percent AFTER pressing the operator. i don't see a functional use for this.
// ^^^^^^^^^^^^^^^^^^^ i allow a sign change and percent conversion after an equals operation, i do not allow user to change sign or convert percent after an operation return
// CLEARED %%bug%% when testing something like 3% - 2 i get a very long decimal with a lot of extraneous zeroes that pushes past display container; have not been able to repeat it yet
// CLEARED must not allow user to input over 10 digits; need to consider the decimal and percent buttons as well. can set a general conditional if display.textContent < 10