const keypad = document.querySelector('.keypad');
const input = document.querySelector('.display');

keypad.addEventListener('click', checkInput);

function checkInput (event) {
    if (event.target.tagName != 'BUTTON') return;

    let buttonClass = event.target.className;
    if (buttonClass === 'operator'){
        let result = doOperator(event.target.textContent, input.value);
        input.value = result.toString();
    }
    else if (event.target.id === 'equal'){
        let result = doEquality(input.value);
        input.value = result.toString();
    }
    else if (event.target.id === 'clear'){
        clearMemory();
        input.value = 0;
    }
};



let operand = 0;
let operator = undefined;

function clearMemory(){
    operand = 0;
    operator = undefined;
}

function doOperator(btnText, value) {
    if (!operator) {
        operator = btnText;
        operand = Number(value);
        return '0';
    }

    operand = doCalculation(operator, value);
    operator = btnText;

    return operand.toString();
}

//Todo: would be cool if equal could repeat the last operator and operand.
function doEquality(value) {
    if (!operator) return value;
    result = doCalculation(operator, value);
    clearMemory();
    return result;
}

function doCalculation(op, value){
    switch (op){
        case '+':
            return operand + Number(value);
        case '-':
            return operand - Number(value);
        case '/':
            return operand / Number(value);
        case 'x':
            return operand * Number(value);
        case '=':
            //Special case: if equal is pressed, use the
            //operator button previously pressed.
            return doCalculation(operator, value);
    }
}