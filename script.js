calculator();

function calculator(){
    let calculator = document.querySelector(".calculator");
    let display = document.querySelector(".calculator-display p");
    let equalsButton = document.querySelector(".equals");
    let negateButton = document.querySelector(".negate");

    displayCalcClick(calculator, display);
    clearDisplay(calculator, display);

    negateButton.addEventListener("click", (e) => {
        negateCurrentOperand(display);
    })
    equalsButton.addEventListener("click", (e) => {
        let operationResult = operate(getOperator(display), parseFloat(getLeftOperand(display)), parseFloat(getRightOperand(display)));
        if (operationResult.toString().includes(".") && !operationResult.toString().includes("e")) {
            let operationDecimalLength = operationResult
            .toString()
            .slice(operationResult.toString().indexOf("."))
            .length;
            if (operationDecimalLength > 8) {
                display.textContent = Number(operationResult.toFixed(8));
            }
            else display.textContent = operationResult;
        }
        else display.textContent = operationResult;
    })
}

function deleteFromDisplay(display) {
    let displayArr = display.textContent.split("");
    if (displayArr.at(-1) === ")") {
        displayArr.splice(-1, 1)
        displayArr.splice(displayArr.indexOf("("), 1)
        displayArr.splice(displayArr.lastIndexOf("-"), 1);
    }
    else {
        displayArr.splice(-1,1);
    }
    display.textContent = displayArr.join("");
}

function negateCurrentOperand(display) {
    const operators = ["÷", "×", "+", "-"];
    let displayArr = display.textContent.split("");
    if (display.textContent === "Na=") return;
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
    if (displayArr.includes("e")) {
        let indexOfScientificNotation = displayArr.indexOf("e")
        displayArr.splice(indexOfScientificNotation, 2);
    }
    let operator = displayArr.filter((item) => !(symbolsToRemove.includes(item)))[0];
    return operator;
}

function getLeftOperand(display) {
    let displayContent = display.textContent.split("");
    let operator =  getOperator(display);
    if (operator) {
    let leftOperand = displayContent
    .slice(0,displayContent.indexOf(operator, 1))
    .join("");
    return leftOperand;
    }
    else return display.textContent;
}

function getRightOperand(display) {
    let displayContent = display.textContent.split("");
    let operator =  getOperator(display);
    if (!displayContent.includes("(")) {
        let rightOperand = displayContent
        .slice(displayContent.lastIndexOf(operator)+1)
        .join("");
        if (displayContent.includes(operator)) {
            return rightOperand;
        }
    }
    else {
        if (operator = "-") {
            let rightOperand = displayContent
            .slice(displayContent.lastIndexOf(operator), -1)
            .join("");
            if (displayContent.includes(operator)) {
                return rightOperand;
            }
        }
        else {
            let rightOperand = displayContent
            .slice(displayContent.indexOf(operator), -1)
            .join("");
            if (displayContent.includes(operator)) {
                return rightOperand;
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

function replaceDisplayedOperator(e, display) {
    let displayArr = display.textContent.split("");
    if (displayArr.includes("e")) {
        let endIndexOfScientificNotation = displayArr.indexOf("e") + 2;
        if (displayArr.includes(getOperator(display), endIndexOfScientificNotation)) {
        displayArr[displayArr.indexOf(getOperator(display), endIndexOfScientificNotation)] = e.target.textContent;
        display.textContent = displayArr.join("");
        }
    }
    else if (displayArr.includes(getOperator(display), 1)) {
        displayArr[displayArr.indexOf(getOperator(display), 1)] = e.target.textContent;
        display.textContent = displayArr.join("");
    }
}

function addToDisplay(e, display) {
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

function isOperatorFirstButtonPressed(e, display) {
    if (e.target.closest(".calculator-operators") && display.textContent === "") {
        return true;
    }
}

function isFirstOperandValid(display) {
    if (display.textContent === "-" || display.textContent === "." || display.textContent === "-.") {
        return false;
    }
    else return true;
}

function hasDecimalPoint(operand) {
    if (!operand) return false;
    else if (operand.includes(".")) return true;
    else return false;
}

function displayCalcClick(calculator, display) {
    calculator.addEventListener("click", (e) => {
        if(e.target.closest("button")) {
            if (display.textContent === "Na=") {
                display.textContent = ""
            }
            
            if (e.target.closest(".equals")) return;
            else if (e.target.closest(".backspace")) {
                deleteFromDisplay(display);
            }
            else if(e.target.closest(".calculator-operators") && getOperator(display)) {
                replaceDisplayedOperator(e, display);
            }
            else if (isOperatorFirstButtonPressed(e, display)) {
                return
            }
            else if (e.target.closest(".calculator-operators") && !isFirstOperandValid(display)) {
                return;
            }
            else if (e.target.closest(".decimal")) {
                if (!hasDecimalPoint(getLeftOperand(display)) && !getOperator(display)) {
                    addToDisplay(e, display);
                }
                else if (getRightOperand(display) && !hasDecimalPoint(getRightOperand(display))) {
                    addToDisplay(e, display);
                }
            }
            else if (!e.target.closest(".negate") && !e.target.closest(".equals")) {
                addToDisplay(e, display);
            }
            
        }
    })
}

function operate(operator, num1, num2) {
    if (!num2) return num1;
    switch (operator) {
        case undefined:
            return num1;
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
