const buttons = document.querySelectorAll('button');
const input = document.getElementById('screen');

let result;
let operator;
let equal;
let evaluate = false;
let floatPoint = false;
// console.log(result);

buttons.forEach(button => {
    button.addEventListener('click', event => {
        const buttonClass = event.currentTarget.classList[0];
        const buttonValue = event.currentTarget.dataset.id;
        if(buttonClass === 'number'){
            if(isOperatorExist()){
                saveOperatorAndClearScreen();
            }
                input.value += buttonValue;

        }        
        if(buttonClass === 'clear'){
            input.value = '';
            operator = '';
            result = '';
            equal = '';
            floatPoint = false;
            evaluate = false;
            console.log(`result:  ${result}`);
        }
        // Operator
        if(buttonClass === 'operator'){
            operator = checkOperator(buttonClass, buttonValue);
            if(isNaN(result) || result == '' || evaluate == true){
                result = Number.parseFloat(input.value);
                // console.log(`result = ${result}`);
            }else{
                evaluate = false; 
                evaluateCalculate();
            }

            console.log(result);
            // console.log(isNaN(result))

        }
        if(buttonClass === 'equal'){
            evaluate = true;
            operator = '';
            evaluateCalculate();
        }

        if(buttonValue === 'point'){
            if(isOperatorExist()){ // clear screen if you have clicked operator
                saveOperatorAndClearScreen();
            }
            if(!isFloatingPointExist()){
                input.value += '.';
                floatPoint = true;
            }else{
                input.value += ''; // fix this
            }
        }
    })
});

const checkOperator = (buttonClass, buttonValue) => {
    if(buttonValue === 'plus')
        return 'plus'
    if(buttonValue === 'minus')
        return 'minus'
    if(buttonValue === 'multiply')
        return 'multiply'
    if(buttonValue === 'divide')
        return 'divide';
}

const evaluateCalculate = () => {
    // Tinh toan va hien thi len man hinh
    if(equal == 'plus' || operator == 'plus'){
        console.log(`result: ${result}`);
        result += Number.parseFloat(input.value);
        input.value = result;
    }
    if(equal == 'minus' || operator == 'minus'){
        result -= Number.parseFloat(input.value);
        input.value = result;
    }
    if(equal == 'multiply' || operator == 'multiply'){
        result *= Number.parseFloat(input.value);
        input.value = result;
    }
    if(equal == 'divide' || operator == 'divide'){
        result /= Number.parseFloat(input.value);
        input.value = result;
    }
}

const isFloatingPointExist = () => {
    return floatPoint;
}

const isOperatorExist = ()  => {
    return (operator === 'plus' || operator === 'minus' || operator === 'multiply' || operator === 'divide');
}

const saveOperatorAndClearScreen = () => {
    input.value = '';
    equal = operator;  // store operator when click equal button
    operator = '';// clear operator for avoid this condition stay true when click number again\
    floatPoint = false; // screen cleared => there are no floating point exist so set that to normal state
}