const previousOperation = document.querySelector('#previous-operatiions')
const currentOperation = document.querySelector('#current-operatiions')
const buttons = document.querySelectorAll('#btncontainer button')
const $html = document.querySelector('html')
const $checkbox = document.querySelector('#switch')

class Calculator {
    constructor(previousOperation, currentOperation) {
        this.previousOperation = previousOperation
        this.currentOperation = currentOperation
        this.current = "";
    }

    addDigit(digit) {
        if (digit === "." && this.currentOperation.innerText.includes(".")) {
            return
        } else if (this.currentOperation.innerText.length >= 9) {
            return
        }
        this.current = digit
        this.updateScreen()
    }

    updateScreen(previous = null, operation = null, current = null, operationValue = null) {

        if (operationValue === null) {
            console.log(previous)
            this.currentOperation.innerText += this.current
        } else {
            console.log(previous)
            if (previous === 0) {
                operationValue = current
            }
            this.previousCheckLength(operationValue, operation)
        }
    }

    previousCheckLength(operationValue, operation) {
        //round off decimal places
        if (this.currentOperation.innerText.includes(".") && operationValue >= 9) {
            console.log("chegou")
            this.previousOperation.innerText = `${operationValue.toFixed(2)} ${operation}`
            this.currentOperation.innerText = "";
        } else {
            this.previousOperation.innerText = `${operationValue} ${operation}`
            this.currentOperation.innerText = "";
        }
    }

    processOperation(operation) {
        if (this.currentOperation.innerText === "" && operation !== 'C') {
            if (this.previousOperation.innerText !== "") {
                this.changeMathOperation(operation)
            }
            return
        }
        let current = +this.currentOperation.innerText
        let previous = +this.previousOperation.innerText.split(" ")[0]
        let operationValue;

        switch (operation) {
            case '+':
                operationValue = previous + current
                this.updateScreen(previous, operation, current, operationValue)
                break;
            case '-':
                operationValue = previous - current
                this.updateScreen(previous, operation, current, operationValue)
                break;
            case '*':
                operationValue = previous * current
                this.updateScreen(previous, operation, current, operationValue)
                break;
            case '/':
                operationValue = previous / current
                this.updateScreen(previous, operation, current, operationValue)
                break;

            case 'C':
                this.clearAllOperations()
                break;
            case 'CE':
                this.clearCurrentOperations()
                break;
            case 'DEL':
                this.clearDigit()
                break;
            case '=':
                if (this.currentOperation.innerText === ".") {
                    return
                } else {
                    this.equal()
                }
                break
            default:
                return
        }
    }
    changeMathOperation(operation) {
        const mathOperations = ['+', '*', '/', '-']
        if (!mathOperations.includes(operation)) {
            return
        }
        this.previousOperation.innerText = this.previousOperation.innerText.slice(0, -1) + operation
    }

    clearAllOperations() {
        this.previousOperation.innerText = ""
        this.currentOperation.innerText = ""
    }
    clearCurrentOperations() {
        this.currentOperation.innerText = ""
    }
    clearDigit() {
        this.currentOperation.innerText = this.currentOperation.innerText.slice(0, -1)
    }
    equal() {
        let operation = this.previousOperation.innerText.split(" ")[1];

        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperation, currentOperation)


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {

            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});


window.addEventListener("keydown", (e) => {
    const value = e.key

    if (+value >= 0 || value === ".") {
        calc.addDigit(value)
    } else {
        calc.processOperation(value)
    }

    if (value == "Enter") {
        calc.processOperation("=")
        calc.equal()
    } 
})
$checkbox.addEventListener('change', () => {
    $html.classList.toggle('dark-mode')
})
