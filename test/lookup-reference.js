import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as lookup from '../src/lookup-reference.js'

describe('Lookup Reference', () => {
  it('CHOOSE', () => {
    expect(lookup.CHOOSE()).to.equal(error.na)
    expect(lookup.CHOOSE(1)).to.equal(error.na)
    expect(lookup.CHOOSE(1, 'jima')).to.equal('jima')
    expect(lookup.CHOOSE(3, 'jima', 'jimb', 'jimc')).to.equal('jimc')
    expect(lookup.CHOOSE(2, 'jima')).to.equal(error.value)
    expect(lookup.CHOOSE(255, 'jima')).to.equal(error.value)
  })

  describe('CHOOSECOLS', () => {
    describe('args: (array, col_num1, ...col_nums)', () => {
      describe('Should select column(s) from array by index(es) (1-based)', () => {
        it('single col_num provided', () => {
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
                ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
                ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12']
              ],
              2
            )
          ).to.eql([['ITEM_2'], ['ITEM_6'], ['ITEM_10']])
        })
        it('many col_nums provided => selection should follow col_nums provided order', () => {
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
                ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
                ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12']
              ],
              2,
              4,
              1
            )
          ).to.eql([
            ['ITEM_2', 'ITEM_4', 'ITEM_1'],
            ['ITEM_6', 'ITEM_8', 'ITEM_5'],
            ['ITEM_10', 'ITEM_12', 'ITEM_9']
          ])
        })
        it('many col_nums provided at least twice', () => {
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4', 'ITEM_5'],
                ['ITEM_6', 'ITEM_7', 'ITEM_8', 'ITEM_9', 'ITEM_10'],
                ['ITEM_11', 'ITEM_12', 'ITEM_13', 'ITEM_14', 'ITEM_15'],
                ['ITEM_16', 'ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
              ],
              3,
              5,
              2,
              5,
              3
            )
          ).to.eql([
            ['ITEM_3', 'ITEM_5', 'ITEM_2', 'ITEM_5', 'ITEM_3'],
            ['ITEM_8', 'ITEM_10', 'ITEM_7', 'ITEM_10', 'ITEM_8'],
            ['ITEM_13', 'ITEM_15', 'ITEM_12', 'ITEM_15', 'ITEM_13'],
            ['ITEM_18', 'ITEM_20', 'ITEM_17', 'ITEM_20', 'ITEM_18']
          ])
        })
        it('for column with empty cell => values will be replaced by 0', () => {
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4', 'ITEM_5'],
                ['ITEM_6', 'ITEM_7', undefined, 'ITEM_9', 'ITEM_10'],
                ['ITEM_11', undefined, 'ITEM_13', 'ITEM_14', null],
                [null, 'ITEM_17', 'ITEM_18', null, 'ITEM_20']
              ],
              4,
              1,
              2,
              5
            )
          ).to.eql([
            ['ITEM_4', 'ITEM_1', 'ITEM_2', 'ITEM_5'],
            ['ITEM_9', 'ITEM_6', 'ITEM_7', 'ITEM_10'],
            ['ITEM_14', 'ITEM_11', 0, 0],
            [0, 0, 'ITEM_17', 'ITEM_20']
          ])
        })
        it('can provide col_num(s) as array', () => {
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4', 'ITEM_5'],
                ['ITEM_6', 'ITEM_7', 'ITEM_8', 'ITEM_9', 'ITEM_10'],
                ['ITEM_11', 'ITEM_12', 'ITEM_13', 'ITEM_14', 'ITEM_15'],
                ['ITEM_16', 'ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
              ],
              [2]
            )
          ).to.eql([['ITEM_2'], ['ITEM_7'], ['ITEM_12'], ['ITEM_17']])
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4', 'ITEM_5'],
                ['ITEM_6', 'ITEM_7', 'ITEM_8', 'ITEM_9', 'ITEM_10'],
                ['ITEM_11', 'ITEM_12', 'ITEM_13', 'ITEM_14', 'ITEM_15'],
                ['ITEM_16', 'ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
              ],
              3,
              [2, 5],
              [3, 4, 1]
            )
          ).to.eql([
            ['ITEM_3', 'ITEM_2', 'ITEM_5', 'ITEM_3', 'ITEM_4', 'ITEM_1'],
            ['ITEM_8', 'ITEM_7', 'ITEM_10', 'ITEM_8', 'ITEM_9', 'ITEM_6'],
            ['ITEM_13', 'ITEM_12', 'ITEM_15', 'ITEM_13', 'ITEM_14', 'ITEM_11'],
            ['ITEM_18', 'ITEM_17', 'ITEM_20', 'ITEM_18', 'ITEM_19', 'ITEM_16']
          ])
        })
        it('when negative col_num(s) provided => select back from the end of array column', () => {
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4', 'ITEM_5'],
                ['ITEM_6', 'ITEM_7', 'ITEM_8', 'ITEM_9', 'ITEM_10'],
                ['ITEM_11', 'ITEM_12', 'ITEM_13', 'ITEM_14', 'ITEM_15'],
                ['ITEM_16', 'ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
              ],
              -2
            )
          ).to.eql([['ITEM_4'], ['ITEM_9'], ['ITEM_14'], ['ITEM_19']])
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4', 'ITEM_5'],
                ['ITEM_6', 'ITEM_7', 'ITEM_8', 'ITEM_9', 'ITEM_10'],
                ['ITEM_11', 'ITEM_12', 'ITEM_13', 'ITEM_14', 'ITEM_15'],
                ['ITEM_16', 'ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
              ],
              -2,
              4
            )
          ).to.eql([
            ['ITEM_4', 'ITEM_4'],
            ['ITEM_9', 'ITEM_9'],
            ['ITEM_14', 'ITEM_14'],
            ['ITEM_19', 'ITEM_19']
          ])
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', undefined, 'ITEM_3', 'ITEM_4', null],
                [null, 'ITEM_7', 'ITEM_8', 'ITEM_9', 'ITEM_10'],
                ['ITEM_11', 'ITEM_12', 'ITEM_13', undefined, 'ITEM_15'],
                ['ITEM_16', 'ITEM_17', 'ITEM_18', undefined, 'ITEM_20']
              ],
              [-1, -2],
              [-3],
              [-4, -5, 1, 2],
              3,
              4,
              5
            )
          ).to.eql([
            [0, 'ITEM_4', 'ITEM_3', 0, 'ITEM_1', 'ITEM_1', 0, 'ITEM_3', 'ITEM_4', 0],
            ['ITEM_10', 'ITEM_9', 'ITEM_8', 'ITEM_7', 0, 0, 'ITEM_7', 'ITEM_8', 'ITEM_9', 'ITEM_10'],
            ['ITEM_15', 0, 'ITEM_13', 'ITEM_12', 'ITEM_11', 'ITEM_11', 'ITEM_12', 'ITEM_13', 0, 'ITEM_15'],
            ['ITEM_20', 0, 'ITEM_18', 'ITEM_17', 'ITEM_16', 'ITEM_16', 'ITEM_17', 'ITEM_18', 0, 'ITEM_20']
          ])
        })
      })

      describe('Error cases', () => {
        it('when no args provided', () => expect(lookup.CHOOSECOLS()).to.equal(error.value))
        it('when array provided without any col_nums', () =>
          expect(lookup.CHOOSECOLS([['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4']])).to.equal(error.value))
        it('when 0s provided on any col_nums args', () => {
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
                ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
              ],
              0
            )
          ).to.equal(error.value)
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
                ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
              ],
              1,
              [0, 2]
            )
          ).to.equal(error.value)
        })
        it('when any col_nums args exceed col length', () => {
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
                ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
              ],
              5
            )
          ).to.equal(error.value)
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
                ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
              ],
              -5
            )
          ).to.equal(error.value)
          expect(
            lookup.CHOOSECOLS(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
                ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
              ],
              -3,
              [3, 10]
            )
          ).to.equal(error.value)
        })
      })
    })
  })

  describe('CHOOSEROWS', () => {
    describe('Error cases', () => {
      it('when no args provided', () => expect(lookup.CHOOSEROWS()).to.equal(error.value))
      it('when array provided without any row_nums', () =>
        expect(lookup.CHOOSEROWS([['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4']])).to.equal(error.value))
      it('when 0 provided on any row_nums args', () => {
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
            ],
            0
          )
        ).to.equal(error.value)
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
            ],
            1,
            [0, 2]
          )
        ).to.equal(error.value)
      })
      it('when any row_nums args exceed row length', () => {
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
            ],
            3
          )
        ).to.equal(error.value)
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
            ],
            -3
          )
        ).to.equal(error.value)
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
            ],
            [2, -3]
          )
        ).to.equal(error.value)
      })
    })

    describe('Should select row(s) by index(es) (1-based)', () => {
      it('single row_num provided', () => {
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
              ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12']
            ],
            2
          )
        ).to.eql([['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']])
      })
      it('many row_nums provided => selection should follow row_nums provided order', () => {
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
              ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12']
            ],
            2,
            1
          )
        ).to.eql([
          ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
          ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4']
        ])
      })
      it('many row_nums provided at least twice', () => {
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
              ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12']
            ],
            2,
            1,
            2,
            3
          )
        ).to.eql([
          ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
          ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
          ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
          ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12']
        ])
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
              ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12'],
              ['ITEM_13', 'ITEM_14', 'ITEM_15', 'ITEM_16'],
              ['ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
            ],
            4,
            2,
            4,
            3,
            1
          )
        ).to.eql([
          ['ITEM_13', 'ITEM_14', 'ITEM_15', 'ITEM_16'],
          ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
          ['ITEM_13', 'ITEM_14', 'ITEM_15', 'ITEM_16'],
          ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12'],
          ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4']
        ])
      })
      it('for line with empty cell => values will be replaced by 0', () => {
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              [undefined, 'ITEM_6', 'ITEM_7', null]
            ],
            2
          )
        ).to.eql([[0, 'ITEM_6', 'ITEM_7', 0]])
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
              ['ITEM_9', 'ITEM_10', null, 'ITEM_12'],
              [undefined, 'ITEM_14', 'ITEM_15', 'ITEM_16'],
              ['ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
            ],
            4,
            2,
            4,
            3,
            1
          )
        ).to.eql([
          [0, 'ITEM_14', 'ITEM_15', 'ITEM_16'],
          ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
          [0, 'ITEM_14', 'ITEM_15', 'ITEM_16'],
          ['ITEM_9', 'ITEM_10', 0, 'ITEM_12'],
          ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4']
        ])
      })
      it('can provide num_row(s) as array', () => {
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              [undefined, 'ITEM_6', 'ITEM_7', null]
            ],
            [2]
          )
        ).to.eql([[0, 'ITEM_6', 'ITEM_7', 0]])
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
              ['ITEM_9', 'ITEM_10', null, 'ITEM_12'],
              [undefined, 'ITEM_14', 'ITEM_15', 'ITEM_16'],
              ['ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
            ],
            [4, 2],
            4,
            [3, 1]
          )
        ).to.eql([
          [0, 'ITEM_14', 'ITEM_15', 'ITEM_16'],
          ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
          [0, 'ITEM_14', 'ITEM_15', 'ITEM_16'],
          ['ITEM_9', 'ITEM_10', 0, 'ITEM_12'],
          ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4']
        ])
      })

      it('when negative num_row(s) provided => select back from the end of array', () => {
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
              ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12']
            ],
            -2
          )
        ).to.eql([['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']])
        expect(
          lookup.CHOOSEROWS(
            [
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
              ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12'],
              ['ITEM_13', 'ITEM_14', 'ITEM_15', 'ITEM_16'],
              ['ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
            ],
            -3,
            [2, -4],
            -1
          )
        ).to.eql([
          ['ITEM_9', 'ITEM_10', 'ITEM_11', 'ITEM_12'],
          ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
          ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8'],
          ['ITEM_17', 'ITEM_18', 'ITEM_19', 'ITEM_20']
        ])
      })
    })
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
    expect(lookup.COLUMNS()).to.equal(error.na)
    expect(lookup.COLUMNS(1)).to.equal(error.value)
    expect(lookup.COLUMNS([])).to.eql(0)
    expect(
      lookup.COLUMNS([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
    ).to.equal(2)
    expect(lookup.COLUMNS([[1, 2]])).to.equal(2)
    expect(lookup.COLUMNS([1, 2])).to.equal(1)
  })

  describe('DROP', () => {
    describe('args: (array, rows, [columns])', () => {
      describe('should drop rows / columns from array', () => {
        describe('Only rows provided', () => {
          it('when rows args = 0 explicitely => equals to provided array', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                0
              )
            ).to.eql([
              ['ITEM_1', 'ITEM_2', 'ITEM_3'],
              ['ITEM_4', 'ITEM_5', 'ITEM_6'],
              ['ITEM_7', 'ITEM_8', 'ITEM_9']
            ])
          })

          it('when positive rows arg (1 <= rows <= length), drops from start of array', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                2
              )
            ).to.eql([['ITEM_7', 'ITEM_8', 'ITEM_9']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                1
              )
            ).to.eql([
              ['ITEM_4', 'ITEM_5', 'ITEM_6'],
              ['ITEM_7', 'ITEM_8', 'ITEM_9']
            ])
          })

          it('when negative rows arg (-length <= rows <= -1), drops from end of array', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                -2
              )
            ).to.eql([['ITEM_1', 'ITEM_2', 'ITEM_3']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                -1
              )
            ).to.eql([
              ['ITEM_1', 'ITEM_2', 'ITEM_3'],
              ['ITEM_4', 'ITEM_5', 'ITEM_6']
            ])
          })
        })

        describe('Only columns provided', () => {
          it('when columns args = 0 explicitely => equals to provided array', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                0
              )
            ).to.eql([
              ['ITEM_1', 'ITEM_2', 'ITEM_3'],
              ['ITEM_4', 'ITEM_5', 'ITEM_6'],
              ['ITEM_7', 'ITEM_8', 'ITEM_9']
            ])
          })

          it('when positive columns arg (1 <= columns <= length), drops from start of row array', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                undefined,
                2
              )
            ).to.eql([['ITEM_3'], ['ITEM_6'], ['ITEM_9']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                null,
                1
              )
            ).to.eql([
              ['ITEM_2', 'ITEM_3'],
              ['ITEM_5', 'ITEM_6'],
              ['ITEM_8', 'ITEM_9']
            ])
          })

          it('when negative columns arg (-length <= columns <= -1), drops from end of row array', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                undefined,
                -2
              )
            ).to.eql([['ITEM_1'], ['ITEM_4'], ['ITEM_7']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                null,
                -1
              )
            ).to.eql([
              ['ITEM_1', 'ITEM_2'],
              ['ITEM_4', 'ITEM_5'],
              ['ITEM_7', 'ITEM_8']
            ])
          })
        })

        describe('Rows and columns provided', () => {
          it('when args = 0 explicitely => equals to provided array', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                0,
                0
              )
            ).to.eql([
              ['ITEM_1', 'ITEM_2', 'ITEM_3'],
              ['ITEM_4', 'ITEM_5', 'ITEM_6'],
              ['ITEM_7', 'ITEM_8', 'ITEM_9']
            ])
          })

          it('with positive args, drops from start of rows, then start of columns', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                1,
                2
              )
            ).to.eql([['ITEM_6'], ['ITEM_9']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                2,
                1
              )
            ).to.eql([['ITEM_8', 'ITEM_9']])
          })

          it('with negative args, drops from end of rows, then end of columns', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                -1,
                -2
              )
            ).to.eql([['ITEM_1'], ['ITEM_4']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                -2,
                -1
              )
            ).to.eql([['ITEM_1', 'ITEM_2']])
          })

          it('can mix positive and negative args', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                1,
                -2
              )
            ).to.eql([['ITEM_4'], ['ITEM_7']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                -2,
                1
              )
            ).to.eql([['ITEM_2', 'ITEM_3']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                2,
                2
              )
            ).to.eql([['ITEM_9']])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                  ['ITEM_7', 'ITEM_8', 'ITEM_9']
                ],
                -2,
                -2
              )
            ).to.eql([['ITEM_1']])
          })
        })

        describe('Empty cells on array', () => {
          it('should be replaced by 0s on drop', () => {
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', undefined],
                  ['ITEM_7', null, 'ITEM_9']
                ],
                1,
                1
              )
            ).to.eql([
              ['ITEM_5', 0],
              [0, 'ITEM_9']
            ])
            expect(
              lookup.DROP(
                [
                  ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                  ['ITEM_4', 'ITEM_5', undefined],
                  ['ITEM_7', null, 'ITEM_9']
                ],
                -1,
                2
              )
            ).to.eql([['ITEM_3'], [0]])
          })
        })
      })

      describe('throw error #CALC!', () => {
        it('when rows (positive or negative) arg exceed rows length', () => {
          expect(
            lookup.DROP(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                ['ITEM_7', 'ITEM_8', 'ITEM_9']
              ],
              4
            )
          ).to.equal(error.calc)
          expect(
            lookup.DROP(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                ['ITEM_7', 'ITEM_8', 'ITEM_9']
              ],
              -4
            )
          ).to.equal(error.calc)
        })

        it('when columns (positive or negative) arg exceed columns length', () => {
          expect(
            lookup.DROP(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                ['ITEM_7', 'ITEM_8', 'ITEM_9']
              ],
              0,
              4
            )
          ).to.equal(error.calc)
          expect(
            lookup.DROP(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                ['ITEM_7', 'ITEM_8', 'ITEM_9']
              ],
              0,
              -4
            )
          ).to.equal(error.calc)
        })

        it('when at least rows / columns args exceed array rows / columns size', () => {
          expect(
            lookup.DROP(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                ['ITEM_7', 'ITEM_8', 'ITEM_9']
              ],
              -5,
              2
            )
          ).to.equal(error.calc)
          expect(
            lookup.DROP(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                ['ITEM_7', 'ITEM_8', 'ITEM_9']
              ],
              5,
              -2
            )
          ).to.equal(error.calc)
          expect(
            lookup.DROP(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                ['ITEM_7', 'ITEM_8', 'ITEM_9']
              ],
              2,
              -5
            )
          ).to.equal(error.calc)
          expect(
            lookup.DROP(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6'],
                ['ITEM_7', 'ITEM_8', 'ITEM_9']
              ],
              -2,
              5
            )
          ).to.equal(error.calc)
        })
      })
    })
  })

  describe('EXPAND', () => {
    describe('args: (array, [rows], [columns], [pad_with])', () => {
      describe('should expands given array to specified row and column dimensions', () => {
        it('examples from Microsoft docs', () => {
          expect(
            lookup.EXPAND(
              [
                [1, 2],
                [3, 4]
              ],
              3,
              3
            )
          ).to.eql([
            [1, 2, error.na],
            [3, 4, error.na],
            [error.na, error.na, error.na]
          ])
          expect(
            lookup.EXPAND(
              [
                [1, 2],
                [3, 4]
              ],
              3,
              3,
              '-'
            )
          ).to.eql([
            [1, 2, '-'],
            [3, 4, '-'],
            ['-', '-', '-']
          ])
        })

        it('when neither rows nor columns provided => returns input array (shallow) copy', () => {
          expect(
            lookup.EXPAND([
              ['ITEM_1', 'ITEM_2', 'ITEM_3'],
              ['ITEM_4', 'ITEM_5', 'ITEM_6']
            ])
          ).to.eql([
            ['ITEM_1', 'ITEM_2', 'ITEM_3'],
            ['ITEM_4', 'ITEM_5', 'ITEM_6']
          ])
        })

        it('when rows and / or columns provided (with pad_with) => init new matrix and fill cells from top-left from given array', () => {
          expect(
            lookup.EXPAND(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              3,
              undefined,
              'PAD_WITH_VALUE'
            )
          ).to.eql([
            ['ITEM_1', 'ITEM_2', 'ITEM_3'],
            ['ITEM_4', 'ITEM_5', 'ITEM_6'],
            ['PAD_WITH_VALUE', 'PAD_WITH_VALUE', 'PAD_WITH_VALUE']
          ])
          expect(
            lookup.EXPAND(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              undefined,
              5,
              'PAD_WITH_VALUE'
            )
          ).to.eql([
            ['ITEM_1', 'ITEM_2', 'ITEM_3', 'PAD_WITH_VALUE', 'PAD_WITH_VALUE'],
            ['ITEM_4', 'ITEM_5', 'ITEM_6', 'PAD_WITH_VALUE', 'PAD_WITH_VALUE']
          ])
          expect(
            lookup.EXPAND(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              3,
              4,
              'PAD_WITH_VALUE'
            )
          ).to.eql([
            ['ITEM_1', 'ITEM_2', 'ITEM_3', 'PAD_WITH_VALUE'],
            ['ITEM_4', 'ITEM_5', 'ITEM_6', 'PAD_WITH_VALUE'],
            ['PAD_WITH_VALUE', 'PAD_WITH_VALUE', 'PAD_WITH_VALUE', 'PAD_WITH_VALUE']
          ])
        })

        it('empty cell from input array will be replaced by 0s', () => {
          expect(
            lookup.EXPAND(
              [
                ['ITEM_1', undefined, 'ITEM_3'],
                [null, 'ITEM_5', undefined]
              ],
              3,
              4,
              'PAD_WITH_VALUE'
            )
          ).to.eql([
            ['ITEM_1', 0, 'ITEM_3', 'PAD_WITH_VALUE'],
            [0, 'ITEM_5', 0, 'PAD_WITH_VALUE'],
            ['PAD_WITH_VALUE', 'PAD_WITH_VALUE', 'PAD_WITH_VALUE', 'PAD_WITH_VALUE']
          ])
        })
      })

      describe('throws error', () => {
        it('when defined rows and / or columns less than given array size => #VALUE!', () => {
          expect(
            lookup.EXPAND(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              1,
              2
            )
          ).to.equal(error.value)
          expect(
            lookup.EXPAND(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              3,
              1
            )
          ).to.equal(error.value)
          expect(
            lookup.EXPAND(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              1,
              4
            )
          ).to.equal(error.value)
        })

        it('when no pad_with provided => #N/A will replace empty cell after expand', () => {
          expect(
            lookup.EXPAND(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              3,
              4
            )
          ).to.eql([
            ['ITEM_1', 'ITEM_2', 'ITEM_3', error.na],
            ['ITEM_4', 'ITEM_5', 'ITEM_6', error.na],
            [error.na, error.na, error.na, error.na]
          ])
        })
      })
    })
  })

  describe('MATCH', () => {
    it('should throw an error in case of missing arguments', () => {
      expect(lookup.MATCH()).to.equal(error.na)
      expect(lookup.MATCH(1)).to.equal(error.na)
      expect(lookup.MATCH(null, 1)).to.equal(error.na)
    })

    it('should return the following values', () => {
      expect(lookup.MATCH(0, [7, 1, 0, 3, 4, 100, 7], 0)).to.equal(3)
      expect(lookup.MATCH(1, [0, 1, 2, 3, 4, 100, 7])).to.equal(2)
      expect(lookup.MATCH(1, [[0], [1], [2], [3], [4]])).to.equal(2)
      expect(lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 1)).to.equal(5)
      expect(lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 0)).to.equal(5)
      expect(lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], -1)).to.equal(5)
      expect(lookup.MATCH(5, [0, 1, 2, 3, 4, 100, 7], 1)).to.equal(5)
      expect(lookup.MATCH(5, [0, 1, 2, 3, 4, 100, 7], 0)).to.equal(error.na)
      expect(lookup.MATCH(5, [0, 1, 2, 3, 4, 100, 7], -1)).to.equal(7)
      expect(lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], 2)).to.equal(error.na)
      expect(lookup.MATCH(4, [0, 1, 2, 3, 4, 100, 7], -2)).to.equal(error.na)
      expect(lookup.MATCH('j*b', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(2)
      expect(lookup.MATCH('j?b', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(error.na)
      expect(lookup.MATCH('j??b', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(2)
      expect(lookup.MATCH('j???b', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(error.na)
      expect(lookup.MATCH('j???', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(1)
      expect(lookup.MATCH('jimc', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(3)
      expect(lookup.MATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], -1)).to.equal(3)
      expect(lookup.MATCH('jimc', ['jima', 'jimb', 'jimd', 'bernie'], 1)).to.equal(2)
      expect(lookup.MATCH('ji**', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(1)
      expect(lookup.MATCH('*mc', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(3)
      expect(lookup.MATCH('*er*', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(4)
      expect(lookup.MATCH('jima~.', ['jima.', 'jimb', 'jimc', 'bernie'], 0)).to.equal(1)
      expect(lookup.MATCH('j~$ma', ['j$ma', 'jimb', 'jimc', 'bernie'], 0)).to.equal(1)
      expect(lookup.MATCH('*?c', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(3)
      expect(lookup.MATCH('*$c', ['jima', 'jimb', 'jimc', 'bernie'], 0)).to.equal(error.na)
      expect(lookup.MATCH('selected', ['not_selected', 'not_selected', 'selected', 'not_selected'], 0)).to.equal(3)
    })

    it('should match with string containing ignored regex symbols', () => {
      expect(lookup.MATCH('Under (200)', [['Under (200)'], ['200-350']], 0)).to.equal(1)
      expect(lookup.MATCH('Under [200]', [['Under [200]'], ['200-350']], 0)).to.equal(1)
      expect(lookup.MATCH('500+', [['Under 200'], ['200-349'], ['350-500'], ['500+']], 0)).to.equal(4)
      expect(lookup.MATCH('5*3', [['Under 200'], ['200-349'], ['5*3'], ['500+']], 0)).to.equal(3)
    })

    it('should work with mixed type elements in the lookup_array', () => {
      expect(lookup.MATCH('jimc', ['jima', 4, null, undefined, 'jimc', 'bernie'], 0)).to.equal(5)
    })

    it('should work with a single value lookup_array', () => {
      expect(lookup.MATCH('test', 'test')).to.equal(1)
      expect(lookup.MATCH('test', 'test', 0)).to.equal(1)
    })
  })

  it('ROWS', () => {
    expect(lookup.ROWS()).to.equal(error.na)
    expect(lookup.ROWS(1)).to.equal(error.value)
    expect(lookup.ROWS([])).to.eql(0)
    expect(
      lookup.ROWS([
        [1, 2],
        [2, 3],
        [2, 4]
      ])
    ).to.equal(3)
    expect(lookup.ROWS([[1, 2]])).to.equal(1)
    expect(lookup.ROWS([1, 2])).to.equal(2)
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
    expect(lookup.TRANSPOSE()).to.equal(error.na)
    expect(lookup.TRANSPOSE([])).to.eql([])
    expect(lookup.TRANSPOSE([1, 2, 3])).to.eql([[1], [2], [3]])
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
    expect(
      lookup.TRANSPOSE([
        [1, null, 3],
        [4, 5, undefined]
      ])
    ).to.eql([
      [1, 4],
      [0, 5],
      [3, 0]
    ])
  })

  it('UNIQUE', () => {
    expect(lookup.UNIQUE(1, 2, 3, 4, 5, 6, 6, 3)).to.deep.equal([1, 2, 3, 4, 5, 6])
    expect(lookup.UNIQUE('jima', 'jimb', 'jima', 'jimc')).to.deep.equal(['jima', 'jimb', 'jimc'])
    expect(lookup.UNIQUE()).to.eql([])
    expect(lookup.UNIQUE([])).to.eql([[]])
  })

  it('VLOOKUP', () => {
    expect(lookup.VLOOKUP()).to.equal(error.na)
    expect(lookup.VLOOKUP(1)).to.equal(error.na)
    expect(lookup.VLOOKUP(1, [[1, 2]])).to.equal(error.na)
    expect(lookup.VLOOKUP(1, [[1, 2]], 2)).to.equal(2)
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
        'Ji',
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
        'Ji',
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
        'JaM',
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
        'jAm',
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
        'jAMes',
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
        'jIm',
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
        'JOHN',
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
        'JI',
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
        'JI',
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
        'jB',
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
        'Li',
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
        'jI',
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
        'jI',
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

  describe('LOOKUP', () => {
    describe('without a resultArray', () => {
      it('should return the nearest value', () => {
        expect(lookup.LOOKUP(0.21, [[0.1, 0.2, 0.3, 0.2]])).to.equal(0.2)
      })
    })

    describe('with a resultArray', () => {
      expect(lookup.LOOKUP('Jack', ['Jim', 'Jack', 'Franck'], ['blue', 'yellow', 'red'])).to.equal('yellow')
      expect(lookup.LOOKUP('Jack', [['Jim'], ['Jack'], ['Franck']], [['blue'], ['yellow'], ['red']])).to.equal('yellow')
      expect(lookup.LOOKUP('Jamie', ['Jim', 'Jack', 'Franck'], ['blue', 'yellow', 'red'])).to.equal('red')
      expect(lookup.LOOKUP('Jamie', [['Jim'], ['Jack'], ['Franck']], [['blue'], ['yellow'], ['red']])).to.equal('red')
      expect(lookup.LOOKUP(0.23, [[0.1], [0.2], [0.3], [0.4]], [['A'], ['B'], ['C'], ['D']])).to.equal('B')
      expect(lookup.LOOKUP(0, [[0.1, 0.2, 0.3, 0.4]], [['A', 'B', 'C', 'D']])).to.equal(error.na)
      expect(lookup.LOOKUP(0.21, [[0.1, 0.2, 0.3, 0.2]], [['A', 'B', 'C', 'D']])).to.equal('B')
    })
  })

  describe('INDEX', () => {
    describe('Array form', () => {
      const oneDimensionRange = [1, 2, 3, 5, 8]
      describe('and a one dimension Range', () => {
        it('should return the value', () => {
          expect(lookup.INDEX(oneDimensionRange, 1, 4)).to.equal(5)
          expect(lookup.INDEX(['1', '2', '3', '5', '8'], 1, 5)).to.equal('8')
        })

        it('should return the correct value in case second parameter is omitted', () => {
          expect(lookup.INDEX(oneDimensionRange, 4)).to.equal(5)
        })

        it('should throw an error if row or column number is out of range', () => {
          expect(lookup.INDEX(oneDimensionRange, 2, 4)).to.equal(error.ref)
          expect(lookup.INDEX(oneDimensionRange, 1, 12)).to.equal(error.ref)
          expect(lookup.INDEX(oneDimensionRange, 6)).to.equal(error.ref)
          expect(lookup.INDEX(oneDimensionRange, -6)).to.equal(error.value)
        })

        it('should throw an error in case of error or empty inputs', () => {
          expect(lookup.INDEX(undefined, 2, 4)).to.equal(error.value)
          expect(lookup.INDEX(error.ref, 2, 4)).to.equal(error.ref)
          expect(lookup.INDEX(oneDimensionRange, error.na)).to.equal(error.na)
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
          expect(lookup.INDEX([['Banana'], ['Apple']], 2)).to.equal('Apple')
        })

        it('should throw an error if row or column number is out of range', () => {
          expect(lookup.INDEX(twoDimensionRange, 2, 5)).to.equal(error.ref)
          expect(lookup.INDEX(twoDimensionRange, 2, 5)).to.equal(error.ref)
          expect(lookup.INDEX(twoDimensionRange, -2, 5)).to.equal(error.value)
          expect(lookup.INDEX(twoDimensionRange, 2, -5)).to.equal(error.value)
        })
      })
    })
  })

  describe('HSTACK', () => {
    describe('args: (array, ...otherArrays)', () => {
      describe('should append horizontally array(s) in order', () => {
        it('single array provided => should return array', () => {
          expect(
            lookup.HSTACK([
              ['ITEM_1', 'ITEM_2'],
              ['ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6'],
              ['ITEM_7', 'ITEM_8']
            ])
          ).to.eql([
            ['ITEM_1', 'ITEM_2'],
            ['ITEM_3', 'ITEM_4'],
            ['ITEM_5', 'ITEM_6'],
            ['ITEM_7', 'ITEM_8']
          ])
        })

        it('many arrays provided with same row size', () => {
          expect(
            lookup.HSTACK(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              [
                [1, 2, 3, 4],
                [5, 6, 7, 8]
              ]
            )
          ).to.eql([
            ['ITEM_1', 'ITEM_2', 'ITEM_3', 1, 2, 3, 4],
            ['ITEM_4', 'ITEM_5', 'ITEM_6', 5, 6, 7, 8]
          ])
          expect(
            lookup.HSTACK(
              [
                [1, 2],
                [3, 4],
                [5, 6]
              ],
              [
                ['A', 'B'],
                ['C', 'D'],
                ['E', 'F']
              ],
              [['ITEM_1'], ['ITEM_2'], ['ITEM_3']]
            )
          ).to.eql([
            [1, 2, 'A', 'B', 'ITEM_1'],
            [3, 4, 'C', 'D', 'ITEM_2'],
            [5, 6, 'E', 'F', 'ITEM_3']
          ])
        })

        it('empty cells are replaced by 0s', () => {
          expect(
            lookup.HSTACK(
              [
                [1, 2],
                [3, null],
                [5, 6]
              ],
              [
                [undefined, 'ITEM_1'],
                ['ITEM_2', null],
                ['ITEM_3', null]
              ],
              [
                ['A', 'B'],
                [undefined, 'D'],
                ['E', 'F']
              ],
              [['X'], ['Y'], ['Z']]
            )
          ).to.eql([
            [1, 2, 0, 'ITEM_1', 'A', 'B', 'X'],
            [3, 0, 'ITEM_2', 0, 0, 'D', 'Y'],
            [5, 6, 'ITEM_3', 0, 'E', 'F', 'Z']
          ])
        })
      })

      describe('Error handler', () => {
        it('when many arrays provided with non-same row size => pad with #N/A on bottom', () => {
          expect(
            lookup.HSTACK(
              [
                [1, 2],
                [3, 4],
                [5, 6]
              ],
              [
                ['A', 'B', 'C'],
                ['D', 'E', 'F']
              ],
              [[error.value]]
            )
          ).to.eql([
            [1, 2, 'A', 'B', 'C', error.value],
            [3, 4, 'D', 'E', 'F', error.na],
            [5, 6, error.na, error.na, error.na, error.na]
          ])
        })
      })
    })
  })

  describe('VSTACK', () => {
    describe('args: (array, ...otherArrays)', () => {
      describe('should append vertically array(s) in order', () => {
        it('single array provided => should return array', () => {
          expect(
            lookup.VSTACK([
              ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
              ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
            ])
          ).to.eql([
            ['ITEM_1', 'ITEM_2', 'ITEM_3', 'ITEM_4'],
            ['ITEM_5', 'ITEM_6', 'ITEM_7', 'ITEM_8']
          ])
        })

        it('many arrays provided with same column size', () => {
          expect(
            lookup.VSTACK(
              [
                ['ITEM_1', 'ITEM_2', 'ITEM_3'],
                ['ITEM_4', 'ITEM_5', 'ITEM_6']
              ],
              [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
              ]
            )
          ).to.eql([
            ['ITEM_1', 'ITEM_2', 'ITEM_3'],
            ['ITEM_4', 'ITEM_5', 'ITEM_6'],
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
          ])
          expect(
            lookup.VSTACK(
              [
                [1, 2],
                [3, 4],
                [5, 6]
              ],
              [
                ['A', 'B'],
                ['C', 'D']
              ],
              [['X', 'Y']]
            )
          ).to.eql([
            [1, 2],
            [3, 4],
            [5, 6],
            ['A', 'B'],
            ['C', 'D'],
            ['X', 'Y']
          ])
        })

        it('empty cells are replaced by 0s', () => {
          expect(
            lookup.VSTACK(
              [
                [1, 2],
                [3, null],
                [5, 6]
              ],
              [
                [undefined, 'ITEM_1'],
                ['ITEM_2', null]
              ],
              [
                ['A', 'B'],
                [undefined, 'D']
              ],
              [['X', 'Y']]
            )
          ).to.eql([
            [1, 2],
            [3, 0],
            [5, 6],
            [0, 'ITEM_1'],
            ['ITEM_2', 0],
            ['A', 'B'],
            [0, 'D'],
            ['X', 'Y']
          ])
        })
      })

      describe('Error handler', () => {
        it('when many arrays provided with non-same column size => pad with #N/A on right', () => {
          expect(
            lookup.VSTACK(
              [
                [1, 2],
                [3, 4],
                [5, 6]
              ],
              [
                ['A', 'B', 'C'],
                ['D', 'E', 'F']
              ],
              [[error.value]]
            )
          ).to.eql([
            [1, 2, error.na],
            [3, 4, error.na],
            [5, 6, error.na],
            ['A', 'B', 'C'],
            ['D', 'E', 'F'],
            [error.value, error.na, error.na]
          ])
        })
      })
    })
  })
})
