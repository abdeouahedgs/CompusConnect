const screen = document.getElementById('screen');
const operationDisplay = document.getElementById('operation');
const buttons = document.querySelectorAll('.btn');
const themeToggle = document.getElementById('theme-toggle');

let current = '';
let lastOperation = '';

function updateScreen() {
  screen.value = current || '0';
}

function toExpression(str) {
  return str
    .replace(/×/g, '*')
    .replace(/÷/g, '/');
}

buttons.forEach(btn => {
  const value = btn.getAttribute('data-value');
  const action = btn.getAttribute('data-action');

  btn.addEventListener('click', () => {
    if (action === 'clear') {
      current = '';
      lastOperation = '';
      operationDisplay.textContent = '';
      updateScreen();
      return;
    }

    if (action === 'delete') {
      current = current.slice(0, -1);
      updateScreen();
      return;
    }

    if (action === 'sign') {
      if (!current) return;
      if (current.startsWith('-')) {
        current = current.slice(1);
      } else {
        current = '-' + current;
      }
      updateScreen();
      return;
    }

    if (action === 'equal') {
      if (!current) return;
      try {
        const expr = toExpression(current);
        const result = eval(expr);
        lastOperation = current + ' =';
        operationDisplay.textContent = lastOperation;
        current = String(result);
        updateScreen();
      } catch (e) {
        operationDisplay.textContent = 'Erreur';
        current = '';
        updateScreen();
      }
      return;
    }

    if (value !== null) {
      if (value === '.' && current.endsWith('.')) return;
      current += value;
      updateScreen();
    }
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});