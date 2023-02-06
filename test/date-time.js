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
    expect(dateTime.DATEVALUE('2022-01-01')).to.equal(44562)
    expect(dateTime.DATEVALUE('1900-01-01')).to.equal(1)
    expect(dateTime.DATEVALUE('1900-02-28')).to.equal(59)
    expect(dateTime.DATEVALUE('1900-03-01')).to.equal(61)
    // expect(dateTime.DATEVALUE('5-JUL')).to.equal(39634)

    expect(dateTime.DATEVALUE('2022-01-01L')).to.equal(error.value)
    expect(dateTime.DATEVALUE('test')).to.equal(error.value)
    expect(dateTime.DATEVALUE(1)).to.equal(error.value)
    expect(dateTime.DATEVALUE(true)).to.equal(error.value)
    expect(dateTime.DATEVALUE(false)).to.equal(error.value)
    expect(dateTime.DATEVALUE(null)).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(dateTime.DATEVALUE(err)).to.equal(err)
    })

    expect(dateTime.DATEVALUE()).to.equal(error.na)
    expect(dateTime.DATEVALUE('2022-01-01', true)).to.equal(error.na)
  })

  it('DAY', () => {
    expect(dateTime.DAY(1)).to.equal(1)
    expect(dateTime.DAY(2958465)).to.equal(31)
    expect(dateTime.DAY(76)).to.equal(dateTime.DAY(76.43))

    expect(dateTime.DAY('9999-12-31')).to.equal(31)

    expect(dateTime.DAY('1')).to.equal(1)
    expect(dateTime.DAY('10')).to.equal(10)

    expect(dateTime.DAY(-1)).to.equal(error.num)
    expect(dateTime.DAY('-10')).to.equal(error.num)

    expect(dateTime.DAY('true')).to.equal(error.value)
    expect(dateTime.DAY('a')).to.equal(error.value)
    expect(dateTime.DAY('')).to.equal(error.value)

    expect(dateTime.DAY(null)).to.equal(0)
    expect(dateTime.DAY(true)).to.equal(1)
    expect(dateTime.DAY(false)).to.equal(0)

    Object.values(error).forEach((err) => {
      expect(dateTime.DAY(err)).to.equal(err)
    })

    expect(dateTime.DAY()).to.equal(error.na)
    expect(dateTime.DAY(30, 4)).to.equal(error.na)
  })

  it('DAYS', () => {
    expect(dateTime.DAYS(36526, 1)).to.equal(36525)
    expect(dateTime.DAYS(1, '36526')).to.equal(-36525)
    expect(dateTime.DAYS(2, 1.16)).to.equal(dateTime.DAYS(2.37, 1))

    expect(dateTime.DAYS('2022-11-19', '2004-05-13')).to.equal(6764)

    expect(dateTime.DAYS(0, null)).to.equal(0)
    expect(dateTime.DAYS('0', false)).to.equal(0)
    expect(dateTime.DAYS(1, true)).to.equal(0)

    expect(dateTime.DAYS('a', 1)).to.equal(error.value)
    expect(dateTime.DAYS(1, 'a')).to.equal(error.value)
    expect(dateTime.DAYS('', 46)).to.equal(error.value)
    expect(dateTime.DAYS(46, '')).to.equal(error.value)

    expect(dateTime.DAYS('true', 1)).to.equal(error.value)
    expect(dateTime.DAYS(1, 'false')).to.equal(error.value)

    Object.values(error).forEach((err) => {
      expect(dateTime.DAYS(err, 0)).to.equal(err)
      expect(dateTime.DAYS(0, err)).to.equal(err)
    })

    expect(dateTime.DAYS()).to.equal(error.na)
    expect(dateTime.DAYS(1)).to.equal(error.na)
    expect(dateTime.DAYS(1, 1, 1)).to.equal(error.na)
  })

  it('DAYS360', () => {
    expect(dateTime.DAYS360(0, '0')).to.equal(0)
    expect(dateTime.DAYS360(false, null)).to.equal(0)
    expect(dateTime.DAYS360(1, true, true)).to.equal(0)

    expect(dateTime.DAYS360('2004-05-13', '2022-11-19')).to.equal(6666)

    expect(dateTime.DAYS360(36585, 36641)).to.equal(55)
    expect(dateTime.DAYS360(36585, 36641, true)).to.equal(56)

    expect(dateTime.DAYS360(36616, 36641)).to.equal(25)
    expect(dateTime.DAYS360(36616, 36641, true)).to.equal(25)

    expect(dateTime.DAYS360('2012-02-02', '2012-03-30')).to.equal(58)
    expect(dateTime.DAYS360('2008-03-31', '2008-06-01', false)).to.equal(61)

    expect(dateTime.DAYS360(36535, 36585)).to.equal(49)
    expect(dateTime.DAYS360(36535, 36585, true)).to.equal(49)

    expect(dateTime.DAYS360(36556, 36585)).to.equal(29)
    expect(dateTime.DAYS360(36556, 36585, true)).to.equal(29)

    expect(dateTime.DAYS360(36556, 36616)).to.equal(60)
    expect(dateTime.DAYS360(36556, 36616, true)).to.equal(60)

    expect(dateTime.DAYS360(36535, 36616)).to.equal(81)
    expect(dateTime.DAYS360(36535, 36616, true)).to.equal(80)

    expect(dateTime.DAYS360(36557, 36585)).to.equal(28)
    expect(dateTime.DAYS360(36557, 36585, true)).to.equal(28)

    expect(dateTime.DAYS360(36586, 36616)).to.equal(30)
    expect(dateTime.DAYS360(36586, 36616, true)).to.equal(29)

    expect(dateTime.DAYS360(36950, 36950)).to.equal(-2)
    expect(dateTime.DAYS360(36950, 36950, true)).to.equal(0)

    expect(dateTime.DAYS360(36585, 36585)).to.equal(-1)
    expect(dateTime.DAYS360(36585, 36585, true)).to.equal(0)

    expect(dateTime.DAYS360(36950, 40268)).to.equal(3270)
    expect(dateTime.DAYS360(36950, 40268, true)).to.equal(3272)

    expect(dateTime.DAYS360(34458, 36585)).to.equal(2095)
    expect(dateTime.DAYS360(34458, 36585, true)).to.equal(2095)

    Object.values(error).forEach((err) => {
      expect(dateTime.DAYS360(err, 0)).to.equal(err)
      expect(dateTime.DAYS360(0, err)).to.equal(err)
      expect(dateTime.DAYS360(err, 0, true)).to.equal(err)
      expect(dateTime.DAYS360(0, err, true)).to.equal(err)
      expect(dateTime.DAYS360(0, 0, err)).to.equal(err)
    })

    expect(dateTime.DAYS360(36950, 40268, 'true')).to.equal(3272)
    expect(dateTime.DAYS360(36950, 40268, 30)).to.equal(3272)

    expect(dateTime.DAYS360(34458, 36585, false)).to.equal(2095)
    expect(dateTime.DAYS360(34458, 36585, 'false')).to.equal(2095)
    expect(dateTime.DAYS360(34458, 36585, 0)).to.equal(2095)

    expect(dateTime.DAYS360(36950, 40268, '30')).to.equal(error.value)
    expect(dateTime.DAYS360(36950, 40268, 'text')).to.equal(error.value)
    expect(dateTime.DAYS360(36950, 40268, '')).to.equal(error.value)

    expect(dateTime.DAYS360(-1, 36585)).to.equal(error.num)
    expect(dateTime.DAYS360(3, -11)).to.equal(error.num)
    expect(dateTime.DAYS360('true', 36585)).to.equal(error.value)

    expect(dateTime.DAYS360()).to.equal(error.na)
    expect(dateTime.DAYS360(1)).to.equal(error.na)
    expect(dateTime.DAYS360(1, 1, 1, 1)).to.equal(error.na)
  })

  it('EDATE', () => {
    expect(dateTime.EDATE(1, 1)).to.equal(32)
    expect(dateTime.EDATE('32', 1)).to.equal(61)
    expect(dateTime.EDATE(4000, '-10')).to.equal(3697)

    expect(dateTime.EDATE('2022-01-01', '2022-01-01')).to.equal(1400888)

    expect(dateTime.EDATE(-1, 3)).to.equal(error.num)

    expect(dateTime.EDATE(null, 1)).to.equal(31)
    expect(dateTime.EDATE(1, null)).to.equal(1)

    expect(dateTime.EDATE(32.9999999999999, 1)).to.equal(61)
    expect(dateTime.EDATE(32, 1)).to.equal(61)

    expect(dateTime.EDATE(1, 32.9999999999999)).to.equal(975)
    expect(dateTime.EDATE(1, 32)).to.equal(975)

    expect(dateTime.EDATE(true, 5)).to.equal(error.value)
    expect(dateTime.EDATE(5, false)).to.equal(error.value)

    expect(dateTime.EDATE('a', 0)).to.equal(error.value)
    expect(dateTime.EDATE(0, '')).to.equal(error.value)

    Object.values(error).forEach((err, index, array) => {
      expect(dateTime.DAYS360(err, 0)).to.equal(err)
      expect(dateTime.DAYS360(0, err)).to.equal(err)
      expect(dateTime.DAYS360(err, array[(index + 1) % array.length])).to.equal(err)
    })

    expect(dateTime.EDATE()).to.equal(error.na)
    expect(dateTime.EDATE(1)).to.equal(error.na)
    expect(dateTime.EDATE(1, 1, true)).to.equal(error.na)
  })

  it('EOMONTH', () => {
    expect(dateTime.EOMONTH(1, 1)).to.equal(59)
    expect(dateTime.EOMONTH(4000, '-10')).to.equal(3712)
    expect(dateTime.EOMONTH('32', 1)).to.equal(91)

    expect(dateTime.EOMONTH('2022-01-01', '2022-01-01')).to.equal(1400918)

    expect(dateTime.EOMONTH(true, 30)).to.equal(error.value)
    expect(dateTime.EOMONTH(1, false)).to.equal(error.value)

    expect(dateTime.EOMONTH(-1, 5)).to.equal(error.num)

    expect(dateTime.EOMONTH('a', 0)).to.equal(error.value)
    expect(dateTime.EOMONTH(1, 'true')).to.equal(error.value)
    expect(dateTime.EOMONTH('', 2)).to.equal(error.value)

    Object.values(error).forEach((err, index, array) => {
      expect(dateTime.EOMONTH(err, 1)).to.equal(err)
      expect(dateTime.EOMONTH(1, err)).to.equal(err)
      expect(dateTime.EOMONTH(err, array[(index + 1) % array.length])).to.equal(err)
    })

    expect(dateTime.EOMONTH()).to.equal(error.na)
    expect(dateTime.EOMONTH(1)).to.equal(error.na)
    expect(dateTime.EOMONTH(1, 1, true)).to.equal(error.na)
  })

  it('HOUR', () => {
    expect(dateTime.HOUR('1900-01-01')).to.equal(0)
    expect(dateTime.HOUR('1900-01-01 01:00 GMT')).to.equal(1)
    expect(dateTime.HOUR('2022-01-01 13:00 GMT')).to.equal(13)

    expect(dateTime.HOUR('01:00')).to.equal(1)
    expect(dateTime.HOUR('11:00 AM')).to.equal(11)
    expect(dateTime.HOUR('09:00 PM')).to.equal(21)
    expect(dateTime.HOUR('13:15:30')).to.equal(13)
    expect(dateTime.HOUR('0.75')).to.equal(18)

    expect(dateTime.HOUR('')).to.equal(error.value)
    expect(dateTime.HOUR('a')).to.equal(error.value)
    expect(dateTime.HOUR('true')).to.equal(error.value)

    expect(dateTime.HOUR(1)).to.equal(0)
    expect(dateTime.HOUR(943)).to.equal(0)

    expect(dateTime.HOUR(null)).to.equal(0)
    expect(dateTime.HOUR(true)).to.equal(0)
    expect(dateTime.HOUR(false)).to.equal(0)

    expect(dateTime.HOUR(-1)).to.equal(error.num)
    expect(dateTime.HOUR('-1')).to.equal(error.num)

    expect(dateTime.HOUR()).to.equal(error.na)
    expect(dateTime.HOUR('2:30', '5:00')).to.equal(error.na)
  })

  it('ISOWEEKNUM', () => {
    expect(dateTime.ISOWEEKNUM(42009)).to.equal(2)

    // expect(dateTime.ISOWEEKNUM(1)).to.equal(52)
    // expect(dateTime.ISOWEEKNUM(true)).to.equal(52)

    expect(dateTime.ISOWEEKNUM(0)).to.equal(52)
    expect(dateTime.ISOWEEKNUM(null)).to.equal(52)
    expect(dateTime.ISOWEEKNUM(false)).to.equal(52)

    expect(dateTime.ISOWEEKNUM(-1)).to.equal(error.num)

    expect(dateTime.ISOWEEKNUM('')).to.equal(error.value)
    expect(dateTime.ISOWEEKNUM('true')).to.equal(error.value)
    expect(dateTime.ISOWEEKNUM('false')).to.equal(error.value)
    expect(dateTime.ISOWEEKNUM('a')).to.equal(error.value)

    expect(dateTime.ISOWEEKNUM('2017-01-01')).to.equal(52)

    expect(dateTime.ISOWEEKNUM(42736)).to.equal(52)
    expect(dateTime.ISOWEEKNUM(43101)).to.equal(1)
    expect(dateTime.ISOWEEKNUM(43466)).to.equal(1)
    expect(dateTime.ISOWEEKNUM(43831)).to.equal(1)
    expect(dateTime.ISOWEEKNUM(44197)).to.equal(53)
    expect(dateTime.ISOWEEKNUM(44562)).to.equal(52)
    expect(dateTime.ISOWEEKNUM(44927)).to.equal(52)

    Object.values(error).forEach((err) => {
      expect(dateTime.ISOWEEKNUM(err)).to.equal(err)
    })

    expect(dateTime.ISOWEEKNUM()).to.equal(error.na)
    expect(dateTime.ISOWEEKNUM(1, 1)).to.equal(error.na)
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
