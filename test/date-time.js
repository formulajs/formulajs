import 'should'

import * as dateTime from '../src/date-time.js'
import * as error from '../src/utils/error.js'

describe('Date & Time', () => {
  describe('DATE', () => {
    it('should thrown an error in case of malformed input', () => {
      dateTime.DATE(10, 1, 1).getFullYear().should.equal(1910)
      dateTime.DATE(-1, 1, 1).should.equal(error.num)
      dateTime.DATE('invalid').should.equal(error.value)
    })

    it('should create date', () => {
      const date = dateTime.DATE(1900, 1, 1)
      date.getFullYear().should.equal(1900)
      date.getMonth().should.equal(1 - 1)
      date.getDate().should.equal(1)
    })

    it('should accept negative day number', () => {
      const date = dateTime.DATE(1900, 1, -1)
      date.getFullYear().should.equal(1899)
      date.getMonth().should.equal(12 - 1)
      date.getDate().should.equal(30)
    })

    it('should accept negative month number', () => {
      const date = dateTime.DATE(2000, -36, 1)
      date.getFullYear().should.equal(1996)
      date.getMonth().should.equal(12 - 1)
      date.getDate().should.equal(1)
    })

    xit('should be Excel behaviour, but we do not want to recreate it', () => {
      dateTime.DATE(1899, 1, 1).getFullYear().should.equal(3799)
    })
  })

  it('DATEDIF', () => {
    dateTime.DATEDIF('1/1/2001', '1/1/2003', 'Y').should.equal(2)
    dateTime.DATEDIF('1/1/2001', '3/1/2003', 'Y').should.equal(2)
    dateTime.DATEDIF('6/1/2001', '8/15/2002', 'D').should.equal(440)
    dateTime.DATEDIF('2007-01-01', '2007-01-10', 'd').should.equal(9)
    dateTime.DATEDIF('2007-01-01', '2007-01-31', 'm').should.equal(0)
    dateTime.DATEDIF('2007-01-01', '2007-02-01', 'm').should.equal(1)
    dateTime.DATEDIF('2007-01-01', '2007-02-28', 'm').should.equal(1)
    dateTime.DATEDIF('2007-01-01', '2007-12-31', 'd').should.equal(364)
    dateTime.DATEDIF('2007-01-01', '2007-01-31', 'y').should.equal(0)
    dateTime.DATEDIF('2007-01-01', '2008-07-01', 'd').should.equal(547)
    dateTime.DATEDIF('2007-01-01', '2008-07-01', 'm').should.equal(18)
    dateTime.DATEDIF('2007-01-01', '2008-07-01', 'ym').should.equal(6)
    dateTime.DATEDIF('2007-01-01', '2008-07-01', 'yd').should.equal(182)
    dateTime.DATEDIF('2008-01-01', '2009-07-01', 'yd').should.equal(181)
    dateTime.DATEDIF('2007-01-01', '2007-01-31', 'md').should.equal(30)
    dateTime.DATEDIF('2007-02-01', '2009-03-01', 'md').should.equal(0)
    dateTime.DATEDIF('2008-02-01', '2009-03-01', 'md').should.equal(0)
    dateTime.DATEDIF('2008-02-01', '2009-03-01', 'md').should.equal(0)
    dateTime.DATEDIF('1959-07-20', '2020-05-04', 'md').should.equal(14)
  })

  it('DATEVALUE', () => {
    dateTime.DATEVALUE('1/1/1900').should.deepEqual(new Date(1900, 0, 1))
    dateTime.DATEVALUE('12/31/9999').should.deepEqual(new Date(9999, 11, 31))
    dateTime.DATEVALUE('foo bar').should.equal(error.value)
    dateTime.DATEVALUE(1).should.equal(error.value)
  })

  it('DAY', () => {
    dateTime.DAY(1).should.equal(1)
    dateTime.DAY(2958465).should.equal(31)
    dateTime.DAY('1').should.equal(1)
    dateTime.DAY('1/1/1900').should.equal(1)
    dateTime.DAY(new Date(1900, 0, 1)).should.equal(1)
    dateTime.DAY(-1).should.equal(error.num)
    dateTime.DAY('a').should.equal(error.value)
  })

  it('DAYS', () => {
    dateTime.DAYS(2, 1).should.equal(1)
    dateTime.DAYS('1/2/1900', '1/1/1900').should.equal(1)
    dateTime.DAYS(new Date(1900, 1, 2), new Date(1900, 1, 1)).should.equal(1)
    dateTime.DAYS('a', 1).should.equal(error.value)
    dateTime.DAYS(1, 'a').should.equal(error.value)
    dateTime.DAYS('1/1/1900 00:20', '1/1/1900 01:30').should.equal(0)
    dateTime.DAYS(dateTime.NOW(), dateTime.TODAY()).should.equal(0)
  })

  it('DAYS360', () => {
    dateTime.DAYS360('1/1/1901', '1/2/1901', true).should.equal(1)
    dateTime.DAYS360('1/1/1901', '12/31/1901', true).should.equal(359)
    dateTime.DAYS360('1/1/1901', '1/1/1902', true).should.equal(360)
    dateTime.DAYS360('1/1/1901', '2/1/1901', true).should.equal(30)
    dateTime.DAYS360('1/1/1901', '1/2/1901', false).should.equal(1)
    dateTime.DAYS360('1/1/1901', '1/2/1901').should.equal(1)
    dateTime.DAYS360('1/1/1901', '12/31/1901', false).should.equal(360)
    dateTime.DAYS360('1/1/1901', '12/31/1901').should.equal(360)
    dateTime.DAYS360('1/1/1901', '1/1/1902', false).should.equal(360)
    dateTime.DAYS360('1/1/1901', '2/1/1901', false).should.equal(30)
    dateTime.DAYS360('1/30/1901', '12/31/1901', false).should.equal(330)
    dateTime.DAYS360('1/1/1901', 'a').should.equal(error.value)
    dateTime.DAYS360('a', '1/2/1901').should.equal(error.value)
    dateTime.DAYS360('1/1/1901', '1/2/1901', 'a').should.equal(error.value)
  })

  it('EDATE', () => {
    dateTime.EDATE('a', 0).should.equal(error.value)
    dateTime.EDATE('1/1/1900', 'a').should.equal(error.value)
    dateTime.EDATE(new Date(2011, 0, 23), 1).should.deepEqual(new Date(2011, 1, 23))
  })

  it('EOMONTH', () => {
    dateTime.EOMONTH('a', 0).should.equal(error.value)
    dateTime.EOMONTH('1/1/1900', 'a').should.equal(error.value)
    dateTime.EOMONTH('1/1/2005', 12).should.deepEqual(new Date(2006, 0, 31))
    dateTime.EOMONTH(new Date(2011, 0, 2), 1).should.deepEqual(new Date(2011, 1, 28))
  })

  it('HOUR', () => {
    dateTime.HOUR('1/1/1900').should.equal(0)
    dateTime.HOUR('1/1/1900 1:00').should.equal(1)
    // dateTime.HOUR('1:00').should.equal(1);
    // dateTime.HOUR('0.75').should.equal(18);
    dateTime.HOUR('a').should.equal(error.value)
  })

  it('INTERVAL', () => {
    dateTime.INTERVAL(undefined).should.equal(error.value)
    dateTime.INTERVAL(10000000).should.equal('P3M25DT17H46M40S')
    dateTime.INTERVAL('10000000').should.equal('P3M25DT17H46M40S')
  })

  it('ISOWEEKNUM', () => {
    dateTime.ISOWEEKNUM('1/1/1901').should.equal(1)
    dateTime.ISOWEEKNUM('1/8/1901').should.equal(2)
    dateTime.ISOWEEKNUM('12/29/1901').should.equal(52)
    dateTime.ISOWEEKNUM('6/6/1902').should.equal(23)
    dateTime.ISOWEEKNUM('a').should.equal(error.value)
    dateTime.ISOWEEKNUM(new Date('2021-02-04T00:00:00.123Z')).should.equal(5)
  })

  it('MINUTE', () => {
    dateTime.MINUTE('1/1/1901').should.equal(0)
    dateTime.MINUTE('1/1/1901 1:01').should.equal(1)
    // dateTime.MINUTE('1:01').should.equal(1);
    dateTime.MINUTE('a').should.equal(error.value)
  })

  it('MONTH', () => {
    dateTime.MONTH('1/1/1900').should.equal(1)
    dateTime.MONTH('12/1/1900').should.equal(12)
    dateTime.MONTH('a').should.equal(error.value)
  })

  it('NETWORKDAYS', () => {
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-04').should.equal(1)
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-05').should.equal(2)
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-06').should.equal(3)
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-07').should.equal(3)
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-08').should.equal(3)
    dateTime.NETWORKDAYS('2013-12-04', '2013-12-09').should.equal(4)
    dateTime.NETWORKDAYS('2013-12-07', '2013-12-07').should.equal(0)
    dateTime.NETWORKDAYS('2013-12-07', '2013-12-08').should.equal(0)
    dateTime.NETWORKDAYS('12/4/2013', '12/4/2013').should.equal(1)
    dateTime.NETWORKDAYS('12/4/2013', '1/4/2014', '1/1/2014').should.equal(22)
    dateTime.NETWORKDAYS('12/4/2013', '1/4/2014', ['1/1/2014', '1/2/2014', '1/3/2014']).should.equal(20)
    dateTime.NETWORKDAYS('a', '1/2/1900').should.equal(error.value)
    dateTime.NETWORKDAYS('1/1/1900', 'a').should.equal(error.value)
    dateTime.NETWORKDAYS('1/1/1900', '2/1/1900', 'a').should.equal(error.value)
  })

  it('NETWORKDAYS.INTL', () => {
    dateTime.NETWORKDAYS.INTL('12/4/2013', '12/5/2013').should.equal(2)
    dateTime.NETWORKDAYS.INTL('12/8/2013', '12/9/2013', 2).should.equal(0)
    dateTime.NETWORKDAYS.INTL('12/4/2013', '12/4/2013', -1).should.equal(error.value)
    dateTime.NETWORKDAYS.INTL('1/1/2021', '2/24/2021', 'smlkml').should.equal(error.value)
    dateTime.NETWORKDAYS.INTL('1/1/2021', '2/24/2021', '00011').should.equal(error.value)
    dateTime.NETWORKDAYS.INTL('1/1/2021', '2/24/2021', '0001101').should.equal(32)
    dateTime.NETWORKDAYS.INTL('11/01/2021', '11/30/2021', '1110111').should.equal(4)
  })

  it('NOW', () => {
    dateTime.NOW().should.instanceof(Date)
  })

  it('SECOND', () => {
    dateTime.SECOND('1/1/1900').should.equal(0)
    dateTime.SECOND('1/1/1900 1:00:01').should.equal(1)
    dateTime.SECOND('a').should.equal(error.value)
  })

  it('TIME', () => {
    dateTime.TIME(0, 0, 0).should.equal(0)
    dateTime.TIME(1, 1, 1).should.approximately(0.04237268518518519, 1e-9)
    dateTime.TIME(-1, -1, -1).should.equal(error.num)
    dateTime.TIME('invalid').should.equal(error.value)
  })

  it('TIMEVALUE', () => {
    dateTime.TIMEVALUE('1/1/1900 00:00:00').should.equal(0)
    dateTime.TIMEVALUE('1/1/1900 12:00:00').should.approximately(0.5, 1e-9)
    dateTime.TIMEVALUE('a').should.equal(error.value)
  })

  it('TODAY', () => {
    dateTime.TODAY().should.instanceof(Date)
    dateTime.TODAY().getHours().should.equal(0)
    dateTime.TODAY().getMinutes().should.equal(0)
    dateTime.TODAY().getSeconds().should.equal(0)
  })

  it('WEEKDAY', () => {
    dateTime.WEEKDAY('1/1/1901').should.equal(3)
    dateTime.WEEKDAY('1/1/1901', 2).should.equal(2)
    dateTime.WEEKDAY('a').should.equal(error.value)
  })

  it('WEEKNUM', () => {
    dateTime.WEEKNUM('1/1/1900').should.equal(1)
    dateTime.WEEKNUM('2/1/1900').should.equal(5)
    dateTime.WEEKNUM('2/1/1909', 2).should.equal(6)
    dateTime.WEEKNUM('1/1/1901', 21).should.equal(1)
    dateTime.WEEKNUM('a').should.equal(error.value)
  })

  it('WORKDAY', () => {
    dateTime.WORKDAY('1/1/1900', 1).getDate().should.equal(2)
    dateTime.WORKDAY('1/1/1900', 7).getDate().should.equal(10)
    dateTime.WORKDAY('1/1/1900', 2, '1/2/1900').getDate().should.equal(4)
    dateTime.WORKDAY('a', 1, '1/2/1900').should.equal(error.value)
    dateTime.WORKDAY('1/1/1900', 'a').should.equal(error.value)
    dateTime.WORKDAY('1/1/1900', 1, 'a').should.equal(error.value)
    dateTime.WORKDAY('1/1/1900', -1).should.equal(error.num)
  })

  it('WORKDAY.INTL', () => {
    dateTime.WORKDAY.INTL('1/1/1900', 1).getDate().should.equal(2)
    dateTime.WORKDAY.INTL('1/1/1905', 1, 2).getDate().should.equal(3)
    dateTime.WORKDAY.INTL('1/1/1900', 1, 'a').should.equal(error.value)
  })

  it('YEAR', () => {
    dateTime.YEAR('1/1/1900').should.equal(1900)
    dateTime.YEAR('a').should.equal(error.value)
  })

  it('YEARFRAC', () => {
    dateTime.YEARFRAC('1/1/1900', '1/2/1900').should.approximately(0.002777777777777778, 1e-3)
    dateTime.YEARFRAC('1/31/1900', '3/31/1900', 0).should.approximately(0.16666666666666666, 1e-3)
    dateTime.YEARFRAC('1/31/1900', '2/1/1900', 0).should.approximately(0.002777777777777778, 1e-3)
    dateTime.YEARFRAC('1/30/1900', '3/31/1900', 0).should.approximately(0.16666666666666666, 1e-3)

    dateTime.YEARFRAC('1/1/1900', '1/2/1900', 1).should.approximately(0.0027397260273972603, 1e-3)
    dateTime.YEARFRAC('1/1/1904', '1/1/1905', 1).should.equal(1)
    dateTime.YEARFRAC('5/1/1903', '5/1/1904', 1).should.equal(1)
    dateTime.YEARFRAC('1/1/1904', '1/2/1904', 1).should.approximately(0.00273224043715847, 1e-3)

    dateTime.YEARFRAC('1/1/1900', '1/2/1900', 2).should.approximately(0.002777777777777778, 1e-3)
    dateTime.YEARFRAC('1/1/1900', '1/2/1900', 3).should.approximately(0.0027397260273972603, 1e-3)
    dateTime.YEARFRAC('1/1/1900', '1/2/1900', 4).should.approximately(0.002777777777777778, 1e-3)
    dateTime.YEARFRAC('a', '1/2/1900').should.equal(error.value)
    dateTime.YEARFRAC('1/1/1900', 'a').should.equal(error.value)
  })
})
