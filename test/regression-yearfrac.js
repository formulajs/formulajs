import { expect } from 'chai'
import * as financial from '../src/financial.js'
import * as dateTime from '../src/date-time.js'

describe('Regression: yearfrac', () => {
  it('YEARFRAC follows the Excel day-count bases', () => {
    // basis 1: only an end date of February 29 (not January 29) uses a 366-day year
    expect(dateTime.YEARFRAC('3/15/2023', '1/29/2024', 1)).to.equal(320 / 365)
    expect(dateTime.YEARFRAC('3/15/2023', '2/29/2024', 1)).to.equal(351 / 366)
    // basis 4 (European 30/360): the 31st counts as the 30th
    expect(dateTime.YEARFRAC('1/1/2023', '1/31/2023', 4)).to.equal(29 / 360)
    expect(dateTime.YEARFRAC('3/1/2023', '8/31/2023', 4)).to.equal(179 / 360)
    // a clock change (autumn, daylight saving) inside the period does not add a day
    expect(dateTime.YEARFRAC('9/1/2023', '12/1/2023', 3)).to.equal(91 / 365)
    expect(dateTime.YEARFRAC('9/1/2023', '12/1/2023', 2)).to.equal(91 / 360)
    expect(dateTime.YEARFRAC('10/15/2025', '1/15/2026', 1)).to.equal(92 / 365)
    // order of the dates does not matter
    expect(dateTime.YEARFRAC('10/24/2026', '1/31/2025', 0)).to.equal(dateTime.YEARFRAC('1/31/2025', '10/24/2026', 0))
    expect(dateTime.YEARFRAC('10/24/2026', '1/31/2025', 1)).to.equal(dateTime.YEARFRAC('1/31/2025', '10/24/2026', 1))
  })

  it('ACCRINT basis 4 counts the 31st as the 30th', () => {
    expect(financial.ACCRINT('3/1/2023', '9/1/2023', '8/31/2023', 0.05, 1000000, 2, 4)).to.approximately(
      (1000000 * 0.05 * 179) / 360,
      1e-6
    )
  })
})
