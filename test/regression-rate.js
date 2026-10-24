import { expect } from 'chai'
import * as error from '../src/utils/error.js'
import * as financial from '../src/financial.js'

describe('Regression: rate', () => {
  it('RATE returns #NUM! instead of a non-converged iterate', () => {
    // 30-year weekly mortgage at 6.5 %: 300000 borrowed, 437.29 paid weekly
    const weekly = financial.PMT(0.065 / 52, 1560, 300000)
    const r = financial.RATE(1560, weekly, 300000)
    expect(r).to.equal(error.num)
    expect(financial.RATE(1560, weekly, 300000, 0, 0, 0.002)).to.approximately(0.065 / 52, 1e-12)
    const g = financial.RATE(300, financial.PMT(0.089 / 12, 300, 60000), 60000, 0, 0, 0.5)
    expect(g).to.equal(error.num)
    expect(financial.RATE(12, -1, 100, 0, 0, 1e100)).to.equal(error.num)
    expect(financial.RATE(360, financial.PMT(0.065 / 12, 360, 300000), 300000)).to.approximately(0.065 / 12, 1e-12)
  })
})
