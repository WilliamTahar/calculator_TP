const screen = document.getElementById('screen')
const inputs = Array.from(document.getElementsByClassName('btn'))

let firstValue = ''
let secondValue = ''
let operator = null
let result = null

init()

function init() {
    for (let input of inputs)
    {
        input.addEventListener('click', compute)
    }
}

function compute(event)
{
    const input = event.target
    inputValue = input.innerText

    if (inputValue >= 0 && inputValue <= 9 || inputValue === '.') {
        onDigit(inputValue)
    } else if (inputValue === '=') {
        onEqual()
    } else {
        onOperator(inputValue)
    }

}

function onDigit(inputValue)
{
    if (operator === null)
    {
        if (result === firstValue) {
            screen.innerText = ''
            firstValue = ''
        }
        firstValue += inputValue
    } else {
        secondValue += inputValue
    }
    screen.innerText += inputValue
}

function onEqual()
{
    result = calculate(
        parseNumber(firstValue),
        parseNumber(secondValue),
        operator
    )
    screen.innerText = result.toString().includes('.') ? result.toFixed(4) : result
    operator = null
    firstValue = result + ''
    secondValue = ''
}

function onOperator(inputValue) {
    operator = inputValue
    screen.innerText = ''
}

function parseNumber(value) {
    return value.includes('.') ? parseFloat(value) : parseInt(value)
}

function calculate(firstValue, secondValue, operator = '+') {
    if (typeof firstValue !== 'number' || typeof secondValue !== 'number')
        throw Error('Invalid argument : Data must be a number')

    if (operator === '+')
        return firstValue + secondValue
    else if (operator === '-')
        return firstValue - secondValue
    else if (operator === 'x')
        return firstValue * secondValue
    else if (operator === '/')
        return firstValue / secondValue
    else
        throw Error('Invalid operator')
}

