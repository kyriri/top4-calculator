const calculator = function(num1 = 0, num2 = 0, fn) {
  switch (fn) {
    case 'sum':
      return num1 + num2;
    case 'minus':
      return num1 - num2;
    case 'mult':
      return num1 * num2;
    case 'divi':
      let result = num1 / num2;
      if (isNaN(result)) return 'Error'
      if (result === Infinity) return '∞'
      return result;
  }
}

module.exports = calculator
