import 'should'

import * as error from '../../src/utils/error.js'
import * as utils from '../../src/utils/common.js'

describe('Utils => common', () => {
  it('flattenShallow', () => {
    should.deepEqual(
      utils.flattenShallow([
        [1, 2],
        [3, 4]
      ]),
      [1, 2, 3, 4]
    )

    should.deepEqual(utils.flattenShallow('not array'), 'not array')
  })

  it('isFlat', () => {
    utils
      .isFlat([
        [1, 2],
        [3, 4]
      ])
      .should.equal(false)

    utils.isFlat([1, 2, 3]).should.equal(true)
    utils.isFlat().should.equal(false)
  })

  it('flatten', () => {
    should.deepEqual(
      utils.flatten([
        [1, 2],
        [3, 4]
      ]),
      [1, 2, 3, 4]
    )

    should.deepEqual(utils.flatten([1, 2, [3, 4], [[5, 6]]]), [1, 2, 3, 4, 5, 6])
  })

  it('argsToArray', () => {
    // eslint-disable-next-line no-extra-semi
    ;(function () {
      should.deepEqual(utils.argsToArray(arguments), [1, 2, 3])
    })(1, 2, 3)
  })

  it('cleanFloat', () => {
    utils.cleanFloat(3.0999999999999996).should.equal(3.1)
  })

  it('parseBool', () => {
    utils.parseBool(true).should.equal(true)
    utils.parseBool(0).should.equal(false)
    utils.parseBool(1).should.equal(true)
    utils.parseBool('TRUE').should.equal(true)
    utils.parseBool('FALSE').should.equal(false)
    utils.parseBool(new Date()).should.equal(true)
    utils.parseBool(NaN).should.equal(true)
    const err = new Error()
    utils.parseBool(err).should.equal(err)
  })

  it('parseNumber', () => {
    utils.parseNumber().should.equal(0)
    utils.parseNumber(null).should.equal(0)
    utils.parseNumber('').should.equal(0)
    utils.parseNumber(2).should.equal(2)
    utils.parseNumber(error.na).should.equal(error.na)
    utils.parseNumber('text').should.equal(error.value)
  })

  it('parseNumberArray', () => {
    utils.parseNumberArray().should.equal(error.value)
    utils.parseNumberArray([2, 0, '', null, undefined]).should.eql([2, 0, 0, 0, 0])
    utils.parseNumberArray([2, 'a', 1, error.na]).should.equal(error.na)
    utils.parseNumberArray([2, 'a', 1]).should.equal(error.value)
  })

  it('parseString', () => {
    utils.parseString().should.equal('')
    utils.parseString(null).should.equal('')
    utils.parseString('').should.equal('')
    utils.parseString('text').should.equal('text')
    utils.parseString(2).should.equal('2')
    utils.parseString(error.na).should.equal(error.na)
  })

  it('parseMatrix', () => {
    utils.parseMatrix().should.equal(error.value)
    utils
      .parseMatrix([
        [1, 2, 3],
        [4, 5, 6]
      ])
      .should.deepEqual([
        [1, 2, 3],
        [4, 5, 6]
      ])
    utils
      .parseMatrix([
        [1, 2, 3],
        ['4', 5, 6]
      ])
      .should.deepEqual([
        [1, 2, 3],
        [4, 5, 6]
      ])
    utils
      .parseMatrix([
        [1, 2, 3],
        ['foo', 5, 6]
      ])
      .should.equal(error.value)
  })

  it('parseDateArray', () => {
    utils.parseDateArray(['01/jan/2009', 'invalid']).should.equal(error.value)
  })

  it('arrayValuesToNumbers', () => {
    should.deepEqual(utils.arrayValuesToNumbers(['1.4']), [1.4])
    should.deepEqual(utils.arrayValuesToNumbers(['not convertible']), [0])
  })

  it('rest', () => {
    utils.rest([1, 2, 3], 2).length.should.equal(1)
    utils.rest('abc', 2).length.should.equal(1)
    utils.rest(true, 2).should.equal(true)
  })

  it('initial', () => {
    utils.initial([1, 2, 3], 1).length.should.equal(2)
    utils.initial('abc', 2).length.should.equal(1)
    utils.initial(true, 1).should.equal(true)
  })

  it('transpose', () => {
    utils.transpose().should.equal(error.value)
    utils.transpose([[1], [2]]).should.deepEqual([[1, 2]])
    utils
      .transpose([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
      ])
      .should.deepEqual([
        [1, 5, 9],
        [2, 6, 10],
        [3, 7, 11],
        [4, 8, 12]
      ])
  })

  it('anyError', () => {
    should(utils.anyError()).be.undefined
    should(utils.anyError(undefined, null, 1, '', 'text')).be.undefined
    utils.anyError(error.na).should.be.equal(error.na)
    utils.anyError(1, error.na).should.be.equal(error.na)
    utils.anyError(error.value, error.na).should.be.equal(error.value)
  })

  it('anyIsError', () => {
    utils.anyIsError().should.be.false
    utils.anyIsError(undefined, null, 1, '', 'text').should.be.false
    utils.anyIsError(error.na).should.be.true
    utils.anyIsError(1, error.na).should.be.true
    utils.anyIsError(error.value, error.na).should.be.true
  })

  it('anyIsString', () => {
    utils.anyIsString().should.be.false
    utils.anyIsString(undefined, null, 1, 2.5).should.be.false
    utils.anyIsString(1, '').should.be.true
    utils.anyIsString(1, 'text').should.be.true
  })

  describe('parseDate', () => {
    it('should thrown an error in case of malformed input', () => {
      utils.parseDate('a').should.equal(error.value)
      utils.parseDate('2009 -07-01').should.equal(error.value)
      utils.parseDate('31/12/2009').should.equal(error.value)
      utils.parseDate('2009-31-12').should.equal(error.value)
    })

    it('should thrown an error in case of out of range input', () => {
      utils.parseDate(-1).should.equal(error.num)
      utils.parseDate(2958466).should.equal(error.num)
    })

    it('should parse date from serial number', () => {
      utils.parseDate(1).getTime().should.equal(new Date('1/1/1900').getTime())
      utils.parseDate(61).getTime().should.equal(new Date('3/1/1900').getTime())
      utils.parseDate(60.05).getTime().should.equal(new Date('2/29/1900 01:12:00').getTime())
      utils.parseDate(40729).getTime().should.equal(new Date('7/5/2011').getTime())
      utils.parseDate(40729.1805555556).getTime().should.equal(new Date('7/5/2011 04:20:00').getTime())
    })

    it('should parse date from string', () => {
      utils
        .parseDate('2009-7-1')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1).getTime())
      utils
        .parseDate('7/1/2009')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1).getTime())
      utils
        .parseDate('07/01/2009')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1).getTime())
      utils
        .parseDate('2009/07-01')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1).getTime())
    })

    it('should parse date with time from string', () => {
      utils
        .parseDate('2009-12-31  12:13')
        .getTime()
        .should.equal(new Date(2009, 12 - 1, 31, 12, 13).getTime())
      utils
        .parseDate('2009-7-1 11:11')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1, 11, 11).getTime())
      utils
        .parseDate('7/1/2009 11:11:11')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1, 11, 11, 11).getTime())
      utils
        .parseDate('2009-07-01 11:11')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1, 11, 11).getTime())
      utils
        .parseDate('07/01/2009 11:11:11')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1, 11, 11, 11).getTime())
      utils
        .parseDate('07/01/2009 11:11:11')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1, 11, 11, 11).getTime())
      utils
        .parseDate('11/11/11 12:12:12')
        .getTime()
        .should.equal(new Date(2011, 11 - 1, 11, 12, 12, 12).getTime())
    })

    it('should parse date from Date', () => {
      utils
        .parseDate(new Date(2009, 7 - 1, 1))
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1).getTime())
      utils
        .parseDate(new Date(2009, 7 - 1, 1, 11, 11, 11))
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1, 11, 11, 11).getTime())
    })

    xit('should parse date when day start with zero', () => {
      utils
        .parseDate('2009-07-01')
        .getTime()
        .should.equal(new Date(2009, 7 - 1, 1).getTime())
      utils
        .parseDate('2020-05-02')
        .getTime()
        .should.equal(new Date(2020, 5 - 1, 2).getTime())
    })
  })
})
