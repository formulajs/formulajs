import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as lookup from '../src/lookup-reference.js'

describe('Lookup Reference', () => {
  it('CHOOSE', () => {
    expect(lookup.CHOOSE(1, 'jima')).to.equal('jima')
    expect(lookup.CHOOSE(3, 'jima', 'jimb', 'jimc')).to.equal('jimc')

    expect(lookup.CHOOSE(1.5, 'jima')).to.equal('jima')
    expect(lookup.CHOOSE(3.7, 'jima', 'jimb', 'jimc')).to.equal('jimc')

    expect(lookup.CHOOSE(true, 'jima')).to.equal('jima')
    expect(lookup.CHOOSE(false, 'jima')).to.equal(error.value)

    expect(lookup.CHOOSE('true', 'jima')).to.equal(error.value)
    expect(lookup.CHOOSE('false', 'jima')).to.equal(error.value)

    expect(lookup.CHOOSE('jima', 'jimb', 'jimc')).to.equal(error.value)
    expect(lookup.CHOOSE('', 'jima', 'jimb', 'jimc')).to.equal(error.value)

    expect(lookup.CHOOSE('   1   ', 'jima')).to.equal('jima')
    expect(lookup.CHOOSE('   3    ', 'jima', 'jimb', 'jimc')).to.equal('jimc')
    expect(lookup.CHOOSE('   1.48   ', 'jima')).to.equal('jima')
    expect(lookup.CHOOSE('   3.9    ', 'jima', 'jimb', 'jimc')).to.equal('jimc')

    expect(lookup.CHOOSE(-2, 'jima')).to.equal(error.value)
    expect(lookup.CHOOSE(0, 'jima')).to.equal(error.value)
    expect(lookup.CHOOSE(2, 'jima')).to.equal(error.value)
    expect(lookup.CHOOSE(255, 'jima')).to.equal(error.value)

    expect(lookup.CHOOSE()).to.equal(error.na)
    expect(lookup.CHOOSE(1)).to.equal(error.na)

    Object.values(error).forEach((err) => {
      expect(lookup.CHOOSE(err, 'first')).to.equal(err)
    })

    expect(lookup.CHOOSE([1, true, false], 'jima')).to.eql(['jima', 'jima', error.value])
    expect(lookup.CHOOSE([[0], [error.div0], [2]], 'jima', 'jimb')).to.eql([[error.value], [error.div0], ['jimb']])
    expect(
      lookup.CHOOSE(
        [
          [1, true],
          [false, 2],
          ['text', error.name]
        ],
        'jima',
        'jimb'
      )
    ).to.eql([
      ['jima', 'jima'],
      [error.value, 'jimb'],
      [error.value, error.name]
    ])
  })

  it('COLUMN', () => {
    expect(lookup.COLUMN()).to.equal(error.na)
    expect(
      lookup.COLUMN([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
    ).to.equal(error.na)
    expect(
      lookup.COLUMN(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        -1
      )
    ).to.equal(error.num)
    expect(lookup.COLUMN('hello', 1)).to.equal(error.value)
    expect(
      lookup.COLUMN(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        0
      )
    ).to.eql([[1], [2], [2]])
    expect(
      lookup.COLUMN(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        1
      )
    ).to.eql([[2], [3], [4]])
    expect(typeof lookup.COLUMN([], 0)).to.equal('undefined')
  })

  it('COLUMNS', () => {
    expect(lookup.COLUMNS('')).to.equal(1)
    expect(lookup.COLUMNS(1)).to.equal(1)
    expect(lookup.COLUMNS('3')).to.equal(1)

    expect(
      lookup.COLUMNS([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
    ).to.equal(2)
    expect(lookup.COLUMNS([[1], [2]])).to.equal(1)
    expect(lookup.COLUMNS([[1, 2]])).to.equal(2)

    expect(lookup.COLUMNS()).to.equal(error.na)
    expect(lookup.COLUMNS('3', 2)).to.equal(error.na)
  })

  describe('MATCH', () => {
    it('using match_type 0', () => {
      expect(lookup.MATCH(4, [[0, 'text', 2, 3, 4, 100, 7]], null)).to.equal(5)
      expect(lookup.MATCH(4, [[0], [1], ['bernie'], [3], [4], [100], [7]], 0)).to.equal(5)

      expect(lookup.MATCH(5, [[0, true, 2, 3, 4, 100, 7]], 0)).to.equal(error.na)
      expect(lookup.MATCH(5, [[0], [1], [2], [3], [4], [false], [7]], false)).to.equal(error.na)

      expect(lookup.MATCH('jima', [['jima', 'jimb', 'jima', 'bernie']], 0)).to.equal(1)
      expect(lookup.MATCH('j*b', [['jima'], ['jimb'], ['jimc'], ['jimb']], '0')).to.equal(2)
      expect(lookup.MATCH('j?b', [['jima', 'jimb', 'jimc', 'bernie']], 0)).to.equal(error.na)
      expect(lookup.MATCH('j??b', [['jima', 'jimb', 'jimc', 'bernie']], 0)).to.equal(2)
      expect(lookup.MATCH('j???b', [['jima'], ['jimb'], ['jimc'], ['bernie']], 0)).to.equal(error.na)
      expect(lookup.MATCH('j???', [['jima'], ['jimb'], ['jimc'], ['bernie']], 0)).to.equal(1)

      expect(lookup.MATCH('jim\\d/', [['jim'], ['jim*'], ['jimc'], ['jim\\d/']], 0)).to.equal(4)
      expect(lookup.MATCH('~~?', [['~a'], ['jim*'], ['jimc'], ['jim\\d/']], 0)).to.equal(1)
      expect(lookup.MATCH('a~a', [['a~a'], ['jim*'], ['jimc'], ['jim\\d/']], 0)).to.equal(error.na)
      expect(lookup.MATCH('a~a', [['aa'], ['jim*'], ['jimc'], ['jim\\d/']], 0)).to.equal(1)
      expect(lookup.MATCH('a~~a', [['a~a'], ['jim*'], ['jimc'], ['jim\\d/']], 0)).to.equal(1)

      expect(lookup.MATCH('j~?mc', [['jima', 'jimb', 'j?mc', 'bernie']], 0)).to.equal(3)
      expect(lookup.MATCH('berni~*', [['jima'], ['jimb'], ['j?mc'], ['berni*']], 0)).to.equal(4)
    })

    it('using match_type 1', () => {
      expect(lookup.MATCH(1, [[0, 1, 2, 3, 4, 5, 7]])).to.equal(2)
      expect(lookup.MATCH(4.5, [[0], [1], [2], [3], [4]], '6')).to.equal(5)

      expect(lookup.MATCH(7.5, [[1, 2, 3, 9, 'text', 6, 7]], 1)).to.equal(3)
      expect(lookup.MATCH(6, [[1], [7], [3], [4], [true], [6], [7]], 10)).to.equal(6)

      expect(lookup.MATCH(6, [[1, 2, 3, 4, 8, 6, 7, 8]], 1)).to.equal(6)
      expect(lookup.MATCH(6, [[1, 2, 3, 4, 8, 6, 7, 8]], 1)).to.equal(6)

      expect(lookup.MATCH(7.5, [[1, 'text', 'text', 4, 'text', 9, 7]], 1)).to.equal(4)
      expect(lookup.MATCH(2, [[1, 'text', 'text', 4, 'text', 9, 7]], 1)).to.equal(1)

      expect(lookup.MATCH('jimc', [['jima', 'jimb', 'jimd', 'bernie']], true)).to.equal(2)
      expect(lookup.MATCH(true, [['jima'], ['jimb'], ['jimd'], ['bernie']], 1)).to.equal(error.na)
    })

    it('using match_type -1', () => {
      expect(lookup.MATCH(6, [[7], [6], [5], [4], [3], [2], [1]], -1)).to.equal(2)
      expect(lookup.MATCH(6.5, [[7, 6, 5, 4, 3, 2, 1]], '-5')).to.equal(1)
      expect(lookup.MATCH(2, [[7, 6, 1, 4, 3, 2, 1]], -60)).to.equal(2)

      expect(lookup.MATCH(4, [[7, 6, 'teste', null, 3, 2, 1]], -1)).to.equal(2)

      expect(lookup.MATCH('jimc', [['jime', 'jimb', 'jimd', 'bernie']], -1)).to.equal(1)
    })

    it('using an invalid match_type', () => {
      expect(lookup.MATCH(4, [[0, 1, 2, 3, 4, 100, 7]], '')).to.equal(error.value)
      expect(lookup.MATCH(4, [[0, 1, 2, 3, 4, 100, 7]], 'text')).to.equal(error.value)
      expect(lookup.MATCH(4, [[0, 1, 2, 3, 4, 100, 7]], 'true')).to.equal(error.value)
    })

    it('using a matrix instead of a row or column', () => {
      expect(
        lookup.MATCH(
          'jima',
          [
            [1, 'A'],
            [2, 'B'],
            [3, 'C'],
            [4, 'D'],
            [2, 'E']
          ],
          1
        )
      ).to.equal(error.na)
    })

    it('using an incorrect number of arguments', () => {
      expect(lookup.MATCH()).to.equal(error.na)
      expect(lookup.MATCH('')).to.equal(error.na)
      expect(lookup.MATCH(1)).to.equal(error.na)
      expect(lookup.MATCH('jima', ['jima', 'jimb', 'jimd', 'bernie'], 0, 1)).to.equal(error.na)
    })

    it('using errors', () => {
      Object.values(error).forEach((err) => {
        expect(lookup.MATCH(err, [[0, 1, 2, 3, 4, 5, 7]])).to.equal(err)
        expect(lookup.MATCH(1, err)).to.equal(error.na)
        expect(lookup.MATCH(1, [[0, 1, 2, 3, 4, 5, 7]], err)).to.equal(error.ref)
      })
    })

    it('using errors inside array', () => {
      expect(lookup.MATCH(4, [[1, 2, 3, error.div0, 5, 7]])).to.equal(3)
      expect(lookup.MATCH(4, [[7], [6], [error.name], [error.div0], [3], [2], [1]], -1)).to.equal(2)
    })
  })

  it('ROWS', () => {
    expect(lookup.ROWS('')).to.equal(1)
    expect(lookup.ROWS('text')).to.equal(1)
    expect(lookup.ROWS('1')).to.equal(1)
    expect(lookup.ROWS(1)).to.equal(1)
    expect(lookup.ROWS(0)).to.equal(1)
    expect(lookup.ROWS(true)).to.equal(1)
    expect(lookup.ROWS(false)).to.equal(1)
    expect(lookup.ROWS(null)).to.equal(1)
    expect(
      lookup.ROWS([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
    ).to.equal(3)
    expect(lookup.ROWS([[1, 2]])).to.equal(1)

    expect(lookup.ROWS()).to.equal(error.na)
    expect(lookup.ROWS(1, 2)).to.equal(error.na)
  })

  describe('SORT', () => {
    it('should sort array containing numbers by column in ascending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          1,
          1,
          true
        )
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])
      expect(
        lookup.SORT(
          [
            [3, 2, 1],
            [6, 5, 4],
            [9, 8, 7]
          ],
          1,
          1,
          true
        )
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])
      expect(
        lookup.SORT(
          [
            [2, 3, 1],
            [5, 6, 4],
            [8, 9, 7]
          ],
          1,
          1,
          true
        )
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])
      expect(lookup.SORT([[1, 2, 3]], 1, 1, true)).to.eql([[1, 2, 3]])
      expect(lookup.SORT([[3, 2, 1]], 1, 1, true)).to.eql([[1, 2, 3]])
      expect(lookup.SORT([[2, 3, 1]], 1, 1, true)).to.eql([[1, 2, 3]])
      expect(lookup.SORT([[1], [2], [3]], 1, 1, true)).to.eql([[1], [2], [3]])
      expect(lookup.SORT([[3], [2], [1]], 1, 1, true)).to.eql([[3], [2], [1]])
      expect(lookup.SORT([[2], [3], [1]], 1, 1, true)).to.eql([[2], [3], [1]])
      expect(lookup.SORT([[1]], 1, 1, true)).to.eql([[1]])
    })

    it('should sort array containing strings by column in ascending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
          ],
          1,
          1,
          true
        )
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(
        lookup.SORT(
          [
            ['c', 'b', 'a'],
            ['f', 'e', 'd'],
            ['i', 'h', 'g']
          ],
          1,
          1,
          true
        )
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(
        lookup.SORT(
          [
            ['b', 'c', 'a'],
            ['e', 'f', 'd'],
            ['h', 'i', 'g']
          ],
          1,
          1,
          true
        )
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(lookup.SORT([['a', 'b', 'c']], 1, 1, true)).to.eql([['a', 'b', 'c']])
      expect(lookup.SORT([['c', 'b', 'a']], 1, 1, true)).to.eql([['a', 'b', 'c']])
      expect(lookup.SORT([['b', 'c', 'a']], 1, 1, true)).to.eql([['a', 'b', 'c']])
      expect(lookup.SORT([['a'], ['b'], ['c']], 1, 1, true)).to.eql([['a'], ['b'], ['c']])
      expect(lookup.SORT([['c'], ['b'], ['a']], 1, 1, true)).to.eql([['c'], ['b'], ['a']])
      expect(lookup.SORT([['b'], ['c'], ['a']], 1, 1, true)).to.eql([['b'], ['c'], ['a']])
      expect(lookup.SORT([['a']], 1, 1, true)).to.eql([['a']])
    })

    it('should sort array containing numbers and strings by column in ascending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            ['d', 'e', 'f'],
            [7, 8, 9]
          ],
          1,
          1,
          true
        )
      ).to.eql([
        [1, 2, 3],
        ['d', 'e', 'f'],
        [7, 8, 9]
      ])
      expect(
        lookup.SORT(
          [
            ['a', 2, 3],
            [6, 'e', 'f'],
            [7, 8, 9]
          ],
          1,
          1,
          true
        )
      ).to.eql([
        [2, 3, 'a'],
        ['e', 'f', 6],
        [8, 9, 7]
      ])
      expect(
        lookup.SORT(
          [
            ['a', 2, 3],
            ['d', 5, 6],
            ['g', 8, 9]
          ],
          1,
          1,
          true
        )
      ).to.eql([
        [2, 3, 'a'],
        [5, 6, 'd'],
        [8, 9, 'g']
      ])
      expect(
        lookup.SORT(
          [
            [2, 3, 'a'],
            [5, 6, 'd'],
            [8, 9, 'g']
          ],
          1,
          1,
          true
        )
      ).to.eql([
        [2, 3, 'a'],
        [5, 6, 'd'],
        [8, 9, 'g']
      ])
      expect(lookup.SORT([[2, 3, 'a']], 1, 1, true)).to.eql([[2, 3, 'a']])
      expect(lookup.SORT([['a', 2, 3]], 1, 1, true)).to.eql([[2, 3, 'a']])
      expect(lookup.SORT([['a'], [2], [3]], 1, 1, true)).to.eql([['a'], [2], [3]])
    })

    it('should sort array containing numbers by column in descending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ])
      expect(
        lookup.SORT(
          [
            [3, 2, 1],
            [6, 5, 4],
            [9, 8, 7]
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ])
      expect(
        lookup.SORT(
          [
            [2, 3, 1],
            [5, 6, 4],
            [8, 9, 7]
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ])
      expect(lookup.SORT([[1, 2, 3]], 1, -1, true)).to.eql([[3, 2, 1]])
      expect(lookup.SORT([[3, 2, 1]], 1, -1, true)).to.eql([[3, 2, 1]])
      expect(lookup.SORT([[2, 3, 1]], 1, -1, true)).to.eql([[3, 2, 1]])
      expect(lookup.SORT([[1], [2], [3]], 1, -1, true)).to.eql([[1], [2], [3]])
      expect(lookup.SORT([[3], [2], [1]], 1, -1, true)).to.eql([[3], [2], [1]])
      expect(lookup.SORT([[2], [3], [1]], 1, -1, true)).to.eql([[2], [3], [1]])
      expect(lookup.SORT([[1]], 1, -1, true)).to.eql([[1]])
    })

    it('should sort array containing strings by column in descending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        ['c', 'b', 'a'],
        ['f', 'e', 'd'],
        ['i', 'h', 'g']
      ])
      expect(
        lookup.SORT(
          [
            ['c', 'b', 'a'],
            ['f', 'e', 'd'],
            ['i', 'h', 'g']
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        ['c', 'b', 'a'],
        ['f', 'e', 'd'],
        ['i', 'h', 'g']
      ])
      expect(lookup.SORT([['a', 'b', 'c']], 1, -1, true)).to.eql([['c', 'b', 'a']])
      expect(lookup.SORT([['c', 'b', 'a']], 1, -1, true)).to.eql([['c', 'b', 'a']])
      expect(lookup.SORT([['b', 'c', 'a']], 1, -1, true)).to.eql([['c', 'b', 'a']])
      expect(lookup.SORT([['a'], ['b'], ['c']], 1, -1, true)).to.eql([['a'], ['b'], ['c']])
      expect(lookup.SORT([['c'], ['b'], ['a']], 1, -1, true)).to.eql([['c'], ['b'], ['a']])
      expect(lookup.SORT([['b'], ['c'], ['a']], 1, -1, true)).to.eql([['b'], ['c'], ['a']])
      expect(lookup.SORT([['a']], 1, -1, true)).to.eql([['a']])
    })

    it('should sort array containing numbers and strings by column in descending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            ['d', 'e', 'f'],
            [7, 8, 9]
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        [3, 2, 1],
        ['f', 'e', 'd'],
        [9, 8, 7]
      ])
      expect(
        lookup.SORT(
          [
            ['a', 2, 3],
            [6, 'e', 'f'],
            [7, 8, 9]
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        ['a', 3, 2],
        [6, 'f', 'e'],
        [7, 9, 8]
      ])
      expect(
        lookup.SORT(
          [
            ['a', 2, 3],
            ['d', 5, 6],
            ['g', 8, 9]
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        ['a', 3, 2],
        ['d', 6, 5],
        ['g', 9, 8]
      ])
      expect(
        lookup.SORT(
          [
            [2, 3, 'a'],
            [5, 6, 'd'],
            [8, 9, 'g']
          ],
          1,
          -1,
          true
        )
      ).to.eql([
        ['a', 3, 2],
        ['d', 6, 5],
        ['g', 9, 8]
      ])
      expect(lookup.SORT([[2, 3, 'a']], 1, -1, true)).to.eql([['a', 3, 2]])
      expect(lookup.SORT([['a', 2, 3]], 1, -1, true)).to.eql([['a', 3, 2]])
      expect(lookup.SORT([['a'], [2], [3]], 1, -1, true)).to.eql([['a'], [2], [3]])
    })

    it('should sort array by column with varying sort index', () => {
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          2,
          1,
          true
        )
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])
      expect(
        lookup.SORT(
          [
            [3, 2, 1],
            [6, 5, 4],
            [9, 8, 7]
          ],
          3,
          1,
          true
        )
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])
      expect(
        lookup.SORT(
          [
            [2, 3, 1],
            [5, 6, 4],
            [8, 9, 7]
          ],
          3,
          -1,
          true
        )
      ).to.eql([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ])
      expect(
        lookup.SORT(
          [
            ['a', 2, 3],
            [6, 'e', 'f'],
            [7, 8, 9]
          ],
          3,
          -1,
          true
        )
      ).to.eql([
        [3, 2, 'a'],
        ['f', 'e', 6],
        [9, 8, 7]
      ])
      expect(
        lookup.SORT(
          [
            ['a', 2, 3],
            ['d', 5, 6],
            ['g', 8, 9]
          ],
          2,
          1,
          true
        )
      ).to.eql([
        [2, 3, 'a'],
        [5, 6, 'd'],
        [8, 9, 'g']
      ])
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
          ],
          2,
          -1,
          true
        )
      ).to.eql([
        ['c', 'b', 'a'],
        ['f', 'e', 'd'],
        ['i', 'h', 'g']
      ])
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
          ],
          3,
          1,
          true
        )
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(lookup.SORT([[1], [2], [3]], 2, -1, true)).to.eql([[1], [2], [3]])
      expect(lookup.SORT([[3], [2], [1]], 2, -1, true)).to.eql([[3], [2], [1]])
      expect(lookup.SORT([[2], [3], [1]], 3, -1, true)).to.eql([[2], [3], [1]])
      expect(lookup.SORT([['a'], [2], [3]], 2, -1, true)).to.eql([['a'], [2], [3]])
      expect(lookup.SORT([['a'], [2], [3]], 3, 1, true)).to.eql([['a'], [2], [3]])
      expect(lookup.SORT([['a'], ['b'], ['c']], 2, -1, true)).to.eql([['a'], ['b'], ['c']])
      expect(lookup.SORT([['a'], ['b'], ['c']], 3, 1, true)).to.eql([['a'], ['b'], ['c']])
    })

    it('should sort array containing numbers by row in ascending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          1,
          1,
          false
        )
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])
      expect(
        lookup.SORT([
          [7, 8, 9],
          [4, 5, 6],
          [1, 2, 3]
        ])
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])
      expect(
        lookup.SORT([
          [4, 5, 6],
          [7, 8, 9],
          [1, 2, 3]
        ])
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])
      expect(lookup.SORT([[1, 2, 3]])).to.eql([[1, 2, 3]])
      expect(lookup.SORT([[3, 2, 1]], 1, 1)).to.eql([[3, 2, 1]])
      expect(lookup.SORT([[2, 3, 1]], 1)).to.eql([[2, 3, 1]])
      expect(lookup.SORT([[1], [2], [3]], 1, 1, false)).to.eql([[1], [2], [3]])
      expect(lookup.SORT([[3], [2], [1]])).to.eql([[1], [2], [3]])
      expect(lookup.SORT([[2], [3], [1]], 1)).to.eql([[1], [2], [3]])
      expect(lookup.SORT([[1]], 1, 1, false)).to.eql([[1]])
    })

    it('should sort array containing strings by row in ascending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
          ],
          1,
          1,
          false
        )
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(
        lookup.SORT([
          ['g', 'h', 'i'],
          ['d', 'e', 'f'],
          ['a', 'b', 'c']
        ])
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(
        lookup.SORT([
          ['d', 'e', 'f'],
          ['g', 'h', 'i'],
          ['a', 'b', 'c']
        ])
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(lookup.SORT([['a', 'b', 'c']])).to.eql([['a', 'b', 'c']])
      expect(lookup.SORT([['c', 'b', 'a']], 1, 1)).to.eql([['c', 'b', 'a']])
      expect(lookup.SORT([['b', 'c', 'a']], 1)).to.eql([['b', 'c', 'a']])
      expect(lookup.SORT([['a'], ['b'], ['c']], 1, 1, false)).to.eql([['a'], ['b'], ['c']])
      expect(lookup.SORT([['c'], ['b'], ['a']])).to.eql([['a'], ['b'], ['c']])
      expect(lookup.SORT([['b'], ['c'], ['a']], 1)).to.eql([['a'], ['b'], ['c']])
      expect(lookup.SORT([['a']], 1, 1, false)).to.eql([['a']])
    })

    it('should sort array containing numbers and strings by row in ascending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            ['a', 'b', 'c'],
            [4, 5, 6]
          ],
          1,
          1,
          false
        )
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        ['a', 'b', 'c']
      ])
      expect(
        lookup.SORT([
          ['a', 'b', 'c'],
          [4, 5, 6],
          [1, 2, 3]
        ])
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        ['a', 'b', 'c']
      ])
      expect(
        lookup.SORT([
          [4, 5, 6],
          ['a', 'b', 'c'],
          [1, 2, 3]
        ])
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6],
        ['a', 'b', 'c']
      ])
      expect(lookup.SORT([[1, 'a', 2]])).to.eql([[1, 'a', 2]])
      expect(lookup.SORT([[2, 'a', 1]], 1, 1)).to.eql([[2, 'a', 1]])
      expect(lookup.SORT([['a', 2, 1]], 1)).to.eql([['a', 2, 1]])
      expect(
        lookup.SORT(
          [
            [1, 'a'],
            [2, 'b'],
            [3, 'c']
          ],
          1,
          1,
          false
        )
      ).to.eql([
        [1, 'a'],
        [2, 'b'],
        [3, 'c']
      ])
      expect(lookup.SORT([['a'], ['b'], [1]])).to.eql([[1], ['a'], ['b']])
      expect(lookup.SORT([[2], ['b'], ['a']], 1)).to.eql([[2], ['a'], ['b']])
    })

    it('should sort array containing numbers by row in descending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ])
      expect(
        lookup.SORT(
          [
            [7, 8, 9],
            [4, 5, 6],
            [1, 2, 3]
          ],
          1,
          -1
        )
      ).to.eql([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ])
      expect(
        lookup.SORT(
          [
            [4, 5, 6],
            [7, 8, 9],
            [1, 2, 3]
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ])
      expect(lookup.SORT([[1, 2, 3]], 1, -1)).to.eql([[1, 2, 3]])
      expect(lookup.SORT([[3, 2, 1]], 1, -1)).to.eql([[3, 2, 1]])
      expect(lookup.SORT([[2, 3, 1]], 1, -1)).to.eql([[2, 3, 1]])
      expect(lookup.SORT([[1], [2], [3]], 1, -1, false)).to.eql([[3], [2], [1]])
      expect(lookup.SORT([[3], [2], [1]], 1, -1)).to.eql([[3], [2], [1]])
      expect(lookup.SORT([[2], [3], [1]], 1, -1)).to.eql([[3], [2], [1]])
      expect(lookup.SORT([[1]], 1, -1)).to.eql([[1]])
    })

    it('should sort array containing strings by row in descending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        ['g', 'h', 'i'],
        ['d', 'e', 'f'],
        ['a', 'b', 'c']
      ])
      expect(
        lookup.SORT(
          [
            ['g', 'h', 'i'],
            ['d', 'e', 'f'],
            ['a', 'b', 'c']
          ],
          1,
          -1
        )
      ).to.eql([
        ['g', 'h', 'i'],
        ['d', 'e', 'f'],
        ['a', 'b', 'c']
      ])
      expect(
        lookup.SORT(
          [
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
            ['a', 'b', 'c']
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        ['g', 'h', 'i'],
        ['d', 'e', 'f'],
        ['a', 'b', 'c']
      ])
      expect(lookup.SORT([['a', 'b', 'c']], 1, -1)).to.eql([['a', 'b', 'c']])
      expect(lookup.SORT([['c', 'b', 'a']], 1, -1)).to.eql([['c', 'b', 'a']])
      expect(lookup.SORT([['b', 'c', 'a']], 1, -1)).to.eql([['b', 'c', 'a']])
      expect(lookup.SORT([['a'], ['b'], ['c']], 1, -1, false)).to.eql([['c'], ['b'], ['a']])
      expect(lookup.SORT([['c'], ['b'], ['a']], 1, -1)).to.eql([['c'], ['b'], ['a']])
      expect(lookup.SORT([['b'], ['c'], ['a']], 1, -1)).to.eql([['c'], ['b'], ['a']])
      expect(lookup.SORT([['a']], 1, -1)).to.eql([['a']])
    })

    it('should sort array containing numbers and strings by row in descending order with sort index of 1', () => {
      expect(
        lookup.SORT(
          [
            [1, 'a', 3],
            [4, 'b', 6],
            [7, 'c', 9]
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        [7, 'c', 9],
        [4, 'b', 6],
        [1, 'a', 3]
      ])
      expect(
        lookup.SORT(
          [
            [7, 'c', 9],
            [4, 'b', 6],
            [1, 'a', 3]
          ],
          1,
          -1
        )
      ).to.eql([
        [7, 'c', 9],
        [4, 'b', 6],
        [1, 'a', 3]
      ])
      expect(
        lookup.SORT(
          [
            [4, 'b', 6],
            [7, 'c', 9],
            [1, 'a', 3]
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        [7, 'c', 9],
        [4, 'b', 6],
        [1, 'a', 3]
      ])
      expect(
        lookup.SORT(
          [
            ['a', 1, 'c'],
            ['a', 'b', 'c'],
            [1, 2, 3]
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        ['a', 1, 'c'],
        ['a', 'b', 'c'],
        [1, 2, 3]
      ])
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            ['a', 1, 'c'],
            ['a', 'b', 'c']
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        ['a', 1, 'c'],
        ['a', 'b', 'c'],
        [1, 2, 3]
      ])
      expect(lookup.SORT([['a', 'b', 1]], 1, -1)).to.eql([['a', 'b', 1]])
      expect(lookup.SORT([[1, 'b', 'a']], 1, -1)).to.eql([[1, 'b', 'a']])
      expect(lookup.SORT([['b', 1, 'a']], 1, -1)).to.eql([['b', 1, 'a']])
      expect(lookup.SORT([['a'], ['b'], [1]], 1, -1, false)).to.eql([['b'], ['a'], [1]])
      expect(lookup.SORT([[1], ['b'], ['a']], 1, -1)).to.eql([['b'], ['a'], [1]])
      expect(lookup.SORT([['b']], 1, -1)).to.eql([['b']])
    })

    it('should sort array by row with varying sort index', () => {
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
          ],
          2,
          1
        )
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(
        lookup.SORT(
          [
            ['g', 'h', 'i'],
            ['d', 'e', 'f'],
            ['a', 'b', 'c']
          ],
          3,
          1
        )
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
          ],
          3,
          -1
        )
      ).to.eql([
        ['g', 'h', 'i'],
        ['d', 'e', 'f'],
        ['a', 'b', 'c']
      ])
      expect(
        lookup.SORT(
          [
            [1, 'a', 3],
            [4, 'b', 6],
            [7, 'c', 9]
          ],
          2,
          1
        )
      ).to.eql([
        [1, 'a', 3],
        [4, 'b', 6],
        [7, 'c', 9]
      ])
      expect(
        lookup.SORT(
          [
            [7, 'c', 9],
            [4, 6, 'b'],
            [1, 'a', 3]
          ],
          3,
          -1
        )
      ).to.eql([
        [4, 6, 'b'],
        [7, 'c', 9],
        [1, 'a', 3]
      ])
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            [4, 5, 6]
          ],
          3,
          -1
        )
      ).to.eql([
        [4, 5, 6],
        [1, 2, 3]
      ])
      expect(lookup.SORT([[1, 2, 3]], 2, -1)).to.eql([[1, 2, 3]])
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            [4, 5, 6]
          ],
          2,
          1
        )
      ).to.eql([
        [1, 2, 3],
        [4, 5, 6]
      ])
      expect(lookup.SORT([[1, 2, 3]], 3, 1)).to.eql([[1, 2, 3]])
    })

    it('should sort array containing empty cells', () => {
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', '', 'f'],
            ['', '', '']
          ],
          1,
          -1
        )
      ).to.eql([
        ['d', 0, 'f'],
        ['a', 'b', 'c'],
        [0, 0, 0]
      ])
      expect(
        lookup.SORT(
          [
            ['a', 'b', 'c'],
            ['d', '', 'f'],
            ['', '', '']
          ],
          1,
          1,
          true
        )
      ).to.eql([
        ['a', 'b', 'c'],
        ['d', 0, 'f'],
        [0, 0, 0]
      ])
      expect(lookup.SORT([[''], ['a'], ['b'], [1]], 1, -1, false)).to.eql([['b'], ['a'], [1], [0]])
      expect(lookup.SORT([[1, 2, 3], [], [4, 5, 6]])).to.eql([
        [0, 0, 0],
        [1, 2, 3],
        [4, 5, 6]
      ])
      expect(lookup.SORT([[1, 2, 3], [], [4, 5, 6]], 1, 1, true)).to.eql([
        [1, 2, 3],
        [0, 0, 0],
        [4, 5, 6]
      ])
      expect(lookup.SORT([[1, 2, 3], [], [4, 5, 6]], 1, -1, true)).to.eql([
        [3, 2, 1],
        [0, 0, 0],
        [6, 5, 4]
      ])
      expect(lookup.SORT([[1, 2, 3], ['a']], 1, 1, true)).to.eql([
        [1, 2, 3],
        ['a', 0, 0]
      ])
      expect(
        lookup.SORT(
          [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ],
          1,
          -1,
          false
        )
      ).to.eql([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ])
      expect(
        lookup.SORT(
          [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
          ],
          3,
          1,
          true
        )
      ).to.eql([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ])
    })

    it('should sort one dimensional arrays', () => {
      expect(lookup.SORT([1, 2, 3])).to.eql([[1, 2, 3]])
      expect(lookup.SORT([3, 2, 1])).to.eql([[3, 2, 1]])
      expect(lookup.SORT([1, 2, 3], 1, 1, true)).to.eql([[1, 2, 3]])
      expect(lookup.SORT([3, 2, 1], 1, 1, true)).to.eql([[1, 2, 3]])
      expect(lookup.SORT([1, 2, 3], 1, -1)).to.eql([[1, 2, 3]])
      expect(lookup.SORT([1, 2, 3], 1, -1, true)).to.eql([[3, 2, 1]])
      expect(lookup.SORT([3, 2, 1]), 1, -1, false).to.eql([[3, 2, 1]])
      expect(lookup.SORT([3, 2, 1]), 1, -1, true).to.eql([[3, 2, 1]])
    })

    it('should return error with invalid inputs', () => {
      expect(lookup.SORT([[1, 2, 3]], 2, 1, true)).to.eql(error.value)
      expect(lookup.SORT([[1, 2, 3]], 0, 1, true)).to.eql(error.value)
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            ['a', 'b', 'c']
          ],
          1,
          100,
          true
        )
      ).to.eql(error.value)
      expect(
        lookup.SORT(
          [
            [1, 2, 3],
            ['a', 'b', 'c']
          ],
          1,
          1,
          'FALSEEE'
        )
      ).to.eql(error.name)
    })
  })

  it('TRANSPOSE', () => {
    expect(lookup.TRANSPOSE(1)).to.equal(1)
    expect(lookup.TRANSPOSE(0)).to.equal(0)
    expect(lookup.TRANSPOSE(-5)).to.equal(-5)
    expect(lookup.TRANSPOSE(true)).to.equal(true)
    expect(lookup.TRANSPOSE(false)).to.equal(false)
    expect(lookup.TRANSPOSE('')).to.equal('')
    expect(lookup.TRANSPOSE('text')).to.equal('text')
    expect(lookup.TRANSPOSE('1')).to.equal('1')
    expect(lookup.TRANSPOSE('true')).to.equal('true')

    expect(lookup.TRANSPOSE([[1, 2, 3]])).to.eql([[1], [2], [3]])
    expect(
      lookup.TRANSPOSE([
        [1, 2],
        [3, 4],
        [5, 6]
      ])
    ).to.eql([
      [1, 3, 5],
      [2, 4, 6]
    ])
    expect(
      lookup.TRANSPOSE([
        [1, 2, 3],
        [4, 5, 6]
      ])
    ).to.eql([
      [1, 4],
      [2, 5],
      [3, 6]
    ])

    expect(lookup.TRANSPOSE()).to.equal(error.na)
    expect(lookup.TRANSPOSE(1, 1)).to.equal(error.na)
  })

  it('UNIQUE', () => {
    expect(lookup.UNIQUE(1, 2, 3, 4, 5, 6, 6, 3)).to.deep.equal([1, 2, 3, 4, 5, 6])
    expect(lookup.UNIQUE('jima', 'jimb', 'jima', 'jimc')).to.deep.equal(['jima', 'jimb', 'jimc'])
    expect(lookup.UNIQUE()).to.eql([])
    expect(lookup.UNIQUE([])).to.eql([[]])
  })

  it('VLOOKUP', () => {
    expect(lookup.VLOOKUP()).to.equal(error.na)
    expect(lookup.VLOOKUP('')).to.equal(error.na)
    expect(lookup.VLOOKUP(1)).to.equal(error.na)
    expect(lookup.VLOOKUP(1, [[1, 2]])).to.equal(error.na)
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        2,
        false,
        4
      )
    ).to.equal(error.na)

    expect(lookup.VLOOKUP(1, [[2, 1]], 2)).to.equal(error.na)

    expect(lookup.VLOOKUP(1, [[1, 2]], 2, false)).to.equal(2)
    expect(lookup.VLOOKUP(1, [[1, 2]], 2, true)).to.equal(2)
    expect(
      lookup.VLOOKUP(
        3,
        [
          [1, '1'],
          [2, '2']
        ],
        2,
        true
      )
    ).to.equal('2')

    expect(
      lookup.VLOOKUP(
        5,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        false
      )
    ).to.equal(error.na)
    expect(
      lookup.VLOOKUP(
        5,
        [
          [1, 2],
          [3, 4]
        ],
        2
      )
    ).to.equal(4)
    expect(
      lookup.VLOOKUP(
        5,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
    ).to.equal(4)

    expect(
      lookup.VLOOKUP(
        2,
        [
          [1, 'A'],
          [2, 'B'],
          [3, 'C'],
          [4, 'D'],
          [2, 'E']
        ],
        2
      )
    ).to.equal('B')
    expect(
      lookup.VLOOKUP(
        1.1,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
    ).to.equal(2)
    expect(
      lookup.VLOOKUP(
        0,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
    ).to.equal(error.na)
    expect(
      lookup.VLOOKUP(
        'ji',
        [
          ['hector', 2],
          ['jam', 4]
        ],
        2
      )
    ).to.equal(4)
    expect(
      lookup.VLOOKUP(
        'ji',
        [
          ['hector', 2],
          ['jam', 4]
        ],
        2,
        false
      )
    ).to.equal(error.na)
    expect(
      lookup.VLOOKUP(
        'jam',
        [
          ['hector', 2],
          ['jam', 4]
        ],
        2,
        false
      )
    ).to.equal(4)
    expect(
      lookup.VLOOKUP(
        'jam',
        [
          ['hector', -1],
          ['jam', 0]
        ],
        2,
        false
      )
    ).to.equal(0)
    expect(
      lookup.VLOOKUP(
        'james',
        [
          ['jam', 2],
          ['jim', 4]
        ],
        2
      )
    ).to.equal(2)
    expect(
      lookup.VLOOKUP(
        'jim',
        [
          ['jam', 2],
          ['jim', 4]
        ],
        2,
        false
      )
    ).to.equal(4)
    expect(
      lookup.VLOOKUP(
        'john',
        [
          ['john', 4],
          ['jam', 2]
        ],
        2
      )
    ).to.equal(4)
    expect(
      lookup.VLOOKUP(
        'ji',
        [
          ['jim', 2],
          ['jam', 4]
        ],
        3,
        true
      )
    ).to.equal(error.ref)
    expect(
      lookup.VLOOKUP(
        0,
        [
          [1, 'Jim'],
          [0, 'John']
        ],
        2,
        false
      )
    ).to.equal('John')
    expect(
      lookup.VLOOKUP(
        0,
        [
          [1, 'Jim'],
          [0, 'John'],
          [2, 'Jack']
        ],
        2,
        true
      )
    ).to.equal('John')
    expect(
      lookup.VLOOKUP(
        1.1,
        [
          [0, 'A'],
          [1, 'B'],
          [2, 'C'],
          [1, 'D']
        ],
        2,
        true
      )
    ).to.equal('B')
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B'],
          [2, 'C'],
          [1, 'D']
        ],
        2
      )
    ).to.equal('B')
    expect(
      lookup.VLOOKUP(
        1.1,
        [
          [0, 'A'],
          [1, 'B'],
          [2, 'C'],
          [1, 'D']
        ],
        2,
        false
      )
    ).to.equal(error.na)
    // expect(lookup
    //   .VLOOKUP(
    //     [0, 1, 2, 1],
    //     3,
    //     2,
    //     4
    //   )
    //   ).to.equal(error.ref)
    expect(
      lookup.VLOOKUP(
        false,
        [
          [0, 'A'],
          [1, 'B'],
          [2, 'C'],
          [1, 'D']
        ],
        true,
        false
      )
    ).to.equal(error.na)

    expect(
      lookup.VLOOKUP(
        2,
        [
          [0, 'A'],
          [1, 'B'],
          [4, 'C'],
          [2, 'D'],
          [3, 'e']
        ],
        2
      )
    ).to.equal('B')

    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        '2'
      )
    ).to.equal('B')
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        true
      )
    ).to.equal(1)
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        0
      )
    ).to.equal(error.value)
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        false
      )
    ).to.equal(error.value)
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        -1
      )
    ).to.equal(error.value)
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        ''
      )
    ).to.equal(error.value)
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        'text'
      )
    ).to.equal(error.value)
    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        error.div0
      )
    ).to.equal(error.value)

    expect(
      lookup.VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B']
        ],
        2,
        error.calc
      )
    ).to.equal(error.calc)
    expect(
      lookup.VLOOKUP(
        3,
        [
          [0, 'A'],
          [1, 'B'],
          [4, 'C'],
          [2, 'D'],
          [3, 'E']
        ],
        2,
        'tRuE'
      )
    ).to.equal('B')
    expect(
      lookup.VLOOKUP(
        3,
        [
          [0, 'A'],
          [1, 'B'],
          [4, 'C'],
          [2, 'D'],
          [3, 'E']
        ],
        2,
        'fALse'
      )
    ).to.equal('E')
    expect(
      lookup.VLOOKUP(
        3,
        [
          [0, 'A'],
          [1, 'B'],
          [4, 'C'],
          [2, 'D'],
          [3, 'E']
        ],
        2,
        1
      )
    ).to.equal('B')
    expect(
      lookup.VLOOKUP(
        3,
        [
          [0, 'A'],
          [1, 'B'],
          [4, 'C'],
          [2, 'D'],
          [3, 'E']
        ],
        2,
        -5
      )
    ).to.equal('B')
    expect(
      lookup.VLOOKUP(
        3,
        [
          [0, 'A'],
          [1, 'B'],
          [4, 'C'],
          [2, 'D'],
          [3, 'E']
        ],
        2,
        0
      )
    ).to.equal('E')
    expect(
      lookup.VLOOKUP(
        3,
        [
          [0, 'A'],
          [1, 'B'],
          [4, 'C'],
          [2, 'D'],
          [3, 'E']
        ],
        2,
        '1'
      )
    ).to.equal(error.value)
  })

  it('HLOOKUP', () => {
    expect(lookup.HLOOKUP()).to.equal(error.na)
    expect(lookup.HLOOKUP(1)).to.equal(error.na)
    expect(lookup.HLOOKUP(1, [[1, 2]])).to.equal(error.na)
    expect(lookup.HLOOKUP(1, [[1], [2]], 2)).to.equal(2)
    expect(lookup.HLOOKUP(1, [[1], [2]], 3)).to.equal(error.ref)
    expect(
      lookup.HLOOKUP(
        1,
        [
          [1, 2],
          [3, 4]
        ],
        2
      )
    ).to.equal(3)
    expect(
      lookup.HLOOKUP(
        2,
        [
          [1, 2],
          [3, 4]
        ],
        2
      )
    ).to.equal(4)
    expect(lookup.HLOOKUP(1, [[1], [2]], 2, true)).to.equal(2)
    expect(lookup.HLOOKUP(1, [[1], [2]], 3, true)).to.equal(error.ref)
    expect(
      lookup.HLOOKUP(
        1,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
    ).to.equal(3)
    expect(
      lookup.HLOOKUP(
        2,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
    ).to.equal(4)
    expect(
      lookup.HLOOKUP(
        'ji',
        [
          ['jim', 'jam'],
          [1, 4]
        ],
        2,
        false
      )
    ).to.equal(error.na)
    expect(
      lookup.HLOOKUP(
        'jb',
        [
          ['jam', 'jim'],
          [1, 4]
        ],
        2,
        true
      )
    ).to.equal(1)
    expect(
      lookup.HLOOKUP(
        'li',
        [
          ['hector', 'jim'],
          [1, 4]
        ],
        2,
        true
      )
    ).to.equal(4)
    expect(
      lookup.HLOOKUP(
        'ji',
        [
          ['hector', 'jam'],
          [1, 4]
        ],
        3,
        true
      )
    ).to.equal(error.ref)
    expect(
      lookup.HLOOKUP(
        'ji',
        [
          ['jim', 'jam'],
          [1, 4]
        ],
        3,
        false
      )
    ).to.equal(error.na)
    expect(
      lookup.HLOOKUP(
        0,
        [
          [1, 0],
          ['jim', 'jam']
        ],
        2,
        false
      )
    ).to.equal('jam')
    expect(
      lookup.HLOOKUP(
        0,
        [
          [0, 1],
          ['jim', 'jam']
        ],
        2
      )
    ).to.equal('jim')
    expect(
      lookup.HLOOKUP(
        1.4,
        [
          [0, 1, 2, 1],
          ['A', 'B', 'C', 'D']
        ],
        2
      )
    ).to.equal('B')
    expect(
      lookup.HLOOKUP(
        1.4,
        [
          [0, 1, 2, 1],
          ['A', 'B', 'C', 'D']
        ],
        2,
        false
      )
    ).to.equal(error.na)
  })

  it('LOOKUP', () => {
    expect(lookup.LOOKUP('Jamie', [['Jim', 'Jack', 'Franck']], [['blue'], ['yellow'], ['red']])).to.equal('red')
    expect(lookup.LOOKUP('Jamie', [['Jim'], ['Jack'], ['Franck']], [['blue'], ['yellow'], ['red']])).to.equal('red')

    expect(lookup.LOOKUP('Jack', [['Jim'], ['Jack'], ['Franck']], [['blue'], ['yellow'], ['red']])).to.equal('yellow')
    expect(
      lookup.LOOKUP(
        3125,
        [[1000], [2000], [3000], [4000], [5000]],
        [['Bronze'], ['Silver'], ['Gold'], ['Platinum'], ['Dinamond']]
      )
    ).to.equal('Gold')

    expect(lookup.LOOKUP(0.23, [[0.1], [0.2], [0.3], [0.4]], [['A'], ['B'], ['C'], ['D']])).to.equal('B')
    expect(lookup.LOOKUP(0.21, [[0.1, 0.2, 0.3, 0.2]], [['A', 'B', 'C', 'D']])).to.equal('B')

    expect(lookup.LOOKUP(3.5, [[4, 3, 1, 8, 6]], [['A', 'B', 'C', 'D']])).to.equal('C')
    expect(lookup.LOOKUP(3.5, [[4, 3, 1, 8, 6]], [['A', 'B']])).to.equal(error.ref)

    expect(
      lookup.LOOKUP(6, [
        [1, 6, 11, 16],
        [2, 7, 12, 17],
        [3, 8, 13, 18],
        [4, 9, 14, 19]
      ])
    ).to.equal(19)
    expect(
      lookup.LOOKUP(6, [
        [1, 6, 11, 16],
        [2, 7, 12, 17],
        [3, 8, 13, 18]
      ])
    ).to.equal(8)

    expect(
      lookup.LOOKUP(
        6,
        [
          [1, 6, 11, 16],
          [2, 7, 12, 17],
          [3, 8, 13, 18],
          [4, 9, 14, 19]
        ],
        [['text 1', 'text 2', 'text 3', 'text 4']]
      )
    ).to.equal('text 4')
    expect(
      lookup.LOOKUP(
        6,
        [
          [1, 6, 11, 16],
          [2, 7, 12, 17],
          [3, 8, 13, 18]
        ],
        [['text 1', 'text 2', 'text 3', 'text 4']]
      )
    ).to.equal('text 2')

    expect(
      lookup.LOOKUP(
        1,
        [
          [1, 6, 11, 16],
          [2, 7, 12, 17],
          [3, 8, 13, 18],
          [4, 9, 14, 19],
          [5, 10, 15, 20]
        ],
        [
          [1, 6, 11, 16],
          [2, 7, 12, 17],
          [3, 8, 13, 18],
          [4, 9, 14, 19],
          [5, 10, 15, 20]
        ]
      )
    ).to.equal(error.na)

    expect(lookup.LOOKUP(6, 4)).to.equal(4)
    expect(lookup.LOOKUP(6, 4, 8)).to.equal(8)

    expect(lookup.LOOKUP(error.div0, [[1], [2], [3], [4], [5]])).to.equal(error.div0)
    expect(lookup.LOOKUP(6, error.div0)).to.equal(error.na)

    expect(lookup.LOOKUP(0, [[0.1, 0.2, 0.3, 0.4]], [['A', 'B', 'C', 'D']])).to.equal(error.na)
    expect(
      lookup.LOOKUP(
        3125,
        [['Bronze'], ['Silver'], ['Gold'], ['Platinum'], ['Dinamond']],
        [[1000], [2000], [3000], [4000], [5000]]
      )
    ).to.equal(error.na)
    expect(lookup.LOOKUP(true, [1, 2, 3])).to.equal(error.na)

    expect(
      lookup.LOOKUP(
        [[1000], [2000], [3000], [4000], [5000]],
        [['Bronze'], ['Silver'], ['Gold'], ['Platinum'], ['Dinamond']]
      )
    ).to.equal(error.na)

    expect(lookup.LOOKUP()).to.equal(error.na)
    expect(lookup.LOOKUP(1)).to.equal(error.na)
    expect(lookup.LOOKUP('')).to.equal(error.na)
    expect(lookup.LOOKUP('Jack', ['Jim', 'Jack', 'Franck'], ['blue', 'yellow', 'red'], 2)).to.equal(error.na)
  })

  describe('INDEX', () => {
    describe('Array form', () => {
      describe('and a single cell', () => {
        it('should return the value', () => {
          expect(lookup.INDEX(4, 1, 1)).to.equal(4)
          expect(lookup.INDEX('text', 0, null)).to.equal('text')
          expect(lookup.INDEX('-5', 1, false)).to.equal('-5')
          expect(lookup.INDEX(false, 0, true)).to.equal(false)

          expect(lookup.INDEX(false, 1)).to.equal(false)
        })

        it('should throw an error if row or column number is out of range', () => {
          expect(lookup.INDEX(true, 2, 0)).to.equal(error.ref)
          expect(lookup.INDEX(true, 0, 2)).to.equal(error.ref)
        })
      })

      const row = [[1, true, 3, '5', 8]]
      describe('and a row', () => {
        it('should return the value', () => {
          expect(lookup.INDEX(row, 1, 4)).to.equal('5')
          expect(lookup.INDEX(row, 1, 5)).to.equal(8)
          expect(lookup.INDEX(row, 1, 2)).to.equal(true)

          expect(lookup.INDEX(row, 1, 0)).to.eql(row)
          expect(lookup.INDEX(row, 1, 1.9)).to.eql(1)
          expect(lookup.INDEX(row, 1, null)).to.eql(row)
          expect(lookup.INDEX(row, 1, '0')).to.eql(row)
          expect(lookup.INDEX(row, 1, '1')).to.eql(1)

          expect(lookup.INDEX(row, '1', 3)).to.equal(3)
          expect(lookup.INDEX(row, 0, 3)).to.equal(3)
          expect(lookup.INDEX(row, true, 3)).to.equal(3)
          expect(lookup.INDEX(row, false, 3)).to.equal(3)
          expect(lookup.INDEX(row, null, 3)).to.equal(3)
        })

        it('should return the correct value in case second parameter is omitted', () => {
          expect(lookup.INDEX(row, 2)).to.equal(true)
        })

        it('should throw an error if row or column number is out of range', () => {
          expect(lookup.INDEX(row, 1, 6)).to.equal(error.ref)
          expect(lookup.INDEX(row, 2, 1)).to.equal(error.ref)

          expect(lookup.INDEX(row, 6)).to.equal(error.ref)
          expect(lookup.INDEX(row, -1)).to.equal(error.value)

          expect(lookup.INDEX(row, 1, -6)).to.equal(error.value)
          expect(lookup.INDEX(row, -6, 1)).to.equal(error.value)

          expect(lookup.INDEX(row, '', 3)).to.equal(error.value)
          expect(lookup.INDEX(row, 'true', 3)).to.equal(error.value)

          expect(lookup.INDEX(row, 1, '')).to.eql(error.value)
          expect(lookup.INDEX(row, 1, 'true')).to.eql(error.value)
        })
      })

      const column = [[1], [false], [5], ['text'], [-2.4]]
      describe('and a column', () => {
        it('should return the value', () => {
          expect(lookup.INDEX(column, 2, 1)).to.equal(false)
          expect(lookup.INDEX(column, 0, 1)).to.eql(column)
          expect(lookup.INDEX(column, '0', 1)).to.eql(column)
          expect(lookup.INDEX(column, null, 1)).to.eql(column)
          expect(lookup.INDEX(column, false, 1)).to.eql(column)
        })

        it('should return the correct value in case second parameter is omitted', () => {
          expect(lookup.INDEX(column, 2)).to.equal(false)
        })

        it('should throw an error if row or column number is out of range', () => {
          expect(lookup.INDEX(column, 1, 2)).to.eql(error.ref)
          expect(lookup.INDEX(column, 1, -1)).to.eql(error.value)
          expect(lookup.INDEX(column, 1, 'text')).to.eql(error.value)

          expect(lookup.INDEX(column, 6, 1)).to.eql(error.ref)
          expect(lookup.INDEX(column, -1, 1)).to.eql(error.value)
          expect(lookup.INDEX(column, '', 1)).to.eql(error.value)
        })
      })

      const twoDimensionRange = [
        ['Banana', 'Apple'],
        ['Strawberry', 'Pineapple']
      ]
      describe('and two dimensions Range', () => {
        it('should return the correct value', () => {
          expect(lookup.INDEX(twoDimensionRange, 2, 1)).to.equal('Strawberry')
          expect(lookup.INDEX(twoDimensionRange, 1, 2)).to.equal('Apple')

          expect(lookup.INDEX(twoDimensionRange, 0, 1)).to.eql([['Banana'], ['Strawberry']])
          expect(lookup.INDEX(twoDimensionRange, 1, 0)).to.eql([['Banana', 'Apple']])
          expect(lookup.INDEX(twoDimensionRange, 0, 0)).to.eql(twoDimensionRange)
        })

        it('should throw an error if row or column number is out of range', () => {
          expect(lookup.INDEX(twoDimensionRange, 1, 3)).to.equal(error.ref)
          expect(lookup.INDEX(twoDimensionRange, 3, 1)).to.equal(error.ref)

          expect(lookup.INDEX(twoDimensionRange, -1, 1)).to.equal(error.value)
          expect(lookup.INDEX(twoDimensionRange, 1, -1)).to.equal(error.value)
        })
      })

      it('should return an error in case of error', () => {
        Object.values(error).forEach((err) => {
          expect(lookup.INDEX(err, 2)).to.equal(err)
          expect(lookup.INDEX(1, err)).to.equal(err)

          expect(lookup.INDEX(err, 1, 1)).to.equal(err)
          expect(lookup.INDEX(1, err, 1)).to.equal(err)
          expect(lookup.INDEX(1, 1, err)).to.equal(err)
        })
      })

      it('should return an error because of incorrect number of arguments', () => {
        expect(lookup.INDEX()).to.equal(error.na)
        expect(lookup.INDEX('')).to.equal(error.na)
        expect(lookup.INDEX(row, 1, 1, 1)).to.equal(error.na)
      })
    })
  })
})
