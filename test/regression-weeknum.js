import { expect } from 'chai'
import * as error from '../src/utils/error.js'
import * as dateTime from '../src/date-time.js'

describe('Regression: weeknum', () => {
  it('WEEKNUM numbers weeks from the week that contains January 1', () => {
    // Microsoft examples
    expect(dateTime.WEEKNUM('3/9/2012')).to.equal(10)
    expect(dateTime.WEEKNUM('3/9/2012', 2)).to.equal(11)
    // 2023 starts on a Sunday: with Monday weeks, Jan 1 is week 1 and Jan 2-8 is week 2
    expect(dateTime.WEEKNUM('1/1/2023', 2)).to.equal(1)
    expect(dateTime.WEEKNUM('1/8/2023', 2)).to.equal(2)
    expect(dateTime.WEEKNUM('12/31/2023', 2)).to.equal(53)
    // return_type 11 = Monday ... 17 = Sunday
    expect(dateTime.WEEKNUM('3/15/2024', 11)).to.equal(11)
    expect(dateTime.WEEKNUM('3/15/2024', 12)).to.equal(12)
    expect(dateTime.WEEKNUM('3/15/2024', 17)).to.equal(11)
    expect(dateTime.WEEKNUM('1/8/2024', 16)).to.equal(2)
    expect(dateTime.WEEKNUM('1/8/2024', 3)).to.equal(error.num)
  })
})
