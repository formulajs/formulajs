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

  it('XMATCH', () => {
    // invalid inputs
    lookup.XMATCH().should.equal(error.na)
    lookup.XMATCH(1).should.equal(error.na)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7], -2).should.equal(error.na)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7], 1, 0).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7]).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 0).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 0, 1).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 0, -1).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 7, 100], 0, 2).should.equal(error.na)
    lookup.XMATCH(5, [100, 7, 4, 3, 2, 1, 0], 0, -2).should.equal(error.na)

    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 2).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], -2).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 2, 1).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], -2, 1).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 2, -1).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], -2, -1).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 7, 100], 2, 2).should.equal(error.na)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 7, 100], -2, 2).should.equal(error.na)
    lookup.XMATCH(5, [100, 7, 4, 3, 2, 1, 0], 2, -2).should.equal(error.na)
    lookup.XMATCH(5, [100, 7, 4, 3, 2, 1, 0], -2, -2).should.equal(error.na)

    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie']).should.equal(error.na)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 0, 1).should.equal(error.na)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 0, -1).should.equal(error.na)
    lookup.XMATCH('j*b', ['bernie', 'jima', 'jimb', 'jimc'], 0, 2).should.equal(error.na)
    lookup.XMATCH('j*b', ['jimc', 'jimb', 'jima', 'bernie'], 0, -2).should.equal(error.na)

    lookup.XMATCH('j?b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('j?b', ['jima', 'jimb', 'jimc', 'bernie'], 0, 1).should.equal(error.na)
    lookup.XMATCH('j?b', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(error.na)
    lookup.XMATCH('j?b', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(error.na)
    lookup.XMATCH('j???b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('j???b', ['jima', 'jimb', 'jimc', 'bernie'], 0, 1).should.equal(error.na)
    lookup.XMATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 0, 1).should.equal(error.na)
    lookup.XMATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)

    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], 2).should.equal(error.na)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie']).should.equal(error.na)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], 2, 1).should.equal(error.na)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], 2, -1).should.equal(error.na)
    lookup.XMATCH('jimc', ['bernie', 'jima', 'jimb', 'jimd'], 2, 2).should.equal(error.na)
    lookup.XMATCH('jimc', ['jimd', 'jimb', 'jima', 'bernie'], 2, -2).should.equal(error.na)

    lookup.XMATCH('*mc', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(error.na)
    lookup.XMATCH('*er*', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('jima~.', ['jima.', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('j~$ma', ['j$ma', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('j~$ma', ['j$ma', 'jimb', 'jimc', 'bernie'], 1).should.equal(error.na)
    lookup.XMATCH('*?c', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('*?c', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(error.na)

    // valid inputs
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7]).should.equal(2)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7], 0).should.equal(2)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7], 1).should.equal(2)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7], -1).should.equal(2)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7], 2).should.equal(2)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7], 2, 1).should.equal(2)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 100, 7], 2, -1).should.equal(2)
    lookup.XMATCH(1, [0, 1, 2, 3, 4, 7, 100], 2, 2).should.equal(2)
    lookup.XMATCH(1, [100, 7, 4, 3, 2, 1, 0], 2, -2).should.equal(6)

    lookup.XMATCH(1, [[0], [1], [2], [3], [4]]).should.equal(2)
    lookup.XMATCH(1, [[0], [1], [2], [3], [4]], 0).should.equal(2)
    lookup.XMATCH(1, [[0], [1], [2], [3], [4]], 1).should.equal(2)
    lookup.XMATCH(1, [[0], [1], [2], [3], [4]], -1).should.equal(2)
    lookup.XMATCH(1, [[0], [1], [2], [3], [4]], 2).should.equal(2)
    lookup.XMATCH(1, [[0], [1], [2], [3], [4]], 2, 1).should.equal(2)
    lookup.XMATCH(1, [[0], [1], [2], [3], [4]], 2, -1).should.equal(2)
    lookup.XMATCH(1, [[0], [1], [2], [3], [4]], 2, 2).should.equal(2)
    lookup.XMATCH(1, [[4], [3], [2], [1], [0]], 2, -2).should.equal(4)

    lookup.XMATCH(4, [0, 1, 2, 3, 4, 100, 7]).should.equal(5)
    lookup.XMATCH(4, [0, 1, 2, 3, 4, 100, 7], 0).should.equal(5)
    lookup.XMATCH(4, [0, 1, 2, 3, 4, 100, 7], 1).should.equal(5)
    lookup.XMATCH(4, [0, 1, 2, 3, 4, 100, 7], -1).should.equal(5)
    lookup.XMATCH(4, [0, 1, 2, 3, 4, 100, 7], 2).should.equal(5)
    lookup.XMATCH(4, [0, 1, 2, 3, 4, 100, 7], 2, 1).should.equal(5)
    lookup.XMATCH(4, [0, 1, 2, 3, 4, 100, 7], 2, -1).should.equal(5)
    lookup.XMATCH(4, [0, 1, 2, 3, 4, 7, 100], 2, 2).should.equal(5)
    lookup.XMATCH(4, [100, 7, 4, 3, 2, 1, 0], 2, -2).should.equal(3)
    lookup.XMATCH(4, [0, 1, 2, 3, 4, 7, 100, 110], 2, 2).should.equal(5)
    lookup.XMATCH(4, [110, 100, 7, 4, 3, 2, 1, 0], 2, -2).should.equal(4)

    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 1).should.equal(7)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], -1).should.equal(5)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 1, 1).should.equal(7)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], -1, 1).should.equal(5)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], 1, -1).should.equal(7)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 100, 7], -1, -1).should.equal(5)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 7, 100], 1, 2).should.equal(6)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 7, 100], -1, 2).should.equal(5)
    lookup.XMATCH(5, [100, 7, 4, 3, 2, 1, 0], 1, -2).should.equal(2)
    lookup.XMATCH(5, [100, 7, 4, 3, 2, 1, 0], -1, -2).should.equal(3)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 7, 100, 110], 1, 2).should.equal(6)
    lookup.XMATCH(5, [0, 1, 2, 3, 4, 7, 100, 110], -1, 2).should.equal(5)
    lookup.XMATCH(5, [110, 100, 7, 4, 3, 2, 1, 0], 1, -2).should.equal(3)
    lookup.XMATCH(5, [110, 100, 7, 4, 3, 2, 1, 0], -1, -2).should.equal(4)

    lookup.XMATCH('jima', ['jima', 'jimb', 'jimc', 'bernie']).should.equal(1)
    lookup.XMATCH('jima', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(1)
    lookup.XMATCH('jima', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(1)
    lookup.XMATCH('jima', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(1)
    lookup.XMATCH('jima', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(1)
    lookup.XMATCH('jima', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(1)
    lookup.XMATCH('jima', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(1)
    lookup.XMATCH('jima', ['bernie', 'jima', 'jimb', 'jimc'], 2, 2).should.equal(2)
    lookup.XMATCH('jima', ['jimc', 'jimb', 'jima', 'bernie'], 2, -2).should.equal(3)

    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(1)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(4)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 1, 1).should.equal(1)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], -1, 1).should.equal(4)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 1, -1).should.equal(1)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], -1, -1).should.equal(4)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(2)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(2)
    lookup.XMATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(2)
    lookup.XMATCH('j*b', ['bernie', 'jimb', 'jimc'], 2, 2).should.equal(2)
    lookup.XMATCH('j*b', ['jimc', 'jimb', 'jima', 'bernie'], 2, -2).should.equal(2)

    lookup.XMATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(1)
    lookup.XMATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(4)
    lookup.XMATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(2)
    lookup.XMATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(2)
    lookup.XMATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(2)
    lookup.XMATCH('j??b', ['bernie', 'jimb', 'jimc'], 2, 2).should.equal(2)
    lookup.XMATCH('j??b', ['jimc', 'jimb', 'jima', 'bernie'], 2, -2).should.equal(2)

    lookup.XMATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(1)
    lookup.XMATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(4)
    lookup.XMATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(1)
    lookup.XMATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(1)
    lookup.XMATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(3)
    lookup.XMATCH('j???', ['bernie', 'jima', 'jimb', 'jimc'], 2, 2).should.equal(2)
    lookup.XMATCH('j???', ['jimc', 'jimb', 'jima', 'bernie'], 2, -2).should.equal(2)

    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(3)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(3)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(3)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(3)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(3)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(3)
    lookup.XMATCH('jimc', ['bernie', 'jima', 'jimb', 'jimc'], 2, 2).should.equal(4)
    lookup.XMATCH('jimc', ['jimc', 'jimb', 'jima', 'bernie'], 2, -2).should.equal(1)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], -1).should.equal(2)
    lookup.XMATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], 1).should.equal(3)

    lookup.XMATCH('ji**', ['jima', 'jimb', 'jimc', 'bernie'], 0).should.equal(error.na)
    lookup.XMATCH('ji**', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(1)
    lookup.XMATCH('ji**', ['jima', 'jimb', 'jimc', 'bernie'], -1).should.equal(4)
    lookup.XMATCH('ji**', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(1)
    lookup.XMATCH('ji**', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(1)
    lookup.XMATCH('ji**', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(3)
    lookup.XMATCH('ji**', ['bernie', 'jima', 'jimb', 'jimc'], 2, 2).should.equal(2)
    lookup.XMATCH('ji**', ['jimc', 'jimb', 'jima', 'bernie'], 2, -2).should.equal(2)

    lookup.XMATCH('*mc', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(4)
    lookup.XMATCH('*mc', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(3)
    lookup.XMATCH('*mc', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(3)
    lookup.XMATCH('*mc', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(3)

    lookup.XMATCH('*er*', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(4)
    lookup.XMATCH('*er*', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(4)
    lookup.XMATCH('*er*', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(4)
    lookup.XMATCH('*er*', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(4)
    lookup.XMATCH('*er*', ['bernie', 'jima', 'jimb', 'jimc'], 2, 2).should.equal(1)
    lookup.XMATCH('*er*', ['jimc', 'jimb', 'jima', 'bernie'], 2, -2).should.equal(4)

    lookup.XMATCH('jima~.', ['jima.', 'jimb', 'jimc', 'bernie'], 1).should.equal(2)
    lookup.XMATCH('jima~.', ['jima.', 'jimb', 'jimc', 'bernie'], -1).should.equal(1)
    lookup.XMATCH('jima~.', ['jima.', 'jimb', 'jimc', 'bernie'], 2).should.equal(1)
    lookup.XMATCH('jima~.', ['jima.', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(1)
    lookup.XMATCH('jima~.', ['jima.', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(1)
    lookup.XMATCH('jima~.', ['bernie', 'jima.', 'jimb', 'jimc'], 2, 2).should.equal(2)
    lookup.XMATCH('jima~.', ['jimc', 'jimb', 'jima.', 'bernie'], 2, -2).should.equal(3)

    lookup.XMATCH('j~$ma', ['j$ma', 'jimb', 'jimc', 'bernie'], -1).should.equal(3)
    lookup.XMATCH('j~$ma', ['j$ma', 'jimb', 'jimc', 'bernie'], 2).should.equal(1)
    lookup.XMATCH('j~$ma', ['j$ma', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(1)
    lookup.XMATCH('j~$ma', ['j$ma', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(1)
    lookup.XMATCH('j~$ma', ['bernie', 'j$ma', 'jimb', 'jimc'], 2, 2).should.equal(2)

    lookup.XMATCH('*?c', ['jima', 'jimb', 'jimc', 'bernie'], 1).should.equal(4)
    lookup.XMATCH('*?c', ['jima', 'jimb', 'jimc', 'bernie'], 2).should.equal(3)
    lookup.XMATCH('*?c', ['jima', 'jimb', 'jimc', 'bernie'], 2, 1).should.equal(3)
    lookup.XMATCH('*?c', ['jima', 'jimb', 'jimc', 'bernie'], 2, -1).should.equal(3)

    lookup.XMATCH('selected', ['not_selected', 'not_selected', 'selected', 'not_selected'], 0).should.equal(3)
    lookup.XMATCH('selected', ['not_selected', 'not_selected', 'selected', 'not_selected'], 1).should.equal(3)
    lookup.XMATCH('selected', ['not_selected', 'not_selected', 'selected', 'not_selected'], -1).should.equal(3)
    lookup.XMATCH('selected', ['not_selected', 'not_selected', 'selected', 'not_selected'], 2).should.equal(3)
    lookup.XMATCH('selected', ['not_selected', 'not_selected', 'selected', 'not_selected'], 2, 1).should.equal(3)
    lookup.XMATCH('selected', ['not_selected', 'not_selected', 'selected', 'not_selected'], 2, -1).should.equal(3)
    lookup.XMATCH('selected', ['not_selected', 'not_selected', 'not_selected', 'selected'], 2, 2).should.equal(4)
    lookup.XMATCH('selected', ['selected', 'not_selected', 'not_selected', 'not_selected'], 2, -2).should.equal(1)
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

  describe('FILTER', () => {
    it('should return 3 dimensional filtered array', () => {
      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[true], [false], [true]]
        )
        .should.eql([
          [1, 2, 3],
          [7, 8, 9],
          ["", "", ""]
        ])

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[true], [true], [true]]
        )
        .should.eql([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ])

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[false], [false], [false]]
        )
        .should.eql([[error.calc, "", ""], ["", "", ""], ["", "", ""]])

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[true, false, true]]
        )
        .should.eql([
          [1, 3, ""],
          [4, 6, ""],
          [7, 9, ""]
        ])

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[true, true, true]]
        )
        .should.eql([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ])

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[false, false, false]]
        )
        .should.eql([[error.calc, "", ""], ["", "", ""], ["", "", ""]])

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[false, false, false]],
          'No data'
        )
        .should.eql([
          ["No data", "", ""],
          ["", "", ""],
          ["", "", ""]
        ])

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[false, false, false]],
          ''
        )
        .should.eql([
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
        ])

      lookup.FILTER([[1], [2], [3]], [[true], [false], [true]]).should.eql([[1], [3], [""]])

      lookup.FILTER([[1], [2], [3]], [[true], [true], [true]]).should.eql([[1], [2], [3]])

      lookup.FILTER([[1], [2], [3]], [[false], [false], [false]]).should.eql([[error.calc], [""], [""]])

      lookup.FILTER([[1], [2], [3]], [[true]]).should.eql([[1], [2], [3]])

      lookup.FILTER([[1], [2], [3]], [[false]]).should.eql([[error.calc], [""], [""]])
    })

    it('should return 2 dimensional filtered array', () => {
      lookup.FILTER([[1, 2, 3]], [[true]]).should.eql([[1, 2, 3]])

      lookup.FILTER([[1, 2, 3]], [[false]]).should.eql([[error.calc, "", ""]])

      lookup.FILTER([[1, 2, 3]], [[true, true, true]]).should.eql([[1, 2, 3]])

      lookup.FILTER([[1, 2, 3]], [[false, false, false]]).should.eql([[error.calc, "", ""]])

      lookup.FILTER([[1, 2, 3]], [[true, false, true]]).should.eql([[1, 3, ""]])

      lookup.FILTER([[1, 2, 3]], [[false, false, false]], 'No data').should.eql([['No data', "", ""]])

      lookup.FILTER([[1, 2, 3]], [[false, false, false]], '').should.eql([["", "", ""]])

      lookup.FILTER([[1]], [[true]]).should.eql([[1]])

      lookup.FILTER([[1]], [[false]]).should.eql([[error.calc]])

      lookup.FILTER([[1]], [[false, false, false]], 'No data').should.eql([['No data']])

      lookup.FILTER([[1]], [[false, false, false]], '').should.eql([[""]])
    })

    it('should return error if filter array has invalid size', () => {
      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [
            [true, false, true],
            [true, false, true]
          ]
        )
        .should.equal(error.na)

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [
            [true, false],
            [true, false],
            [true, false]
          ]
        )
        .should.equal(error.na)

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [
            [true, false, true],
            [true, false]
          ]
        )
        .should.equal(error.na)

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[], [], []]
        )
        .should.equal(error.na)

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[]]
        )
        .should.equal(error.na)

      lookup.FILTER([[1], [2], [3]], [[true, false, true]]).should.equal(error.na)

      lookup.FILTER([[1], [2], [3]], [[true], [false]]).should.equal(error.na)
    })

    it('should return error if inputs are invalid', () => {
      lookup.FILTER('foo', [[true]]).should.equal(error.na)
      lookup.FILTER(1, [[true]]).should.equal(error.na)
      lookup.FILTER(true, [[true]]).should.equal(error.na)
      lookup.FILTER(null, [[true]]).should.equal(error.na)
      lookup.FILTER(undefined, [[true]]).should.equal(error.na)
      lookup.FILTER([[]], [[true]]).should.equal(error.na)
      lookup.FILTER([[]], [[true]]).should.equal(error.na)
      lookup.FILTER([[1]], 'foo').should.equal(error.na)
      lookup.FILTER([[1]], 1).should.equal(error.na)
      lookup.FILTER([[1]], true).should.equal(error.na)
      lookup.FILTER([[1]], null).should.equal(error.na)
      lookup.FILTER([[1]], undefined).should.equal(error.na)
      lookup.FILTER([[1]], [[]]).should.equal(error.na)
      lookup.FILTER([[1], [1, 2]], [[true]]).should.equal(error.na)
      lookup
        .FILTER(
          [
            [1, 2],
            [1, 2],
            [1, 2, 3]
          ],
          [
            [true, true, true],
            [true, true, true]
          ]
        )
        .should.eql(error.na)
    })

    it('should return error if filter array contains invalid non-boolean values', () => {
      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[true, false, 'a']]
        )
        .should.eql([
          [error.value, "", ""],
          ["", "", ""],
          ["", "", ""]
        ])

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[true, 'falsee', 'truee']]
        )
        .should.eql([
          [error.value, "", ""],
          ["", "", ""],
          ["", "", ""]
        ])

      lookup.FILTER([[1, 2, 3]], [[true, false, 'TRUEE']]).should.eql([[error.value, "", ""]])

      lookup.FILTER([[1, 2, 3]], [[true, '', false]]).should.eql([[error.value, "", ""]])
    })

    it('should return filtered array if filter array contains valid non-boolean values', () => {
      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[true, 1, 0]]
        )
        .should.eql([
          [1, 2, ""],
          [4, 5, ""],
          [7, 8, ""]
        ])

      lookup.FILTER([[1, 2, 3]], [[1, 1, 1]]).should.eql([[1, 2, 3]])

      lookup.FILTER([[1, 2, 3]], [[true, 0, false]]).should.eql([[1, "", ""]])

      lookup.FILTER([[1, 2, 3]], [[true, 0, 'TRUE']]).should.eql([[1, 3, ""]])

      lookup.FILTER([[1, 2, 3]], [['TRUE', 0, 'FALSE']]).should.eql([[1, "", ""]])
    })

    it('should return error if arrays are empty', () => {
      lookup.FILTER([], []).should.equal(error.na)

      lookup
        .FILTER(
          [],
          [
            [true, false, true],
            [true, false, true],
            [true, false, true]
          ]
        )
        .should.equal(error.na)

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          []
        )
        .should.equal(error.na)

      lookup
        .FILTER(
          [[], [], []],
          [
            [true, false, true],
            [true, false, true],
            [true, false, true]
          ]
        )
        .should.equal(error.na)

      lookup
        .FILTER(
          [[], [1, 2, 3], []],
          [
            [true, false, true],
            [true, false, true]
          ]
        )
        .should.equal(error.na)

      lookup
        .FILTER(
          [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ],
          [[], [], [true]]
        )
        .should.equal(error.na)

      lookup.FILTER().should.equal(error.na)

      lookup.FILTER([[1, 2, 3]]).should.equal(error.na)
    })
  })
});
