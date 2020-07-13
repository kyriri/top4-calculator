// Author: Kyriri
// Author page: https://github.com/kyriri

const display = document.getElementsByClassName('display-inner')[0];
let usher = 0;
let memory = [
  null, // number position
  null, // function position
  null, // number position
];

function identifyInput(e) {
  if (e.target.id) {
    input = e.target.id === 'dot' ? '.' : e.target.id ;
  } else {
    input = e.key;
    switch (true) {
      case (e.code == 'Space'):
        return;
      case (!isNaN(input*1)):
        break;
      case (input == '.' || input ==','):
        input = '.';
        break;
      case (input == '+'):
        input = 'sum';
        break;
      case (input == '-'):
        input = 'minus';
        break;
      case (input == '*'):
        input = 'mult';
        break;
      case (input == '/'):
        input = 'divi';
        break;
      case (input == 'Backspace' || input == 'Delete'):
        input = 'clear';
        break;
      case (input == 'Escape'):
        input = 'restart';
        break;
      case (input == 'Enter' || input == '='):
        input = 'equals';
        break;
      default:
        return;
    }
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

  if (usher % 2 === 0) {       // usher points to number position...
    if (input.type == 'num') { 
      if (memory[usher] && memory[usher].length > 10) return;
      if (memory[usher] && input.value === '.' && memory[usher].match(/\./)) return;
      if (memory[usher] === null) memory[usher] = input.value;
      else memory[usher] += input.value;
    } 
    if (input.type == 'fn') { 
      if (usher === 0) {
        if (memory[0] === null && input.value != 'minus') return;
        if (memory[0] === null && input.value == 'minus') {
          memory[0] = '-';
          usher = 0;
        } else {
          memory[1] = input.value;
          usher = 1;
        }
      } 
      if (usher === 2) {
        if (memory[2] === null) memory[1] = input.value;
        else {
          memory[0] = calculate(memory[0], memory[1], memory[2]);
          if (memory[0] == 'Error') {
            restart();
            updateDisplay('Error');
          } else {
            memory[1] = input.value;
            memory[2] = null;
            usher = 1;
          }
        }
      }
    }
  } else { // usher points to function position (that is, 1)
    if (input.type == 'num') {
      if (memory[1] == 'equals') {
        memory[0] = input.value;
        restart('equals');
      } else {
        memory[2] = input.value;
        usher = 2;
      }
    } else {
      memory[1] = input.value;
    }
  }
  updateDisplay();
}
function updateDisplay(info) {
  display.innerHTML = info ? info : memory.reduce( (acc, item) => { 
    let char;
    if (item === null) char = '';
    else {
      switch (item) {
        case 'minus':
          char = '-';
          break;
        case 'sum':
          char = '+';
          break;
        case 'mult':
          char = '×';
          break;      
        case 'divi':
          char = '÷';
          break;   
        case 'equals':
          char = '';
          break;   
        default:
          char = item;
      }
    } 
    return acc + char;
  }, '');
}
function restart(exception) {
  if (!exception) memory[0] = null; 
  memory[1] = null;
  memory[2] = null;
  usher = 0;
  updateDisplay('0');
}
function clear() {
  switch (true) {
    case (memory[2] !== null):
      if (memory[2].length === 1) {
        memory[2] = null;
        usher = 1;
      } else memory[2] = memory[2].slice(0,-1);
      break;
    case (memory[1] !== 'equals' && memory[1] !== null):
      memory[1] = null;
      usher = 0;
      break;
    case (memory[1] == 'equals'):
      memory[1] = null;
    default:
      if (memory[0] === null) return;
      else if (memory[0].length === 1) memory[0] = null;
      else memory[0] = memory[0].slice(0,-1);
      usher = 0;
  }
  updateDisplay();
}
function calculate(num1 = 0, fn, num2 = 0) {
  let result;
  num1 = +num1;
  num2 = +num2;
  switch (fn) {
    case 'sum':
      result = num1 + num2;
      break;
    case 'minus':
      result = num1 - num2;
      break;
    case 'mult':
      result = num1 * num2;
      break;
    case 'divi':
      result = num1 / num2;
    }
  if (isNaN(result) || Math.abs(result) === Infinity) return 'Error';
  if (String(result).match(/.*\..*0{7,}/)) result = String(result).slice(0, String(result).match(/0{7,}/).index);
  // above, to avoid float point issues (such as 0.1 + 0.2 != 0.3)
  // if after a dot there are 7 or more zeros in a row, 
  // it ignores everything after the first zero
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