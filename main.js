class Calculator {
  constructor(upperScreen, lowerScreen) {
    this.upperScreen = upperScreen
    this.lowerScreen = lowerScreen
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (check) {
      this.currentOperand = ''
      check = false;
    }
    if (number === 'π') {
      number = Math.PI
      if (this.currentOperand !== '') {
        this.currentOperand = parseFloat(this.currentOperand) * parseFloat(number)
      }else {this.currentOperand = number}
    } else if (number === '!') {
      if (this.currentOperand !== '') {
        this.currentOperand = factorial(parseFloat(this.currentOperand))
      }else {this.currentOperand = ''}
    }else if (number === '√') {
      if (this.currentOperand !== '') {
        this.currentOperand = Math.sqrt(parseFloat(this.currentOperand))
      }else {this.currentOperand = ''}
    }else {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let result
    check = true;
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          result = prev + current
          break
        case '-':
          result = prev - current
          break
        case '*':
          result = prev * current
          break
        case '/':
          result = prev / current
          break
          case '%':
          result = prev % current
          break
          case '!':
          result = factorial(prev)
          break
          case '^':
          result = prev**current
          break
        default:
          return
      }
      this.currentOperand = result
      this.operation = undefined
      this.previousOperand = ''
    
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.lowerScreen.innerText = this.currentOperand
    this.upperScreen.innerText = this.previousOperand
    if (this.operation != null) {
      this.upperScreen.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.upperScreen.innerText = ''
    }
  }
}

let check = false;
const btnNumbers = document.querySelectorAll('.numbers')
const btnOperations = document.querySelectorAll('.ops')
const btnEqual = document.querySelector('.btn-result')
const btnDelete = document.querySelector('.delete')
const btnAC = document.querySelector('.AC')
const upperScreen = document.querySelector('.upper-screen-p')
const lowerScreen = document.querySelector('.lower-screen-p')

const calculator = new Calculator(upperScreen, lowerScreen)

btnNumbers.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

btnOperations.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

btnEqual.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

btnAC.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

btnDelete.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})


var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
  return 1;
  if (f[n] > 0)
  return f[n];
  return f[n] = factorial(n-1) * n;
}