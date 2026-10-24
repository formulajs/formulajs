import { expect } from 'chai'
import * as dateTime from '../src/date-time.js'

describe('Regression: networkdays', () => {
  it('NETWORKDAYS is negative when the end date comes first', () => {
    const holidays = ['11/26/2026', '12/25/2026', '1/1/2027']
    expect(dateTime.NETWORKDAYS('10/1/2026', '3/1/2027', holidays.slice())).to.equal(105)
    expect(dateTime.NETWORKDAYS('3/1/2027', '10/1/2026', holidays.slice())).to.equal(-105)
    expect(dateTime.NETWORKDAYS('12/9/2013', '12/4/2013')).to.equal(-4)
  })
})
