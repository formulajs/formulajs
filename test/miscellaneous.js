/* global suite, test */
var misc = require('../lib/miscellaneous');
var error = require('../lib/error');
var should = require('should');

describe('Miscellaneous', function() {
  it('NUMERAL', function() {
    misc.NUMERAL(10000, '0,0.0000').should.equal("10,000.0000");
    misc.NUMERAL(10000.23, '0,0').should.equal("10,000");
    misc.NUMERAL(1000.234, '$0,0.00').should.equal("$1,000.23");
    misc.NUMERAL(100, '0b').should.equal("100B");
    misc.NUMERAL(0.974878234, '0.000%').should.equal("97.488%");
  });

  it('UNIQUE', function() {
    misc.UNIQUE(1, 2, 3, 4, 5, 6, 6, 3).should.containDeep([1, 2, 3, 4, 5, 6]);
    misc.UNIQUE('jima', 'jimb', 'jima', 'jimc').should.containDeep(['jima', 'jimb', 'jimc']);
    misc.UNIQUE().should.eql([]);
    misc.UNIQUE([]).should.eql([[]]);
  });

  it('ARGS2ARRAY', function() {
    misc.ARGS2ARRAY(1, 2, 3, 4).should.eql([1, 2, 3, 4]);
    misc.ARGS2ARRAY('jim', 2, 3.14).should.eql(['jim', 2, 3.14]);
  });

  it('FLATTEN', function() {
    misc.FLATTEN([1, [2, 3, [4, 5]]]).should.eql([1, 2, 3, 4, 5]);
    misc.FLATTEN([]).should.eql([]);
  });

  it('GETJSON', function() {
    // var type = typeof misc.GETJSON('https://api.github.com/');
    // type.should.equal('object');
  });

  it('JOIN', function() {
    misc.JOIN([1, [2, 3, [4, 5]]]).should.eql('1,2,3,4,5');
    misc.JOIN(['jim', 'alateras'], ' ').should.equal('jim alateras');
  });

  it('NUMBERS', function() {
    misc.NUMBERS([1, [2, 3, [4, 5]]]).should.equal.true;
    misc.NUMBERS(['jim', 'alateras'], ' ').should.equal.false;
  });

  it('REFERENCE', function() {
    var ctx = {
      name: {
        firstName: 'Jim',
        lastName: 'Alateras',
        nickNames: [
          'jforce',
          'jimmya',
          'jima'
        ],
        address: {
          number: '5',
          street: 'Kalulu' ,
          type: 'Rd',
          mobile: '0422344861'
        }
      }
    };

    misc.REFERENCE(ctx, 'name.firstName').should.equal('Jim');
    misc.REFERENCE(ctx, 'name.address').should.have.property('number', '5');
    misc.REFERENCE(ctx, 'name.address.mobile').should.equal('0422344861');
    misc.REFERENCE(ctx, 'name.nickNames[0]').should.equal('jforce');
    misc.REFERENCE().should.equal(error.error);
    should.not.exist(misc.REFERENCE(ctx, 'name.address2'));
  });
});
