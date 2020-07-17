// Author: Kyriri
// Author page: https://github.com/kyriri

const display = document.getElementsByClassName('display-inner')[0];
let memory = [
  null, // number position
  null, // function position
  null, // number position
];

function identifyInput(e) {
    let input = e.target.id || e.key || 'void';
    if (input.match(/k[0-9]/)) input = input.slice(-1);
    switch (true) {
      case (e.code == 'Space'):
        return;
      case (!isNaN(input*1)):
        break;
      case (input == '.' || input == ',' || input == 'dot'):
        input = '.';
        break;
      case (input == '+') || input == 'sum':
        input = '+';
        break;
      case (input == '-' || input == 'minus'):
        input = '-';
        break;
      case (input == '*' || input == 'mult'):
        input = '×';
        break;
      case (input == '/' || input == 'divi'):
        input = '÷';
        break;
      case (input == 'Backspace' || input == 'Delete' || input == 'clear'):
        input = 'clear';
        break;
      case (input == 'Escape' || input == 'restart'):
        input = 'restart';
        break;
      case (input == 'Enter' || input == '=' || input == 'equals'):
        input = 'equals';
        break;
      default:
        return;
    }
  const numerical = input.match(/[0-9]/) || input.match(/\./);
  // above, we could tersely write both conditions inside the same 
  // regex but them it can return an empty array [''], and that 
  // fools the Boolean test
  return numerical ? { 
      type: 'num',
      value: numerical[0], 
    } : {
      type: 'fn',
      value: input,
    };
}
function placeInput(input) {
  if (!input) return;
  if (input.value == 'restart') { restart(); return; }
  if (input.value == 'clear') { clear(); return; }

  if (input.type == 'num') {
    if (memory[1] == 'equals') {
      memory[0] = null;
      memory[1] = null;
    }
    let position = memory[1] === null ? 0 : 2;
    if (input.value == '.' && memory[position] === null) memory[position] = '0';
    
    if (memory[position] === null) memory[position] = input.value;
    else {
      if (input.value == '.' && memory[position].includes('.')) return;
      memory[position] += input.value;
    }
  }
  if (input.type == 'fn') {
    if (!memory[0]) {
      if (input.value == '-') memory[0] = '-';
      else return;
    }
    else if (!memory[2]) memory[1] = input.value;
    else {
      memory[0] = calculate(memory[0], memory[1], memory[2]);
      if (memory[0] == 'Error') {
        restart();
        updateDisplay('Error');
        return;
      } else {
        memory[1] = input.value;
        memory[2] = null;
      }
    }
  }
  updateDisplay();
}
function updateDisplay(info) {
  display.innerHTML = ( 
    info 
    || ((memory[0] || '') + 
        (memory[1] == 'equals' ? '' : memory[1] || '') + 
        (memory[2] || '')
    ) || '0' 
  );
}
function restart() {
  memory[0] = null; 
  memory[1] = null;
  memory[2] = null;
  updateDisplay('0');
}
function clear() {
  // erases the last input on the last non-empty memory position
  switch (true) {
    case (memory[2] !== null):
      if (memory[2].length === 1) {
        memory[2] = null;
      } else memory[2] = memory[2].slice(0,-1);
      break;
    case (memory[1] !== 'equals' && memory[1] !== null):
      memory[1] = null;
      break;
    case (memory[1] == 'equals'):
      memory[1] = null;
    default:
      if (memory[0] === null) return; 
      else if (memory[0].length === 1) memory[0] = null;
      else memory[0] = memory[0].slice(0,-1);
  }
  updateDisplay();
}
function calculate(num1 = 0, fn, num2 = 0) {
  let result;
  num1 = +num1;
  num2 = +num2;
  switch (fn) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '×':
      result = num1 * num2;
      break;
    case '÷':
      result = num1 / num2;
    }
  if (isNaN(result) || Math.abs(result) === Infinity) return 'Error';
  
  // below, to avoid float point issues (such as 0.1 + 0.2 != 0.3)
  // if after a dot there are 7 or more zeros in a row, 
  // it ignores everything after the first zero
  if (String(result).match(/.*\..*0{7,}/)) result = String(result).slice(0, String(result).match(/0{7,}/).index);
  
  // big numbers get converted to scientific notation,
  // and numbers with many decimals get rounded to the last decimal place the display can show
  if (Math.abs(result) >= 1e11) result = result.toExponential(5);
  else if (
    String(result).length > 11 &&
    result - Math.floor(result) !== 0
    ) {
    let integerLength = String(Math.floor(result)).length;
    let cases = (11 - 1 - integerLength) < 0 ? 0 : 11 - 1 - integerLength;
    result = result.toFixed(cases);
  }
  return String(result);
}
function run(e) {
  placeInput(identifyInput(e));
}
window.addEventListener('click', run);
window.addEventListener('keydown', run);