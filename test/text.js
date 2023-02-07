import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as text from '../src/text.js'

describe('Text', () => {
  it('ASC', () => {
    expect(text.ASC).to.throw('ASC is not implemented')
  })

  it('BAHTTEXT', () => {
    expect(text.BAHTTEXT).to.throw('BAHTTEXT is not implemented')
  })

  it('CHAR', () => {
    expect(text.CHAR(1)).to.equal(String.fromCharCode('1'))
    expect(text.CHAR(true)).to.equal(String.fromCharCode('1'))
    expect(text.CHAR(false)).to.equal(error.value)

    expect(text.CHAR('true')).to.equal(error.value)
    expect(text.CHAR('false')).to.equal(error.value)

    expect(text.CHAR(null)).to.equal(error.value)

    expect(text.CHAR(65)).to.equal('A')
    expect(text.CHAR(97)).to.equal('a')

    expect(text.CHAR('65')).to.equal('A')
    expect(text.CHAR('80')).to.equal('P')
    expect(text.CHAR('   80')).to.equal('P')
    expect(text.CHAR('   80    ')).to.equal('P')
    expect(text.CHAR('80    ')).to.equal('P')

    expect(text.CHAR(51)).to.equal('3')
    expect(text.CHAR(255)).to.equal('ÿ')
    expect(text.CHAR(1000)).to.equal('Ϩ')

    expect(text.CHAR(0)).to.equal(error.value)
    expect(text.CHAR(-1)).to.equal(error.value)
    expect(text.CHAR(-0.4)).to.equal(error.value)
    expect(text.CHAR(0.9)).to.equal(error.value)
    expect(text.CHAR(80.2)).to.equal('P')

    expect(text.CHAR(65, 55)).to.equal(error.na)
    expect(text.CHAR(error.na)).to.equal(error.na)
    expect(text.CHAR()).to.equal(error.na)

    expect(text.CHAR(undefined)).to.equal(error.value)
    expect(text.CHAR('invalid')).to.equal(error.value)

    expect(text.CHAR([65, 75, 80])).to.eql(['A', 'K', 'P'])
    expect(text.CHAR([[65], ['a'], [80]])).to.eql([['A'], [error.value], ['P']])
    expect(
      text.CHAR([
        [80, 60],
        [40, 40]
      ])
    ).to.eql([
      ['P', '<'],
      ['(', '(']
    ])

    expect(text.CHAR('')).to.equal(error.num)
  })

  it('CLEAN', () => {
    expect(text.CLEAN(null)).to.equal('')
    expect(text.CLEAN(undefined)).to.equal('')

    expect(text.CLEAN()).to.equal(error.na)
    expect(text.CLEAN('text1', 'text2')).to.equal(error.na)
    expect(text.CLEAN(100, 22)).to.equal(error.na)

    expect(text.CLEAN(error.na)).to.equal(error.na)
    expect(text.CLEAN('')).to.equal('')

    expect(text.CLEAN(true)).to.equal('true')
    expect(text.CLEAN(false)).to.equal('false')

    expect(text.CLEAN('true')).to.equal('true')
    expect(text.CLEAN('false')).to.equal('false')

    expect(text.CLEAN('text')).to.equal('text')
    expect(text.CLEAN(100)).to.equal('100')
    expect(text.CLEAN(0)).to.equal('0')
    expect(text.CLEAN(-1.8)).to.equal('-1.8')
    expect(text.CLEAN(-0.9)).to.equal('-0.9')
    expect(text.CLEAN(8.7)).to.equal('8.7')

    expect(text.CLEAN([10, 5, 2])).to.eql(['10', '5', '2'])
    expect(
      text.CLEAN([
        ['texto1', 'texto2'],
        ['texto3', 'texto4']
      ])
    ).to.eql([
      ['texto1', 'texto2'],
      ['texto3', 'texto4']
    ])

    expect(text.CLEAN('\n\nOla!\n\ntudo bem?')).to.equal('Ola!tudo bem?')
    expect(text.CLEAN('Monthly \t\t\tReport')).to.equal('Monthly Report')
  })

  it('CODE', () => {
    expect(text.CODE(null)).to.equal(error.value)
    expect(text.CODE(undefined)).to.equal(error.value)
    expect(text.CODE(error.na)).to.equal(error.na)

    expect(text.CODE('true')).to.equal(116)
    expect(text.CODE('false')).to.equal(102)
    expect(text.CODE(true)).to.equal(116)
    expect(text.CODE(false)).to.equal(102)

    expect(text.CODE('A')).to.equal(65)
    expect(text.CODE('a')).to.equal(97)
    expect(text.CODE('3')).to.equal(51)
    expect(text.CODE(3)).to.equal(51)
    expect(text.CODE(3.2)).to.equal(51)
    expect(text.CODE('-233')).to.equal(45)

    expect(text.CODE('P')).to.equal(80)
    expect(text.CODE('   P')).to.equal(32)
    expect(text.CODE('   P    ')).to.equal(32)
    expect(text.CODE('P    ')).to.equal(80)

    expect(text.CODE('invalid')).to.equal(105)

    expect(text.CODE(['A', 'K', 'P'])).to.eql([65, 75, 80])
    expect(text.CODE([['A'], [error.value], ['P']])).to.eql([[65], [error.value], [80]])
    expect(
      text.CODE([
        ['P', '<'],
        ['(', '(']
      ])
    ).to.eql([
      [80, 60],
      [40, 40]
    ])

    expect(text.CODE(3, 4)).to.equal(error.na)
    expect(text.CODE('3', '4')).to.equal(error.na)
    expect(text.CODE('Ϩ')).to.equal(1000)
    expect(text.CODE('')).to.equal(error.value)
    expect(text.CODE()).to.equal(error.na)
  })

  it('CONCATENATE', () => {
    expect(text.CONCATENATE('a', undefined, 'b')).to.equal('ab')
    expect(text.CONCATENATE('a', error.na, 'b')).to.equal(error.na)
    expect(text.CONCATENATE('hello', ' ', 'world')).to.equal('hello world')
    expect(text.CONCATENATE(['hello', ' my ', 'world'])).to.equal('hello my world')
    expect(text.CONCATENATE(1, 'one')).to.equal('1one')
    expect(text.CONCATENATE(true, 'yes')).to.equal('TRUEyes')
    expect(text.CONCATENATE(false, 'no')).to.equal('FALSEno')
  })

  it('CONCAT', () => {
    expect(text.CONCAT('a', undefined, 'b')).to.equal('ab')
    expect(text.CONCAT('a', error.na, 'b')).to.equal(error.na)
    expect(text.CONCAT('hello', ' ', 'world')).to.equal('hello world')
    expect(text.CONCAT(['hello', ' my ', 'world'])).to.equal('hello my world')
    expect(text.CONCAT(1, 'one')).to.equal('1one')
    expect(text.CONCAT(true, 'yes')).to.equal('TRUEyes')
    expect(text.CONCAT(false, 'no')).to.equal('FALSEno')
  })

  it('DBCS', () => {
    expect(text.DBCS).to.throw('DBCS is not implemented')
  })

  it('DOLLAR', () => {
    expect(text.DOLLAR(1234.567)).to.equal('$1,234.57')
    expect(text.DOLLAR(1234.567, -2)).to.equal('$1,200')
    expect(text.DOLLAR(-1234.567, -2)).to.equal('$(1,200)')
    expect(text.DOLLAR(-0.123, 4)).to.equal('$(0.1230)')
    expect(text.DOLLAR(-99.888)).to.equal('$(99.89)')
    expect(text.DOLLAR('invalid')).to.equal(error.value)
    expect(text.DOLLAR(255)).to.equal('$255.00')
    expect(text.DOLLAR(367.456, 2)).to.equal('$367.46')
  })

  it('EXACT', () => {
    expect(text.EXACT(undefined, undefined)).to.equal(true)
    expect(text.EXACT(undefined, null)).to.equal(true)
    expect(text.EXACT(undefined, '')).to.equal(true)
    expect(text.EXACT(error.na, error.na)).to.equal(error.na)
    expect(text.EXACT('yes', 'yes')).to.equal(true)
    expect(text.EXACT('yes', 'no')).to.equal(false)
    expect(text.EXACT('yes', 'yes', 'yes')).to.equal(error.na)
    expect(text.EXACT()).to.equal(error.na)
    expect(text.EXACT('true', true)).to.equal(true)
    expect(text.EXACT('12', 12)).to.equal(true)
    expect(text.EXACT('Word', '0')).to.equal(false)
  })

  it('FIND', () => {
    const data = 'Miriam McGovern'
    expect(text.FIND(undefined, undefined)).to.equal(1)
    expect(text.FIND('M', data)).to.equal(1)
    expect(text.FIND('m', data)).to.equal(6)
    expect(text.FIND('M', data, 3)).to.equal(8)
    expect(text.FIND('M', undefined)).to.equal(error.value)
    expect(text.FIND('M')).to.equal(error.na)
    expect(text.FIND()).to.equal(error.na)
    expect(text.FIND(true, '12true')).to.equal(3)
    expect(text.FIND(12, '312')).to.equal(2)
    expect(text.FIND(12, 312)).to.equal(2)
  })

  it('FIXED', () => {
    expect(text.FIXED(1234.567, 1)).to.equal('1,234.6')
    expect(text.FIXED(1234.567, -1)).to.equal('1,230')
    expect(text.FIXED(-1234.567, -1, true)).to.equal('-1230')
    expect(text.FIXED(44.332)).to.equal('44.33')
    expect(text.FIXED('invalid')).to.equal(error.value)
    expect(text.FIXED(1234567.89, 3)).to.equal('1,234,567.890')
    expect(text.FIXED(123456.789, undefined, true)).to.equal('123456.79')
    expect(text.FIXED(12345.6789, -2)).to.equal('12,300')
    expect(text.FIXED(12134567.89, -3, 1)).to.equal('12135000')
    expect(text.FIXED(12345.789, 3 / 4)).to.equal('12,346')
    expect(text.FIXED(12345.789, 8 / 5)).to.equal('12,345.8')
    expect(text.FIXED(1234.56789, 5)).to.equal('1,234.56789')
    expect(text.FIXED(1234.567899, 5)).to.equal('1,234.56790')
    expect(text.FIXED(1234.5, 5)).to.equal('1,234.50000')
    expect(text.FIXED(123456.9, 4)).to.equal('123,456.9000')
  })

  it('LEFT', () => {
    expect(text.LEFT(error.na, 2)).to.equal(error.na)
    expect(text.LEFT('text', error.na)).to.equal(error.na)
    expect(text.LEFT(undefined, undefined)).to.equal('')
    expect(text.LEFT(undefined, 3)).to.equal('')
    expect(text.LEFT('Sale Price', 4)).to.equal('Sale')
    expect(text.LEFT('Sweeden')).to.equal('S')
    expect(text.LEFT(42)).to.equal('4')
    expect(text.LEFT(true)).to.equal('t')
  })

  it('LEN', () => {
    expect(text.LEN(undefined)).to.equal(0)
    expect(text.LEN(error.na)).to.equal(error.na)
    expect(text.LEN(true)).to.equal(4)
    expect(text.LEN('four')).to.equal(4)
    expect(text.LEN([1, 2, 3, 4, 5])).to.equal(error.value)
    expect(text.LEN()).to.equal(error.error)
    expect(text.LEN(null)).to.equal(0)
    expect(text.LEN([])).to.equal(error.value)
    expect(text.LEN(123)).to.equal(3)
  })

  it('LOWER', () => {
    expect(text.LOWER(undefined)).to.equal('')
    expect(text.LOWER(error.na)).to.equal(error.na)
    expect(text.LOWER('abcd')).to.equal('abcd')
    expect(text.LOWER('ABcd')).to.equal('abcd')
    expect(text.LOWER('ABCD')).to.equal('abcd')
    expect(text.LOWER('')).to.equal('')
    expect(text.LOWER(true)).to.equal('true')
    expect(text.LOWER(1)).to.equal('1')
    expect(text.LOWER()).to.equal(error.value)
  })

  it('MID', () => {
    const data = 'Fluid Flow'
    expect(text.MID(data, 1, 5)).to.equal('Fluid')
    expect(text.MID(data, 7, 20)).to.equal('Flow')
    expect(text.MID(data, 20, 50)).to.equal('')
    expect(text.MID(0)).to.equal(error.value)
  })

  describe('NUMBERVALUE', () => {
    it('should parse text value', () => {
      expect(text.NUMBERVALUE('2.500,27', ',', '.')).to.equal(2500.27)
      expect(text.NUMBERVALUE('250', ',', '.')).to.equal(250)
      expect(text.NUMBERVALUE('', ',', '.')).to.equal(0)
      // expect(text.NUMBERVALUE("3.5%")).to.equal(.035);
    })

    it('should work with empty inputs', () => {
      expect(text.NUMBERVALUE(null, ',', '.')).to.equal(0)
      expect(text.NUMBERVALUE(undefined, ',', '.')).to.equal(0)
    })

    it('should work with number input', () => {
      expect(text.NUMBERVALUE(3)).to.equal(3)
    })

    it('should throw an error in case of text input different from string', () => {
      expect(text.NUMBERVALUE(true)).to.equal(error.na)
    })
  })

  it('PRONETIC', () => {
    expect(text.PRONETIC).to.throw('PRONETIC is not implemented')
  })

  it('PROPER', () => {
    expect(text.PROPER(undefined)).to.equal('')
    expect(text.PROPER(null)).to.equal('')
    expect(text.PROPER(error.na)).to.equal(error.na)
    expect(text.PROPER('a title case')).to.equal('A Title Case')
    expect(text.PROPER(true)).to.equal('True')
    expect(text.PROPER(false)).to.equal('False')
    expect(text.PROPER(90)).to.equal('90')
    expect(text.PROPER(NaN)).to.equal(error.value)
    expect(text.PROPER()).to.equal('')
  })

  it('REPLACE', () => {
    expect(text.REPLACE('abcdefghijk', 6, 5, '*')).to.equal('abcde*k')
    expect(text.REPLACE('2009', 3, 2, '10')).to.equal('2010')
    expect(text.REPLACE('123456', 1, 3, '@')).to.equal('@456')
    expect(text.REPLACE()).to.equal(error.value)
  })

  it('REPT', () => {
    expect(text.REPT(undefined, undefined)).to.equal('')
    expect(text.REPT('text', undefined)).to.equal('')
    expect(text.REPT(undefined, 3)).to.equal('')
    expect(text.REPT(error.na, 3)).to.equal(error.na)
    expect(text.REPT('multiple ', 3)).to.equal('multiple multiple multiple ')
    expect(text.REPT('m')).to.equal('')
    expect(text.REPT()).to.equal('')
    expect(text.REPT(true, 2)).to.equal('truetrue')
    expect(text.REPT(12, 2)).to.equal('1212')
  })

  it('RIGHT', () => {
    expect(text.RIGHT(error.na, 2)).to.equal(error.na)
    expect(text.RIGHT('text', error.na)).to.equal(error.na)
    expect(text.RIGHT(undefined, undefined)).to.equal('')
    expect(text.RIGHT(undefined, 3)).to.equal('')
    expect(text.RIGHT('Sale Price', 5)).to.equal('Price')
    expect(text.RIGHT('Stock Number')).to.equal('r')
    expect(text.RIGHT('something', 'invalid')).to.equal(error.value)
    expect(text.RIGHT()).to.equal('')
    expect(text.RIGHT(42)).to.equal('2')
    expect(text.RIGHT(true)).to.equal('e')
  })

  it('SEARCH', () => {
    expect(text.SEARCH('e', 'Statements', 6)).to.equal(7)
    expect(text.SEARCH('margin', 'Profit Margin')).to.equal(8)
    expect(text.SEARCH(true, 'bool')).to.equal(error.value)
    expect(text.SEARCH('foo', 'bar')).to.equal(error.value)
    expect(text.SEARCH('ba', 'bar')).to.equal(1)
  })

  describe('SUBSTITUTE', () => {
    it('should substitute all occurrences of a string for another string', () => {
      expect(text.SUBSTITUTE('Jim Alateras', 'Jim', 'James')).to.equal('James Alateras')
      expect(text.SUBSTITUTE('Jim Alateras', 'im', 'ames')).to.equal('James Alateras')
      expect(text.SUBSTITUTE('Jim Alateras', '', 'ames')).to.equal('Jim Alateras')
      expect(text.SUBSTITUTE('Jim Alateras', undefined, 'ames')).to.equal('Jim Alateras')
      expect(text.SUBSTITUTE('Jim, Alateras, Sr.', ',', '')).to.equal('Jim Alateras Sr.')
      expect(text.SUBSTITUTE('', 'im', 'ames')).to.equal('')
      expect(text.SUBSTITUTE(undefined, 'im', 'ames')).to.not.exist
    })

    it('should substitute regex meta-characters without interpretation', () => {
      expect(text.SUBSTITUTE('J. Alateras', '.', 'ames')).to.equal('James Alateras')
    })

    it('should return an #N/A error if not enough inputs', () => {
      expect(text.SUBSTITUTE('Jim Alateras')).to.equal(error.na)
      expect(text.SUBSTITUTE()).to.equal(error.na)
    })

    it('should substitute the nth occurrence of a string for another string', () => {
      expect(text.SUBSTITUTE('a-a-a', ':', '', 1)).to.equal('a-a-a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '2')).to.equal('a-a:a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '2.5')).to.equal('a-a:a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '3')).to.equal('a-a-a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 2)).to.equal('a-a:a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 2.5)).to.equal('a-a:a')
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 3)).to.equal('a-a-a')
    })

    it('should return a #VALUE! error if occurrence is not a number greater than or equal to 1', () => {
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '')).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 'x')).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '-1')).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', '-0.5')).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', -1)).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 0)).to.equal(error.value)
      expect(text.SUBSTITUTE('a-a-a', '-', ':', 0.5)).to.equal(error.value)
    })
  })

  it('T', () => {
    expect(text.T(undefined)).to.equal('')
    expect(text.T(error.na)).to.equal(error.na)
    expect(text.T('Rainfall')).to.equal('Rainfall')
    expect(text.T(19)).to.equal('')
    expect(text.T(true)).to.equal('')
  })

  describe('TEXT', () => {
    it('should use fixed number of decimals and include commas if specified', () => {
      expect(text.TEXT(1234.59, '###0.0')).to.equal('1234.6')
      expect(text.TEXT(1234.52, '###0.0')).to.equal('1234.5')
      expect(text.TEXT(1234.56, '###0.00')).to.equal('1234.56')
      expect(text.TEXT(1234, '###0.0000')).to.equal('1234.0000')
      expect(text.TEXT(123456.9, '#,##0.0000')).to.equal('123,456.9000')
      expect(text.TEXT()).to.equal(error.na)
    })

    it('should format numbers with $ sign', () => {
      expect(text.TEXT(1234567.89, '$#,##0.00')).to.equal('$1,234,567.89')
      expect(text.TEXT(1234.59, '$#,##0.00')).to.equal('$1,234.59')
      expect(text.TEXT(-1234567.89, '$#,##0.00')).to.equal('-$1,234,567.89')
      expect(text.TEXT(-1234.59, '$#,##0.00')).to.equal('-$1,234.59')
      expect(text.TEXT(0, '$#,##0.00')).to.equal('$0.00')
    })

    it('should format percentages', () => {
      expect(text.TEXT(0.89, '0.00%')).to.equal('89.00%')
      expect(text.TEXT(0.1234, '0.00%')).to.equal('12.34%')
      expect(text.TEXT(1, '0.00%')).to.equal('100.00%')
    })

    it('should handle errors', () => {
      expect(text.TEXT(error.value, '0.00%')).to.equal(error.na)
      expect(text.TEXT(0.89, error.na)).to.equal(error.na)
      expect(text.TEXT(error.value, error.na)).to.equal(error.na)
      expect(text.TEXT(123, undefined)).to.equal('')
      expect(text.TEXT(123, null)).to.equal('')
      expect(text.TEXT(123, 111)).to.equal('111')
      expect(text.TEXT(123, true)).to.equal(error.value)
    })
  })

  it('TEXTJOIN', () => {
    expect(text.TEXTJOIN(' ', true, 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(' ', 'TRUE', 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(' ', false, 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The  sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(' ', 'FALSE', 'The', '', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The  sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(['_', '>'], true, 'The', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'The_sun>will_come>up_tomorrow.'
    )
    expect(text.TEXTJOIN(' ', true, ['The', 'sun', 'will'], 'come', ['up', 'tomorrow.'])).to.equal(
      'The sun will come up tomorrow.'
    )
    expect(text.TEXTJOIN(true, true, ['The', 'sun', 'will'], 'come', ['up', 'tomorrow.'])).to.equal(
      'Thetruesuntruewilltruecometrueuptruetomorrow.'
    )
    expect(text.TEXTJOIN(undefined, undefined, 'The', 'sun', 'will', 'come', 'up', 'tomorrow.')).to.equal(
      'Thesunwillcomeuptomorrow.'
    )
    expect(text.TEXTJOIN(' ', true)).to.equal(error.na)
  })

  it('TRIM', () => {
    expect(text.TRIM(undefined)).to.equal('')
    expect(text.TRIM(error.na)).to.equal(error.na)
    expect(text.TRIM(' more  spaces ')).to.equal('more spaces')
    expect(text.TRIM(true)).to.equal('true')
    expect(text.TRIM(10)).to.equal('10')
    expect(
      text.TRIM(
        `  spaces,      tabs, and
      new lines`
      )
    ).to.equal('spaces, tabs, and new lines')
    expect(text.TRIM('  spaces,\t\t\ttabs, and\nnew lines')).to.equal('spaces, tabs, and new lines')
  })

  it('UNICHAR', () => {
    expect(text.UNICHAR(undefined)).to.equal(error.value)
    expect(text.UNICHAR(error.na)).to.equal(error.na)
    expect(text.UNICHAR(65)).to.equal('A')
    expect(text.UNICHAR(255)).to.equal('ÿ')
    expect(text.UNICHAR(1000)).to.equal('Ϩ')
  })

  it('UNICODE', () => {
    expect(text.UNICODE(undefined)).to.equal(error.value)
    expect(text.UNICODE(error.na)).to.equal(error.na)
    expect(text.UNICODE('A')).to.equal(65)
    expect(text.UNICODE('Ϩ')).to.equal(1000)
  })

  it('UPPER', () => {
    expect(text.UPPER(undefined)).to.equal('')
    expect(text.UPPER(error.na)).to.equal(error.na)
    expect(text.UPPER('to upper case please')).to.equal('TO UPPER CASE PLEASE')
    expect(text.UPPER(true)).to.equal('TRUE')
    expect(text.UPPER(1)).to.equal('1')
  })

  describe('VALUE', () => {
    it('should thrown an error in case of error input', () => {
      expect(text.VALUE(error.na)).to.equal(error.na)
    })

    it('should return the input in case of number input', () => {
      expect(text.VALUE(3)).to.equal(3)
    })

    it('should return 0 in case of null, empty input', () => {
      expect(text.VALUE('')).to.equal(0)
      expect(text.VALUE()).to.equal(0)
      expect(text.VALUE(null)).to.equal(0)
    })

    it('should thrown an error in case of boolean input', () => {
      expect(text.VALUE(true)).to.equal(error.value)
    })

    it('should thrown an error in case of malformed input', () => {
      expect(text.VALUE('SOMETEXT')).to.equal(error.value)
      expect(text.VALUE('2+2')).to.equal(error.value)
      expect(text.VALUE('3%22')).to.equal(error.value)
      expect(text.VALUE('3D22')).to.equal(error.value)
      expect(text.VALUE('SOMETEXT 42')).to.equal(error.value)
    })

    it('should parse scientific notation string', () => {
      expect(text.VALUE('10E3')).to.equal(10000)
    })

    it('should parse percentage string', () => {
      expect(text.VALUE('%12')).to.equal(0.12)
      expect(text.VALUE('12%')).to.equal(0.12)
    })

    it('should allow numeric input', () => {
      expect(text.VALUE(12)).to.equal(12)
    })

    /**
     * Only supports thousands separator "," and decimal separator "."
     *
     * These separators are not yet configurable. But the aim is not be as extensive as dedicated parsing library
     * such as Numeral.js or Numbro.
     */
    it('should parse a number as string', () => {
      expect(text.VALUE('123.45')).to.equal(123.45)
      expect(text.VALUE('10,000')).to.equal(10000)
      expect(text.VALUE('1,210,000')).to.equal(1210000)
      expect(text.VALUE('11 000')).to.equal(11000)
      expect(text.VALUE('-3.14')).to.equal(-3.14)
    })

    it('should parse dollar monetary string', () => {
      expect(text.VALUE('$1000')).to.equal(1000)
      expect(text.VALUE('$11,000')).to.equal(11000)
    })

    /**
     * These test cases illustrate permissive input cases. They do not mirror exactly Excel behaviors.
     */
    it('could be less permissive', () => {
      expect(text.VALUE('EUR1000')).to.equal(1000)
    })
  })
})
