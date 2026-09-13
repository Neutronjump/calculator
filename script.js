calculator();

function calculator(){
    let calculator = document.querySelector(".calculator");
    let display = document.querySelector(".calculator-display p")

    displayCalc(calculator, display);
    clearDisplay(calculator, display);

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
        case "*":
            return multiply(num1, num2);
        case "/":
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
