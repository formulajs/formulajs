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

    expect(information.ISBLANK('text')).to.equal(false)
    expect(information.ISBLANK(1)).to.equal(false)
    expect(information.ISBLANK('1')).to.equal(false)
    expect(information.ISBLANK('2022-03-11')).to.equal(false)
    expect(information.ISBLANK('08:45 AM')).to.equal(false)

    expect(information.ISBLANK('')).to.equal(false)
    expect(information.ISBLANK(' ')).to.equal(false)
    expect(information.ISBLANK('45%')).to.equal(false)

    Object.values(error).forEach((err) => {
      expect(information.ISBLANK(err)).to.equal(false)
    })

    expect(information.ISBLANK()).to.equal(error.na)
    expect(information.ISBLANK('', 3)).to.equal(error.na)
  })

  it('ISERR', () => {
    expect(information.ISERR(NaN)).to.equal(true)
    expect(information.ISERR(1 / 0)).to.equal(true)
    expect(information.ISERR(-1 / 0)).to.equal(true)

    expect(information.ISERR(1)).to.equal(false)
    expect(information.ISERR('text')).to.equal(false)
    expect(information.ISERR('')).to.equal(false)
    expect(information.ISERR(' ')).to.equal(false)
    expect(information.ISERR('1')).to.equal(false)
    expect(information.ISERR('1f')).to.equal(false)
    expect(information.ISERR('2021-03-01')).to.equal(false)
    expect(information.ISERR('08:45 AM')).to.equal(false)

    expect(information.ISERR()).to.equal(error.na)
    expect(information.ISERR(1, 'text')).to.equal(error.na)

    const errorsExceptNa = Object.values(error)
    const naIndex = errorsExceptNa.indexOf(error.na)

    errorsExceptNa.splice(naIndex, 1)

    errorsExceptNa.forEach((err) => {
      expect(information.ISERR(err)).to.equal(true)
    })

    expect(information.ISERR(error.na)).to.equal(false)

    expect(information.ISERR([1, error.calc, 3])).to.eql([false, true, false])
    expect(information.ISERR([[1], [2], [error.div0]])).to.eql([[false], [false], [true]])
    expect(
      information.ISERR([
        [error.na, error.div0],
        [2, 5],
        [3, 6]
      ])
    ).to.eql([
      [false, true],
      [false, false],
      [false, false]
    ])
  })

  it('ISERROR', () => {
    expect(information.ISERROR(NaN)).to.equal(true)
    expect(information.ISERROR(1 / 0)).to.equal(true)
    expect(information.ISERROR(-1 / 0)).to.equal(true)

    expect(information.ISERROR(1)).to.equal(false)
    expect(information.ISERROR('text')).to.equal(false)
    expect(information.ISERROR('')).to.equal(false)
    expect(information.ISERROR(' ')).to.equal(false)
    expect(information.ISERROR('1')).to.equal(false)
    expect(information.ISERROR('1f')).to.equal(false)
    expect(information.ISERROR('2021-03-01')).to.equal(false)
    expect(information.ISERROR('08:45 AM')).to.equal(false)

    expect(information.ISERROR()).to.equal(error.na)
    expect(information.ISERROR(1, 'text')).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(information.ISERROR(err)).to.equal(true)
    })

    expect(information.ISERROR([1, error.calc, 3])).to.eql([false, true, false])
    expect(information.ISERROR([[1], [2], [error.div0]])).to.eql([[false], [false], [true]])
    expect(
      information.ISERROR([
        [error.na, error.div0],
        [2, 5],
        [3, 6]
      ])
    ).to.eql([
      [true, true],
      [false, false],
      [false, false]
    ])
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

    expect(information.ISLOGICAL()).to.equal(error.na)
    expect(information.ISLOGICAL(true, false)).to.equal(error.na)

    expect(information.ISLOGICAL(1)).to.equal(false)
    expect(information.ISLOGICAL('')).to.equal(false)
    expect(information.ISLOGICAL(' ')).to.equal(false)
    expect(information.ISLOGICAL('true')).to.equal(false)
    expect(information.ISLOGICAL('false')).to.equal(false)
    expect(information.ISLOGICAL('2021-03-01')).to.equal(false)
    expect(information.ISLOGICAL('08:45 AM')).to.equal(false)
    expect(information.ISLOGICAL(null)).to.equal(false)

    Object.values(error).forEach((err) => {
      expect(information.ISLOGICAL(err)).to.equal(false)
    })

    expect(information.ISLOGICAL([false, 2, 3])).to.eql([true, false, false])
    expect(information.ISLOGICAL([[1], [2], [true]])).to.eql([[false], [false], [true]])
    expect(
      information.ISLOGICAL([
        [1, error.div0],
        [true, 5],
        [3, 6]
      ])
    ).to.eql([
      [false, false],
      [true, false],
      [false, false]
    ])
  })

  it('ISNA', () => {
    expect(information.ISNA(error.na)).to.equal(true)

    const errorsExceptNa = Object.values(error).filter((err) => err !== error.na)
    errorsExceptNa.forEach((err) => {
      expect(information.ISNA(err)).to.equal(false)
    })

    expect(information.ISNA(1)).to.equal(false)
    expect(information.ISNA(true)).to.equal(false)
    expect(information.ISNA(false)).to.equal(false)
    expect(information.ISNA('')).to.equal(false)
    expect(information.ISNA(' ')).to.equal(false)
    expect(information.ISNA('true')).to.equal(false)
    expect(information.ISNA('1-Mar-2021')).to.equal(false)
    expect(information.ISNA('8:45 AM')).to.equal(false)
    expect(information.ISNA(null)).to.equal(false)

    expect(information.ISNA()).to.equal(error.na)
    expect(information.ISNA(1, 2)).to.equal(error.na)

    expect(information.ISNA([1, error.calc, error.na])).to.eql([false, false, true])
    expect(information.ISNA([[error.na], [2], [error.data]])).to.eql([[true], [false], [false]])
    expect(
      information.ISNA([
        [1, error.na],
        [error.div0, 5],
        [3, 6]
      ])
    ).to.eql([
      [false, true],
      [false, false],
      [false, false]
    ])
  })

  it('ISNONTEXT', () => {
    expect(information.ISNONTEXT(0)).to.equal(true)
    expect(information.ISNONTEXT(1)).to.equal(true)
    expect(information.ISNONTEXT(-1)).to.equal(true)
    expect(information.ISNONTEXT(2.3)).to.equal(true)
    expect(information.ISNONTEXT(5.8)).to.equal(true)

    expect(information.ISNONTEXT(true)).to.equal(true)
    expect(information.ISNONTEXT(false)).to.equal(true)

    expect(information.ISNONTEXT('a')).to.equal(false)
    expect(information.ISNONTEXT('2')).to.equal(false)
    expect(information.ISNONTEXT('false')).to.equal(false)
    expect(information.ISNONTEXT('true')).to.equal(false)
    expect(information.ISNONTEXT('    2')).to.equal(false)
    expect(information.ISNONTEXT('2      ')).to.equal(false)
    expect(information.ISNONTEXT('    2   ')).to.equal(false)

    Object.values(error).forEach((err) => {
      expect(information.ISNONTEXT(err)).to.equal(true)
    })

    expect(information.ISNONTEXT()).to.equal(error.na)
    expect(information.ISNONTEXT(1, 2)).to.equal(error.na)

    expect(information.ISNONTEXT([1, 'test', '3'])).to.eql([true, false, false])
    expect(information.ISNONTEXT([['something'], [2], [3]])).to.eql([[false], [true], [true]])
    expect(
      information.ISNONTEXT([
        [1, 4],
        ['two', 5],
        [3, '6']
      ])
    ).to.eql([
      [true, true],
      [false, true],
      [true, false]
    ])
  })

  it('ISNUMBER', () => {
    expect(information.ISNUMBER(1)).to.equal(true)
    expect(information.ISNUMBER(0)).to.equal(true)
    expect(information.ISNUMBER(-1)).to.equal(true)
    expect(information.ISNUMBER(2.5)).to.equal(true)
    expect(information.ISNUMBER(3.4)).to.equal(true)

    expect(information.ISNUMBER(true)).to.equal(false)
    expect(information.ISNUMBER(false)).to.equal(false)

    expect(information.ISNUMBER('text')).to.equal(false)
    expect(information.ISNUMBER('')).to.equal(false)
    expect(information.ISNUMBER(' ')).to.equal(false)
    expect(information.ISNUMBER('1')).to.equal(false)
    expect(information.ISNUMBER('1f')).to.equal(false)

    expect(information.ISNUMBER(1 / 0)).to.equal(false)

    Object.values(error).forEach((err) => {
      expect(information.ISNUMBER(err)).to.equal(false)
    })

    expect(information.ISNUMBER()).to.equal(error.na)
    expect(information.ISNUMBER(1, 'text')).to.equal(error.na)

    expect(information.ISNUMBER('2021-03-01')).to.equal(false)
    expect(information.ISNUMBER('08:45 AM')).to.equal(false)

    expect(information.ISNUMBER([1, error.div0, 'teste'])).to.eql([true, false, false])
    expect(information.ISNUMBER([['1'], [2], [3]])).to.eql([[false], [true], [true]])
    expect(
      information.ISNUMBER([
        [1, 4],
        [2, 'test'],
        [3, 6]
      ])
    ).to.eql([
      [true, true],
      [true, false],
      [true, true]
    ])
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
    expect(information.TYPE(6.12)).to.equal(1)

    expect(information.TYPE('a')).to.equal(2)
    expect(information.TYPE('3')).to.equal(2)

    expect(information.TYPE(true)).to.equal(4)
    expect(information.TYPE(false)).to.equal(4)

    Object.values(error).forEach((err) => {
      expect(information.TYPE(err)).to.equal(16)
    })

    expect(information.TYPE([1])).to.equal(64)
    expect(information.TYPE([1, 'text', 3])).to.equal(64)
    expect(information.TYPE([[true], [2], [3]])).to.equal(64)

    expect(
      information.TYPE([
        [1, 4],
        [2, 5],
        [3, 6]
      ])
    ).to.equal(64)
  })
})
