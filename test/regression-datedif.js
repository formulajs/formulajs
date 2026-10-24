import { expect } from 'chai'
import * as dateTime from '../src/date-time.js'

describe('Regression: datedif', () => {
  it('DATEDIF counts complete years and days ignoring years like Excel', () => {
    // Born on the 31st: the anniversary is not reached on the 30th of that month
    expect(dateTime.DATEDIF('1/31/1990', '1/30/2020', 'Y')).to.equal(29)
    expect(dateTime.DATEDIF('3/31/1985', '3/30/2026', 'Y')).to.equal(40)
    expect(dateTime.DATEDIF('1/31/1990', '1/31/2020', 'Y')).to.equal(30)
    // Same month: end day on or after start day -> days since this year's anniversary
    expect(dateTime.DATEDIF('5/10/2019', '5/20/2020', 'YD')).to.equal(10)
    expect(dateTime.DATEDIF('10/1/2025', '10/24/2026', 'YD')).to.equal(23)
    // Same month: end day before start day -> days since last year's anniversary
    expect(dateTime.DATEDIF('5/20/2019', '5/10/2020', 'YD')).to.equal(356)
  })
})
