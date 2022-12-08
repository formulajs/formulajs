import 'should'

import * as error from '../src/utils/error.js'
import * as text from '../src/text.js'

describe('Text', () => {
  it('ASC', () => {
    text.ASC.should.throw('ASC is not implemented')
  })

  it('BAHTTEXT', () => {
    text.BAHTTEXT.should.throw('BAHTTEXT is not implemented')
  })

  it('CHAR', () => {
    text.CHAR(65).should.equal('A')
    text.CHAR(255).should.equal('ÿ')
    text.CHAR(1000).should.equal('Ϩ')
    text.CHAR(undefined).should.equal(error.value)
    text.CHAR(error.na).should.equal(error.na)
    text.CHAR('invalid').should.equal(error.value)
  })

  it('CLEAN', () => {
    text.CLEAN(undefined).should.equal('')
    text.CLEAN(error.na).should.equal(error.na)
    text.CLEAN('Monthly Report').should.equal('Monthly Report')
  })

  it('CODE', () => {
    text.CODE().should.equal(error.value)
    text.CODE(undefined).should.equal(error.value)
    text.CODE(error.na).should.equal(error.na)
    text.CODE('A').should.equal(65)
    text.CODE('Ϩ').should.equal(1000)
  })

  it('CONCATENATE', () => {
    text.CONCATENATE('a', undefined, 'b').should.equal('ab')
    text.CONCATENATE('a', error.na, 'b').should.equal(error.na)
    text.CONCATENATE('hello', ' ', 'world').should.equal('hello world')
    text.CONCATENATE(['hello', ' my ', 'world']).should.equal('hello my world')
    text.CONCATENATE(1, 'one').should.equal('1one')
    text.CONCATENATE(true, 'yes').should.equal('TRUEyes')
    text.CONCATENATE(false, 'no').should.equal('FALSEno')
  })

  it('CONCAT', () => {
    text.CONCAT('a', undefined, 'b').should.equal('ab')
    text.CONCAT('a', error.na, 'b').should.equal(error.na)
    text.CONCAT('hello', ' ', 'world').should.equal('hello world')
    text.CONCAT(['hello', ' my ', 'world']).should.equal('hello my world')
    text.CONCAT(1, 'one').should.equal('1one')
    text.CONCAT(true, 'yes').should.equal('TRUEyes')
    text.CONCAT(false, 'no').should.equal('FALSEno')
  })

  it('DBCS', () => {
    text.DBCS.should.throw('DBCS is not implemented')
  })

  xit('DOLLAR', () => {
    text.DOLLAR(1234.567).should.equal('$1,234.57')
    text.DOLLAR(1234.567, -2).should.equal('$1,200')
    text.DOLLAR(-1234.567, -2).should.equal('$(1,200)')
    text.DOLLAR(-0.123, 4).should.equal('$(0.1230)')
    text.DOLLAR(-99.888).should.equal('$(99.89)')
    text.DOLLAR('invalid').should.equal(error.value)
  })

  it('EXACT', () => {
    text.EXACT(undefined, undefined).should.equal(true)
    text.EXACT(undefined, null).should.equal(true)
    text.EXACT(undefined, '').should.equal(true)
    text.EXACT(error.na, error.na).should.equal(error.na)
    text.EXACT('yes', 'yes').should.equal(true)
    text.EXACT('yes', 'no').should.equal(false)
    text.EXACT('yes', 'yes', 'yes').should.equal(error.na)
    text.EXACT().should.equal(error.na)
    text.EXACT('true', true).should.equal(true)
    text.EXACT('12', 12).should.equal(true)
    text.EXACT('Word', '0').should.equal(false)
  })

  it('FIND', () => {
    const data = 'Miriam McGovern'
    text.FIND(undefined, undefined).should.equal(1)
    text.FIND('M', data).should.equal(1)
    text.FIND('m', data).should.equal(6)
    text.FIND('M', data, 3).should.equal(8)
    text.FIND('M', undefined).should.equal(error.value)
    text.FIND('M').should.equal(error.na)
    text.FIND().should.equal(error.na)
    text.FIND(true, '12true').should.equal(3)
    text.FIND(12, '312').should.equal(2)
    text.FIND(12, 312).should.equal(2)
  })

  xit('FIXED', () => {
    text.FIXED(1234.567, 1).should.equal('1,234.6')
    text.FIXED(1234.567, -1).should.equal('1,230')
    text.FIXED(-1234.567, -1, true).should.equal('-1230')
    text.FIXED(44.332).should.equal('44.33')
    text.FIXED('invalid').should.equal(error.value)
  })

  it('HTML2TEXT', () => {
    text.HTML2TEXT().should.equal('')
    text.HTML2TEXT(undefined).should.equal('')
    text.HTML2TEXT(error.na).should.equal(error.na)
    text.HTML2TEXT('').should.equal('')
    text.HTML2TEXT('<i>Hello</i>').should.equal('Hello')
    text.HTML2TEXT(['<i>Hello</i>', '<b>Jim</b>']).should.equal('Hello\nJim')
  })

  it('LEFT', () => {
    text.LEFT(error.na, 2).should.equal(error.na)
    text.LEFT('text', error.na).should.equal(error.na)
    text.LEFT(undefined, undefined).should.equal('')
    text.LEFT(undefined, 3).should.equal('')
    text.LEFT('Sale Price', 4).should.equal('Sale')
    text.LEFT('Sweeden').should.equal('S')
    text.LEFT(42).should.equal('4')
    text.LEFT(true).should.equal('t')
  })

  it('LEN', () => {
    text.LEN(undefined).should.equal(0)
    text.LEN(error.na).should.equal(error.na)
    text.LEN(true).should.equal(4)
    text.LEN('four').should.equal(4)
    text.LEN([1, 2, 3, 4, 5]).should.equal(error.value)
    text.LEN().should.equal(error.error)
    text.LEN(null).should.equal(0)
    text.LEN([]).should.equal(error.value)
    text.LEN(123).should.equal(3)
  })

  it('LOWER', () => {
    text.LOWER(undefined).should.equal('')
    text.LOWER(error.na).should.equal(error.na)
    text.LOWER('abcd').should.equal('abcd')
    text.LOWER('ABcd').should.equal('abcd')
    text.LOWER('ABCD').should.equal('abcd')
    text.LOWER('').should.equal('')
    text.LOWER(true).should.equal('true')
    text.LOWER(1).should.equal('1')
    text.LOWER().should.equal(error.value)
  })

  it('MID', () => {
    const data = 'Fluid Flow'
    text.MID(data, 1, 5).should.equal('Fluid')
    text.MID(data, 7, 20).should.equal('Flow')
    text.MID(data, 20, 50).should.equal('')
    text.MID(0).should.equal(error.value)
  })

  it('NUMBERVALUE', () => {
    text.NUMBERVALUE('2.500,27', ',', '.').should.equal(2500.27)
    text.NUMBERVALUE('250', ',', '.').should.equal(250)
    // text.NUMBERVALUE("3.5%").should.equal(.035);
  })

  it('PRONETIC', () => {
    text.PRONETIC.should.throw('PRONETIC is not implemented')
  })

  it('PROPER', () => {
    text.PROPER(undefined).should.equal('')
    text.PROPER(null).should.equal('')
    text.PROPER(error.na).should.equal(error.na)
    text.PROPER('a title case').should.equal('A Title Case')
    text.PROPER(true).should.equal('True')
    text.PROPER(false).should.equal('False')
    text.PROPER(90).should.equal('90')
    text.PROPER(NaN).should.equal(error.value)
    text.PROPER().should.equal('')
  })

  it('REGEXEXTRACT', () => {
    text.REGEXEXTRACT('(Content) between brackets', '(([A-Za-z]+))').should.equal('Content')
    text.REGEXEXTRACT('The price today is $826.25', '[0-9]+.[0-9]+[0-9]+').should.equal('826.25')
    text.REGEXEXTRACT('Google Doc 101', '[0-9]+').should.equal('101')
    text.REGEXEXTRACT('Google Doc 101').should.equal(error.na)
    text.REGEXEXTRACT().should.equal(error.na)
  })

  it('REGEXREPLACE', () => {
    text.REGEXREPLACE('(Content) between brackets', '(([A-Za-z]+))', 'Me').should.equal('(Me) between brackets')
    text.REGEXREPLACE('(Content) between brackets', '(([A-Za-z]+))').should.equal(error.na)
    text.REGEXREPLACE('(Content) between brackets').should.equal(error.na)
    text.REGEXREPLACE().should.equal(error.na)
  })

  it('REGEXMATCH', () => {
    // eslint-disable-next-line no-extra-semi
    ;(typeof text.REGEXMATCH('(Content) between brackets', '(([A-Za-z]+))', true)).should.equal('object')
    text.REGEXMATCH('(Content) between brackets', '(([A-Za-z]+))', false).should.equal(true)
    text.REGEXMATCH('(Content) between brackets').should.equal(error.na)
    text.REGEXMATCH().should.equal(error.na)
  })

  it('REPLACE', () => {
    text.REPLACE('abcdefghijk', 6, 5, '*').should.equal('abcde*k')
    text.REPLACE('2009', 3, 2, '10').should.equal('2010')
    text.REPLACE('123456', 1, 3, '@').should.equal('@456')
    text.REPLACE().should.equal(error.value)
  })

  it('REPT', () => {
    text.REPT(undefined, undefined).should.equal('')
    text.REPT('text', undefined).should.equal('')
    text.REPT(undefined, 3).should.equal('')
    text.REPT(error.na, 3).should.equal(error.na)
    text.REPT('multiple ', 3).should.equal('multiple multiple multiple ')
    text.REPT('m').should.equal('')
    text.REPT().should.equal('')
    text.REPT(true, 2).should.equal('truetrue')
    text.REPT(12, 2).should.equal('1212')
  })

  it('RIGHT', () => {
    text.RIGHT(error.na, 2).should.equal(error.na)
    text.RIGHT('text', error.na).should.equal(error.na)
    text.RIGHT(undefined, undefined).should.equal('')
    text.RIGHT(undefined, 3).should.equal('')
    text.RIGHT('Sale Price', 5).should.equal('Price')
    text.RIGHT('Stock Number').should.equal('r')
    text.RIGHT('something', 'invalid').should.equal(error.value)
    text.RIGHT().should.equal('')
    text.RIGHT(42).should.equal('2')
    text.RIGHT(true).should.equal('e')
  })

  it('SEARCH', () => {
    text.SEARCH('e', 'Statements', 6).should.equal(7)
    text.SEARCH('margin', 'Profit Margin').should.equal(8)
    text.SEARCH(true, 'bool').should.equal(error.value)
    text.SEARCH('foo', 'bar').should.equal(error.value)
    text.SEARCH('ba', 'bar').should.equal(1)
  })

  it('SPLIT', () => {
    // eslint-disable-next-line no-extra-semi
    ;(typeof text.SPLIT('123242', '2')).should.equal('object')
    ;(text.SPLIT('123242', '2') instanceof Array).should.equal(true)
  })

  describe('SUBSTITUTE', () => {
    it('should substitute all occurrences of a string for another string', () => {
      text.SUBSTITUTE('Jim Alateras', 'Jim', 'James').should.equal('James Alateras')
      text.SUBSTITUTE('Jim Alateras', 'im', 'ames').should.equal('James Alateras')
      text.SUBSTITUTE('Jim Alateras', '', 'ames').should.equal('Jim Alateras')
      text.SUBSTITUTE('Jim Alateras', undefined, 'ames').should.equal('Jim Alateras')
      text.SUBSTITUTE('Jim, Alateras, Sr.', ',', '').should.equal('Jim Alateras Sr.')
      text.SUBSTITUTE('', 'im', 'ames').should.equal('')
      should.not.exist(text.SUBSTITUTE(undefined, 'im', 'ames'))
    })

    it('should substitute regex meta-characters without interpretation', () => {
      text.SUBSTITUTE('J. Alateras', '.', 'ames').should.equal('James Alateras')
    })

    it('should return an #N/A error if not enough inputs', () => {
      text.SUBSTITUTE('Jim Alateras').should.equal(error.na)
      text.SUBSTITUTE().should.equal(error.na)
    })

    it('should substitute the nth occurrence of a string for another string', () => {
      text.SUBSTITUTE('a-a-a', ':', '', 1).should.equal('a-a-a')
      text.SUBSTITUTE('a-a-a', '-', ':', '2').should.equal('a-a:a')
      text.SUBSTITUTE('a-a-a', '-', ':', '2.5').should.equal('a-a:a')
      text.SUBSTITUTE('a-a-a', '-', ':', '3').should.equal('a-a-a')
      text.SUBSTITUTE('a-a-a', '-', ':', 2).should.equal('a-a:a')
      text.SUBSTITUTE('a-a-a', '-', ':', 2.5).should.equal('a-a:a')
      text.SUBSTITUTE('a-a-a', '-', ':', 3).should.equal('a-a-a')
    })

    it('should return a #VALUE! error if occurrence is not a number greater than or equal to 1', () => {
      text.SUBSTITUTE('a-a-a', '-', ':', '').should.equal(error.value)
      text.SUBSTITUTE('a-a-a', '-', ':', 'x').should.equal(error.value)
      text.SUBSTITUTE('a-a-a', '-', ':', '-1').should.equal(error.value)
      text.SUBSTITUTE('a-a-a', '-', ':', '-0.5').should.equal(error.value)
      text.SUBSTITUTE('a-a-a', '-', ':', -1).should.equal(error.value)
      text.SUBSTITUTE('a-a-a', '-', ':', 0).should.equal(error.value)
      text.SUBSTITUTE('a-a-a', '-', ':', 0.5).should.equal(error.value)
    })
  })

  it('T', () => {
    text.T(undefined).should.equal('')
    text.T(error.na).should.equal(error.na)
    text.T('Rainfall').should.equal('Rainfall')
    text.T(19).should.equal('')
    text.T(true).should.equal('')
  })

  it('TEXT', () => {
    text.TEXT().should.equal(error.na)
    text.TEXT('value').should.equal(error.na)
    text.TEXT("VALUE", "").should.equal(error.value)
    text.TEXT(12, "").should.equal("")

    // percentage
    text.TEXT("0.244740088392962", "0%").should.equal("24%")
    text.TEXT("1.2555", "0%").should.equal("126%")
    text.TEXT("1.2555", "########.##########%").should.equal("125.55%")
    text.TEXT("0.244740088392962", "0.0%").should.equal("24.5%")
    text.TEXT("0.244740088392962", "0.00%").should.equal("24.47%")
    text.TEXT("0.244740088392962", ".%").should.equal("24.%")
    text.TEXT("0.244740088392962", ".0%").should.equal("24.5%")
    text.TEXT("0.244740088392962", "%").should.equal("%")
    text.TEXT("0.244740088392962", "0.#%").should.equal("24.5%")
    text.TEXT("0.244740088392962", "%").should.equal("%")
    text.TEXT("0.244740088392962", " .x.%").should.equal(" 24.x.%")
    text.TEXT("0.244740088392962", "0 # %").should.equal("2 4 %")
    text.TEXT(1.244740088392962, "0 # %").should.equal("12 4 %")
    text.TEXT("1", "0 # %").should.equal("10 0 %")

    // // thousands separator
    // text.TEXT('122000000', '#,###').should.equal('122,000,000')
    // text.TEXT('122000000', '0,000.00').should.equal('122,000,000.00')
    // text.TEXT('122000000', '#,').should.equal('12200')
    // text.TEXT('122000000', '#,###.0,').should.equal('12,200.0')
    // text.TEXT('122000000', '0.0,,').should.equal('12.2')
    // text.TEXT(1234.56, '#,##0').should.equal('1,235') // thousands separator, no decimals
    // text.TEXT(1234.56, '#,##0.00').should.equal('1,234.56') // thousands separator, 2 decimals

    // number
    text.TEXT(1234.56, '0.00').should.equal('1234.56') // general
    text.TEXT('1234.59', '###0.0').should.equal('1234.6')
    text.TEXT('1234.52', '###0.0').should.equal('1234.5')
    text.TEXT('1234.56', '###0.00').should.equal('1234.56')

    // currency
    text.TEXT(1234.56, '$###0').should.equal('$1235')
    text.TEXT(1234.56, '$###0.00').should.equal('$1234.56')
    // text.TEXT(1234.56, '$#,##0').should.equal('$1,235') // no decimals
    // text.TEXT(1234.56, '$#,##0.00').should.equal('$1,234.56') // 2 decimals
    // text.TEXT(-1234.56, '$#,##0.00_);($#,##0.00)').should.equal('-$1,234.56') // 2 decimals, negative value
    // text.TEXT(2800, "$#,###").should.equal("$2,800")

    // // accounting
    // text.TEXT(1234.56, '$ * #,##0').should.equal('$ 1,235') // no decimals
    // text.TEXT(1234.56, '$ * #,##0.00').should.equal('$ 1,234.56') // 2 decimals
    // text.TEXT(-1234.56, "_($* #,##0.00_);_($* (#,##0.00);_($* "-"??_);_(@_)").should.equal(error.value)

    // // date - months
    // text.TEXT("7/12/2022", "m").should.equal("12") // 1-12
    // text.TEXT("7/12/2022", "mm").should.equal("12") // 01-12
    // text.TEXT("7/12/2022", "mmm").should.equal("Dec") // Jan-Dec
    // text.TEXT("7/12/2022", "mmmm").should.equal("December") // January-December
    // text.TEXT("7/12/2022", "mmmmm").should.equal("D") // J-D

    // // date - days
    // text.TEXT("7/12/2022", "d").should.equal("7") // 1-31
    // text.TEXT("7/12/2022", "dd").should.equal("07") // 01-31
    // text.TEXT("7/12/2022", "ddd").should.equal("Wed") // Sun-Sat
    // text.TEXT("7/12/2022", "dddd").should.equal("Wednesday") // Sunday-Saturday

    // // date - years
    // text.TEXT("7/12/2022", "yy").should.equal("22") // 00-99
    // text.TEXT("7/12/2022", "yyyy").should.equal("2022") // 0000-9999

    // // time - hours
    // text.TEXT("10:38:00 am", "h").should.equal("10") // 0-23
    // text.TEXT("10:38:00 am", "hh").should.equal("10") // 00-23

    // // time - minutes
    // text.TEXT("10:38:00 am", "m").should.equal("38") // 0-59
    // text.TEXT("10:38:00 am", "mm").should.equal("38") // 00-59

    // // time - seconds
    // text.TEXT("10:38:00 am", "s").should.equal("0") // 0-59
    // text.TEXT("10:38:00 am", "ss").should.equal("00") // 00-59

    // // time - am/pm
    // text.TEXT("10:38:00 am", "h AM/PM").should.equal("10 am")
    // text.TEXT("10:38:00 am", "h:mm AM/PM").should.equal("10:38 am")
    // text.TEXT("10:38:00 am", "h:mm:ss A/P").should.equal("10:38:00 A/P")
    // text.TEXT("10:38:00 am", "h:mm:ss.00").should.equal("10:38:00.00")

    // // time - elapsed time
    // text.TEXT("1:02:16 am", "[h]:mm").should.equal("1:02") // hours and minutes
    // text.TEXT("1:02:16 am", "[mm]:ss").should.equal("62:16") // minutes and seconds
    // text.TEXT("1:02:16 am", "[ss].00").should.equal("3736.00") // seconds and hundredths

    // // date and time
    // text.TEXT("7/12/2022 10:38:00 am", "mm/dd/yyyy").should.equal("12/07/2022") // date
    // text.TEXT("7/12/2022 10:38:00 am", "m/d/yyyy h:mm AM/PM").should.equal("12/7/2022 10:38 am") // date and time

    // // fraction
    // text.TEXT("4.34", "# ?/?").should.equal("4 1/3") // Up to one digit
    // text.TEXT("0.34", "# ?/?").should.equal("1/3") // Up to one digit
    // text.TEXT("4.34", "# ??/??").should.equal("4 17/50") // Up to two digits
    // text.TEXT("4.34", "# ???/???").should.equal("4 169/500") // Up to three digits
    // text.TEXT("4.34", "# ?/2").should.equal("4 1/2") // as halves
    // text.TEXT("4.34", "# ?/4").should.equal("4 1/4") // as quarters
    // text.TEXT("4.34", "# ?/16").should.equal("4 5/16") // as sixteenths
    // text.TEXT("4.34", "# ?/10").should.equal("4 3/10") // as tenths
    // text.TEXT("4.34", "# ?/100").should.equal("4 34/100") // as hundredths

    // // scientific notation
    // text.TEXT("12200000", "0.00E+00").should.equal("1.22E+07") // 7 places
    // text.TEXT("12200000", "#0.0E+0").should.equal("12.2E+6") // 6 places

    // special formats - e.g. zip code, zip +4, phone number, social security number
    text.TEXT("12345", "00000").should.equal("12345")
    text.TEXT("123456789", "00000-0000").should.equal("12345-6789")
    // text.TEXT("1234567899", "[<=9999999]###-####;(###) ###-####").should.equal("(123) 456-7899")
    text.TEXT("123456789", "000-00-0000").should.equal("123-45-6789")
    // text.TEXT("123456", "000000000").should.equal("000123456")
    // text.TEXT("123456", "###° 00' 00''").should.equal("12° 34' 56''")

    // leading zeros
    // text.TEXT("00001", "00000").should.equal("00001")
    // text.TEXT("00012", "00000").should.equal("00012")
    // text.TEXT("00123", "00000").should.equal("00123")
    // text.TEXT("01234", "00000").should.equal("01234")
    // text.TEXT("12345", "00000").should.equal("12345")
  })

  it('TEXTJOIN', () => {
    text
      .TEXTJOIN(' ', true, 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')
      .should.equal('The sun will come up tomorrow.')
    text
      .TEXTJOIN(' ', 'TRUE', 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')
      .should.equal('The sun will come up tomorrow.')
    text
      .TEXTJOIN(' ', false, 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')
      .should.equal('The  sun will come up tomorrow.')
    text
      .TEXTJOIN(' ', 'FALSE', 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')
      .should.equal('The  sun will come up tomorrow.')
    text
      .TEXTJOIN(['_', '>'], true, 'The', 'sun', 'will', 'come', 'up', 'tomorrow.')
      .should.equal('The_sun>will_come>up_tomorrow.')
    text
      .TEXTJOIN(' ', true, ['The', 'sun', 'will'], 'come', ['up', 'tomorrow.'])
      .should.equal('The sun will come up tomorrow.')
    text
      .TEXTJOIN(true, true, ['The', 'sun', 'will'], 'come', ['up', 'tomorrow.'])
      .should.equal('Thetruesuntruewilltruecometrueuptruetomorrow.')
    text
      .TEXTJOIN(undefined, undefined, 'The', 'sun', 'will', 'come', 'up', 'tomorrow.')
      .should.equal('Thesunwillcomeuptomorrow.')
    text.TEXTJOIN(' ', true).should.equal(error.na)
  })

  it('TRIM', () => {
    text.TRIM(undefined).should.equal('')
    text.TRIM(error.na).should.equal(error.na)
    text.TRIM(' more  spaces ').should.equal('more spaces')
    text.TRIM(true).should.equal('true')
    text.TRIM(10).should.equal('10')
    text
      .TRIM(
        `  spaces,      tabs, and
      new lines`
      )
      .should.equal('spaces, tabs, and new lines')
    text.TRIM('  spaces,\t\t\ttabs, and\nnew lines').should.equal('spaces, tabs, and new lines')
  })

  it('UNICHAR', () => {
    text.UNICHAR(undefined).should.equal(error.value)
    text.UNICHAR(error.na).should.equal(error.na)
    text.UNICHAR(65).should.equal('A')
    text.UNICHAR(255).should.equal('ÿ')
    text.UNICHAR(1000).should.equal('Ϩ')
  })

  it('UNICODE', () => {
    text.UNICODE(undefined).should.equal(error.value)
    text.UNICODE(error.na).should.equal(error.na)
    text.UNICODE('A').should.equal(65)
    text.UNICODE('Ϩ').should.equal(1000)
  })

  it('UPPER', () => {
    text.UPPER(undefined).should.equal('')
    text.UPPER(error.na).should.equal(error.na)
    text.UPPER('to upper case please').should.equal('TO UPPER CASE PLEASE')
    text.UPPER(true).should.equal('TRUE')
    text.UPPER(1).should.equal('1')
  })

  describe('VALUE', () => {
    it('should thrown an error in case of null, empty, error input', () => {
      text.VALUE(error.na).should.equal(error.na)
      text.VALUE('').should.equal(error.value)
      text.VALUE(null).should.equal(error.value)
      text.VALUE().should.equal(error.value)
    })

    it('should thrown an error in case of boolean input', () => {
      text.VALUE(true).should.equal(error.value)
    })

    it('should thrown an error in case of malformed input', () => {
      text.VALUE('SOMETEXT').should.equal(error.value)
      text.VALUE('2+2').should.equal(error.value)
      text.VALUE('3%22').should.equal(error.value)
      text.VALUE('3D22').should.equal(error.value)
      text.VALUE('SOMETEXT 42').should.equal(error.value)
    })

    it('should parse scientific notation string', () => {
      text.VALUE('10E3').should.equal(10000)
    })

    it('should parse percentage string', () => {
      text.VALUE('%12').should.equal(0.12)
      text.VALUE('12%').should.equal(0.12)
    })

    it('should allow numeric input', () => {
      text.VALUE(12).should.equal(12)
    })

    /**
     * Only supports thousands separator "," and decimal separator "."
     *
     * These separators are not yet configurable. But the aim is not be as extensive as dedicated parsing library
     * such as Numeral.js or Numbro.
     */
    it('should parse a number as string', () => {
      text.VALUE('123.45').should.equal(123.45)
      text.VALUE('10,000').should.equal(10000)
      text.VALUE('1,210,000').should.equal(1210000)
      text.VALUE('11 000').should.equal(11000)
      text.VALUE('-3.14').should.equal(-3.14)
    })

    it('should parse dollar monetary string', () => {
      text.VALUE('$1000').should.equal(1000)
      text.VALUE('$11,000').should.equal(11000)
    })

    /**
     * These test cases illustrate permissive input cases. They do not mirror exactly Excel behaviors.
     */
    it('could be less permissive', () => {
      text.VALUE('EUR1000').should.equal(1000)
    })
  })
})
