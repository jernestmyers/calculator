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
    if ((quotient * 2) % 2 !== 0) {
        return quotient.toFixed(12);
    }
    return quotient;
}

// multiply function 
function multiply(array) {
    const product = array.reduce((total,num) => {
        return total * num;
    }, 1);
    if ((product * 2) % 2 !== 0) {
        return product.toFixed(12);
    }
    return product;
}

// operate function
function operate(num1, num2, operator) {
    const inputs = [];
    inputs.push(num1);
    inputs.push(num2);
    // console.log(inputs);
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