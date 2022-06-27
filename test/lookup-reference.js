import 'should'

import * as error from '../src/utils/error.js'
import * as lookup from '../src/lookup-reference.js'

describe('Lookup Reference', () => {
  it('MATCH', () => {
    lookup.MATCH().should.equal(error.na)
    lookup.MATCH(1).should.equal(error.na)
    lookup.MATCH(1, [0, 1, 2, 3, 4, 100, 7]).should.equal(2)
    lookup.MATCH(1, [[0], [1], [2], [3], [4]]).should.equal(2)
    lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 1).should.equal(5)
    lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 0).should.equal(5)
    lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], -1).should.equal(5)
    lookup.MATCH(5, [0, 1, 2, 3, 4, 100, 7], 1).should.equal(5)
    lookup.MATCH(5, [0, 1, 2, 3, 4, 100, 7], 0).should.equal(error.na)
    lookup.MATCH(5, [0, 1, 2, 3, 4, 100, 7], -1).should.equal(7)
    lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 2).should.equal(error.na)
    lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], -2).should.equal(error.na)
    lookup.MATCH('jima', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(1)
    lookup.MATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(2)
    lookup.MATCH('j?b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.MATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(2)
    lookup.MATCH('j???b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.MATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(1)
    lookup.MATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(3)
    lookup.MATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], -1).should.equal(3)
    lookup.MATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], 1).should.equal(2)
  })

  it('VLOOKUP', () => {
    lookup.VLOOKUP().should.equal(error.na)
    lookup.VLOOKUP(1).should.equal(error.na)
    lookup.VLOOKUP(1, [[1, 2]]).should.equal(error.na)
    lookup.VLOOKUP(1, [[1, 2]], 2).should.equal(2)
    lookup.VLOOKUP(1, [[1, 2]], 2, false).should.equal(2)
    lookup.VLOOKUP(1, [[1, 2]], 2, true).should.equal(2)
    lookup
      .VLOOKUP(
        3,
        [
          [1, '1'],
          [2, '2']
        ],
        2,
        true
      )
      .should.equal('2')
    lookup
      .VLOOKUP(
        5,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        false
      )
      .should.equal(error.na)
    lookup
      .VLOOKUP(
        5,
        [
          [1, 2],
          [3, 4]
        ],
        2
      )
      .should.equal(4)
    lookup
      .VLOOKUP(
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
      .should.equal('B')
    lookup
      .VLOOKUP(
        5,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
      .should.equal(4)
    lookup
      .VLOOKUP(
        1.1,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
      .should.equal(2)
    lookup
      .VLOOKUP(
        0,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
      .should.equal(error.na)
    lookup
      .VLOOKUP(
        'ji',
        [
          ['hector', 2],
          ['jam', 4]
        ],
        2
      )
      .should.equal(4)
    lookup
      .VLOOKUP(
        'ji',
        [
          ['hector', 2],
          ['jam', 4]
        ],
        2,
        false
      )
      .should.equal(error.na)
    lookup
      .VLOOKUP(
        'jam',
        [
          ['hector', 2],
          ['jam', 4]
        ],
        2,
        false
      )
      .should.equal(4)
    lookup
      .VLOOKUP(
        'jam',
        [
          ['hector', -1],
          ['jam', 0]
        ],
        2,
        false
      )
      .should.equal(0)
    lookup
      .VLOOKUP(
        'james',
        [
          ['jam', 2],
          ['jim', 4]
        ],
        2
      )
      .should.equal(2)
    lookup
      .VLOOKUP(
        'jim',
        [
          ['jam', 2],
          ['jim', 4]
        ],
        2,
        false
      )
      .should.equal(4)
    lookup
      .VLOOKUP(
        'john',
        [
          ['john', 4],
          ['jam', 2]
        ],
        2
      )
      .should.equal(4)
    lookup
      .VLOOKUP(
        'ji',
        [
          ['jim', 2],
          ['jam', 4]
        ],
        3,
        true
      )
      .should.equal(error.ref)
    lookup
      .VLOOKUP(
        0,
        [
          [1, 'Jim'],
          [0, 'John']
        ],
        2,
        false
      )
      .should.equal('John')
    lookup
      .VLOOKUP(
        0,
        [
          [1, 'Jim'],
          [0, 'John'],
          [2, 'Jack']
        ],
        2,
        true
      )
      .should.equal('John')
    lookup
      .VLOOKUP(
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
      .should.equal('B')
    lookup
      .VLOOKUP(
        1,
        [
          [0, 'A'],
          [1, 'B'],
          [2, 'C'],
          [1, 'D']
        ],
        2
      )
      .should.equal('B')
    lookup
      .VLOOKUP(
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
      .should.equal(error.na)
  })

  it('HLOOKUP', () => {
    lookup.HLOOKUP().should.equal(error.na)
    lookup.HLOOKUP(1).should.equal(error.na)
    lookup.HLOOKUP(1, [[1, 2]]).should.equal(error.na)
    lookup.HLOOKUP(1, [[1], [2]], 2).should.equal(2)
    lookup.HLOOKUP(1, [[1], [2]], 3).should.equal(error.ref)
    lookup
      .HLOOKUP(
        1,
        [
          [1, 2],
          [3, 4]
        ],
        2
      )
      .should.equal(3)
    lookup
      .HLOOKUP(
        2,
        [
          [1, 2],
          [3, 4]
        ],
        2
      )
      .should.equal(4)
    lookup.HLOOKUP(1, [[1], [2]], 2, true).should.equal(2)
    lookup.HLOOKUP(1, [[1], [2]], 3, true).should.equal(error.ref)
    lookup
      .HLOOKUP(
        1,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
      .should.equal(3)
    lookup
      .HLOOKUP(
        2,
        [
          [1, 2],
          [3, 4]
        ],
        2,
        true
      )
      .should.equal(4)
    lookup
      .HLOOKUP(
        'ji',
        [
          ['jim', 'jam'],
          [1, 4]
        ],
        2,
        false
      )
      .should.equal(error.na)
    lookup
      .HLOOKUP(
        'jb',
        [
          ['jam', 'jim'],
          [1, 4]
        ],
        2,
        true
      )
      .should.equal(1)
    lookup
      .HLOOKUP(
        'li',
        [
          ['hector', 'jim'],
          [1, 4]
        ],
        2,
        true
      )
      .should.equal(4)
    lookup
      .HLOOKUP(
        'ji',
        [
          ['hector', 'jam'],
          [1, 4]
        ],
        3,
        true
      )
      .should.equal(error.ref)
    lookup
      .HLOOKUP(
        'ji',
        [
          ['jim', 'jam'],
          [1, 4]
        ],
        3,
        false
      )
      .should.equal(error.na)
    lookup
      .HLOOKUP(
        0,
        [
          [1, 0],
          ['jim', 'jam']
        ],
        2,
        false
      )
      .should.equal('jam')
    lookup
      .HLOOKUP(
        0,
        [
          [0, 1],
          ['jim', 'jam']
        ],
        2
      )
      .should.equal('jim')
    lookup
      .HLOOKUP(
        1.4,
        [
          [0, 1, 2, 1],
          ['A', 'B', 'C', 'D']
        ],
        2
      )
      .should.equal('B')
    lookup
      .HLOOKUP(
        1.4,
        [
          [0, 1, 2, 1],
          ['A', 'B', 'C', 'D']
        ],
        2,
        false
      )
      .should.equal(error.na)
  })

  describe('LOOKUP', () => {
    describe('without a resultArray', () => {
      it('should return the nearest value', () => {
        lookup.LOOKUP(0.21, [[0.1, 0.2, 0.3, 0.2]]).should.equal(0.2)
      })
    })

    describe('with a resultArray', () => {
      lookup.LOOKUP('Jack', ['Jim', 'Jack', 'Franck'], ['blue', 'yellow', 'red']).should.equal('yellow')
      lookup.LOOKUP('Jack', [['Jim'], ['Jack'], ['Franck']], [['blue'], ['yellow'], ['red']]).should.equal('yellow')
      lookup.LOOKUP('Jamie', ['Jim', 'Jack', 'Franck'], ['blue', 'yellow', 'red']).should.equal('red')
      lookup.LOOKUP('Jamie', [['Jim'], ['Jack'], ['Franck']], [['blue'], ['yellow'], ['red']]).should.equal('red')
      lookup.LOOKUP(0.23, [[0.1], [0.2], [0.3], [0.4]], [['A'], ['B'], ['C'], ['D']]).should.equal('B')
      lookup.LOOKUP(0, [[0.1, 0.2, 0.3, 0.4]], [['A', 'B', 'C', 'D']]).should.equal(error.na)
      lookup.LOOKUP(0.21, [[0.1, 0.2, 0.3, 0.2]], [['A', 'B', 'C', 'D']]).should.equal('B')
    })
  })

  describe('INDEX', () => {
    describe('Array form', () => {
      const oneDimensionRange = [1, 2, 3, 5, 8]
      describe('and a one dimension Range', () => {
        it('should return the value', () => {
          lookup.INDEX(oneDimensionRange, 1, 4).should.equal(5)
          lookup.INDEX(['1', '2', '3', '5', '8'], 1, 5).should.equal('8')
        })

        it('should return the correct value in case second parameter is omitted', () => {
          lookup.INDEX(oneDimensionRange, 4).should.equal(5)
        })

        it('should throw an error if row or column number is out of range', () => {
          lookup.INDEX(oneDimensionRange, 2, 4).should.equal(error.ref)
          lookup.INDEX(oneDimensionRange, 1, 12).should.equal(error.ref)
          lookup.INDEX(oneDimensionRange, 6).should.equal(error.ref)
          lookup.INDEX(oneDimensionRange, -6).should.equal(error.value)
        })

        it('should throw an error in case of error or empty inputs', () => {
          lookup.INDEX(undefined, 2, 4).should.equal(error.value)
          lookup.INDEX(error.ref, 2, 4).should.equal(error.ref)
          lookup.INDEX(oneDimensionRange, error.na).should.equal(error.na)
        })
      })

      const twoDimensionRange = [
        ['Banana', 'Apple'],
        ['Strawberry', 'Pineapple']
      ]
      describe('and two dimensions Range', () => {
        it('should return the correct value', () => {
          lookup.INDEX(twoDimensionRange, 2, 1).should.equal('Strawberry')
          lookup.INDEX(twoDimensionRange, 1, 2).should.equal('Apple')
          lookup.INDEX([['Banana'], ['Apple']], 2).should.equal('Apple')
        })

        it('should throw an error if row or column number is out of range', () => {
          lookup.INDEX(twoDimensionRange, 2, 5).should.equal(error.ref)
          lookup.INDEX(twoDimensionRange, 2, 5).should.equal(error.ref)
          lookup.INDEX(twoDimensionRange, -2, 5).should.equal(error.value)
          lookup.INDEX(twoDimensionRange, 2, -5).should.equal(error.value)
        })
      })
    })
  })
})
