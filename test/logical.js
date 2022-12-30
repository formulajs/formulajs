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
    expect(logical.AND(true, true)).to.equal(true)
    expect(logical.AND(true, false)).to.equal(false)
    expect(logical.AND(false, true)).to.equal(false)
    expect(logical.AND(42, true)).to.equal(true)
    expect(logical.AND(0, true)).to.equal(false)
  })

  it('FALSE', () => {
    expect(logical.FALSE()).to.equal(false)
  })

  it('IF', () => {
    expect(logical.IF(undefined, undefined, undefined)).to.equal(0)
    expect(logical.IF(undefined, 1, 2)).to.equal(2)
    expect(logical.IF(error.na, undefined)).to.equal(error.na)
    expect(logical.IF(true, error.na)).to.equal(error.na)

    expect(logical.IF(true, 1, 2)).to.equal(1)
    expect(logical.IF(false, 1, 2)).to.equal(2)
    expect(logical.IF(true)).to.equal(true)
    expect(logical.IF(false)).to.equal(false)
    expect(logical.IF(true, 1)).to.equal(1)
    expect(logical.IF(false, 1)).to.equal(false)
  })

  it('IFS', () => {
    expect(logical.IFS(true, 1)).to.equal(1)
    expect(logical.IFS(false, 1, true, 2)).to.equal(2)
    expect(logical.IFS(false, 1, false, 2)).to.equal(error.na)
    expect(logical.IFS(0, 1, true, 2)).to.equal(2)
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
