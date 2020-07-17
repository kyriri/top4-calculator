const calculator = require('./test')

describe('calculator properly format', function() {
  it('representation error due to binary/decimal convertion', function() {
    expect(calculator(0.2, '×', 6)).toEqual('1.2');
  });
  it('big numbers with no trailing zeros', function() {
    expect(calculator(60000000000, '×', 2)).toEqual('1.2e+11');
  });
  it('small numbers with no trailing zeros', function() {
    expect(calculator(0.00010000, '×', 1)).toEqual('0.0001');
  });
});

describe('calculator, in addition mode,', function() {
  it('adds two positive integers', function() {
    expect(calculator(2,'+', 5)).toEqual('7');
  });
  it('adds negative numbers', function() {
    expect(calculator(-2, '+', -5)).toEqual('-7');
  });
  it('adds negative number first', function() {
    expect(calculator(-2, '+', 5)).toEqual('3');
  });
  it('adds negative number last', function() {
    expect(calculator(2,'+', -5)).toEqual('-3');
  });
  it('adds decimals', function() {
    expect(calculator(2.05, '+', 5.8)).toEqual('7.85');
  });
  it('adds big numbers', function() {
    expect(calculator(2865, '+', 95648254)).toEqual('95651119');
  });
  it('handles zero first', function() {
    expect(calculator(0, '+', 5)).toEqual('5');
  });
  it('handles zero last', function() {
    expect(calculator(2, '+', 0)).toEqual('2');
  });
  it('handles all zeros', function() {
    expect(calculator(0, '+', 0)).toEqual('0');
  });
  it('coerces properly', function() {
    expect(calculator(null, '+', undefined)).toEqual('0');
  });
});

describe('calculator, in subtraction mode,', function() {
  it('multiplies two positive integers', function() {
    expect(calculator(3, '-', 7)).toEqual('-4');
  });
  it('subtracts negative numbers', function() {
    expect(calculator(-3, '-', -7)).toEqual('4');
  });
  it('subtracts negative number first', function() {
    expect(calculator(-3, '-', 7)).toEqual('-10');
  });
  it('subtracts negative number last', function() {
    expect(calculator(3, '-', -7)).toEqual('10');
  });
  it('subtracts decimals', function() {
    expect(calculator(3.2, '-', 7.08)).toEqual('-3.88');
  });
  it('subtracts big numbers', function() {
    expect(calculator(2865, '-', 95648254)).toEqual('-95645389');
  });
  it('handles zero first', function() {
    expect(calculator(0, '-', 5)).toEqual('-5');
  });
  it('handles zero last', function() {
    expect(calculator(2, '-', 0)).toEqual('2');
  });
  it('handles all zeros', function() {
    expect(calculator(0, '-', 0)).toEqual('0');
  });
  it('coerces properly', function() {
    expect(calculator(null, '-', undefined)).toEqual('0');
  });
});

describe('calculator, in multiplication mode,', function() {
  it('multiplies two positive integers', function() {
    expect(calculator(3, '×', 7)).toEqual('21');
  });
  it('multiplies negative numbers', function() {
    expect(calculator(-6, '×', -2)).toEqual('12');
  });
  it('multiplies negative number first', function() {
    expect(calculator(-3, '×', 7)).toEqual('-21');
  });
  it('multiplies negative number last', function() {
    expect(calculator(8, '×', -1)).toEqual('-8');
  });
  it('multiplies decimals', function() {
    expect(calculator(3.2, '×', 7.08)).toEqual('22.656');
  });
  it('multiplies big numbers', function() {
    expect(calculator(2865, '×', 48254)).toEqual('138247710');
  });
  it('handles zero first', function() {
    expect(calculator(0, '×', 5)).toEqual('0');
  });
  it('handles zero last', function() {
    expect(calculator(2, '×', 0)).toEqual('0');
  });
  it('handles all zeros', function() {
    expect(calculator(0, '×', 0)).toEqual('0');
  });
  it('coerces properly', function() {
    expect(calculator(null, '×', undefined)).toEqual('0');
  });
});

describe('calculator, in division mode,', function() {
  it('divides two positive integers', function() {
    expect(calculator(3, '÷', 7)).toEqual('0.428571429');
  });
  it('divides negative numbers', function() {
    expect(calculator(-6, '÷', -2)).toEqual('3');
  });
  it('divides negative number first', function() {
    expect(calculator(-10, '÷', 5)).toEqual('-2');
  });
  it('divides negative number last', function() {
    expect(calculator(8, '÷', -2)).toEqual('-4');
  });
  it('divides decimals', function() {
    expect(calculator(8.5, '÷', 2)).toEqual('4.25');
  });
  it('divides big numbers', function() {
    expect(calculator(138247710, '÷', 48254)).toEqual('2865');
  });
  it('handles zero first', function() {
    expect(calculator(0, '÷', 5)).toEqual('0');
  });
  it('handles zero last', function() {
    expect(calculator(2, '÷', 0)).toEqual('Error');
  });
  it('handles all zeros', function() {
    expect(calculator(0, '÷', 0)).toEqual('Error');
  });
  it('coerces null properly', function() {
    expect(calculator(null, '÷', 1)).toEqual('0');
  });
  it('coerces undefined properly', function() {
    expect(calculator(undefined, '÷', 51)).toEqual('0');
  });
});
