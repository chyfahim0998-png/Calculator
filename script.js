let display = document.getElementById('display');
let historyPanel = document.getElementById('historyPanel');
let expression = '';
let justCalculated = false;
let calcHistory = [];

function updateDisplay() {
  display.value = expression.replace(/\*/g, '×').replace(/\//g, '÷');
}

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

function appendValue(value) {
  if (justCalculated) {
    if (isOperator(value)) {
      justCalculated = false;
    } else {
      expression = '';
      justCalculated = false;
    }
  }

  if (isOperator(value)) {
    if (expression === '') {
      if (value === '-') {
        expression += value;
      }
      updateDisplay();
      return;
    }
    if (isOperator(expression.slice(-1))) {
      expression = expression.slice(0, -1) + value;
      updateDisplay();
      return;
    }
  }

  expression += value;
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  justCalculated = false;
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(expression).toString();
    addToHistory(expression, result);
    expression = result;
    justCalculated = true;
    updateDisplay();
  } catch {
    display.value = 'Error';
    expression = '';
    justCalculated = true;
  }
}

function calculatePercent() {
  if (expression === '' || isOperator(expression.slice(-1))) {
    return;
  }
  try {
    const result = (eval(expression) / 100).toString();
    addToHistory(expression + ' %', result);
    expression = result;
    justCalculated = true;
    updateDisplay();
  } catch {
    display.value = 'Error';
    expression = '';
    justCalculated = true;
  }
}

function addToHistory(expr, result) {
  const shown = expr.replace(/\*/g, '×').replace(/\//g, '÷');
  calcHistory.unshift({ expr: shown, result });
  if (calcHistory.length > 15) calcHistory.pop();
  renderHistory();
}

function renderHistory() {
  if (calcHistory.length === 0) {
    historyPanel.innerHTML = '<div class="history-empty">No calculations yet</div>';
    return;
  }
  historyPanel.innerHTML = calcHistory.map(item =>
    `<div class="history-item" onclick="loadFromHistory('${item.result}')">${item.expr} = ${item.result}</div>`
  ).join('');
}

function loadFromHistory(result) {
  expression = result;
  justCalculated = true;
  updateDisplay();
  historyPanel.classList.remove('open');
}

function toggleHistory() {
  historyPanel.classList.toggle('open');
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    btn.onclick();
  }, { passive: false });
});
