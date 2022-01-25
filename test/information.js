import 'should'

import * as error from '../src/utils/error.js'
import * as information from '../src/information.js'

describe('Information', () => {
  // TODO
  it('CELL', () => {
    information.CELL.should.throw('CELL is not implemented')
  })

  it('ERROR.TYPE', () => {
    information.ERROR.TYPE(error.nil).should.equal(1)
    information.ERROR.TYPE(error.div0).should.equal(2)
    information.ERROR.TYPE(error.value).should.equal(3)
    information.ERROR.TYPE(error.ref).should.equal(4)
    information.ERROR.TYPE(error.name).should.equal(5)
    information.ERROR.TYPE(error.num).should.equal(6)
    information.ERROR.TYPE(error.na).should.equal(7)
    information.ERROR.TYPE(error.data).should.equal(8)
    information.ERROR.TYPE(1).should.equal(error.na)
  })

  // TODO
  it('INFO', () => {
    information.INFO.should.throw('INFO is not implemented')
  })

  it('ISBINARY', () => {
    information.ISBINARY(1).should.equal(true)
    information.ISBINARY(0).should.equal(true)
    information.ISBINARY(1000).should.equal(true)
    information.ISBINARY('1').should.equal(true)
    information.ISBINARY('0').should.equal(true)
    information.ISBINARY('1000').should.equal(true)
    information.ISBINARY('invalid').should.equal(false)
  })

  it('ISBLANK', () => {
    information.ISBLANK(null).should.equal(true)
    information.ISBLANK(1).should.equal(false)
  })

  it('ISERR', () => {
    information.ISERR(1).should.equal(false)
    information.ISERR(error.na).should.equal(false)
    information.ISERR(error.value).should.equal(true)
    information.ISERR(NaN).should.equal(true)
    information.ISERR(1 / 0).should.equal(true)
  })

  it('ISERROR', () => {
    information.ISERROR(1).should.equal(false)
    information.ISERROR(error.na).should.equal(true)
    information.ISERROR(error.value).should.equal(true)
  })

  it('ISEVEN', () => {
    information.ISEVEN(-1).should.equal(false)
    information.ISEVEN(2.5).should.equal(true)
    information.ISEVEN(5).should.equal(false)
    information.ISEVEN(0).should.equal(true)
    information.ISEVEN(null).should.equal(true)
  })

  // TODO
  it('ISFORMULA', () => {
    information.ISFORMULA.should.throw('ISFORMULA is not implemented')
  })

  it('ISLOGICAL', () => {
    information.ISLOGICAL(true).should.equal(true)
    information.ISLOGICAL(false).should.equal(true)
    information.ISLOGICAL(1).should.equal(false)
    information.ISLOGICAL('true').should.equal(false)
    information.ISLOGICAL(null).should.equal(false)
  })

  it('ISNA', () => {
    information.ISNA(error.na).should.equal(true)
    information.ISNA(1).should.equal(false)
  })

  it('ISNONTEXT', () => {
    information.ISNONTEXT(1).should.equal(true)
    information.ISNONTEXT(true).should.equal(true)
    information.ISNONTEXT('a').should.equal(false)
  })

  it('ISNUMBER', () => {
    information.ISNUMBER(1).should.equal(true)
    information.ISNUMBER('1').should.equal(false)
    information.ISNUMBER(1 / 0).should.equal(false)
  })

  it('ISODD', () => {
    information.ISODD(-1).should.equal(true)
    information.ISODD(5).should.equal(true)
    information.ISODD(2.5).should.equal(false)
    information.ISODD(null).should.equal(false)
  })

  // TODO
  it('ISREF', () => {
    information.ISREF.should.throw('ISREF is not implemented')
  })

  it('ISTEXT', () => {
    information.ISTEXT('a').should.equal(true)
    information.ISTEXT(1).should.equal(false)
    information.ISTEXT(true).should.equal(false)
    information.ISTEXT().should.equal(false)
  })

  it('N', () => {
    information.N(1).should.equal(1)
    information.N(new Date(0)).should.equal(new Date(0).getTime())
    information.N(true).should.equal(1)
    information.N(false).should.equal(0)
    information.N(error.na).should.equal(error.na)
    information.N('a').should.equal(0)
  })

  it('NA', () => {
    information.NA().should.equal(error.na)
  })

  // TODO
  it('SHEET', () => {
    information.SHEET.should.throw('SHEET is not implemented')
  })

  // TODO
  it('SHEETS', () => {
    information.SHEETS.should.throw('SHEETS is not implemented')
  })

  it('TYPE', () => {
    information.TYPE(1).should.equal(1)
    information.TYPE('a').should.equal(2)
    information.TYPE(true).should.equal(4)
    information.TYPE(error.na).should.equal(16)
    information.TYPE([1]).should.equal(64)
  })
})
