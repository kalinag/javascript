const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-button')

let firstValue = 0;
let operatorValue = '';
let awaitingNext = false;

function sendNumberValue(number) {
//    replace display value if first value is entered
    if(awaitingNext){
        calculatorDisplay.textContent = number;
        awaitingNext = false;
    } else {
        // if current value is 0, replace, if not-add number
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue+number
    }
}

function addDecimal (){
    if(awaitingNext) return;
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// calculate first and second value
const calculate = {
    '/':(firstNumber,secondNumber)=> firstNumber/secondNumber,
    '*':(firstNumber,secondNumber)=> firstNumber*secondNumber,
    '+':(firstNumber,secondNumber)=> firstNumber+secondNumber,
    '-':(firstNumber,secondNumber)=> firstNumber-secondNumber,
    '=':(firstNumber,secondNumber)=> secondNumber,
    
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators
    if (operatorValue && awaitingNext === true){
        operatorValue=operator
        return;
    }
    if(!firstValue){
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation
        firstValue=calculation;
    }
    //ready for nex value
    awaitingNext = true;
    operatorValue = operator;
    
}
// event listeners 
inputBtns.forEach((btn)=>{
    if(btn.classList.length===0){
        btn.addEventListener('click',() => sendNumberValue(btn.value))
    } else if (btn.classList.contains('operator')){
        btn.addEventListener('click',() => useOperator(btn.value))

    }else if (btn.classList.contains('decimal')){
        btn.addEventListener('click',() => addDecimal());}
});

//reset display,values
function resetAll() {
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNext = false
}

clearBtn.addEventListener('click',resetAll);