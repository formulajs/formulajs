import { expect } from 'chai'

import * as compatibility from '../src/compatibility.js'
import * as error from '../src/utils/error.js'

describe('Compatibility', () => {
  it('TDIST', () => {
    expect(compatibility.TDIST(1.959999998, 60, 0)).to.equal(error.num)
    expect(compatibility.TDIST(1.959999998, 60, 1)).to.approximately(0.027322465, 1e-9)
    expect(compatibility.TDIST(1.959999998, 60, 2)).to.approximately(0.05464493, 1e-9)
    expect(compatibility.TDIST(3.31, 4, 1)).to.approximately(0.014827220522043, 1e-9)
    expect(compatibility.TDIST(3.31, 4, 2)).to.approximately(0.029654441044086, 1e-9)
  })
})
