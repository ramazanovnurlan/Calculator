let calculation=document.getElementById('calculation');

let display=document.getElementById('display');

let number=document.getElementsByClassName('number');

let operator=document.getElementsByClassName('operator');

let zero=document.getElementById('zero');

let decimal=document.getElementById('decimal');

let clearOne=document.getElementById('clearOne');

let clearAll=document.getElementById('clearAll');

let percent=document.getElementById('percent');

let calculate=document.getElementById('calculate');

//////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded',renderjs);
let firstNum=0;
let secondNum=0;
let result=0;
let symbol='';
let opClicked=false;
let dotClicked=false;
let equalClicked=false;
let indicateAsZero=false;

function renderjs() {
    display.value='0';

    for (const f of number) {
        f.addEventListener('click',numberClicked);
    }
    
    for (const f of operator) {
        f.addEventListener('click',operatorClicked)
    }
    
    zero.addEventListener('click', zeroClicked);

    decimal.addEventListener('click', decimalClicked);

    clearOne.addEventListener('click', clearOneByOne);

    clearAll.addEventListener('click', clearAllResult);

    percent.addEventListener('click', percentResult);
    
    calculate.addEventListener('click', calculateResult);
}

//zeroClicked
function zeroClicked(e) {
    let text=e.toElement.innerText;
    let val=display.value;

    display.value=val.substr(0,val.length-1);

    if(display.value=='0'){
        display.value=text;
        dotClicked=true;
        opClicked=false;
        equalClicked=true;
    }
    else{
        display.value+=text;
        dotClicked=true;
        opClicked=false;
        equalClicked=true;
    }
}

//decimalClicked
function decimalClicked(e) {
    let text=e.toElement.innerText;
    
    if (dotClicked) {
        display.value+=text;
        dotClicked=false;
        opClicked=false;
        equalClicked=false;
    }
}

//numberClicked
function numberClicked(e) {

    let text=e.toElement.innerText;

    if (indicateAsZero) {
        firstNum=parseFloat(display.value);
        display.value='0';
        indicateAsZero=false;
    }

    if(display.value=='0'){
        display.value=text;
        dotClicked=true;
        equalClicked=true;
    }
    else{
        display.value+=text;
        dotClicked=true;
        equalClicked=true;
    }
}

//operatorClicked
function operatorClicked(e) {
    
    symbol=e.toElement.innerText;
    
    if (display.value!='0' && opClicked) {
        opClicked=true; 
        dotClicked=false;
        indicateAsZero=true;
    }

    if (display.value!='0' && !opClicked) {//Birinci burani yoxluyur
        opClicked=true;
        dotClicked=false; 
        indicateAsZero=true;
    }
}

//calculateResult
function calculateResult() {
    
    secondNum=parseFloat(display.value);

    switch (symbol) {
        case '+': result = firstNum + secondNum; 
            break;
        case '-': result = firstNum - secondNum; 
            break;
        case '*': result = firstNum * secondNum; 
            break;
        case '/': result = firstNum / secondNum; 
            break;
    }
    firstNum = 0;
    secondNum = 0;
    symbol = '';    
    opClicked=false;

    if (equalClicked) {
        display.value=result;
        equalClicked=false;
    }
    result = 0;
}

//clearOneByOne
function clearOneByOne() {
    let val=display.value;

    if (val.length==1) {
        display.value='0';
    }
    else{
        display.value=val.substr(0,val.length-1);
    }
}

//clearAllResult
function clearAllResult() {
    display.value='0';
}

//percentResult
function percentResult() {
    let val=display.value;
    display.value=val/100;
}