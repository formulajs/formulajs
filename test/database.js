import { expect } from 'chai'

import * as database from '../src/database.js'
import * as error from '../src/utils/error.js'

describe('Database', () => {
  it('DAVERAGE', () => {
    expect(
      database.DAVERAGE(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 8],
          ['Age', 20, 12, 14, 15, 8, 9],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(12)
    expect(
      database.DAVERAGE(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 8],
          ['Age', 20, 12, 14, 15, 8, 9],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10', '>9'],
          ['Age', '>14']
        ]
      )
    ).to.equal(10.75)
    expect(
      database.DAVERAGE(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 8],
          ['Age', 20, 12, 14, 15, 8, 9],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10', '>9'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DAVERAGE(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 8],
          ['Age', 20, 12, 14, 15, 8, 9],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10', '>9'],
          ['Age', '>14']
        ]
      )
    ).to.equal(10.75)
  })

  it('DCOUNT', () => {
    expect(
      database.DCOUNT(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(2)
    expect(
      database.DCOUNT(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DCOUNT(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(2)
  })

  it('DCOUNTA', () => {
    expect(
      database.DCOUNTA(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', null, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(1)
    expect(
      database.DCOUNTA(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', null, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DCOUNTA(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', null, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(1)
  })

  it('DGET', () => {
    expect(
      database.DGET(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>16']
        ]
      )
    ).to.equal(14)
    expect(
      database.DGET(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.num)
    expect(
      database.DGET(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>20']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DGET(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>16']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DGET(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>16']
        ]
      )
    ).to.equal(14)
  })

  it('DMAX', () => {
    expect(
      database.DMAX(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(14)
    expect(
      database.DMAX(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 10, 10, 9, 14, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(14)
    expect(
      database.DMAX(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [['Height'], ['Age', '>14']]
      )
    ).to.equal(14)
    expect(
      database.DMAX(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DMAX(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(14)
  })

  it('DMIN', () => {
    expect(
      database.DMIN(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(10)
    expect(
      database.DMIN(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DMIN(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(10)
  })

  it('DPRODUCT', () => {
    expect(
      database.DPRODUCT(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(140)
    expect(
      database.DPRODUCT(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DPRODUCT(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(140)
  })

  it('DSTDEV', () => {
    expect(
      database.DSTDEV(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [['Height', '>10']]
      )
    ).to.equal(2.8635642126552705)
    expect(
      database.DSTDEV(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [['Height', '>10']]
      )
    ).to.equal(error.value)
    expect(
      database.DSTDEV(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [['Height', '>10']]
      )
    ).to.equal(2.8635642126552705)
  })

  it('DSTDEVP', () => {
    expect(
      database.DSTDEVP(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [['Height', '>10']]
      )
    ).to.equal(2.5612496949731396)
    expect(
      database.DSTDEVP(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [['Height', '>10']]
      )
    ).to.equal(error.value)
    expect(
      database.DSTDEVP(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [['Height', '>10']]
      )
    ).to.equal(2.5612496949731396)
  })

  it('DSUM', () => {
    expect(
      database.DSUM(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(24)
    expect(
      database.DSUM(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DSUM(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(24)
  })

  it('DVAR', () => {
    expect(
      database.DVAR(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(8)
    expect(
      database.DVAR(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DVAR(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(8)
  })

  it('DVARP', () => {
    expect(
      database.DVARP(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        'Yield',
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(4)
    expect(
      database.DVARP(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        undefined,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(error.value)
    expect(
      database.DVARP(
        [
          ['Tree', 'Apple', 'Pear', 'Cherry', 'Apple', 'Pear', 'Apple'],
          ['Height', 18, 12, 13, 14, 9, 12],
          ['Age', 20, 12, 14, 16, 8, 11],
          ['Yield', 14, 10, 9, 10, 8, 6]
        ],
        3,
        [
          ['Height', '>10'],
          ['Age', '>14']
        ]
      )
    ).to.equal(4)
  })
})
