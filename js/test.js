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
  
  if (String(result).match(/.*\..*0{7,}/)) result = String(result).slice(0, String(result).match(/0{7,}/).index);
  // above, to avoid float point issues (such as 0.1 + 0.2 != 0.3)
  // if after a dot there are 7 or more zeros in a row, 
  // it ignores everything after the first zero
  
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
  // ignore trailing zeros in scientific notation and decimal representation
  result = String(result);
  if (result.match(/\.*0+e/)) { 
    let beg = result.slice(0, result.match(/0+e/).index);
    let end = result.match(/e.+/)[0];
    result = beg + end; 
  } else
  if (result.match(/\..*0+$/)) {
    result = result.slice(0, result.match(/0+$/).index) || 0;
  } 
  return result;
}
module.exports = calculate