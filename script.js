calculator();

function calculator(){
    let calculator = document.querySelector(".calculator");
    let display = document.querySelector(".calculator-display p");
    let equalsButton = document.querySelector(".equals");

    displayCalc(calculator, display);
    clearDisplay(calculator, display);

    equalsButton.addEventListener("click", (e) => {
        getOperator(display);
        getLeftOperand(display);
        getRightOperand(display);
    })
}

function getOperator(display) {
    const symbolsToRemove = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "="];
    let displayArr = display.textContent.split("");
    let operator = displayArr.filter((item) => !(symbolsToRemove.includes(item)))[0];
    return operator;
}

function getLeftOperand(display) {
    let displayContent = display.textContent.split("");
    let operator =  getOperator(display);
    let leftOperand = displayContent
    .slice(0,displayContent.indexOf(operator))
    .join("");
    return leftOperand;
}

function getRightOperand(display) {
    let displayContent = display.textContent.split("");
    let operator =  getOperator(display);
    let rightOperand = displayContent
    .slice(displayContent.indexOf(operator)+1)
    .join("");
    console.log(rightOperand);
    return rightOperand;
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
            let buttonContent = e.target
            display.textContent += e.target.textContent;
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
