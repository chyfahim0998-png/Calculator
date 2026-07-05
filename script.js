let display = document.getElementById('display');
let expression = '';
let justCalculated = false;

function updateDisplay() {
  display.value = expression.replace(/\*/g, '×').replace(/\//g, '÷');
}

function appendValue(value) {
  if (justCalculated) {
    expression = '';
    justCalculated = false;
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
    expression = eval(expression).toString();
    justCalculated = true;
    updateDisplay();
  } catch {
    display.value = 'Error';
    expression = '';
    justCalculated = true;
  }
}

function calculatePercent() {
  try {
    expression = (eval(expression) / 100).toString();
    justCalculated = true;
    updateDisplay();
  } catch {
    display.value = 'Error';
    expression = '';
    justCalculated = true;
  }
}
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    btn.onclick();
  }, { passive: false });
});
