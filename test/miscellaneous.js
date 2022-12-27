import { expect } from 'chai'

import * as error from '../src/utils/error.js'
import * as misc from '../src/miscellaneous.js'

describe('Miscellaneous', () => {
  it('ARGS2ARRAY', () => {
    expect(misc.ARGS2ARRAY(1, 2, 3, 4)).to.eql([1, 2, 3, 4])
    expect(misc.ARGS2ARRAY('jim', 2, 3.14)).to.eql(['jim', 2, 3.14])
  })

  it('FLATTEN', () => {
    expect(misc.FLATTEN([1, [2, 3, [4, 5]]])).to.eql([1, 2, 3, 4, 5])
    expect(misc.FLATTEN([])).to.eql([])
  })

  xit('GETJSON', () => {
    // var type = typeof misc.GETJSON('https://api.github.com/');
    // type.should.equal('object');
  })

  it('JOIN', () => {
    expect(misc.JOIN([1, [2, 3, [4, 5]]])).to.eql('1,2,3,4,5')
    expect(misc.JOIN(['jim', 'alateras'], ' ')).to.equal('jim alateras')
  })

  it('NUMBERS', () => {
    expect(misc.NUMBERS([1, [2, 3, [4, '5']]])).to.eql([1, 2, 3, 4])
    expect(misc.NUMBERS(['jim', 'alateras'], ' ')).to.eql([])
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

    expect(misc.REFERENCE(ctx, 'name.firstName')).to.equal('Jim')
    expect(misc.REFERENCE(ctx, 'name.address')).to.have.property('number', '5')
    expect(misc.REFERENCE(ctx, 'name.address.mobile')).to.equal('0422344861')
    expect(misc.REFERENCE(ctx, 'name.nickNames[0]')).to.equal('jforce')
    expect(misc.REFERENCE()).to.equal(error.error)
    expect(misc.REFERENCE(ctx, 'name.address2')).to.not.exist
  })
})
