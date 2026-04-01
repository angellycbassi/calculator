let calculation = localStorage.getItem('calculation') || '';
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
      appendValue(event.key);
    } else {
      if (calculation === '' || isLastCharOperator()) {
        return;
      }
      appendValue(event.key);
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
        appendValue(value);
      } else {
        if (calculation === '' || isLastCharOperator()) {
          return;
        }
        appendValue(value);
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

document.querySelector('.js-clear')
  .addEventListener('click', clearCalculation);

function appendValue(value) {
  calculation += value;
  updateDisplay();
  saveStorage();
}

function isLastCharOperator() {
  const lastChar = calculation.slice(-1);
  return ['+', '-', '*', '/', '.'].includes(lastChar);
}

function clearCalculation() {
  calculation = '';
  updateDisplay();
  localStorage.removeItem('calculation');
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