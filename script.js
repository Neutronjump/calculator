calculator();

function calculator(){
    let calculator = document.querySelector(".calculator");
    let display = document.querySelector(".calculator-display p");
    let equalsButton = document.querySelector(".equals");
    let negateButton = document.querySelector(".negate");

    displayCalc(calculator, display);
    clearDisplay(calculator, display);
    replaceDisplayedOperator(calculator, display);

    negateButton.addEventListener("click", (e) => {
        negateCurrentOperand(display);
    })
    equalsButton.addEventListener("click", (e) => {
        let operationResult = operate(getOperator(display), getLeftOperand(display), getRightOperand(display));
        display.textContent = operationResult;
    })
}

function replaceDisplayedOperator(calculator, display) {
    calculator.addEventListener("click", (e) => {
        if (e.target.closest("button") && e.target.closest(".calculator-operators")) {
            let displayArr = display.split("");
            if (displayArr.includes(getOperator(display), 1)) {
                displayArr[indexOf(getOperator(display), 1)] = e.target.textContent;
                display.textContent = displayArr.join("");
            }
        }
    })
}


function negateCurrentOperand(display) {
    const operators = ["÷", "×", "+", "-"];
    let displayArr = display.textContent.split("");
    if (!getRightOperand(display) || getRightOperand(display) === "") {
        if (displayArr[0] === "-") {
            display.textContent = display.textContent.slice(1);
            } 
        else if (!display.textContent.includes(getOperator)) {
            display.textContent = "-" + display.textContent;
        }
    }
    else {
        if (displayArr[0] === "-") {
            let operatorIndex = displayArr.indexOf(getOperator(display), 1);
            if (displayArr[operatorIndex + 2] === "-") {
            display.textContent = display.textContent.slice(0,operatorIndex + 1) + display.textContent.slice(operatorIndex + 3, -1);
        }
        else {
            display.textContent = display.textContent.slice(0,operatorIndex + 1) + "(-" + display.textContent.slice(operatorIndex + 1) + ")"; 
        }
        }
        else {
            let operatorIndex = displayArr.indexOf(getOperator(display));
            if (displayArr[operatorIndex + 2] === "-") {
            display.textContent = display.textContent.slice(0,operatorIndex + 1) + display.textContent.slice(operatorIndex + 3, -1);
        }
        else {
            display.textContent = display.textContent.slice(0,operatorIndex + 1) + "(-" + display.textContent.slice(operatorIndex + 1) + ")"; 
        }
        }
    }
}



function getOperator(display) {
    const symbolsToRemove = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "=", ".", "(", ")"];
    let displayArr = display.textContent.split("");
    if (displayArr[0] === "-") {
        displayArr.shift();
    }
    let operator = displayArr.filter((item) => !(symbolsToRemove.includes(item)))[0];
    return operator;
}

function getLeftOperand(display) {
    let displayContent = display.textContent.split("");
    let operator =  getOperator(display);
    let leftOperand = displayContent
    .slice(0,displayContent.indexOf(operator, 1))
    .join("");
    return parseFloat(leftOperand);
}

function getRightOperand(display) {
    let displayContent = display.textContent.split("");
    let operator =  getOperator(display);
    if (!displayContent.includes("(")) {
        let rightOperand = displayContent
        .slice(displayContent.lastIndexOf(operator)+1)
        .join("");
        if (displayContent.includes(operator)) {
            return parseFloat(rightOperand);
        }
    }
    else {
        if (operator = "-") {
            let rightOperand = displayContent
            .slice(displayContent.lastIndexOf(operator), -1)
            .join("");
            if (displayContent.includes(operator)) {
                return parseFloat(rightOperand);
            }
        }
        else {
            let rightOperand = displayContent
            .slice(displayContent.indexOf(operator), -1)
            .join("");
            if (displayContent.includes(operator)) {
                return parseFloat(rightOperand);
            }
        }
    }
}

function clearDisplay(calculator, display) {
    calculator.addEventListener("click", (e) => {
        if (e.target.closest("button") && e.target.textContent === "C") {
            display.textContent = ""
        }
    })
}

function displayCalc(calculator, display) {
    calculator.addEventListener("click", (e) => {
        if(e.target.closest("button")) {
            if (!e.target.closest(".negate") && !e.target.closest(".equals")) {
                let buttonContent = e.target.textContent;
                if (display.textContent.includes(")")) {
                    let displayArr = display.textContent.split("");
                    let indexOfCloseParenthesis = displayArr.indexOf(")");
                    displayArr.splice(indexOfCloseParenthesis - 1, 0, buttonContent);
                    display.textContent = displayArr.join("");
                }
                else {
                    display.textContent += buttonContent;
                }
            }
            
        }
    })
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "×":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
    }
}


// Basic math functions

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}
