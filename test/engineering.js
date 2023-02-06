import { expect } from 'chai'

import * as engineering from '../src/engineering.js'
import * as error from '../src/utils/error.js'

describe('Engineering', () => {
  it('BESSELI', () => {
    expect(engineering.BESSELI(1.5, 1)).to.approximately(0.981666, 10e-6)
    expect(engineering.BESSELI(1.5, 2)).to.approximately(0.337835, 10e-6)
    expect(engineering.BESSELI('invalid')).to.equal(error.value)
  })

  it('BESSELJ', () => {
    expect(engineering.BESSELJ(1.9, 2)).to.approximately(0.329926, 10e-6)
    expect(engineering.BESSELJ('invalid')).to.equal(error.value)
  })

  it('BESSELK', () => {
    expect(engineering.BESSELK(1.5, 1)).to.approximately(0.277388, 10e-6)
    expect(engineering.BESSELK('invalid')).to.equal(error.value)
  })

  it('BESSELY', () => {
    expect(engineering.BESSELY(2.5, 1)).to.approximately(0.145918, 10e-6)
    expect(engineering.BESSELY('invalid')).to.equal(error.value)
  })

  it('BIN2DEC', () => {
    expect(engineering.BIN2DEC(1100100)).to.equal(100)
    expect(engineering.BIN2DEC(1111111111)).to.equal(-1)
    expect(engineering.BIN2DEC('101010')).to.equal(42)
    expect(engineering.BIN2DEC(1000000000)).to.equal(-512)
    expect(engineering.BIN2DEC(1234567890)).to.equal(error.num)
    expect(engineering.BIN2DEC('a')).to.equal(error.num)
  })

  it('BIN2HEX', () => {
    expect(engineering.BIN2HEX(11111011, 4)).to.equal('00fb')
    expect(engineering.BIN2HEX(1110)).to.equal('e')
    expect(engineering.BIN2HEX(1111111111)).to.equal('ffffffffff')
    expect(engineering.BIN2HEX('a')).to.equal(error.num)
    expect(engineering.BIN2HEX(1, 'a')).to.equal(error.value)
    expect(engineering.BIN2HEX(1, -1)).to.equal(error.num)
    expect(engineering.BIN2HEX('101010')).to.equal('2a')
    expect(engineering.BIN2HEX(111111111)).to.equal('1ff')
    expect(engineering.BIN2HEX(1000000000)).to.equal('fffffffe00')
    expect(engineering.BIN2HEX('Hello World!')).to.equal(error.num)
    expect(engineering.BIN2HEX(1234567890)).to.equal(error.num)
    expect(engineering.BIN2HEX(101010101010)).to.equal(error.num)
    expect(engineering.BIN2HEX(101010, 1)).to.equal(error.num)
    expect(engineering.BIN2HEX(101010, -4)).to.equal(error.num)
    expect(engineering.BIN2HEX(101010, 'Hello World!')).to.equal(error.value)
  })

  it('BIN2OCT', () => {
    expect(engineering.BIN2OCT(1001, 3)).to.equal('011')
    expect(engineering.BIN2OCT(1100100)).to.equal('144')
    expect(engineering.BIN2OCT(1111111111)).to.equal('7777777777')
    expect(engineering.BIN2OCT('a')).to.equal(error.num)
    expect(engineering.BIN2OCT(1, 'a')).to.equal(error.value)
    expect(engineering.BIN2OCT(1, -1)).to.equal(error.num)
    expect(engineering.BIN2OCT('101010')).to.equal('52')
    expect(engineering.BIN2OCT(101010, 4.5)).to.equal('0052')
    expect(engineering.BIN2OCT('Hello World!')).to.equal(error.num)
    expect(engineering.BIN2OCT(1234567890)).to.equal(error.num)
    expect(engineering.BIN2OCT(101010101010)).to.equal(error.num)
    expect(engineering.BIN2OCT(101010, 1)).to.equal(error.num)
    expect(engineering.BIN2OCT(101010, -4)).to.equal(error.num)
    expect(engineering.BIN2OCT(101010, 'Hello World!')).to.equal(error.value)
  })

  it('BITAND', () => {
    expect(engineering.BITAND(1, 5)).to.equal(1)
    expect(engineering.BITAND(13, 25)).to.equal(9)
    expect(engineering.BITAND('a', 1)).to.equal(error.value)
    expect(engineering.BITAND(-1, 1)).to.equal(error.num)
    expect(engineering.BITAND(1.1, 1)).to.equal(error.num)
    expect(engineering.BITAND(281474976710656, 1)).to.equal(error.num)
    expect(engineering.BITAND('Hello World!', 1)).to.equal(error.value)
  })

  it('BITLSHIFT', () => {
    expect(engineering.BITLSHIFT(4, 2)).to.equal(16)
    expect(engineering.BITLSHIFT('a', 1)).to.equal(error.value)
    expect(engineering.BITLSHIFT(-1, 1)).to.equal(error.num)
    expect(engineering.BITLSHIFT(1.1, 1)).to.equal(error.num)
    expect(engineering.BITLSHIFT(281474976710656, 1)).to.equal(error.num)
    expect(engineering.BITLSHIFT(1, 54)).to.equal(error.num)
    expect(engineering.BITLSHIFT('Hello World!', 1)).to.equal(error.value)
  })

  it('BITOR', () => {
    expect(engineering.BITOR(23, 10)).to.equal(31)
    expect(engineering.BITOR('a', 1)).to.equal(error.value)
    expect(engineering.BITOR(-1, 1)).to.equal(error.num)
    expect(engineering.BITOR(1.1, 1)).to.equal(error.num)
    expect(engineering.BITOR(281474976710656, 1)).to.equal(error.num)
    expect(engineering.BITOR('Hello World!', 1)).to.equal(error.value)
  })

  it('BITRSHIFT', () => {
    expect(engineering.BITRSHIFT(13, 2)).to.equal(3)
    expect(engineering.BITRSHIFT('a', 1)).to.equal(error.value)
    expect(engineering.BITRSHIFT(-1, 1)).to.equal(error.num)
    expect(engineering.BITRSHIFT(1.1, 1)).to.equal(error.num)
    expect(engineering.BITRSHIFT(281474976710656, 1)).to.equal(error.num)
    expect(engineering.BITRSHIFT(1, 54)).to.equal(error.num)
    expect(engineering.BITLSHIFT(0, 0)).to.equal(0)
    expect(engineering.BITLSHIFT(1.5, 1)).to.equal(error.num)
    expect(engineering.BITLSHIFT('Hello World!', 1)).to.equal(error.value)
  })

  it('BITXOR', () => {
    expect(engineering.BITXOR(5, 3)).to.equal(6)
    expect(engineering.BITXOR('a', 1)).to.equal(error.value)
    expect(engineering.BITXOR(-1, 1)).to.equal(error.num)
    expect(engineering.BITXOR(1.1, 1)).to.equal(error.num)
    expect(engineering.BITXOR(281474976710656, 1)).to.equal(error.num)
    expect(engineering.BITXOR('Hello World!', 1)).to.equal(error.value)
  })

  it('COMPLEX', () => {
    expect(engineering.COMPLEX(3, 4)).to.equal('3+4i')
    expect(engineering.COMPLEX(3, 4, 'j')).to.equal('3+4j')
    expect(engineering.COMPLEX(0, 1)).to.equal('i')
    expect(engineering.COMPLEX(1, 0)).to.equal('1')
    expect(engineering.COMPLEX(0, 0)).to.equal(0)
    expect(engineering.COMPLEX('a', 1)).to.equal(error.value)
    expect(engineering.COMPLEX(1, 1, 'k')).to.equal(error.value)
  })

  it('CONVERT', () => {
    expect(engineering.CONVERT()).to.equal(error.na)
    expect(engineering.CONVERT('')).to.equal(error.na)
    expect(engineering.CONVERT(2)).to.equal(error.na)
    expect(engineering.CONVERT('a', 1)).to.equal(error.na)
    expect(engineering.CONVERT(2, 'mi')).to.equal(error.na)
    expect(engineering.CONVERT(1, 'mi', 'yard')).to.equal(error.na)
    expect(engineering.CONVERT(2, 'mi', 'yd', 'mi')).to.equal(error.na)
    expect(engineering.CONVERT(1, 'invalid', 'invalid')).to.equal(error.na)
    expect(engineering.CONVERT(1, 'da', 'invalid')).to.equal(error.na)
    expect(engineering.CONVERT(1, 'ki', 'invalid')).to.equal(error.na)
    expect(engineering.CONVERT(1, 'invalid', 'da')).to.equal(error.na)
    expect(engineering.CONVERT(1, 'invalid', 'ki')).to.equal(error.na)
    expect(engineering.CONVERT(2.5, 'ft', 'sec')).to.equal(error.na)
    expect(engineering.CONVERT(null, null, null)).to.equal(error.na)
    expect(engineering.CONVERT(10, null, 'mi')).to.equal(error.na)
    expect(engineering.CONVERT(10, 'km', null)).to.equal(error.na)

    expect(engineering.CONVERT(error.div0, error.div0, error.div0)).to.equal(error.div0)

    expect(engineering.CONVERT('Lots of', 'mi', 'yard')).to.equal(error.value)
    expect(engineering.CONVERT('', 'km', 'mi')).to.equal(error.value)
    expect(engineering.CONVERT(true, 'km', 'mi')).to.equal(error.value)
    expect(engineering.CONVERT(10, true, 'mi')).to.equal(error.value)
    expect(engineering.CONVERT(10, 'km', true)).to.equal(error.value)

    expect(engineering.CONVERT(1, 'kg', 'g')).to.equal(1000)
    expect(engineering.CONVERT(1, 'km', 'm')).to.equal(1000)
    expect(engineering.CONVERT(1, 'g', 'kg')).to.equal(0.001)
    expect(engineering.CONVERT(1, 'm', 'km')).to.equal(0.001)

    expect(engineering.CONVERT(72, 'F', 'C')).to.approximately(22.22222222222222, 1e-9)
    expect(engineering.CONVERT(0, 'km', 'mi')).to.equal(0)
    expect(engineering.CONVERT(null, 'km', 'mi')).to.equal(0)
    expect(engineering.CONVERT(10, 'km', 'mi')).to.approximately(6.213711922, 1e-9)
    expect(engineering.CONVERT('10', 'km', 'mi')).to.approximately(6.213711922, 1e-9)
    expect(engineering.CONVERT(75, 'in', 'm')).to.approximately(1.905, 1e-9)
    expect(engineering.CONVERT(1, 'gal', 'l')).to.approximately(3.785411784, 1e-9)
    expect(engineering.CONVERT(1, 'lbm', 'kg')).to.approximately(0.45359237, 1e-9)
    expect(engineering.CONVERT(2, 'mi', 'yd')).to.equal(3520)
    expect(engineering.CONVERT(2, 'nm', 'mm')).to.approximately(0.000002, 1e-9)
    expect(engineering.CONVERT(2, 'kg', 'lbm')).to.approximately(4.409245243697551, 1e-9)
    expect(engineering.CONVERT(2, 'g', 'lbm')).to.approximately(0.004409245243697552, 1e-9)
    expect(engineering.CONVERT(2, 'mg', 'lbm')).to.approximately(0.000004409245243697551, 1e-9)
    expect(engineering.CONVERT(3583, 'byte', 'kbyte')).to.approximately(3.583, 1e-9)
    expect(engineering.CONVERT(3583, 'byte', 'bit')).to.equal(28664)
    expect(engineering.CONVERT(64, 'kibyte', 'bit')).to.equal(524288)

    expect(engineering.CONVERT(engineering.CONVERT(100, 'ft', 'm'), 'ft', 'm')).to.approximately(9.290304, 1e-9)
  })

  it('DEC2BIN', () => {
    expect(engineering.DEC2BIN(9)).to.equal('1001')
    expect(engineering.DEC2BIN(9, 4)).to.equal('1001')
    expect(engineering.DEC2BIN(-100)).to.equal('1110011100')
    expect(engineering.DEC2BIN('a')).to.equal(error.value)
    expect(engineering.DEC2BIN(512)).to.equal(error.num)
    expect(engineering.DEC2BIN(1, 'a')).to.equal(error.value)
    expect(engineering.DEC2BIN(1, -1)).to.equal(error.num)
  })

  it('DEC2HEX', () => {
    expect(engineering.DEC2HEX(100, 4)).to.equal('0064')
    expect(engineering.DEC2HEX(-54)).to.equal('ffffffffca')
    expect(engineering.DEC2HEX(28)).to.equal('1c')
    expect(engineering.DEC2HEX(549755813888)).to.equal(error.num)
    expect(engineering.DEC2HEX(64, 1)).to.equal(error.num)
    expect(engineering.DEC2HEX('a')).to.equal(error.value)
    expect(engineering.DEC2HEX(1, 'a')).to.equal(error.value)
    expect(engineering.DEC2HEX(1, -1)).to.equal(error.num)
  })

  it('DEC2OCT', () => {
    expect(engineering.DEC2OCT(58)).to.equal('72')
    expect(engineering.DEC2OCT(58, 3)).to.equal('072')
    expect(engineering.DEC2OCT(-100)).to.equal('7777777634')
    expect(engineering.DEC2OCT('a')).to.equal(error.value)
    expect(engineering.DEC2OCT(549755813888)).to.equal(error.num)
    expect(engineering.DEC2OCT(1, 'a')).to.equal(error.value)
    expect(engineering.DEC2OCT(1, -1)).to.equal(error.num)
  })

  it('DELTA', () => {
    expect(engineering.DELTA(5, 4)).to.equal(0)
    expect(engineering.DELTA(5, 5)).to.equal(1)
    expect(engineering.DELTA(0.5, 0)).to.equal(0)
    expect(engineering.DELTA('a')).to.equal(error.value)
  })

  // TODO: find cases where upper_bound is used
  it('ERF', () => {
    expect(engineering.ERF(0.745)).to.approximately(0.7079289200957377, 1e-9)
    expect(engineering.ERF(1)).to.approximately(0.8427007929497149, 1e-9)
    expect(engineering.ERF('a')).to.equal(error.value)
  })

  // TODO
  it('ERF.PRECISE', () => {
    expect(engineering.ERF.PRECISE).to.throw('ERF.PRECISE is not implemented')
  })

  it('ERFC', () => {
    expect(engineering.ERFC(1)).to.approximately(0.1572992070502851, 1e-9)
    expect(engineering.ERFC('a')).to.equal(error.value)
  })

  // TODO
  it('ERFC.PRECISE', () => {
    expect(engineering.ERFC.PRECISE).to.throw('ERFC.PRECISE is not implemented')
  })

  it('GESTEP', () => {
    expect(engineering.GESTEP(5, 4)).to.equal(1)
    expect(engineering.GESTEP(5, 5)).to.equal(1)
    expect(engineering.GESTEP(-4, -5)).to.equal(1)
    expect(engineering.GESTEP(-1)).to.equal(0)
    expect(engineering.GESTEP('a')).to.equal(error.value)
  })

  it('HEX2BIN', () => {
    expect(engineering.HEX2BIN('F', 8)).to.equal('00001111')
    expect(engineering.HEX2BIN('B7')).to.equal('10110111')
    expect(engineering.HEX2BIN('FFFFFFFFFF')).to.equal('1111111111')
    expect(engineering.HEX2BIN('z')).to.equal(error.num)
    expect(engineering.HEX2BIN('200')).to.equal(error.num)
    expect(engineering.HEX2BIN(1, 'a')).to.equal(error.value)
    expect(engineering.HEX2BIN(1, -1)).to.equal(error.num)
  })

  it('HEX2DEC', () => {
    expect(engineering.HEX2DEC('A5')).to.equal(165)
    expect(engineering.HEX2DEC('FFFFFFFF5B')).to.equal(-165)
    expect(engineering.HEX2DEC('3DA408B9')).to.equal(1034160313)
    expect(engineering.HEX2DEC('z')).to.equal(error.num)
  })

  it('HEX2OCT', () => {
    expect(engineering.HEX2OCT('F', 3)).to.equal('017')
    expect(engineering.HEX2OCT('3B4E')).to.equal('35516')
    expect(engineering.HEX2OCT('FFFFFFFF00')).to.equal('7777777400')
    expect(engineering.HEX2OCT('z')).to.equal(error.num)
    expect(engineering.HEX2OCT('FFDFFFFFFF')).to.equal(error.num)
    expect(engineering.HEX2OCT(1, 'a')).to.equal(error.value)
    expect(engineering.HEX2OCT(1, -1)).to.equal(error.num)
  })

  it('IMABS', () => {
    expect(engineering.IMABS('5+12i')).to.equal(13)
    expect(engineering.IMABS('a')).to.equal(error.value)
  })

  it('IMAGINARY', () => {
    expect(engineering.IMAGINARY('3+4i')).to.equal(4)
    expect(engineering.IMAGINARY('i')).to.equal(1)
    expect(engineering.IMAGINARY('+i')).to.equal('+1')
    expect(engineering.IMAGINARY('-j')).to.equal('-1')
    expect(engineering.IMAGINARY('0-j')).to.equal(-1)
    expect(engineering.IMAGINARY('4')).to.equal(0)
    expect(engineering.IMAGINARY(4)).to.equal(0)
    expect(engineering.IMAGINARY(0)).to.equal(0)
    expect(engineering.IMAGINARY('1+k')).to.equal(error.num)
  })

  it('IMARGUMENT', () => {
    expect(engineering.IMARGUMENT('3+4i')).to.approximately(0.9272952180016122, 1e-9)
    expect(engineering.IMARGUMENT('a')).to.equal(error.value)
    expect(engineering.IMARGUMENT(0)).to.equal(error.div0)
    expect(engineering.IMARGUMENT('2i')).to.equal(Math.PI / 2)
    expect(engineering.IMARGUMENT('-2i')).to.equal(-Math.PI / 2)
    expect(engineering.IMARGUMENT('2')).to.equal(0)
    expect(engineering.IMARGUMENT('-2')).to.equal(-Math.PI)
    expect(engineering.IMARGUMENT('-1+2i')).to.approximately(2.0344439357957027, 1e-9)
    expect(engineering.IMARGUMENT('-1-2i')).to.approximately(-2.0344439357957027, 1e-9)
  })

  it('IMCONJUGATE', () => {
    expect(engineering.IMCONJUGATE('3+4i')).to.equal('3-4i')
    expect(engineering.IMCONJUGATE('a')).to.equal(error.value)
  })

  it('IMCOS', () => {
    const im = engineering.IMCOS('1+i')
    expect(engineering.IMREAL(im)).to.approximately(0.8337300251311491, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(-0.9888977057628651, 1e-9)
    expect(engineering.IMCOS('a')).to.equal(error.value)
    expect(engineering.IMCOS(true)).to.equal(error.value)
  })

  it('IMCOSH', () => {
    const im = engineering.IMCOSH('4+3i')
    expect(engineering.IMREAL(im)).to.approximately(-27.034945603074224, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(3.851153334811777, 1e-9)
    expect(engineering.IMCOSH('a')).to.equal(error.value)
    expect(engineering.IMCOSH(true)).to.equal(error.value)
  })

  it('IMCOT', () => {
    const im = engineering.IMCOT('4+3i')
    expect(engineering.IMREAL(im)).to.approximately(0.0049011823943044056, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(-0.9992669278059017, 1e-9)
    expect(engineering.IMCOT('a')).to.equal(error.value)
    expect(engineering.IMCOT(true)).to.equal(error.value)
  })

  it('IMCSC', () => {
    expect(engineering.IMCSC('1+i')).to.equal('0.6215180171704283-0.3039310016284264i')
    expect(engineering.IMCSC(true)).to.equal(error.value)
    expect(engineering.IMCSC(false)).to.equal(error.value)
    expect(engineering.IMCSC('Hello World!')).to.equal(error.num)
  })

  it('IMCSC', () => {
    expect(engineering.IMCSCH('1+i')).to.equal('0.3039310016284264-0.6215180171704283i')
    expect(engineering.IMCSCH(true)).to.equal(error.value)
    expect(engineering.IMCSCH(false)).to.equal(error.value)
    expect(engineering.IMCSCH('Hello World!')).to.equal(error.num)
  })

  it('IMDIV', () => {
    expect(engineering.IMDIV('-238+240i', '10+24i')).to.equal('5+12i')
    expect(engineering.IMDIV('a', 'i')).to.equal(error.value)
    expect(engineering.IMDIV('i', '0')).to.equal(error.num)
    expect(engineering.IMDIV('j', '1')).to.equal('j')
    expect(engineering.IMDIV('1', 'j')).to.equal('-1j')
  })

  it('IMEXP', () => {
    const im = engineering.IMEXP('1+i')
    expect(engineering.IMREAL(im)).to.approximately(1.4686939399158851, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(2.2873552871788423, 1e-9)
    expect(engineering.IMEXP('a')).to.equal(error.value)
  })

  it('IMLN', () => {
    const im = engineering.IMLN('3+4i')
    expect(engineering.IMREAL(im)).to.approximately(1.6094379124341003, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(0.9272952180016122, 1e-9)
    expect(engineering.IMLN('a')).to.equal(error.value)
  })

  it('IMLOG10', () => {
    const im = engineering.IMLOG10('3+4i')
    expect(engineering.IMREAL(im)).to.approximately(0.6989700043360187, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(0.4027191962733731, 1e-9)
    expect(engineering.IMLOG10('a')).to.equal(error.value)
  })

  it('IMLOG2', () => {
    const im = engineering.IMLOG2('3+4i')
    expect(engineering.IMREAL(im)).to.approximately(2.321928094887362, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(1.3378042124509761, 1e-9)
    expect(engineering.IMLOG2('a')).to.equal(error.value)
  })

  it('IMPOWER', () => {
    const im = engineering.IMPOWER('2+3i', 3)
    expect(engineering.IMREAL(im)).to.approximately(-45.99999999999999, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(9.000000000000007, 1e-9)
    expect(engineering.IMPOWER('2+3i', 'a')).to.equal(error.value)
    expect(engineering.IMPOWER('a', 1)).to.equal(error.value)
  })

  it('IMPRODUCT', () => {
    expect(engineering.IMPRODUCT('3+4i', '5-3i')).to.equal('27+11i')
    expect(engineering.IMPRODUCT('3+4i', 3)).to.equal('9+12i')
    expect(engineering.IMPRODUCT('1+2i', '30+0i')).to.equal('30+60i')
    expect(engineering.IMPRODUCT('a', '1')).to.equal(error.value)
    expect(engineering.IMPRODUCT()).to.equal(error.value)
  })

  it('IMREAL', () => {
    expect(engineering.IMREAL('6-9i')).to.equal(6)
    expect(engineering.IMREAL('i')).to.equal(0)
    expect(engineering.IMREAL('+i')).to.equal(0)
    expect(engineering.IMREAL('-j')).to.equal(0)
    expect(engineering.IMREAL('0-j')).to.equal(0)
    expect(engineering.IMREAL('4')).to.equal('4')
    expect(engineering.IMREAL(4)).to.equal('4')
    expect(engineering.IMREAL(0)).to.equal(0)
    expect(engineering.IMREAL('1+k')).to.equal(error.num)
    expect(engineering.IMREAL('+1+j')).to.equal(1)
    expect(engineering.IMREAL('-1+j')).to.equal(-1)
    expect(engineering.IMREAL('4j')).to.equal(0)
  })

  it('IMSEC', () => {
    const im = engineering.IMSEC('4+3i')
    expect(engineering.IMREAL(im)).to.approximately(-0.06529402785794704, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(-0.07522496030277322, 1e-9)
    expect(engineering.IMSEC(true)).to.equal(error.value)
    expect(engineering.IMSEC('a')).to.equal(error.value)
  })

  it('IMSECH', () => {
    const im = engineering.IMSECH('4+3i')
    expect(engineering.IMREAL(im)).to.approximately(-0.03625349691586887, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(-0.005164344607753179, 1e-9)
    expect(engineering.IMSECH(true)).to.equal(error.value)
    expect(engineering.IMSECH('a')).to.equal(error.value)
  })

  it('IMSIN', () => {
    const im = engineering.IMSIN('4+3i')
    expect(engineering.IMREAL(im)).to.approximately(-7.61923172032141, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(-6.5481200409110025, 1e-9)
    expect(engineering.IMSIN('a')).to.equal(error.value)
    expect(engineering.IMSIN(true)).to.equal(error.value)
  })

  it('IMSINH', () => {
    const im = engineering.IMSINH('4+3i')
    expect(engineering.IMREAL(im)).to.approximately(-27.016813258003932, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(3.853738037919377, 1e-9)
    expect(engineering.IMSINH('a')).to.equal(error.value)
    expect(engineering.IMSINH(true)).to.equal(error.value)
  })

  it('IMSQRT', () => {
    const im = engineering.IMSQRT('1+i')
    expect(engineering.IMREAL(im)).to.approximately(1.0986841134678098, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(0.45508986056222733, 1e-9)
    expect(engineering.IMSQRT('a')).to.equal(error.value)
  })

  it('IMSUB', () => {
    expect(engineering.IMSUB('13+4j', '5+3j')).to.equal('8+j')
    expect(engineering.IMSUB('13', '5+3j')).to.equal('8-3j')
    expect(engineering.IMSUB('a', '5+3i')).to.equal(error.value)
  })

  it('IMSUM', () => {
    expect(engineering.IMSUM('3+4i', '5-3i')).to.equal('8+i')
    expect(engineering.IMSUM('a', '5+3i')).to.equal(error.value)
    expect(engineering.IMSUM()).to.equal(error.value)
  })

  it('IMTAN', () => {
    const im = engineering.IMTAN('4+3i')
    expect(engineering.IMREAL(im)).to.approximately(0.004908258067495992, 1e-9)
    expect(engineering.IMAGINARY(im)).to.approximately(1.000709536067233, 1e-9)
    expect(engineering.IMTAN('a')).to.equal(error.value)
    expect(engineering.IMTAN(true)).to.equal(error.value)
  })

  it('OCT2BIN', () => {
    expect(engineering.OCT2BIN('3')).to.equal('11')
    expect(engineering.OCT2BIN('3', 3)).to.equal('011')
    expect(engineering.OCT2BIN('7777777000')).to.equal('1000000000')
    expect(engineering.OCT2BIN('a')).to.equal(error.num)
    expect(engineering.OCT2BIN('1000')).to.equal(error.num)
    expect(engineering.OCT2BIN('1', 'a')).to.equal(error.value)
    expect(engineering.OCT2BIN('1', -1)).to.equal(error.num)
  })

  it('OCT2DEC', () => {
    expect(engineering.OCT2DEC('54')).to.equal(44)
    expect(engineering.OCT2DEC('7777777533')).to.equal(-165)
    expect(engineering.OCT2DEC('a')).to.equal(error.num)
  })

  it('OCT2HEX', () => {
    expect(engineering.OCT2HEX('100')).to.equal('40')
    expect(engineering.OCT2HEX('100', 4)).to.equal('0040')
    expect(engineering.OCT2HEX('7777777533', 3)).to.equal('ffffffff5b')
    expect(engineering.OCT2HEX('a')).to.equal(error.num)
    expect(engineering.OCT2HEX('4000000000')).to.equal('ffe0000000')
    expect(engineering.OCT2HEX('1', 'a')).to.equal(error.value)
    expect(engineering.OCT2HEX('1', -1)).to.equal(error.num)
  })
})
