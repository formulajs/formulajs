import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as information from '../src/information.js'

describe('Information', () => {
  // TODO
  it('CELL', () => {
    expect(information.CELL).to.throw('CELL is not implemented')
  })

  it('ERROR.TYPE', () => {
    expect(information.ERROR.TYPE(error.nil)).to.equal(1)
    expect(information.ERROR.TYPE(error.div0)).to.equal(2)
    expect(information.ERROR.TYPE(error.value)).to.equal(3)
    expect(information.ERROR.TYPE(error.ref)).to.equal(4)
    expect(information.ERROR.TYPE(error.name)).to.equal(5)
    expect(information.ERROR.TYPE(error.num)).to.equal(6)
    expect(information.ERROR.TYPE(error.na)).to.equal(7)
    expect(information.ERROR.TYPE(error.data)).to.equal(8)
    expect(information.ERROR.TYPE(1)).to.equal(error.na)
  })

  // TODO
  it('INFO', () => {
    expect(information.INFO).to.throw('INFO is not implemented')
  })

  it('ISBLANK', () => {
    expect(information.ISBLANK(null)).to.equal(true)
    expect(information.ISBLANK(1)).to.equal(false)
  })

  it('ISERR', () => {
    expect(information.ISERR(1)).to.equal(false)
    expect(information.ISERR(error.na)).to.equal(false)
    expect(information.ISERR(error.value)).to.equal(true)
    expect(information.ISERR(NaN)).to.equal(true)
    expect(information.ISERR(1 / 0)).to.equal(true)
  })

  it('ISERROR', () => {
    expect(information.ISERROR(1)).to.equal(false)
    expect(information.ISERROR(error.na)).to.equal(true)
    expect(information.ISERROR(error.value)).to.equal(true)
  })

  it('ISEVEN', () => {
    expect(information.ISEVEN(-1)).to.equal(false)
    expect(information.ISEVEN(2.5)).to.equal(true)
    expect(information.ISEVEN(5)).to.equal(false)
    expect(information.ISEVEN(0)).to.equal(true)
    expect(information.ISEVEN(null)).to.equal(true)
  })

  // TODO
  it('ISFORMULA', () => {
    expect(information.ISFORMULA).to.throw('ISFORMULA is not implemented')
  })

  it('ISLOGICAL', () => {
    expect(information.ISLOGICAL(true)).to.equal(true)
    expect(information.ISLOGICAL(false)).to.equal(true)
    expect(information.ISLOGICAL(1)).to.equal(false)
    expect(information.ISLOGICAL('true')).to.equal(false)
    expect(information.ISLOGICAL(null)).to.equal(false)
  })

  it('ISNA', () => {
    expect(information.ISNA(error.na)).to.equal(true)
    expect(information.ISNA(1)).to.equal(false)
  })

  it('ISNONTEXT', () => {
    expect(information.ISNONTEXT(1)).to.equal(true)
    expect(information.ISNONTEXT(true)).to.equal(true)
    expect(information.ISNONTEXT('a')).to.equal(false)
  })

  it('ISNUMBER', () => {
    expect(information.ISNUMBER(1)).to.equal(true)
    expect(information.ISNUMBER('1')).to.equal(false)
    expect(information.ISNUMBER(1 / 0)).to.equal(false)
  })

  it('ISODD', () => {
    expect(information.ISODD(-1)).to.equal(true)
    expect(information.ISODD(5)).to.equal(true)
    expect(information.ISODD(2.5)).to.equal(false)
    expect(information.ISODD(null)).to.equal(false)
  })

  // TODO
  it('ISREF', () => {
    expect(information.ISREF).to.throw('ISREF is not implemented')
  })

  it('ISTEXT', () => {
    expect(information.ISTEXT('a')).to.equal(true)
    expect(information.ISTEXT(1)).to.equal(false)
    expect(information.ISTEXT(true)).to.equal(false)
    expect(information.ISTEXT()).to.equal(false)
  })

  it('N', () => {
    expect(information.N(1)).to.equal(1)
    expect(information.N(new Date(0))).to.equal(new Date(0).getTime())
    expect(information.N(true)).to.equal(1)
    expect(information.N(false)).to.equal(0)
    expect(information.N(error.na)).to.equal(error.na)
    expect(information.N('a')).to.equal(0)
  })

  it('NA', () => {
    expect(information.NA()).to.equal(error.na)
  })

  // TODO
  it('SHEET', () => {
    expect(information.SHEET).to.throw('SHEET is not implemented')
  })

  // TODO
  it('SHEETS', () => {
    expect(information.SHEETS).to.throw('SHEETS is not implemented')
  })

  it('TYPE', () => {
    expect(information.TYPE(1)).to.equal(1)
    expect(information.TYPE('a')).to.equal(2)
    expect(information.TYPE(true)).to.equal(4)
    expect(information.TYPE(error.na)).to.equal(16)
    expect(information.TYPE([1])).to.equal(64)
  })
})
