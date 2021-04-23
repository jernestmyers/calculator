// add function
function add(array) {
    const sum = array.reduce((total,num) => {
        return total + num;
    }, 0);
    return sum;
}

// subtract function
function subtract(array) {
    const difference = array.reduce((total,num) => {
        return total - num;
    });
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
    console.log(quotientCheck);
    console.log(quotientCheck.length);
    if (quotientCheck.length > 10 && quotient < 1) {
        console.log(quotient);
        return quotient.toExponential(4); 
    }
    if (quotientCheck.length > 10 && quotient > 99999) {
        // console.log(quotient);
        // console.log(quotient.toExponential(4));
        return quotient.toExponential(4);
    }
    if (quotientCheck.length > 10 && quotient < 99999) {
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
        console.log(product);
        console.log(product.toExponential(4));
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
    decimalUsed: false,
    digitSelected: false
}

// add listeners to digits
const digits = document.querySelectorAll(`.digit`);
const displayContainer = document.querySelector(`#display-container`);
const display = document.querySelector(`#display`);

digits.forEach((digits) => {
    digits.addEventListener(`click`, () => {
        if (display.textContent === `0` || calculatorObject.digitSelected === false) {
            display.textContent = ``;
            console.log(`if #1 in digits fxn`);
            console.log(calculatorObject);
        }
        if (calculatorObject.operatorSelected === false && calculatorObject.operators[0] === undefined) {
            console.log(`you are here`);
            calculatorObject.numbers = [];
            calculatorObject.operators = [];
        }
        calculatorObject.operatorSelected = false;
        calculatorObject.digitSelected = true;
        calculatorObject.equalsSelected = false;
        display.textContent += digits.id;
        displayContainer.appendChild(display);
        console.log(`end of digits fxn`);
        console.log(calculatorObject);
    })
})

// add listeners to operators
const operators = document.querySelectorAll(`.operator`);
operators.forEach((operators) => {
    operators.addEventListener(`click`, () => {
        if (calculatorObject.operators[0] === undefined && calculatorObject.equalsSelected === false) {
        calculatorObject.numbers.push(Number(display.textContent));
        calculatorObject.operators.push(operators.id);
        calculatorObject.operatorSelected = true;
        calculatorObject.decimalUsed = false;
        console.log(`first if in operator fxn`);
        console.log(calculatorObject);
        } else if (calculatorObject.operators[0] !== undefined && calculatorObject.numbers[0] !== undefined && calculatorObject.operatorSelected === false) {
            calculatorObject.numbers.push(Number(display.textContent));
            calculatorObject.decimalUsed = false;
            display.textContent = operate(calculatorObject.numbers[0], calculatorObject.numbers[1], calculatorObject.operators[0]);
            calculatorObject.numbers.shift();
            calculatorObject.numbers[0] = Number(display.textContent);
            calculatorObject.operators.push(operators.id);
            calculatorObject.operators.shift();
            calculatorObject.operatorSelected = true;
            calculatorObject.equalsSelected = false;
            console.log(`else if #1 in operator fxn`);
            console.log(calculatorObject);    
        } else if (calculatorObject.operators[0] === undefined && calculatorObject.numbers[0] !== undefined) { // this else if works with the equals fxn
            calculatorObject.operators.push(operators.id);
            calculatorObject.operatorSelected = true;
            console.log(`else if #2 in operator fxn`);
            console.log(calculatorObject);
        }
        calculatorObject.digitSelected = false;
        console.log(`end of operators fxn: ${calculatorObject}`);
    })
})

// add listener to equals sign
const equalsButton = document.querySelector(`#equals`);
equalsButton.addEventListener(`click`, () => {
    // if (object.numbers[1] === undefined) {
    // object.numbers.push(Number(display.textContent));
    // console.log(object);
    // }
    if (calculatorObject.numbers.length === 1 && calculatorObject.operators !== undefined && calculatorObject.equalsSelected === false) {
        calculatorObject.numbers.push(Number(display.textContent));
        calculatorObject.decimalUsed = false;
        display.textContent = operate(calculatorObject.numbers[0], calculatorObject.numbers[1], calculatorObject.operators[0]);
        calculatorObject.numbers.shift();
        calculatorObject.numbers[0] = Number(display.textContent);
        calculatorObject.operators.shift();
        calculatorObject.equalsSelected = true;
        calculatorObject.operatorSelected = false;
        console.log(`first if in equals fxn`);
        console.log(calculatorObject);
    } else if (calculatorObject.numbers.length === 2) {
        display.textContent = operate(calculatorObject.numbers[0], calculatorObject.numbers[1], calculatorObject.operators[0]);
        calculatorObject.numbers.shift();
        calculatorObject.numbers[0] = Number(display.textContent);
        console.log(`else if in equals`);
        console.log(calculatorObject);
    }
    calculatorObject.digitSelected = false;
    console.log(`end of equals fxn`)
    console.log(calculatorObject);
})

// add listener to clear all button
const clearAll = document.querySelector(`#clear`);
clearAll.addEventListener(`click`, () => {
    display.textContent = `0`;
    calculatorObject.numbers = [];
    calculatorObject.operators = [];
    calculatorObject.operatorSelected = false;
    calculatorObject.equalsSelected = false;
    calculatorObject.decimalUsed = false;
    calculatorObject.digitSelected = false;
    console.log(`clear fxn`);
    console.log(calculatorObject);
})

// add listener to decimal point
const decimal = document.querySelector(`#decimal`);
decimal.addEventListener(`click`, () => {
    const decimalCheck = Array.from(display.textContent);
    console.log(decimalCheck.includes(`.`));
    calculatorObject.digitSelected = true;
    if (decimalCheck.includes(`.`) !== true && (calculatorObject.equalsSelected !== true && calculatorObject.operatorSelected !== true)) {
        display.textContent += decimal.value;
        displayContainer.appendChild(display);
        // console.log(`first if in decimal fxn`);
//         console.log(calculatorObject);
    }
    if (display.textContent === `0` || calculatorObject.digitSelected === false) {
        display.textContent = `0.`;
    }
    if (calculatorObject.operatorSelected === true || calculatorObject.equalsSelected === true) {
        display.textContent = `0.`;
    }
//     calculatorObject.operatorSelected = false;
//      calculatorObject.equalsSelected = false;
//     calculatorObject.digitSelected = false;
//     console.log(`end of decimal fxn`);
//     console.log(calculatorObject);
})
