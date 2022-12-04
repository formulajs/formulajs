import 'should'

import * as error from '../src/utils/error.js'
import * as lookup from '../src/lookup-reference.js'

describe('Lookup Reference', () => {
  it('CHOOSE', () => {
    lookup.CHOOSE().should.equal(error.na)
    lookup.CHOOSE(1).should.equal(error.na)
    lookup.CHOOSE(1, 'jima').should.equal('jima')
    lookup.CHOOSE(3, 'jima', 'jimb', 'jimc').should.equal('jimc')
    lookup.CHOOSE(2, 'jima').should.equal(error.value)
    lookup.CHOOSE(255, 'jima').should.equal(error.value)
  })

  it('COLUMN', () => {
    lookup.COLUMN().should.equal(error.na)
    lookup
      .COLUMN([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
      .should.equal(error.na)
    lookup
      .COLUMN(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        -1
      )
      .should.equal(error.num)
    lookup.COLUMN('hello', 1).should.equal(error.value)
    lookup
      .COLUMN(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        0
      )
      .should.eql([[1], [2], [2]])
    lookup
      .COLUMN(
        [
          [1, 2],
          [2, 3],
          [2, 4]
        ],
        1
      )
      .should.eql([[2], [3], [4]])
    ;(typeof lookup.COLUMN([], 0)).should.equal('undefined')
  })

  it('COLUMNS', () => {
    lookup.COLUMNS().should.equal(error.na)
    lookup.COLUMNS(1).should.equal(error.value)
    lookup.COLUMNS([]).should.eql(0)
    lookup
      .COLUMNS([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
      .should.equal(2)
    lookup.COLUMNS([[1, 2]]).should.equal(2)
    lookup.COLUMNS([1, 2]).should.equal(1)
  })

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
    lookup.MATCH('ji**', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(1)
    lookup.MATCH('*mc', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(3)
    lookup.MATCH('*er*', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(4)
    lookup.MATCH('jima~.', ['jima.', 'jimb', 'jimc', 'bernie'], 0).should.equal(1)
    lookup.MATCH('j~$ma', ['j$ma', 'jimb', 'jimc', 'bernie'], 0).should.equal(1)
    lookup.MATCH('*?c', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(3)
    lookup.MATCH('*$c', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.MATCH('selected', ['not_selected', 'not_selected', 'selected', 'not_selected'], 0).should.equal(3)
  })

  it('ROWS', () => {
    lookup.ROWS().should.equal(error.na)
    lookup.ROWS(1).should.equal(error.value)
    lookup.ROWS([]).should.eql(0)
    lookup
      .ROWS([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
      .should.equal(3)
    lookup.ROWS([[1, 2]]).should.equal(1)
    lookup.ROWS([1, 2]).should.equal(2)
  })

  it('TRANSPOSE', () => {
    lookup.TRANSPOSE().should.equal(error.na)
    lookup.TRANSPOSE([]).should.eql([])
    lookup.TRANSPOSE([1, 2, 3]).should.eql([[1], [2], [3]])
    lookup
      .TRANSPOSE([
        [1, 2],
        [3, 4],
        [5, 6]
      ])
      .should.eql([
        [1, 3, 5],
        [2, 4, 6]
      ])
    lookup
      .TRANSPOSE([
        [1, 2, 3],
        [4, 5, 6]
      ])
      .should.eql([
        [1, 4],
        [2, 5],
        [3, 6]
      ])
  })

  it('UNIQUE', () => {
    lookup.UNIQUE(1, 2, 3, 4, 5, 6, 6, 3).should.containDeep([1, 2, 3, 4, 5, 6])
    lookup.UNIQUE('jima', 'jimb', 'jima', 'jimc').should.containDeep(['jima', 'jimb', 'jimc'])
    lookup.UNIQUE().should.eql([])
    lookup.UNIQUE([]).should.eql([[]])
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

  describe.only('SORT', () => {
    it('should sort array containing numbers by column in ascending order with sort index of 1', () => {
      lookup.SORT([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      1,
      1,
      true
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])

      lookup.SORT([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ],
      1,
      1,
      true
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])

      lookup.SORT([
        [2, 3, 1],
        [5, 6, 4],
        [8, 9, 7]
      ],
      1,
      1,
      true
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])

      lookup.SORT([
        [1, 2, 3],
      ],
      1,
      1,
      true
      ).should.eql([
        [1, 2, 3],
      ])

      lookup.SORT([
        [3, 2, 1],
      ],
      1,
      1,
      true
      ).should.eql([
        [1, 2, 3],
      ])

      lookup.SORT([
        [2, 3, 1],
      ],
      1,
      1,
      true
      ).should.eql([
        [1, 2, 3],
      ])

      lookup.SORT([
        [1],
        [2],
        [3]
      ],
      1,
      1,
      true
      ).should.eql([
        [1],
        [2],
        [3]
      ])

      lookup.SORT([
        [3],
        [2],
        [1]
      ],
      1,
      1,
      true
      ).should.eql([
        [3],
        [2],
        [1]
      ])

      lookup.SORT([
        [2],
        [3],
        [1]
      ],
      1,
      1,
      true
      ).should.eql([
        [2],
        [3],
        [1]
      ])

      lookup.SORT([
        [1],
      ],
      1,
      1,
      true
      ).should.eql([
        [1],
      ])
    })

    it('should sort array containing strings by column in ascending order with sort index of 1', () => {
      lookup.SORT([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ],
      1,
      1,
      true
      ).should.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])

      lookup.SORT([
        ['c', 'b', 'a'],
        ['f', 'e', 'd'],
        ['i', 'h', 'g']
      ],
      1,
      1,
      true
      ).should.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])

      lookup.SORT([
        ['b', 'c', 'a'],
        ['e', 'f', 'd'],
        ['h', 'i', 'g']
      ],
      1,
      1,
      true
      ).should.eql([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ])

      lookup.SORT([
        ['a', 'b', 'c'],
      ],
      1,
      1,
      true
      ).should.eql([
        ['a', 'b', 'c'],
      ])

      lookup.SORT([
        ['c', 'b', 'a'],
      ],
      1,
      1,
      true
      ).should.eql([
        ['a', 'b', 'c'],
      ])

      lookup.SORT([
        ['b', 'c', 'a'],
      ],
      1,
      1,
      true
      ).should.eql([
        ['a', 'b', 'c'],
      ])

      lookup.SORT([
        ['a'],
        ['b'],
        ['c']
      ],
      1,
      1,
      true
      ).should.eql([
        ['a'],
        ['b'],
        ['c']
      ])

      lookup.SORT([
        ['c'],
        ['b'],
        ['a']
      ],
      1,
      1,
      true
      ).should.eql([
        ['c'],
        ['b'],
        ['a']
      ])

      lookup.SORT([
        ['b'],
        ['c'],
        ['a']
      ],
      1,
      1,
      true
      ).should.eql([
        ['b'],
        ['c'],
        ['a']
      ])

      lookup.SORT([
        ['a'],
      ],
      1,
      1,
      true
      ).should.eql([
        ['a'],
      ])
    })

    it('should sort array containing numbers and strings by column in ascending order with sort index of 1', () => {
      lookup.SORT([
        [1, 2, 3],
        ['d', 'e', 'f'],
        [7, 8, 9]
      ],
      1,
      1,
      true
      ).should.eql([
        [1, 2, 3],
        ['d', 'e', 'f'],
        [7, 8, 9]
      ])

      lookup.SORT([
        ["a", 2, 3],
        [6, 'e', 'f'],
        [7, 8, 9]
      ],
      1,
      1,
      true
      ).should.eql([
        [2, 3, "a"],
        ['e', 'f', 6],
        [8, 9, 7]
      ])

      lookup.SORT([
        ["a", 2, 3],
        ["d", 5, 6],
        ["g", 8, 9]
      ],
      1,
      1,
      true
      ).should.eql([
        [2, 3, "a"],
        [5, 6, "d"],
        [8, 9, "g"]
      ])

      lookup.SORT([
        [2, 3, "a"],
        [5, 6, "d"],
        [8, 9, "g"]
      ],
      1,
      1,
      true
      ).should.eql([
        [2, 3, "a"],
        [5, 6, "d"],
        [8, 9, "g"]
      ])

      lookup.SORT([
        [2, 3, "a"],
      ],
      1,
      1,
      true
      ).should.eql([
        [2, 3, "a"],
      ])

      lookup.SORT([
        ["a", 2, 3],
      ],
      1,
      1,
      true
      ).should.eql([
        [2, 3, "a"],
      ])

      lookup.SORT([
        ["a"],
        [2],
        [3]
      ],
      1,
      1,
      true
      ).should.eql([
        ["a"],
        [2],
        [3]
      ])
    })

    it('should sort array containing numbers by column in descending order with sort index of 1', () => {
      lookup.SORT([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      1,
      -1,
      true
      ).should.eql([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ])

      lookup.SORT([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ],
      1,
      -1,
      true
      ).should.eql([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ])

      lookup.SORT([
        [2, 3, 1],
        [5, 6, 4],
        [8, 9, 7]
      ],
      1,
      -1,
      true
      ).should.eql([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ])

      lookup.SORT([
        [1, 2, 3],
      ],
      1,
      -1,
      true
      ).should.eql([
        [3, 2, 1],
      ])

      lookup.SORT([
        [3, 2, 1],
      ],
      1,
      -1,
      true
      ).should.eql([
        [3, 2, 1],
      ])

      lookup.SORT([
        [2, 3, 1],
      ],
      1,
      -1,
      true
      ).should.eql([
        [3, 2, 1],
      ])

      lookup.SORT([
        [1],
        [2],
        [3]
      ],
      1,
      -1,
      true
      ).should.eql([
        [1],
        [2],
        [3]
      ])

      lookup.SORT([
        [3],
        [2],
        [1]
      ],
      1,
      -1,
      true
      ).should.eql([
        [3],
        [2],
        [1]
      ])

      lookup.SORT([
        [2],
        [3],
        [1]
      ],
      1,
      -1,
      true
      ).should.eql([
        [2],
        [3],
        [1]
      ])

      lookup.SORT([
        [1],
      ],
      1,
      -1,
      true
      ).should.eql([
        [1],
      ])
    })

    it('should sort array containing strings by column in descending order with sort index of 1', () => {
      lookup.SORT([
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']
      ],
      1,
      -1,
      true
      ).should.eql([
        ['c', 'b', 'a'],
        ['f', 'e', 'd'],
        ['i', 'h', 'g']
      ])

      lookup.SORT([
        ['c', 'b', 'a'],
        ['f', 'e', 'd'],
        ['i', 'h', 'g']
      ],
      1,
      -1,
      true
      ).should.eql([
        ['c', 'b', 'a'],
        ['f', 'e', 'd'],
        ['i', 'h', 'g']
      ])

      lookup.SORT([
        ['a', 'b', 'c'],
      ],
      1,
      -1,
      true
      ).should.eql([
        ['c', 'b', 'a'],
      ])

      lookup.SORT([
        ['c', 'b', 'a'],
      ],
      1,
      -1,
      true
      ).should.eql([
        ['c', 'b', 'a'],
      ])

      lookup.SORT([
        ['b', 'c', 'a'],
      ],
      1,
      -1,
      true
      ).should.eql([
        ['c', 'b', 'a'],
      ])

      lookup.SORT([
        ['a'],
        ['b'],
        ['c']
      ],
      1,
      -1,
      true
      ).should.eql([
        ['a'],
        ['b'],
        ['c']
      ])

      lookup.SORT([
        ['c'],
        ['b'],
        ['a']
      ],
      1,
      -1,
      true
      ).should.eql([
        ['c'],
        ['b'],
        ['a']
      ])

      lookup.SORT([
        ['b'],
        ['c'],
        ['a']
      ],
      1,
      -1,
      true
      ).should.eql([
        ['b'],
        ['c'],
        ['a']
      ])

      lookup.SORT([
        ['a'],
      ],
      1,
      -1,
      true
      ).should.eql([
        ['a'],
      ])
    })

    it('should sort array containing numbers and strings by column in descending order with sort index of 1', () => {
      lookup.SORT([
        [1, 2, 3],
        ['d', 'e', 'f'],
        [7, 8, 9]
      ],
      1,
      -1,
      true
      ).should.eql([
        [3, 2, 1],
        ['f', 'e', 'd'],
        [9, 8, 7]
      ])

      lookup.SORT([
        ["a", 2, 3],
        [6, 'e', 'f'],
        [7, 8, 9]
      ],
      1,
      -1,
      true
      ).should.eql([
        ["a", 3, 2],
        [6, 'f', 'e'],
        [7, 9, 8]
      ])

      lookup.SORT([
        ["a", 2, 3],
        ["d", 5, 6],
        ["g", 8, 9]
      ],
      1,
      -1,
      true
      ).should.eql([
        ["a", 3, 2],
        ["d", 6, 5],
        ["g", 9, 8]
      ])

      lookup.SORT([
        [2, 3, "a"],
        [5, 6, "d"],
        [8, 9, "g"]
      ],
      1,
      -1,
      true
      ).should.eql([
        ["a", 3, 2],
        ["d", 6, 5],
        ["g", 9, 8]
      ])

      lookup.SORT([
        [2, 3, "a"],
      ],
      1,
      -1,
      true
      ).should.eql([
        ["a", 3, 2],
      ])

      lookup.SORT([
        ["a", 2, 3],
      ],
      1,
      -1,
      true
      ).should.eql([
        ["a", 3, 2],
      ])

      lookup.SORT([
        ["a"],
        [2],
        [3]
      ],
      1,
      -1,
      true
      ).should.eql([
        ["a"],
        [2],
        [3]
      ])
    })

    it('should sort array by column with varying sort index', () => {
      lookup.SORT([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      2,
      1,
      true
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])

      lookup.SORT([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ],
      3,
      1,
      true
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])

      lookup.SORT([
        [2, 3, 1],
        [5, 6, 4],
        [8, 9, 7]
      ],
      3,
      -1,
      true
      ).should.eql([
        [3, 2, 1],
        [6, 5, 4],
        [9, 8, 7]
      ])

      lookup.SORT([
        ["a", 2, 3],
        [6, "e", "f"],
        [7, 8, 9]
      ],
      3,
      -1,
      true
      ).should.eql([
        [3, 2, "a"],
        ["f", "e", 6],
        [9, 8, 7]
      ])

      lookup.SORT([
        ["a", 2, 3],
        ["d", 5, 6],
        ["g", 8, 9]
      ],
      2,
      1,
      true
      ).should.eql([
        [2, 3, "a"],
        [5, 6, "d"],
        [8, 9, "g"]
      ])

      lookup.SORT([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ],
      2,
      -1,
      true
      ).should.eql([
        ["c", "b", "a"],
        ["f", "e", "d"],
        ["i", "h", "g"]
      ])

      lookup.SORT([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ],
      3,
      1,
      true
      ).should.eql([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ])

      lookup.SORT([
        [1],
        [2],
        [3]
      ],
      2,
      -1,
      true
      ).should.eql([
        [1],
        [2],
        [3]
      ])

      lookup.SORT([
        [3],
        [2],
        [1]
      ],
      2,
      -1,
      true
      ).should.eql([
        [3],
        [2],
        [1]
      ])

      lookup.SORT([
        [2],
        [3],
        [1]
      ],
      3,
      -1,
      true
      ).should.eql([
        [2],
        [3],
        [1]
      ])

      lookup.SORT([
        ["a"],
        [2],
        [3]
      ],
      2,
      -1,
      true
      ).should.eql([
        ["a"],
        [2],
        [3]
      ])

      lookup.SORT([
        ["a"],
        [2],
        [3]
      ],
      3,
      1,
      true
      ).should.eql([
        ["a"],
        [2],
        [3]
      ])

      lookup.SORT([
        ["a"],
        ["b"],
        ["c"]
      ],
      2,
      -1,
      true
      ).should.eql([
        ["a"],
        ["b"],
        ["c"]
      ])

      lookup.SORT([
        ["a"],
        ["b"],
        ["c"]
      ],
      3,
      1,
      true
      ).should.eql([
        ["a"],
        ["b"],
        ["c"]
      ])
    })

    it('should sort array containing numbers by row in ascending order with sort index of 1', () => {
      lookup.SORT([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      1,
      1,
      false
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])

      lookup.SORT([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ],
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])

      lookup.SORT([
        [4, 5, 6],
        [7, 8, 9],
        [1, 2, 3]
      ],
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ])

      lookup.SORT([
        [1, 2, 3],
      ],
      ).should.eql([
        [1, 2, 3],
      ])

      lookup.SORT([
        [3, 2, 1],
      ],
      1,
      1,
      ).should.eql([
        [3, 2, 1],
      ])

      lookup.SORT([
        [2, 3, 1],
      ],
      1,
      ).should.eql([
        [2, 3, 1],
      ])

      lookup.SORT([
        [1],
        [2],
        [3]
      ],
      1,
      1,
      false
      ).should.eql([
        [1],
        [2],
        [3]
      ])

      lookup.SORT([
        [3],
        [2],
        [1]
      ],
      ).should.eql([
        [1],
        [2],
        [3]
      ])

      lookup.SORT([
        [2],
        [3],
        [1]
      ],
      1,
      ).should.eql([
        [1],
        [2],
        [3]
      ])

      lookup.SORT([
        [1],
      ],
      1,
      1,
      false
      ).should.eql([
        [1],
      ])
    })

    it('should sort array containing strings by row in ascending order with sort index of 1', () => {
      lookup.SORT([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ],
      1,
      1,
      false
      ).should.eql([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ])

      lookup.SORT([
        ["g", "h", "i"],
        ["d", "e", "f"],
        ["a", "b", "c"]
      ],
      ).should.eql([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ])

      lookup.SORT([
        ["d", "e", "f"],
        ["g", "h", "i"],
        ["a", "b", "c"]
      ],
      ).should.eql([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ])

      lookup.SORT([
        ["a", "b", "c"],
      ],
      ).should.eql([
        ["a", "b", "c"],
      ])

      lookup.SORT([
        ["c", "b", "a"],
      ],
      1,
      1,
      ).should.eql([
        ["c", "b", "a"],
      ])

      lookup.SORT([
        ["b", "c", "a"],
      ],
      1,
      ).should.eql([
        ["b", "c", "a"],
      ])

      lookup.SORT([
        ["a"],
        ["b"],
        ["c"]
      ],
      1,
      1,
      false
      ).should.eql([
        ["a"],
        ["b"],
        ["c"]
      ])

      lookup.SORT([
        ["c"],
        ["b"],
        ["a"]
      ],
      ).should.eql([
        ["a"],
        ["b"],
        ["c"]
      ])

      lookup.SORT([
        ["b"],
        ["c"],
        ["a"]
      ],
      1,
      ).should.eql([
        ["a"],
        ["b"],
        ["c"]
      ])

      lookup.SORT([
        ["a"],
      ],
      1,
      1,
      false
      ).should.eql([
        ["a"],
      ])
    })

    it('should sort array containing numbers and strings by row in ascending order with sort index of 1', () => {
      lookup.SORT([
        [1, 2, 3],
        ["a", "b", "c"],
        [4, 5, 6],
      ],
      1,
      1,
      false
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        ["a", "b", "c"],
      ])

      lookup.SORT([
        ["a", "b", "c"],
        [4, 5, 6],
        [1, 2, 3],
      ],
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        ["a", "b", "c"],
      ])

      lookup.SORT([
        [4, 5, 6],
        ["a", "b", "c"],
        [1, 2, 3],
      ],
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
        ["a", "b", "c"],
      ])

      lookup.SORT([
        [1, "a", 2],
      ],
      ).should.eql([
        [1, "a", 2],
      ])

      lookup.SORT([
        [2, "a", 1],
      ],
      1,
      1,
      ).should.eql([
        [2, "a", 1],
      ])

      lookup.SORT([
        ["a", 2, 1],
      ],
      1,
      ).should.eql([
        ["a", 2, 1],
      ])

      lookup.SORT([
        [1, "a"],
        [2, "b"],
        [3, "c"]
      ],
      1,
      1,
      false
      ).should.eql([
        [1, "a"],
        [2, "b"],
        [3, "c"]
      ])

      lookup.SORT([
        ["a"],
        ["b"],
        [1]
      ],
      ).should.eql([
        [1],
        ["a"],
        ["b"]
      ])

      lookup.SORT([
        [2],
        ["b"],
        ["a"]
      ],
      1,
      ).should.eql([
        [2],
        ["a"],
        ["b"]
      ])
    })

    it('should sort array containing numbers by row in descending order with sort index of 1', () => {
      lookup.SORT([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      1,
      -1,
      false,
      ).should.eql([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ])

      lookup.SORT([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ],
      1,
      -1,
      ).should.eql([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ])

      lookup.SORT([
        [4, 5, 6],
        [7, 8, 9],
        [1, 2, 3]
      ],
      1,
      -1,
      false
      ).should.eql([
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3]
      ])

      lookup.SORT([
        [1, 2, 3],
      ],
      1,
      -1,
      ).should.eql([
        [1, 2, 3],
      ])

      lookup.SORT([
        [3, 2, 1],
      ],
      1,
      -1,
      ).should.eql([
        [3, 2, 1],
      ])

      lookup.SORT([
        [2, 3, 1],
      ],
      1,
      -1,
      ).should.eql([
        [2, 3, 1],
      ])

      lookup.SORT([
        [1],
        [2],
        [3]
      ],
      1,
      -1,
      false
      ).should.eql([
        [3],
        [2],
        [1]
      ])

      lookup.SORT([
        [3],
        [2],
        [1]
      ],
      1,
      -1,
      ).should.eql([
        [3],
        [2],
        [1]
      ])

      lookup.SORT([
        [2],
        [3],
        [1]
      ],
      1,
      -1,
      ).should.eql([
        [3],
        [2],
        [1]
      ])

      lookup.SORT([
        [1],
      ],
      1,
      -1,
      ).should.eql([
        [1],
      ])
    })

    it('should sort array containing strings by row in descending order with sort index of 1', () => {
      lookup.SORT([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ],
      1,
      -1,
      false,
      ).should.eql([
        ["g", "h", "i"],
        ["d", "e", "f"],
        ["a", "b", "c"]
      ])

      lookup.SORT([
        ["g", "h", "i"],
        ["d", "e", "f"],
        ["a", "b", "c"]
      ],
      1,
      -1,
      ).should.eql([
        ["g", "h", "i"],
        ["d", "e", "f"],
        ["a", "b", "c"]
      ])

      lookup.SORT([
        ["d", "e", "f"],
        ["g", "h", "i"],
        ["a", "b", "c"]
      ],
      1,
      -1,
      false
      ).should.eql([
        ["g", "h", "i"],
        ["d", "e", "f"],
        ["a", "b", "c"]
      ])

      lookup.SORT([
        ["a", "b", "c"],
      ],
      1,
      -1,
      ).should.eql([
        ["a", "b", "c"],
      ])

      lookup.SORT([
        ["c", "b", "a"],
      ],
      1,
      -1,
      ).should.eql([
        ["c", "b", "a"],
      ])

      lookup.SORT([
        ["b", "c", "a"],
      ],
      1,
      -1,
      ).should.eql([
        ["b", "c", "a"],
      ])

      lookup.SORT([
        ["a"],
        ["b"],
        ["c"]
      ],
      1,
      -1,
      false
      ).should.eql([
        ["c"],
        ["b"],
        ["a"]
      ])

      lookup.SORT([
        ["c"],
        ["b"],
        ["a"]
      ],
      1,
      -1,
      ).should.eql([
        ["c"],
        ["b"],
        ["a"]
      ])

      lookup.SORT([
        ["b"],
        ["c"],
        ["a"]
      ],
      1,
      -1,
      ).should.eql([
        ["c"],
        ["b"],
        ["a"]
      ])

      lookup.SORT([
        ["a"],
      ],
      1,
      -1,
      ).should.eql([
        ["a"],
      ])
    })

    it('should sort array containing numbers and strings by row in descending order with sort index of 1', () => {
      lookup.SORT([
        [1, "a", 3],
        [4, "b", 6],
        [7, "c", 9]
      ],
      1,
      -1,
      false,
      ).should.eql([
        [7, "c", 9],
        [4, "b", 6],
        [1, "a", 3]
      ])

      lookup.SORT([
        [7, "c", 9],
        [4, "b", 6],
        [1, "a", 3]
      ],
      1,
      -1,
      ).should.eql([
        [7, "c", 9],
        [4, "b", 6],
        [1, "a", 3]
      ])

      lookup.SORT([
        [4, "b", 6],
        [7, "c", 9],
        [1, "a", 3]
      ],
      1,
      -1,
      false
      ).should.eql([
        [7, "c", 9],
        [4, "b", 6],
        [1, "a", 3]
      ])

      lookup.SORT([
        ["a", 1, "c"],
        ["a", "b", "c"],
        [1, 2, 3]
      ],
      1,
      -1,
      false
      ).should.eql([
        ["a", 1, "c"],
        ["a", "b", "c"],
        [1, 2, 3]
      ])

      lookup.SORT([
        [1, 2, 3],
        ["a", 1, "c"],
        ["a", "b", "c"]
      ],
      1,
      -1,
      false
      ).should.eql([
        ["a", 1, "c"],
        ["a", "b", "c"],
        [1, 2, 3]
      ])

      lookup.SORT([
        ["a", "b", 1],
      ],
      1,
      -1,
      ).should.eql([
        ["a", "b", 1],
      ])

      lookup.SORT([
        [1, "b", "a"],
      ],
      1,
      -1,
      ).should.eql([
        [1, "b", "a"],
      ])

      lookup.SORT([
        ["b", 1, "a"],
      ],
      1,
      -1,
      ).should.eql([
        ["b", 1, "a"],
      ])

      lookup.SORT([
        ["a"],
        ["b"],
        [1]
      ],
      1,
      -1,
      false
      ).should.eql([
        ["b"],
        ["a"],
        [1]
      ])

      lookup.SORT([
        [1],
        ["b"],
        ["a"]
      ],
      1,
      -1,
      ).should.eql([
        ["b"],
        ["a"],
        [1]
      ])

      lookup.SORT([
        ["b"],
      ],
      1,
      -1,
      ).should.eql([
        ["b"],
      ])
    })

    it('should sort array by row with varying sort index', () => {
      lookup.SORT([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ],
      2,
      1,
      ).should.eql([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ])

      lookup.SORT([
        ["g", "h", "i"],
        ["d", "e", "f"],
        ["a", "b", "c"]
      ],
      3,
      1,
      ).should.eql([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ])

      lookup.SORT([
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["g", "h", "i"]
      ],
      3,
      -1,
      ).should.eql([
        ["g", "h", "i"],
        ["d", "e", "f"],
        ["a", "b", "c"]
      ])

      lookup.SORT([
        [1, "a", 3],
        [4, "b", 6],
        [7, "c", 9]
      ],
      2,
      1,
      ).should.eql([
        [1, "a", 3],
        [4, "b", 6],
        [7, "c", 9]
      ])

      lookup.SORT([
        [7, "c", 9],
        [4, 6, "b"],
        [1, "a", 3]
      ],
      3,
      -1,
      ).should.eql([
        [4, 6, "b"],
        [7, "c", 9],
        [1, "a", 3]
      ])

      lookup.SORT([
        [1, 2, 3],
        [4, 5, 6],
      ],
      3,
      -1,
      ).should.eql([
        [4, 5, 6],
        [1, 2, 3],
      ])

      lookup.SORT([
        [1, 2, 3],
      ],
      2,
      -1,
      ).should.eql([
        [1, 2, 3],
      ])

      lookup.SORT([
        [1, 2, 3],
        [4, 5, 6],
      ],
      2,
      1,
      ).should.eql([
        [1, 2, 3],
        [4, 5, 6],
      ])

      lookup.SORT([
        [1, 2, 3],
      ],
      3,
      1,
      ).should.eql([
        [1, 2, 3],
      ])
    })

    it('should sort array containing empty cells', () => {
      lookup.SORT([
        ["a", "b", "c"],
        ["d", "", "f"],
        ["", "", ""]
      ],
      1,
      -1,
      ).should.eql([
        ["d", 0, "f"],
        ["a", "b", "c"],
        [0, 0, 0]
      ])

      lookup.SORT([
        ["a", "b", "c"],
        ["d", "", "f"],
        ["", "", ""]
      ],
      1,
      1,
      true
      ).should.eql([
        ["a", "b", "c"],
        ["d", 0, "f"],
        [0, 0, 0]
      ])

      lookup.SORT([
        [""],
        ["a"],
        ["b"],
        [1]
      ],
      1,
      -1,
      false
      ).should.eql([
        ["b"],
        ["a"],
        [1],
        [0]
      ])

      lookup.SORT([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      1,
      -1,
      false
      ).should.eql([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ])

      lookup.SORT([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      3,
      1,
      true
      ).should.eql([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ])
    })

    it('should return error with invalid inputs', () => {
      lookup.SORT([
        [1, 2, 3],
      ],
      2,
      1,
      true
      ).should.eql([
        [error.value, "", ""],
      ])

      lookup.SORT([
        [1, 2, 3],
      ],
      0,
      1,
      true
      ).should.eql([
        [error.value, "", ""],
      ])

      lookup.SORT([
        [1, 2, 3],
        [],
        [4, 5, 6],
      ],
      ).should.eql(error.na)

      lookup.SORT([
        [1, 2, 3],
        ["a"],
      ],
      1,
      1,
      true
      ).should.eql(error.na)

      lookup.SORT([
        [1, 2, 3],
        ["a", "b", "c"],
      ],
      1,
      100,
      true
      ).should.eql([
        [error.value, "", ""],
        ["", "", ""],
      ])

      lookup.SORT([
        [1, 2, 3],
        ["a", "b", "c"],
      ],
      1,
      1,
      "FALSEEE"
      ).should.eql([
        [error.value, "", ""],
        ["", "", ""],
      ])
    })
  })
})
