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

  xit('TEXT', () => {
    text.TEXT('1234.59', '###0.0').should.equal('1234.6')
    text.TEXT('1234.52', '###0.0').should.equal('1234.5')
    text.TEXT('1234.56', '###0.00').should.equal('1234.56')
    text.TEXT().should.equal(error.na)
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
