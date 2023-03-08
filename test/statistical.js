import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as mathTrig from '../src/math-trig.js'
import * as statistical from '../src/statistical.js'

describe('Statistical', () => {
  it('AVEDEV', () => {
    expect(statistical.AVEDEV(undefined)).to.equal(error.num)
    expect(statistical.AVEDEV(2, undefined, undefined)).to.equal(0)
    expect(statistical.AVEDEV(error.na)).to.equal(error.na)
    expect(statistical.AVEDEV(2, 4, 8, 16)).to.approximately(4.5, 1e-9)
    expect(statistical.AVEDEV([2, 4, 8, 16])).to.approximately(4.5, 1e-9)
    expect(statistical.AVEDEV([2, 4], [8, 16])).to.approximately(4.5, 1e-9)
    expect(
      statistical.AVEDEV([
        [2, 4],
        [8, 16]
      ])
    ).to.approximately(4.5, 1e-9)
    expect(statistical.AVEDEV([2, 'invalid'], [8, 16])).to.equal(error.value)
  })

  it('AVERAGE', () => {
    expect(statistical.AVERAGE()).to.equal(error.na)
    expect(statistical.AVERAGE('')).to.equal(error.div0)
    expect(statistical.AVERAGE('text')).to.equal(error.div0)
    expect(statistical.AVERAGE(true)).to.equal(error.div0)
    expect(statistical.AVERAGE(false)).to.equal(error.div0)
    expect(statistical.AVERAGE(2)).to.equal(2)
    expect(statistical.AVERAGE('2')).to.equal(error.div0)
    expect(statistical.AVERAGE('7', 8, 8)).to.equal(8)

    expect(statistical.AVERAGE(null)).to.equal(error.div0)
    expect(statistical.AVERAGE(2, null, null)).to.equal(2)
    expect(statistical.AVERAGE(error.na)).to.equal(error.na)
    expect(statistical.AVERAGE(error.div0)).to.equal(error.div0)

    expect(statistical.AVERAGE(9, 7, 9)).to.approximately(8.333333333, 1e-9)
    expect(statistical.AVERAGE(2, 4, 8, 16)).to.approximately(7.5, 1e-9)
    expect(statistical.AVERAGE(2, 4, 8, 16, true, error.na)).to.equal(error.na)
    expect(statistical.AVERAGE(2, 4, 8, 16, '', '')).to.approximately(7.5, 1e-9)

    expect(statistical.AVERAGE([2, 4, 8, 16])).to.approximately(7.5, 1e-9)
    expect(statistical.AVERAGE([[2, 4]], [[8, 16]])).to.approximately(7.5, 1e-9)

    expect(
      statistical.AVERAGE(
        [[2, 4]],
        [
          [2, 4],
          [8, 16]
        ]
      )
    ).to.approximately(6, 1e-9)

    expect(
      statistical.AVERAGE([
        [2, 4],
        [8, 16]
      ])
    ).to.approximately(7.5, 1e-9)
    expect(
      statistical.AVERAGE(
        [
          [2, 4],
          [8, 16]
        ],
        8
      )
    ).to.approximately(7.6, 1e-9)
    expect(
      statistical.AVERAGE([
        [2, 4],
        [8, 16],
        [true, false]
      ])
    ).to.approximately(7.5, 1e-9)
  })

  it('AVERAGEA', () => {
    expect(statistical.AVERAGEA(undefined)).to.equal(error.div0)
    expect(statistical.AVERAGEA(2, undefined, undefined)).to.equal(2)
    expect(statistical.AVERAGEA(error.na)).to.equal(error.na)
    expect(statistical.AVERAGEA(2, 4, 8, 16)).to.approximately(7.5, 1e-9)
    expect(statistical.AVERAGEA([2, 4, 8, 16])).to.approximately(7.5, 1e-9)
    expect(statistical.AVERAGEA([2, 4], [8, 16])).to.approximately(7.5, 1e-9)
    expect(statistical.AVERAGEA([2, 4], [6, 8], [true, false])).to.approximately(3.5, 1e-9)
    expect(statistical.AVERAGEA([2, 4], [6, 8], [true, false], ['a', 'b'])).to.approximately(2.625, 1e-9)
  })

  it('AVERAGEIF', () => {
    expect(statistical.AVERAGEIF()).to.equal(error.na)
    expect(statistical.AVERAGEIF('')).to.equal(error.na)
    expect(statistical.AVERAGEIF('text')).to.equal(error.na)
    expect(statistical.AVERAGEIF(1)).to.equal(error.na)
    expect(
      statistical.AVERAGEIF([
        [2, 4],
        [8, 16]
      ])
    ).to.equal(error.na)
    expect(statistical.AVERAGEIF([[2, 4, 8, 16]], '>5', [[2, 4, 8, 16]], true)).to.equal(error.na)

    expect(statistical.AVERAGEIF(null, '>5')).to.equal(error.div0)
    expect(statistical.AVERAGEIF([[2, 4, 8, 16]], '>5')).to.equal(12)
    expect(statistical.AVERAGEIF([[2, 4, 8, 16]], '>4')).to.equal(12)

    expect(statistical.AVERAGEIF([[2, 4, 8, 16]], '>=4')).to.approximately(9.333333333, 1e-5)

    expect(statistical.AVERAGEIF([[2, 4, 8, 16]], '*')).to.equal(error.div0)
    expect(statistical.AVERAGEIF([[2, 4, 8, 16]], '<>')).to.equal(7.5)
    expect(statistical.AVERAGEIF([['a', 4, 'c', 'd']], '>2')).to.equal(4)
    expect(statistical.AVERAGEIF([['a', 'b', 'c', 'd']], '>2')).to.equal(error.div0)
    expect(
      statistical.AVERAGEIF(
        [
          [2, 4],
          [8, 16]
        ],
        '>4'
      )
    ).to.equal(12)
    expect(
      statistical.AVERAGEIF(
        [
          [2, 4],
          [8, 16]
        ],
        '>5',
        [
          [1, 2],
          [3, 4]
        ]
      )
    ).to.approximately(3.5, 1e-5)
    expect(
      statistical.AVERAGEIF(
        [
          [2, 4],
          [8, 'b']
        ],
        '>5',
        [
          [1, 2],
          [3, 4]
        ]
      )
    ).to.equal(3)
    expect(
      statistical.AVERAGEIF(
        [
          [2, 4],
          [8, 16]
        ],
        '>5',
        [
          [1, 2],
          [3, 'b']
        ]
      )
    ).to.equal(3)
    expect(
      statistical.AVERAGEIF(
        [
          [2, 4],
          [8, 16]
        ],
        '>5',
        [[1, 2]]
      )
    ).to.equal(error.value)
    expect(statistical.AVERAGEIF([2, 4, 'invalid', 16], '>5')).to.equal(16)
  })

  it('AVERAGEIFS', () => {
    expect(statistical.AVERAGEIFS()).to.equal(error.na)
    expect(statistical.AVERAGEIFS('')).to.equal(error.na)
    expect(statistical.AVERAGEIFS(1)).to.equal(error.na)
    expect(statistical.AVERAGEIFS(1, 2)).to.equal(error.na)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]])).to.equal(error.na)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[2, 4, 8, 16]], '>1', [[2, 4, 8, 16]])).to.equal(error.na)

    expect(
      statistical.AVERAGEIFS(
        [[2, 4, 8, 16]],
        [
          [2, 4],
          [8, 16]
        ],
        '>2'
      )
    ).to.equal(error.value)
    expect(
      statistical.AVERAGEIFS(
        [
          [2, 4],
          [8, 16]
        ],
        [[2, 4, 8, 16]],
        '>2'
      )
    ).to.equal(error.value)
    expect(
      statistical.AVERAGEIFS(
        [
          [2, 4],
          [8, 16]
        ],
        [
          [1, 2],
          [3, 4]
        ],
        '>2'
      )
    ).to.equal(12)
    expect(
      statistical.AVERAGEIFS(
        [
          [2, 4],
          [8, 16]
        ],
        [
          [1, 2],
          [3, 4]
        ],
        '>4'
      )
    ).to.equal(error.div0)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 2, 3, 4]], '>2')).to.equal(12)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 2, 3, 4]], '>=2')).to.approximately(9.333333333, 1e-5)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 2, 3, 4]], '<=2')).to.equal(3)

    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 'b', 3, 4]], '>0')).to.approximately(8.666666667, 1e-5)
    expect(statistical.AVERAGEIFS([[2, 'b', 8, 16]], [[1, 2, 3, 4]], '>0')).to.approximately(8.666666667, 1e-5)

    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 2, 3, 'a']], '>2')).to.equal(8)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [['a', 'b', 'c', 'd']], '>2')).to.equal(error.div0)
    expect(statistical.AVERAGEIFS([['a', 'b', 'c', 'd']], [['a', 'b', 'c', 'd']], '>2')).to.equal(error.div0)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 2, 3, 4]], '*')).to.equal(error.div0)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 2, 3, 4]], '<>')).to.equal(7.5)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 2, 3, 4]], '>2', [[1, 2, 3, 4]], '>2')).to.equal(12)
    expect(statistical.AVERAGEIFS([[2, 4, 8, 16]], [[1, 2, 3, 4]], '>2', [[1, 1, 1, 1]], '>2')).to.equal(error.div0)
  })

  it('BETA.DIST', () => {
    expect(statistical.BETA.DIST(2, 8, 10, true, 1, 3)).to.approximately(0.6854705810117458, 1e-9)
    expect(statistical.BETA.DIST(1 / 52, 0.4, 9.6, false)).to.approximately(9.966606842186748, 1e-9)
    expect(statistical.BETA.DIST(1 / 52, 0.4, 9.6, true)).to.approximately(0.5406016379941343, 1e-9)
    expect(statistical.BETA.DIST(2, 8, 10)).to.equal(error.value)
    expect(statistical.BETA.DIST(2, 8, 'invalid', 1, 3)).to.equal(error.value)
  })

  it('BETA.INV', () => {
    expect(statistical.BETA.INV(0.6854705810117458, 8, 10, 1, 3)).to.approximately(1.9999999999999998, 1e-9)
    expect(statistical.BETA.INV(0.6854705810117458, 'invalid', 10, 1, 3)).to.equal(error.value)
  })

  it('BINOM.DIST', () => {
    expect(statistical.BINOM.DIST(6, 10, 0.5, false)).to.approximately(0.205078125, 1e-9)
    expect(statistical.BINOM.DIST(6, 'invalid', 0.5, false)).to.equal(error.value)
  })

  it('BINOM.DIST.RANGE', () => {
    expect(statistical.BINOM.DIST.RANGE(60, 0.75, 48)).to.approximately(0.08397496742904752, 1e-9)
    expect(statistical.BINOM.DIST.RANGE(60, 0.75, 45, 50)).to.approximately(0.5236297934718873, 1e-9)
    expect(statistical.BINOM.DIST.RANGE(60, 0.75, 'invalid', 50)).to.equal(error.value)
  })

  it('BINOM.INV', () => {
    expect(statistical.BINOM.INV(6, 0.5, 0.75)).to.equal(4)
    expect(statistical.BINOM.INV(6, 'invalid', 0.75)).to.equal(error.value)
  })

  it('CHISQ.DIST', () => {
    expect(statistical.CHISQ.DIST(0.5, 1, true)).to.approximately(0.5204998778130242, 1e-9)
    expect(statistical.CHISQ.DIST(0.5, 'invalid', true)).to.equal(error.value)
  })

  it('CHISQ.DIST.RT', () => {
    expect(statistical.CHISQ.DIST.RT()).to.equal(error.na)
    expect(statistical.CHISQ.DIST.RT(1)).to.equal(error.na)
    expect(statistical.CHISQ.DIST.RT(-3, 4)).to.equal(error.num)
    expect(statistical.CHISQ.DIST.RT(4, 1.01 * Math.pow(10, 10))).to.equal(error.num)
    expect(statistical.CHISQ.DIST.RT('hello', 4)).to.equal(error.value)
    expect(statistical.CHISQ.DIST.RT(3, 4)).to.approximately(0.5578254, 1e-6)
  })

  it('CHISQ.INV', () => {
    expect(statistical.CHISQ.INV(0.93, 1)).to.approximately(3.283020286473263, 1e-9)
    expect(statistical.CHISQ.INV(0.6, 2)).to.approximately(1.83258146374831, 1e-9)
    expect(statistical.CHISQ.INV(0.6, 'invalid')).to.equal(error.value)
  })

  it('CHISQ.INV.RT', () => {
    expect(statistical.CHISQ.INV.RT()).to.equal(error.na)
    expect(statistical.CHISQ.INV.RT(0.5)).to.equal(error.na)
    expect(statistical.CHISQ.INV.RT(-1, 2)).to.equal(error.num)
    expect(statistical.CHISQ.INV.RT(0.4, 0.5)).to.equal(error.num)
    expect(statistical.CHISQ.INV.RT(0.5, 'hello')).to.equal(error.value)
    expect(statistical.CHISQ.INV.RT(0.4, 6)).to.approximately(6.210757195, 1e-9)
  })

  it('CHISQ.TEST', () => {
    expect(statistical.CHISQ.TEST()).to.equal(error.na)
    expect(statistical.CHISQ.TEST([58, 11, 10, 35, 25, 23])).to.equal(error.na)
    expect(statistical.CHISQ.TEST([58, 11, 10, 35, 25, 23], 'a')).to.equal(error.value)
    expect(statistical.CHISQ.TEST([58, 11, 10, 35, 25, 23], [45.35, 17.56, 16.09, 47.65, 18.44])).to.equal(error.value)
    expect(statistical.CHISQ.TEST([58, 11, 10, 35, 25, 23], [45.35, 17.56, 16.09, 47.65, 18.44, 16.91])).to.equal(
      0.006376
    )
    expect(
      statistical.CHISQ.TEST(
        [
          [58, 35],
          [11, 25],
          [10, 23]
        ],
        [
          [45.35, 47.65],
          [17.56, 18.44],
          [16.09, 16.91]
        ]
      )
    ).to.equal(0.000308)
    expect(
      statistical.CHISQ.TEST(
        [
          [58, 35],
          [11, 25],
          [10, 23]
        ],
        [[45.35], [17.56, 18.44], [16.09, 16.91]]
      )
    ).to.equal(error.value)
  })

  it('CONFIDENCE.NORM', () => {
    expect(statistical.CONFIDENCE.NORM(0.05, 2.5, 50)).to.approximately(0.6929519121748391, 1e-9)
    expect(statistical.CONFIDENCE.NORM(0.05, 'invalid', 50)).to.equal(error.value)
  })

  it('CONFIDENCE.T', () => {
    expect(statistical.CONFIDENCE.T(0.05, 1, 50)).to.approximately(0.28419685015290463, 1e-9)
    expect(statistical.CONFIDENCE.T(0.05, 1, 'invalid')).to.equal(error.value)
  })

  it('CORREL', () => {
    expect(statistical.CORREL([3, 2, 4, 5, 6], [9, 7, 12, 15, 17])).to.approximately(0.9970544855015815, 1e-9)
    expect(statistical.CORREL([3, 2, 4, 5, 6], [9, 7, 12, 'invalid', 17])).to.equal(error.value)
  })

  it('COUNT', () => {
    expect(statistical.COUNT()).to.equal(error.na)

    expect(statistical.COUNT(error.na)).to.equal(0)
    expect(statistical.COUNT(error.div0)).to.equal(0)
    expect(statistical.COUNT(1, error.div0, error.na)).to.equal(1)
    expect(statistical.COUNT('')).to.equal(0)
    expect(statistical.COUNT('1')).to.equal(0)
    expect(statistical.COUNT('text')).to.equal(0)
    expect(statistical.COUNT(1)).to.equal(1)
    expect(statistical.COUNT(null)).to.equal(0)
    expect(statistical.COUNT(true)).to.equal(0)
    expect(statistical.COUNT(false)).to.equal(0)
    expect(statistical.COUNT(error.na)).to.equal(0)
    expect(statistical.COUNT(1, 2, 3, 4)).to.equal(4)
    expect(statistical.COUNT(1, '', '', '')).to.equal(1)
    expect(statistical.COUNT(1, 2, 3, 4, 'text')).to.equal(4)
    expect(statistical.COUNT(1, 2, 3, 4, '21-10-2020')).to.equal(4)
    expect(statistical.COUNT(1, 2, '8:30 AM')).to.equal(2)
    expect(statistical.COUNT(1, 2, error.div0, 4)).to.equal(3)

    expect(statistical.COUNT([[1, 2, 3, 4]])).to.equal(4)
    expect(statistical.COUNT([[1, 2, 3, 4]], 1)).to.equal(5)
    expect(statistical.COUNT([[1, 2]], [[3, 4]])).to.equal(4)

    expect(
      statistical.COUNT([
        [1, 2],
        [3, 4]
      ])
    ).to.equal(4)
    expect(
      statistical.COUNT([
        [1, 2],
        [3, 2],
        [null, null]
      ])
    ).to.equal(4)
    expect(
      statistical.COUNT([
        [1, 2],
        ['a', 'b'],
        [null, null]
      ])
    ).to.equal(2)
  })

  it('COUNTA', () => {
    expect(statistical.COUNTA()).to.equal(error.na)

    expect(statistical.COUNTA(error.na)).to.equal(1)
    expect(statistical.COUNTA(error.div0)).to.equal(1)
    expect(statistical.COUNTA(1, error.div0, error.na)).to.equal(3)
    expect(statistical.COUNTA(1, 2, error.div0)).to.equal(3)
    expect(statistical.COUNTA(null)).to.equal(0)
    expect(statistical.COUNTA('')).to.equal(1)
    expect(statistical.COUNTA(1)).to.equal(1)
    expect(statistical.COUNTA('1')).to.equal(1)
    expect(statistical.COUNTA(true)).to.equal(1)
    expect(statistical.COUNTA(false)).to.equal(1)
    expect(statistical.COUNTA(1, '', '', '')).to.equal(4)
    expect(statistical.COUNTA('text')).to.equal(1)
    expect(statistical.COUNTA(1, null, 3, 'a', '', 'c')).to.equal(5)
    expect(statistical.COUNTA(1, error.na, '28-10-2021', 'text', '')).to.equal(5)

    expect(statistical.COUNTA([[1, 2, 3, 4]])).to.equal(4)
    expect(statistical.COUNTA([[1, 2, 3, 4]], 1)).to.equal(5)
    expect(statistical.COUNTA([[1, 2]], [[3, 4]])).to.equal(4)
    expect(statistical.COUNTA([[1, null, 3, 'a', '', 'c']])).to.equal(5)
    expect(statistical.COUNTA([[1, null, 3]], [['a', '', 'c']])).to.equal(5)

    expect(
      statistical.COUNTA([
        [1, null, 3],
        ['a', '', 'c']
      ])
    ).to.equal(5)
    expect(
      statistical.COUNT([
        [1, 2],
        [3, 4]
      ])
    ).to.equal(4)
    expect(
      statistical.COUNTA([
        [1, 2],
        [3, 2],
        [null, null]
      ])
    ).to.equal(4)
    expect(
      statistical.COUNTA([
        [1, 2],
        ['a', 'b'],
        [null, null]
      ])
    ).to.equal(4)
  })

  it('COUNTBLANK', () => {
    expect(statistical.COUNTBLANK()).to.equal(error.na)
    expect(statistical.COUNTBLANK(1, 2)).to.equal(error.na)
    expect(statistical.COUNTBLANK(1, error.div0, error.na)).to.equal(error.na)
    expect(statistical.COUNTBLANK(1, 2, error.div0)).to.equal(error.na)
    expect(statistical.COUNTBLANK(1, '', '', '')).to.equal(error.na)
    expect(statistical.COUNTBLANK([[1, 2, 3, 4]], 1)).to.equal(error.na)
    expect(statistical.COUNTBLANK([[1, 2]], [[3, 4]])).to.equal(error.na)
    expect(statistical.COUNTBLANK(1, null, 3, 'a', '', 'c')).to.equal(error.na)
    expect(statistical.COUNTBLANK([[1, null, 3, 'a', '', 'c']])).to.equal(2)
    expect(statistical.COUNTBLANK([[1, null, 3]], [['a', '', 'c']])).to.equal(error.na)
    expect(statistical.COUNTBLANK(1, error.na, '28-10-2021', 'text', '')).to.equal(error.na)

    expect(statistical.COUNTBLANK(error.na)).to.equal(0)
    expect(statistical.COUNTBLANK(error.div0)).to.equal(0)
    expect(statistical.COUNTBLANK(null)).to.equal(1)
    expect(statistical.COUNTBLANK('')).to.equal(1)
    expect(statistical.COUNTBLANK(' ')).to.equal(0)
    expect(statistical.COUNTBLANK(1)).to.equal(0)
    expect(statistical.COUNTBLANK('1')).to.equal(0)
    expect(statistical.COUNTBLANK(true)).to.equal(0)
    expect(statistical.COUNTBLANK(false)).to.equal(0)
    expect(statistical.COUNTBLANK('text')).to.equal(0)
    expect(statistical.COUNTBLANK([[1, 2, 3, 4]])).to.equal(0)

    expect(
      statistical.COUNTBLANK([
        [1, null, 3],
        ['a', '', 'c']
      ])
    ).to.equal(2)
    expect(
      statistical.COUNTBLANK([
        [1, 2],
        [3, 4]
      ])
    ).to.equal(0)
    expect(
      statistical.COUNTBLANK([
        [1, 2],
        [3, 2],
        [null, null]
      ])
    ).to.equal(2)
    expect(
      statistical.COUNTBLANK([
        [1, 2],
        ['a', 'b'],
        [null, null]
      ])
    ).to.equal(2)
  })

  it('COUNTIF', () => {
    expect(statistical.COUNTIF()).to.equal(error.na)
    expect(statistical.COUNTIF('')).to.equal(error.na)
    expect(statistical.COUNTIF(1)).to.equal(error.na)
    expect(statistical.COUNTIF('text')).to.equal(error.na)

    expect(statistical.COUNTIF(null, '>1')).to.equal(0)
    expect(statistical.COUNTIF(error.na, '>1')).to.equal(0)
    expect(statistical.COUNTIF([1, null, 3, 'a', ''], '>=1')).to.equal(2)
    expect(statistical.COUNTIF([1, null, 3, 'a', ''], '>1')).to.equal(1)
    expect(statistical.COUNTIF([1, null, 3, 'a', ''], '<=3')).to.equal(2)
    expect(statistical.COUNTIF([1, null, 3, 'a', ''], '<=1')).to.equal(1)
    expect(statistical.COUNTIF([1, null, 'c', 'a', ''], '>1')).to.equal(0)
    expect(statistical.COUNTIF([1, 2, 3, 3, 3], '=3')).to.equal(3)

    expect(
      statistical.COUNTIF(
        [
          [1, null, 3],
          ['a', 4, 'c']
        ],
        '>1'
      )
    ).to.equal(2)
    expect(
      statistical.COUNTIF(
        [
          [1, null, 'a'],
          ['a', 4, 'c']
        ],
        'a'
      )
    ).to.equal(2)
    expect(
      statistical.COUNTIF(
        [
          [1, null, 3],
          ['a', 4, 'c']
        ],
        ''
      )
    ).to.equal(0)
    expect(
      statistical.COUNTIF(
        [
          [1, null, 3],
          ['a', 4, 'c']
        ],
        '<>'
      )
    ).to.equal(5)
    expect(
      statistical.COUNTIF(
        [
          [1, 'v', 3],
          ['v', 4, 'c']
        ],
        '?'
      )
    ).to.equal(3)
    expect(
      statistical.COUNTIF(
        [
          [1, null, 3],
          ['?', 4, 'c']
        ],
        '~?'
      )
    ).to.equal(1)
    expect(
      statistical.COUNTIF(
        [
          [1, null, 'a'],
          ['a', 4, 'c']
        ],
        '*'
      )
    ).to.equal(3)

    expect(
      statistical.COUNTIF(
        [
          [1, null, 'texttext'],
          ['a', 4, 'text123text']
        ],
        'text*text'
      )
    ).to.equal(2)
    expect(
      statistical.COUNTIF(
        [
          [1, null, 'texttext'],
          ['textktext', 4, 'text123text']
        ],
        'text?text'
      )
    ).to.equal(1)
    expect(
      statistical.COUNTIF(
        [
          [1, null, 'texttext'],
          ['a', 4, 'text~atext']
        ],
        'text~~?text'
      )
    ).to.equal(1)

    expect(
      statistical.COUNTIF(
        [
          [1, null, 'texttext'],
          ['a', 4, 0]
        ],
        '<>'
      )
    ).to.equal(5)
    expect(
      statistical.COUNTIF(
        [
          [77, 'text', ''],
          [null, true, false]
        ],
        '<>?'
      )
    ).to.equal(6)
    expect(
      statistical.COUNTIF(
        [
          [77, 'text', ''],
          [null, true, false]
        ],
        '<>?'
      )
    ).to.equal(6)

    expect(
      statistical.COUNTIF(
        [
          [1, null, 'a'],
          ['a', 4, 'c']
        ],
        '*',
        2
      )
    ).to.equal(error.na)
    expect(
      statistical.COUNTIF([
        [1, null, 'a'],
        ['a', 4, 'c']
      ])
    ).to.equal(error.na)
  })

  it('COUNTIFS', () => {
    expect(statistical.COUNTIFS()).to.equal(error.na)
    expect(statistical.COUNTIFS('')).to.equal(error.na)
    expect(statistical.COUNTIFS('text')).to.equal(error.na)
    expect(statistical.COUNTIFS(1)).to.equal(error.na)

    expect(statistical.COUNTIFS(null, '>1')).to.equal(0)
    expect(statistical.COUNTIFS(error.na, '>1')).to.equal(0)
    expect(statistical.COUNTIFS([[1, null, 3, 'a', '']], '>1')).to.equal(1)
    expect(statistical.COUNTIFS([[1, null, 'c', 'a', '']], '>1')).to.equal(0)
    expect(
      statistical.COUNTIFS(
        [
          [1, null, 3],
          ['a', 4, 'c']
        ],
        '>1'
      )
    ).to.equal(2)
    expect(
      statistical.COUNTIFS(
        [
          [1, null, 'a'],
          ['a', 4, 'c']
        ],
        'a'
      )
    ).to.equal(2)
    expect(
      statistical.COUNTIFS(
        [
          [1, null, 'a'],
          ['a', 4, 'c']
        ],
        '<>'
      )
    ).to.equal(5)
    expect(
      statistical.COUNTIFS(
        [
          [1, '?', 'a'],
          ['a', 4, 'c']
        ],
        '~?'
      )
    ).to.equal(1)
    expect(
      statistical.COUNTIFS(
        [
          [1, '?', 'a'],
          ['a', 4, 'c']
        ],
        '*'
      )
    ).to.equal(4)
    expect(
      statistical.COUNTIFS(
        [
          [1, '?', 'a'],
          ['a', 4, 'c']
        ],
        ''
      )
    ).to.equal(0)

    expect(
      statistical.COUNTIFS(
        [
          [1, null, 'a'],
          ['a', 4, 'c']
        ],
        '*',
        3
      )
    ).to.equal(error.na)
    expect(
      statistical.COUNTIFS([
        [1, null, 'a'],
        ['a', 4, 'c']
      ])
    ).to.equal(error.na)
    expect(
      statistical.COUNTIFS(
        [
          [1, null, 'a'],
          ['a', 4, 'c']
        ],
        'a',
        [
          [1, null, 'a'],
          ['a', 4, 'c']
        ]
      )
    ).to.equal(error.na)

    expect(statistical.COUNTIFS([[1, null]], '1', [[2, null]], '2')).to.equal(1)
    expect(statistical.COUNTIFS([[1, null]], '1', [[null, 2]], '2')).to.equal(0)
    expect(statistical.COUNTIFS([[1, null]], '1', [[null, 2]], '*')).to.equal(0)
    expect(statistical.COUNTIFS([[1, null]], '*', [[null, 2]], '*')).to.equal(0)
    expect(statistical.COUNTIFS([[1], [null]], '1', [[2], [1]], '2')).to.equal(1)
    expect(statistical.COUNTIFS([[1, 2, 'a', 'b']], '*', [[3, 2, 1]], '>1')).to.equal(error.value)
  })

  it('COUNTUNIQUE', () => {
    expect(statistical.COUNTUNIQUE()).to.equal(0)
    expect(statistical.COUNTUNIQUE(1, 1, 2, 2, 3, 3)).to.equal(3)
    expect(statistical.COUNTUNIQUE([1, 1, 2, 2, 3, 3])).to.equal(3)
    expect(statistical.COUNTUNIQUE([1, 1, 2], [2, 3, 3])).to.equal(3)
    expect(
      statistical.COUNTUNIQUE(
        [
          [1, 1],
          [2, 5]
        ],
        [
          [2, 3],
          [3, 4]
        ]
      )
    ).to.equal(5)
  })

  it('COVARIANCE.P', () => {
    expect(statistical.COVARIANCE.P([3, 2, 4, 5, 6], [9, 7, 12, 15, 17])).to.approximately(5.2, 1e-9)
    expect(statistical.COVARIANCE.P([3, 2, 4, 5, 6], [9, 'invalid', 12, 15, 17])).to.equal(error.value)
  })

  it('COVARIANCE.S', () => {
    expect(statistical.COVARIANCE.S([2, 4, 8], [5, 11, 12])).to.approximately(9.666666666666668, 1e-9)
    expect(statistical.COVARIANCE.S([2, 4, 8], [5, 'invalid', 12])).to.equal(error.value)
  })

  it('DEVSQ', () => {
    expect(statistical.DEVSQ([4, 5, 8, 7, 11, 4, 3])).to.equal(48)
    expect(statistical.DEVSQ([4, 5, 8, 7, 'invalid', 4, 3])).to.equal(error.value)
  })

  it('EXPON.DIST', () => {
    expect(statistical.EXPON.DIST(0.2, 10, true)).to.approximately(0.8646647167633873, 1e-9)
    expect(statistical.EXPON.DIST(0.2, 10, false)).to.approximately(1.353352832366127, 1e-9)
    expect(statistical.EXPON.DIST(0.2, 'invalid', false)).to.equal(error.value)
  })

  it('F.DIST', () => {
    expect(statistical.F.DIST(15.20686486, 6, 4, false)).to.approximately(0.0012237995987608916, 1e-9)
    expect(statistical.F.DIST(15.20686486, 6, 4, true)).to.approximately(0.9899999999985833, 1e-9)
    expect(statistical.F.DIST(15.20686486, 6, 'invalid', false)).to.equal(error.value)
  })

  it('F.DIST.RT', () => {
    expect(statistical.F.DIST.RT()).to.equal(error.na)
    expect(statistical.F.DIST.RT(1)).to.equal(error.na)
    expect(statistical.F.DIST.RT(-3, 6, 4)).to.equal(error.num)
    expect(statistical.F.DIST.RT(4, -5, 4)).to.equal(error.num)
    expect(statistical.F.DIST.RT('hello', 6, 4)).to.equal(error.value)
    expect(statistical.F.DIST.RT(15.20686486, 6, 4)).to.approximately(0.01, 1e-3)
  })

  it('F.INV', () => {
    expect(statistical.F.INV(0.01, 6, 4)).to.approximately(0.10930991412457851, 1e-9)
    expect(statistical.F.INV(0.0, 6, 4)).to.equal(error.num)
    expect(statistical.F.INV(0.0, 'invalid', 4)).to.equal(error.value)
  })

  it('F.INV.RT', () => {
    expect(statistical.F.INV.RT()).to.equal(error.na)
    expect(statistical.F.INV.RT(1, 2)).to.equal(error.na)
    expect(statistical.F.INV.RT(-1, 6, 4)).to.equal(error.num)
    expect(statistical.F.INV.RT(1.2, -5, 4)).to.equal(error.num)
    expect(statistical.F.INV.RT(0.5, 'hello', 4)).to.equal(error.value)
    expect(statistical.F.INV.RT(0.01, 6, 4)).to.approximately(15.20686486, 1e-8)
  })

  it('F.TEST', () => {
    expect(statistical.F.TEST()).to.equal(error.na)
    expect(statistical.F.TEST('invalid', 100)).to.equal(error.na)
    expect(statistical.F.TEST([1, 3, 5, 7, 9])).to.equal(error.na)
    expect(statistical.F.TEST([1, 3, 5, 7, 9], [])).to.equal(error.div0)
    expect(statistical.F.TEST([1, 3, 5, 7, 9], [1])).to.equal(error.div0)
    expect(statistical.F.TEST([1], [1, 3, 5, 7, 9])).to.equal(error.div0)
    expect(statistical.F.TEST([1], [1])).to.equal(error.div0)
    expect(statistical.F.TEST([1, 3, 5, 7, 9], [5, 9, 3, 8, 3])).to.approximately(1.282, 1e-3)
    expect(statistical.F.TEST([4, 2, 5, 1, 3], [8, 3, 9, 0, 1])).to.approximately(0.1497, 1e-4)
  })

  it('FISHER', () => {
    expect(statistical.FISHER(0.75)).to.approximately(0.9729550745276566, 1e-9)
    expect(statistical.FISHER('invalid')).to.equal(error.value)
  })

  it('FISHERINV', () => {
    expect(statistical.FISHERINV(0.9729550745276566)).to.approximately(0.75, 1e-9)
    expect(statistical.FISHERINV('invalid')).to.equal(error.value)
  })

  it('FORECAST', () => {
    expect(statistical.FORECAST(30, [6, 7, 9, 15, 21], [20, 28, 31, 38, 40])).to.approximately(10.607253086419755, 1e-9)
    expect(statistical.FORECAST(30, [6, 7, 'invalid', 15, 21], [20, 28, 31, 38, 40])).to.equal(error.value)
  })

  it('FREQUENCY', () => {
    expect(statistical.FREQUENCY([79, 85, 78, 85, 50, 81, 95, 88, 97], [70, 79, 89])).to.deep.equal([1, 2, 4, 2])
    expect(statistical.FREQUENCY([79, 85, 78, 85, 50, 81, 'invalid', 88, 97], [70, 79, 89])).to.equal(error.value)
  })

  it('GAMMA', () => {
    expect(statistical.GAMMA(2.5)).to.approximately(1.3293403919101043, 1e-9)
    expect(statistical.GAMMA(-3.75)).to.approximately(0.26786611734776916, 1e-9)
    expect(statistical.GAMMA(0)).to.equal(error.num)
    expect(statistical.GAMMA(-2)).to.equal(error.num)
    expect(statistical.GAMMA('invalid')).to.equal(error.value)
  })

  it('GAMMA.DIST', () => {
    expect(statistical.GAMMA.DIST(1)).to.equal(error.na)
    expect(statistical.GAMMA.DIST(1, 9, 2)).to.equal(error.na)
    expect(statistical.GAMMA.DIST(-1, 9, 2, true)).to.equal(error.value)
    expect(statistical.GAMMA.DIST(1, -9, 2, true)).to.equal(error.value)
    expect(statistical.GAMMA.DIST(1, 9, -2, true)).to.equal(error.value)
    expect(statistical.GAMMA.DIST('invalid', 9, -2, true)).to.equal(error.value)
    expect(statistical.GAMMA.DIST(1, 'invalid', -2, true)).to.equal(error.value)
    expect(statistical.GAMMA.DIST(1, 9, 'invalid', true)).to.equal(error.value)
    expect(statistical.GAMMA.DIST(10.00001131, 9, 2, true)).to.approximately(0.068094, 1e-6)
    expect(statistical.GAMMA.DIST(10.00001131, 9, 2, false)).to.approximately(0.03263913, 1e-9)
  })

  it('GAMMA.INV', () => {
    expect(statistical.GAMMA.INV(1)).to.equal(error.na)
    expect(statistical.GAMMA.INV(1, 9)).to.equal(error.na)
    expect(statistical.GAMMA.INV(-1, 9, 2)).to.equal(error.num)
    expect(statistical.GAMMA.INV(1, -9, 2)).to.equal(error.num)
    expect(statistical.GAMMA.INV(1, 9, -2)).to.equal(error.num)
    expect(statistical.GAMMA.INV('hello', 9, 2)).to.equal(error.value)
    expect(statistical.GAMMA.INV(0.068094, 9, 2)).to.approximately(10.000011, 1e-6)
  })

  it('GAMMALN', () => {
    expect(statistical.GAMMALN(4)).to.approximately(1.7917594692280547, 1e-9)
    expect(statistical.GAMMALN('invalid')).to.equal(error.value)
  })

  it('GAMMALN.PRECISE', () => {
    expect(statistical.GAMMALN.PRECISE()).to.equal(error.na)
    expect(statistical.GAMMALN.PRECISE(0)).to.equal(error.num)
    expect(statistical.GAMMALN.PRECISE(-1)).to.equal(error.num)
    expect(statistical.GAMMALN.PRECISE('string')).to.equal(error.value)
    expect(statistical.GAMMALN.PRECISE(4.5)).to.approximately(2.453736571, 1e-6)
  })

  it('GAUSS', () => {
    expect(statistical.GAUSS(2)).to.approximately(0.4772498680518208, 1e-9)
    expect(statistical.GAUSS('invalid')).to.equal(error.value)
  })

  it('GEOMEAN', () => {
    expect(statistical.GEOMEAN([4, 5, 8, 7, 11, 4, 3])).to.approximately(5.476986969656962, 1e-9)
    expect(statistical.GEOMEAN([4, 5, 8, 7, 'invalid', 4, 3])).to.equal(error.value)
  })

  it('GROWTH', () => {
    const known_y = [33100, 47300, 69000, 102000, 150000, 220000]
    const known_x = [11, 12, 13, 14, 15, 16]
    const new_x = [11, 12, 13, 14, 15, 16, 17, 18, 19]

    expect(mathTrig.SUM(statistical.GROWTH(known_y, known_x, new_x))).to.approximately(
      mathTrig.SUM([
        32618.203773538437, 47729.42261474665, 69841.30085621694, 102197.07337883314, 149542.4867400494,
        218821.87621460424, 320196.7183634903, 468536.05418408214, 685597.3889812973
      ]),
      1e-6
    )

    expect(mathTrig.SUM(statistical.GROWTH(known_y))).to.approximately(
      mathTrig.SUM([
        32618.203773539713, 47729.42261474775, 69841.30085621744, 102197.07337883241, 149542.4867400457,
        218821.8762145953
      ]),
      1e-6
    )

    expect(mathTrig.SUM(statistical.GROWTH(known_y, known_x, new_x, false))).to.approximately(
      mathTrig.SUM([
        9546.01078362295, 21959.574129266384, 50515.645421859634, 116205.8251842928, 267319.0393588225,
        614938.7837519756, 1414600.7282884493, 3254137.2789414385, 7485793.848705778
      ]),
      1e-6
    )

    expect(statistical.GROWTH(known_y, known_x, 'invalid', false)).to.equal(error.value)
    expect(statistical.GROWTH('invalid', known_x)).to.equal(error.value)
  })

  it('HARMEAN', () => {
    expect(statistical.HARMEAN([4, 5, 8, 7, 11, 4, 3])).to.approximately(5.028375962061728, 1e-9)
    expect(statistical.HARMEAN([4, 5, 8, 7, 'invalid', 4, 3])).to.equal(error.value)
  })

  it('HYPGEOM.DIST', () => {
    expect(statistical.HYPGEOM.DIST(1, 4, 8, 20, true)).to.approximately(0.46542827657378744, 1e-9)
    expect(statistical.HYPGEOM.DIST(1, 4, 8, 20, false)).to.approximately(0.3632610939112487, 1e-9)
    expect(statistical.HYPGEOM.DIST(1, 'invalid', 8, 20, false)).to.equal(error.value)
  })

  it('INTERCEPT', () => {
    expect(statistical.INTERCEPT([2, 3, 9, 1, 8], [6, 5, 11, 7, 5])).to.approximately(0.04838709677419217, 1e-9)

    expect(statistical.INTERCEPT([1, 2, 3], [1, 2, 3, 4])).to.equal(error.na)
    expect(statistical.INTERCEPT([1, 2, 3], [1, 'invalid', 3, 4])).to.equal(error.value)
  })

  it('KURT', () => {
    expect(statistical.KURT([3, 4, 5, 2, 3, 4, 5, 6, 4, 7])).to.approximately(-0.15179963720841627, 1e-9)
    expect(statistical.KURT([3, 4, 5, 2, 'invalid', 4, 5, 6, 4, 7])).to.equal(error.value)
  })

  it('LARGE', () => {
    expect(statistical.LARGE()).to.equal(error.na)
    expect(statistical.LARGE('')).to.equal(error.na)
    expect(statistical.LARGE(1)).to.equal(error.na)
    expect(statistical.LARGE('text')).to.equal(error.na)
    expect(statistical.LARGE(1, 2, 3)).to.equal(error.na)
    expect(statistical.LARGE([1, 2, 'a', 4, 5, ''], 3, 5)).to.equal(error.na)
    expect(statistical.LARGE([[1, 2, error.na, 4, 5]], 1)).to.equal(error.na)

    expect(statistical.LARGE([[1, 2, error.div0, 4, 5]], 1)).to.equal(error.div0)

    expect(statistical.LARGE([[1, 2, 3]], '')).to.equal(error.value)
    expect(statistical.LARGE([1, 2, 'a', 4, 5, ''], 'text')).to.equal(error.value)

    expect(statistical.LARGE([[1, 2, 3]], null)).to.equal(error.num)
    expect(statistical.LARGE([[1, 2, 3]], 4)).to.equal(error.num)
    expect(statistical.LARGE([[3, 5, 3]], -3)).to.equal(error.num)
    expect(statistical.LARGE([[3, 5, 3, true]], 4)).to.equal(error.num)
    expect(statistical.LARGE([[true, false]], 1)).to.equal(error.num)
    expect(statistical.LARGE([['a', 'a', 'a', 'a', 'a']], 1)).to.equal(error.num)
    expect(statistical.LARGE([[3, 5, 3, null, 4]], 5)).to.equal(error.num)
    expect(statistical.LARGE(10, 2)).to.equal(error.num)
    expect(statistical.LARGE(10, null)).to.equal(error.num)
    expect(statistical.LARGE([[null, 2]], 2)).to.equal(error.num)
    expect(statistical.LARGE([['3', 5, '3', null, 4]], 3)).to.equal(error.num)
    expect(statistical.LARGE([[1, 2, 'a', 4, 5]], 0)).to.equal(error.num)

    expect(statistical.LARGE([3, 4, 5, 2, 'text', 4, 6, 4, 7], 4)).to.equal(4)
    expect(statistical.LARGE([3, 4, 5, 2, 3, 4, 6, 4, 7], 4)).to.equal(4)
    expect(statistical.LARGE([1, 2, 'a', 4, 5, ''], 3)).to.equal(2)
    expect(statistical.LARGE([[3, 5, 3, true]], 3)).to.equal(3)
    expect(statistical.LARGE(10, 1)).to.equal(10)
    expect(statistical.LARGE(10, true)).to.equal(10)
    expect(statistical.LARGE([[1, 3, 2, 5, 4]], 1)).to.equal(5)
    expect(statistical.LARGE([[1, 3, 2, 5, 4]], 3)).to.equal(3)
    expect(statistical.LARGE([[1, 3, 2, 5, 4]], '3')).to.equal(3)
    expect(statistical.LARGE([[1, 2, 'a', 4, 5]], 1)).to.equal(5)
    expect(statistical.LARGE([[1, 2, 'a', 4, 5, '']], 1)).to.equal(5)
    expect(statistical.LARGE(['a', 'a', 'a', 'a', 5], 1)).to.equal(5)
    expect(statistical.LARGE([[3, 5, 3, null, 4]], 3)).to.equal(3)

    expect(
      statistical.LARGE(
        [
          [4, 5],
          [8, 2]
        ],
        2
      )
    ).to.equal(5)
    expect(
      statistical.LARGE(
        [
          [1, 4],
          [20, 23]
        ],
        3
      )
    ).to.equal(4)
  })

  it('LINEST', () => {
    const known_y = [1, 9, 5, 7]
    const known_x = [0, 4, 2, 3]
    expect(statistical.LINEST(known_y, known_x)).to.deep.equal([2, 1])
    expect(statistical.LINEST(known_y, 'invalid')).to.equal(error.value)
  })

  it('LOGEST', () => {
    const known_y = [1, 9, 5, 7]
    const known_x = [0, 4, 2, 3]
    expect(statistical.LOGEST(known_y, known_x)).to.deep.equal([1.751116, 1.194316])
    expect(statistical.LOGEST(known_y, 'invalid')).to.equal(error.value)
    expect(statistical.LOGEST(known_y, 1)).to.equal(error.value)
    expect(statistical.LOGEST(known_y, true)).to.equal(error.value)
  })

  it('LOGNORM.DIST', () => {
    expect(statistical.LOGNORM.DIST(4, 3.5, 1.2, true)).to.approximately(0.0390835557068005, 1e-9)
    expect(statistical.LOGNORM.DIST(4, 3.5, 1.2, false)).to.approximately(0.01761759668181924, 1e-9)
    expect(statistical.LOGNORM.DIST(4, 3.5, 'invalid', false)).to.equal(error.value)
  })

  it('LOGNORM.INV', () => {
    expect(statistical.LOGNORM.INV(0.0390835557068005, 3.5, 1.2)).to.approximately(4.000000000000001, 1e-9)
    expect(statistical.LOGNORM.INV(0.0390835557068005, 'invalid', 1.2)).to.equal(error.value)
  })

  it('MAX', () => {
    expect(statistical.MAX()).to.equal(error.na)

    expect(statistical.MAX(error.na)).to.equal(error.na)
    expect(statistical.MAX(error.na, 3, 1)).to.equal(error.na)
    expect(statistical.MAX(error.div0)).to.equal(error.div0)
    expect(statistical.MAX(error.div0, 3, 1)).to.equal(error.div0)

    expect(statistical.MAX(null)).to.equal(0)
    expect(statistical.MAX(true)).to.equal(0)
    expect(statistical.MAX(false)).to.equal(0)
    expect(statistical.MAX('')).to.equal(0)
    expect(statistical.MAX('text')).to.equal(0)
    expect(statistical.MAX(3)).to.equal(3)

    expect(statistical.MAX(3, 1, null)).to.equal(3)
    expect(statistical.MAX(3, 1)).to.equal(3)
    expect(statistical.MAX(3, 6)).to.equal(6)
    expect(statistical.MAX(3, 6, 'text')).to.equal(6)

    expect(statistical.MAX([['a', 1, 2, 3, 'v', 4, 'c', 'g']])).to.equal(4)
    expect(statistical.MAX([['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']])).to.equal(0)
    expect(statistical.MAX([[0.1, 0.2]], [[0.4, 0.8]], [[true, false]])).to.approximately(0.8, 1e-9)

    expect(
      statistical.MAX([
        [0, 0.1, 0.2],
        [0.4, 0.8, 1],
        [true, false]
      ])
    ).to.equal(1)
  })

  it('MAXA', () => {
    expect(statistical.MAXA()).to.equal(0)
    expect(statistical.MAXA(undefined)).to.equal(0)
    expect(statistical.MAXA(error.na)).to.equal(error.na)
    expect(statistical.MAXA([0.1, 0.2], [0.4, 0.8], [true, false])).to.equal(1)
    expect(
      statistical.MAXA([
        [0.1, 0.2],
        [0.4, 0.8],
        [true, false]
      ])
    ).to.equal(1)
  })

  it('MAXIFS', () => {
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'], 'A')).to.equal(4)
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'], 'B')).to.equal(8)
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'], 'B', ['D', 'C', 'D', 'C'], 'D')).to.equal(6)
    expect(
      statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'], 'A', ['D', 'D', 'D', 'C'], 'D', ['Y', 'Z', 'Z', 'Z'], 'Z')
    ).to.equal(4)
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'], 'C')).to.equal(0)

    expect(statistical.MAXIFS([], [], 'A')).to.equal(0)
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'], null)).to.equal(0)
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'], undefined)).to.equal(error.na)
    expect(statistical.MAXIFS([2, 4, 6], ['A', 'A', 'B', 'B'], 'B')).to.equal(error.value)
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B'], 'B')).to.equal(error.value)
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'])).to.equal(error.na)
    expect(statistical.MAXIFS([2, 4, 6, 8], ['A', 'A', 'B', 'B'], 'B', ['D', 'C', 'D', 'C'])).to.equal(error.na)
  })

  xit('MINIFS', () => {
    expect(statistical.MINIFS).to.throw('MINIFS is not implemented')
  })

  it('MIN', () => {
    expect(statistical.MIN()).to.equal(error.na)

    expect(statistical.MIN(error.na)).to.equal(error.na)
    expect(statistical.MIN(error.na, 3, 1)).to.equal(error.na)
    expect(statistical.MIN(error.div0)).to.equal(error.div0)
    expect(statistical.MIN(error.div0, 3, 1)).to.equal(error.div0)

    expect(statistical.MIN(null)).to.equal(0)
    expect(statistical.MIN(true)).to.equal(0)
    expect(statistical.MIN(false)).to.equal(0)
    expect(statistical.MIN('')).to.equal(0)
    expect(statistical.MIN('text')).to.equal(0)
    expect(statistical.MIN(1)).to.equal(1)

    expect(statistical.MIN(3, 1, null)).to.equal(1)
    expect(statistical.MIN(3, 1)).to.equal(1)
    expect(statistical.MIN(3, 6)).to.equal(3)
    expect(statistical.MIN(3, 6, 'text')).to.equal(3)

    expect(statistical.MIN('a', 1, 2, 3, 'v', 4, 'c', 'g')).to.equal(1)
    expect(statistical.MIN('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')).to.equal(0)
    expect(statistical.MIN([0.1, 0.2], [0.4, 0.8], [true, false])).to.approximately(0.1, 1e-9)
    expect(statistical.MIN([0, 0.1, 0.2], [0.4, 0.8, 1], [true, false])).to.equal(0)

    expect(
      statistical.MIN(
        [
          [10, 0],
          [0.1, 0.2]
        ],
        [
          [10, 0.4],
          [0.8, 1]
        ],
        [
          [10, 10],
          [true, false]
        ]
      )
    ).to.equal(0)
  })

  it('MINA', () => {
    expect(statistical.MINA()).to.equal(0)
    expect(statistical.MINA(undefined)).to.equal(0)
    expect(statistical.MINA(error.na)).to.equal(error.na)
    expect(statistical.MINA([0.1, 0.2], [0.4, 0.8], [true, false])).to.equal(0)
    expect(
      statistical.MINA(
        [
          [10, 0],
          [0.1, 0.2]
        ],
        [
          [10, 0.4],
          [0.8, 1]
        ],
        [
          [10, 10],
          [true, false]
        ]
      )
    ).to.equal(0)
  })

  it('MODE.MULT', () => {
    const data = [1, 2, 3, 4, 3, 2, 1, 2, 3, 5, 6, 1]
    const modes = statistical.MODE.MULT(data)
    expect(modes.length).to.equal(3)
    expect(modes).to.contain(1)
    expect(modes).to.contain(2)
    expect(modes).to.contain(3)
    expect(statistical.MODE.MULT([1, 2, 'invalid'])).to.equal(error.value)
  })

  it('MODE.SNGL', () => {
    const data = [5.6, 4, 4, 3, 2, 4]
    expect(statistical.MODE.SNGL(data)).to.equal(4)
    expect(statistical.MODE.SNGL([1, 2, 'invalid'])).to.equal(error.value)
  })

  it('NEGBINOM.DIST', () => {
    expect(statistical.NEGBINOM.DIST(10, 5, 0.25, false)).to.approximately(0.05504866037517786, 1e-9)
    expect(statistical.NEGBINOM.DIST(10, 5, 0.25, true)).to.approximately(0.3135140584781766, 1e-9)
    expect(statistical.NEGBINOM.DIST(10, 'invalid', 0.25, true)).to.equal(error.value)
  })

  it('NORM.DIST', () => {
    expect(statistical.NORM.DIST(1, 0, 1, false)).to.approximately(0.24197072451914337, 1e-9)
    expect(statistical.NORM.DIST(1, 0, 1, true)).to.approximately(0.8413447460685429, 1e-9)
    expect(statistical.NORM.DIST('Hello World!', 0, 1, false)).to.equal(error.value)
    expect(statistical.NORM.DIST(0, 'Hello World!', 1, false)).to.equal(error.value)
    expect(statistical.NORM.DIST(0, 0, 'Hello World!', false)).to.equal(error.value)
    expect(statistical.NORM.DIST(0, 0, -1, false)).to.equal(error.num)
  })

  it('NORM.INV', () => {
    expect(statistical.NORM.INV(0.908789, 40, 1.5)).to.approximately(42.00000200956616, 1e-9)
    expect(statistical.NORM.INV(0.908789, 'invalid', 1.5)).to.equal(error.value)
  })

  it('NORM.S.DIST', () => {
    expect(statistical.NORM.S.DIST(1, true)).to.approximately(0.8413447460685429, 1e-9)
    expect(statistical.NORM.S.DIST(1, false)).to.approximately(0.24197072451914337, 1e-9)
    expect(statistical.NORM.S.DIST('invalid', false)).to.equal(error.value)
  })

  it('NORM.S.INV', () => {
    expect(statistical.NORM.S.INV(0.908789)).to.approximately(1.3333346730441074, 1e-9)
    expect(statistical.NORM.S.INV('invalid')).to.equal(error.value)
  })

  it('PEARSON', () => {
    const independentValues = [9, 7, 5, 3, 1]
    const depentendValues = [10, 6, 1, 5, 3]
    expect(statistical.PEARSON(independentValues, depentendValues)).to.approximately(0.6993786061802354, 1e-9)
    depentendValues.push('invalid')
    expect(statistical.PEARSON(independentValues, depentendValues)).to.equal(error.value)
  })

  it('PERCENTILE.EXC', () => {
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0)).to.equal(error.num)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.1)).to.equal(error.num)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.2)).to.equal(1)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.25)).to.approximately(1.25, 1e-9)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.3)).to.approximately(1.5, 1e-9)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.4)).to.equal(2)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.5)).to.approximately(2.5, 1e-9)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.6)).to.equal(3)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.7)).to.approximately(3.5, 1e-9)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.75)).to.approximately(3.75, 1e-9)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.8)).to.equal(4)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 0.9)).to.equal(error.num)
    expect(statistical.PERCENTILE.EXC([1, 2, 3, 4], 1)).to.equal(error.num)
    expect(statistical.PERCENTILE.EXC([1, 'invalid', 3, 4], 1)).to.equal(error.value)
  })

  it('PERCENTILE.INC', () => {
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0)).to.equal(1)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.1)).to.approximately(1.3, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.2)).to.approximately(1.6, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.25)).to.approximately(1.75, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.3)).to.approximately(1.9, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.4)).to.approximately(2.2, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.5)).to.approximately(2.5, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.6)).to.approximately(2.8, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.7)).to.approximately(3.1, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.75)).to.approximately(3.25, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.8)).to.approximately(3.4, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 0.9)).to.approximately(3.7, 1e-9)
    expect(statistical.PERCENTILE.INC([1, 2, 3, 4], 1)).to.equal(4)
    expect(statistical.PERCENTILE.INC([1, 2, 'invalid', 4], 1)).to.equal(error.value)
  })

  it('PERCENTRANK.EXC', () => {
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 1)).to.approximately(0.2, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 2)).to.approximately(0.4, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 3)).to.approximately(0.6, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 4)).to.approximately(0.8, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 1.25)).to.approximately(0.25, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 2.5)).to.approximately(0.5, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 3.75)).to.approximately(0.75, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 1, 2)).to.approximately(0.2, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 2, 2)).to.approximately(0.4, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 3, 2)).to.approximately(0.6, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 3, 4], 4, 2)).to.approximately(0.8, 1e-9)
    expect(statistical.PERCENTRANK.EXC([1, 2, 'invalid', 4], 4, 2)).to.equal(error.value)
  })

  it('PERCENTRANK.INC', () => {
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 1)).to.equal(0)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 2)).to.approximately(0.333, 1e-9)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 3)).to.approximately(0.666, 1e-9)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 4)).to.equal(1)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 1.25)).to.approximately(0.083, 1e-9)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 2.5)).to.approximately(0.5, 1e-9)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 3.75)).to.approximately(0.916, 1e-9)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 1, 2)).to.equal(0)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 2, 2)).to.approximately(0.33, 1e-9)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 3, 2)).to.approximately(0.66, 1e-9)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 4, 2)).to.equal(1)
    expect(statistical.PERCENTRANK.INC([1, 2, 3, 4], 'invalid', 2)).to.equal(error.value)
  })

  it('PERMUT', () => {
    expect(statistical.PERMUT(100, 3)).to.equal(970200)
    expect(statistical.PERMUT(100, 'invalid')).to.equal(error.value)
  })

  it('PERMUTATIONA', () => {
    expect(statistical.PERMUTATIONA(3, 2)).to.equal(9)
    expect(statistical.PERMUTATIONA('invalid', 2)).to.equal(error.value)
  })

  it('PHI', () => {
    expect(statistical.PHI(0.75)).to.approximately(0.30113743215480443, 1e-9)
    expect(statistical.PHI('invalid')).to.equal(error.value)
  })

  it('POISSON.DIST', () => {
    expect(statistical.POISSON.DIST(2, 5, true)).to.approximately(0.12465201948308113, 1e-9)
    expect(statistical.POISSON.DIST(2, 5, false)).to.approximately(0.08422433748856833, 1e-9)
    expect(statistical.POISSON.DIST(2, 'invalid', false)).to.equal(error.value)
  })

  it('PROB', () => {
    const x = [0, 1, 2, 3]
    const prob = [0.2, 0.3, 0.1, 0.4]
    expect(statistical.PROB(x, prob, 2)).to.approximately(0.1, 1e-9)
    expect(statistical.PROB(x, prob, 1, 3)).to.approximately(0.8, 1e-9)
    expect(statistical.PROB(x, prob)).to.equal(0)
    x.push('invalid')
    expect(statistical.PROB(x, prob, 1, 3)).to.equal(error.value)
  })

  it('QUARTILE.EXC', () => {
    const data = [6, 7, 15, 36, 39, 40, 41, 42, 43, 47, 49]
    expect(statistical.QUARTILE.EXC(data, 1)).to.equal(15)
    expect(statistical.QUARTILE.EXC(data, 2)).to.equal(40)
    expect(statistical.QUARTILE.EXC(data, 3)).to.equal(43)
    expect(statistical.QUARTILE.EXC(data, 4)).to.equal(error.num)
    expect(statistical.QUARTILE.EXC(data, 'invalid')).to.equal(error.value)
  })

  it('QUARTILE.INC', () => {
    const data = [1, 2, 4, 7, 8, 9, 10, 12]
    expect(statistical.QUARTILE.INC(data, 1)).to.approximately(3.5, 1e-9)
    expect(statistical.QUARTILE.INC(data, 2)).to.approximately(7.5, 1e-9)
    expect(statistical.QUARTILE.INC(data, 3)).to.approximately(9.25, 1e-9)
    expect(statistical.QUARTILE.INC(data, 4)).to.equal(error.num)
    expect(statistical.QUARTILE.INC(data, 'invalid')).to.equal(error.value)
  })

  it('RANK.AVG', () => {
    const data = [89, 88, 92, 101, 94, 97, 95]
    expect(statistical.RANK.AVG(94, data)).to.equal(4)
    expect(statistical.RANK.AVG(88, data, 1)).to.equal(1)
    expect(statistical.RANK.AVG('invalid', data, 1)).to.equal(error.value)
  })

  it('RANK.EQ', () => {
    const data = [7, 3.5, 3.5, 1, 2]
    expect(statistical.RANK.EQ(data[0], data, 1)).to.equal(5)
    expect(statistical.RANK.EQ(data[4], data)).to.equal(4)
    expect(statistical.RANK.EQ(data[1], data, 1)).to.equal(3)
    expect(statistical.RANK.EQ('invalid', data, true)).to.equal(error.value)
  })

  it('ROW', () => {
    expect(statistical.ROW()).to.equal(error.na)
    expect(
      statistical.ROW([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
    ).to.equal(error.na)
    expect(
      statistical.ROW(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        -1
      )
    ).to.equal(error.num)
    expect(statistical.ROW('hello', 1)).to.equal(error.value)
    expect(
      statistical.ROW(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        0
      )
    ).to.eql([1, 2])
    expect(
      statistical.ROW(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        2
      )
    ).to.eql([2, 4])
    expect(
      statistical.ROW(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        3
      )
    ).to.not.exist
    expect(statistical.ROW([], 3)).to.not.exist
  })

  it('RSQ', () => {
    const y = [2, 3, 9, 1, 8, 7, 5]
    const x = [6, 5, 11, 7, 5, 4, 4]
    expect(statistical.RSQ(y, x)).to.approximately(0.05795019157088122, 1e-9)
    x.push('invalid')
    expect(statistical.RSQ(y, x)).to.equal(error.value)
  })

  it('SKEW', () => {
    expect(statistical.SKEW([3, 4, 5, 2, 3, 4, 5, 6, 4, 7])).to.approximately(0.3595430714067974, 1e-9)
    expect(statistical.SKEW([3, 4, 5, 2, 3, 4, 5, 6, 'invalid', 7])).to.equal(error.value)
  })

  it('SKEW.P', () => {
    expect(statistical.SKEW.P([3, 4, 5, 2, 3, 4, 5, 6, 4, 7])).to.approximately(0.303193339354144, 1e-9)
    expect(statistical.SKEW.P([3, 4, 5, 'invalid', 3, 4, 5, 6, 4, 7])).to.equal(error.value)
  })

  it('SLOPE', () => {
    const data_y = [2, 3, 9, 1, 8, 7, 5]
    const data_x = [6, 5, 11, 7, 5, 4, 4]
    expect(statistical.SLOPE(data_y, data_x)).to.approximately(0.3055555555555556, 1e-9)
    data_x.push('invalid')
    expect(statistical.SLOPE(data_y, data_x)).to.equal(error.value)
  })

  it('SMALL', () => {
    expect(statistical.SMALL()).to.equal(error.na)
    expect(statistical.SMALL('')).to.equal(error.na)
    expect(statistical.SMALL(1)).to.equal(error.na)
    expect(statistical.SMALL('text')).to.equal(error.na)
    expect(statistical.SMALL(1, 2, 3)).to.equal(error.na)
    expect(statistical.SMALL([1, 2, 'a', 4, 5, ''], 3, 5)).to.equal(error.na)
    expect(statistical.SMALL([[1, 2, error.na, 4, 5]], 1)).to.equal(error.na)

    expect(statistical.SMALL([[1, 2, error.div0, 4, 5]], 1)).to.equal(error.div0)

    expect(statistical.SMALL([[1, 2, 3]], '')).to.equal(error.value)
    expect(statistical.SMALL([1, 2, 'a', 4, 5, ''], 'text')).to.equal(error.value)

    expect(statistical.SMALL([[1, 2, 3]], null)).to.equal(error.num)
    expect(statistical.SMALL([[1, 2, 3]], 4)).to.equal(error.num)
    expect(statistical.SMALL([[3, 5, 3]], -3)).to.equal(error.num)
    expect(statistical.SMALL([[3, 5, 3, true]], 4)).to.equal(error.num)
    expect(statistical.SMALL([[true, false]], 1)).to.equal(error.num)
    expect(statistical.SMALL([['a', 'a', 'a', 'a', 'a']], 1)).to.equal(error.num)
    expect(statistical.SMALL([[3, 5, 3, null, 4]], 5)).to.equal(error.num)
    expect(statistical.SMALL(10, 2)).to.equal(error.num)
    expect(statistical.SMALL(10, null)).to.equal(error.num)
    expect(statistical.SMALL([[null, 2]], 2)).to.equal(error.num)
    expect(statistical.SMALL([['3', 5, '3', null, 4]], 3)).to.equal(error.num)
    expect(statistical.SMALL([[1, 2, 'a', 4, 5]], 0)).to.equal(error.num)

    expect(statistical.SMALL([[3, 5, 3, true]], 3)).to.equal(5)
    expect(statistical.SMALL([3, 4, 5, 2, 'text', 4, 6, 4, 7], 4)).to.equal(4)
    expect(statistical.SMALL([3, 4, 5, 2, 3, 4, 6, 4, 7], 4)).to.equal(4)
    expect(statistical.SMALL([1, 2, 'a', 4, 5, ''], 3)).to.equal(4)
    expect(statistical.SMALL([[3, 5, 3, true]], 3)).to.equal(5)
    expect(statistical.SMALL(10, 1)).to.equal(10)
    expect(statistical.SMALL(10, true)).to.equal(10)
    expect(statistical.SMALL([[1, 3, 2, 5, 4]], 1)).to.equal(1)
    expect(statistical.SMALL([[1, 3, 2, 5, 4]], 3)).to.equal(3)
    expect(statistical.SMALL([[10, 5]], '2')).to.equal(10)
    expect(statistical.SMALL([[1, 3, 2, 5, 4]], '3')).to.equal(3)
    expect(statistical.SMALL([[1, 2, 'a', 4, 5]], 1)).to.equal(1)
    expect(statistical.SMALL([[1, 2, 'a', 4, 5, '']], 1)).to.equal(1)
    expect(statistical.SMALL(['a', 'a', 'a', 'a', 5], 1)).to.equal(5)
    expect(statistical.SMALL([[3, 5, 3, null, 4]], 3)).to.equal(4)

    expect(
      statistical.SMALL(
        [
          [4, 5],
          [8, 2]
        ],
        2
      )
    ).to.equal(4)
    expect(
      statistical.SMALL(
        [
          [1, 4],
          [20, 23]
        ],
        3
      )
    ).to.equal(20)
  })

  it('STANDARDIZE', () => {
    expect(statistical.STANDARDIZE(42, 40, 1.5)).to.approximately(1.3333333333333333, 1e-9)
    expect(statistical.STANDARDIZE(10, 10, 10)).to.equal(0)
    expect(statistical.STANDARDIZE(10, 10, 'invalid')).to.equal(error.value)
  })

  it('STDEV.P', () => {
    const data = [1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299]
    expect(statistical.STDEV.P(data)).to.approximately(26.054558142482477, 1e-9)
    expect(statistical.STDEV.P()).to.equal(error.num)
  })

  it('STDEV.S', () => {
    const data = [1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299, true, false, 'nope']
    expect(statistical.STDEV.S(data)).to.approximately(27.46391571984349, 1e-9)
  })

  it('STDEVA', () => {
    const data = [1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299]
    expect(statistical.STDEVA(data)).to.approximately(27.46391571984349, 1e-9)
    const data2 = [2, 1, true, false, 'nope']
    expect(statistical.STDEVA(data2)).to.approximately(0.8366600265340756, 1e-9)
  })

  it('STDEVPA', () => {
    const data = [1345, 1301, 1368, 1322, 1310, 1370, 1318, 1350, 1303, 1299]
    expect(statistical.STDEVPA(data)).to.approximately(26.054558142482477, 1e-9)
    const data2 = [2, 1, true, false, 'nope']
    expect(statistical.STDEVPA(data2)).to.approximately(0.7483314773547883, 1e-9)
    expect(statistical.STDEVPA()).to.equal(error.num)
  })

  it('STEYX', () => {
    const data_y = [2, 3, 9, 1, 8, 7, 5]
    const data_x = [6, 5, 11, 7, 5, 4, 4]
    expect(statistical.STEYX(data_y, data_x)).to.approximately(3.305718950210041, 1e-9)
    data_x.push('invalid')
    expect(statistical.STEYX(data_y, data_x)).to.equal(error.value)
  })

  it('T.DIST', () => {
    expect(statistical.T.DIST(1.959999998, 60, 0)).to.equal(error.num)
    expect(statistical.T.DIST(8, 'invalid', 1)).to.equal(error.value)
    expect(statistical.T.DIST(1.959999998, 60, 1)).to.approximately(0.027322465, 1e-9)
    expect(statistical.T.DIST(1.959999998, 60, 2)).to.approximately(0.05464493, 1e-9)
    expect(statistical.T.DIST(3.31, 4, 1)).to.approximately(0.014827220522043, 1e-9)
    expect(statistical.T.DIST(3.31, 4, 2)).to.approximately(0.029654441044086, 1e-9)
  })

  it('T.DIST.2T', () => {
    expect(statistical.T.DIST['2T']()).to.equal(error.na)
    expect(statistical.T.DIST['2T'](1)).to.equal(error.na)
    expect(statistical.T.DIST['2T'](-1, 1)).to.equal(error.num)
    expect(statistical.T.DIST['2T'](1.1, 0)).to.equal(error.num)
    expect(statistical.T.DIST['2T']('hello', 1)).to.equal(error.value)
    expect(statistical.T.DIST['2T'](2, 6)).to.approximately(0.092426312, 1e-9)
    expect(statistical.T.DIST['2T'](20, 2)).to.approximately(0.002490664, 1e-9)
    expect(statistical.T.DIST['2T'](1.959999998, 60)).to.approximately(0.05464493, 1e-9)
  })

  it('T.DIST.RT', () => {
    expect(statistical.T.DIST.RT()).to.equal(error.na)
    expect(statistical.T.DIST.RT(1)).to.equal(error.na)
    expect(statistical.T.DIST.RT(-1, 1)).to.equal(error.num)
    expect(statistical.T.DIST.RT(1.1, 0)).to.equal(error.num)
    expect(statistical.T.DIST.RT('hello', 1)).to.equal(error.value)
    expect(statistical.T.DIST.RT(2, 60)).to.approximately(0.025016522, 1e-9)
    expect(statistical.T.DIST.RT(2, 6)).to.approximately(0.046213156, 1e-9)
    expect(statistical.T.DIST.RT(1.959999998, 60)).to.approximately(0.027322465, 1e-9)
  })

  it('T.INV', () => {
    expect(statistical.T.INV(0.9, 60)).to.approximately(1.2958210933417948, 1e-9)
    expect(statistical.T.INV(0.9, 'invalid')).to.equal(error.value)
  })

  it('T.INV.2T', () => {
    expect(statistical.T.INV['2T'](0.9, 60)).to.approximately(0.126194364, 1e-9)
    expect(statistical.T.INV['2T'](0.9, 'invalid')).to.equal(error.value)
    expect(statistical.T.INV['2T']('invalid', 60)).to.equal(error.value)
    expect(statistical.T.INV['2T'](-1, 60)).to.equal(error.num)
    expect(statistical.T.INV['2T'](0, 60)).to.equal(error.num)
    expect(statistical.T.INV['2T'](1.1, 60)).to.equal(error.num)
    expect(statistical.T.INV['2T'](0.9, 0.5)).to.equal(error.num)
  })

  it('T.TEST', () => {
    let known_x = [5, 7, 5, 3, 5, 3, 3, 9]
    let known_y = [8, 1, 4, 6, 6, 4, 1, 2]
    expect(statistical.T.TEST(known_x, known_y)).to.approximately(0.41106918968115536, 1e-9)
    known_x = [3, 4, 5, 8, 9, 1, 2, 4, 5]
    known_y = [6, 9, 3, 5, 4, 4, 5, 3, 1]
    expect(statistical.T.TEST(known_x, known_y)).to.approximately(0.923919926765508, 1e-9)
    known_x = [3, 4, 5, 8, 9, 1, 2, 4, 5]
    known_y = [6, 9, 3, 5, 4, 4, 5]
    expect(statistical.T.TEST(known_x, known_y)).to.approximately(0.6141571469712601, 1e-9)
    expect(statistical.T.TEST('invalid', known_y)).to.equal(error.value)
  })

  it('TREND', () => {
    const known_y = [1, 9, 5, 7]
    const known_x = [0, 4, 2, 3]
    const new_know_x = [5, 8]
    expect(statistical.TREND(known_y, known_x, new_know_x)).to.deep.equal([11, 17])
    expect(statistical.TREND(known_y, known_x, 'invalid')).to.equal(error.value)
  })

  it('TRIMMEAN', () => {
    expect(statistical.TRIMMEAN([4, 5, 6, 7, 2, 3, 4, 5, 1, 2, 3], 0.2)).to.approximately(3.7777777777777777, 1e-9)
    expect(statistical.TRIMMEAN([4, 5, 6, 'invalid', 1, 2, 3], 0.2)).to.equal(error.value)
  })

  it('VAR.P', () => {
    expect(statistical.VAR.P(1, 2, 3, 4, 10, 10)).to.approximately(13.333333333333334, 1e-9)
    expect(statistical.VAR.P(1, 2, 3, 4, false, true)).to.approximately(1.25, 1e-9)
    expect(statistical.VAR.P(1, 2, 3, 4, 'count as zero', false, true)).to.approximately(1.25, 1e-9)
    expect(statistical.VAR.P()).to.equal(error.num)
  })

  it('VAR.S', () => {
    expect(statistical.VAR.S(1, 2, 3, 4, 10, 10)).to.equal(16)
    expect(statistical.VAR.S(1, 2, 3, 4, false, true)).to.approximately(1.6666666666666667, 1e-9)
    expect(statistical.VAR.S(1, 2, 3, 4, 'count as zero', false, true)).to.approximately(1.6666666666666667, 1e-9)
  })

  it('VARA', () => {
    expect(statistical.VARA(1, 2, 3, 4, 10, 10)).to.equal(16)
    expect(statistical.VARA(1, 2, 3, 4, false, true)).to.approximately(2.166666666666667, 1e-9)
    expect(statistical.VARA(1, 2, 3, 4, 'count as zero', false, true)).to.approximately(2.285714285714286, 1e-9)
  })

  it('VARPA', () => {
    expect(statistical.VARPA(1, 2, 3, 4, 10, 10)).to.approximately(13.333333333333334, 1e-9)
    expect(statistical.VARPA(1, 2, 3, 4, false, true)).to.approximately(1.8055555555555556, 1e-9)
    expect(statistical.VARPA(1, 2, 3, 4, 'count as zero', false, true)).to.approximately(1.959183673469388, 1e-9)
    expect(statistical.VARPA()).to.equal(error.num)
  })

  it('WEIBULL.DIST', () => {
    expect(statistical.WEIBULL.DIST(105, 20, 100, true)).to.approximately(0.9295813900692769, 1e-9)
    expect(statistical.WEIBULL.DIST(105, 20, 100, false)).to.approximately(0.03558886402450435, 1e-9)
    expect(statistical.WEIBULL.DIST(105, 20, 'invalid', false)).to.equal(error.value)
  })

  it('Z.TEST', () => {
    const data = [3, 6, 7, 8, 6, 5, 4, 2, 1, 9]
    expect(statistical.Z.TEST(data, 4)).to.approximately(0.09057419685136381, 1e-9)
    expect(statistical.Z.TEST(data, 6)).to.approximately(0.86304338912953, 1e-9)
    expect(statistical.Z.TEST(data, 'invalid')).to.equal(error.value)
  })
})
