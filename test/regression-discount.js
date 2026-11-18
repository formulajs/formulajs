import { expect } from 'chai'
import * as financial from '../src/financial.js'

describe('Regression: discount', () => {
  it('DISC and PRICEDISC basis 1 use a 366-day year in a leap year', () => {
    expect(financial.DISC('2/1/2024', '8/1/2024', 97.5, 100, 1)).to.approximately((0.025 * 366) / 182, 1e-12)
    expect(financial.PRICEDISC('2/1/2024', '8/1/2024', 0.05, 100, 1)).to.approximately(100 - (5 * 182) / 366, 1e-10)
    expect(financial.DISC('2/1/2025', '8/1/2025', 97.5, 100, 1)).to.approximately((0.025 * 365) / 181, 1e-12)
  })
})
