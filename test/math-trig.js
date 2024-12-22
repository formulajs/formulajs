import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as mathTrig from '../src/math-trig.js'

describe('Math & Trig', () => {
  it('ABS', () => {
    expect(mathTrig.ABS()).to.equal(0)
    expect(mathTrig.ABS(undefined)).to.equal(0)
    expect(mathTrig.ABS(error.na)).to.equal(error.na)
    expect(mathTrig.ABS(-1)).to.equal(1)
    expect(mathTrig.ABS('invalid')).to.equal(error.value)
  })

  it('ACOS', () => {
    expect(mathTrig.ACOS()).to.equal(mathTrig.ACOS(0))
    expect(mathTrig.ACOS(undefined)).to.equal(mathTrig.ACOS(0))
    expect(mathTrig.ACOS(error.na)).to.equal(error.na)
    expect(mathTrig.ACOS(100)).to.equal(error.num)
    expect(mathTrig.ACOS(1)).to.equal(0)
    expect(mathTrig.ACOS('invalid')).to.equal(error.value)
  })

  it('ACOSH', () => {
    expect(mathTrig.ACOSH()).to.equal(error.num)
    expect(mathTrig.ACOSH(undefined)).to.equal(error.num)
    expect(mathTrig.ACOSH(error.na)).to.equal(error.na)
    expect(mathTrig.ACOSH(-100)).to.equal(error.num)
    expect(mathTrig.ACOSH(1)).to.equal(0)
    expect(mathTrig.ACOSH('invalid')).to.equal(error.value)
  })

  it('ACOT', () => {
    expect(mathTrig.ACOT()).to.equal(mathTrig.ACOT(0))
    expect(mathTrig.ACOT(undefined)).to.equal(mathTrig.ACOT(0))
    expect(mathTrig.ACOT(error.na)).to.equal(error.na)
    expect(mathTrig.ACOT(1)).to.approximately(0.7853981633974483, 1e-9)
    expect(mathTrig.ACOT('invalid')).to.equal(error.value)
  })

  it('ACOTH', () => {
    expect(mathTrig.ACOTH()).to.equal(error.num)
    expect(mathTrig.ACOTH(undefined)).to.equal(error.num)
    expect(mathTrig.ACOTH(error.na)).to.equal(error.na)
    expect(mathTrig.ACOTH(0.1)).to.equal(error.num)
    expect(mathTrig.ACOTH(1)).to.equal(Infinity)
    expect(mathTrig.ACOTH('invalid')).to.equal(error.value)
  })

  // TODO: more edge cases, explore the second argument (options)
  it('AGGREGATE', () => {
    expect(mathTrig.AGGREGATE(1, 4, [1, 2, 3])).to.equal(2)
    expect(mathTrig.AGGREGATE(2, 4, [1, 2, 3, 'does not count'])).to.equal(3)
    expect(mathTrig.AGGREGATE(3, 4, [1, 2, 3, 'counts'])).to.equal(4)
    expect(mathTrig.AGGREGATE(4, 4, [1, 2, 3])).to.equal(3)
    expect(mathTrig.AGGREGATE(5, 4, [1, 2, 3])).to.equal(1)
    expect(mathTrig.AGGREGATE(6, 4, [1, 2, 3])).to.equal(6)
    expect(mathTrig.AGGREGATE(7, 4, [1, 2, 3])).to.equal(1)
    expect(mathTrig.AGGREGATE(8, 4, [1, 2, 3])).to.approximately(0.816496580927726, 1e-9)
    expect(mathTrig.AGGREGATE(9, 4, [1, 2, 3])).to.equal(6)
    expect(mathTrig.AGGREGATE(10, 4, [1, 2, 3])).to.equal(1)
    expect(mathTrig.AGGREGATE(11, 4, [1, 2, 3])).to.approximately(0.6666666666666666, 1e-9)
    expect(mathTrig.AGGREGATE(12, 4, [1, 2, 3])).to.equal(2)
    expect(mathTrig.AGGREGATE(13, 4, [1, 2, 3])).to.equal(1)
    expect(mathTrig.AGGREGATE(14, 4, [1, 2, 3], 2)).to.equal(2)
    expect(mathTrig.AGGREGATE(15, 4, [1, 2, 3], 2)).to.equal(2)
    expect(mathTrig.AGGREGATE(16, 4, [1, 2, 3], 0.4)).to.approximately(1.8, 1e-9)
    expect(mathTrig.AGGREGATE(17, 4, [1, 2, 3], 2)).to.equal(2)
    expect(mathTrig.AGGREGATE(18, 4, [1, 2, 3], 0.4)).to.approximately(1.6, 1e-9)
    expect(mathTrig.AGGREGATE(19, 4, [1, 2, 3], 2)).to.equal(2)
    expect(mathTrig.AGGREGATE('invalid', 4, [1, 2, 3], 2)).to.equal(error.value)
  })

  it('ARABIC', () => {
    expect(mathTrig.ARABIC(undefined)).to.equal(0)
    expect(mathTrig.ARABIC(error.na)).to.equal(error.na)
    expect(mathTrig.ARABIC('X')).to.equal(10)
    expect(mathTrig.ARABIC('ABC')).to.equal(error.value)
  })

  it('ASIN', () => {
    expect(mathTrig.ASIN(undefined)).to.equal(0)
    expect(mathTrig.ASIN(error.na)).to.equal(error.na)
    expect(mathTrig.ASIN(0.5)).to.approximately(0.5235987755982989, 1e-9)
    expect(mathTrig.ASIN(-100)).to.equal(error.num)
    expect(mathTrig.ASIN('invalid')).to.equal(error.value)
  })

  it('ASINH', () => {
    expect(mathTrig.ASINH(undefined)).to.equal(0)
    expect(mathTrig.ASINH(error.na)).to.equal(error.na)
    expect(mathTrig.ASINH(0.5)).to.approximately(0.48121182505960347, 1e-9)
    expect(mathTrig.ASINH('invalid')).to.equal(error.value)
  })

  it('ATAN', () => {
    expect(mathTrig.ATAN(undefined)).to.equal(0)
    expect(mathTrig.ATAN(error.na)).to.equal(error.na)
    expect(mathTrig.ATAN(1)).to.approximately(0.7853981633974483, 1e-9)
    expect(mathTrig.ATAN('invalid')).to.equal(error.value)
  })

  it('ATAN2', () => {
    expect(mathTrig.ATAN2(undefined)).to.equal(0)
    expect(mathTrig.ATAN2(error.na)).to.equal(error.na)
    expect(mathTrig.ATAN2(1, 1)).to.approximately(0.7853981633974483, 1e-9)
    expect(mathTrig.ATAN2(1, 'invalid')).to.equal(error.value)
  })

  it('ATANH', () => {
    expect(mathTrig.ATANH(undefined)).to.equal(0)
    expect(mathTrig.ATANH(error.na)).to.equal(error.na)
    expect(mathTrig.ATANH(1)).to.equal(Infinity)
    expect(mathTrig.ATANH('invalid')).to.equal(error.value)
    expect(mathTrig.ATANH(100)).to.equal(error.num)
  })

  it('BASE', () => {
    expect(mathTrig.BASE(undefined, undefined)).to.equal(error.num)
    expect(mathTrig.BASE(7, undefined)).to.equal(error.num)
    expect(mathTrig.BASE(7, null)).to.equal(error.num)
    expect(mathTrig.BASE(undefined, 2)).to.equal('0')
    expect(mathTrig.BASE(error.na, 2)).to.equal(error.na)
    expect(mathTrig.BASE(2, error.na)).to.equal(error.na)
    expect(mathTrig.BASE(7, 2)).to.equal('111')
    expect(mathTrig.BASE(400, 10, 10)).to.equal('0000000400')
    expect(mathTrig.BASE('invalid', 10, 10)).to.equal(error.value)
  })

  it('CEILING', () => {
    expect(mathTrig.CEILING()).to.equal(0)
    expect(mathTrig.CEILING(undefined)).to.equal(0)
    expect(mathTrig.CEILING(error.na)).to.equal(error.na)
    expect(mathTrig.CEILING(1, error.na)).to.equal(error.na)
    expect(mathTrig.CEILING(error.na, error.na)).to.equal(error.na)
    expect(mathTrig.CEILING(4.1)).to.equal(0)
    expect(mathTrig.CEILING(4.1, 1)).to.equal(5)
    expect(mathTrig.CEILING(-4.1, 1)).to.equal(-4)
    expect(mathTrig.CEILING(4.1, 0)).to.equal(0)
    expect(mathTrig.CEILING(4.1, 1)).to.equal(5)
    expect(mathTrig.CEILING(4.1, 2)).to.equal(6)
    expect(mathTrig.CEILING(-4.1, 2)).to.equal(-4)
    expect(mathTrig.CEILING(-4.1, -2)).to.equal(-6)
    expect(mathTrig.CEILING(1000, 15)).to.equal(1005)
    expect(mathTrig.CEILING(1000, 10.5)).to.equal(1008)
    expect(mathTrig.CEILING(7.7, 0.24)).to.equal(7.92)
    expect(mathTrig.CEILING(1.234, 0.1)).to.approximately(1.3, 1e-9)
    expect(mathTrig.CEILING(-1.234, 0.1)).to.approximately(-1.2, 1e-9)
    expect(mathTrig.CEILING(-1.234, -0.1)).to.approximately(-1.3, 1e-9)
    expect(mathTrig.CEILING(-1.234, -0.01)).to.approximately(-1.24, 1e-9)
    expect(mathTrig.CEILING(-1.234, -0.001)).to.approximately(-1.234, 1e-9)
  })

  it('CEILING.MATH', () => {
    expect(mathTrig.CEILING.MATH(undefined)).to.equal(0)
    expect(mathTrig.CEILING.MATH(error.na)).to.equal(error.na)
    expect(mathTrig.CEILING.MATH(24.3, 5)).to.equal(25)
    expect(mathTrig.CEILING.MATH(6.7)).to.equal(7)
    expect(mathTrig.CEILING.MATH(6.7, 1)).to.equal(7)
    expect(mathTrig.CEILING.MATH(-8.1, 2)).to.equal(-8)
    expect(mathTrig.CEILING.MATH(-5.5, 2, -1)).to.equal(-6)
    expect(mathTrig.CEILING.MATH(-5.5, 2, 'invalid')).to.equal(error.value)
    expect(mathTrig.CEILING.MATH(-4.1, 2, 0)).to.equal(-4)
    expect(mathTrig.CEILING.MATH(-4.1, 2, -1)).to.equal(-6)
    expect(mathTrig.CEILING.MATH(-4.1, -2, 0)).to.equal(-4)
    expect(mathTrig.CEILING.MATH(-4.1, -2, -1)).to.equal(-6)
    expect(mathTrig.CEILING.MATH(-4.1, -2, 'invalid')).to.equal(error.value)
    expect(mathTrig.CEILING.MATH(1000, 15)).to.equal(1005)
    expect(mathTrig.CEILING.MATH(1000, 10.5)).to.equal(1008)
    expect(mathTrig.CEILING.MATH(7.7, 0.24)).to.equal(7.92)
    expect(mathTrig.CEILING.MATH(-5.5, 2, 1)).to.equal(-6)
    expect(mathTrig.CEILING.MATH(210.67)).to.equal(211)
    expect(mathTrig.CEILING.MATH(-5.5, 2, 1)).to.equal(-6)
    expect(mathTrig.CEILING.MATH(-5.5, 0.66, -1)).to.equal(-5.94)
    expect(mathTrig.CEILING.MATH(-5.5, 0.33, 1)).to.equal(-5.61)
  })

  it('CEILING.PRECISE', () => {
    expect(mathTrig.CEILING.PRECISE(undefined)).to.equal(0)
    expect(mathTrig.CEILING.PRECISE(error.na)).to.equal(error.na)
    expect(mathTrig.CEILING.PRECISE(4.3)).to.equal(5)
    expect(mathTrig.CEILING.PRECISE(4.3, 1)).to.equal(5)
    expect(mathTrig.CEILING.PRECISE(-4.3, 1)).to.equal(-4)
    expect(mathTrig.CEILING.PRECISE(4.3, 2)).to.equal(6)
    expect(mathTrig.CEILING.PRECISE(4.3, -2)).to.equal(6)
    expect(mathTrig.CEILING.PRECISE(-4.3, 2)).to.equal(-4)
    expect(mathTrig.CEILING.PRECISE(-4.3, -2)).to.equal(-4)
    expect(mathTrig.CEILING.PRECISE(-4.3, 'invalid')).to.equal(error.value)
  })

  it('COMBIN', () => {
    expect(mathTrig.COMBIN(undefined, undefined)).to.equal(1)
    expect(mathTrig.COMBIN(10, undefined)).to.equal(1)
    expect(mathTrig.COMBIN(undefined, 10)).to.equal(error.num)
    expect(mathTrig.COMBIN(error.na)).to.equal(error.na)
    expect(mathTrig.COMBIN(5, 10)).to.equal(error.num)
    expect(mathTrig.COMBIN(0, 0)).to.equal(1)
    expect(mathTrig.COMBIN(1, 0)).to.equal(1)
    expect(mathTrig.COMBIN(1, 1)).to.equal(1)
    expect(mathTrig.COMBIN(2, 1)).to.equal(2)
    expect(mathTrig.COMBIN(2, 2)).to.equal(1)
    expect(mathTrig.COMBIN(3, 1)).to.equal(3)
    expect(mathTrig.COMBIN(3, 2)).to.equal(3)
    expect(mathTrig.COMBIN(3, 3)).to.equal(1)
    expect(mathTrig.COMBIN(10, 3)).to.equal(120)
    expect(mathTrig.COMBIN(10, 'invalid')).to.equal(error.value)
  })

  it('COMBINA', () => {
    expect(mathTrig.COMBINA(undefined, undefined)).to.equal(1)
    expect(mathTrig.COMBINA(10, undefined)).to.equal(1)
    expect(mathTrig.COMBINA(undefined, 10)).to.equal(error.num)
    expect(mathTrig.COMBINA(error.na)).to.equal(error.na)
    expect(mathTrig.COMBINA(0, 0)).to.equal(1)
    expect(mathTrig.COMBINA(1, 0)).to.equal(1)
    expect(mathTrig.COMBINA(1, 1)).to.equal(1)
    expect(mathTrig.COMBINA(2, 1)).to.equal(2)
    expect(mathTrig.COMBINA(2, 2)).to.equal(3)
    expect(mathTrig.COMBINA(3, 1)).to.equal(3)
    expect(mathTrig.COMBINA(3, 2)).to.equal(6)
    expect(mathTrig.COMBINA(3, 3)).to.equal(10)
    expect(mathTrig.COMBINA(10, 3)).to.equal(220)
    expect(mathTrig.COMBINA(10, 'invalid')).to.equal(error.value)
  })

  it('COS', () => {
    expect(mathTrig.COS(undefined)).to.equal(1)
    expect(mathTrig.COS(error.na)).to.equal(error.na)
    expect(mathTrig.COS(0)).to.equal(1)
    expect(mathTrig.COS('invalid')).to.equal(error.value)
  })

  it('COSH', () => {
    expect(mathTrig.COSH(undefined)).to.equal(1)
    expect(mathTrig.COSH(error.na)).to.equal(error.na)
    expect(mathTrig.COSH(0)).to.equal(1)
    expect(mathTrig.COSH('invalid')).to.equal(error.value)
  })

  it('COT', () => {
    expect(mathTrig.COT(undefined)).to.equal(error.div0)
    expect(mathTrig.COT(0)).to.equal(error.div0)
    expect(mathTrig.COT(error.na)).to.equal(error.na)
    expect(mathTrig.COT(1)).to.approximately(0.6420926159343306, 1e-9)
    expect(mathTrig.COT('invalid')).to.equal(error.value)
  })

  it('COTH', () => {
    expect(mathTrig.COTH(undefined)).to.equal(error.div0)
    expect(mathTrig.COTH(0)).to.equal(error.div0)
    expect(mathTrig.COTH(error.na)).to.equal(error.na)
    expect(mathTrig.COTH(1)).to.approximately(1.3130352854993312, 1e-9)
    expect(mathTrig.COTH('invalid')).to.equal(error.value)
  })

  it('CSC', () => {
    expect(mathTrig.CSC(undefined)).to.equal(error.div0)
    expect(mathTrig.CSC(0)).to.equal(error.div0)
    expect(mathTrig.CSC(error.na)).to.equal(error.na)
    expect(mathTrig.CSC('invalid')).to.equal(error.value)
  })

  it('CSCH', () => {
    expect(mathTrig.CSCH(undefined)).to.equal(error.div0)
    expect(mathTrig.CSCH(0)).to.equal(error.div0)
    expect(mathTrig.CSCH(error.na)).to.equal(error.na)
    expect(mathTrig.CSCH('invalid')).to.equal(error.value)
  })

  it('DECIMAL', () => {
    expect(mathTrig.DECIMAL(undefined, undefined)).to.equal(error.num)
    expect(mathTrig.DECIMAL(undefined, 2)).to.equal(0)
    expect(mathTrig.DECIMAL(2, undefined)).to.equal(error.num)
    expect(mathTrig.DECIMAL(error.na, undefined)).to.equal(error.na)
    expect(mathTrig.DECIMAL('0', 2)).to.equal(0)
    expect(mathTrig.DECIMAL('1', 2)).to.equal(1)
    expect(mathTrig.DECIMAL('10', 2)).to.equal(2)
    expect(mathTrig.DECIMAL('10', 10)).to.equal(10)
    expect(mathTrig.DECIMAL('FF', 16)).to.equal(255)
    expect(mathTrig.DECIMAL('ZZ', 36)).to.equal(1295)
    expect(mathTrig.DECIMAL('invalid')).to.equal(error.na)
    expect(mathTrig.DECIMAL('invalid', 2)).to.equal(error.num)
  })

  it('DEGREES', () => {
    expect(mathTrig.DEGREES(undefined)).to.equal(0)
    expect(mathTrig.DEGREES(error.na)).to.equal(error.na)
    expect(mathTrig.DEGREES(Math.PI)).to.equal(180)
    expect(mathTrig.DEGREES('invalid')).to.equal(error.value)
  })

  it('EVEN', () => {
    expect(mathTrig.EVEN(undefined)).to.equal(0)
    expect(mathTrig.EVEN(error.na)).to.equal(error.na)
    expect(mathTrig.EVEN(3)).to.equal(4)
    expect(mathTrig.EVEN('invalid')).to.equal(error.value)
  })

  it('EXP', () => {
    expect(mathTrig.EXP()).to.equal(error.na)
    expect(mathTrig.EXP(undefined)).to.equal(1)
    expect(mathTrig.EXP(null)).to.equal(1)
    expect(mathTrig.EXP(error.na)).to.equal(error.na)
    expect(mathTrig.EXP('1')).to.equal(2.718281828459045)
    expect(mathTrig.EXP('a')).to.equal(error.value)
    expect(mathTrig.EXP(1, 1)).to.equal(error.error)
    expect(mathTrig.EXP(1)).to.equal(2.718281828459045)
  })

  it('FACT', () => {
    expect(mathTrig.FACT(undefined)).to.equal(1)
    expect(mathTrig.FACT(error.na)).to.equal(error.na)
    expect(mathTrig.FACT(6)).to.equal(720)
    expect(mathTrig.FACT('invalid')).to.equal(error.value)
  })

  it('FACTDOUBLE', () => {
    expect(mathTrig.FACTDOUBLE(undefined)).to.equal(1)
    expect(mathTrig.FACTDOUBLE(error.na)).to.equal(error.na)
    expect(mathTrig.FACTDOUBLE(10)).to.equal(3840)
    expect(mathTrig.FACTDOUBLE('invalid')).to.equal(error.value)
  })

  it('FLOOR', () => {
    expect(mathTrig.FLOOR(undefined, undefined)).to.equal(error.div0)
    expect(mathTrig.FLOOR(2, undefined)).to.equal(error.div0) // different than Excel
    expect(mathTrig.FLOOR(undefined, 2)).to.equal(0)
    expect(mathTrig.FLOOR(error.na)).to.equal(error.na)
    expect(mathTrig.FLOOR(3.7, 2)).to.equal(2)
    expect(mathTrig.FLOOR(-2.5, -2)).to.equal(-2)
    expect(mathTrig.FLOOR(2.5, -2)).to.equal(error.num)
    expect(mathTrig.FLOOR(1.58, 0.1)).to.approximately(1.5, 1e-9)
    expect(mathTrig.FLOOR(0.234, 0.01)).to.approximately(0.23, 1e-9)
    expect(mathTrig.FLOOR(0.234, 0)).to.equal(error.div0)
    expect(mathTrig.FLOOR('invalid', 0)).to.equal(error.value)
    expect(mathTrig.FLOOR(1000, 15)).to.equal(990)
    expect(mathTrig.FLOOR(1000, 10.5)).to.equal(997.5)
    expect(mathTrig.FLOOR(7.7, 0.24)).to.equal(7.68)
    expect(mathTrig.FLOOR(-2.5, -2)).to.equal(-2)
  })

  it('FLOOR.PRECISE', () => {
    expect(mathTrig.FLOOR.PRECISE(undefined, undefined)).to.equal(0)
    expect(mathTrig.FLOOR.PRECISE(2, undefined)).to.equal(2)
    expect(mathTrig.FLOOR.PRECISE(undefined, 2)).to.equal(0)
    expect(mathTrig.FLOOR.PRECISE(error.na)).to.equal(error.na)
    expect(mathTrig.FLOOR.PRECISE(2014.6, 0.2)).to.equal(2014.4)
    expect(mathTrig.FLOOR.PRECISE(-3.2, -1)).to.equal(-4)
    expect(mathTrig.FLOOR.PRECISE(3.2, 1)).to.equal(3)
    expect(mathTrig.FLOOR.PRECISE(-3.2, 1)).to.equal(-4)
    expect(mathTrig.FLOOR.PRECISE(3.2, -1)).to.equal(3)
    expect(mathTrig.FLOOR.PRECISE(3.2)).to.equal(3)
  })

  it('FLOOR.MATH', () => {
    expect(mathTrig.FLOOR.MATH(undefined, undefined)).to.equal(0)
    expect(mathTrig.FLOOR.MATH(2, undefined)).to.equal(2)
    expect(mathTrig.FLOOR.MATH(undefined, 2)).to.equal(0)
    expect(mathTrig.FLOOR.MATH(error.na)).to.equal(error.na)
    expect(mathTrig.FLOOR.MATH(24.3, 5)).to.equal(20)
    expect(mathTrig.FLOOR.MATH(6.7)).to.equal(6)
    expect(mathTrig.FLOOR.MATH(-8.1, 2)).to.equal(-10)
    expect(mathTrig.FLOOR.MATH(-8.1, 0)).to.equal(0)
    expect(mathTrig.FLOOR.MATH(-5.5, 2, -1)).to.equal(-4)
    expect(mathTrig.FLOOR.MATH('invalid', 0)).to.equal(error.value)
    expect(mathTrig.FLOOR.MATH(-3.2, -1)).to.equal(-4)
    expect(mathTrig.FLOOR.MATH(3.2, 1)).to.equal(3)
    expect(mathTrig.FLOOR.MATH(-3.2, 1)).to.equal(-4)
    expect(mathTrig.FLOOR.MATH(3.2, -1)).to.equal(3)
    expect(mathTrig.FLOOR.MATH(3.2)).to.equal(3)
    expect(mathTrig.FLOOR.MATH(3.2, 0)).to.equal(0)
    expect(mathTrig.FLOOR.MATH(3.2, 'invalid')).to.equal(error.value)
    expect(mathTrig.FLOOR.MATH(-2.5, -2)).to.equal(-4)
    expect(mathTrig.FLOOR.MATH(-2.5, -2, 1)).to.equal(-2)
  })

  it('GCD', () => {
    expect(mathTrig.GCD(undefined, undefined)).to.equal(0)
    expect(mathTrig.GCD(2, undefined)).to.equal(2)
    expect(mathTrig.GCD(undefined, 1)).to.equal(1)
    expect(mathTrig.GCD(error.na)).to.equal(error.na)
    expect(mathTrig.GCD(5, 2)).to.equal(1)
    expect(mathTrig.GCD(24, 36)).to.equal(12)
    expect(mathTrig.GCD(7, 1)).to.equal(1)
    expect(mathTrig.GCD(5, 0)).to.equal(5)
    expect(mathTrig.GCD(5, 'invalid')).to.equal(error.value)
  })

  it('INT', () => {
    expect(mathTrig.INT(undefined)).to.equal(0)
    expect(mathTrig.INT(error.na)).to.equal(error.na)
    expect(mathTrig.INT(5.5)).to.equal(5)
    expect(mathTrig.INT('invalid')).to.equal(error.value)
    expect(mathTrig.INT('')).to.equal(error.value)
    expect(mathTrig.INT(true)).to.equal(1)
  })

  it('ISO.CEILING', () => {
    expect(mathTrig.ISO.CEILING(undefined)).to.equal(0)
    expect(mathTrig.ISO.CEILING(error.na)).to.equal(error.na)
    expect(mathTrig.ISO.CEILING(4.3)).to.equal(0)
    expect(mathTrig.ISO.CEILING(4.3, 1)).to.equal(5)
    expect(mathTrig.ISO.CEILING(-4.3, 1)).to.equal(-4)
    expect(mathTrig.ISO.CEILING(4.3, 2)).to.equal(6)
    expect(mathTrig.ISO.CEILING(4.3, -2)).to.equal(error.num)
    expect(mathTrig.ISO.CEILING(-4.3, 2)).to.equal(-4)
    expect(mathTrig.ISO.CEILING(-4.3, -2)).to.equal(-6)
    expect(mathTrig.ISO.CEILING(-4.3, 'invalid')).to.equal(error.value)
  })

  it('LCM', () => {
    expect(mathTrig.LCM(undefined, undefined)).to.equal(0)
    expect(mathTrig.LCM(error.na, 36)).to.equal(error.na)
    expect(mathTrig.LCM(24, error.na)).to.equal(error.na)
    expect(mathTrig.LCM(5, undefined, 2)).to.equal(0)
    expect(mathTrig.LCM(5, 0, 2)).to.equal(0)
    expect(mathTrig.LCM(5, 1, 2)).to.equal(10)
    expect(mathTrig.LCM(24, 36)).to.equal(72)
    expect(mathTrig.LCM(24, 'invalid')).to.equal(error.value)
  })

  it('LN', () => {
    expect(mathTrig.LN(undefined)).to.equal(error.num)
    expect(mathTrig.LN(0)).to.equal(error.num)
    expect(mathTrig.LN(error.na)).to.equal(error.na)
    expect(mathTrig.LN(Math.E)).to.equal(1)
    expect(mathTrig.LN('invalid')).to.equal(error.value)
  })

  it('LOG', () => {
    expect(mathTrig.LOG(undefined, undefined)).to.equal(error.num)
    expect(mathTrig.LOG(1, undefined)).to.equal(0)
    expect(mathTrig.LOG(10, null)).to.equal(1)
    expect(mathTrig.LOG(undefined, 1)).to.equal(error.num)
    expect(mathTrig.LOG(1, error.na)).to.equal(error.na)
    expect(mathTrig.LOG(error.na, 1)).to.equal(error.na)

    expect(mathTrig.LOG(10, 10)).to.equal(1)
    expect(mathTrig.LOG(10)).to.equal(1)
    expect(mathTrig.LOG(10, 'invalid')).to.equal(error.value)
  })

  it('LOG10', () => {
    expect(mathTrig.LOG10(undefined)).to.equal(error.num)
    expect(mathTrig.LOG10(error.na)).to.equal(error.na)
    expect(mathTrig.LOG10(10)).to.equal(1)
    expect(mathTrig.LOG10('invalid')).to.equal(error.value)
  })

  describe('MMULT', () => {
    it('should return the matrix product of two arrays', () => {
      expect(mathTrig.MMULT([[1], [2], [3]], [[4, 5, 6]])).to.deep.equal([
        [4, 5, 6],
        [8, 10, 12],
        [12, 15, 18]
      ])
      expect(mathTrig.MMULT([[1], [2], [3]], [[4, 5]])).to.deep.equal([
        [4, 5],
        [8, 10],
        [12, 15]
      ])
      expect(mathTrig.MMULT([[1, 2, 3]], [[4], [5], [6]])).to.deep.equal([[32]])
      expect(
        mathTrig.MMULT(
          [
            [1, 2, 3],
            [4, 5, 6]
          ],
          [[7], [8], [9]]
        )
      ).to.deep.equal([[50], [122]])
      expect(
        mathTrig.MMULT(
          [
            [1, 2, 3],
            [4, 5, 6]
          ],
          [
            [4, 7],
            [5, 8],
            [6, 9]
          ]
        )
      ).to.deep.equal([
        [32, 50],
        [77, 122]
      ])
      expect(
        mathTrig.MMULT(
          [
            [1, 4],
            [2, 5],
            [3, 6]
          ],
          [
            [7, 8, 9],
            [10, 11, 12]
          ]
        )
      ).to.deep.equal([
        [47, 52, 57],
        [64, 71, 78],
        [81, 90, 99]
      ])
      expect(
        mathTrig.MMULT(
          [
            [1, 4],
            [2, 5]
          ],
          [
            [7, 8, 9],
            [10, 11, 12]
          ]
        )
      ).to.deep.equal([
        [47, 52, 57],
        [64, 71, 78]
      ])
    })
    it('should return error if array1 or array 2 are not arrays', () => {
      expect(mathTrig.MMULT()).to.equal(error.value)
      expect(mathTrig.MMULT(undefined)).to.equal(error.value)
      expect(mathTrig.MMULT(1, 2)).to.equal(error.value)
      expect(mathTrig.MMULT(1, [2, 3])).to.equal(error.value)
      expect(mathTrig.MMULT(true, false)).to.equal(error.value)
    })
    it('should return error if both arrays do not contain only numbers', () => {
      expect(mathTrig.MMULT([[1], [true], [3]], [[4, 5, 6]])).to.equal(error.value)
      expect(mathTrig.MMULT([[1], [null], [3]], [[4, 5, 6]])).to.equal(error.value)
      expect(mathTrig.MMULT([[1], [undefined], [3]], [[4, 5, 6]])).to.equal(error.value)
      expect(mathTrig.MMULT([[1], ['a'], [3]], [[4, 5, 6]])).to.equal(error.value)
      expect(mathTrig.MMULT([[1], [2], [3]], [[4, 'a', 6]])).to.equal(error.value)
      expect(mathTrig.MMULT([[1], [{ a: 'b' }], [3]], [[4, 5, 6]])).to.equal(error.value)
      expect(mathTrig.MMULT([[1], [[1, 2]], [3]], [[4, 5, 6]])).to.equal(error.value)
    })
    it('should return error if number of columns in array1 is not same as the number of rows in array2', () => {
      expect(
        mathTrig.MMULT(
          [
            [1, 4],
            [2, 5],
            [3, 6]
          ],
          [[7, 8, 9], []]
        )
      ).to.equal(error.value)
      expect(
        mathTrig.MMULT(
          [
            [1, 4],
            [2, 5],
            [3, 6]
          ],
          [[7, 8, 9], [10, 11, 12], []]
        )
      ).to.equal(error.value)
    })
  })

  it('MOD', () => {
    expect(mathTrig.MOD(undefined, undefined)).to.equal(error.div0)
    expect(mathTrig.MOD(1, undefined)).to.equal(error.div0)
    expect(mathTrig.MOD(undefined, 1)).to.equal(0)
    expect(mathTrig.MOD(1, error.na)).to.equal(error.na)
    expect(mathTrig.MOD(error.na, 1)).to.equal(error.na)

    expect(mathTrig.MOD(3, 2)).to.equal(1)
    expect(mathTrig.MOD(-3, 2)).to.equal(1)
    expect(mathTrig.MOD(3, -2)).to.equal(-1)
    expect(mathTrig.MOD(-90, 360)).to.equal(270)
    expect(mathTrig.MOD(3, 0)).to.equal(error.div0)
    expect(mathTrig.MOD(3, 'invalid')).to.equal(error.value)
  })

  it('MROUND', () => {
    expect(mathTrig.MROUND(undefined, undefined)).to.equal(0)
    expect(mathTrig.MROUND(1, undefined)).to.equal(0)
    expect(mathTrig.MROUND(undefined, 1)).to.equal(0)
    expect(mathTrig.MROUND(1, error.na)).to.equal(error.na)
    expect(mathTrig.MROUND(error.na, 1)).to.equal(error.na)

    expect(mathTrig.MROUND(10, 3)).to.equal(9)
    expect(mathTrig.MROUND(-10, -3)).to.equal(-9)
    expect(mathTrig.MROUND(1.3, 0.2)).to.approximately(1.4000000000000001, 1e-9)
    expect(mathTrig.MROUND(5, -2)).to.equal(error.num)
    expect(mathTrig.MROUND(5, 'invalid')).to.equal(error.value)
  })

  it('MULTINOMIAL', () => {
    expect(mathTrig.MULTINOMIAL(undefined)).to.equal(1)
    expect(mathTrig.MULTINOMIAL(error.na)).to.equal(error.na)
    expect(mathTrig.MULTINOMIAL(2, 3, 4)).to.equal(1260)
    expect(mathTrig.MULTINOMIAL([2, 3, 4])).to.equal(1260)
    expect(mathTrig.MULTINOMIAL([2, 'invalid', 4])).to.equal(error.value)
  })

  describe('MUNIT', () => {
    it('should return the unit matrix for the specified dimension', () => {
      expect(mathTrig.MUNIT(1)).to.deep.equal([[1]])
      expect(mathTrig.MUNIT(2)).to.deep.equal([
        [1, 0],
        [0, 1]
      ])
      expect(mathTrig.MUNIT(2.345)).to.deep.equal([
        [1, 0],
        [0, 1]
      ])
      expect(mathTrig.MUNIT('3')).to.deep.equal([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ])
      expect(mathTrig.MUNIT('3.99')).to.deep.equal([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ])
      expect(mathTrig.MUNIT(4)).to.deep.equal([
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ])
    })
    it('should return error if more than one argument is used', () => {
      expect(mathTrig.MUNIT(1, 2)).to.equal(error.na)
      expect(mathTrig.MUNIT(1, undefined)).to.equal(error.na)
      expect(mathTrig.MUNIT(1, '')).to.equal(error.na)
    })
    it('should return error if dimension is null, undefined, or equal to or smaller than zero', () => {
      expect(mathTrig.MUNIT()).to.equal(error.value)
      expect(mathTrig.MUNIT(null)).to.equal(error.value)
      expect(mathTrig.MUNIT(undefined)).to.equal(error.value)
      expect(mathTrig.MUNIT(-1)).to.equal(error.value)
      expect(mathTrig.MUNIT('-1')).to.equal(error.value)
      expect(mathTrig.MUNIT(0)).to.equal(error.value)
      expect(mathTrig.MUNIT(1, 2)).to.equal(error.na)
    })
  })

  it('ODD', () => {
    expect(mathTrig.ODD(undefined)).to.equal(1)
    expect(mathTrig.ODD(error.na)).to.equal(error.na)
    expect(mathTrig.ODD(0)).to.equal(1)
    expect(mathTrig.ODD(3)).to.equal(3)
    expect(mathTrig.ODD(2)).to.equal(3)
    expect(mathTrig.ODD(-1)).to.equal(-1)
    expect(mathTrig.ODD(-2)).to.equal(-3)
    expect(mathTrig.ODD('invalid')).to.equal(error.value)
  })

  it('PI', () => {
    expect(mathTrig.PI()).to.equal(Math.PI)
  })

  it('POWER', () => {
    expect(mathTrig.POWER(undefined, undefined)).to.equal(error.num)
    expect(mathTrig.POWER(undefined, 2)).to.equal(0)
    expect(mathTrig.POWER(5, undefined)).to.equal(1)
    expect(mathTrig.POWER(error.na, 2)).to.equal(error.na)
    expect(mathTrig.POWER(5, error.na)).to.equal(error.na)
    expect(mathTrig.POWER(5, 2)).to.equal(25)
    expect(mathTrig.POWER(98.6, 3.2)).to.approximately(2401077.2220695773, 1e-9)
    expect(mathTrig.POWER(4, 5 / 4)).to.approximately(5.656854249492381, 1e-9)
    expect(mathTrig.POWER(-1, 0.5)).to.equal(error.num)
    expect(mathTrig.POWER(-1, 'invalid')).to.equal(error.value)
    expect(mathTrig.POWER(true, false)).to.equal(1)
  })

  it('PRODUCT', () => {
    expect(mathTrig.PRODUCT(undefined)).to.equal(0)
    expect(mathTrig.PRODUCT(undefined, 1)).to.equal(1)
    expect(mathTrig.PRODUCT(1, 2, error.na)).to.equal(error.na)
    expect(mathTrig.PRODUCT([1], [2], [error.na])).to.equal(error.na)
    expect(mathTrig.PRODUCT([5, 15, 30])).to.equal(2250)
    expect(mathTrig.PRODUCT([5, 'invalid', 30])).to.equal(error.value)
  })

  it('QUOTIENT', () => {
    expect(mathTrig.QUOTIENT(5, 2)).to.equal(2)
    expect(mathTrig.QUOTIENT(4.5, 3.1)).to.equal(1)
    expect(mathTrig.QUOTIENT(-10, 3)).to.equal(-3)
    expect(mathTrig.QUOTIENT(-10, 'invalid')).to.equal(error.value)
  })

  it('RADIANS', () => {
    expect(mathTrig.RADIANS(180)).to.equal(Math.PI)
    expect(mathTrig.RADIANS('invalid')).to.equal(error.value)
  })

  it('RAND', () => {
    let sum = 0
    const n = 10
    let i = n
    while (i--) {
      sum += mathTrig.RAND()
    }

    const average = sum / n
    expect(Number(parseInt(average), 10)).to.equal(0)
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
    expect(Number(parseInt(average, 10))).to.equal(7)
    expect(mathTrig.RANDBETWEEN(bottom, 'invalid')).to.equal(error.value)
  })

  it('ROMAN', () => {
    expect(mathTrig.ROMAN(10)).to.equal('X')
    expect(mathTrig.ROMAN(103)).to.equal('CIII')
    expect(mathTrig.ROMAN('invalid')).to.equal(error.value)
  })

  it('ROUND', () => {
    expect(mathTrig.ROUND(undefined, undefined)).to.equal(0)
    expect(mathTrig.ROUND(2, undefined)).to.equal(2)
    expect(mathTrig.ROUND(undefined, 2)).to.equal(0)
    expect(mathTrig.ROUND(error.na)).to.equal(error.na)
    expect(mathTrig.ROUND(2.15, 1)).to.approximately(2.2, 1e-9)
    expect(mathTrig.ROUND(2.149, 1)).to.approximately(2.1, 1e-9)
    expect(mathTrig.ROUND(600.425, 2)).to.approximately(600.43, 1e-9)
    expect(mathTrig.ROUND(600.435, 2)).to.approximately(600.44, 1e-9)
    expect(mathTrig.ROUND(-1.475, 2)).to.approximately(-1.47, 1e-9) // TODO: check if -1.48 would be the correct result or a precision error
    expect(mathTrig.ROUND(21.5, -1)).to.equal(20)
    expect(mathTrig.ROUND(626.3, -3)).to.equal(1000)
    expect(mathTrig.ROUND(1.98, -1)).to.equal(0)
    expect(mathTrig.ROUND(-50.55, -2)).to.equal(-100)
    expect(mathTrig.ROUND(-50.55, 'invalid')).to.equal(error.value)
  })

  it('ROUNDDOWN', () => {
    expect(mathTrig.ROUNDDOWN(undefined, undefined)).to.equal(0)
    expect(mathTrig.ROUNDDOWN(2, undefined)).to.equal(2)
    expect(mathTrig.ROUNDDOWN(undefined, 2)).to.equal(0)
    expect(mathTrig.ROUNDDOWN(error.na)).to.equal(error.na)
    expect(mathTrig.ROUNDDOWN(3.2, 0)).to.equal(3)
    expect(mathTrig.ROUNDDOWN(76.9, 0)).to.equal(76)
    expect(mathTrig.ROUNDDOWN(3.14159, 3)).to.approximately(3.141, 1e-9)
    expect(mathTrig.ROUNDDOWN(-3.14159, 1)).to.approximately(-3.1, 1e-9)
    expect(mathTrig.ROUNDDOWN(31415.92654, -2)).to.equal(31400)
    expect(mathTrig.ROUNDDOWN(31415.92654, 'invalid')).to.equal(error.value)
  })

  it('ROUNDUP', () => {
    expect(mathTrig.ROUNDUP(undefined, undefined)).to.equal(0)
    expect(mathTrig.ROUNDUP(2, undefined)).to.equal(2)
    expect(mathTrig.ROUNDUP(undefined, 2)).to.equal(0)
    expect(mathTrig.ROUNDUP(error.na)).to.equal(error.na)
    expect(mathTrig.ROUNDUP(3.2, 0)).to.equal(4)
    expect(mathTrig.ROUNDUP(76.9, 0)).to.equal(77)
    expect(mathTrig.ROUNDUP(3.14159, 3)).to.approximately(3.142, 1e-9)
    expect(mathTrig.ROUNDUP(-3.14159, 1)).to.approximately(-3.2, 1e-9)
    expect(mathTrig.ROUNDUP(31415.92654, -2)).to.equal(31500)
    expect(mathTrig.ROUNDUP(31415.92654, 'invalid')).to.equal(error.value)
  })

  it('SEC', () => {
    expect(mathTrig.SEC(undefined)).to.equal(1)
    expect(mathTrig.SEC(error.na)).to.equal(error.na)
    expect(mathTrig.SEC(45)).to.approximately(1.9035944074044246, 1e-9)
    expect(mathTrig.SEC(30)).to.approximately(6.482921234962678, 1e-9)
    expect(mathTrig.SEC('invalid')).to.equal(error.value)
  })

  it('SECH', () => {
    expect(mathTrig.SECH(undefined)).to.equal(1)
    expect(mathTrig.SECH(error.na)).to.equal(error.na)
    expect(mathTrig.SECH(45)).to.approximately(5.725037161098787e-20, 1e-9)
    expect(mathTrig.SECH(30)).to.approximately(1.8715245937680347e-13, 1e-9)
    expect(mathTrig.SECH('invalid')).to.equal(error.value)
  })

  it('SERIESSUM', () => {
    expect(
      mathTrig.SERIESSUM(mathTrig.PI() / 4, 0, 2, [
        1,
        -1 / mathTrig.FACT(2),
        1 / mathTrig.FACT(4),
        -1 / mathTrig.FACT(6)
      ])
    ).to.approximately(0.7071032148228457, 1e-9)
    expect(mathTrig.SERIESSUM(1, 2, 3, 'invalid')).to.equal(error.value)
  })

  it('SIGN', () => {
    expect(mathTrig.SIGN(undefined)).to.equal(0)
    expect(mathTrig.SIGN(error.na)).to.equal(error.na)
    expect(mathTrig.SIGN(0)).to.equal(0)
    expect(mathTrig.SIGN(-5)).to.equal(-1)
    expect(mathTrig.SIGN(5)).to.equal(1)
    expect(mathTrig.SIGN('invalid')).to.equal(error.value)
  })

  it('SIN', () => {
    expect(mathTrig.SIN(undefined)).to.equal(0)
    expect(mathTrig.SIN(error.na)).to.equal(error.na)
    expect(mathTrig.SIN(Math.PI / 2)).to.equal(1)
    expect(mathTrig.SIN('invalid')).to.equal(error.value)
  })

  it('SINH', () => {
    expect(mathTrig.SINH(undefined)).to.equal(0)
    expect(mathTrig.SINH(error.na)).to.equal(error.na)
    expect(mathTrig.SINH(1)).to.approximately(1.1752011936438014, 1e-9) // the golden ratio: http://mathworld.wolfram.com/HyperbolicSine.html
    expect(mathTrig.SINH('invalid')).to.equal(error.value)
  })

  it('SQRT', () => {
    expect(mathTrig.SQRT(undefined)).to.equal(0)
    expect(mathTrig.SQRT(error.na)).to.equal(error.na)
    expect(mathTrig.SQRT(4)).to.equal(2)
    expect(mathTrig.SQRT(-1)).to.equal(error.num)
    expect(mathTrig.SQRT('invalid')).to.equal(error.value)
  })

  it('SQRTPI', () => {
    expect(mathTrig.SQRTPI(undefined)).to.equal(0)
    expect(mathTrig.SQRTPI(error.na)).to.equal(error.na)
    expect(mathTrig.SQRTPI(3)).to.approximately(3.0699801238394655, 1e-9)
    expect(mathTrig.SQRTPI('invalid')).to.equal(error.value)
  })

  it('SUBTOTAL', () => {
    expect(mathTrig.SUBTOTAL(1, [1, 2, 3])).to.equal(2)
    expect(mathTrig.SUBTOTAL(2, [1, 2, 3, 'does not count'])).to.equal(3)
    expect(mathTrig.SUBTOTAL(3, [1, 2, 3, 'counts'])).to.equal(4)
    expect(mathTrig.SUBTOTAL(4, [1, 2, 3])).to.equal(3)
    expect(mathTrig.SUBTOTAL(5, [1, 2, 3])).to.equal(1)
    expect(mathTrig.SUBTOTAL(6, [1, 2, 3])).to.equal(6)
    expect(mathTrig.SUBTOTAL(7, [1, 2, 3])).to.equal(1)
    expect(mathTrig.SUBTOTAL(8, [1, 2, 3])).to.approximately(0.816496580927726, 1e-9)
    expect(mathTrig.SUBTOTAL(9, [1, 2, 3])).to.equal(6)
    expect(mathTrig.SUBTOTAL(10, [1, 2, 3])).to.equal(1)
    expect(mathTrig.SUBTOTAL(11, [1, 2, 3])).to.approximately(0.6666666666666666, 1e-9)
    expect(mathTrig.SUBTOTAL(101, [1, 2, 3])).to.equal(2)
    expect(mathTrig.SUBTOTAL(102, [1, 2, 3, 'does not count'])).to.equal(3)
    expect(mathTrig.SUBTOTAL(103, [1, 2, 3, 'counts'])).to.equal(4)
    expect(mathTrig.SUBTOTAL(104, [1, 2, 3])).to.equal(3)
    expect(mathTrig.SUBTOTAL(105, [1, 2, 3])).to.equal(1)
    expect(mathTrig.SUBTOTAL(106, [1, 2, 3])).to.equal(6)
    expect(mathTrig.SUBTOTAL(107, [1, 2, 3])).to.equal(1)
    expect(mathTrig.SUBTOTAL(108, [1, 2, 3])).to.approximately(0.816496580927726, 1e-9)
    expect(mathTrig.SUBTOTAL(109, [1, 2, 3])).to.equal(6)
    expect(mathTrig.SUBTOTAL(110, [1, 2, 3])).to.equal(1)
    expect(mathTrig.SUBTOTAL(111, [1, 2, 3])).to.approximately(0.6666666666666666, 1e-9)
    expect(mathTrig.SUBTOTAL('invalid', [1, 2, 3])).to.equal(error.value)
  })

  it('SUM', () => {
    expect(mathTrig.SUM(undefined, 1)).to.equal(1)
    expect(mathTrig.SUM(1, 2, error.na)).to.equal(error.na)
    expect(mathTrig.SUM(1, error.na, 2)).to.equal(error.na)
    expect(mathTrig.SUM(1, [error.na], 2)).to.equal(error.na)
    expect(mathTrig.SUM([1], [2], [error.na])).to.equal(error.na)
    expect(mathTrig.SUM([1], [error.na], [2])).to.equal(error.na)
    expect(mathTrig.SUM([1], error.na, [2])).to.equal(error.na)
    expect(mathTrig.SUM(1, 2, 3)).to.equal(6)
    expect(mathTrig.SUM([1, 2, 3])).to.equal(6)
    expect(mathTrig.SUM([1, 2, 3], 1, 2)).to.equal(9)
    expect(mathTrig.SUM([1, 2, 3], [1, 2])).to.equal(9)
    expect(
      mathTrig.SUM([
        [1, 1],
        [2, 2],
        [3, 3]
      ])
    ).to.equal(12)
    expect(
      mathTrig.SUM(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        1,
        2
      )
    ).to.equal(15)
    expect(
      mathTrig.SUM(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        1,
        2
      )
    ).to.equal(15)
    expect(
      mathTrig.SUM(
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
    ).to.equal(24)
    expect(mathTrig.SUM(1, 'invalid')).to.equal(1)
    expect(mathTrig.SUM(undefined)).to.equal(0)
    expect(mathTrig.SUM(undefined, 1)).to.equal(1)
    expect(mathTrig.SUM(null)).to.equal(0)
    expect(mathTrig.SUM(null, 1)).to.equal(1)
    expect(mathTrig.SUM(error.na)).to.equal(error.na)
    expect(mathTrig.SUM(undefined, error.na)).to.equal(error.na)
    expect(mathTrig.SUM(error.na, 1)).to.equal(error.na)
  })

  it('SUMIF', () => {
    expect(mathTrig.SUMIF([undefined], undefined)).to.equal(0)
    expect(mathTrig.SUMIF([1, 2, 3], undefined)).to.equal(0)
    expect(mathTrig.SUMIF([1, 2, 3], error.na)).to.equal(0)
    expect(mathTrig.SUMIF([undefined], '>2')).to.equal(0)
    expect(mathTrig.SUMIF([1, 2, error.na], error.na)).to.equal(0)
    expect(mathTrig.SUMIF([2, error.na], '>1')).to.equal(2)
    expect(mathTrig.SUMIF([error.na], '>1')).to.equal(0)
    expect(mathTrig.SUMIF([error.na], '>1', [error.na])).to.equal(0)
    expect(mathTrig.SUMIF([1, 2, 3], '>2')).to.equal(3)
    expect(
      mathTrig.SUMIF(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        '>2'
      )
    ).to.equal(6)
    expect(mathTrig.SUMIF([1, 2, 3], '*')).to.equal(6)
    expect(
      mathTrig.SUMIF(
        [
          [1, 1],
          [2, 2],
          [3, 3]
        ],
        '*'
      )
    ).to.equal(12)
    expect(mathTrig.SUMIF([1, 'invalid', 3], '>2')).to.equal(3)
    expect(mathTrig.SUMIF([1, 2, 3], '<>2')).to.equal(4)
    expect(mathTrig.SUMIF([1, 2, 3, 3, 4, 5], '=3')).to.equal(6)
    expect(mathTrig.SUMIF([1, 'b', 'c', 'b', 'd'], '=b', [1, 2, 3, 4, 5])).to.equal(6)
    expect(mathTrig.SUMIF(['a', 'b', 'c', 'd', 'd'], '<>d', [1, 2, 3, 4, 5])).to.equal(6)
  })

  it('SUMIFS', () => {
    expect(mathTrig.SUMIFS([1, 2, 3], [4, 5, 6], '>4', [7, 8, 9], '<9')).to.equal(2)
    expect(mathTrig.SUMIFS([1, 2, 3], [4, 5, 6], '>4', [7, 8, 9], '*')).to.equal(5)
    expect(mathTrig.SUMIFS([1, 'invalid', 3], [4, 5, 6], '>4')).to.equal(error.value)
  })

  it('SUMPRODUCT', () => {
    expect(
      mathTrig.SUMPRODUCT(
        [
          [3, 4],
          [8, error.na]
        ],
        [
          [2, 7],
          [6, 7]
        ]
      )
    ).to.equal(error.na)
    expect(mathTrig.SUMPRODUCT([[undefined, undefined]], [[undefined, undefined]])).to.equal(0)
    expect(
      mathTrig.SUMPRODUCT(
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
    ).to.equal(156)

    expect(mathTrig.SUMPRODUCT([[1], [4], [10]], [[0.55], [0.3], [0.1]])).to.approximately(2.75, 1e-9)

    expect(mathTrig.SUMPRODUCT([1, 4, 10], [0.55, 0.3, 0.1])).to.approximately(2.75, 1e-9)

    expect(
      mathTrig.SUMPRODUCT(
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
    ).to.equal(error.value)

    expect(mathTrig.SUMPRODUCT([8, 'invalid'], [5, 3])).to.equal(error.value)
    expect(mathTrig.SUMPRODUCT()).to.equal(error.value)
  })

  it('SUMSQ', () => {
    expect(mathTrig.SUMSQ(1, 2, 3)).to.equal(14)
    expect(mathTrig.SUMSQ([1, 2, 3])).to.equal(14)
    expect(
      mathTrig.SUMSQ([
        [1, 1],
        [2, 2],
        [3, 3]
      ])
    ).to.equal(28)
    expect(mathTrig.SUMSQ(1, 'invalid', 3)).to.equal(error.value)
  })

  it('SUMX2MY2', () => {
    expect(mathTrig.SUMX2MY2([1, 2, 3], [4, 5, 6])).to.equal(-63)
    expect(mathTrig.SUMX2MY2([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).to.equal(-468)
    expect(mathTrig.SUMX2MY2([1, 2, 3], [4, 'invalid', 6])).to.equal(error.value)
  })

  it('SUMX2PY2', () => {
    expect(mathTrig.SUMX2PY2([1, 2, 3], [4, 5, 6])).to.equal(91)
    expect(mathTrig.SUMX2PY2([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).to.equal(650)
    expect(mathTrig.SUMX2PY2([1, 2, 'invalid'], [4, 5, 6])).to.equal(error.value)
  })

  it('SUMXMY2', () => {
    expect(mathTrig.SUMXMY2([1, 2, 3], [4, 5, 6])).to.equal(27)
    expect(mathTrig.SUMXMY2([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).to.equal(216)
    expect(mathTrig.SUMXMY2([1, 2, 'invalid'], [4, 5, 6])).to.equal(error.value)
  })

  it('TAN', () => {
    expect(mathTrig.TAN(undefined)).to.equal(0)
    expect(mathTrig.TAN(error.na)).to.equal(error.na)
    expect(mathTrig.TAN(mathTrig.RADIANS(45))).to.approximately(1, 1e-9)
    expect(mathTrig.TAN('invalid')).to.equal(error.value)
  })

  it('TANH', () => {
    expect(mathTrig.TANH(undefined)).to.equal(0)
    expect(mathTrig.TANH(error.na)).to.equal(error.na)
    expect(mathTrig.TANH(0.5)).to.approximately(0.46211715726000974, 1e-9)
    expect(mathTrig.TANH('invalid')).to.equal(error.value)
  })

  it('TRUNC', () => {
    expect(mathTrig.TRUNC(undefined, undefined)).to.equal(0)
    expect(mathTrig.TRUNC(2, undefined)).to.equal(2)
    expect(mathTrig.TRUNC(undefined, 2)).to.equal(0)
    expect(mathTrig.TRUNC(error.na)).to.equal(error.na)
    expect(mathTrig.TRUNC(-8.9)).to.equal(-8)
    expect(mathTrig.TRUNC(0.45)).to.equal(0)
    expect(mathTrig.TRUNC('invalid')).to.equal(error.value)
  })
})
