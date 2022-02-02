import 'should'

import * as error from '../src/utils/error.js'
import * as logical from '../src/logical.js'

describe('Logical', () => {
  it('AND', () => {
    logical.AND(undefined, undefined).should.equal(error.value)
    logical.AND('', undefined).should.equal(error.value)
    logical.AND('text', undefined).should.equal(error.value)
    logical.AND(undefined, true).should.equal(true)
    logical.AND(true, undefined).should.equal(true)
    logical.AND(undefined, false).should.equal(false)
    logical.AND(false, undefined).should.equal(false)
    logical.AND(error.na, true).should.equal(error.na)
    logical.AND(true, true).should.equal(true)
    logical.AND(true, false).should.equal(false)
    logical.AND(false, true).should.equal(false)
    logical.AND(42, true).should.equal(true)
    logical.AND(0, true).should.equal(false)
  })

  it('CHOOSE', () => {
    logical.CHOOSE().should.equal(error.na)
    logical.CHOOSE(1).should.equal(error.na)
    logical.CHOOSE(1, 'jima').should.equal('jima')
    logical.CHOOSE(3, 'jima', 'jimb', 'jimc').should.equal('jimc')
    logical.CHOOSE(2, 'jima').should.equal(error.value)
    logical.CHOOSE(255, 'jima').should.equal(error.value)
  })

  it('FALSE', () => {
    logical.FALSE().should.equal(false)
  })

  it('IF', () => {
    logical.IF(undefined, undefined, undefined).should.equal(0)
    logical.IF(undefined, 1, 2).should.equal(2)
    logical.IF(error.na, undefined).should.equal(error.na)
    logical.IF(true, error.na).should.equal(error.na)

    logical.IF(true, 1, 2).should.equal(1)
    logical.IF(false, 1, 2).should.equal(2)
    logical.IF(true).should.equal(true)
    logical.IF(false).should.equal(false)
    logical.IF(true, 1).should.equal(1)
    logical.IF(false, 1).should.equal(false)
  })

  it('IFS', () => {
    logical.IFS(true, 1).should.equal(1)
    logical.IFS(false, 1, true, 2).should.equal(2)
    logical.IFS(false, 1, false, 2).should.equal(error.na)
    logical.IFS(0, 1, true, 2).should.equal(2)
  })

  it('IFERROR', () => {
    logical.IFERROR(1, 2).should.equal(1)
    logical.IFERROR(error.value, 2).should.equal(2)
  })

  it('IFNA', () => {
    logical.IFNA(1, 2).should.equal(1)
    logical.IFNA(error.na, 2).should.equal(2)
  })

  it('NOT', () => {
    logical.NOT(true).should.equal(false)
    logical.NOT(false).should.equal(true)
    logical.NOT('text').should.equal(error.value)
    logical.NOT(error.na).should.equal(error.na)
  })

  it('OR', () => {
    logical.OR(undefined, undefined).should.equal(error.value)
    logical.OR('', undefined).should.equal(error.value)
    logical.OR('text', undefined).should.equal(error.value)
    logical.OR(undefined, false).should.equal(false)
    logical.OR(false, undefined).should.equal(false)
    logical.OR(undefined, true).should.equal(true)
    logical.OR(true, undefined).should.equal(true)
    logical.OR(error.na, false).should.equal(error.na)
    logical.OR(true).should.equal(true)
    logical.OR(false).should.equal(false)
    logical.OR(true, false).should.equal(true)
    logical.OR(1).should.equal(true)
    logical.OR(0, false).should.equal(false)
  })

  it('TRUE', () => {
    logical.TRUE().should.equal(true)
  })

  it('XOR', () => {
    logical.XOR(undefined, undefined).should.equal(error.value)
    logical.XOR('', undefined).should.equal(error.value)
    logical.XOR('text', undefined).should.equal(error.value)
    logical.XOR(undefined, false).should.equal(false)
    logical.XOR(false, undefined).should.equal(false)
    logical.XOR(undefined, true).should.equal(true)
    logical.XOR(true, undefined).should.equal(true)
    logical.XOR(error.na, false).should.equal(error.na)
    logical.XOR(true).should.equal(true)
    logical.XOR(false).should.equal(false)
    logical.XOR(false, false).should.equal(false)
    logical.XOR(false, true).should.equal(true)
    logical.XOR(true, false).should.equal(true)
    logical.XOR(true, true).should.equal(false)
    logical.XOR(1).should.equal(true)
    logical.XOR(0, false).should.equal(false)
    logical.XOR(2, false).should.equal(true)
  })

  it('SWITCH', () => {
    logical.SWITCH().should.equal(error.value)
    logical.SWITCH(7).should.equal(error.na)
    logical.SWITCH(7, 'Default Expression').should.equal('Default Expression')
    logical.SWITCH(7, 9, 'Nine', 7, 'Seven').should.equal('Seven')
    logical.SWITCH(8, 9, 'Nine', 7, 'Seven', 'Eight').should.equal('Eight')
    logical.SWITCH(10, 9, 'Nine', 7, 'Seven', 8, 'Eight').should.equal(error.na)
    logical.SWITCH(7, 9, 'Nine').should.equal(error.na)
  })
})
