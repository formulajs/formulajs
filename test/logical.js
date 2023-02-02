import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as logical from '../src/logical.js'

describe('Logical', () => {
  it('AND', () => {
    expect(logical.AND(undefined, undefined)).to.equal(error.value)
    expect(logical.AND('', undefined)).to.equal(error.value)
    expect(logical.AND('text', undefined)).to.equal(error.value)
    expect(logical.AND(undefined, true)).to.equal(true)
    expect(logical.AND(true, undefined)).to.equal(true)
    expect(logical.AND(undefined, false)).to.equal(false)
    expect(logical.AND(false, undefined)).to.equal(false)
    expect(logical.AND(error.na, true)).to.equal(error.na)

    expect(logical.AND(0)).to.equal(false)
    expect(logical.AND(4)).to.equal(true)
    expect(logical.AND(-5)).to.equal(true)

    expect(logical.AND(1.5)).to.equal(true)
    expect(logical.AND(0.1)).to.equal(true)

    expect(logical.AND(true)).to.equal(true)
    expect(logical.AND(false)).to.equal(false)

    expect(logical.AND('text')).to.equal(error.value)
    expect(logical.AND('')).to.equal(error.value)

    expect(logical.AND('true')).to.equal(error.value)
    expect(logical.AND('false')).to.equal(error.value)

    expect(logical.AND('0')).to.equal(error.value)
    expect(logical.AND('4')).to.equal(error.value)
    expect(logical.AND('-5')).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(logical.AND(err)).to.equal(err)
    })

    expect(logical.AND(null)).to.equal(error.value)

    expect(logical.AND(null, null)).to.equal(error.value)
    expect(logical.AND('', null)).to.equal(error.value)
    expect(logical.AND('text', null)).to.equal(error.value)
    expect(logical.AND(null, true)).to.equal(true)
    expect(logical.AND(true, null)).to.equal(true)
    expect(logical.AND(null, false)).to.equal(false)
    expect(logical.AND(false, null)).to.equal(false)

    expect(logical.AND(true, true)).to.equal(true)
    expect(logical.AND(false, false)).to.equal(false)
    expect(logical.AND(true, false)).to.equal(false)
    expect(logical.AND(false, true)).to.equal(false)

    expect(logical.AND(0, 0)).to.equal(false)
    expect(logical.AND(4, 4)).to.equal(true)
    expect(logical.AND(4, 0)).to.equal(false)
    expect(logical.AND(0, 4)).to.equal(false)

    expect(logical.AND(42, true)).to.equal(true)
    expect(logical.AND(0, true)).to.equal(false)

    expect(logical.AND('text', true)).to.equal(true)
    expect(logical.AND(true, 'text')).to.equal(true)
    expect(logical.AND('text', false)).to.equal(false)
    expect(logical.AND(false, 'text')).to.equal(false)

    expect(logical.AND(error.nil, error.value)).to.equal(error.nil)
    expect(logical.AND(error.value, error.nil)).to.equal(error.value)

    expect(logical.AND(error.div0, true)).to.equal(error.div0)
    expect(logical.AND(true, error.data)).to.equal(error.data)
    expect(logical.AND(error.name, false)).to.equal(error.name)
    expect(logical.AND(false, error.nil)).to.equal(error.nil)

    expect(logical.AND('text', error.num)).to.equal(error.num)
    expect(logical.AND(error.calc, 'text')).to.equal(error.calc)

    expect(logical.AND('', '', '')).to.equal(error.value)
    expect(logical.AND(true, 1, true)).to.equal(true)
    expect(logical.AND(4, true, 0)).to.equal(false)

    expect(logical.AND()).to.equal(error.na)

    expect(logical.AND([1, true, 'text'])).to.equal(true)
    expect(logical.AND(['text', true, 0])).to.equal(false)
    expect(logical.AND([true, 'text', error.div0])).to.equal(error.div0)
    expect(logical.AND([true, error.nil, error.div0])).to.equal(error.nil)

    expect(logical.AND([[1], [true], ['text']])).to.equal(true)
    expect(logical.AND([['text'], [true], [0]])).to.equal(false)
    expect(logical.AND([[true], ['text'], [error.div0]])).to.equal(error.div0)
    expect(logical.AND([[error.data], ['text'], [error.div0]])).to.equal(error.data)

    expect(
      logical.AND([
        [1, 'something'],
        [true, 4],
        [6, 'text']
      ])
    ).to.equal(true)
    expect(
      logical.AND([
        ['text', 1],
        [true, false],
        [0, true]
      ])
    ).to.equal(false)
    expect(
      logical.AND([
        [true, false],
        [1, 'text'],
        [error.div0, 4]
      ])
    ).to.equal(error.div0)
    expect(
      logical.AND([
        [true, error.value],
        [error.div0, error.data],
        [0, 4]
      ])
    ).to.equal(error.value)
    expect(
      logical.AND([
        [true, false],
        [error.div0, error.data],
        [0, 4]
      ])
    ).to.equal(error.div0)
  })

  it('FALSE', () => {
    expect(logical.FALSE()).to.equal(false)

    expect(logical.FALSE(1)).to.equal(error.na)
  })

  it('IF', () => {
    expect(logical.IF(undefined, undefined, undefined)).to.equal(0)
    expect(logical.IF(undefined, 1, 2)).to.equal(2)
    expect(logical.IF(error.na, undefined)).to.equal(error.na)

    expect(logical.IF(true, error.na)).to.equal(error.na)

    expect(logical.IF(null, 1, 2)).to.equal(2)
    expect(logical.IF(true, null, 2)).to.equal(0)
    expect(logical.IF(false, 1, null)).to.equal(0)

    expect(logical.IF(1, 1, 2)).to.equal(1)
    expect(logical.IF(0, 1, 2)).to.equal(2)
    expect(logical.IF(-4, 1, 2)).to.equal(1)
    expect(logical.IF(0.4, 1, 2)).to.equal(1)

    expect(logical.IF(true, 1, 2)).to.equal(1)
    expect(logical.IF(false, 1, 2)).to.equal(2)
    expect(logical.IF(true, 1)).to.equal(1)
    expect(logical.IF(false, 1)).to.equal(false)

    expect(logical.IF('true', 1, 2)).to.equal(1)
    expect(logical.IF('false', 1, 2)).to.equal(2)

    expect(logical.IF('  true', 1, 2)).to.equal(error.value)
    expect(logical.IF('text', 1, 2)).to.equal(error.value)
    expect(logical.IF('', 1, 2)).to.equal(error.value)
    expect(logical.IF('   ', 1, 2)).to.equal(error.value)
    expect(logical.IF('1', 1, 2)).to.equal(error.value)
    expect(logical.IF('1900-02-01', 1, 2)).to.equal(error.value)
    expect(logical.IF('08:45 AM', 1, 2)).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(logical.IF(err, 1, 2)).to.equal(err)
    })

    expect(logical.IF()).to.equal(error.na)
    expect(logical.IF(true)).to.equal(error.na)
    expect(logical.IF(true, 1, 2, 3)).to.equal(error.na)
  })

  it('IFS', () => {
    expect(logical.IFS(true, 1, true, 2)).to.equal(1)
    expect(logical.IFS(false, 1, true, 2)).to.equal(2)
    expect(logical.IFS(false, 1, false, 2)).to.equal(error.na)

    expect(logical.IFS(0, 1, true, 2)).to.equal(2)
    expect(logical.IFS(5, 1, true, 2)).to.equal(1)
    expect(logical.IFS(-6, 1, true, 2)).to.equal(1)

    expect(logical.IFS(true, null)).to.equal(0)
    expect(logical.IFS(null, 2)).to.equal(error.na)

    expect(logical.IFS('true', 1, true, 2)).to.equal(1)
    expect(logical.IFS('false', 1, true, 2)).to.equal(2)

    expect(logical.IFS('   true', 1, true, 2)).to.equal(error.value)
    expect(logical.IFS('1', 1, true, 2)).to.equal(error.value)
    expect(logical.IFS('text', 1, true, 2)).to.equal(error.value)
    expect(logical.IFS('08:45 AM', 1, true, 2)).to.equal(error.value)
    expect(logical.IFS('1900-01-01', 1, true, 2)).to.equal(error.value)

    expect(logical.IFS()).to.equal(error.na)
    expect(logical.IFS(true)).to.equal(error.na)
    expect(logical.IFS(true, 1, true)).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(logical.IFS(err, 1, true, 2)).to.equal(err)
    })
  })

  it('IFERROR', () => {
    expect(logical.IFERROR(1, 2)).to.equal(1)
    expect(logical.IFERROR(error.value, 2)).to.equal(2)
  })

  it('IFNA', () => {
    expect(logical.IFNA(1, 2)).to.equal(1)
    expect(logical.IFNA(error.na, 2)).to.equal(2)
  })

  it('NOT', () => {
    expect(logical.NOT(true)).to.equal(false)
    expect(logical.NOT(false)).to.equal(true)
    expect(logical.NOT('text')).to.equal(error.value)
    expect(logical.NOT(error.na)).to.equal(error.na)
  })

  it('OR', () => {
    expect(logical.OR(undefined, undefined)).to.equal(error.value)
    expect(logical.OR('', undefined)).to.equal(error.value)
    expect(logical.OR('text', undefined)).to.equal(error.value)
    expect(logical.OR(undefined, false)).to.equal(false)
    expect(logical.OR(false, undefined)).to.equal(false)
    expect(logical.OR(undefined, true)).to.equal(true)
    expect(logical.OR(true, undefined)).to.equal(true)
    expect(logical.OR(error.na, false)).to.equal(error.na)
    expect(logical.OR(true)).to.equal(true)
    expect(logical.OR(false)).to.equal(false)
    expect(logical.OR(true, false)).to.equal(true)
    expect(logical.OR(1)).to.equal(true)
    expect(logical.OR(0, false)).to.equal(false)
  })

  it('TRUE', () => {
    expect(logical.TRUE()).to.equal(true)
  })

  it('XOR', () => {
    expect(logical.XOR(undefined, undefined)).to.equal(error.value)
    expect(logical.XOR('', undefined)).to.equal(error.value)
    expect(logical.XOR('text', undefined)).to.equal(error.value)
    expect(logical.XOR(undefined, false)).to.equal(false)
    expect(logical.XOR(false, undefined)).to.equal(false)
    expect(logical.XOR(undefined, true)).to.equal(true)
    expect(logical.XOR(true, undefined)).to.equal(true)
    expect(logical.XOR(error.na, false)).to.equal(error.na)
    expect(logical.XOR(true)).to.equal(true)
    expect(logical.XOR(false)).to.equal(false)
    expect(logical.XOR(false, false)).to.equal(false)
    expect(logical.XOR(false, true)).to.equal(true)
    expect(logical.XOR(true, false)).to.equal(true)
    expect(logical.XOR(true, true)).to.equal(false)
    expect(logical.XOR(1)).to.equal(true)
    expect(logical.XOR(0, false)).to.equal(false)
    expect(logical.XOR(2, false)).to.equal(true)
  })

  it('SWITCH', () => {
    expect(logical.SWITCH()).to.equal(error.value)
    expect(logical.SWITCH(7)).to.equal(error.na)
    expect(logical.SWITCH(7, 'Default Expression')).to.equal('Default Expression')
    expect(logical.SWITCH(7, 9, 'Nine', 7, 'Seven')).to.equal('Seven')
    expect(logical.SWITCH(8, 9, 'Nine', 7, 'Seven', 'Eight')).to.equal('Eight')
    expect(logical.SWITCH(10, 9, 'Nine', 7, 'Seven', 8, 'Eight')).to.equal(error.na)
    expect(logical.SWITCH(7, 9, 'Nine')).to.equal(error.na)
  })
})
