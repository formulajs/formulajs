import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as text from '../src/text.js'

describe('Text', () => {
  it('CHAR', () => {
    expect(text.CHAR(65)).to.equal('A')
    expect(text.CHAR(255)).to.equal('ÿ')
    expect(text.CHAR(1000)).to.equal('Ϩ')
    expect(text.CHAR(undefined)).to.equal(error.value)
    expect(text.CHAR(error.na)).to.equal(error.na)
    expect(text.CHAR('invalid')).to.equal(error.value)
  })

  it('CLEAN', () => {
    expect(text.CLEAN(undefined)).to.equal('')
    expect(text.CLEAN(error.na)).to.equal(error.na)
    expect(text.CLEAN('Monthly Report')).to.equal('Monthly Report')
  })

  it('CODE', () => {
    expect(text.CODE()).to.equal(error.value)
    expect(text.CODE(undefined)).to.equal(error.value)
    expect(text.CODE(error.na)).to.equal(error.na)
    expect(text.CODE('A')).to.equal(65)
    expect(text.CODE('Ϩ')).to.equal(1000)
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

  describe('MID', () => {
    describe('args: (text, start_num, num_chars)', () => {
      describe('should extract numbers of characters (num_chars) from text, starting from start_num (1-based index)', () => {
        it('examples from Microsoft docs', () => {
          const data = 'Fluid Flow'
          expect(text.MID(data, 1, 5)).to.equal('Fluid')
          expect(text.MID(data, 7, 20)).to.equal('Flow')
          expect(text.MID(data, 20, 5)).to.equal('')
        })

        const textTest = 'Programming language and core technology of the Web'
        it('when start_num + num_chars less than or equal text length => simple substring', () => {
          expect(text.MID(textTest, 12, 10)).to.equal(' language ')
          expect(text.MID(textTest, 31, 21)).to.equal('technology of the Web')
        })

        it('when start_num + num_chars greater than text length => substring until end', () => {
          expect(text.MID(textTest, 12, 100)).to.equal(' language and core technology of the Web')
          expect(text.MID(textTest, 31, 25)).to.equal('technology of the Web')
        })

        it('when start_num greater than text length => returns empty text', () => {
          const start_num = textTest.length + 1
          expect(text.MID(textTest, start_num, 1)).to.equal('')
        })

        it('when non defined text provided => return empty text', () => {
          expect(text.MID(undefined, 20, 3)).to.equal('')
          expect(text.MID(null, 52, 8)).to.equal('')
        })

        it('when text defined and not string typed => treated as string', () => {
          expect(text.MID(-162, 1, 3)).to.equal('-16')
          expect(text.MID(162.178925, 3, 6)).to.equal('2.1789')
          expect(text.MID(true, 3, 2)).to.equal('ue')
          expect(text.MID(false, 2, 6)).to.equal('alse')
        })
      })

      describe('should throw error #VALUE!', () => {
        it('when start_num or num_chars are not strictly positive (> 1)', () => {
          expect(text.MID('', -3, 3)).to.equal(error.value)
          expect(text.MID('', 3, -3)).to.equal(error.value)
          expect(text.MID('', -3, -3)).to.equal(error.value)
        })
      })
    })
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
      expect(text.TEXT(1234.59, '0')).to.equal('1235')
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

    describe('does not support date formatting but should not crash', () => {
      it('should return ISO formatted Date', () => {
        expect(text.TEXT(new Date(2023, 3, 11, 12), 'DD MMMM, YYYY')).to.equal('2023-04-11')
      })
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

  // Expected values were measured in desktop Excel, except the documentation examples.
  // The full matrix of measured cases is replayed by discovery/textafter-textbefore-matrix.mjs.
  // `undefined` is an omitted argument and `null` is an empty cell.
  describe('TEXTAFTER', () => {
    describe('args: (text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])', () => {
      describe('should return the text after the delimiter', () => {
        it('examples from Microsoft docs', () => {
          expect(text.TEXTAFTER("Red riding hood's, red hood", 'hood')).to.equal("'s, red hood")
          expect(text.TEXTAFTER("Red riding hood's, red hood", '')).to.equal("Red riding hood's, red hood")
          expect(text.TEXTAFTER("Red riding hood's, red hood", '', -1)).to.equal('')
          expect(text.TEXTAFTER("Little Red Riding Hood's red hood", 'Red')).to.equal(" Riding Hood's red hood")
          expect(text.TEXTAFTER("Little Red Riding Hood's red hood", 'basket')).to.equal(error.na)
          expect(text.TEXTAFTER("Little red Riding Hood's red hood", 'red', 2)).to.equal(' hood')
          expect(text.TEXTAFTER("Little red Riding Hood's red hood", 'red', -2)).to.equal(" Riding Hood's red hood")
          expect(text.TEXTAFTER('Marcus Aurelius', ' ', undefined, undefined, 1)).to.equal('Aurelius')
        })

        it('with only the required args, uses the first instance', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-')).to.equal('deux-trois')
        })

        it('when instance_num > 0, counts the instances from the start of the text', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', 2)).to.equal('trois')
        })

        it('when instance_num < 0, counts the instances from the end of the text', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', -1)).to.equal('trois')
          expect(text.TEXTAFTER('un-deux-trois', '-', -2)).to.equal('deux-trois')
        })

        it('when instance_num is decimal, rounds it down like INT', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', 1.9)).to.equal('deux-trois')
          expect(text.TEXTAFTER('un-deux-trois', '-', -1.9)).to.equal('deux-trois')
          expect(text.TEXTAFTER('un-deux-trois', '-', -0.5)).to.equal('trois')
        })

        it('when instance_num is a numeric text or a boolean, converts it to a number', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', ' 2 ')).to.equal('trois')
          expect(text.TEXTAFTER('un-deux-trois', '-', true)).to.equal('deux-trois')
        })

        it('when the delimiter repeats, the instances do not overlap', () => {
          expect(text.TEXTAFTER('aaaa', 'aa', 1)).to.equal('aa')
          expect(text.TEXTAFTER('aaaa', 'aa', 2)).to.equal('')
          expect(text.TEXTAFTER('aaa', 'aa', -1)).to.equal('')
        })

        it('matches wildcard characters literally', () => {
          expect(text.TEXTAFTER('a*b?c~d.e', '*')).to.equal('b?c~d.e')
          expect(text.TEXTAFTER('a*b?c~d.e', '~*')).to.equal(error.na)
        })

        it('counts an emoji as a single character', () => {
          expect(text.TEXTAFTER('😀a😀b', '😀', -1)).to.equal('b')
        })
      })

      describe('with an empty delimiter', () => {
        it('when instance_num > 0, matches the start of the text', () => {
          expect(text.TEXTAFTER('abc', '', 100)).to.equal('abc')
        })

        it('when instance_num < 0, matches the end of the text', () => {
          expect(text.TEXTAFTER('abc', '', -1)).to.equal('')
        })

        it('an empty cell is an empty delimiter', () => {
          expect(text.TEXTAFTER('un-deux-trois', null)).to.equal('un-deux-trois')
        })
      })

      describe('should convert text and delimiter to text', () => {
        it('with numbers, keeps 15 significant digits like Excel', () => {
          expect(text.TEXTAFTER(12345, 3)).to.equal('45')
          expect(text.TEXTAFTER(0.1 + 0.2, '.')).to.equal('3')
          expect(text.TEXTAFTER(1 / 3, '.')).to.equal('333333333333333')
          expect(text.TEXTAFTER(1e21, '+')).to.equal('21')
          // Excel typed as 123456789012345678 keeps only 15 digits at input time
          expect(text.TEXTAFTER(123456789012345000, '9')).to.equal('012345000')
        })

        it('with booleans, uses TRUE / FALSE', () => {
          expect(text.TEXTAFTER(true, 'R')).to.equal('UE')
          expect(text.TEXTAFTER('xTRUEy', true)).to.equal('y')
        })
      })

      describe('match_mode', () => {
        it('when 0 or omitted, the search is case-sensitive', () => {
          expect(text.TEXTAFTER('xAyaz', 'a')).to.equal('z')
          expect(text.TEXTAFTER('xAyaz', 'a', undefined, 0)).to.equal('z')
        })

        it('when 1, the search is case-insensitive', () => {
          expect(text.TEXTAFTER('xAyaz', 'a', undefined, 1)).to.equal('yaz')
          expect(text.TEXTAFTER('aéb', 'É', undefined, 1)).to.equal('b')
          expect(text.TEXTAFTER('aİb', 'i', undefined, 1)).to.equal('b')
        })

        it('when 1, does not fold ß to SS', () => {
          expect(text.TEXTAFTER('straße', 'SS', undefined, 1)).to.equal(error.na)
        })

        it('when decimal, truncates it toward 0', () => {
          expect(text.TEXTAFTER('xAyaz', 'a', undefined, 1.5)).to.equal('yaz')
          expect(text.TEXTAFTER('xAyaz', 'a', undefined, 0.99)).to.equal('z')
          expect(text.TEXTAFTER('xAyaz', 'a', undefined, -0.5)).to.equal('z')
        })
      })

      describe('match_end', () => {
        it('when 1 and instance_num > 0, the end of the text counts as one more delimiter', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', 3, 0, 1)).to.equal('')
          expect(text.TEXTAFTER('un-deux-trois', 'z', 1, 0, 1)).to.equal('')
          expect(text.TEXTAFTER('un-deux-trois', '-', 4, 0, 1)).to.equal(error.na)
        })

        it('when 1 and instance_num < 0, the start of the text counts as one more delimiter', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', -3, 0, 1)).to.equal('un-deux-trois')
          expect(text.TEXTAFTER('un-deux-trois', 'z', -1, 0, 1)).to.equal('un-deux-trois')
        })

        it('when decimal, truncates it toward 0', () => {
          expect(text.TEXTAFTER('un-deux-trois', 'z', 1, 0, 1.5)).to.equal('')
          expect(text.TEXTAFTER('un-deux-trois', 'z', 1, 0, 0.99)).to.equal(error.na)
        })
      })

      describe('with several delimiters (array or range)', () => {
        it('any of them is a delimiter, whatever their order', () => {
          expect(text.TEXTAFTER('a-b_c', [['-'], ['_']])).to.equal('b_c')
          expect(text.TEXTAFTER('a-b_c', [['_'], ['-']])).to.equal('b_c')
          expect(text.TEXTAFTER('a-b_c', [['-'], ['_']], 2)).to.equal('c')
        })

        it('at a given position, the longest delimiter wins', () => {
          expect(text.TEXTAFTER('a--b', [['-'], ['--']])).to.equal('b')
          expect(text.TEXTAFTER('a---b', [['--'], ['-']], 1)).to.equal('-b')
          expect(text.TEXTAFTER('a---b', [['--'], ['-']], 2)).to.equal('b')
        })

        it('when instance_num < 0, two instances may overlap', () => {
          expect(text.TEXTAFTER('a--b--c', [['-'], ['--']], -1)).to.equal('c')
          expect(text.TEXTAFTER('a--b--c', [['-'], ['--']], -2)).to.equal('c')
          expect(text.TEXTAFTER('a--b--c', [['-'], ['--']], -3)).to.equal('b--c')
          expect(text.TEXTAFTER('xabcx', [['abc'], ['c']], -1)).to.equal('x')
          expect(text.TEXTAFTER('xabcx', [['abc'], ['c']], -2)).to.equal('x')
        })

        it('flattens a 1D array, a column, a row or a 2D range', () => {
          expect(text.TEXTAFTER('a-b_c', ['-', '_'])).to.equal('b_c')
          expect(text.TEXTAFTER('a-b_c', [['-'], ['_']])).to.equal('b_c')
          expect(text.TEXTAFTER('a-b_c', [['-', '_']])).to.equal('b_c')
          expect(
            text.TEXTAFTER('a-b_c', [
              ['-', '_'],
              ['x', 'y']
            ])
          ).to.equal('b_c')
        })
      })

      describe('when the delimiter is not found', () => {
        it('returns #N/A', () => {
          expect(text.TEXTAFTER('un-deux-trois', 'z')).to.equal(error.na)
          expect(text.TEXTAFTER('un-deux-trois', '-', 3)).to.equal(error.na)
          expect(text.TEXTAFTER('ab', 'abc')).to.equal(error.na)
          expect(text.TEXTAFTER('', '-')).to.equal(error.na)
          expect(text.TEXTAFTER(null, '-')).to.equal(error.na)
        })

        it('returns if_not_found instead of #N/A, converted to text', () => {
          expect(text.TEXTAFTER('un-deux-trois', 'z', undefined, undefined, undefined, 'NF')).to.equal('NF')
          expect(text.TEXTAFTER('un-deux-trois', 'z', undefined, undefined, undefined, 5)).to.equal('5')
          expect(text.TEXTAFTER('un-deux-trois', 'z', undefined, undefined, undefined, true)).to.equal('TRUE')
          expect(text.TEXTAFTER('un-deux-trois', 'z', undefined, undefined, undefined, null)).to.equal('')
        })

        it('returns an error given as if_not_found only when it is used', () => {
          expect(text.TEXTAFTER('un-deux-trois', 'z', undefined, undefined, undefined, error.div0)).to.equal(error.div0)
          expect(text.TEXTAFTER('un-deux-trois', '-', undefined, undefined, undefined, error.div0)).to.equal(
            'deux-trois'
          )
        })
      })

      describe('throw error #VALUE!', () => {
        it('when instance_num is 0 or rounds down to 0', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', 0)).to.equal(error.value)
          expect(text.TEXTAFTER('un-deux-trois', '-', 0.5)).to.equal(error.value)
          expect(text.TEXTAFTER('un-deux-trois', '-', false)).to.equal(error.value)
          expect(text.TEXTAFTER('un-deux-trois', '-', null)).to.equal(error.value)
        })

        it('when instance_num is a non-numeric text', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', 'abc')).to.equal(error.value)
          expect(text.TEXTAFTER('un-deux-trois', '-', '')).to.equal(error.value)
        })

        it('when |instance_num| > length of text - length of the shortest delimiter + 1', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', 13)).to.equal(error.na)
          expect(text.TEXTAFTER('un-deux-trois', '-', 14)).to.equal(error.value)
          expect(text.TEXTAFTER('un-deux-trois', '-', -14)).to.equal(error.value)
          expect(text.TEXTAFTER('abcd', 'bc', 3)).to.equal(error.na)
          expect(text.TEXTAFTER('abcd', 'bc', 4)).to.equal(error.value)
          expect(text.TEXTAFTER('ab', 'abc', 1)).to.equal(error.value)
          expect(text.TEXTAFTER('', '-', 1)).to.equal(error.value)
        })

        it('when instance_num is out of bounds, even with match_end or if_not_found', () => {
          expect(text.TEXTAFTER('abcd', 'bc', 4, 0, 1)).to.equal(error.value)
          expect(text.TEXTAFTER('un-deux-trois', '-', 14, undefined, undefined, 'NF')).to.equal(error.value)
        })

        it('when match_mode or match_end is not 0 or 1', () => {
          expect(text.TEXTAFTER('xAyaz', 'a', undefined, 2)).to.equal(error.value)
          expect(text.TEXTAFTER('xAyaz', 'a', undefined, -1)).to.equal(error.value)
          expect(text.TEXTAFTER('xAyaz', 'a', undefined, 'x')).to.equal(error.value)
          expect(text.TEXTAFTER('un-deux-trois', '-', 1, 0, 2)).to.equal(error.value)
          expect(text.TEXTAFTER('un-deux-trois', '-', 1, 0, -1)).to.equal(error.value)
        })

        it('when delimiter is an empty array', () => {
          expect(text.TEXTAFTER('a-b_c', [])).to.equal(error.value)
        })

        it('when an array is given for another argument than delimiter', () => {
          expect(text.TEXTAFTER([['a-b'], ['c-d']], '-')).to.equal(error.value)
          expect(text.TEXTAFTER('a-b-c', '-', [[1], [2]])).to.equal(error.value)
          expect(text.TEXTAFTER('a-b-c', '-', 1, [[0], [1]])).to.equal(error.value)
          expect(text.TEXTAFTER('a-b-c', '-', 1, 0, [[0], [1]])).to.equal(error.value)
          expect(text.TEXTAFTER('a-b-c', 'z', 1, 0, 0, [['NF']])).to.equal(error.value)
        })
      })

      describe('errors given as args', () => {
        it('are propagated, whatever the argument', () => {
          expect(text.TEXTAFTER(error.div0, '-')).to.equal(error.div0)
          expect(text.TEXTAFTER('un-deux-trois', error.div0)).to.equal(error.div0)
          expect(text.TEXTAFTER('un-deux-trois', '-', error.div0)).to.equal(error.div0)
          expect(text.TEXTAFTER('un-deux-trois', '-', 1, error.div0)).to.equal(error.div0)
          expect(text.TEXTAFTER('un-deux-trois', '-', 1, 0, error.div0)).to.equal(error.div0)
        })

        it('in a delimiter array, are propagated even if another delimiter is found', () => {
          expect(text.TEXTAFTER('a-b', [['-'], [error.na]])).to.equal(error.na)
        })

        it('the first error in argument order wins, a conversion failure included', () => {
          expect(text.TEXTAFTER(error.div0, error.na)).to.equal(error.div0)
          expect(text.TEXTAFTER(error.na, error.div0)).to.equal(error.na)
          expect(text.TEXTAFTER('un-deux-trois', '-', 'abc', error.na)).to.equal(error.value)
        })

        it('win over an out-of-range value of a previous argument', () => {
          expect(text.TEXTAFTER('un-deux-trois', '-', 0, error.div0)).to.equal(error.div0)
          expect(text.TEXTAFTER(error.div0, '-', 0)).to.equal(error.div0)
        })
      })
    })
  })

  describe('TEXTBEFORE', () => {
    describe('args: (text, delimiter, [instance_num], [match_mode], [match_end], [if_not_found])', () => {
      describe('should return the text before the delimiter', () => {
        it('examples from Microsoft docs', () => {
          expect(text.TEXTBEFORE("Red riding hood's, red hood", 'hood')).to.equal('Red riding ')
          expect(text.TEXTBEFORE("Red riding hood's, red hood", '')).to.equal('')
          expect(text.TEXTBEFORE("Red riding hood's, red hood", '', -1)).to.equal("Red riding hood's, red hood")
          expect(text.TEXTBEFORE("Little Red Riding Hood's red hood", 'Red')).to.equal('Little ')
          expect(text.TEXTBEFORE("Little red Riding Hood's red hood", 'Red')).to.equal(error.na)
          expect(text.TEXTBEFORE("Little red Riding Hood's red hood", 'red', 2)).to.equal("Little red Riding Hood's ")
          expect(text.TEXTBEFORE('Marcus Aurelius', ' ', undefined, undefined, 1)).to.equal('Marcus')
          expect(text.TEXTBEFORE('Socrates', ' ', undefined, undefined, 1)).to.equal('Socrates')
        })

        it('with only the required args, uses the first instance', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-')).to.equal('un')
        })

        it('when instance_num > 0, counts the instances from the start of the text', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', 2)).to.equal('un-deux')
        })

        it('when instance_num < 0, counts the instances from the end of the text', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', -1)).to.equal('un-deux')
          expect(text.TEXTBEFORE('un-deux-trois', '-', -2)).to.equal('un')
        })

        it('when instance_num is decimal, rounds it down like INT', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', 1.9)).to.equal('un')
          expect(text.TEXTBEFORE('un-deux-trois', '-', -1.9)).to.equal('un')
          expect(text.TEXTBEFORE('un-deux-trois', '-', -0.5)).to.equal('un-deux')
        })

        it('when instance_num is a numeric text or a boolean, converts it to a number', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', ' 2 ')).to.equal('un-deux')
          expect(text.TEXTBEFORE('un-deux-trois', '-', true)).to.equal('un')
        })

        it('when the delimiter repeats, the instances do not overlap', () => {
          expect(text.TEXTBEFORE('aaaa', 'aa', 1)).to.equal('')
          expect(text.TEXTBEFORE('aaaa', 'aa', 2)).to.equal('aa')
          expect(text.TEXTBEFORE('aaa', 'aa', -1)).to.equal('a')
        })

        it('matches wildcard characters literally', () => {
          expect(text.TEXTBEFORE('a*b?c~d.e', '*')).to.equal('a')
          expect(text.TEXTBEFORE('a*b?c~d.e', '~*')).to.equal(error.na)
        })

        it('counts an emoji as a single character', () => {
          expect(text.TEXTBEFORE('😀a😀b', '😀', -1)).to.equal('😀a')
        })
      })

      describe('with an empty delimiter', () => {
        it('when instance_num > 0, matches the start of the text', () => {
          expect(text.TEXTBEFORE('abc', '', 100)).to.equal('')
        })

        it('when instance_num < 0, matches the end of the text', () => {
          expect(text.TEXTBEFORE('abc', '', -1)).to.equal('abc')
        })

        it('an empty cell is an empty delimiter', () => {
          expect(text.TEXTBEFORE('un-deux-trois', null)).to.equal('')
        })
      })

      describe('should convert text and delimiter to text', () => {
        it('with numbers, keeps 15 significant digits like Excel', () => {
          expect(text.TEXTBEFORE(12345, 3)).to.equal('12')
          expect(text.TEXTBEFORE(0.1 + 0.2, '.')).to.equal('0')
          expect(text.TEXTBEFORE(1 / 3, '.')).to.equal('0')
          expect(text.TEXTBEFORE(1e21, '+')).to.equal('1E')
          // Excel typed as 123456789012345678 keeps only 15 digits at input time
          expect(text.TEXTBEFORE(123456789012345000, '9')).to.equal('12345678')
          // derived from the measured TEXTAFTER(1 / 3, '.') = '333333333333333': the text is '0.333333333333333'
          expect(text.TEXTBEFORE(1 / 3, '3', -1)).to.equal('0.33333333333333')
        })

        it('with booleans, uses TRUE / FALSE', () => {
          expect(text.TEXTBEFORE(true, 'R')).to.equal('T')
          expect(text.TEXTBEFORE('xTRUEy', true)).to.equal('x')
        })
      })

      describe('match_mode', () => {
        it('when 0 or omitted, the search is case-sensitive', () => {
          expect(text.TEXTBEFORE('xAyaz', 'a')).to.equal('xAy')
          expect(text.TEXTBEFORE('xAyaz', 'a', undefined, 0)).to.equal('xAy')
        })

        it('when 1, the search is case-insensitive', () => {
          expect(text.TEXTBEFORE('xAyaz', 'a', undefined, 1)).to.equal('x')
          expect(text.TEXTBEFORE('aéb', 'É', undefined, 1)).to.equal('a')
          expect(text.TEXTBEFORE('aİb', 'i', undefined, 1)).to.equal('a')
        })

        it('when 1, does not fold ß to SS', () => {
          expect(text.TEXTBEFORE('straße', 'SS', undefined, 1)).to.equal(error.na)
        })

        it('when decimal, truncates it toward 0', () => {
          expect(text.TEXTBEFORE('xAyaz', 'a', undefined, 1.5)).to.equal('x')
          expect(text.TEXTBEFORE('xAyaz', 'a', undefined, 0.99)).to.equal('xAy')
          expect(text.TEXTBEFORE('xAyaz', 'a', undefined, -0.5)).to.equal('xAy')
        })
      })

      describe('match_end', () => {
        it('when 1 and instance_num > 0, the end of the text counts as one more delimiter', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', 3, 0, 1)).to.equal('un-deux-trois')
          expect(text.TEXTBEFORE('un-deux-trois', 'z', 1, 0, 1)).to.equal('un-deux-trois')
          expect(text.TEXTBEFORE('un-deux-trois', '-', 4, 0, 1)).to.equal(error.na)
        })

        it('when 1 and instance_num < 0, the start of the text counts as one more delimiter', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', -3, 0, 1)).to.equal('')
          expect(text.TEXTBEFORE('un-deux-trois', 'z', -1, 0, 1)).to.equal('')
        })

        it('when decimal, truncates it toward 0', () => {
          expect(text.TEXTBEFORE('un-deux-trois', 'z', 1, 0, 1.5)).to.equal('un-deux-trois')
          expect(text.TEXTBEFORE('un-deux-trois', 'z', 1, 0, 0.99)).to.equal(error.na)
        })
      })

      describe('with several delimiters (array or range)', () => {
        it('any of them is a delimiter, whatever their order', () => {
          expect(text.TEXTBEFORE('a-b_c', [['-'], ['_']])).to.equal('a')
          expect(text.TEXTBEFORE('a-b_c', [['_'], ['-']])).to.equal('a')
          expect(text.TEXTBEFORE('a-b_c', [['-'], ['_']], 2)).to.equal('a-b')
        })

        it('at a given position, the longest delimiter wins', () => {
          expect(text.TEXTBEFORE('a--b', [['-'], ['--']])).to.equal('a')
          expect(text.TEXTBEFORE('a---b', [['--'], ['-']], 1)).to.equal('a')
          expect(text.TEXTBEFORE('a---b', [['--'], ['-']], 2)).to.equal('a--')
        })

        it('when instance_num < 0, two instances may overlap', () => {
          expect(text.TEXTBEFORE('a--b--c', [['-'], ['--']], -1)).to.equal('a--b-')
          expect(text.TEXTBEFORE('a--b--c', [['-'], ['--']], -2)).to.equal('a--b')
          expect(text.TEXTBEFORE('a--b--c', [['-'], ['--']], -3)).to.equal('a-')
          expect(text.TEXTBEFORE('xabcx', [['abc'], ['c']], -1)).to.equal('xab')
          expect(text.TEXTBEFORE('xabcx', [['abc'], ['c']], -2)).to.equal('x')
        })

        it('flattens a 1D array, a column, a row or a 2D range', () => {
          expect(text.TEXTBEFORE('a-b_c', ['-', '_'])).to.equal('a')
          expect(text.TEXTBEFORE('a-b_c', [['-'], ['_']])).to.equal('a')
          expect(text.TEXTBEFORE('a-b_c', [['-', '_']])).to.equal('a')
          expect(
            text.TEXTBEFORE('a-b_c', [
              ['-', '_'],
              ['x', 'y']
            ])
          ).to.equal('a')
        })
      })

      describe('when the delimiter is not found', () => {
        it('returns #N/A', () => {
          expect(text.TEXTBEFORE('un-deux-trois', 'z')).to.equal(error.na)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 3)).to.equal(error.na)
          expect(text.TEXTBEFORE('ab', 'abc')).to.equal(error.na)
          expect(text.TEXTBEFORE('', '-')).to.equal(error.na)
          expect(text.TEXTBEFORE(null, '-')).to.equal(error.na)
        })

        it('returns if_not_found instead of #N/A, converted to text', () => {
          expect(text.TEXTBEFORE('un-deux-trois', 'z', undefined, undefined, undefined, 'NF')).to.equal('NF')
          expect(text.TEXTBEFORE('un-deux-trois', 'z', undefined, undefined, undefined, 5)).to.equal('5')
          expect(text.TEXTBEFORE('un-deux-trois', 'z', undefined, undefined, undefined, true)).to.equal('TRUE')
          expect(text.TEXTBEFORE('un-deux-trois', 'z', undefined, undefined, undefined, null)).to.equal('')
        })

        it('returns an error given as if_not_found only when it is used', () => {
          expect(text.TEXTBEFORE('un-deux-trois', 'z', undefined, undefined, undefined, error.div0)).to.equal(
            error.div0
          )
          expect(text.TEXTBEFORE('un-deux-trois', '-', undefined, undefined, undefined, error.div0)).to.equal('un')
        })
      })

      describe('throw error #VALUE!', () => {
        it('when instance_num is 0 or rounds down to 0', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', 0)).to.equal(error.value)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 0.5)).to.equal(error.value)
          expect(text.TEXTBEFORE('un-deux-trois', '-', false)).to.equal(error.value)
          expect(text.TEXTBEFORE('un-deux-trois', '-', null)).to.equal(error.value)
        })

        it('when instance_num is a non-numeric text', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', 'abc')).to.equal(error.value)
          expect(text.TEXTBEFORE('un-deux-trois', '-', '')).to.equal(error.value)
        })

        it('when |instance_num| > length of text - length of the shortest delimiter + 1', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', 13)).to.equal(error.na)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 14)).to.equal(error.value)
          expect(text.TEXTBEFORE('un-deux-trois', '-', -14)).to.equal(error.value)
          expect(text.TEXTBEFORE('abcd', 'bc', 3)).to.equal(error.na)
          expect(text.TEXTBEFORE('abcd', 'bc', 4)).to.equal(error.value)
          expect(text.TEXTBEFORE('ab', 'abc', 1)).to.equal(error.value)
          expect(text.TEXTBEFORE('', '-', 1)).to.equal(error.value)
        })

        it('when instance_num is out of bounds, even with match_end or if_not_found', () => {
          expect(text.TEXTBEFORE('abcd', 'bc', 4, 0, 1)).to.equal(error.value)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 14, undefined, undefined, 'NF')).to.equal(error.value)
        })

        it('when match_mode or match_end is not 0 or 1', () => {
          expect(text.TEXTBEFORE('xAyaz', 'a', undefined, 2)).to.equal(error.value)
          expect(text.TEXTBEFORE('xAyaz', 'a', undefined, -1)).to.equal(error.value)
          expect(text.TEXTBEFORE('xAyaz', 'a', undefined, 'x')).to.equal(error.value)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 1, 0, 2)).to.equal(error.value)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 1, 0, -1)).to.equal(error.value)
        })

        it('when delimiter is an empty array', () => {
          expect(text.TEXTBEFORE('a-b_c', [])).to.equal(error.value)
        })

        it('when an array is given for another argument than delimiter', () => {
          expect(text.TEXTBEFORE([['a-b'], ['c-d']], '-')).to.equal(error.value)
          expect(text.TEXTBEFORE('a-b-c', '-', [[1], [2]])).to.equal(error.value)
          expect(text.TEXTBEFORE('a-b-c', '-', 1, [[0], [1]])).to.equal(error.value)
          expect(text.TEXTBEFORE('a-b-c', '-', 1, 0, [[0], [1]])).to.equal(error.value)
          expect(text.TEXTBEFORE('a-b-c', 'z', 1, 0, 0, [['NF']])).to.equal(error.value)
        })
      })

      describe('errors given as args', () => {
        it('are propagated, whatever the argument', () => {
          expect(text.TEXTBEFORE(error.div0, '-')).to.equal(error.div0)
          expect(text.TEXTBEFORE('un-deux-trois', error.div0)).to.equal(error.div0)
          expect(text.TEXTBEFORE('un-deux-trois', '-', error.div0)).to.equal(error.div0)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 1, error.div0)).to.equal(error.div0)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 1, 0, error.div0)).to.equal(error.div0)
        })

        it('in a delimiter array, are propagated even if another delimiter is found', () => {
          expect(text.TEXTBEFORE('a-b', [['-'], [error.na]])).to.equal(error.na)
        })

        it('the first error in argument order wins, a conversion failure included', () => {
          expect(text.TEXTBEFORE(error.div0, error.na)).to.equal(error.div0)
          expect(text.TEXTBEFORE(error.na, error.div0)).to.equal(error.na)
          expect(text.TEXTBEFORE('un-deux-trois', '-', 'abc', error.na)).to.equal(error.value)
        })

        it('win over an out-of-range value of a previous argument', () => {
          expect(text.TEXTBEFORE('un-deux-trois', '-', 0, error.div0)).to.equal(error.div0)
          expect(text.TEXTBEFORE(error.div0, '-', 0)).to.equal(error.div0)
        })
      })
    })
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
