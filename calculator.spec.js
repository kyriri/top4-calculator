const calculator = require('./calculator')

describe('calculator, in addition mode,', function() {
  it('adds two positive integers', function() {
    expect(calculator(2, 5, 'sum')).toEqual(7);
  });
  it('adds negative numbers', function() {
    expect(calculator(-2, -5, 'sum')).toEqual(-7);
  });
  it('adds negative number first', function() {
    expect(calculator(-2, 5, 'sum')).toEqual(3);
  });
  it('adds negative number last', function() {
    expect(calculator(2, -5, 'sum')).toEqual(-3);
  });
  it('adds decimals', function() {
    expect(calculator(2.05, 5.8, 'sum')).toEqual(7.85);
  });
  it('adds big numbers', function() {
    expect(calculator(2865, 95648254, 'sum')).toEqual(95651119);
  });
  it('handles zero first', function() {
    expect(calculator(0, 5, 'sum')).toEqual(5);
  });
  it('handles zero last', function() {
    expect(calculator(2, 0, 'sum')).toEqual(2);
  });
  it('handles all zeros', function() {
    expect(calculator(0, 0, 'sum')).toEqual(0);
  });
  it('coerces properly', function() {
    expect(calculator(null, undefined, 'sum')).toEqual(0);
  });
});

describe('calculator, in subtraction mode,', function() {
  it('multiplies two positive integers', function() {
    expect(calculator(3, 7, 'minus')).toEqual(-4);
  });
  it('subtracts negative numbers', function() {
    expect(calculator(-3, -7, 'minus')).toEqual(4);
  });
  it('subtracts negative number first', function() {
    expect(calculator(-3, 7, 'minus')).toEqual(-10);
  });
  it('subtracts negative number last', function() {
    expect(calculator(3, -7, 'minus')).toEqual(10);
  });
  it('subtracts decimals', function() {
    expect(calculator(3.2, 7.08, 'minus')).toEqual(-3.88);
  });
  it('subtracts big numbers', function() {
    expect(calculator(2865, 95648254, 'minus')).toEqual(-95645389);
  });
  it('handles zero first', function() {
    expect(calculator(0, 5, 'minus')).toEqual(-5);
  });
  it('handles zero last', function() {
    expect(calculator(2, 0, 'minus')).toEqual(2);
  });
  it('handles all zeros', function() {
    expect(calculator(0, 0, 'minus')).toEqual(0);
  });
  it('coerces properly', function() {
    expect(calculator(null, undefined, 'minus')).toEqual(0);
  });
});

describe('calculator, in multiplication mode,', function() {
  it('multiplies two positive integers', function() {
    expect(calculator(3, 7, 'mult')).toEqual(21);
  });
  it('multiplies negative numbers', function() {
    expect(calculator(-6, -2, 'mult')).toEqual(12);
  });
  it('multiplies negative number first', function() {
    expect(calculator(-3, 7, 'mult')).toEqual(-21);
  });
  it('multiplies negative number last', function() {
    expect(calculator(8, -1, 'mult')).toEqual(-8);
  });
  it('multiplies decimals', function() {
    expect(calculator(3.2, 7.08, 'mult')).toEqual(22.656);
  });
  it('multiplies big numbers', function() {
    expect(calculator(2865, 48254, 'mult')).toEqual(138247710);
  });
  it('handles zero first', function() {
    expect(calculator(0, 5, 'mult')).toEqual(0);
  });
  it('handles zero last', function() {
    expect(calculator(2, 0, 'mult')).toEqual(0);
  });
  it('handles all zeros', function() {
    expect(calculator(0, 0, 'mult')).toEqual(0);
  });
  it('coerces properly', function() {
    expect(calculator(null, undefined, 'mult')).toEqual(0);
  });
});

describe('calculator, in division mode,', function() {
  it('divides two positive integers', function() {
    expect(calculator(3, 7, 'divi')).toEqual(3/7);
  });
  it('divides negative numbers', function() {
    expect(calculator(-6, -2, 'divi')).toEqual(3);
  });
  it('divides negative number first', function() {
    expect(calculator(-10, 5, 'divi')).toEqual(-2);
  });
  it('divides negative number last', function() {
    expect(calculator(8, -2, 'divi')).toEqual(-4);
  });
  it('divides decimals', function() {
    expect(calculator(8.5, 2, 'divi')).toEqual(4.25);
  });
  it('divides big numbers', function() {
    expect(calculator(138247710, 48254, 'divi')).toEqual(2865);
  });
  it('handles zero first', function() {
    expect(calculator(0, 5, 'divi')).toEqual(0);
  });
  it('handles zero last', function() {
    expect(calculator(2, 0, 'divi')).toEqual('∞');
  });
  it('handles all zeros', function() {
    expect(calculator(0, 0, 'divi')).toEqual('Error');
  });
  it('coerces null properly', function() {
    expect(calculator(null, 1, 'divi')).toEqual(0);
  });
  it('coerces undefined properly', function() {
    expect(calculator(undefined, 51, 'divi')).toEqual(0);
  });
});