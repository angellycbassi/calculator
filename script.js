let calculation = localStorage.getItem('calculation') || '';
let canAddDecimal = true;
updateDisplay();

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    if (calculation === '' || isLastCharOperator()) {
      return;
    }
    calculateResult();
  }

  if (!isNaN(event.key) || ['+', '-', '*', '/', '.'].includes(event.key)) {
    if (!isNaN(event.key)) {
      const wasAfterOperator = isLastCharOperator();
      appendValue(event.key);
      if (wasAfterOperator) {
        canAddDecimal = true;
      }
    } else if (event.key === '.') {
      if (calculation === '' || isLastCharOperator() || !canAddDecimal) {
        return;
      }
      appendValue(event.key);
      canAddDecimal = false;
    } else {
      if (calculation === '' || isLastCharOperator() || calculation.slice(-1) === '.') {
        return;
      }
      appendValue(event.key);
      canAddDecimal = true;
    }
  }

  if (event.key === 'Backspace') {
    calculation = calculation.slice(0, -1);
    updateDisplay();
  }
});

document.querySelectorAll('.js-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.value;
      if (!isNaN(value)) {
        const wasAfterOperator = isLastCharOperator();
        appendValue(value);
        if (wasAfterOperator) {
          canAddDecimal = true;
        }
      } else if (value === '.') {
        if (calculation === '' || isLastCharOperator() || !canAddDecimal) {
          return;
        }
        appendValue(value);
        canAddDecimal = false;
      } else {
        if (calculation === '' || isLastCharOperator() || calculation.slice(-1) === '.') {
          return;
        }
        appendValue(value);
        canAddDecimal = true;
      }
    });
  });

document.querySelector('.js-equal')
  .addEventListener('click', () => {
    if (calculation === '' || isLastCharOperator()) {
      return;
    }
    calculateResult();
  });

document.querySelector('.js-clear-last-char')
  .addEventListener('click', clearLastChar);

document.querySelector('.js-clear-all')
  .addEventListener('click', clearCalculation);

function appendValue(value) {
  calculation += value;
  updateDisplay();
  saveStorage();
}

function isLastCharOperator() {
  const lastChar = calculation.slice(-1);
  return ['+', '-', '*', '/'].includes(lastChar);
}

function clearCalculation() {
  calculation = '';
  updateDisplay();
  localStorage.removeItem('calculation');
  canAddDecimal = true;
}

function clearLastChar() {
  const lastChar = calculation.slice(-1);
  if (lastChar === '.') {
    canAddDecimal = true;
  } else if (['+', '-', '*', '/'].includes(lastChar)) {
    canAddDecimal = false;
  }
  
  calculation = calculation.slice(0, -1);
  updateDisplay();
}

function calculateResult() {
  calculation = String(eval(calculation));
  updateDisplay();
  saveStorage();
}

function updateDisplay() {
  document.querySelector('.js-display').textContent = calculation;
}

function saveStorage() {
  localStorage.setItem('calculation', calculation);
}