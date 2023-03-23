import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as financial from '../src/financial.js'

describe('Financial', () => {
  it('ACCRINT', () => {
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 0, true)).to.approximately(
      183.88888888888889,
      1e-9,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 0, true)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 0, true)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 0, true)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 1, true)).to.approximately(
      183.58413132694938,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 1, true)).to.approximately(
      183.58413132694938,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 1, true)).to.approximately(
      183.58413132694938,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 2, true)).to.approximately(
      186.38888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 2, true)).to.approximately(
      186.38888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 2, true)).to.approximately(
      186.38888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 3, true)).to.approximately(
      183.83561643835617,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 3, true)).to.approximately(
      183.83561643835617,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 3, true)).to.approximately(
      183.83561643835617,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 4, true)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 4, true)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 4, true)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 0, false)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 0, false)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 0, false)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 1, false)).to.approximately(
      183.58413132694938,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 1, false)).to.approximately(
      183.58413132694938,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 1, false)).to.approximately(
      183.58413132694938,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 2, false)).to.approximately(
      186.38888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 2, false)).to.approximately(
      186.38888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 2, false)).to.approximately(
      186.38888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 3, false)).to.approximately(
      183.83561643835617,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 3, false)).to.approximately(
      183.83561643835617,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 3, false)).to.approximately(
      183.83561643835617,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 1, 4, false)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 4, false)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 4, 4, false)).to.approximately(
      183.88888888888889,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 0, true)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 0, true)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 0, true)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 1, true)).to.approximately(
      15.573770491803279,
      1e-9
    ) // TODO :1e-9);
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 1, true)).to.approximately(
      15.573770491803279,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 1, true)).to.approximately(
      15.573770491803279,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 2, true)).to.approximately(
      15.833333333333332,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 2, true)).to.approximately(
      15.833333333333332,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 2, true)).to.approximately(
      15.833333333333332,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 3, true)).to.approximately(
      15.616438356164384,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 3, true)).to.approximately(
      15.616438356164384,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 3, true)).to.approximately(
      15.616438356164384,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 4, true)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 4, true)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 4, true)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 0, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 0, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 0, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 1, false)).to.approximately(
      15.573770491803279,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 1, false)).to.approximately(
      15.573770491803279,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 1, false)).to.approximately(
      15.573770491803279,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 2, false)).to.approximately(
      15.833333333333332,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 2, false)).to.approximately(
      15.833333333333332,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 2, false)).to.approximately(
      15.833333333333332,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 3, false)).to.approximately(
      15.616438356164384,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 3, false)).to.approximately(
      15.616438356164384,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 3, false)).to.approximately(
      15.616438356164384,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 1, 4, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 2, 4, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, 4, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', '0.1', 1000, 4, 4, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, '1000', 4, 4, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, '4', 4, false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '3/30/2012', 0.1, 1000, 4, '4', false)).to.approximately(
      16.11111111111111,
      1e-9
    )
    expect(financial.ACCRINT(40001, '3/30/2012', '12/4/2013', 0.1, 1000, 1, 0, true)).to.approximately(
      440.8333333333333,
      1e-9,
      1e-9
    )
    expect(financial.ACCRINT('2/2/2012', '12/4/2013', '2/1/2012', 0.1, 1000, 4, 4, false)).to.equal(error.num)
    expect(financial.ACCRINT('Hello World!', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 0)).to.equal(error.value)
    expect(financial.ACCRINT('2/2/2012', 'Hello World!', '12/4/2013', 0.1, 1000, 2, 0)).to.equal(error.value)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', 'Hello World!', 0.1, 1000, 2, 0)).to.equal(error.value)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0, 1000, 2, 0)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', -0.1, 1000, 2, 0)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 0, 2, 0)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, -1000, 2, 0)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 3, 0)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 5)).to.equal(error.num)
    expect(financial.ACCRINT([['2/2/2012'], ['2/2/2012']], '3/30/2012', '12/4/2013', 0.1, 1000, 2, 5)).to.equal(
      error.value
    )
    expect(financial.ACCRINT('2/2/2012', [['3/30/2012'], ['3/30/2012']], '12/4/2013', 0.1, 1000, 2, 5)).to.equal(
      error.value
    )
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', [['12/4/2013'], ['12/4/2013']], 0.1, 1000, 2, 5)).to.equal(
      error.value
    )
    expect(financial.ACCRINT(undefined, '3/30/2012', '12/4/2013', 0.1, 1000, 2, 5)).to.equal(error.value)
    expect(financial.ACCRINT('2/2/2012', undefined, '12/4/2013', 0.1, 1000, 2, 5)).to.equal(error.value)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', undefined, 0.1, 1000, 2, 5)).to.equal(error.value)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', undefined, 1000, 2, 5)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, undefined, 2, 5)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, undefined, 5)).to.equal(error.num)
    expect(financial.ACCRINT(null, '3/30/2012', '12/4/2013', 0.1, 1000, 2, 5)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', null, '12/4/2013', 0.1, 1000, 2, 5)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', null, 0.1, 1000, 2, 5)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', null, 1000, 2, 5)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, null, 2, 5)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, null, 5)).to.equal(error.num)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, 2, 5, true, 4)).to.equal(error.na)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000)).to.equal(error.na)
    expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013')).to.equal(error.na)
    expect(financial.ACCRINT()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.ACCRINT(err, '3/30/2012', '12/4/2013', 0.1, 1000, 2, 5)).to.equal(err)
      expect(financial.ACCRINT('2/2/2012', err, '12/4/2013', 0.1, 1000, 2, 5)).to.equal(err)
      expect(financial.ACCRINT('2/2/2012', '3/30/2012', err, 0.1, 1000, 2, 5)).to.equal(err)
      expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', err, 1000, 2, 5)).to.equal(err)
      expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, err, 2, 5)).to.equal(err)
      expect(financial.ACCRINT('2/2/2012', '3/30/2012', '12/4/2013', 0.1, 1000, err, 5)).to.equal(err)
    })
  })

  // TODO: implement
  it('ACCRINTM', () => {
    expect(financial.ACCRINTM).to.throw('ACCRINTM is not implemented')
  })

  // TODO: implement
  it('AMORDEGRC', () => {
    expect(financial.AMORDEGRC).to.throw('AMORDEGRC is not implemented')
  })

  // TODO: implement
  it('AMORLINC', () => {
    expect(financial.AMORLINC).to.throw('AMORLINC is not implemented')
  })

  // TODO: implement
  it('COUPDAYBS', () => {
    expect(financial.COUPDAYBS).to.throw('COUPDAYBS is not implemented')
  })

  // TODO: implement
  it('COUPDAYS', () => {
    expect(financial.COUPDAYS).to.throw('COUPDAYS is not implemented')
  })

  // TODO: implement
  it('COUPDAYSNC', () => {
    expect(financial.COUPDAYSNC).to.throw('COUPDAYSNC is not implemented')
  })

  // TODO: implement
  it('COUPNCD', () => {
    expect(financial.COUPNCD).to.throw('COUPNCD is not implemented')
  })

  // TODO: implement
  it('COUPNUM', () => {
    expect(financial.COUPNUM).to.throw('COUPNUM is not implemented')
  })

  // TODO: implement
  it('COUPPCD', () => {
    expect(financial.COUPPCD).to.throw('COUPPCD is not implemented')
  })

  it('CUMIPMT', () => {
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, 24, 0)).to.approximately(-9916.77251395708, 1e-9)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, 24, 1)).to.approximately(-9834.815716321069, 1e-9)
    expect(financial.CUMIPMT('0.01', 30 * 12, 100000, 13, 24, 1)).to.approximately(-11816, 2867, 1e-9)
    expect(financial.CUMIPMT(0.01, '360', 100000, 13, 24, 1)).to.approximately(-11816, 2867, 1e-9)
    expect(financial.CUMIPMT(0.01, 360, '100000', 13, 24, 1)).to.approximately(-11816, 2867, 1e-9)
    expect(financial.CUMIPMT(0.01, 360, 100000, '13', 24, 1)).to.approximately(-11816, 2867, 1e-9)
    expect(financial.CUMIPMT(0.01, 360, 100000, 13, '24', 1)).to.approximately(-11816, 2867, 1e-9)
    expect(financial.CUMIPMT(0.01, 360, 100000, 13, 24, '1')).to.approximately(-11816, 2867, 1e-9)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, 24, 1, 100)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, 24)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12)).to.equal(error.na)
    expect(financial.CUMIPMT()).to.equal(error.na)
    expect(financial.CUMIPMT(undefined, 30 * 12, 100000, 13, 24, 1)).to.equal(error.na)
    expect(financial.CUMIPMT(null, 30 * 12, 100000, 13, 24, 1)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, undefined, 100000, 13, 24, 1)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, null, 100000, 13, 24, 1)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, undefined, 13, 24, 1)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, null, 13, 24, 1)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, null, 24, 1)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, undefined, 24, 1)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, null, 1)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, undefined, 1)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, 24, undefined)).to.equal(error.na)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, 24, null)).to.equal(error.num)
    expect(financial.CUMIPMT(-0.1 / 12, 30 * 12, 100000, 13, 24, 0)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, -30 * 12, 100000, 13, 24, 0)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, -100000, 13, 24, 0)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 0, 24, 0)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, 0, 0)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 24, 13, 0)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 13, 24, 2)).to.equal(error.num)
    expect(financial.CUMIPMT(0.1 / 12, 30 * 12, 100000, 1, 24, 0)).to.approximately(-19891.752778759568, 1e-9)
    expect(financial.CUMIPMT('invalid', 30 * 12, 100000, 13, 24, 0)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, 30 * 12, 'invalid', 13, 24, 0)).to.equal(error.value)
    expect(financial.CUMIPMT([[0.1], [0.2]], 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, [[400], [500]], 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, 30 * 12, [[1000], [100000]], 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, 30 * 12, 100000, [[14], [12]], 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, 30 * 12, 100000, 13, [[34], [44]], 1)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, 30 * 12, 100000, 13, 24, [[1], [1]])).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, 30 * 12, 100000, 13, true, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, 30 * 12, 100000, true, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, 30 * 12, true, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(0.1, true, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(true, 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT(false, 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT('true', 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMIPMT('false', 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    // eslint-disable-next-line no-loss-of-precision
    expect(financial.CUMIPMT(0.005333, 120, 737.17, 1, 120, 0)).to.approximately(-262.766924283291, 1e-9)
    // eslint-disable-next-line no-loss-of-precision
    expect(financial.CUMIPMT(0.005333, 120, 737.17, 1, 120, 1)).to.approximately(-257.462548900007, 1e-9)

    Object.values(error).forEach((err) => {
      expect(financial.CUMIPMT(err, 30 * 12, 100000, 13, 24, 0)).to.equal(err)
      expect(financial.CUMIPMT(0.1, err, 100000, 13, 24, 0)).to.equal(err)
      expect(financial.CUMIPMT(0.1, 30 * 12, err, 13, 24, 0)).to.equal(err)
      expect(financial.CUMIPMT(0.1, 30 * 12, 100000, err, 24, 0)).to.equal(err)
      expect(financial.CUMIPMT(0.1, 30 * 12, 100000, 13, err, 0)).to.equal(err)
      expect(financial.CUMIPMT(0.1, 30 * 12, 100000, 13, 24, err)).to.equal(err)
    })
  })

  it('CUMPRINC', () => {
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, 24, 0)).to.approximately(-614.0863271085149, 1e-9)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, 24, 1)).to.approximately(-609.0112334960476, 1e-9)
    expect(financial.CUMPRINC(-0.1 / 12, 30 * 12, 100000, 13, 24, 0)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, -30 * 12, 100000, 13, 24, 0)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, -100000, 13, 24, 0)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 0, 24, 0)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, 0, 0)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 24, 13, 0)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, 24, 2)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 1, 24, 0)).to.approximately(-1169.9649033716187, 1e-9)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 1, 24, 1)).to.approximately(-1986.7420529305305, 1e-9)
    expect(financial.CUMPRINC('invalid', 30 * 12, 100000, 1, 24, 1)).to.equal(error.value)

    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, 24, 1, 100)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, 24)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12)).to.equal(error.na)
    expect(financial.CUMPRINC()).to.equal(error.na)
    expect(financial.CUMPRINC(undefined, 30 * 12, 100000, 13, 24, 1)).to.equal(error.na)
    expect(financial.CUMPRINC(null, 30 * 12, 100000, 13, 24, 1)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, undefined, 100000, 13, 24, 1)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, null, 100000, 13, 24, 1)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, undefined, 13, 24, 1)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, null, 13, 24, 1)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, null, 24, 1)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, undefined, 24, 1)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, null, 1)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, undefined, 1)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, 24, undefined)).to.equal(error.na)
    expect(financial.CUMPRINC(0.1 / 12, 30 * 12, 100000, 13, 24, null)).to.equal(error.num)
    expect(financial.CUMPRINC(0.1, 30 * 12, 'invalid', 13, 24, 0)).to.equal(error.value)
    expect(financial.CUMPRINC([[0.1], [0.2]], 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, [[400], [500]], 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, 30 * 12, [[1000], [100000]], 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, 30 * 12, 100000, [[14], [12]], 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, 30 * 12, 100000, 13, [[34], [44]], 1)).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, 30 * 12, 100000, 13, 24, [[1], [1]])).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, 30 * 12, 100000, 13, true, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, 30 * 12, 100000, true, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, 30 * 12, true, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(0.1, true, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(true, 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC(false, 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC('true', 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)
    expect(financial.CUMPRINC('false', 30 * 12, 100000, 13, 24, 1)).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.CUMPRINC(err, 30 * 12, 100000, 13, 24, 0)).to.equal(err)
      expect(financial.CUMPRINC(0.1, err, 100000, 13, 24, 0)).to.equal(err)
      expect(financial.CUMPRINC(0.1, 30 * 12, err, 13, 24, 0)).to.equal(err)
      expect(financial.CUMPRINC(0.1, 30 * 12, 100000, err, 24, 0)).to.equal(err)
      expect(financial.CUMPRINC(0.1, 30 * 12, 100000, 13, err, 0)).to.equal(err)
      expect(financial.CUMPRINC(0.1, 30 * 12, 100000, 13, 24, err)).to.equal(err)
    })
  })

  it('DB', () => {
    expect(financial.DB(1000000, 100000, 6, 1)).to.equal(319000)
    expect(financial.DB('1000000', '100000', '6', '1')).to.equal(319000)
    expect(financial.DB(1000000, 100000, 6, 2)).to.equal(217239)
    expect(financial.DB(1000000, 100000, 6, 3)).to.approximately(147939.759, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 4)).to.approximately(100746.97587900002, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 5)).to.approximately(68608.690573599, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 6)).to.approximately(46722.518280620934, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 1, 6)).to.equal(159500)
    expect(financial.DB(1000000, 100000, 6, 2, 6)).to.approximately(268119.5, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 3, 6)).to.approximately(182589.3795, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 4, 6)).to.approximately(124343.36743949998, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 5, 6)).to.approximately(84677.83322629951, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 6, 6)).to.approximately(57665.60442710997, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 1, 9)).to.equal(239250)
    expect(financial.DB(1000000, 100000, 6, 2, 9)).to.approximately(242679.25, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 3, 9)).to.approximately(165264.56925, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 4, 9)).to.approximately(112545.17165925002, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 5, 9)).to.approximately(76643.26189994926, 1e-9)
    expect(financial.DB(1000000, 100000, 6, 6, 9)).to.approximately(52194.061353865436, 1e-9)
    expect(financial.DB()).to.equal(error.na)
    expect(financial.DB(1000000)).to.equal(error.na)
    expect(financial.DB(1000000, 100000)).to.equal(error.na)
    expect(financial.DB(1000000, 100000, 6)).to.equal(error.na)
    expect(financial.DB(1000000, 100000, 6, 6, 9, 1)).to.equal(error.na)
    expect(financial.DB([[1000000], [1000000]], 100000, 6, 6, 9)).to.equal(error.value)
    expect(financial.DB(1000000, [[100000], [100000]], 6, 6, 9)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, [[6], [6]], 6, 9)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, 6, [[6], [6]], 9)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, 6, 6, [[9], [9]])).to.equal(error.value)
    expect(financial.DB(true, 100000, 6, 6, 9)).to.equal(error.value)
    expect(financial.DB('true', 100000, 6, 6, 9)).to.equal(error.value)
    expect(financial.DB(false, 100000, 6, 6, 9)).to.equal(error.value)
    expect(financial.DB(100000, true, 6, 6, 9)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, true, 6, 9)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, 6, true, 9)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, 6, 6, true)).to.equal(error.value)
    expect(financial.DB('Hello World!', 100000, 6, 1, 6)).to.equal(error.value)
    expect(financial.DB(1000000, 'Hello World!', 6, 1, 6)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, 'Hello World!', 1, 6)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, 6, 'Hello World!', 6)).to.equal(error.value)
    expect(financial.DB(1000000, 100000, 6, 1, 'Hello World!')).to.equal(error.value)
    expect(financial.DB(undefined, 100000, 6, 1, 6)).to.equal(error.na)
    expect(financial.DB(1000000, undefined, 6, 1, 6)).to.equal(error.na)
    expect(financial.DB(1000000, 100000, undefined, 1, 6)).to.equal(error.na)
    expect(financial.DB(1000000, 100000, 6, undefined, 6)).to.equal(error.na)
    expect(financial.DB(null, null, 6, 1, 7)).to.equal(0)
    expect(financial.DB(1000000, 100000, null, 1, 6)).to.equal(error.num)
    expect(financial.DB(1000000, 100000, 6, null, 6)).to.equal(error.num)
    expect(financial.DB(-1000000, 100000, 6, 1, 6)).to.equal(error.num)
    expect(financial.DB(1000000, -100000, 6, 1, 6)).to.equal(error.num)
    expect(financial.DB(1000000, 100000, -6, 1, 6)).to.equal(error.num)
    expect(financial.DB(1000000, 100000, 6, -1, 6)).to.equal(error.num)
    expect(financial.DB(1000000, 100000, 6, 1, -1)).to.equal(error.num)
    expect(financial.DB(1000000, 100000, 6, 1, 13)).to.equal(error.num)
    expect(financial.DB(1000000, 100000, 6, 7, 6)).to.equal(error.num)
    expect(financial.DB(1000000, 1000000, 6, 1, 6)).to.equal(0)
    expect(financial.DB(100000, 1000000, 6, 1, 6)).to.equal(0)

    Object.values(error).forEach((err) => {
      expect(financial.DB(err, 100000, 6, 1)).to.equal(err)
      expect(financial.DB(1000000, err, 6, 1)).to.equal(err)
      expect(financial.DB(1000000, err, 6, 1)).to.equal(err)
      expect(financial.DB(1000000, 100000, err, 1)).to.equal(err)
      expect(financial.DB(1000000, 100000, 6, err)).to.equal(err)
    })
  })

  it('DDB', () => {
    expect(financial.DDB(1000000, 100000, 6, 1)).to.approximately(333333.3333333333, 1e-9)
    expect(financial.DDB(1000000, 100000, 6, 2)).to.approximately(222222.22222222225, 1e-9)
    expect(financial.DDB(1000000, 100000, 6, 3)).to.approximately(148148.14814814815, 1e-9)
    expect(financial.DDB(1000000, 100000, 6, 4)).to.approximately(98765.43209876546, 1e-9)
    expect(financial.DDB(1000000, 100000, 6, 5)).to.approximately(65843.62139917696, 1e-9)
    expect(financial.DDB(1000000, 100000, 6, 6)).to.approximately(31687.242798353895, 1e-9)
    expect(financial.DDB(1000000, 100000, 6, 1, 1.5)).to.equal(250000)
    expect(financial.DDB(1000000, 100000, 6, 2, 1.5)).to.equal(187500)
    expect(financial.DDB(1000000, 100000, 6, 3, 1.5)).to.equal(140625)
    expect(financial.DDB(1000000, 100000, 6, 4, 1.5)).to.approximately(105468.75, 1e-9)
    expect(financial.DDB(1000000, 100000, 6, 5, 1.5)).to.approximately(79101.5625, 1e-9)
    expect(financial.DDB(1000000, 100000, 6, 6, 1.5)).to.approximately(59326.171875, 1e-9)
    expect(financial.DDB('Hello World!', 100000, 6, 6, 1.5)).to.equal(error.value)
    expect(financial.DDB(1000000, 'Hello World!', 6, 6, 1.5)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, 'Hello World!', 6, 1.5)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, 6, 'Hello World!', 1.5)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, 6, 6, 'Hello World!')).to.equal(error.value)
    expect(financial.DDB(undefined, 100000, 6, 1, 6)).to.equal(error.na)
    expect(financial.DDB(1000000, undefined, 6, 1, 6)).to.equal(error.na)
    expect(financial.DDB(1000000, 100000, undefined, 1, 6)).to.equal(error.na)
    expect(financial.DDB(1000000, 100000, 6, undefined, 6)).to.equal(error.na)
    expect(financial.DDB(null, null, 6, 1, 7)).to.equal(0)
    expect(financial.DDB(1000000, 100000, null, 1, 6)).to.equal(error.num)
    expect(financial.DDB(1000000, 100000, 6, null, 6)).to.equal(error.num)
    expect(financial.DDB()).to.equal(error.na)
    expect(financial.DDB(1000000)).to.equal(error.na)
    expect(financial.DDB(1000000, 100000)).to.equal(error.na)
    expect(financial.DDB(1000000, 100000, 6)).to.equal(error.na)
    expect(financial.DDB(1000000, 100000, 6, 6, 9, 1)).to.equal(error.na)
    expect(financial.DDB([[1000000], [1000000]], 100000, 6, 6, 9)).to.equal(error.value)
    expect(financial.DDB(1000000, [[100000], [100000]], 6, 6, 9)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, [[6], [6]], 6, 9)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, 6, [[6], [6]], 9)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, 6, 6, [[9], [9]])).to.equal(error.value)
    expect(financial.DDB(true, 100000, 6, 6, 9)).to.equal(error.value)
    expect(financial.DDB('true', 100000, 6, 6, 9)).to.equal(error.value)
    expect(financial.DDB(false, 100000, 6, 6, 9)).to.equal(error.value)
    expect(financial.DDB(100000, true, 6, 6, 9)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, true, 6, 9)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, 6, true, 9)).to.equal(error.value)
    expect(financial.DDB(1000000, 100000, 6, 6, true)).to.equal(error.value)
    expect(financial.DDB(-1000000, 100000, 6, 1, 1.5)).to.equal(error.num)
    expect(financial.DDB(1000000, -100000, 6, 1, 1.5)).to.equal(error.num)
    expect(financial.DDB(1000000, 100000, -6, 1, 1.5)).to.equal(error.num)
    expect(financial.DDB(1000000, 100000, 6, -1, 1.5)).to.equal(error.num)
    expect(financial.DDB(1000000, 100000, 6, 1, -1.5)).to.equal(error.num)
    expect(financial.DDB(1000000, 100000, 6, 1, 0)).to.equal(error.num)
    expect(financial.DDB(1000000, 100000, 6, 7, 1.5)).to.equal(error.num)
    expect(financial.DDB(1000000, 1000000, 6, 1, 1.5)).to.equal(0)
    expect(financial.DDB(100000, 1000000, 6, 1, 1.5)).to.equal(0)

    Object.values(error).forEach((err) => {
      expect(financial.DDB(err, 100000, 6, 1)).to.equal(err)
      expect(financial.DDB(1000000, err, 6, 1)).to.equal(err)
      expect(financial.DDB(1000000, err, 6, 1)).to.equal(err)
      expect(financial.DDB(1000000, 100000, err, 1)).to.equal(err)
      expect(financial.DDB(1000000, 100000, 6, err)).to.equal(err)
    })
  })

  describe('DISC', () => {
    it('should calculate the discount rate for a security', () => {
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, 0)).to.approximately(0.0383, 1e-11)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100)).to.approximately(0.0383, 1e-11)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, 1)).to.approximately(0.03883194444, 1e-11)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, 2)).to.approximately(0.0383, 1e-11)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, 3)).to.approximately(0.03883194444, 1e-11)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, 4)).to.approximately(0.03977307692, 1e-11)
      expect(financial.DISC('01/04/2023', '12/28/2023', 95.6145, 100, 0)).to.approximately(0.04459830508, 1e-11)
      expect(financial.DISC('01/04/2023', '12/28/2023', 95.6145, 100, 1)).to.approximately(0.0447125, 1e-11)
      expect(financial.DISC('01/04/2023', '12/28/2023', 95.6145, 100, 2)).to.approximately(0.0441, 1e-11)
      expect(financial.DISC('01/04/2023', '12/28/2023', 95.6145, 100, 3)).to.approximately(0.0447125, 1e-11)
      expect(financial.DISC('01/04/2023', '12/28/2023', 95.6145, 100, 4)).to.approximately(0.04459830508, 1e-11)
      expect(financial.DISC('01/04/2023', '12/28/2023', '95.6145', '100', '4')).to.approximately(0.04459830508, 1e-11)
    })

    it('should throw an error if input is out-of-bounds', () => {
      expect(financial.DISC('01/04/2023', '01/31/2023', -1, 100, 1)).to.equal(error.num)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, -1, 1)).to.equal(error.num)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, -1)).to.equal(error.num)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, 5)).to.equal(error.num)
    })

    it('should throw an error if input is of unsupported type/format', () => {
      expect(financial.DISC('Hello World!', '01/31/2023', 99.71275, 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', 'Hello World!', 99.71275, 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', 'Hello World!', 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 'Hello World!', 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, 'Hello World!')).to.equal(error.value)
      expect(financial.DISC(undefined, '01/31/2023', 99.71275, 100, 1)).to.equal(error.na)
      expect(financial.DISC('01/04/2023', undefined, 99.71275, 100, 1)).to.equal(error.na)
      expect(financial.DISC('01/04/2023', '01/31/2023', undefined, 100, 1)).to.equal(error.na)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, undefined, 1)).to.equal(error.na)
      expect(financial.DISC(null, '01/31/2023', 99.71275, 100, 1)).to.equal(error.num)
      expect(financial.DISC('01/04/2023', null, 99.71275, 100, 1)).to.equal(error.num)
      expect(financial.DISC('01/04/2023', '01/31/2023', null, 100, 1)).to.equal(error.num)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, null, 1)).to.equal(error.num)
      expect(financial.DISC(true, '01/31/2023', 99.71275, 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', true, 99.71275, 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', true, 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, true, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, true)).to.equal(error.value)
      expect(financial.DISC([[1], [2]], '01/31/2023', 99.71275, 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', [[1], [2]], 99.71275, 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', [[1], [2]], 100, 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, [[1], [2]], 1)).to.equal(error.value)
      expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, [[1], [2]])).to.equal(error.value)
      expect(financial.DISC(false, '01/31/2023', 99.71275, 100, 1)).to.equal(error.value)
      expect(financial.DISC('true', '01/31/2023', 99.71275, 100, 1)).to.equal(error.value)

      Object.values(error).forEach((err) => {
        expect(financial.DISC(err, '01/31/2023', 99.71275, 100, 0)).to.equal(err)
        expect(financial.DISC('01/04/2023', err, 99.71275, 100, 0)).to.equal(err)
        expect(financial.DISC('01/04/2023', '01/31/2023', err, 100, 0)).to.equal(err)
        expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, err, 0)).to.equal(err)
        expect(financial.DISC('01/04/2023', '01/31/2023', 99.71275, 100, err)).to.equal(err)
      })
    })

    it('should throw an error if the number of arguments are invalid', () => {
      expect(financial.DISC()).to.equal(error.na)
      expect(financial.DISC('01/04/2023', '12/28/2023')).to.equal(error.na)
      expect(financial.DISC('01/04/2023', '12/28/2023', 99.71275)).to.equal(error.na)
      expect(financial.DISC('01/04/2023', '12/28/2023', 95.6145, 100, 4, 2)).to.equal(error.na)
    })

    it('should throw an error if maturity is earlier than settlement', () => {
      expect(financial.DISC('01/04/2023', '01/03/2023', 99.71275, 100, 1)).to.equal(error.value)
    })
  })

  it('DOLLARDE', () => {
    expect(financial.DOLLARDE(1.1, 1)).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARDE(1.1, 2)).to.approximately(1.5, 1e-9)
    expect(financial.DOLLARDE(1.1, 4)).to.approximately(1.25, 1e-9)
    expect(financial.DOLLARDE(1.1, 8)).to.approximately(1.125, 1e-9)
    expect(financial.DOLLARDE(1.1, 16)).to.approximately(1.625, 1e-9)
    expect(financial.DOLLARDE(1.1, 32)).to.approximately(1.3125, 1e-9)
    expect(financial.DOLLARDE(-1.1, 1)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARDE(-1.1, 2)).to.approximately(-1.5, 1e-9)
    expect(financial.DOLLARDE(-1.1, 4)).to.approximately(-1.25, 1e-9)
    expect(financial.DOLLARDE(-1.1, 8)).to.approximately(-1.125, 1e-9)
    expect(financial.DOLLARDE(-1.1, 16)).to.approximately(-1.625, 1e-9)
    expect(financial.DOLLARDE(-1.1, 32)).to.approximately(-1.3125, 1e-9)
    expect(financial.DOLLARDE(1.1, 1.5)).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARDE('1.1', '1.5')).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARDE('Hello World!', 1)).to.equal(error.value)
    expect(financial.DOLLARDE(1.1, 'Hello World!')).to.equal(error.value)
    expect(financial.DOLLARDE(undefined, 1)).to.equal(error.na)
    expect(financial.DOLLARDE(1.1, undefined)).to.equal(error.na)
    expect(financial.DOLLARDE(null, 2)).to.equal(0)
    expect(financial.DOLLARDE(1.1, null)).to.equal(error.div0)
    expect(financial.DOLLARDE(1.1, -1)).to.equal(error.num)
    expect(financial.DOLLARDE(1.1, 0.5)).to.equal(error.div0)
    expect(financial.DOLLARDE(1.1, 0)).to.equal(error.div0)
    expect(financial.DOLLARDE()).to.equal(error.na)
    expect(financial.DOLLARDE(1.1)).to.equal(error.na)
    expect(financial.DOLLARDE(1.1, 1, 3)).to.equal(error.na)
    expect(financial.DOLLARDE([[1.1], [1.2]], 1)).to.equal(error.value)
    expect(financial.DOLLARDE([[1.1, 1.2]], 1)).to.equal(error.value)
    expect(financial.DOLLARDE(1.02, [[1.1], [2]])).to.equal(error.value)
    expect(financial.DOLLARDE(1.02, [[1, 2]])).to.equal(error.value)
    expect(financial.DOLLARDE(false, 2)).to.equal(error.value)
    expect(financial.DOLLARDE(1.02, false)).to.equal(error.value)
    expect(financial.DOLLARDE(true, 2)).to.equal(error.value)
    expect(financial.DOLLARDE(1.02, true)).to.equal(error.value)
    expect(financial.DOLLARDE('true', 2)).to.equal(error.value)
    expect(financial.DOLLARDE(1.02, 'true')).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.DOLLARDE(err, 2)).to.equal(err)
      expect(financial.DOLLARDE(1.02, err)).to.equal(err)
    })
  })

  it('DOLLARFR', () => {
    expect(financial.DOLLARFR(1.1, 1)).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARFR(1.5, 2)).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARFR(1.25, 4)).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARFR(1.125, 8)).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARFR(1.625, 16)).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARFR(1.3125, 32)).to.approximately(1.1, 1e-9)
    expect(financial.DOLLARFR(-1.1, 1)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARFR(-1.5, 2)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARFR(-1.25, 4)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARFR(-1.125, 8)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARFR(-1.625, 16)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARFR(-1.3125, 32)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARFR(-1.1, 1.5)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARFR('-1.1', 1.5)).to.approximately(-1.1, 1e-9)
    expect(financial.DOLLARFR('Hello World!', 1)).to.equal(error.value)
    expect(financial.DOLLARFR(1.5, 'Hello World!')).to.equal(error.value)
    expect(financial.DOLLARFR(1.5, -1)).to.equal(error.num)
    expect(financial.DOLLARFR(1.5, 0.5)).to.equal(error.div0)

    expect(financial.DOLLARFR(undefined, 1)).to.equal(error.na)
    expect(financial.DOLLARFR(1.1, undefined)).to.equal(error.na)
    expect(financial.DOLLARFR(null, 2)).to.equal(0)
    expect(financial.DOLLARFR(1.1, null)).to.equal(error.div0)
    expect(financial.DOLLARFR(1.1, -1)).to.equal(error.num)
    expect(financial.DOLLARFR(1.1, 0.5)).to.equal(error.div0)
    expect(financial.DOLLARFR(1.1, 0)).to.equal(error.div0)
    expect(financial.DOLLARFR()).to.equal(error.na)
    expect(financial.DOLLARFR(1.1)).to.equal(error.na)
    expect(financial.DOLLARFR(1.1, 1, 3)).to.equal(error.na)
    expect(financial.DOLLARFR([[1.1], [1.2]], 1)).to.equal(error.value)
    expect(financial.DOLLARFR([[1.1, 1.2]], 1)).to.equal(error.value)
    expect(financial.DOLLARFR(1.02, [[1.1], [2]])).to.equal(error.value)
    expect(financial.DOLLARFR(1.02, [[1, 2]])).to.equal(error.value)
    expect(financial.DOLLARFR(false, 2)).to.equal(error.value)
    expect(financial.DOLLARFR(1.02, false)).to.equal(error.value)
    expect(financial.DOLLARFR(true, 2)).to.equal(error.value)
    expect(financial.DOLLARFR(1.02, true)).to.equal(error.value)
    expect(financial.DOLLARFR('true', 2)).to.equal(error.value)
    expect(financial.DOLLARFR(1.02, 'true')).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.DOLLARFR(err, 2)).to.equal(err)
      expect(financial.DOLLARFR(1.02, err)).to.equal(err)
    })
  })

  // TODO: implement
  it('DURATION', () => {
    expect(financial.DURATION).to.throw('DURATION is not implemented')
  })

  it('EFFECT', () => {
    expect(financial.EFFECT(0.1, 4)).to.approximately(0.10381289062499977, 1e-9)
    expect(financial.EFFECT(0.1, 4.5)).to.approximately(0.10381289062499977, 1e-9)
    expect(financial.EFFECT('Hello', 4)).to.equal(error.value)
    expect(financial.EFFECT(0.1, 'World')).to.equal(error.value)
    expect(financial.EFFECT(-0.1, 4)).to.equal(error.num)
    expect(financial.EFFECT(0.1, 0.5)).to.equal(error.num)

    expect(financial.EFFECT(undefined, 4)).to.equal(error.na)
    expect(financial.EFFECT(0.1, undefined)).to.equal(error.na)
    expect(financial.EFFECT(0.1, -1)).to.equal(error.num)
    expect(financial.EFFECT()).to.equal(error.na)
    expect(financial.EFFECT(0.1)).to.equal(error.na)
    expect(financial.EFFECT(0.1, 1, 3)).to.equal(error.na)
    expect(financial.EFFECT([[0.1], [1.2]], 1)).to.equal(error.value)
    expect(financial.EFFECT([[0.1, 1.2]], 1)).to.equal(error.value)
    expect(financial.EFFECT(0.1, [[0.1], [2]])).to.equal(error.value)
    expect(financial.EFFECT(0.1, [[1, 2]])).to.equal(error.value)
    expect(financial.EFFECT(false, 2)).to.equal(error.value)
    expect(financial.EFFECT(0.1, false)).to.equal(error.value)
    expect(financial.EFFECT(true, 2)).to.equal(error.value)
    expect(financial.EFFECT(0.1, true)).to.equal(error.value)
    expect(financial.EFFECT('true', 2)).to.equal(error.value)
    expect(financial.EFFECT(0.1, 'true')).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.EFFECT(err, 4)).to.equal(err)
      expect(financial.EFFECT(0.1, err)).to.equal(err)
    })
  })

  it('FV', () => {
    expect(financial.FV(0.06 / 12, 10, -200, -500, 1)).to.approximately(2581.4033740601185, 1e-9)
    expect(financial.FV(0.12 / 12, 12, -1000)).to.approximately(12682.503013196976, 1e-9)
    expect(financial.FV(0.11 / 12, 35, -2000, undefined, 1)).to.approximately(82846.24637190053, 1e-9)
    expect(financial.FV(0.06 / 12, 12, -100, -1000, 1)).to.approximately(2301.4018303408993, 1e-9)
    expect(financial.FV(0, 12, -100, -1000, 1)).to.equal(2200)
    expect(financial.FV()).to.equal(error.na)
    expect(financial.FV(0.06 / 12)).to.equal(error.na)
    expect(financial.FV(0.06 / 12, 10)).to.equal(error.na)
    expect(financial.FV(0.06 / 12, 10, -200, -500, 1, 2)).to.equal(error.na)
    expect(financial.FV('string', 12, -100, -1000, 1)).to.equal(error.value)
    expect(financial.FV(0, 'string', -100, -1000, 1)).to.equal(error.value)
    expect(financial.FV(0, 12, 'string', -1000, 1)).to.equal(error.value)
    expect(financial.FV(0, 12, -100, 'string', 1)).to.equal(error.value)
    expect(financial.FV(0, 12, -100, -1000, 'string')).to.equal(error.value)
    expect(financial.FV([[1], [1]], 12, -100, -1000, 1)).to.equal(error.value)
    expect(financial.FV(0, [[1], [1]], -100, -1000, 1)).to.equal(error.value)
    expect(financial.FV(0, 12, [[1], [1]], -1000, 1)).to.equal(error.value)
    expect(financial.FV(0, 12, -100, [[1], [1]], 1)).to.equal(error.value)
    expect(financial.FV(0, 12, -100, -1000, [[1], [1]])).to.equal(error.value)
    expect(financial.FV(null, 12, -100, -1000, 1)).to.equal(error.value)
    expect(financial.FV(0, null, -100, -1000, 1)).to.equal(error.value)
    expect(financial.FV(0, 12, null, -1000, 1)).to.equal(error.value)
    expect(financial.FV(undefined, 12, -100, -1000, 1)).to.equal(error.na)
    expect(financial.FV(0, undefined, -100, -1000, 1)).to.equal(error.na)
    expect(financial.FV(0, 12, undefined, -1000, 1)).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.FV(err, 12, -100, -1000, 1)).to.equal(err)
      expect(financial.FV(0, err, -100, -1000, 1)).to.equal(err)
      expect(financial.FV(0, 12, err, -1000, 1)).to.equal(err)
      expect(financial.FV(0, 12, -100, err, 1)).to.equal(err)
      expect(financial.FV(0, 12, -100, -1000, err)).to.equal(err)
    })
  })

  it('FVSCHEDULE', () => {
    expect(financial.FVSCHEDULE(100, [0.09, 0.1, 0.11])).to.approximately(133.08900000000003, 1e-9)
    expect(financial.FVSCHEDULE(100, [[0.09], [0.1], [0.11]])).to.approximately(133.08900000000003, 1e-9)
    expect(financial.FVSCHEDULE(100, [[0.09, 0.1, 0.11]])).to.approximately(133.08900000000003, 1e-9)
    expect(financial.FVSCHEDULE(100, [[0.09, 0.1], [0.11]])).to.approximately(133.08900000000003, 1e-9)
    expect(financial.FVSCHEDULE('100', [['0.09', '0.1'], ['0.11']])).to.approximately(133.08900000000003, 1e-9)
    expect(financial.FVSCHEDULE(true, [['0.09', '0.1'], ['0.11']])).to.equal(error.value)
    expect(financial.FVSCHEDULE(100, [[true], [0.11]])).to.equal(error.value)
    expect(financial.FVSCHEDULE(100, true)).to.equal(error.value)
    expect(financial.FVSCHEDULE(100, 'true')).to.equal(error.value)
    expect(financial.FVSCHEDULE(100, ['Hello World!', 0.1, 0.11])).to.equal(error.value)
    expect(financial.FVSCHEDULE()).to.equal(error.na)
    expect(financial.FVSCHEDULE(100)).to.equal(error.na)
    expect(financial.FVSCHEDULE(100, 1, 1)).to.equal(error.na)
    expect(financial.FVSCHEDULE(undefined, 1)).to.equal(error.na)
    expect(financial.FVSCHEDULE(100, undefined)).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.FVSCHEDULE(err, 1)).to.equal(err)
      expect(financial.FVSCHEDULE(100, err)).to.equal(err)
      expect(financial.FVSCHEDULE(100, [[err], [1]])).to.equal(err)
    })
  })

  // TODO: implement
  it('INTRATE', () => {
    expect(financial.INTRATE).to.throw('INTRATE is not implemented')
  })

  it('IPMT', () => {
    expect(financial.IPMT(0.1 / 12, 6, 2 * 12, 100000, 1000000, 0)).to.approximately(928.8235718400465, 1e-9)
    expect(financial.IPMT('0.1' / '12', '6', '2' * '12', '100000', '1000000', '0')).to.approximately(
      928.8235718400465,
      1e-9
    )
    expect(financial.IPMT(0.1 / 12, 6, 2 * 12, 100000, 1000000, 1)).to.approximately(921.1473439736042, 1e-9)
    expect(financial.IPMT(0.1 / 12, 1, 2 * 12, 100000, 1000000, 1)).to.equal(0)
    expect(financial.IPMT(0.1 / 12, 1, 2 * 12, 100000, 1000000, 0)).to.approximately(-833.3333333333334, 1e-9)
    expect(financial.IPMT(0.1, 1, 24, 100000, 1000000, 0, 1)).to.equal(error.na)
    expect(financial.IPMT(0.1, 1, 24)).to.equal(error.na)
    expect(financial.IPMT(0.1, 1)).to.equal(error.na)
    expect(financial.IPMT(0.1)).to.equal(error.na)
    expect(financial.IPMT()).to.equal(error.na)
    expect(financial.IPMT('hello', 1, 2 * 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 'hello', 2 * 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 1, 'hello', 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 1, 2 * 12, 'hello', 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 1, 2 * 12, 100000, 'hello', 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 1, 2 * 12, 100000, 1000000, 'hello')).to.equal(error.value)
    expect(financial.IPMT(undefined, 1, 2 * 12, 100000, 1000000, 1)).to.equal(error.na)
    expect(financial.IPMT(0.1, undefined, 2 * 12, 100000, 1000000, 1)).to.equal(error.na)
    expect(financial.IPMT(0.1, 1, undefined, 100000, 1000000, 1)).to.equal(error.na)
    expect(financial.IPMT(0.1, 1, 2 * 12, undefined, 1000000, 1)).to.equal(error.na)
    expect(financial.IPMT(null, 1, 2 * 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, null, 2 * 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 1, null, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 1, 2 * 12, null, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(true, 1, 2 * 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT('true', 1, 2 * 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(false, 1, 2 * 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, true, 2 * 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 1, true, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.IPMT(0.1, 1, 2 * 12, true, 1000000, 1)).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.IPMT(err, 1, 24, 100000, 1000000, 0)).to.equal(err)
      expect(financial.IPMT(0.1, err, 24, 100000, 1000000, 0)).to.equal(err)
      expect(financial.IPMT(0.1, 1, err, 100000, 1000000, 0)).to.equal(err)
      expect(financial.IPMT(0.1, 1, 24, err, 1000000, 0)).to.equal(err)
      expect(financial.IPMT(0.1, 1, 24, 100000, err, 0)).to.equal(err)
      expect(financial.IPMT(0.1, 1, 24, 100000, 1000000, err)).to.equal(err)
    })
  })

  it('IRR', () => {
    expect(financial.IRR([-75000, 12000, 15000, 18000, 21000, 24000])).to.approximately(0.05715142887178467, 1e-9)
    expect(financial.IRR(['-75000', 12000, 15000, 18000, 21000, '24000'])).to.approximately(0.05715142887178467, 1e-9)
    expect(
      financial.IRR([
        [-75000, 12000],
        [15000, 18000],
        [21000, 24000]
      ])
    ).to.approximately(0.05715142887178467, 1e-9)
    expect(financial.IRR([[-75000], [12000], [15000], [18000], [21000], [24000]])).to.approximately(
      0.05715142887178467,
      1e-9
    )
    expect(financial.IRR([-75000, 12000, 15000, 18000, 21000, 24000], 0.1)).to.approximately(0.05715142887178467, 1e-9)
    expect(financial.IRR([-75000, 12000, 15000, 18000, 21000, 24000], 0.075)).to.approximately(
      0.05715142887178447,
      1e-9
    )
    expect(financial.IRR([-75000, 12000, 15000, 18000, 21000, 24000], 0.05)).to.approximately(0.05715142887178453, 1e-9)

    expect(financial.IRR([-75000, 12000, 15000, 18000, 'string', 24000], 0.05)).to.equal(error.value)
    expect(financial.IRR([-75000, 12000, 15000, 18000, true, 24000], 0.05)).to.equal(error.num)
    expect(financial.IRR([-75000, 12000, 15000, 18000, true, 24000], 0.05)).to.equal(error.num)
    expect(financial.IRR([-75000, 12000, 15000, 18000, 21000, 24000], 0.1, 1)).to.equal(error.na)
    expect(financial.IRR([12000, 15000, 18000, 21000, 24000])).to.equal(error.num)
    expect(financial.IRR([-12000, -15000, -18000, -21000, -24000])).to.equal(error.num)
    expect(financial.IRR([-12000, -15000, -18000, -21000, -24000], 'invalid')).to.equal(error.value)
    expect(financial.IRR([-75000, 12000, 15000, 18000], true)).to.equal(error.num)
    expect(financial.IRR()).to.equal(error.na)
    expect(financial.IRR('invalid')).to.equal(error.num)
    expect(financial.IRR(-7500)).to.equal(error.num)
    expect(financial.IRR(true)).to.equal(error.num)
    expect(financial.IRR('true')).to.equal(error.num)
    expect(financial.IRR(false)).to.equal(error.num)

    Object.values(error).forEach((err) => {
      expect(financial.IRR(err, 0.1)).to.equal(err)
      expect(financial.IRR([-75000, 12000, 15000, 18000, 21000, 24000], err)).to.equal(err)
      expect(financial.IRR([-75000, 12000, 15000, 18000, 21000, err], 0.1)).to.equal(err)
    })
  })

  it('ISPMT', () => {
    expect(financial.ISPMT(0.1 / 12, 6, 2 * 12, 100000)).to.equal(-625)
    expect(financial.ISPMT(0.1, 2, 5, 1000)).to.equal(-60)
    expect(financial.ISPMT('0.1', '2', '5', '1000')).to.equal(-60)
    expect(financial.ISPMT(true, 2, 5, 1000)).to.equal(-600)
    expect(financial.ISPMT(0.1, true, 5, 1000)).to.equal(-80)
    expect(financial.ISPMT(0.1, 2, true, 1000)).to.equal(100)
    expect(financial.ISPMT(0.1, 2, 5, true)).to.equal(-0.06)
    expect(financial.ISPMT(false, 2, 5, 1000)).to.equal(0)
    expect(financial.ISPMT(0.1, false, 5, 1000)).to.equal(-100)
    expect(financial.ISPMT(0.1, 2, false, 1000)).to.equal(error.div0)
    expect(financial.ISPMT(0.1, 2, 5, false)).to.equal(0)
    expect(financial.ISPMT(0.1 / 12, 6, 2 * 12, 100000, 1)).to.equal(error.na)
    expect(financial.ISPMT(0.1 / 12, 6, 2 * 12)).to.equal(error.na)
    expect(financial.ISPMT(0.1 / 12, 6)).to.equal(error.na)
    expect(financial.ISPMT(0.1 / 12)).to.equal(error.na)
    expect(financial.ISPMT()).to.equal(error.na)
    expect(financial.ISPMT('true', 6, 2 * 12, 100000)).to.equal(error.value)
    expect(financial.ISPMT(0.1 / 12, 'true', 2 * 12, 100000)).to.equal(error.value)
    expect(financial.ISPMT(0.1 / 12, 6, 'true', 100000)).to.equal(error.value)
    expect(financial.ISPMT(0.1 / 12, 6, 2 * 12, 'true')).to.equal(error.value)
    expect(financial.ISPMT(undefined, 6, 2 * 12, 100000)).to.equal(error.na)
    expect(financial.ISPMT(0.1 / 12, undefined, 2 * 12, 100000)).to.equal(error.na)
    expect(financial.ISPMT(0.1 / 12, 6, undefined, 100000)).to.equal(error.na)
    expect(financial.ISPMT(0.1 / 12, 6, 2 * 12, undefined)).to.equal(error.na)
    expect(financial.ISPMT(null, 6, 2 * 12, 100000)).to.equal(error.value)
    expect(financial.ISPMT(0.1 / 12, null, 2 * 12, 100000)).to.equal(error.value)
    expect(financial.ISPMT(0.1 / 12, 6, null, 100000)).to.equal(error.value)
    expect(financial.ISPMT(0.1 / 12, 6, 2 * 12, null)).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.ISPMT(err, 6, 2 * 12, 100000)).to.equal(err)
      expect(financial.ISPMT(0.1 / 12, err, 2 * 12, 100000)).to.equal(err)
      expect(financial.ISPMT(0.1 / 12, 6, err, 100000)).to.equal(err)
      expect(financial.ISPMT(0.1 / 12, 6, 2 * 12, err)).to.equal(err)
    })
  })

  // TODO: implement
  it('MDURATION', () => {
    expect(financial.MDURATION).to.throw('MDURATION is not implemented')
  })

  it('MIRR', () => {
    expect(financial.MIRR([-75000, 12000, 15000, 18000, 21000, 24000], 0.1, 0.12)).to.approximately(
      0.07971710360838036,
      1e-9
    )
    expect(financial.MIRR([-120000, 39000, 30000, 21000, 37000, 46000], 0.1, 0.12)).to.approximately(0.12609413, 1e-9)
    expect(financial.MIRR([-75000], 0.1, 0.12)).to.equal(error.num)
    expect(financial.MIRR([-75000, 12000, 15000, 18000, 21000, 24000], 'invalid', 0.12)).to.equal(error.value)
    expect(financial.MIRR([-75000, 12000, 15000, 18000, 21000, 24000], 0.1, 'invalid')).to.equal(error.value)
    expect(financial.MIRR([-75000, 12000, 15000, 18000, 'string', 24000], 0.1, 0.12)).to.equal(error.value)
    expect(financial.MIRR([-75000, 12000, 15000, 18000, true, 24000], 0.1, 0.12)).to.equal(error.num)
    expect(financial.MIRR([-75000, 12000, 15000, 18000, true, 24000], 0.1, 0.12)).to.equal(error.num)
    expect(financial.MIRR([-75000, 12000, 15000, 18000, 21000, 24000], 0.1, 0.12, 1)).to.equal(error.na)
    expect(financial.MIRR([12000, 15000, 18000, 21000, 24000], 0.1, 0.12)).to.equal(error.num)
    expect(financial.MIRR([-12000, -15000, -18000, -21000, -24000], 0.1, 0.12)).to.equal(error.num)
    expect(financial.MIRR([-75000, 12000, 15000, 18000], true, 0.12)).to.equal(error.num)
    expect(financial.MIRR()).to.equal(error.na)
    expect(financial.MIRR('invalid', 0.1, 0.12)).to.equal(error.value)
    expect(financial.MIRR(-7500, 0.1, 0.12)).to.equal(error.num)
    expect(financial.MIRR(true, 0.1, 0.12)).to.equal(error.num)
    expect(financial.MIRR('true', 0.1, 0.12)).to.equal(error.value)
    expect(financial.MIRR(false, 0.1, 0.12)).to.equal(error.num)

    Object.values(error).forEach((err) => {
      expect(financial.MIRR(err, 0.1, 0.12)).to.equal(err)
      expect(financial.MIRR([-75000, 12000, 15000, 18000, 21000, 24000], err, 0.12)).to.equal(err)
      expect(financial.MIRR([-75000, 12000, 15000, 18000, 21000, 24000], 0.1, err)).to.equal(err)
      expect(financial.MIRR([-75000, 12000, 15000, 18000, 21000, err], 0.1, 0.12)).to.equal(err)
    })
  })

  it('NOMINAL', () => {
    expect(financial.NOMINAL(0.1, 4)).to.approximately(0.09645475633778045, 1e-9)
    expect(financial.NOMINAL('0.1', '4')).to.approximately(0.09645475633778045, 1e-9)
    expect(financial.NOMINAL(0.053543, 4)).to.approximately(0.052500319868356016, 1e-9)
    expect(financial.NOMINAL('0.1', '4.5')).to.approximately(0.09645475633778045, 1e-9)
    expect(financial.NOMINAL('Hello', 4)).to.equal(error.value)
    expect(financial.NOMINAL(0.1, 'World')).to.equal(error.value)
    expect(financial.NOMINAL(-0.1, 4)).to.equal(error.num)
    expect(financial.NOMINAL(0.1, 0.5)).to.equal(error.num)

    expect(financial.NOMINAL()).to.equal(error.na)
    expect(financial.NOMINAL(0.1)).to.equal(error.na)
    expect(financial.NOMINAL(0.1, 4, 1)).to.equal(error.na)
    expect(financial.NOMINAL(undefined, 4)).to.equal(error.na)
    expect(financial.NOMINAL(0.1, undefined)).to.equal(error.na)
    expect(financial.NOMINAL(null, 4)).to.equal(error.value)
    expect(financial.NOMINAL(0.1, null)).to.equal(error.value)
    expect(financial.NOMINAL(true, 4)).to.equal(error.value)
    expect(financial.NOMINAL(0.1, true)).to.equal(error.value)
    expect(financial.NOMINAL('true', 4)).to.equal(error.value)
    expect(financial.NOMINAL(0.1, 'true')).to.equal(error.value)
    expect(financial.NOMINAL(false, 4)).to.equal(error.value)
    expect(financial.NOMINAL(0.1, false)).to.equal(error.value)
    expect(financial.NOMINAL([[0.1], [0.2]], 4)).to.equal(error.value)
    expect(financial.NOMINAL(0.1, [[4], [3]])).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.NOMINAL(err, 4)).to.equal(err)
      expect(financial.NOMINAL(0.1, err)).to.equal(err)
    })
  })

  it('NPER', () => {
    expect(financial.NPER(0, -100, -1000, 10000)).to.equal(90)
    expect(financial.NPER('0', '-100', '-1000', '10000')).to.equal(90)
    expect(financial.NPER(0.1 / 12, -100, -1000, 10000, 0)).to.approximately(63.39385422740764, 1e-9)
    expect(financial.NPER(0.1 / 12, -100, -1000, 10000, 1)).to.approximately(63.016966422019685, 1e-9)
    expect(financial.NPER(0.1 / 12, -100, -1000, 10000)).to.approximately(63.39385422740764, 1e-9)
    expect(financial.NPER(0.1 / 12, -100, -1000)).to.approximately(-9.645090919837394, 1e-9)
    expect(financial.NPER('invalid', -100, -1000)).to.equal(error.value)
    expect(financial.NPER(0.1, 'invalid', -1000)).to.equal(error.value)
    expect(financial.NPER(0.1, -100, 'invalid')).to.equal(error.value)
    expect(financial.NPER(0.1, -100, -1000, 'invalid', 1)).to.equal(error.value)
    expect(financial.NPER(0.1, -100, -1000, 1, 'invalid')).to.equal(error.value)
    expect(financial.NPER(null, -100, -1000)).not.to.be.NaN
    expect(financial.NPER(0.1, null, -1000)).to.equal(error.num)
    expect(financial.NPER(0.1, -100, null)).not.to.be.NaN
    expect(financial.NPER(0.1, -100, -1000, null, 1)).not.to.be.NaN
    expect(financial.NPER(0.1, -100, -1000, 1, null)).not.to.be.NaN
    expect(financial.NPER(undefined, -100, -1000)).not.to.be.NaN
    expect(financial.NPER(0.1, undefined, -1000)).to.equal(error.num)
    expect(financial.NPER(0.1, -100, undefined)).not.to.be.NaN
    expect(financial.NPER(0.1, -100, -1000, undefined, 1)).not.to.be.NaN
    expect(financial.NPER(0.1, -100, -1000, 1, undefined)).not.to.be.NaN
    expect(financial.NPER(true, -100, -1000)).not.to.be.NaN
    expect(financial.NPER(0.1, true, -1000)).to.equal(error.num)
    expect(financial.NPER(0.1, -100, true)).not.to.be.NaN
    expect(financial.NPER(0.1, -100, -1000, true, 1)).not.to.be.NaN
    expect(financial.NPER(0.1, -100, -1000, 1, true)).not.to.be.NaN
    expect(financial.NPER('true', -100, -1000)).to.equal(error.value)
    expect(financial.NPER(0.1, 'true', -1000)).to.equal(error.value)
    expect(financial.NPER(0.1, -100, 'true')).to.equal(error.value)
    expect(financial.NPER(0.1, -100, -1000, 'true', 1)).to.equal(error.value)
    expect(financial.NPER(0.1, -100, -1000, 1, 'true')).to.equal(error.value)
    expect(financial.NPER(0.1, -100, -1000, 1, 1, 1)).to.equal(error.na)
    expect(financial.NPER(0.1, -100)).to.equal(error.na)
    expect(financial.NPER(0.1)).to.equal(error.na)
    expect(financial.NPER()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.NPER(err, -100, -1000, 1, 1)).to.equal(err)
      expect(financial.NPER(0.1, err, -1000, 1, 1)).to.equal(err)
      expect(financial.NPER(0.1, -100, err, 1, 1)).to.equal(err)
      expect(financial.NPER(0.1, -100, -1000, err, 1)).to.equal(err)
      expect(financial.NPER(0.1, -100, -1000, 1, err)).to.equal(err)
    })
  })

  it('NPV', () => {
    expect(financial.NPV(0.1, -10000, 2000, 4000, 8000)).to.approximately(1031.3503176012546, 1e-9)
    expect(financial.NPV('0.1', -10000, '2000', '4000', 8000)).to.approximately(1031.3503176012546, 1e-9)
    expect(financial.NPV(0.1, [-10000, 2000, 4000, 8000])).to.approximately(1031.3503176012546, 1e-9)
    expect(financial.NPV(0.1, [[-10000, 2000, 4000, 8000]])).to.approximately(1031.3503176012546, 1e-9)
    expect(financial.NPV(0.1, [[-10000], [2000], [4000], [8000]])).to.approximately(1031.3503176012546, 1e-9)
    expect(financial.NPV(0.1, [-75000])).to.approximately(-68181.81818181818, 1e-9)
    expect(financial.NPV(0.12, [12000, 15000, 18000, 21000, 24000])).to.approximately(62448.362521940246, 1e-9)
    expect(financial.NPV(undefined, [-10000, 2000, 4000, 8000])).to.approximately(4000, 1e-9)
    expect(financial.NPV(null, [-10000, 2000, 4000, 8000])).to.approximately(4000, 1e-9)
    expect(financial.NPV(false, [-10000, 2000, 4000, 8000])).to.approximately(4000, 1e-9)
    expect(financial.NPV(true, [-10000, 2000, 4000, 8000])).to.approximately(-3500, 1e-9)
    expect(financial.NPV('true', [-10000, 2000, 4000, 8000])).to.equal(error.value)
    expect(financial.NPV('invalid', [12000, 15000, 18000, 21000, 24000])).to.equal(error.value)
    expect(financial.NPV(0.1, [[-10000], [2000], [4000], ['string']])).to.equal(error.value)
    expect(financial.NPV(0.1, [[-10000], [2000], [4000], [true]])).not.to.be.NaN
    expect(financial.NPV(0.1, [[-10000], [2000], [4000], [false]])).not.to.be.NaN
    expect(financial.NPV(0.1, [[-10000], [2000], [4000], [null]])).not.to.be.NaN
    expect(financial.NPV(0.1, [[-10000], [2000], [4000], [undefined]])).not.to.be.NaN
    expect(financial.NPV([[0.1], [0.2]], -10000, 2000, 4000, 8000)).to.equal(error.value)
    expect(financial.NPV(0.1)).to.equal(error.na)
    expect(financial.NPV()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.NPV(err, -10000, 2000, 4000, 8000)).to.equal(err)
      expect(financial.NPV(0.1, err, 2000, 4000, 8000)).to.equal(err)
      expect(financial.NPV(0.1, [err, 2000, 4000, 8000])).to.equal(err)
      expect(financial.NPV(0.1, [[-10000, err, 4000, 8000]])).to.equal(err)
      expect(financial.NPV(0.1, [[10000], [2000], [err]])).to.equal(err)
    })
  })

  // TODO: implement
  it('ODDFPRICE', () => {
    expect(financial.ODDFPRICE).to.throw('ODDFPRICE is not implemented')
  })

  // TODO: implement
  it('ODDFYIELD', () => {
    expect(financial.ODDFYIELD).to.throw('ODDFYIELD is not implemented')
  })

  // TODO: implement
  it('ODDLPRICE', () => {
    expect(financial.ODDLPRICE).to.throw('ODDLPRICE is not implemented')
  })

  // TODO: implement
  it('ODDLYIELD', () => {
    expect(financial.ODDLYIELD).to.throw('ODDLYIELD is not implemented')
  })

  it('PDURATION', () => {
    expect(financial.PDURATION(0.1, 1000, 2000)).to.approximately(7.272540897341714, 1e-9)
    expect(financial.PDURATION(0.12, 2000, 2200)).to.approximately(0.8410066661, 1e-9)
    expect(financial.PDURATION(0.12, 2000, 2200)).to.approximately(0.8410066661, 1e-9)
    expect(financial.PDURATION('0.12', '2000', '2200')).to.approximately(0.8410066661, 1e-9)
    expect(financial.PDURATION('Hello World!', 1000, 2000)).to.equal(error.value)
    expect(financial.PDURATION(0.1, 'Hello World!', 2000)).to.equal(error.value)
    expect(financial.PDURATION(0.1, 1000, 'Hello World!')).to.equal(error.value)
    expect(financial.PDURATION(0, 1000, 2000)).to.equal(error.num)
    expect(financial.PDURATION(-0.1, 1000, 2000)).to.equal(error.num)
    expect(financial.PDURATION(0.1, -1000, 2000)).to.equal(error.num)
    expect(financial.PDURATION(0.1, 1000, -2000)).to.equal(error.num)
    expect(financial.PDURATION(undefined, 1000, 2000)).to.equal(error.num)
    expect(financial.PDURATION(0.1, undefined, 2000)).to.equal(error.num)
    expect(financial.PDURATION(0.1, 1000, undefined)).to.equal(error.num)
    expect(financial.PDURATION(null, 1000, 2000)).to.equal(error.num)
    expect(financial.PDURATION(0.1, null, 2000)).to.equal(error.num)
    expect(financial.PDURATION(0.1, 1000, null)).to.equal(error.num)
    expect(financial.PDURATION(true, 1000, 2000)).not.to.be.NaN
    expect(financial.PDURATION(0.1, true, 2000)).not.to.be.NaN
    expect(financial.PDURATION(0.1, 1000, true)).not.to.be.NaN
    expect(financial.PDURATION([[1], [2]], 1000, 2000)).to.equal(error.value)
    expect(financial.PDURATION(0.1, [[1], [2]], 2000)).to.equal(error.value)
    expect(financial.PDURATION(0.1, 1000, [[1], [2]])).to.equal(error.value)
    expect(financial.PDURATION(-0.1, 1000, 2000)).to.equal(error.num)
    expect(financial.PDURATION(0.1, 1000, 2000, 1)).to.equal(error.na)
    expect(financial.PDURATION(0.1, 1000)).to.equal(error.na)
    expect(financial.PDURATION(0.1)).to.equal(error.na)
    expect(financial.PDURATION()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.PDURATION(err, 1000, 2000)).to.equal(err)
      expect(financial.PDURATION(0.1, err, 2000)).to.equal(err)
      expect(financial.PDURATION(0.1, 1000, err)).to.equal(err)
    })
  })

  it('PMT', () => {
    expect(financial.PMT(0.06 / 12, 18 * 12, 0, 50000)).to.approximately(-129.0811608679973, 1e-9)
    expect(financial.PMT(0.1 / 12, 2 * 12, 100000, 1000000, 1)).to.approximately(-42075.45683100995, 1e-9)
    expect(financial.PMT(0.1 / 12, 2 * 12, 100000, 1000000)).to.approximately(-42426.08563793503, 1e-9)
    expect(financial.PMT(0.1 / 12, 2 * 12, 0, 1000000)).to.approximately(-37811.59300418336, 1e-9)
    expect(financial.PMT(0.1 / 12, 2 * 12, 100000)).to.approximately(-4614.49263375167, 1e-9)
    expect(financial.PMT(0, 2 * 12, 100000)).to.approximately(-4166.666666666667, 1e-9)
    expect(financial.PMT(0.06 / 12, 18 * 12, '0', '50000')).to.approximately(-129.0811608679973, 1e-9)
    expect(financial.PMT('0', '24', '100000')).to.approximately(-4166.666666666667, 1e-9)
    expect(financial.PMT('invalid', 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 'invalid', 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, 'invalid', 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, 100000, 'invalid', 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, 100000, 1000000, 'invalid')).to.equal(error.value)
    expect(financial.PMT('true', 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 'true', 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, 'true', 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, 100000, 'true', 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, 100000, 1000000, 'true')).to.equal(error.value)
    expect(financial.PMT(undefined, 12, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, undefined, 100000, 1000000, 1)).to.equal(error.num)
    expect(financial.PMT(0.1, 12, undefined, 1000000, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, 12, 100000, undefined, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, 12, 100000, 1000000, undefined)).not.to.be.NaN
    expect(financial.PMT(null, 12, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, null, 100000, 1000000, 1)).to.equal(error.num)
    expect(financial.PMT(0.1, 12, null, 1000000, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, 12, 100000, null, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, 12, 100000, 1000000, null)).not.to.be.NaN
    expect(financial.PMT(true, 12, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, true, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, 12, true, 1000000, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, 12, 100000, true, 1)).not.to.be.NaN
    expect(financial.PMT(0.1, 12, 100000, 1000000, true)).not.to.be.NaN
    expect(financial.PMT([[1], [2]], 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, [[1], [2]], 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, [[1], [2]], 1000000, 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, 100000, [[1], [2]], 1)).to.equal(error.value)
    expect(financial.PMT(0.1, 12, 100000, 1000000, [[1], [2]])).to.equal(error.value)
    expect(financial.PMT(0.1 / 12, 2 * 12, 100000, 1000000, 1, 1)).to.equal(error.na)
    expect(financial.PMT(0.1 / 12, 2 * 12)).to.equal(error.na)
    expect(financial.PMT(0.1 / 12)).to.equal(error.na)
    expect(financial.PMT()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.PMT(err, 12, 100000, 1000000, 1)).to.equal(err)
      expect(financial.PMT(0.1, err, 100000, 1000000, 1)).to.equal(err)
      expect(financial.PMT(0.1, 12, err, 1000000, 1)).to.equal(err)
      expect(financial.PMT(0.1, 12, 100000, err, 1)).to.equal(err)
      expect(financial.PMT(0.1, 12, 100000, 1000000, err)).to.equal(err)
    })
  })

  it('PPMT', () => {
    expect(financial.PPMT(0.1 / 12, 1, 2 * 12, 2000)).to.approximately(-75.62318600836673, 10e-9)
    expect(financial.PPMT(0.08, 10, 10, 200000)).to.approximately(-27598.05346242135, 10e-9)
    expect(financial.PPMT('0.08', '10', '10', '200000')).to.approximately(-27598.05346242135, 10e-9)
    expect(financial.PPMT(0.1 / 12, 6, 2 * 12, 100000, 1000000, 0)).to.approximately(-43354.909209775076, 1e-9)
    expect(financial.PPMT(0.1 / 12, 6, 2 * 12, 100000, 1000000, 1)).to.approximately(-42996.60417498356, 1e-9)
    expect(financial.PPMT(0.1 / 12, 6, 2 * 12, 100000, 1000000)).to.approximately(-43354.909209775076, 1e-9)
    expect(financial.PPMT(0.1 / 12, 6, 2 * 12, 0, 1000000)).to.approximately(-39413.55382706825, 1e-9)
    expect(financial.PPMT(0.1 / 12, 6, 2 * 12, 100000)).to.approximately(-3941.355382706826, 1e-9)
    expect(financial.PPMT('invalid', 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 'invalid', 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 'invalid', 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 100000, 'invalid', 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 100000, 1000000, 'invalid')).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 100000, 1000000, 1, 'invalid')).to.equal(error.value)
    expect(financial.PPMT('true', 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 'true', 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 'true', 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 100000, 'true', 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 100000, 1000000, 'true')).to.equal(error.value)
    expect(financial.PPMT(undefined, 12, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, undefined, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, undefined, 1000000, 1)).to.equal(error.num)
    expect(financial.PPMT(0.1, 12, 100000, undefined, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, 100000, 1000000, undefined)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, 100000, 1000000, 1, undefined)).not.to.be.NaN
    expect(financial.PPMT(null, 12, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, null, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, null, 1000000, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, 100000, null, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, 100000, 1000000, null)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, 100000, 1000000, 1, null)).not.to.be.NaN
    expect(financial.PPMT(true, 12, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, true, 100000, 1000000, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, true, 1000000, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, 100000, true, 1)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, 100000, 1000000, true)).not.to.be.NaN
    expect(financial.PPMT(0.1, 12, 100000, 1000000, 1, true)).not.to.be.NaN
    expect(financial.PPMT([[1], [2]], 12, 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, [[1], [2]], 100000, 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, [[1], [2]], 1000000, 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 100000, [[1], [2]], 1)).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 100000, 1000000, [[1], [2]])).to.equal(error.value)
    expect(financial.PPMT(0.1, 12, 100000, 1000000, 1, [[1], [2]])).to.equal(error.value)
    expect(financial.PPMT(0.1 / 12, 2 * 12, 100000, 1000000, 1, 1, 1)).to.equal(error.na)
    expect(financial.PPMT(0.1 / 12, 2 * 12, 100000)).to.equal(error.na)
    expect(financial.PPMT(0.1 / 12, 2 * 12)).to.equal(error.na)
    expect(financial.PPMT(0.1 / 12)).to.equal(error.na)
    expect(financial.PPMT()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.PPMT(err, 12, 100000, 1000000, 1)).to.equal(err)
      expect(financial.PPMT(0.1, err, 100000, 1000000, 1)).to.equal(err)
      expect(financial.PPMT(0.1, 12, err, 1000000, 1)).to.equal(err)
      expect(financial.PPMT(0.1, 12, 100000, err, 1)).to.equal(err)
      expect(financial.PPMT(0.1, 12, 100000, 1000000, err)).to.equal(err)
      expect(financial.PPMT(0.1, 12, 100000, 1000000, 1, err)).to.equal(err)
    })
  })

  // TODO: implement
  it('PRICE', () => {
    expect(financial.PRICE).to.throw('PRICE is not implemented')
  })

  describe('PRICEDISC', () => {
    it('should calculate the price of a discounted security', () => {
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, 0)).to.approximately(99.72555556, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, 1)).to.approximately(99.72931507, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, 2)).to.approximately(99.72555556, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, 3)).to.approximately(99.72931507, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, 4)).to.approximately(99.73611111, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '12/28/2023', 0.044, 100, 0)).to.approximately(95.68555556, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '12/28/2023', 0.044, 100, 1)).to.approximately(95.69643836, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '12/28/2023', 0.044, 100, 2)).to.approximately(95.63666667, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '12/28/2023', 0.044, 100, 3)).to.approximately(95.69643836, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '12/28/2023', 0.044, 100, 4)).to.approximately(95.68555556, 1e-8)
      expect(financial.PRICEDISC('01/05/2023', '12/28/2023', '0.044', '100', '4')).to.approximately(95.68555556, 1e-8)
    })

    it('should throw an error if input is out-of-bounds', () => {
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', -1, 100, 1)).to.equal(error.num)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, -1, 1)).to.equal(error.num)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, -1)).to.equal(error.num)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, 5)).to.equal(error.num)
    })

    it('should throw an error if input is of unsupported type/format', () => {
      expect(financial.PRICEDISC('Hello World!', '01/31/2023', 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', 'Hello World!', 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 'Hello World!', 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 'Hello World!', 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, 'Hello World!')).to.equal(error.value)
      expect(financial.PRICEDISC(undefined, '01/31/2023', 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', undefined, 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', undefined, 100, 1)).to.equal(error.num)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, undefined, 1)).to.equal(error.num)
      expect(financial.PRICEDISC(null, '01/31/2023', 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', null, 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', null, 100, 1)).to.equal(error.num)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, null, 1)).to.equal(error.num)
      expect(financial.PRICEDISC(true, '01/31/2023', 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', true, 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('true', '01/31/2023', 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', 'true', 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC([[1], [2]], '01/31/2023', 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', [[1], [2]], 0.038, 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', [[1], [2]], 100, 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, [[1], [2]], 1)).to.equal(error.value)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, [[1], [2]])).to.equal(error.value)
    })

    it('should throw an error if maturity is earlier than settlement', () => {
      expect(financial.PRICEDISC('01/05/2023', '01/04/2023', 0.038, 100, 1)).to.equal(error.value)
    })

    Object.values(error).forEach((err) => {
      expect(financial.PRICEDISC(err, '01/31/2023', 0.038, 100, 0)).to.equal(err)
      expect(financial.PRICEDISC('01/05/2023', err, 0.038, 100, 0)).to.equal(err)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', err, 100, 0)).to.equal(err)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, err, 0)).to.equal(err)
      expect(financial.PRICEDISC('01/05/2023', '01/31/2023', 0.038, 100, err)).to.equal(err)
    })
  })

  // TODO: implement
  it('PRICEMAT', () => {
    expect(financial.PRICEMAT).to.throw('PRICEMAT is not implemented')
  })

  it('PV', () => {
    expect(financial.PV(0.1 / 12, 24, 1000, 10000, 0)).to.approximately(-29864.950264779152, 1e-9)
    expect(financial.PV(0.1 / 12, 24, 1000, 10000, 1)).to.approximately(-30045.54072173169, 1e-9)
    expect(financial.PV('0', '24', '1000', '10000', '1')).to.equal(-34000)
    expect(financial.PV('invalid', 24, 1000, 10000, 1)).to.equal(error.value)
    expect(financial.PV(0, 'invalid', 1000, 10000, 1)).to.equal(error.value)
    expect(financial.PV(0, 24, 'invalid', 10000, 1)).to.equal(error.value)
    expect(financial.PV(0, 24, 1000, 'invalid', 1)).to.equal(error.value)
    expect(financial.PV(0, 24, 1000, 10000, 'invalid')).to.equal(error.value)
    expect(financial.PV(undefined, 24, 1000, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, undefined, 1000, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, undefined, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, 1000, undefined, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, 1000, 10000, undefined)).not.to.be.NaN
    expect(financial.PV(null, 24, 1000, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, null, 1000, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, null, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, 1000, null, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, 1000, 10000, null)).not.to.be.NaN
    expect(financial.PV(true, 24, 1000, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, true, 1000, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, true, 10000, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, 1000, true, 1)).not.to.be.NaN
    expect(financial.PV(0, 24, 1000, 10000, true)).not.to.be.NaN
    expect(financial.PV(0, 24, 1000, 10000, 1, 2)).to.equal(error.na)
    expect(financial.PV(0, 24)).to.equal(error.na)
    expect(financial.PV(0)).to.equal(error.na)
    expect(financial.PV()).to.equal(error.na)
    expect(financial.PV([[1], [2]], 24, 1000, 10000, 1)).to.equal(error.value)
    expect(financial.PV(0, [[1], [2]], 1000, 10000, 1)).to.equal(error.value)
    expect(financial.PV(0, 24, [[1], [2]], 10000, 1)).to.equal(error.value)
    expect(financial.PV(0, 24, 1000, [[1], [2]], 1)).to.equal(error.value)
    expect(financial.PV(0, 24, 1000, 10000, [[1], [2]])).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.PV(err, 24, 1000, 10000, 1)).to.equal(err)
      expect(financial.PV(0, err, 1000, 10000, 1)).to.equal(err)
      expect(financial.PV(0, 24, err, 10000, 1)).to.equal(err)
      expect(financial.PV(0, 24, 1000, err, 1)).to.equal(err)
      expect(financial.PV(0, 24, 1000, 10000, err)).to.equal(err)
    })
  })

  it('RATE', () => {
    expect(financial.RATE(2 * 12, -1000, -10000, 100000)).to.approximately(0.06517891177181546, 1e-9)
    expect(financial.RATE(2 * 12, -1000, -10000, 100000, 0, 0.1)).to.approximately(0.06517891177181533, 1e-9)
    expect(financial.RATE(2 * 12, -1000, -10000, 100000, 0, 0.75)).to.approximately(0.0651789117718154, 1e-9)
    expect(financial.RATE(2 * 12, -1000, -10000, 100000, 0, 0.065)).to.approximately(0.06517891177181524, 1e-9)
    expect(financial.RATE(2 * 12, -1000, -10000, 100000, 1, 0.1)).to.approximately(0.0632395800018064, 1e-9)
    expect(financial.RATE(4 * 12, -200, 8000)).to.approximately(0.007701472, 1e-9)
    expect(financial.RATE(37, -7200, -40000, 4477839, 0)).to.approximately(0.10646164, 1e-9)
    expect(financial.RATE('24', '-1000', '-10000', '100000')).to.approximately(0.06517891177181546, 1e-9)
    expect(financial.RATE('invalid', -1000, -10000, 100000, 1, 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, 'invalid', -10000, 100000, 1, 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, -1000, 'invalid', 100000, 1, 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, -1000, -10000, 'invalid', 1, 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, -1000, -10000, 100000, 'invalid', 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, -1000, -10000, 100000, 1, 'invalid')).to.equal(error.value)
    expect(financial.RATE(undefined, -1000, -10000, 100000, 1, 1e-11)).to.equal(error.na)
    expect(financial.RATE(24, undefined, -10000, 100000, 1, 1e-11)).not.to.be.NaN
    expect(financial.RATE(24, -1000, undefined, 100000, 1, 1e-11)).to.equal(error.na)
    expect(financial.RATE(null, -1000, -10000, 100000, 1, 1e-11)).to.equal(error.num)
    expect(financial.RATE(24, null, -10000, 100000, 1, 1e-11)).to.equal(error.num)
    expect(financial.RATE(24, -1000, null, 100000, 1, 1e-11)).to.equal(error.num)
    expect(financial.RATE(24, -1000, -10000, null, 1, 1e-11)).not.to.be.NaN
    expect(financial.RATE(24, -1000, -10000, 100000, null, 1e-11)).not.to.be.NaN
    expect(financial.RATE(24, -1000, -10000, 100000, 1, null)).not.to.be.NaN
    expect(financial.RATE(true, -1000, -10000, 100000, 1, 1e-11)).not.to.be.NaN
    expect(financial.RATE(24, true, -10000, 100000, 1, 1e-11)).not.to.be.NaN
    expect(financial.RATE(24, -1000, true, 100000, 1, 1e-11)).not.to.be.NaN
    expect(financial.RATE(24, -1000, -10000, true, 1, 1e-11)).not.to.be.NaN
    expect(financial.RATE(24, -1000, -10000, 100000, true, 1e-11)).not.to.be.NaN
    expect(financial.RATE(24, -1000, -10000, 100000, 1, true)).not.to.be.NaN
    expect(financial.RATE([[1], [2]], -1000, -10000, 100000, 1, 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, [[1], [2]], -10000, 100000, 1, 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, -1000, [[1], [2]], 100000, 1, 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, -1000, -10000, [[1], [2]], 1, 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, -1000, -10000, 100000, [[1], [2]], 1e-11)).to.equal(error.value)
    expect(financial.RATE(24, -1000, -10000, 100000, 1, [[1], [2]])).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.RATE(err, -1000, -10000, 100000, 1, 0.1)).to.equal(err)
      expect(financial.RATE(24, err, -10000, 100000, 1, 0.1)).to.equal(err)
      expect(financial.RATE(24, -1000, err, 100000, 1, 0.1)).to.equal(err)
      expect(financial.RATE(24, -1000, -10000, err, 1, 0.1)).to.equal(err)
      expect(financial.RATE(24, -1000, -10000, 100000, err, 0.1)).to.equal(err)
      expect(financial.RATE(24, -1000, -10000, 100000, 1, err)).to.equal(err)
    })
  })

  // TODO: implement
  it('RECEIVED', () => {
    expect(financial.RECEIVED).to.throw('RECEIVED is not implemented')
  })

  it('RRI', () => {
    expect(financial.RRI(8, 10000, 11000)).to.approximately(0.011985024140399592, 1e-9)
    expect(financial.RRI('8', '10000', '11000')).to.approximately(0.011985024140399592, 1e-9)
    expect(financial.RRI(NaN, 10000, 11000)).to.equal(error.value)
    expect(financial.RRI(0, 10000, 11000)).to.equal(error.num)
    expect(financial.RRI(undefined, 10000, 11000)).to.equal(error.na)
    expect(financial.RRI(8, undefined, 11000)).to.equal(error.na)
    expect(financial.RRI(8, 10000, undefined)).to.equal(error.na)
    expect(financial.RRI(null, 10000, 11000)).to.equal(error.num)
    expect(financial.RRI(8, null, 11000)).to.equal(error.num)
    expect(financial.RRI(8, 10000, null)).not.to.be.NaN
    expect(financial.RRI(true, 10000, 11000)).not.to.be.NaN
    expect(financial.RRI(8, true, 11000)).not.to.be.NaN
    expect(financial.RRI(8, 10000, true)).not.to.be.NaN
    expect(financial.RRI(false, 10000, 11000)).to.equal(error.num)
    expect(financial.RRI(8, false, 11000)).to.equal(error.num)
    expect(financial.RRI(8, 10000, false)).not.to.be.NaN
    expect(financial.RRI([[1, 2]], 10000, 11000)).to.equal(error.value)
    expect(financial.RRI(8, [[1, 2]], 11000)).to.equal(error.value)
    expect(financial.RRI(8, 10000, [[1, 2]])).to.equal(error.value)
    expect(financial.RRI(8, 10000, 11000, 1)).to.equal(error.na)
    expect(financial.RRI(8, 10000)).to.equal(error.na)
    expect(financial.RRI(8)).to.equal(error.na)
    expect(financial.RRI()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.RRI(err, 10000, 11000)).to.equal(err)
      expect(financial.RRI(8, err, 11000)).to.equal(err)
      expect(financial.RRI(8, 10000, err)).to.equal(err)
    })
  })

  it('SLN', () => {
    expect(financial.SLN(30000, 7500, 10)).to.equal(2250)
    expect(financial.SLN('30000', '7500', '10')).to.equal(2250)
    expect(financial.SLN(NaN, 7500, 10)).to.equal(error.value)
    expect(financial.SLN(30000, 7500, 0)).to.equal(error.num)
    expect(financial.SLN(undefined, 10000, 11000)).to.equal(error.na)
    expect(financial.SLN(8, undefined, 11000)).to.equal(error.na)
    expect(financial.SLN(8, 10000, undefined)).to.equal(error.na)
    expect(financial.SLN(null, 10000, 11000)).not.to.be.NaN
    expect(financial.SLN(8, null, 11000)).not.to.be.NaN
    expect(financial.SLN(8, 10000, null)).to.equal(error.num)
    expect(financial.SLN(true, 10000, 11000)).not.to.be.NaN
    expect(financial.SLN(8, true, 11000)).not.to.be.NaN
    expect(financial.SLN(8, 10000, true)).not.to.be.NaN
    expect(financial.SLN(false, 10000, 11000)).not.to.be.NaN
    expect(financial.SLN(8, false, 11000)).not.to.be.NaN
    expect(financial.SLN(8, 10000, false)).to.equal(error.num)
    expect(financial.SLN([[1, 2]], 10000, 11000)).to.equal(error.value)
    expect(financial.SLN(8, [[1, 2]], 11000)).to.equal(error.value)
    expect(financial.SLN(8, 10000, [[1, 2]])).to.equal(error.value)
    expect(financial.SLN(8, 10000, 11000, 1)).to.equal(error.na)
    expect(financial.SLN(8, 10000)).to.equal(error.na)
    expect(financial.SLN(8)).to.equal(error.na)
    expect(financial.SLN()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.SLN(err, 10000, 11000)).to.equal(err)
      expect(financial.SLN(8, err, 11000)).to.equal(err)
      expect(financial.SLN(8, 10000, err)).to.equal(err)
    })
  })

  it('SYD', () => {
    expect(financial.SYD(30, 7, 10, 1)).to.approximately(4.181818181818182, 1e-9)
    expect(financial.SYD(NaN, 7, 10, 1)).to.equal(error.value)
    expect(financial.SYD(30, 7, 0, 1)).to.equal(error.num)
    expect(financial.SYD(30, 7, 10, 11)).to.equal(error.num)
    expect(financial.SYD(undefined, 10000, 11000, 1)).not.to.be.NaN
    expect(financial.SYD(8, undefined, 11000, 1)).not.to.be.NaN
    expect(financial.SYD(8, 10000, undefined, 1)).to.equal(error.num)
    expect(financial.SYD(8, 10000, 11000, undefined)).to.equal(error.num)
    expect(financial.SYD(null, 10000, 11000, 1)).not.to.be.NaN
    expect(financial.SYD(8, null, 11000, 1)).not.to.be.NaN
    expect(financial.SYD(8, 10000, null, 1)).to.equal(error.num)
    expect(financial.SYD(8, 10000, 11000, null)).to.equal(error.num)
    expect(financial.SYD(true, 10000, 11000, 1)).not.to.be.NaN
    expect(financial.SYD(8, true, 11000, 1)).not.to.be.NaN
    expect(financial.SYD(8, 10000, true, 1)).not.to.be.NaN
    expect(financial.SYD(8, 10000, 1, true)).not.to.be.NaN
    expect(financial.SYD(false, 10000, 11000, 1)).not.to.be.NaN
    expect(financial.SYD(8, false, 11000, 1)).not.to.be.NaN
    expect(financial.SYD(8, 10000, false, 1)).to.equal(error.num)
    expect(financial.SYD(8, 10000, 11000, false)).to.equal(error.num)
    expect(financial.SYD([[1, 2]], 10000, 11000, 1)).to.equal(error.value)
    expect(financial.SYD(8, [[1, 2]], 11000, 1)).to.equal(error.value)
    expect(financial.SYD(8, 10000, [[1, 2]], 1)).to.equal(error.value)
    expect(financial.SYD(8, 10000, 11000, [[1, 2]])).to.equal(error.value)
    expect(financial.SYD(8, 10000, 11000, 1, 1)).to.equal(error.na)
    expect(financial.SYD(8, 10000, 11000)).to.equal(error.na)
    expect(financial.SYD(8, 10000)).to.equal(error.na)
    expect(financial.SYD(8)).to.equal(error.na)
    expect(financial.SYD()).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(financial.SYD(err, 10000, 11000, 1)).to.equal(err)
      expect(financial.SYD(8, err, 11000, 1)).to.equal(err)
      expect(financial.SYD(8, 10000, err, 1)).to.equal(err)
      expect(financial.SYD(8, 10000, 11000, err)).to.equal(err)
    })
  })

  it('TBILLEQ', () => {
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008', 0.0914)).to.approximately(0.09412721351734614, 1e-9)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008', '0.0914')).to.approximately(0.09412721351734614, 1e-9)
    expect(financial.TBILLEQ('invalid date', '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLEQ('03/31/2008', 'invalid date', 0.0914)).to.equal(error.value)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008', 'invalid')).to.equal(error.value)
    expect(financial.TBILLEQ(undefined, '06/01/2008', 0.0914)).to.equal(error.na)
    expect(financial.TBILLEQ('03/31/2008', undefined, 0.0914)).to.equal(error.na)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008', undefined)).to.equal(error.na)
    expect(financial.TBILLEQ(null, '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLEQ('03/31/2008', null, 0.0914)).to.equal(error.value)
    expect(financial.TBILLEQ(true, '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLEQ('03/31/2008', true, 0.0914)).to.equal(error.value)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008', null)).to.equal(error.num)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008', 0)).to.equal(error.num)
    expect(financial.TBILLEQ('09/31/2008', '06/01/2008', 0.0914)).to.equal(error.num)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2009', 0.0914)).to.equal(error.num)
    expect(financial.TBILLEQ('03/31/2008', '03/31/2009', 0.0914)).to.approximately(0.10199146427959986, 1e-9)
    expect(financial.TBILLEQ('03/31/2008', '04/01/2009', 0.0914)).to.equal(error.num)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008', 0.0914, 1)).to.equal(error.na)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008')).to.equal(error.na)
    expect(financial.TBILLEQ()).to.equal(error.na)
    expect(financial.TBILLEQ([[1], [2]], '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLEQ('03/31/2008', [[1], [2]], 0.0914)).to.equal(error.value)
    expect(financial.TBILLEQ('03/31/2008', '06/01/2008', [[1], [2]])).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.TBILLEQ(err, '06/01/2008', 0.0914)).to.equal(err)
      expect(financial.TBILLEQ('03/31/2008', err, 0.0914)).to.equal(err)
      expect(financial.TBILLEQ('03/31/2008', '06/01/2008', err)).to.equal(err)
    })
  })

  it('TBILLPRICE', () => {
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', 0.0914)).to.approximately(98.45127777777778, 1e-9)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', '0.0914')).to.approximately(98.45127777777778, 1e-9)
    expect(financial.TBILLPRICE('invalid date', '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLPRICE('03/31/2008', 'invalid date', 0.0914)).to.equal(error.value)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', 'invalid')).to.equal(error.value)
    expect(financial.TBILLPRICE(undefined, '06/01/2008', 0.0914)).to.equal(error.na)
    expect(financial.TBILLPRICE('03/31/2008', undefined, 0.0914)).to.equal(error.na)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', undefined)).to.equal(error.na)
    expect(financial.TBILLPRICE(null, '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLPRICE('03/31/2008', null, 0.0914)).to.equal(error.value)
    expect(financial.TBILLPRICE(true, '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLPRICE('03/31/2008', true, 0.0914)).to.equal(error.value)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', null)).to.equal(error.num)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', 0)).to.equal(error.num)
    expect(financial.TBILLPRICE('09/31/2008', '06/01/2008', 0.0914)).to.equal(error.num)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2009', 0.0914)).to.equal(error.num)
    expect(financial.TBILLPRICE('03/31/2008', '04/01/2009', 0.0914)).to.equal(error.num)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', 0.0914, 1)).to.equal(error.na)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008')).to.equal(error.na)
    expect(financial.TBILLPRICE()).to.equal(error.na)
    expect(financial.TBILLPRICE([[1], [2]], '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLPRICE('03/31/2008', [[1], [2]], 0.0914)).to.equal(error.value)
    expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', [[1], [2]])).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.TBILLPRICE(err, '06/01/2008', 0.0914)).to.equal(err)
      expect(financial.TBILLPRICE('03/31/2008', err, 0.0914)).to.equal(err)
      expect(financial.TBILLPRICE('03/31/2008', '06/01/2008', err)).to.equal(err)
    })
  })

  it('TBILLYIELD', () => {
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2008', 98.45127777777778)).to.approximately(
      0.09283779963354702,
      1e-9
    )
    expect(financial.TBILLYIELD('03/31/2008', '03/31/2009', 0.0914)).to.approximately(1093.0919037199128, 1e-9)
    expect(financial.TBILLYIELD('invalid date', '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLYIELD('03/31/2008', 'invalid date', 0.0914)).to.equal(error.value)
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2008', 'invalid')).to.equal(error.value)
    expect(financial.TBILLYIELD(undefined, '06/01/2008', 0.0914)).to.equal(error.na)
    expect(financial.TBILLYIELD('03/31/2008', undefined, 0.0914)).to.equal(error.na)
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2008', undefined)).to.equal(error.na)
    expect(financial.TBILLYIELD(null, '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLYIELD('03/31/2008', null, 0.0914)).to.equal(error.value)
    expect(financial.TBILLYIELD(true, '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLYIELD('03/31/2008', true, 0.0914)).to.equal(error.value)
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2008', null)).to.equal(error.num)
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2008', 0)).to.equal(error.num)
    expect(financial.TBILLYIELD('09/31/2008', '06/01/2008', 0.0914)).to.equal(error.num)
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2009', 0.0914)).to.equal(error.num)
    expect(financial.TBILLYIELD('03/31/2008', '04/01/2009', 0.0914)).to.equal(error.num)
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2008', 0.0914, 1)).to.equal(error.na)
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2008')).to.equal(error.na)
    expect(financial.TBILLYIELD()).to.equal(error.na)
    expect(financial.TBILLYIELD([[1], [2]], '06/01/2008', 0.0914)).to.equal(error.value)
    expect(financial.TBILLYIELD('03/31/2008', [[1], [2]], 0.0914)).to.equal(error.value)
    expect(financial.TBILLYIELD('03/31/2008', '06/01/2008', [[1], [2]])).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(financial.TBILLYIELD(err, '06/01/2008', 0.0914)).to.equal(err)
      expect(financial.TBILLYIELD('03/31/2008', err, 0.0914)).to.equal(err)
      expect(financial.TBILLYIELD('03/31/2008', '06/01/2008', err)).to.equal(err)
    })
  })

  // TODO: implement
  it('VDB', () => {
    expect(financial.VDB).to.throw('VDB is not implemented')
  })

  // TODO: support for all browsers
  it('XIRR', () => {
    const values = [-10000, 2750, 4250, 3250, 2750]
    const dates = ['01/jan/08', '01/mar/08', '30/oct/08', '15/feb/09', '01/apr/09']
    expect(financial.XIRR(values, dates, 0.1)).to.approximately(0.373362535, 1e-4)
    // all positive
    values[0] = -values[0]
    expect(financial.XIRR(values, dates, 0.1)).to.equal(error.num)
    expect(financial.XIRR(values, dates, 'invalid')).to.equal(error.value)
  })

  it('XNPV', () => {
    const values = [-10000, 2750, 4250, 3250, 2750]
    const dates = ['01/01/2008', '03/01/2008', '10/30/2008', '02/15/2009', '04/01/2009']
    expect(financial.XNPV(0.09, values, dates)).to.approximately(2086.6718943024616, 1e-1)
    expect(financial.XNPV('invalid', values, dates)).to.equal(error.value)
  })

  // TODO: implement
  it('YIELD', () => {
    expect(financial.YIELD).to.throw('YIELD is not implemented')
  })

  // TODO: implement
  it('YIELDDISC', () => {
    expect(financial.YIELDDISC).to.throw('YIELDDISC is not implemented')
  })

  // TODO: implement
  it('YIELDMAT', () => {
    expect(financial.YIELDMAT).to.throw('YIELDMAT is not implemented')
  })
})
