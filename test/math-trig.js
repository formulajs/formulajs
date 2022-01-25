import 'should'

import * as error from '../src/utils/error.js'
import * as mathTrig from '../src/math-trig.js'

describe('Math & Trig', () => {
  it('ABS', () => {
    mathTrig.ABS().should.equal(0)
    mathTrig.ABS(undefined).should.equal(0)
    mathTrig.ABS(error.na).should.equal(error.na)
    mathTrig.ABS(-1).should.equal(1)
    mathTrig.ABS('invalid').should.equal(error.value)
  })

  it('ACOS', () => {
    mathTrig.ACOS().should.equal(mathTrig.ACOS(0))
    mathTrig.ACOS(undefined).should.equal(mathTrig.ACOS(0))
    mathTrig.ACOS(error.na).should.equal(error.na)
    mathTrig.ACOS(100).should.equal(error.num)
    mathTrig.ACOS(1).should.equal(0)
    mathTrig.ACOS('invalid').should.equal(error.value)
  })

  it('ACOSH', () => {
    mathTrig.ACOSH().should.equal(error.num)
    mathTrig.ACOSH(undefined).should.equal(error.num)
    mathTrig.ACOSH(error.na).should.equal(error.na)
    mathTrig.ACOSH(-100).should.equal(error.num)
    mathTrig.ACOSH(1).should.equal(0)
    mathTrig.ACOSH('invalid').should.equal(error.value)
  })

  it('ACOT', () => {
    mathTrig.ACOT().should.equal(mathTrig.ACOT(0))
    mathTrig.ACOT(undefined).should.equal(mathTrig.ACOT(0))
    mathTrig.ACOT(error.na).should.equal(error.na)
    mathTrig.ACOT(1).should.approximately(0.7853981633974483, 1e-9)
    mathTrig.ACOT('invalid').should.equal(error.value)
  })

  it('ACOTH', () => {
    mathTrig.ACOTH().should.equal(error.num)
    mathTrig.ACOTH(undefined).should.equal(error.num)
    mathTrig.ACOTH(error.na).should.equal(error.na)
    mathTrig.ACOTH(0.1).should.equal(error.num)
    mathTrig.ACOTH(1).should.equal(Infinity)
    mathTrig.ACOTH('invalid').should.equal(error.value)
  })

  it('ADD', () => {
    mathTrig.ADD(10, 4).should.equal(14)
    mathTrig.ADD(1.2, 4).should.equal(5.2)
    mathTrig.ADD(1, 'string').should.equal(error.value)

    mathTrig.ADD().should.equal(error.na)
    mathTrig.ADD(undefined, undefined).should.equal(0)
    mathTrig.ADD(1, undefined).should.equal(1)
    mathTrig.ADD(undefined, 1).should.equal(1)
    mathTrig.ADD(null, undefined).should.equal(0)
    mathTrig.ADD(undefined, null).should.equal(0)
    mathTrig.ADD(null, null).should.equal(0)
    mathTrig.ADD(null, 1).should.equal(1)
    mathTrig.ADD(error.na, undefined).should.equal(error.na)
    mathTrig.ADD(error.na, null).should.equal(error.na)
    mathTrig.ADD(error.na, 1).should.equal(error.na)
    mathTrig.ADD(true, false).should.equal(1)
  })

  // TODO: more edge cases, explore the second argument (options)
  it('AGGREGATE', () => {
    mathTrig.AGGREGATE(1, 4, [1, 2, 3]).should.equal(2)
    mathTrig.AGGREGATE(2, 4, [1, 2, 3, 'does not count']).should.equal(3)
    mathTrig.AGGREGATE(3, 4, [1, 2, 3, 'counts']).should.equal(4)
    mathTrig.AGGREGATE(4, 4, [1, 2, 3]).should.equal(3)
    mathTrig.AGGREGATE(5, 4, [1, 2, 3]).should.equal(1)
    mathTrig.AGGREGATE(6, 4, [1, 2, 3]).should.equal(6)
    mathTrig.AGGREGATE(7, 4, [1, 2, 3]).should.equal(1)
    mathTrig.AGGREGATE(8, 4, [1, 2, 3]).should.approximately(0.816496580927726, 1e-9)
    mathTrig.AGGREGATE(9, 4, [1, 2, 3]).should.equal(6)
    mathTrig.AGGREGATE(10, 4, [1, 2, 3]).should.equal(1)
    mathTrig.AGGREGATE(11, 4, [1, 2, 3]).should.approximately(0.6666666666666666, 1e-9)
    mathTrig.AGGREGATE(12, 4, [1, 2, 3]).should.equal(2)
    mathTrig.AGGREGATE(13, 4, [1, 2, 3]).should.equal(1)
    mathTrig.AGGREGATE(14, 4, [1, 2, 3], 2).should.equal(2)
    mathTrig.AGGREGATE(15, 4, [1, 2, 3], 2).should.equal(2)
    mathTrig.AGGREGATE(16, 4, [1, 2, 3], 0.4).should.approximately(1.8, 1e-9)
    mathTrig.AGGREGATE(17, 4, [1, 2, 3], 2).should.equal(2)
    mathTrig.AGGREGATE(18, 4, [1, 2, 3], 0.4).should.approximately(1.6, 1e-9)
    mathTrig.AGGREGATE(19, 4, [1, 2, 3], 2).should.equal(2)
    mathTrig.AGGREGATE('invalid', 4, [1, 2, 3], 2).should.equal(error.value)
  })

  it('ARABIC', () => {
    mathTrig.ARABIC(undefined).should.equal(0)
    mathTrig.ARABIC(error.na).should.equal(error.na)
    mathTrig.ARABIC('X').should.equal(10)
    mathTrig.ARABIC('ABC').should.equal(error.value)
  })

  it('ASIN', () => {
    mathTrig.ASIN(undefined).should.equal(0)
    mathTrig.ASIN(error.na).should.equal(error.na)
    mathTrig.ASIN(0.5).should.approximately(0.5235987755982989, 1e-9)
    mathTrig.ASIN(-100).should.equal(error.num)
    mathTrig.ASIN('invalid').should.equal(error.value)
  })

  it('ASINH', () => {
    mathTrig.ASINH(undefined).should.equal(0)
    mathTrig.ASINH(error.na).should.equal(error.na)
    mathTrig.ASINH(0.5).should.approximately(0.48121182505960347, 1e-9)
    mathTrig.ASINH('invalid').should.equal(error.value)
  })

  it('ATAN', () => {
    mathTrig.ATAN(undefined).should.equal(0)
    mathTrig.ATAN(error.na).should.equal(error.na)
    mathTrig.ATAN(1).should.approximately(0.7853981633974483, 1e-9)
    mathTrig.ATAN('invalid').should.equal(error.value)
  })

  it('ATAN2', () => {
    mathTrig.ATAN2(undefined).should.equal(0)
    mathTrig.ATAN2(error.na).should.equal(error.na)
    mathTrig.ATAN2(1, 1).should.approximately(0.7853981633974483, 1e-9)
    mathTrig.ATAN2(1, 'invalid').should.equal(error.value)
  })

  it('ATANH', () => {
    mathTrig.ATANH(undefined).should.equal(0)
    mathTrig.ATANH(error.na).should.equal(error.na)
    mathTrig.ATANH(1).should.equal(Infinity)
    mathTrig.ATANH('invalid').should.equal(error.value)
    mathTrig.ATANH(100).should.equal(error.num)
  })

  it('BASE', () => {
    mathTrig.BASE(undefined, undefined).should.equal(error.num)
    mathTrig.BASE(7, undefined).should.equal(error.num)
    mathTrig.BASE(7, null).should.equal(error.num)
    mathTrig.BASE(undefined, 2).should.equal('0')
    mathTrig.BASE(error.na, 2).should.equal(error.na)
    mathTrig.BASE(2, error.na).should.equal(error.na)
    mathTrig.BASE(7, 2).should.equal('111')
    mathTrig.BASE(400, 10, 10).should.equal('0000000400')
    mathTrig.BASE('invalid', 10, 10).should.equal(error.value)
  })

  it('CEILING', () => {
    mathTrig.CEILING(undefined).should.equal(0)
    mathTrig.CEILING(error.na).should.equal(error.na)
    mathTrig.CEILING(1, error.na).should.equal(error.na)
    mathTrig.CEILING(4.1).should.equal(0)
    mathTrig.CEILING(4.1, 1).should.equal(5)
    mathTrig.CEILING(-4.1, 1).should.equal(-4)
    mathTrig.CEILING(4.1, 0).should.equal(0)
    mathTrig.CEILING(4.1, 1).should.equal(5)
    mathTrig.CEILING(4.1, 2).should.equal(6)
    mathTrig.CEILING(-4.1, 2).should.equal(-4)
    mathTrig.CEILING(-4.1, -2).should.equal(-4)
    mathTrig.CEILING(1.234, 0.1).should.approximately(1.3, 1e-9)
    mathTrig.CEILING(-1.234, 0.1).should.approximately(-1.2, 1e-9)
    mathTrig.CEILING(-1.234, -0.1).should.approximately(-1.2, 1e-9)
    mathTrig.CEILING(-1.234, -0.01).should.approximately(-1.23, 1e-9)
    mathTrig.CEILING(-1.234, -0.001).should.approximately(-1.234, 1e-9)
    mathTrig.CEILING(-4.1, 2, 0).should.equal(-4)
    mathTrig.CEILING(-4.1, 2, -1).should.equal(-6)
    mathTrig.CEILING(-4.1, -2, 0).should.equal(-4)
    mathTrig.CEILING(-4.1, -2, -1).should.equal(-6)
    mathTrig.CEILING(-4.1, -2, 'invalid').should.equal(error.value)
  })

  it('CEILING.MATH', () => {
    mathTrig.CEILING.MATH(undefined).should.equal(0)
    mathTrig.CEILING.MATH(error.na).should.equal(error.na)
    mathTrig.CEILING.MATH(24.3, 5).should.equal(25)
    mathTrig.CEILING.MATH(6.7).should.equal(0)
    mathTrig.CEILING.MATH(6.7, 1).should.equal(7)
    mathTrig.CEILING.MATH(-8.1, 2).should.equal(-8)
    mathTrig.CEILING.MATH(-5.5, 2, -1).should.equal(-6)
    mathTrig.CEILING.MATH(-5.5, 2, 'invalid').should.equal(error.value)
  })

  it('CEILING.PRECISE', () => {
    mathTrig.CEILING.PRECISE(undefined).should.equal(0)
    mathTrig.CEILING.PRECISE(error.na).should.equal(error.na)
    mathTrig.CEILING.PRECISE(4.3).should.equal(0)
    mathTrig.CEILING.PRECISE(4.3, 1).should.equal(5)
    mathTrig.CEILING.PRECISE(-4.3, 1).should.equal(-4)
    mathTrig.CEILING.PRECISE(4.3, 2).should.equal(6)
    mathTrig.CEILING.PRECISE(4.3, -2).should.equal(6)
    mathTrig.CEILING.PRECISE(-4.3, 2).should.equal(-4)
    mathTrig.CEILING.PRECISE(-4.3, -2).should.equal(-4)
    mathTrig.CEILING.PRECISE(-4.3, 'invalid').should.equal(error.value)
  })

  it('COMBIN', () => {
    mathTrig.COMBIN(undefined, undefined).should.equal(1)
    mathTrig.COMBIN(10, undefined).should.equal(1)
    mathTrig.COMBIN(undefined, 10).should.equal(error.num)
    mathTrig.COMBIN(error.na).should.equal(error.na)
    mathTrig.COMBIN(5, 10).should.equal(error.num)
    mathTrig.COMBIN(0, 0).should.equal(1)
    mathTrig.COMBIN(1, 0).should.equal(1)
    mathTrig.COMBIN(1, 1).should.equal(1)
    mathTrig.COMBIN(2, 1).should.equal(2)
    mathTrig.COMBIN(2, 2).should.equal(1)
    mathTrig.COMBIN(3, 1).should.equal(3)
    mathTrig.COMBIN(3, 2).should.equal(3)
    mathTrig.COMBIN(3, 3).should.equal(1)
    mathTrig.COMBIN(10, 3).should.equal(120)
    mathTrig.COMBIN(10, 'invalid').should.equal(error.value)
  })

  it('COMBINA', () => {
    mathTrig.COMBINA(undefined, undefined).should.equal(1)
    mathTrig.COMBINA(10, undefined).should.equal(1)
    mathTrig.COMBINA(undefined, 10).should.equal(error.num)
    mathTrig.COMBINA(error.na).should.equal(error.na)
    mathTrig.COMBINA(0, 0).should.equal(1)
    mathTrig.COMBINA(1, 0).should.equal(1)
    mathTrig.COMBINA(1, 1).should.equal(1)
    mathTrig.COMBINA(2, 1).should.equal(2)
    mathTrig.COMBINA(2, 2).should.equal(3)
    mathTrig.COMBINA(3, 1).should.equal(3)
    mathTrig.COMBINA(3, 2).should.equal(6)
    mathTrig.COMBINA(3, 3).should.equal(10)
    mathTrig.COMBINA(10, 3).should.equal(220)
    mathTrig.COMBINA(10, 'invalid').should.equal(error.value)
  })

  it('COS', () => {
    mathTrig.COS(undefined).should.equal(1)
    mathTrig.COS(error.na).should.equal(error.na)
    mathTrig.COS(0).should.equal(1)
    mathTrig.COS('invalid').should.equal(error.value)
  })

  it('COSH', () => {
    mathTrig.COSH(undefined).should.equal(1)
    mathTrig.COSH(error.na).should.equal(error.na)
    mathTrig.COSH(0).should.equal(1)
    mathTrig.COSH('invalid').should.equal(error.value)
  })

  it('COT', () => {
    mathTrig.COT(undefined).should.equal(error.div0)
    mathTrig.COT(0).should.equal(error.div0)
    mathTrig.COT(error.na).should.equal(error.na)
    mathTrig.COT(1).should.approximately(0.6420926159343306, 1e-9)
    mathTrig.COT('invalid').should.equal(error.value)
  })

  it('COTH', () => {
    mathTrig.COTH(undefined).should.equal(error.div0)
    mathTrig.COTH(0).should.equal(error.div0)
    mathTrig.COTH(error.na).should.equal(error.na)
    mathTrig.COTH(1).should.approximately(1.3130352854993312, 1e-9)
    mathTrig.COTH('invalid').should.equal(error.value)
  })

  it('CSC', () => {
    mathTrig.CSC(undefined).should.equal(error.div0)
    mathTrig.CSC(0).should.equal(error.div0)
    mathTrig.CSC(error.na).should.equal(error.na)
    mathTrig.CSC('invalid').should.equal(error.value)
  })

  it('CSCH', () => {
    mathTrig.CSCH(undefined).should.equal(error.div0)
    mathTrig.CSCH(0).should.equal(error.div0)
    mathTrig.CSCH(error.na).should.equal(error.na)
    mathTrig.CSCH('invalid').should.equal(error.value)
  })

  it('DECIMAL', () => {
    mathTrig.DECIMAL(undefined, undefined).should.equal(error.num)
    mathTrig.DECIMAL(undefined, 2).should.equal(0)
    mathTrig.DECIMAL(2, undefined).should.equal(error.num)
    mathTrig.DECIMAL(error.na).should.equal(error.na)
    mathTrig.DECIMAL('0', 2).should.equal(0)
    mathTrig.DECIMAL('1', 2).should.equal(1)
    mathTrig.DECIMAL('10', 2).should.equal(2)
    mathTrig.DECIMAL('10', 10).should.equal(10)
    mathTrig.DECIMAL('FF', 16).should.equal(error.value) // Excel: error.num
    mathTrig.DECIMAL('ZZ', 36).should.equal(error.value) // Excel: error.num
    mathTrig.DECIMAL('invalid').should.equal.NaN
  })

  it('DEGREES', () => {
    mathTrig.DEGREES(undefined).should.equal(0)
    mathTrig.DEGREES(error.na).should.equal(error.na)
    mathTrig.DEGREES(Math.PI).should.equal(180)
    mathTrig.DEGREES('invalid').should.equal(error.value)
  })

  it('DIVIDE', () => {
    mathTrig.DIVIDE(10, 4).should.equal(2.5)
    mathTrig.DIVIDE(12, -6).should.equal(-2)
    mathTrig.DIVIDE(0, 0).should.equal(error.div0)
    mathTrig.DIVIDE(1, 0).should.equal(error.div0)
    mathTrig.DIVIDE(0, 1).should.equal(0)
    mathTrig.DIVIDE(1, 'string').should.equal(error.value)

    mathTrig.DIVIDE().should.equal(error.na)
    mathTrig.DIVIDE(undefined, undefined).should.equal(error.div0)
    mathTrig.DIVIDE(1, undefined).should.equal(error.div0)
    mathTrig.DIVIDE(undefined, 1).should.equal(0)
    mathTrig.DIVIDE(null, undefined).should.equal(error.div0)
    mathTrig.DIVIDE(undefined, null).should.equal(error.div0)
    mathTrig.DIVIDE(null, null).should.equal(error.div0)
    mathTrig.DIVIDE(null, 1).should.equal(0)
    mathTrig.DIVIDE(error.na, undefined).should.equal(error.na)
    mathTrig.DIVIDE(error.na, null).should.equal(error.na)
    mathTrig.DIVIDE(error.na, 1).should.equal(error.na)
    mathTrig.DIVIDE(false, true).should.equal(0)
  })

  it('EVEN', () => {
    mathTrig.EVEN(undefined).should.equal(0)
    mathTrig.EVEN(error.na).should.equal(error.na)
    mathTrig.EVEN(3).should.equal(4)
    mathTrig.EVEN('invalid').should.equal(error.value)
  })

  it('EQ', () => {
    mathTrig.EQ(10, 10).should.equal(true)
    mathTrig.EQ(1.2, 1.2).should.equal(true)
    mathTrig.EQ('hello', 'jim').should.equal(false)
    mathTrig.EQ('hello', 'hello').should.equal(true)
    mathTrig.EQ(123, 'hello').should.equal(false)
    mathTrig.EQ(true, true).should.equal(true)
    mathTrig.EQ(false, false).should.equal(true)
    mathTrig.EQ(false, 0).should.equal(false)

    mathTrig.EQ().should.equal(error.na)
    mathTrig.EQ(undefined, undefined).should.equal(true)
    mathTrig.EQ(null, null).should.equal(true)
    mathTrig.EQ(undefined, null).should.equal(true)
    mathTrig.EQ(error.na).should.equal(error.na)
    mathTrig.EQ(1, undefined).should.equal(false)
    mathTrig.EQ(1, 'string').should.equal(false)
  })

  it('EXP', () => {
    mathTrig.EXP().should.equal(error.na)
    mathTrig.EXP(undefined).should.equal(1)
    mathTrig.EXP(null).should.equal(1)
    mathTrig.EXP(error.na).should.equal(error.na)
    mathTrig.EXP('1').should.equal(2.718281828459045)
    mathTrig.EXP('a').should.equal(error.value)
    mathTrig.EXP(1, 1).should.equal(error.error)
    mathTrig.EXP(1).should.equal(2.718281828459045)
  })

  it('FACT', () => {
    mathTrig.FACT(undefined).should.equal(1)
    mathTrig.FACT(error.na).should.equal(error.na)
    mathTrig.FACT(6).should.equal(720)
    mathTrig.FACT('invalid').should.equal(error.value)
  })

  it('FACTDOUBLE', () => {
    mathTrig.FACTDOUBLE(undefined).should.equal(1)
    mathTrig.FACTDOUBLE(error.na).should.equal(error.na)
    mathTrig.FACTDOUBLE(10).should.equal(3840)
    mathTrig.FACTDOUBLE('invalid').should.equal(error.value)
  })

  it('FLOOR', () => {
    mathTrig.FLOOR(undefined, undefined).should.equal(0)
    mathTrig.FLOOR(2, undefined).should.equal(0) // different than Excel
    mathTrig.FLOOR(undefined, 2).should.equal(0)
    mathTrig.FLOOR(error.na).should.equal(error.na)
    mathTrig.FLOOR(3.7, 2).should.equal(2)
    mathTrig.FLOOR(-2.5, -2).should.equal(-2)
    mathTrig.FLOOR(2.5, -2).should.equal(error.num)
    mathTrig.FLOOR(1.58, 0.1).should.approximately(1.5, 1e-9)
    mathTrig.FLOOR(0.234, 0.01).should.approximately(0.23, 1e-9)
    mathTrig.FLOOR(0.234, 0).should.equal(0)
    mathTrig.FLOOR('invalid', 0).should.equal(error.value)
  })

  it('FLOOR.PRECISE', () => {
    mathTrig.FLOOR.PRECISE(undefined, undefined).should.equal(0)
    mathTrig.FLOOR.PRECISE(2, undefined).should.equal(0)
    mathTrig.FLOOR.PRECISE(undefined, 2).should.equal(0)
    mathTrig.FLOOR.PRECISE(error.na).should.equal(error.na)
    mathTrig.FLOOR.PRECISE(2014.6, 0.2).should.equal(2014.4)
    mathTrig.FLOOR.PRECISE(-3.2, -1).should.equal(-4)
    mathTrig.FLOOR.PRECISE(3.2, 1).should.equal(3)
    mathTrig.FLOOR.PRECISE(-3.2, 1).should.equal(-4)
    mathTrig.FLOOR.PRECISE(3.2, -1).should.equal(3)
    mathTrig.FLOOR.PRECISE(3.2).should.equal(0)
  })

  it('FLOOR.MATH', () => {
    mathTrig.FLOOR.MATH(undefined, undefined).should.equal(0)
    mathTrig.FLOOR.MATH(2, undefined).should.equal(0)
    mathTrig.FLOOR.MATH(undefined, 2).should.equal(0)
    mathTrig.FLOOR.MATH(error.na).should.equal(error.na)
    mathTrig.FLOOR.MATH(24.3, 5).should.equal(20)
    mathTrig.FLOOR.MATH(6.7).should.equal(0)
    mathTrig.FLOOR.MATH(-8.1, 2).should.equal(-10)
    mathTrig.FLOOR.MATH(-8.1, 0).should.equal(0)
    mathTrig.FLOOR.MATH(-5.5, 2, -1).should.equal(-4)
    mathTrig.FLOOR.MATH('invalid', 0).should.equal(error.value)

    mathTrig.FLOOR.MATH(-3.2, -1).should.equal(-4)
    mathTrig.FLOOR.MATH(3.2, 1).should.equal(3)
    mathTrig.FLOOR.MATH(-3.2, 1).should.equal(-4)
    mathTrig.FLOOR.MATH(3.2, -1).should.equal(3)
    mathTrig.FLOOR.MATH(3.2).should.equal(0)
    mathTrig.FLOOR.MATH(3.2, 0).should.equal(0)
    mathTrig.FLOOR.MATH(3.2, 'invalid').should.equal(error.value)
  })

  it('GCD', () => {
    mathTrig.GCD(undefined, undefined).should.equal(0)
    mathTrig.GCD(2, undefined).should.equal(2)
    mathTrig.GCD(undefined, 1).should.equal(1)
    mathTrig.GCD(error.na).should.equal(error.na)
    mathTrig.GCD(5, 2).should.equal(1)
    mathTrig.GCD(24, 36).should.equal(12)
    mathTrig.GCD(7, 1).should.equal(1)
    mathTrig.GCD(5, 0).should.equal(5)
    mathTrig.GCD(5, 'invalid').should.equal(error.value)
  })

  it('GT', () => {
    mathTrig.GT(10, 4).should.equal(true)
    mathTrig.GT(10, 10).should.equal(false)
    mathTrig.GT(10, 12).should.equal(false)
    mathTrig.GT().should.equal(error.na)
    mathTrig.GT(undefined, undefined).should.equal(false)
    mathTrig.GT(1, undefined).should.equal(true)
    mathTrig.GT(0, undefined).should.equal(false)
    mathTrig.GT(-1, undefined).should.equal(false)
    mathTrig.GT(error.na).should.equal(error.na)
    mathTrig.GT(1, 'string').should.equal(false)
    mathTrig.GT('string', 2).should.equal(true)
    mathTrig.GT('a', 'a').should.equal(false)
    mathTrig.GT('a', 'ab').should.equal(false)
    mathTrig.GT('ab', 'a').should.equal(true)
  })

  it('GTE', () => {
    mathTrig.GTE(10, 4).should.equal(true)
    mathTrig.GTE(10, 10).should.equal(true)
    mathTrig.GTE(10, 12).should.equal(false)
    mathTrig.GTE().should.equal(error.na)
    mathTrig.GTE(undefined, undefined).should.equal(true)
    mathTrig.GTE(1, undefined).should.equal(true)
    mathTrig.GTE(0, undefined).should.equal(true)
    mathTrig.GTE(-1, undefined).should.equal(false)
    mathTrig.GTE(error.na).should.equal(error.na)
    mathTrig.GTE(1, 'string').should.equal(false)
    mathTrig.GTE('string', 2).should.equal(true)
    mathTrig.GTE('a', 'a').should.equal(true)
    mathTrig.GTE('a', 'ab').should.equal(false)
    mathTrig.GTE('ab', 'a').should.equal(true)
  })

  it('INT', () => {
    mathTrig.INT(undefined).should.equal(0)
    mathTrig.INT(error.na).should.equal(error.na)
    mathTrig.INT(5.5).should.equal(5)
    mathTrig.INT('invalid').should.equal(error.value)
  })

  it('ISO.CEILING', () => {
    mathTrig.ISO.CEILING(undefined).should.equal(0)
    mathTrig.ISO.CEILING(error.na).should.equal(error.na)
    mathTrig.ISO.CEILING(4.3).should.equal(0)
    mathTrig.ISO.CEILING(4.3, 1).should.equal(5)
    mathTrig.ISO.CEILING(-4.3, 1).should.equal(-4)
    mathTrig.ISO.CEILING(4.3, 2).should.equal(6)
    mathTrig.ISO.CEILING(4.3, -2).should.equal(6)
    mathTrig.ISO.CEILING(-4.3, 2).should.equal(-4)
    mathTrig.ISO.CEILING(-4.3, -2).should.equal(-4)
    mathTrig.ISO.CEILING(-4.3, 'invalid').should.equal(error.value)
  })

  it('LCM', () => {
    mathTrig.LCM(undefined, undefined).should.equal(0)
    mathTrig.LCM(error.na, 36).should.equal(error.na)
    mathTrig.LCM(24, error.na).should.equal(error.na)
    mathTrig.LCM(5, undefined, 2).should.equal(0)
    mathTrig.LCM(5, 0, 2).should.equal(0)
    mathTrig.LCM(5, 1, 2).should.equal(10)
    mathTrig.LCM(24, 36).should.equal(72)
    mathTrig.LCM(24, 'invalid').should.equal(error.value)
  })

  it('LN', () => {
    mathTrig.LN(undefined).should.equal(error.num)
    mathTrig.LN(0).should.equal(error.num)
    mathTrig.LN(error.na).should.equal(error.na)
    mathTrig.LN(Math.E).should.equal(1)
    mathTrig.LN('invalid').should.equal(error.value)
  })

  it('LN10', () => {
    mathTrig.LN10().should.equal(Math.log(10))
  })

  it('LN2', () => {
    mathTrig.LN2().should.equal(Math.log(2))
  })

  it('LOG10E', () => {
    mathTrig.LOG10E().should.equal(Math.LOG10E)
  })

  it('LOG2E', () => {
    mathTrig.LOG2E().should.equal(Math.LOG2E)
  })

  it('LOG', () => {
    mathTrig.LOG(undefined, undefined).should.equal(error.num)
    mathTrig.LOG(1, undefined).should.equal(error.num)
    mathTrig.LOG(undefined, 1).should.equal(error.num)
    mathTrig.LOG(1, error.na).should.equal(error.na)
    mathTrig.LOG(error.na, 1).should.equal(error.na)

    mathTrig.LOG(10, 10).should.equal(1)
    mathTrig.LOG(10, 'invalid').should.equal(error.value)
  })

  it('LOG10', () => {
    mathTrig.LOG10(undefined).should.equal(error.num)
    mathTrig.LOG10(error.na).should.equal(error.na)
    mathTrig.LOG10(10).should.equal(1)
    mathTrig.LOG10('invalid').should.equal(error.value)
  })

  it('LT', () => {
    mathTrig.LT(10, 4).should.equal(false)
    mathTrig.LT(10, 10).should.equal(false)
    mathTrig.LT(10, 12).should.equal(true)
    mathTrig.LT().should.equal(error.na)
    mathTrig.LT(undefined, undefined).should.equal(false)
    mathTrig.LT(1, undefined).should.equal(false)
    mathTrig.LT(0, undefined).should.equal(false)
    mathTrig.LT(-1, undefined).should.equal(true)
    mathTrig.LT(error.na).should.equal(error.na)
    mathTrig.LT(1, 'string').should.equal(true)
    mathTrig.LT('string', 2).should.equal(false)
    mathTrig.LT('a', 'a').should.equal(false)
    mathTrig.LT('a', 'ab').should.equal(true)
    mathTrig.LT('ab', 'a').should.equal(false)
  })

  it('LTE', () => {
    mathTrig.LTE(10, 4).should.equal(false)
    mathTrig.LTE(10, 10).should.equal(true)
    mathTrig.LTE(10, 12).should.equal(true)
    mathTrig.LTE().should.equal(error.na)
    mathTrig.LTE(undefined, undefined).should.equal(true)
    mathTrig.LTE(1, undefined).should.equal(false)
    mathTrig.LTE(0, undefined).should.equal(true)
    mathTrig.LTE(-1, undefined).should.equal(true)
    mathTrig.LTE(error.na).should.equal(error.na)
    mathTrig.LTE(1, 'string').should.equal(true)
    mathTrig.LTE('string', 2).should.equal(false)
    mathTrig.LTE('a', 'a').should.equal(true)
    mathTrig.LTE('a', 'ab').should.equal(true)
    mathTrig.LTE('ab', 'a').should.equal(false)
  })

  it('MINUS', () => {
    mathTrig.MINUS(10, 4).should.equal(6)
    mathTrig.MINUS(1.2, 4).should.equal(-2.8)
    mathTrig.MINUS(1, 'string').should.equal(error.value)

    mathTrig.MINUS().should.equal(error.na)
    mathTrig.MINUS(undefined, undefined).should.equal(0)
    mathTrig.MINUS(1, undefined).should.equal(1)
    mathTrig.MINUS(undefined, 1).should.equal(-1)
    mathTrig.MINUS(null, undefined).should.equal(0)
    mathTrig.MINUS(undefined, null).should.equal(0)
    mathTrig.MINUS(null, null).should.equal(0)
    mathTrig.MINUS(null, 1).should.equal(-1)
    mathTrig.MINUS(error.na, undefined).should.equal(error.na)
    mathTrig.MINUS(error.na, null).should.equal(error.na)
    mathTrig.MINUS(error.na, 1).should.equal(error.na)
    mathTrig.MINUS(false, true).should.equal(-1)
  })

  it('MOD', () => {
    mathTrig.MOD(undefined, undefined).should.equal(error.div0)
    mathTrig.MOD(1, undefined).should.equal(error.div0)
    mathTrig.MOD(undefined, 1).should.equal(0)
    mathTrig.MOD(1, error.na).should.equal(error.na)
    mathTrig.MOD(error.na, 1).should.equal(error.na)

    mathTrig.MOD(3, 2).should.equal(1)
    mathTrig.MOD(-3, 2).should.equal(1)
    mathTrig.MOD(3, -2).should.equal(-1)
    mathTrig.MOD(-90, 360).should.equal(270)
    mathTrig.MOD(3, 0).should.equal(error.div0)
    mathTrig.MOD(3, 'invalid').should.equal(error.value)
  })

  it('MROUND', () => {
    mathTrig.MROUND(undefined, undefined).should.equal(0)
    mathTrig.MROUND(1, undefined).should.equal(0)
    mathTrig.MROUND(undefined, 1).should.equal(0)
    mathTrig.MROUND(1, error.na).should.equal(error.na)
    mathTrig.MROUND(error.na, 1).should.equal(error.na)

    mathTrig.MROUND(10, 3).should.equal(9)
    mathTrig.MROUND(-10, -3).should.equal(-9)
    mathTrig.MROUND(1.3, 0.2).should.approximately(1.4000000000000001, 1e-9)
    mathTrig.MROUND(5, -2).should.equal(error.num)
    mathTrig.MROUND(5, 'invalid').should.equal(error.value)
  })

  it('MULTINOMIAL', () => {
    mathTrig.MULTINOMIAL(undefined).should.equal(1)
    mathTrig.MULTINOMIAL(error.na).should.equal(error.na)
    mathTrig.MULTINOMIAL(2, 3, 4).should.equal(1260)
    mathTrig.MULTINOMIAL([2, 3, 4]).should.equal(1260)
    mathTrig.MULTINOMIAL([2, 'invalid', 4]).should.equal(error.value)
  })

  it('MULTIPLY', () => {
    mathTrig.MULTIPLY(10, 4).should.equal(40)
    mathTrig.MULTIPLY(12, -6).should.equal(-72)
    mathTrig.MULTIPLY(0, 0).should.equal(0)
    mathTrig.MULTIPLY(1, 0).should.equal(0)
    mathTrig.MULTIPLY(0, 1).should.equal(0)
    mathTrig.MULTIPLY(1, 'string').should.equal(error.value)

    mathTrig.MULTIPLY().should.equal(error.na)
    mathTrig.MULTIPLY(undefined, undefined).should.equal(0)
    mathTrig.MULTIPLY(1, undefined).should.equal(0)
    mathTrig.MULTIPLY(undefined, 1).should.equal(0)
    mathTrig.MULTIPLY(null, undefined).should.equal(0)
    mathTrig.MULTIPLY(undefined, null).should.equal(0)
    mathTrig.MULTIPLY(null, null).should.equal(0)
    mathTrig.MULTIPLY(null, 1).should.equal(0)
    mathTrig.MULTIPLY(error.na, undefined).should.equal(error.na)
    mathTrig.MULTIPLY(error.na, null).should.equal(error.na)
    mathTrig.MULTIPLY(error.na, 1).should.equal(error.na)
    mathTrig.MULTIPLY(true, false).should.equal(0)
  })

  it('NE', () => {
    mathTrig.NE(10, 10).should.equal(false)
    mathTrig.NE(1.2, 1.2).should.equal(false)
    mathTrig.NE('hello', 'jim').should.equal(true)
    mathTrig.NE('hello', 'hello').should.equal(false)
    mathTrig.NE(123, 'hello').should.equal(true)
    mathTrig.NE(true, true).should.equal(false)
    mathTrig.NE(false, false).should.equal(false)
    mathTrig.NE(false, 0).should.equal(true)
    mathTrig.NE().should.equal(error.na)
    mathTrig.NE(undefined, undefined).should.equal(false)
    mathTrig.NE(null, null).should.equal(false)
    mathTrig.NE(undefined, null).should.equal(false)
    mathTrig.NE(error.na).should.equal(error.na)
    mathTrig.NE(1, undefined).should.equal(true)
    mathTrig.NE(1, 'string').should.equal(true)
  })

  it('ODD', () => {
    mathTrig.ODD(undefined).should.equal(1)
    mathTrig.ODD(error.na).should.equal(error.na)
    mathTrig.ODD(0).should.equal(1)
    mathTrig.ODD(3).should.equal(3)
    mathTrig.ODD(2).should.equal(3)
    mathTrig.ODD(-1).should.equal(-1)
    mathTrig.ODD(-2).should.equal(-3)
    mathTrig.ODD('invalid').should.equal(error.value)
  })

  it('PI', () => {
    mathTrig.PI().should.equal(Math.PI)
  })

  it('E', () => {
    mathTrig.E().should.equal(Math.E)
  })

  it('POWER', () => {
    mathTrig.POWER(undefined, undefined).should.equal(error.num)
    mathTrig.POWER(undefined, 2).should.equal(0)
    mathTrig.POWER(5, undefined).should.equal(1)
    mathTrig.POWER(error.na, 2).should.equal(error.na)
    mathTrig.POWER(5, error.na).should.equal(error.na)
    mathTrig.POWER(5, 2).should.equal(25)
    mathTrig.POWER(98.6, 3.2).should.approximately(2401077.2220695773, 1e-9)
    mathTrig.POWER(4, 5 / 4).should.approximately(5.656854249492381, 1e-9)
    mathTrig.POWER(-1, 0.5).should.equal(error.num)
    mathTrig.POWER(-1, 'invalid').should.equal(error.value)
    mathTrig.POWER(true, false).should.equal(1)
  })

  it('POW', () => {
    mathTrig.POW(undefined, undefined).should.equal(error.num)
    mathTrig.POW(undefined, 2).should.equal(0)
    mathTrig.POW(5, undefined).should.equal(1)
    mathTrig.POW(error.na, 2).should.equal(error.na)
    mathTrig.POW(5, error.na).should.equal(error.na)
    mathTrig.POW(5).should.equal(error.na)
    mathTrig.POW(5, 2).should.equal(25)
    mathTrig.POW(98.6, 3.2).should.approximately(2401077.2220695773, 1e-9)
    mathTrig.POW(4, 5 / 4).should.approximately(5.656854249492381, 1e-9)
    mathTrig.POW(-1, 0.5).should.equal(error.num)
    mathTrig.POW(-1, 'invalid').should.equal(error.value)
  })

  it('PRODUCT', () => {
    mathTrig.PRODUCT(undefined).should.equal(0)
    mathTrig.PRODUCT(undefined, 1).should.equal(1)
    mathTrig.PRODUCT(1, 2, error.na).should.equal(error.na)
    mathTrig.PRODUCT([1], [2], [error.na]).should.equal(error.na)
    mathTrig.PRODUCT([5, 15, 30]).should.equal(2250)
    mathTrig.PRODUCT([5, 'invalid', 30]).should.equal(error.value)
  })

  it('QUOTIENT', () => {
    mathTrig.QUOTIENT(5, 2).should.equal(2)
    mathTrig.QUOTIENT(4.5, 3.1).should.equal(1)
    mathTrig.QUOTIENT(-10, 3).should.equal(-3)
    mathTrig.QUOTIENT(-10, 'invalid').should.equal(error.value)
  })

  it('RADIANS', () => {
    mathTrig.RADIANS(180).should.equal(Math.PI)
    mathTrig.RADIANS('invalid').should.equal(error.value)
  })

  it('RAND', () => {
    let sum = 0
    const n = 10
    let i = n
    while (i--) {
      sum += mathTrig.RAND()
    }

    const average = sum / n
    Number(parseInt(average), 10).should.equal(0)
  })

  it('RANDBETWEEN', () => {
    const bottom = 5
    const top = 10
    let sum = 0
    const n = 100
    let i = n
    while (i--) {
      sum += mathTrig.RANDBETWEEN(bottom, top)
    }

    const average = sum / n
    Number(parseInt(average, 10)).should.equal(7)
    mathTrig.RANDBETWEEN(bottom, 'invalid').should.equal(error.value)
  })

  it('ROMAN', () => {
    mathTrig.ROMAN(10).should.equal('X')
    mathTrig.ROMAN(103).should.equal('CIII')
    mathTrig.ROMAN('invalid').should.equal(error.value)
  })

  it('ROUND', () => {
    mathTrig.ROUND(undefined, undefined).should.equal(0)
    mathTrig.ROUND(2, undefined).should.equal(2)
    mathTrig.ROUND(undefined, 2).should.equal(0)
    mathTrig.ROUND(error.na).should.equal(error.na)
    mathTrig.ROUND(2.15, 1).should.approximately(2.2, 1e-9)
    mathTrig.ROUND(2.149, 1).should.approximately(2.1, 1e-9)
    mathTrig.ROUND(-1.475, 2).should.approximately(-1.47, 1e-9) // TODO: check if -1.48 would be the correct result or a precision error
    mathTrig.ROUND(21.5, -1).should.equal(20)
    mathTrig.ROUND(626.3, -3).should.equal(1000)
    mathTrig.ROUND(1.98, -1).should.equal(0)
    mathTrig.ROUND(-50.55, -2).should.equal(-100)
    mathTrig.ROUND(-50.55, 'invalid').should.equal(error.value)
  })

  it('ROUNDDOWN', () => {
    mathTrig.ROUNDDOWN(undefined, undefined).should.equal(0)
    mathTrig.ROUNDDOWN(2, undefined).should.equal(2)
    mathTrig.ROUNDDOWN(undefined, 2).should.equal(0)
    mathTrig.ROUNDDOWN(error.na).should.equal(error.na)
    mathTrig.ROUNDDOWN(3.2, 0).should.equal(3)
    mathTrig.ROUNDDOWN(76.9, 0).should.equal(76)
    mathTrig.ROUNDDOWN(3.14159, 3).should.approximately(3.141, 1e-9)
    mathTrig.ROUNDDOWN(-3.14159, 1).should.approximately(-3.1, 1e-9)
    mathTrig.ROUNDDOWN(31415.92654, -2).should.equal(31400)
    mathTrig.ROUNDDOWN(31415.92654, 'invalid').should.equal(error.value)
  })

  it('ROUNDUP', () => {
    mathTrig.ROUNDUP(undefined, undefined).should.equal(0)
    mathTrig.ROUNDUP(2, undefined).should.equal(2)
    mathTrig.ROUNDUP(undefined, 2).should.equal(0)
    mathTrig.ROUNDUP(error.na).should.equal(error.na)
    mathTrig.ROUNDUP(3.2, 0).should.equal(4)
    mathTrig.ROUNDUP(76.9, 0).should.equal(77)
    mathTrig.ROUNDUP(3.14159, 3).should.approximately(3.142, 1e-9)
    mathTrig.ROUNDUP(-3.14159, 1).should.approximately(-3.2, 1e-9)
    mathTrig.ROUNDUP(31415.92654, -2).should.equal(31500)
    mathTrig.ROUNDUP(31415.92654, 'invalid').should.equal(error.value)
  })

  it('SEC', () => {
    mathTrig.SEC(undefined).should.equal(1)
    mathTrig.SEC(error.na).should.equal(error.na)
    mathTrig.SEC(45).should.approximately(1.9035944074044246, 1e-9)
    mathTrig.SEC(30).should.approximately(6.482921234962678, 1e-9)
    mathTrig.SEC('invalid').should.equal(error.value)
  })

  it('SECH', () => {
    mathTrig.SECH(undefined).should.equal(1)
    mathTrig.SECH(error.na).should.equal(error.na)
    mathTrig.SECH(45).should.approximately(5.725037161098787e-20, 1e-9)
    mathTrig.SECH(30).should.approximately(1.8715245937680347e-13, 1e-9)
    mathTrig.SECH('invalid').should.equal(error.value)
  })

  it('SERIESSUM', () => {
    mathTrig
      .SERIESSUM(mathTrig.PI() / 4, 0, 2, [1, -1 / mathTrig.FACT(2), 1 / mathTrig.FACT(4), -1 / mathTrig.FACT(6)])
      .should.approximately(0.7071032148228457, 1e-9)
    mathTrig.SERIESSUM(1, 2, 3, 'invalid').should.equal(error.value)
  })

  it('SIGN', () => {
    mathTrig.SIGN(undefined).should.equal(0)
    mathTrig.SIGN(error.na).should.equal(error.na)
    mathTrig.SIGN(0).should.equal(0)
    mathTrig.SIGN(-5).should.equal(-1)
    mathTrig.SIGN(5).should.equal(1)
    mathTrig.SIGN('invalid').should.equal(error.value)
  })

  it('SIN', () => {
    mathTrig.SIN(undefined).should.equal(0)
    mathTrig.SIN(error.na).should.equal(error.na)
    mathTrig.SIN(Math.PI / 2).should.equal(1)
    mathTrig.SIN('invalid').should.equal(error.value)
  })

  it('SINH', () => {
    mathTrig.SINH(undefined).should.equal(0)
    mathTrig.SINH(error.na).should.equal(error.na)
    mathTrig.SINH(1).should.approximately(1.1752011936438014, 1e-9) // the golden ratio: http://mathworld.wolfram.com/HyperbolicSine.html
    mathTrig.SINH('invalid').should.equal(error.value)
  })

  it('SQRT', () => {
    mathTrig.SQRT(undefined).should.equal(0)
    mathTrig.SQRT(error.na).should.equal(error.na)
    mathTrig.SQRT(4).should.equal(2)
    mathTrig.SQRT(-1).should.equal(error.num)
    mathTrig.SQRT('invalid').should.equal(error.value)
  })

  it('SQRTPI', () => {
    mathTrig.SQRTPI(undefined).should.equal(0)
    mathTrig.SQRTPI(error.na).should.equal(error.na)
    mathTrig.SQRTPI(3).should.approximately(3.0699801238394655, 1e-9)
    mathTrig.SQRTPI('invalid').should.equal(error.value)
  })

  it('SQRT1_2', () => {
    mathTrig.SQRT1_2().should.approximately(1 / Math.sqrt(2), 1e-9)
  })

  it('SQRT2', () => {
    mathTrig.SQRT2().should.approximately(Math.sqrt(2), 1e-9)
  })

  it('SUBTOTAL', () => {
    mathTrig.SUBTOTAL(1, [1, 2, 3]).should.equal(2)
    mathTrig.SUBTOTAL(2, [1, 2, 3, 'does not count']).should.equal(3)
    mathTrig.SUBTOTAL(3, [1, 2, 3, 'counts']).should.equal(4)
    mathTrig.SUBTOTAL(4, [1, 2, 3]).should.equal(3)
    mathTrig.SUBTOTAL(5, [1, 2, 3]).should.equal(1)
    mathTrig.SUBTOTAL(6, [1, 2, 3]).should.equal(6)
    mathTrig.SUBTOTAL(7, [1, 2, 3]).should.equal(1)
    mathTrig.SUBTOTAL(8, [1, 2, 3]).should.approximately(0.816496580927726, 1e-9)
    mathTrig.SUBTOTAL(9, [1, 2, 3]).should.equal(6)
    mathTrig.SUBTOTAL(10, [1, 2, 3]).should.equal(1)
    mathTrig.SUBTOTAL(11, [1, 2, 3]).should.approximately(0.6666666666666666, 1e-9)
    mathTrig.SUBTOTAL(101, [1, 2, 3]).should.equal(2)
    mathTrig.SUBTOTAL(102, [1, 2, 3, 'does not count']).should.equal(3)
    mathTrig.SUBTOTAL(103, [1, 2, 3, 'counts']).should.equal(4)
    mathTrig.SUBTOTAL(104, [1, 2, 3]).should.equal(3)
    mathTrig.SUBTOTAL(105, [1, 2, 3]).should.equal(1)
    mathTrig.SUBTOTAL(106, [1, 2, 3]).should.equal(6)
    mathTrig.SUBTOTAL(107, [1, 2, 3]).should.equal(1)
    mathTrig.SUBTOTAL(108, [1, 2, 3]).should.approximately(0.816496580927726, 1e-9)
    mathTrig.SUBTOTAL(109, [1, 2, 3]).should.equal(6)
    mathTrig.SUBTOTAL(110, [1, 2, 3]).should.equal(1)
    mathTrig.SUBTOTAL(111, [1, 2, 3]).should.approximately(0.6666666666666666, 1e-9)
    mathTrig.SUBTOTAL('invalid', [1, 2, 3]).should.equal(error.value)
  })

  it('SUM', () => {
    mathTrig.SUM(undefined, 1).should.equal(1)
    mathTrig.SUM(1, 2, error.na).should.equal(error.na)
    mathTrig.SUM(1, error.na, 2).should.equal(error.na)
    mathTrig.SUM(1, [error.na], 2).should.equal(error.na)
    mathTrig.SUM([1], [2], [error.na]).should.equal(error.na)
    mathTrig.SUM([1], [error.na], [2]).should.equal(error.na)
    mathTrig.SUM([1], error.na, [2]).should.equal(error.na)
    mathTrig.SUM(1, 2, 3).should.equal(6)
    mathTrig.SUM([1, 2, 3]).should.equal(6)
    mathTrig.SUM([1, 2, 3], 1, 2).should.equal(9)
    mathTrig.SUM([1, 2, 3], [1, 2]).should.equal(9)
    mathTrig
      .SUM([
        [1, 1],
        [2, 2],
        [3, 3]
      ])
      .should.equal(12)
    mathTrig
      .SUM(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        1,
        2
      )
      .should.equal(15)
    mathTrig
      .SUM(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        1,
        2
      )
      .should.equal(15)
    mathTrig
      .SUM(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ]
      )
      .should.equal(24)
    mathTrig.SUM(1, 'invalid').should.equal(1)
    mathTrig.SUM(undefined).should.equal(0)
    mathTrig.SUM(undefined, 1).should.equal(1)
    mathTrig.SUM(null).should.equal(0)
    mathTrig.SUM(null, 1).should.equal(1)
    mathTrig.SUM(error.na).should.equal(error.na)
    mathTrig.SUM(undefined, error.na).should.equal(error.na)
    mathTrig.SUM(error.na, 1).should.equal(error.na)
  })

  it('SUMIF', () => {
    mathTrig.SUMIF([undefined], undefined).should.equal(0)
    mathTrig.SUMIF([1, 2, 3], undefined).should.equal(0)
    mathTrig.SUMIF([1, 2, 3], error.na).should.equal(0)
    mathTrig.SUMIF([undefined], '>2').should.equal(0)
    mathTrig.SUMIF([1, 2, error.na], error.na).should.equal(0)
    mathTrig.SUMIF([2, error.na], '>1').should.equal(2)
    mathTrig.SUMIF([error.na], '>1').should.equal(0)
    mathTrig.SUMIF([error.na], '>1', [error.na]).should.equal(0)
    mathTrig.SUMIF([1, 2, 3], '>2').should.equal(3)
    mathTrig
      .SUMIF(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        '>2'
      )
      .should.equal(6)
    mathTrig.SUMIF([1, 2, 3], '*').should.equal(6)
    mathTrig
      .SUMIF(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        '*'
      )
      .should.equal(12)
    mathTrig.SUMIF([1, 'invalid', 3], '>2').should.equal(3)
    mathTrig.SUMIF([1, 2, 3], '<>2').should.equal(4)
    mathTrig.SUMIF([1, 2, 3, 3, 4, 5], '=3').should.equal(6)
    mathTrig.SUMIF([1, 'b', 'c', 'b', 'd'], '=b', [1, 2, 3, 4, 5]).should.equal(6)
    mathTrig.SUMIF(['a', 'b', 'c', 'd', 'd'], '<>d', [1, 2, 3, 4, 5]).should.equal(6)
  })

  it('SUMIFS', () => {
    mathTrig.SUMIFS([1, 2, 3], [4, 5, 6], '>4', [7, 8, 9], '<9').should.equal(2)
    mathTrig.SUMIFS([1, 2, 3], [4, 5, 6], '>4', [7, 8, 9], '*').should.equal(5)
    mathTrig.SUMIFS([1, 'invalid', 3], [4, 5, 6], '>4').should.equal(error.value)
  })

  it('SUMPRODUCT', () => {
    mathTrig
      .SUMPRODUCT(
        [
          [3, 4],
          [8, error.na]
        ],
        [
          [2, 7],
          [6, 7]
        ]
      )
      .should.equal(error.na)
    mathTrig.SUMPRODUCT([[undefined, undefined]], [[undefined, undefined]]).should.equal(0)
    mathTrig
      .SUMPRODUCT(
        [
          [3, 4],
          [8, 6],
          [1, 9]
        ],
        [
          [2, 7],
          [6, 7],
          [5, 3]
        ]
      )
      .should.equal(156)

    mathTrig.SUMPRODUCT([[1], [4], [10]], [[0.55], [0.3], [0.1]]).should.approximately(2.75, 1e-9)

    mathTrig.SUMPRODUCT([1, 4, 10], [0.55, 0.3, 0.1]).should.approximately(2.75, 1e-9)

    mathTrig
      .SUMPRODUCT(
        [
          [3, 4],
          [8, 6],
          [1, 9]
        ],
        [
          [2, 'invalid'],
          [6, 7],
          [5, 3]
        ]
      )
      .should.equal(error.value)

    mathTrig.SUMPRODUCT([8, 'invalid'], [5, 3]).should.equal(error.value)
    mathTrig.SUMPRODUCT().should.equal(error.value)
  })

  it('SUMSQ', () => {
    mathTrig.SUMSQ(1, 2, 3).should.equal(14)
    mathTrig.SUMSQ([1, 2, 3]).should.equal(14)
    mathTrig
      .SUMSQ([
        [1, 1],
        [2, 2],
        [3, 3]
      ])
      .should.equal(28)
    mathTrig.SUMSQ(1, 'invalid', 3).should.equal(error.value)
  })

  it('SUMX2MY2', () => {
    mathTrig.SUMX2MY2([1, 2, 3], [4, 5, 6]).should.equal(-63)
    mathTrig.SUMX2MY2([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).should.equal(-468)
    mathTrig.SUMX2MY2([1, 2, 3], [4, 'invalid', 6]).should.equal(error.value)
  })

  it('SUMX2PY2', () => {
    mathTrig.SUMX2PY2([1, 2, 3], [4, 5, 6]).should.equal(91)
    mathTrig.SUMX2PY2([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).should.equal(650)
    mathTrig.SUMX2PY2([1, 2, 'invalid'], [4, 5, 6]).should.equal(error.value)
  })

  it('SUMXMY2', () => {
    mathTrig.SUMXMY2([1, 2, 3], [4, 5, 6]).should.equal(27)
    mathTrig.SUMXMY2([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]).should.equal(216)
    mathTrig.SUMXMY2([1, 2, 'invalid'], [4, 5, 6]).should.equal(error.value)
  })

  it('TAN', () => {
    mathTrig.TAN(undefined).should.equal(0)
    mathTrig.TAN(error.na).should.equal(error.na)
    mathTrig.TAN(mathTrig.RADIANS(45)).should.approximately(1, 1e-9)
    mathTrig.TAN('invalid').should.equal(error.value)
  })

  it('TANH', () => {
    mathTrig.TANH(undefined).should.equal(0)
    mathTrig.TANH(error.na).should.equal(error.na)
    mathTrig.TANH(0.5).should.approximately(0.46211715726000974, 1e-9)
    mathTrig.TANH('invalid').should.equal(error.value)
  })

  it('TRUNC', () => {
    mathTrig.TRUNC(undefined, undefined).should.equal(0)
    mathTrig.TRUNC(2, undefined).should.equal(2)
    mathTrig.TRUNC(undefined, 2).should.equal(0)
    mathTrig.TRUNC(error.na).should.equal(error.na)
    mathTrig.TRUNC(-8.9).should.equal(-8)
    mathTrig.TRUNC(0.45).should.equal(0)
    mathTrig.TRUNC('invalid').should.equal(error.value)
  })
})
