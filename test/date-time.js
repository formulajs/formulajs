import { expect } from 'chai'

import * as dateTime from '../src/date-time.js'
import * as error from '../src/utils/error.js'

describe('Date & Time', () => {
  describe('DATE', () => {
    it('should return an error in case of incorrect number of arguments', () => {
      expect(dateTime.DATE()).to.equal(error.na)
      expect(dateTime.DATE(5)).to.equal(error.na)
      expect(dateTime.DATE(5, 5)).to.equal(error.na)

      expect(dateTime.DATE(5, 5, 5, 5)).to.equal(error.na)
    })

    it('should thrown an error in case non-numeric strings', () => {
      expect(dateTime.DATE('df5', 1, 1)).to.equal(error.value)
      expect(dateTime.DATE(1, 'text', 1)).to.equal(error.value)
      expect(dateTime.DATE(1, 1, '1l')).to.equal(error.value)
    })

    it('should create date', () => {
      expect(dateTime.DATE(1900, 1, 1)).to.equal(1)

      expect(dateTime.DATE(1900, 2, 28)).to.equal(59)
      expect(dateTime.DATE(1900, 3, 1)).to.equal(61)

      expect(dateTime.DATE(0, 1, 1)).to.equal(1)

      expect(dateTime.DATE(1899, 12, 31)).to.equal(693962)
    })

    it('should accept negative values', () => {
      expect(dateTime.DATE(-1, 13, 1)).to.equal(1)
      expect(dateTime.DATE(2000, -1, 5)).to.equal(36469)
      expect(dateTime.DATE(2000, 5, -1)).to.equal(36645)
    })

    it('should return an error in case of sending an error', () => {
      expect(dateTime.DATE(error.calc, 1, 1)).to.equal(error.calc)
      expect(dateTime.DATE(1, error.data, 1)).to.equal(error.data)
      expect(dateTime.DATE(1, 1, error.div0)).to.equal(error.div0)
      expect(dateTime.DATE(error.name, error.na, error.div0)).to.equal(error.name)
    })

    it('should create a date with numeric strings', () => {
      expect(dateTime.DATE('1900', 12, 1)).to.equal(336)
      expect(dateTime.DATE(1900, '12', 1)).to.equal(336)
      expect(dateTime.DATE(1900, 12, '1')).to.equal(336)
    })

    it('should create a date with a boolean', () => {
      expect(dateTime.DATE(true, 5, 5)).to.equal(491)
      expect(dateTime.DATE(2000, false, 5)).to.equal(36499)
      expect(dateTime.DATE(2000, 5, true)).to.equal(36647)
    })

    it('should return an error in case of date before 00/01/1900', () => {
      expect(dateTime.DATE(-1, 1, 1)).to.equal(error.num)
      expect(dateTime.DATE(1900, 0, 1)).to.equal(error.num)
      expect(dateTime.DATE(1900, 1, -1)).to.equal(error.num)
    })
  })

  describe('DATEDIF', () => {
    it('Tests with the Y option', () => {
      expect(dateTime.DATEDIF(38046, 39141, 'Y')).to.equal(2)
      expect(dateTime.DATEDIF(38045, 39141, 'y')).to.equal(3)
    })

    it('Tests with the M option', () => {
      expect(dateTime.DATEDIF(38046, 39141, 'M')).to.equal(35)
      expect(dateTime.DATEDIF(38045, 39141, 'm')).to.equal(36)

      expect(dateTime.DATEDIF(38136, 39123, 'M')).to.equal(32)
      expect(dateTime.DATEDIF(38027, 39231, 'M')).to.equal(39)
    })

    it('Tests with the D option', () => {
      expect(dateTime.DATEDIF(38046, 39141, 'D')).to.equal(1095)
      expect(dateTime.DATEDIF(38045, 39141, 'D')).to.equal(1096)
    })

    it('Tests with strings representing dates', () => {
      expect(dateTime.DATEDIF('2004-02-29', 39141, 'D')).to.equal(1095)
      expect(dateTime.DATEDIF(38045, '2007-02-28', 'D')).to.equal(1096)
    })

    it('Tests with the MD option', () => {
      expect(dateTime.DATEDIF(91, 399, 'MD')).to.equal(2)
      expect(dateTime.DATEDIF(61, 425, 'md')).to.equal(27)
    })

    it('Tests with the YM option', () => {
      expect(dateTime.DATEDIF(64, 1130, 'YM')).to.equal(10)
      expect(dateTime.DATEDIF(34, 1432, 'ym')).to.equal(9)
    })

    it('Tests with the YD option', () => {
      expect(dateTime.DATEDIF(96, 1159, 'YD')).to.equal(333)
      expect(dateTime.DATEDIF(34, 1158, 'yd')).to.equal(29)
      expect(dateTime.DATEDIF(1526, 1890, 'Yd')).to.equal(364)
      expect(dateTime.DATEDIF(400, 3350, 'Yd')).to.equal(28)
    })

    it('tests with incorrect number of arguments', () => {
      expect(dateTime.DATEDIF()).to.equal(error.na)
      expect(dateTime.DATEDIF(96)).to.equal(error.na)
      expect(dateTime.DATEDIF(96, 1159)).to.equal(error.na)

      expect(dateTime.DATEDIF(96, 1159, 'YD', true)).to.equal(error.na)
    })

    it('Tests with different arguments than expected', () => {
      expect(dateTime.DATEDIF(null, 0, 'D')).to.equal(0)
      expect(dateTime.DATEDIF(false, '0', 'D')).to.equal(0)
      expect(dateTime.DATEDIF(true, 1, 'D')).to.equal(0)

      expect(dateTime.DATEDIF('', 1, 'D')).to.equal(error.value)
      expect(dateTime.DATEDIF(1, 'text', 'D')).to.equal(error.value)

      expect(dateTime.DATEDIF(1, 1, 1)).to.equal(error.num)
      expect(dateTime.DATEDIF(1, 1, 'text')).to.equal(error.num)
    })

    it('Test with end date less than start date', () => {
      expect(dateTime.DATEDIF(5, 1, 'D')).to.equal(error.num)
    })

    it('Test with invalid date', () => {
      expect(dateTime.DATEDIF(-1, 1, 'D')).to.equal(error.num)
      expect(dateTime.DATEDIF(5, -20, 'D')).to.equal(error.num)
    })
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
