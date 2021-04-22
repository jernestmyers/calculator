// add function
function add(array) {
    const sum = array.reduce((total,num) => {
        return total + num;
    }, 0);
    console.log(sum);
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
    if ((quotient * 2) % 2 !== 0) {
        return quotient.toFixed(5);
    }
    return quotient;
}

// multiply function 
function multiply(array) {
    const product = array.reduce((total,num) => {
        return total * num;
    }, 1);
    if ((product * 2) % 2 !== 0) {
        return product.toFixed(5);
    }
    return product;
}

// operate function
function operate(num1, num2, operator) {
    const inputs = [];
    inputs.push(num1);
    inputs.push(num2);
    console.log(inputs);
    if (operator === `add`) {
        let sum = add(inputs);
        // inputs[0] = sum;
        // inputs.pop();
        // console.log(inputs);
        return sum;
    } else if (operator === `subtract`) {
        return subtract(inputs);
    } else if (operator === `multiply`) {
        return multiply(inputs);
    } else if (operator === `divide`) {
        return divide(inputs);
    }
    // console.log(inputs);
}

// create object
const calculatorObject = {
    numbers: [],
    operators: [],
    operatorSelected: false,
    equalsSelected: false,
    decimalUsed: false
}


// add listeners to digits
const digits = document.querySelectorAll(`.digit`);
const displayContainer = document.querySelector(`#display-container`);
const display = document.querySelector(`#display`);

digits.forEach((digits) => {
    digits.addEventListener(`click`, () => {
        if (display.textContent === `0`) {
            display.textContent = ``;
            console.log(`if #1 in digits fxn`);
            console.log(calculatorObject);
        }
        if (Number(display.textContent) === calculatorObject.numbers[0]) {
            display.textContent = ``;
            console.log(`if #2 in digits fxn`);
            console.log(calculatorObject);
        }
        calculatorObject.operatorSelected = false;
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
    console.log(`clear fxn`);
    console.log(calculatorObject);
})

// add listener to decimal point
const decimal = document.querySelector(`#decimal`);
// decimal.addEventListener(`click`, () => {
//     if (calculatorObject.decimalUsed === false && (Number(display.textContent) * 2) % 2 === 0) {
//         display.textContent += decimal.value;
//         // displayContainer.appendChild(display);
//         calculatorObject.decimalUsed = true;
//         console.log(`first if in decimal fxn`);
//         console.log(calculatorObject);
//     }
//     if (Number(display.textContent) === calculatorObject.numbers[0]) {
//         display.textContent = `0.`;
//     }
//     calculatorObject.operatorSelected = false;
//     calculatorObject.equalsSelected = false;
//     console.log(`end of decimal fxn`);
//     console.log(calculatorObject);
// })
