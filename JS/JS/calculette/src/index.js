import "./style.css";


let buttons = document.querySelectorAll('.button');
let result = document.querySelector('#result');
let equals = document.querySelector('.equals');
let stringResult = 0;
let calc = 0;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent !== '='){
            stringResult += button.textContent;
            result.innerHTML = stringResult;
        }
    })
})

equals.addEventListener('click', () => {
    if (stringResult.indexOf('+')) {
        let numbers = stringResult.split('+');
        calc = add(numbers[0], numbers[1]);
    }

    if (stringResult.indexOf('*')) {
        let numbers = stringResult.split('*');
        calc = multiple(numbers[0], numbers[1]);
    }

    if (stringResult.indexOf('-')) {
        let numbers = stringResult.split('-');
        calc = moins(numbers[0], numbers[1]);
    }

    if (stringResult.indexOf('/')) {
        let numbers = stringResult.split('/');
        calc = div(numbers[0], numbers[1]);
    }

    result.innerHTML = `${calc}`;
})

function add (number1, number2) {
    return parseInt(number1) + parseInt(number2);
}

function multiple (number1, number2) {
    return parseInt(number1) * parseInt(number2);
}

function moins (number1, number2) {
    return parseInt(number1) - parseInt(number2);
}

function div (number1, number2) {
    return parseInt(number1) / parseInt(number2);
}


