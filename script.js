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
const object = {
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
        }
        if (Number(display.textContent) === object.numbers[0]) {
            display.textContent = ``;
        }
        object.operatorSelected = false;
        object.equalsSelected = false;
        display.textContent += digits.id;
        displayContainer.appendChild(display);
    })
})

// add listeners to operators
const operators = document.querySelectorAll(`.operator`);
operators.forEach((operators) => {
    operators.addEventListener(`click`, () => {
        if (object.operators[0] === undefined && object.equalsSelected === false) {
        object.numbers.push(Number(display.textContent));
        object.operators.push(operators.id);
        object.operatorSelected = true;
        object.decimalUsed = false;
        console.log(object);
        } else if (object.operators[0] !== undefined && object.numbers[0] !== undefined && object.operatorSelected === false) {
            object.numbers.push(Number(display.textContent));
            object.decimalUsed = false;
            display.textContent = operate(object.numbers[0], object.numbers[1], object.operators[0]);
            object.numbers.shift();
            object.numbers[0] = Number(display.textContent);
            console.log(object);
            object.operators.push(operators.id);
            object.operators.shift();
            object.operatorSelected = true;
            object.equalsSelected = false;      
        } else if (object.operators[0] === undefined && object.numbers[0] !== undefined) {
            console.log(`here`);
            object.operators.push(operators.id);
            object.operatorSelected = true;
            console.log(object);
        }
    })
})

// add listener to equals sign
const equalsButton = document.querySelector(`#equals`);
equalsButton.addEventListener(`click`, () => {
    // if (object.numbers[1] === undefined) {
    // object.numbers.push(Number(display.textContent));
    // console.log(object);
    // }
    if (object.numbers.length === 1 && object.operators !== undefined && object.equalsSelected === false) {
        object.numbers.push(Number(display.textContent));
        object.decimalUsed = false;
        display.textContent = operate(object.numbers[0], object.numbers[1], object.operators[0]);
        console.log(object);
        object.numbers.shift();
        object.numbers[0] = Number(display.textContent);
        object.operators.shift();
        object.equalsSelected = true;
        object.operatorSelected = false;
    } else if (object.numbers.length === 2) {
        display.textContent = operate(object.numbers[0], object.numbers[1], object.operators[0]);
        console.log(object);
        object.numbers.shift();
        object.numbers[0] = Number(display.textContent);
    }
})

// add listener to clear all button
const clearAll = document.querySelector(`#clear`);
clearAll.addEventListener(`click`, () => {
    display.textContent = `0`;
    object.numbers = [];
    object.operators = [];
    object.operatorSelected = false;
    object.equalsSelected = false;
    object.decimalUsed = false;
    console.log(object);
})

// add listener to decimal point
const decimal = document.querySelector(`#decimal`);
decimal.addEventListener(`click`, () => {
    if (object.decimalUsed === false && (Number(display.textContent) * 2) % 2 === 0) {
        display.textContent += decimal.value;
        displayContainer.appendChild(display);
    }
    // if (Number(display.textContent) === object.numbers[0] && (Number(display.textContent) * 2) % 2 !== 0) {
    //     display.textContent = `0.`;
    // }
    object.decimalUsed = true;
    object.operatorSelected = false;
    object.equalsSelected = false;
})
