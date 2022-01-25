import 'should'

import * as error from '../src/utils/error.js'
import * as misc from '../src/miscellaneous.js'

describe('Miscellaneous', () => {
  it('UNIQUE', () => {
    misc.UNIQUE(1, 2, 3, 4, 5, 6, 6, 3).should.containDeep([1, 2, 3, 4, 5, 6])
    misc.UNIQUE('jima', 'jimb', 'jima', 'jimc').should.containDeep(['jima', 'jimb', 'jimc'])
    misc.UNIQUE().should.eql([])
    misc.UNIQUE([]).should.eql([[]])
  })

  it('ARGS2ARRAY', () => {
    misc.ARGS2ARRAY(1, 2, 3, 4).should.eql([1, 2, 3, 4])
    misc.ARGS2ARRAY('jim', 2, 3.14).should.eql(['jim', 2, 3.14])
  })

  it('FLATTEN', () => {
    misc.FLATTEN([1, [2, 3, [4, 5]]]).should.eql([1, 2, 3, 4, 5])
    misc.FLATTEN([]).should.eql([])
  })

  xit('GETJSON', () => {
    // var type = typeof misc.GETJSON('https://api.github.com/');
    // type.should.equal('object');
  })

  it('JOIN', () => {
    misc.JOIN([1, [2, 3, [4, 5]]]).should.eql('1,2,3,4,5')
    misc.JOIN(['jim', 'alateras'], ' ').should.equal('jim alateras')
  })

  it('NUMBERS', () => {
    misc.NUMBERS([1, [2, 3, [4, 5]]]).should.equal.true
    misc.NUMBERS(['jim', 'alateras'], ' ').should.equal.false
  })

  it('REFERENCE', () => {
    const ctx = {
      name: {
        firstName: 'Jim',
        lastName: 'Alateras',
        nickNames: ['jforce', 'jimmya', 'jima'],
        address: {
          number: '5',
          street: 'Kalulu',
          type: 'Rd',
          mobile: '0422344861'
        }
      }
    }

    misc.REFERENCE(ctx, 'name.firstName').should.equal('Jim')
    misc.REFERENCE(ctx, 'name.address').should.have.property('number', '5')
    misc.REFERENCE(ctx, 'name.address.mobile').should.equal('0422344861')
    misc.REFERENCE(ctx, 'name.nickNames[0]').should.equal('jforce')
    misc.REFERENCE().should.equal(error.error)
    should.not.exist(misc.REFERENCE(ctx, 'name.address2'))
  })
})
