import { expect } from 'chai'

import * as error from '../../src/utils/error.js'
import * as utils from '../../src/utils/common.js'

describe('Utils => common', () => {
  describe('flattenShallow', () => {
    it('should flatten an array', () => {
      expect(
        utils.flattenShallow([
          [1, 2],
          [3, 4]
        ])
      ).to.deep.equal([1, 2, 3, 4])
    })

    it('should force an array in case of single value', () => {
      expect(utils.flattenShallow('not array')).to.deep.equal(['not array'])
    })
  })

  it('isFlat', () => {
    expect(
      utils.isFlat([
        [1, 2],
        [3, 4]
      ])
    ).to.equal(false)

    expect(utils.isFlat([1, 2, 3])).to.equal(true)
    expect(utils.isFlat()).to.equal(false)
  })

  describe('flatten', () => {
    describe('with direct arguments', () => {
      it('should merge and flatten arguments', () => {
        expect(
          utils.flatten([
            [1, 2],
            [3, 4]
          ])
        ).to.deep.equal([1, 2, 3, 4])
        expect(utils.flatten([1, 2, [3, 4], [[5, 6]]])).to.deep.equal([1, 2, 3, 4, 5, 6])
        expect(utils.flatten([[1]], 2, [3, 4], [[5, 6]])).to.deep.equal([1, 2, 3, 4, 5, 6])
        expect(utils.flatten(['test'])).to.deep.equal(['test'])
        expect(utils.flatten([[12]])).to.deep.equal([12])
        expect(utils.flatten(null)).to.deep.equal([null])
      })

      it('should force array type return', () => {
        expect(utils.flatten('test')).to.deep.equal(['test'])
        expect(utils.flatten(12)).to.deep.equal([12])
      })

      it('should return an empty array', () => {
        expect(utils.flatten()).to.deep.equal([])
      })
    })

    describe('with Arguments as arguments', () => {
      it('should merge and flatten arguments', () => {
        ;(function () {
          expect(utils.flatten(arguments)).to.deep.equal([1, 2, 3, 4, 5, 6])
        })([[1]], 2, [3, 4], [[5, 6]])
      })

      it('should force array type return', () => {
        ;(function () {
          expect(utils.flatten(arguments)).to.deep.equal(['test'])
        })('test')
        ;(function () {
          expect(utils.flatten(arguments)).to.deep.equal([12])
        })(12)
      })

      it('should return an empty array', () => {
        ;(function () {
          expect(utils.flatten(arguments)).to.deep.equal([])
        })()
      })
    })
  })

  it('argsToArray', () => {
    // eslint-disable-next-line no-extra-semi
    ;(function () {
      expect(utils.argsToArray(arguments)).to.deep.equal([1, 2, 3])
    })(1, 2, 3)
  })

  it('cleanFloat', () => {
    expect(utils.cleanFloat(3.0999999999999996)).to.equal(3.1)
  })

  it('parseBool', () => {
    expect(utils.parseBool(true)).to.equal(true)
    expect(utils.parseBool(0)).to.equal(false)
    expect(utils.parseBool(1)).to.equal(true)
    expect(utils.parseBool('TRUE')).to.equal(true)
    expect(utils.parseBool('FALSE')).to.equal(false)
    expect(utils.parseBool(new Date())).to.equal(true)
    expect(utils.parseBool(NaN)).to.equal(true)
    const err = new Error()
    expect(utils.parseBool(err)).to.equal(err)
  })

  it('parseNumber', () => {
    expect(utils.parseNumber()).to.equal(0)
    expect(utils.parseNumber(null)).to.equal(0)
    expect(utils.parseNumber('')).to.equal(0)
    expect(utils.parseNumber(2)).to.equal(2)
    expect(utils.parseNumber(error.na)).to.equal(error.na)
    expect(utils.parseNumber('text')).to.equal(error.value)
  })

  it('parseNumberArray', () => {
    expect(utils.parseNumberArray()).to.equal(error.value)
    expect(utils.parseNumberArray([2, 0, '', null, undefined])).to.eql([2, 0, 0, 0, 0])
    expect(utils.parseNumberArray([2, 'a', 1, error.na])).to.equal(error.na)
    expect(utils.parseNumberArray([2, 'a', 1])).to.equal(error.value)
  })

  it('parseString', () => {
    expect(utils.parseString()).to.equal('')
    expect(utils.parseString(null)).to.equal('')
    expect(utils.parseString('')).to.equal('')
    expect(utils.parseString('text')).to.equal('text')
    expect(utils.parseString(2)).to.equal('2')
    expect(utils.parseString(error.na)).to.equal(error.na)
  })

  it('parseMatrix', () => {
    expect(utils.parseMatrix()).to.equal(error.value)
    expect(
      utils.parseMatrix([
        [1, 2, 3],
        [4, 5, 6]
      ])
    ).to.deep.equal([
      [1, 2, 3],
      [4, 5, 6]
    ])
    expect(
      utils.parseMatrix([
        [1, 2, 3],
        ['4', 5, 6]
      ])
    ).to.deep.equal([
      [1, 2, 3],
      [4, 5, 6]
    ])
    expect(
      utils.parseMatrix([
        [1, 2, 3],
        ['foo', 5, 6]
      ])
    ).to.deep.equal(error.value)
  })

  it('parseDateArray', () => {
    expect(utils.parseDateArray(['01/jan/2009', 'invalid'])).to.equal(error.value)
  })

  it('arrayValuesToNumbers', () => {
    expect(utils.arrayValuesToNumbers(['1.4'])).to.deep.equal([1.4])
    expect(utils.arrayValuesToNumbers(['not convertible'])).to.deep.equal([0])
  })

  it('rest', () => {
    expect(utils.rest([1, 2, 3], 2).length).to.equal(1)
    expect(utils.rest('abc', 2).length).to.equal(1)
    expect(utils.rest(true, 2)).to.equal(true)
  })

  it('initial', () => {
    expect(utils.initial([1, 2, 3], 1).length).to.equal(2)
    expect(utils.initial('abc', 2).length).to.equal(1)
    expect(utils.initial(true, 1)).to.equal(true)
  })

  it('transpose', () => {
    expect(utils.transpose()).to.equal(error.value)
    expect(utils.transpose([[1], [2]])).to.deep.equal([[1, 2]])
    expect(
      utils.transpose([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
      ])
    ).to.deep.equal([
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11],
      [4, 8, 12]
    ])
  })

  it('anyError', () => {
    expect(utils.anyError()).to.be.undefined
    expect(utils.anyError(undefined, null, 1, '', 'text')).to.be.undefined
    expect(utils.anyError(error.na)).to.be.equal(error.na)
    expect(utils.anyError(1, error.na)).to.be.equal(error.na)
    expect(utils.anyError(error.value, error.na)).to.be.equal(error.value)
  })

  it('anyIsError', () => {
    expect(utils.anyIsError()).to.be.false
    expect(utils.anyIsError(undefined, null, 1, '', 'text')).to.be.false
    expect(utils.anyIsError(error.na)).to.be.true
    expect(utils.anyIsError(1, error.na)).to.be.true
    expect(utils.anyIsError(error.value, error.na)).to.be.true
  })

  it('anyIsString', () => {
    expect(utils.anyIsString()).to.be.false
    expect(utils.anyIsString(undefined, null, 1, 2.5)).to.be.false
    expect(utils.anyIsString(1, '')).to.be.true
    expect(utils.anyIsString(1, 'text')).to.be.true
  })

  describe('parseDate', () => {
    it('should thrown an error in case of malformed input', () => {
      expect(utils.parseDate('a')).to.equal(error.value)
      expect(utils.parseDate('2009 -07-01')).to.equal(error.value)
      expect(utils.parseDate('31/12/2009')).to.equal(error.value)
      expect(utils.parseDate('2009-31-12')).to.equal(error.value)
    })

    it('should thrown an error in case of out of range input', () => {
      expect(utils.parseDate(-1)).to.equal(error.num)
      expect(utils.parseDate(2958466)).to.equal(error.num)
    })

    it('should parse date from serial number', () => {
      expect(utils.parseDate(1).getTime()).to.equal(new Date('1/1/1900').getTime())
      expect(utils.parseDate(61).getTime()).to.equal(new Date('3/1/1900').getTime())
      expect(utils.parseDate(60.05).getTime()).to.equal(new Date('2/29/1900 01:12:00').getTime())
      expect(utils.parseDate(40729).getTime()).to.equal(new Date('7/5/2011').getTime())
      expect(utils.parseDate(40729.1805555556).getTime()).to.equal(new Date('7/5/2011 04:20:00').getTime())
    })

    xit('should parse non-iso formatted string', () => {
      expect(utils.parseDate('2009-7-1').getTime()).to.equal(new Date(2009, 7 - 1, 1).getTime())
    })

    it('should parse date from string', () => {
      expect(utils.parseDate('7/1/2009').getTime()).to.equal(new Date(2009, 7 - 1, 1).getTime())
      expect(utils.parseDate('07/01/2009').getTime()).to.equal(new Date(2009, 7 - 1, 1).getTime())
      expect(utils.parseDate('2009/07-01').getTime()).to.equal(new Date(2009, 7 - 1, 1).getTime())
    })

    it('should parse date with time from string', () => {
      expect(utils.parseDate('2009-12-31  12:13').getTime()).to.equal(new Date(2009, 12 - 1, 31, 12, 13).getTime())
      expect(utils.parseDate('2009-7-1 11:11').getTime()).to.equal(new Date(2009, 7 - 1, 1, 11, 11).getTime())
      expect(utils.parseDate('7/1/2009 11:11:11').getTime()).to.equal(new Date(2009, 7 - 1, 1, 11, 11, 11).getTime())
      expect(utils.parseDate('2009-07-01 11:11').getTime()).to.equal(new Date(2009, 7 - 1, 1, 11, 11).getTime())
      expect(utils.parseDate('07/01/2009 11:11:11').getTime()).to.equal(new Date(2009, 7 - 1, 1, 11, 11, 11).getTime())
      expect(utils.parseDate('07/01/2009 11:11:11').getTime()).to.equal(new Date(2009, 7 - 1, 1, 11, 11, 11).getTime())
      expect(utils.parseDate('11/11/11 12:12:12').getTime()).to.equal(new Date(2011, 11 - 1, 11, 12, 12, 12).getTime())
    })

    it('should parse date from Date', () => {
      expect(utils.parseDate(new Date(2009, 7 - 1, 1)).getTime()).to.equal(new Date(2009, 7 - 1, 1).getTime())
      expect(utils.parseDate(new Date(2009, 7 - 1, 1, 11, 11, 11)).getTime()).to.equal(
        new Date(2009, 7 - 1, 1, 11, 11, 11).getTime()
      )
    })

    xit('should parse date when day start with zero', () => {
      expect(utils.parseDate('2009-07-01').getTime()).to.equal(new Date(2009, 7 - 1, 1).getTime())
      expect(utils.parseDate('2020-05-02').getTime()).to.equal(new Date(2020, 5 - 1, 2).getTime())
    })
  })
})
