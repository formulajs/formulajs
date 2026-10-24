import { expect } from 'chai'
import * as statistical from '../src/statistical.js'
import * as error from '../src/utils/error.js'
import * as financial from '../src/financial.js'

describe('Regression: blanks', () => {
  it('ignores empty cells (null) in ranges, as Excel does', () => {
    // paired ranges: a pair with an empty cell is skipped
    const y = [10, 12, null, 15, 18, 21]
    const x = [1, 2, 3, null, 5, 6]
    const yy = [10, 12, 18, 21]
    const xx = [1, 2, 5, 6]
    expect(statistical.CORREL(x, y)).to.approximately(statistical.CORREL(xx, yy), 1e-12)
    expect(statistical.CORREL(xx, yy)).to.approximately(0.9975694083904585, 1e-12)
    expect(statistical.PEARSON(x, y)).to.approximately(0.9975694083904585, 1e-12)
    expect(statistical.RSQ(y, x)).to.approximately(0.9951447245564893, 1e-12)
    expect(statistical.SLOPE(y, x)).to.approximately(2.1470588235294117, 1e-12)
    expect(statistical.INTERCEPT(y, x)).to.approximately(7.735294117647059, 1e-12)
    expect(statistical.FORECAST(7, y, x)).to.approximately(22.764705882352942, 1e-12)
    expect(statistical.STEYX(y, x)).to.approximately(0.4372373160976031, 1e-12)
    expect(statistical.COVARIANCE.P(x, y)).to.approximately(9.125, 1e-12)
    expect(statistical.COVARIANCE.S(x, y)).to.approximately(12.166666666666666, 1e-12)
    // single ranges: empty cells are skipped, zeros are kept
    const d = [3, null, 5, 7, null, 9]
    expect(statistical.MEDIAN(d)).to.equal(6)
    expect(statistical.PERCENTILE.INC(d, 0.25)).to.approximately(4.5, 1e-12)
    expect(statistical.GEOMEAN(d)).to.approximately(5.544443371329424, 1e-12)
    expect(statistical.HARMEAN(d)).to.approximately(5.080645161290323, 1e-12)
    expect(statistical.SKEW(d)).to.approximately(0, 1e-12)
    expect(statistical.KURT([3, null, 5, 7, null, 9, 4])).to.approximately(-0.9453032104637337, 1e-12)
    expect(statistical.DEVSQ(d)).to.approximately(20, 1e-12)
    expect(statistical.SMALL(d, 1)).to.equal(3)
    expect(statistical.TRIMMEAN(d, 0)).to.approximately(6, 1e-12)
    expect(statistical.MODE.SNGL([1, null, 2, null, 2, 3])).to.equal(2)
    expect(statistical.MEDIAN([3, 0, 5, 7, 0, 9])).to.equal(4)
  })
  it('preserves zeros, undefined blanks, input arrays and paired errors', () => {
    const x = [0, 1, undefined, 3]
    const y = [2, 4, 99, 8]
    expect(statistical.CORREL(x, y)).to.approximately(1, 1e-12)
    expect(x).to.deep.equal([0, 1, undefined, 3])
    expect(y).to.deep.equal([2, 4, 99, 8])
    expect(statistical.MEDIAN([0, undefined, 2, 6])).to.equal(2)
    expect(statistical.CORREL([1, 2, error.num], [3, 4, null])).to.equal(error.value)
    expect(statistical.CORREL([1, 2, null], [3, 4, error.num])).to.equal(error.value)
  })
  it('NPV ignores empty cells among the values', () => {
    expect(financial.NPV(0.1, [-100, null, 60, 70])).to.approximately(financial.NPV(0.1, [-100, 60, 70]), 1e-12)
    expect(financial.NPV(0.1, [-100, 0, 60, 70])).to.approximately(-100 / 1.1 + 60 / 1.331 + 70 / 1.4641, 1e-12)
  })
})
