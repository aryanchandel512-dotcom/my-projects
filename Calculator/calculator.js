const display = document.getElementById('display');

function inputType(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? "Error" : a / b;
}

function calculate() {
    let expr = display.value.replace(/\s+/g, '');
    if (!/^[0-9+\-*/.]+$/.test(expr)) {
        display.value = "Error";
        return;
    }

    let nums = expr.split(/[-+*/]/).map(Number);
    let ops = expr.replace(/[0-9.]/g, '').split('');

    let stack = [nums[0]];

    for (let i = 0; i < ops.length; i++) {
        let num = nums[i + 1];
        switch (ops[i]) {
            case '/':
                let result = divide(stack[stack.length - 1], num);
                if (result === "Error") {
                    display.value = "Error";
                    return;
                }
                stack[stack.length - 1] = result;
                break;
            case '*':
                stack[stack.length - 1] = multiply(stack[stack.length - 1], num);
                break;
            case '+':
                stack.push(add(0, num));
                break;
            case '-':
                stack.push(subtract(0, num));
                break;
            default:
                stack=stack;
        }
    }

    let result = stack.reduce((a, b) => a + b, 0);
    display.value = (isNaN(result) || result === Infinity) ? "Error" : result;
}