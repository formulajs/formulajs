import { expect } from 'chai'

import * as dateTime from '../src/date-time.js'
import * as error from '../src/utils/error.js'

describe('Date & Time', () => {
  describe('DATE', () => {
    it('should thrown an error in case of malformed input', () => {
      expect(dateTime.DATE(10, 1, 1).getFullYear()).to.equal(1910)
      expect(dateTime.DATE(-1, 1, 1)).to.equal(error.num)
      expect(dateTime.DATE('invalid')).to.equal(error.value)
    })

    it('should create date', () => {
      const date = dateTime.DATE(1900, 1, 1)
      expect(date.getFullYear()).to.equal(1900)
      expect(date.getMonth()).to.equal(1 - 1)
      expect(date.getDate()).to.equal(1)
    })

    it('should accept negative day number', () => {
      const date = dateTime.DATE(1900, 1, -1)
      expect(date.getFullYear()).to.equal(1899)
      expect(date.getMonth()).to.equal(12 - 1)
      expect(date.getDate()).to.equal(30)
    })

    it('should accept negative month number', () => {
      const date = dateTime.DATE(2000, -36, 1)
      expect(date.getFullYear()).to.equal(1996)
      expect(date.getMonth()).to.equal(12 - 1)
      expect(date.getDate()).to.equal(1)
    })

    xit('should be Excel behaviour, but we do not want to recreate it', () => {
      expect(dateTime.DATE(1899, 1, 1).getFullYear()).to.equal(3799)
    })
  })

  it('DATEDIF', () => {
    expect(dateTime.DATEDIF('1/1/2001', '1/1/2003', 'Y')).to.equal(2)
    expect(dateTime.DATEDIF('1/1/2001', '3/1/2003', 'Y')).to.equal(2)
    expect(dateTime.DATEDIF('6/1/2001', '8/15/2002', 'D')).to.equal(440)
    expect(dateTime.DATEDIF('2007-01-01', '2007-01-10', 'd')).to.equal(9)
    expect(dateTime.DATEDIF('2007-01-01', '2007-01-31', 'm')).to.equal(0)
    expect(dateTime.DATEDIF('2007-01-01', '2007-02-01', 'm')).to.equal(1)
    expect(dateTime.DATEDIF('2007-01-01', '2007-02-28', 'm')).to.equal(1)
    expect(dateTime.DATEDIF('2007-01-01', '2007-12-31', 'd')).to.equal(364)
    expect(dateTime.DATEDIF('2007-01-01', '2007-01-31', 'y')).to.equal(0)
    expect(dateTime.DATEDIF('2007-01-01', '2008-07-01', 'd')).to.equal(547)
    expect(dateTime.DATEDIF('2007-01-01', '2008-07-01', 'm')).to.equal(18)
    expect(dateTime.DATEDIF('2007-01-01', '2008-07-01', 'ym')).to.equal(6)
    expect(dateTime.DATEDIF('2007-01-01', '2008-07-01', 'yd')).to.equal(182)
    expect(dateTime.DATEDIF('2008-01-01', '2009-07-01', 'yd')).to.equal(181)
    expect(dateTime.DATEDIF('2007-01-01', '2007-01-31', 'md')).to.equal(30)
    expect(dateTime.DATEDIF('2007-02-01', '2009-03-01', 'md')).to.equal(0)
    expect(dateTime.DATEDIF('2008-02-01', '2009-03-01', 'md')).to.equal(0)
    expect(dateTime.DATEDIF('2008-02-01', '2009-03-01', 'md')).to.equal(0)
    expect(dateTime.DATEDIF('1959-07-20', '2020-05-04', 'md')).to.equal(14)
  })

  it('DATEVALUE', () => {
    expect(dateTime.DATEVALUE('1/1/1900')).to.deep.equal(new Date(1900, 0, 1))
    expect(dateTime.DATEVALUE('12/31/9999')).to.deep.equal(new Date(9999, 11, 31))
    expect(dateTime.DATEVALUE('foo bar')).to.equal(error.value)
    expect(dateTime.DATEVALUE(1)).to.equal(error.value)
  })

  it('DAY', () => {
    expect(dateTime.DAY(1)).to.equal(1)
    expect(dateTime.DAY(2958465)).to.equal(31)
    expect(dateTime.DAY('1')).to.equal(1)
    expect(dateTime.DAY('1/1/1900')).to.equal(1)
    expect(dateTime.DAY(new Date(1900, 0, 1))).to.equal(1)
    expect(dateTime.DAY(-1)).to.equal(error.num)
    expect(dateTime.DAY('a')).to.equal(error.value)
  })

  it('DAYS', () => {
    expect(dateTime.DAYS(2, 1)).to.equal(1)
    expect(dateTime.DAYS('1/2/1900', '1/1/1900')).to.equal(1)
    expect(dateTime.DAYS(new Date(1900, 1, 2), new Date(1900, 1, 1))).to.equal(1)
    expect(dateTime.DAYS('a', 1)).to.equal(error.value)
    expect(dateTime.DAYS(1, 'a')).to.equal(error.value)
    expect(dateTime.DAYS('1/1/1900 00:20', '1/1/1900 01:30')).to.equal(0)
    expect(dateTime.DAYS(dateTime.NOW(), dateTime.TODAY())).to.equal(0)
  })

  it('DAYS360', () => {
    expect(dateTime.DAYS360('1/1/1901', '1/2/1901', true)).to.equal(1)
    expect(dateTime.DAYS360('1/1/1901', '12/31/1901', true)).to.equal(359)
    expect(dateTime.DAYS360('1/1/1901', '1/1/1902', true)).to.equal(360)
    expect(dateTime.DAYS360('1/1/1901', '2/1/1901', true)).to.equal(30)
    expect(dateTime.DAYS360('1/1/1901', '1/2/1901', false)).to.equal(1)
    expect(dateTime.DAYS360('1/1/1901', '1/2/1901')).to.equal(1)
    expect(dateTime.DAYS360('1/1/1901', '12/31/1901', false)).to.equal(360)
    expect(dateTime.DAYS360('1/1/1901', '12/31/1901')).to.equal(360)
    expect(dateTime.DAYS360('1/1/1901', '1/1/1902', false)).to.equal(360)
    expect(dateTime.DAYS360('1/1/1901', '2/1/1901', false)).to.equal(30)
    expect(dateTime.DAYS360('1/30/1901', '12/31/1901', false)).to.equal(330)
    expect(dateTime.DAYS360('1/1/1901', 'a')).to.equal(error.value)
    expect(dateTime.DAYS360('a', '1/2/1901')).to.equal(error.value)
    expect(dateTime.DAYS360('1/1/1901', '1/2/1901', 'a')).to.equal(error.value)
  })

  it('EDATE', () => {
    expect(dateTime.EDATE('a', 0)).to.equal(error.value)
    expect(dateTime.EDATE('1/1/1900', 'a')).to.equal(error.value)
    expect(dateTime.EDATE(new Date(2011, 0, 23), 1)).to.deep.equal(new Date(2011, 1, 23))
  })

  it('EOMONTH', () => {
    expect(dateTime.EOMONTH('a', 0)).to.equal(error.value)
    expect(dateTime.EOMONTH('1/1/1900', 'a')).to.equal(error.value)
    expect(dateTime.EOMONTH('1/1/2005', 12)).to.deep.equal(new Date(2006, 0, 31))
    expect(dateTime.EOMONTH(new Date(2011, 0, 2), 1)).to.deep.equal(new Date(2011, 1, 28))
  })

  it('HOUR', () => {
    expect(dateTime.HOUR('1/1/1900')).to.equal(0)
    expect(dateTime.HOUR('1/1/1900 1:00')).to.equal(1)
    // expect(dateTime.HOUR('1:00')).to.equal(1);
    // expect(dateTime.HOUR('0.75')).to.equal(18);
    expect(dateTime.HOUR('a')).to.equal(error.value)
  })

  it('ISOWEEKNUM', () => {
    expect(dateTime.ISOWEEKNUM('1/1/1901')).to.equal(1)
    expect(dateTime.ISOWEEKNUM('1/8/1901')).to.equal(2)
    expect(dateTime.ISOWEEKNUM('12/29/1901')).to.equal(52)
    expect(dateTime.ISOWEEKNUM('6/6/1902')).to.equal(23)
    expect(dateTime.ISOWEEKNUM('a')).to.equal(error.value)
    expect(dateTime.ISOWEEKNUM(new Date('2021-02-04T00:00:00.123Z'))).to.equal(5)
  })

  it('MINUTE', () => {
    expect(dateTime.MINUTE('1/1/1901')).to.equal(0)
    expect(dateTime.MINUTE('1/1/1901 1:01')).to.equal(1)
    // expect(dateTime.MINUTE('1:01')).to.equal(1);
    expect(dateTime.MINUTE('a')).to.equal(error.value)
  })

  it('MONTH', () => {
    expect(dateTime.MONTH('1/1/1900')).to.equal(1)
    expect(dateTime.MONTH('12/1/1900')).to.equal(12)
    expect(dateTime.MONTH('a')).to.equal(error.value)
  })

  it('NETWORKDAYS', () => {
    expect(dateTime.NETWORKDAYS('2013-12-04', '2013-12-04')).to.equal(1)
    expect(dateTime.NETWORKDAYS('2013-12-04', '2013-12-05')).to.equal(2)
    expect(dateTime.NETWORKDAYS('2013-12-04', '2013-12-06')).to.equal(3)
    expect(dateTime.NETWORKDAYS('2013-12-04', '2013-12-07')).to.equal(3)
    expect(dateTime.NETWORKDAYS('2013-12-04', '2013-12-08')).to.equal(3)
    expect(dateTime.NETWORKDAYS('2013-12-04', '2013-12-09')).to.equal(4)
    expect(dateTime.NETWORKDAYS('2013-12-07', '2013-12-07')).to.equal(0)
    expect(dateTime.NETWORKDAYS('2013-12-07', '2013-12-08')).to.equal(0)
    expect(dateTime.NETWORKDAYS('12/4/2013', '12/4/2013')).to.equal(1)
    expect(dateTime.NETWORKDAYS('12/4/2013', '1/4/2014', '1/1/2014')).to.equal(22)
    expect(dateTime.NETWORKDAYS('12/4/2013', '1/4/2014', ['1/1/2014', '1/2/2014', '1/3/2014'])).to.equal(20)
    expect(dateTime.NETWORKDAYS('a', '1/2/1900')).to.equal(error.value)
    expect(dateTime.NETWORKDAYS('1/1/1900', 'a')).to.equal(error.value)
    expect(dateTime.NETWORKDAYS('1/1/1900', '2/1/1900', 'a')).to.equal(error.value)
  })

  it('NETWORKDAYS.INTL', () => {
    expect(dateTime.NETWORKDAYS.INTL('12/4/2013', '12/5/2013')).to.equal(2)
    expect(dateTime.NETWORKDAYS.INTL('12/8/2013', '12/9/2013', 2)).to.equal(0)
    expect(dateTime.NETWORKDAYS.INTL('12/4/2013', '12/4/2013', -1)).to.equal(error.value)
    expect(dateTime.NETWORKDAYS.INTL('1/1/2021', '2/24/2021', 'smlkml')).to.equal(error.value)
    expect(dateTime.NETWORKDAYS.INTL('1/1/2021', '2/24/2021', '00011')).to.equal(error.value)
    expect(dateTime.NETWORKDAYS.INTL('1/1/2021', '2/24/2021', '0001101')).to.equal(32)
    expect(dateTime.NETWORKDAYS.INTL('11/01/2021', '11/30/2021', '1110111')).to.equal(4)
  })

  it('NOW', () => {
    expect(dateTime.NOW()).to.instanceof(Date)
  })

  it('SECOND', () => {
    expect(dateTime.SECOND('1/1/1900')).to.equal(0)
    expect(dateTime.SECOND('1/1/1900 1:00:01')).to.equal(1)
    expect(dateTime.SECOND('a')).to.equal(error.value)
  })

  it('TIME', () => {
    expect(dateTime.TIME(0, 0, 0)).to.equal(0)
    expect(dateTime.TIME(1, 1, 1)).to.approximately(0.04237268518518519, 1e-9)
    expect(dateTime.TIME(-1, -1, -1)).to.equal(error.num)
    expect(dateTime.TIME('invalid')).to.equal(error.value)
  })

  it('TIMEVALUE', () => {
    expect(dateTime.TIMEVALUE('1/1/1900 00:00:00')).to.equal(0)
    expect(dateTime.TIMEVALUE('1/1/1900 12:00:00')).to.approximately(0.5, 1e-9)
    expect(dateTime.TIMEVALUE('a')).to.equal(error.value)
  })

  it('TODAY', () => {
    expect(dateTime.TODAY()).to.instanceof(Date)
    expect(dateTime.TODAY().getHours()).to.equal(0)
    expect(dateTime.TODAY().getMinutes()).to.equal(0)
    expect(dateTime.TODAY().getSeconds()).to.equal(0)
  })

  it('WEEKDAY', () => {
    expect(dateTime.WEEKDAY('1/1/1901')).to.equal(3)
    expect(dateTime.WEEKDAY('1/1/1901', 2)).to.equal(2)
    expect(dateTime.WEEKDAY('a')).to.equal(error.value)
  })

  it('WEEKNUM', () => {
    expect(dateTime.WEEKNUM('1/1/1900')).to.equal(1)
    expect(dateTime.WEEKNUM('2/1/1900')).to.equal(5)
    expect(dateTime.WEEKNUM('2/1/1909', 2)).to.equal(6)
    expect(dateTime.WEEKNUM('1/1/1901', 21)).to.equal(1)
    expect(dateTime.WEEKNUM('a')).to.equal(error.value)
  })

  it('WORKDAY', () => {
    expect(dateTime.WORKDAY('1/1/1900', 1).getDate()).to.equal(2)
    expect(dateTime.WORKDAY('1/1/1900', 7).getDate()).to.equal(10)
    expect(dateTime.WORKDAY('1/1/1900', 2, '1/2/1900').getDate()).to.equal(4)
    expect(dateTime.WORKDAY('a', 1, '1/2/1900')).to.equal(error.value)
    expect(dateTime.WORKDAY('1/1/1900', 'a')).to.equal(error.value)
    expect(dateTime.WORKDAY('1/1/1900', 1, 'a')).to.equal(error.value)
    expect(dateTime.WORKDAY('1/1/1900', -1)).to.equal(error.num)
  })

  it('WORKDAY.INTL', () => {
    expect(dateTime.WORKDAY.INTL('1/1/1900', 1).getDate()).to.equal(2)
    expect(dateTime.WORKDAY.INTL('1/1/1905', 1, 2).getDate()).to.equal(3)
    expect(dateTime.WORKDAY.INTL('1/1/1900', 1, 'a')).to.equal(error.value)
  })

  it('YEAR', () => {
    expect(dateTime.YEAR('1/1/1900')).to.equal(1900)
    expect(dateTime.YEAR('a')).to.equal(error.value)
  })

  it('YEARFRAC', () => {
    expect(dateTime.YEARFRAC('1/1/1900', '1/2/1900')).to.approximately(0.002777777777777778, 1e-3)
    expect(dateTime.YEARFRAC('1/31/1900', '3/31/1900', 0)).to.approximately(0.16666666666666666, 1e-3)
    expect(dateTime.YEARFRAC('1/31/1900', '2/1/1900', 0)).to.approximately(0.002777777777777778, 1e-3)
    expect(dateTime.YEARFRAC('1/30/1900', '3/31/1900', 0)).to.approximately(0.16666666666666666, 1e-3)

    expect(dateTime.YEARFRAC('1/1/1900', '1/2/1900', 1)).to.approximately(0.0027397260273972603, 1e-3)
    expect(dateTime.YEARFRAC('1/1/1904', '1/1/1905', 1)).to.equal(1)
    expect(dateTime.YEARFRAC('5/1/1903', '5/1/1904', 1)).to.equal(1)
    expect(dateTime.YEARFRAC('1/1/1904', '1/2/1904', 1)).to.approximately(0.00273224043715847, 1e-3)

    expect(dateTime.YEARFRAC('1/1/1900', '1/2/1900', 2)).to.approximately(0.002777777777777778, 1e-3)
    expect(dateTime.YEARFRAC('1/1/1900', '1/2/1900', 3)).to.approximately(0.0027397260273972603, 1e-3)
    expect(dateTime.YEARFRAC('1/1/1900', '1/2/1900', 4)).to.approximately(0.002777777777777778, 1e-3)
    expect(dateTime.YEARFRAC('a', '1/2/1900')).to.equal(error.value)
    expect(dateTime.YEARFRAC('1/1/1900', 'a')).to.equal(error.value)
  })
})
