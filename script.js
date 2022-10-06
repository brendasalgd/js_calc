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
            //Append number to current value
            this.currentOperation.innerText += this.current
        } else {
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
        //check if current is empty
        if (this.currentOperation.innerText === "" && operation !== "C") {
            if (this.previousOperation.innerText !== "") {
                this.changeOperation(operation)
            }
            return
        }
        const current = +this.currentOperation.innerText
        const previous = +this.previousOperation.innerText.split(" ")[0]
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
            case '/':
                operationValue = previous / current
                this.updateScreen(previous, operation, current, operationValue)
                break;
            case '*':
                operationValue = previous * current
                this.updateScreen(previous, operation, current, operationValue)
                break;
            case 'CE':
                this.processCE()
                break;
            case 'C':
                this.processC()
                break;
            case 'DEL':
                this.processDEL()
                break;
            case '=':
                if (this.currentOperation.innerText === ".") {
                    return
                } else {
                    this.processEqual()
                }
                break;
            default:
                return
        }
    }


    changeOperation(operation) {
        const mathOperations = [
            '-', '+', '/', '*'
        ]
        if (!mathOperations.includes(operation)) {
            return
        }
        this.previousOperation.innerText = this.previousOperation.innerText.slice(0, -1) + operation

    }


    processCE() {
        //clear current
        this.currentOperation.innerText = "";
    };


    processC() {
        //clear all
        this.currentOperation.innerText = "";
        this.previousOperation.innerText = "";
    }


    processDEL() {
        //clear character
        this.currentOperation.innerText = this.currentOperation.innerText.slice(0, -1)
    };


    processEqual(operation) {
        //result
        const operations = this.previousOperation.innerText.split(" ")[1]
        this.processOperation(operations)

    };
}


const Calc = new Calculator(previousOperation, currentOperation)


buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            Calc.addDigit(value)
        } else {
            Calc.processOperation(value)
        }
    })
})


window.addEventListener("keydown", (e) => {
    const value = e.key

    if (+value >= 0 || value === ".") {
        Calc.addDigit(value)
    } else {
        Calc.processOperation(value)
    }

    if (value == "Enter") {
        Calc.processOperation("=")
        Calc.processEqualOperator()
    }
})


$checkbox.addEventListener('change', () => {
    $html.classList.toggle('dark-mode')
})