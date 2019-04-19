/* global suite, test */
var error = require('../lib/utils/error');
var logical = require('../lib/logical');
var should = require('should');

describe('Logical', function() {
  it('AND', function() {
    logical.AND(true, true).should.equal(true);
    logical.AND(true, false).should.equal(false);
  });

  it('CHOOSE', function() {
    logical.CHOOSE().should.equal(error.na);
    logical.CHOOSE(1).should.equal(error.na);
    logical.CHOOSE(1, 'jima').should.equal('jima');
    logical.CHOOSE(3, 'jima', 'jimb', 'jimc').should.equal('jimc');
    logical.CHOOSE(2, 'jima').should.equal(error.value);
    logical.CHOOSE(255, 'jima').should.equal(error.value);
  });

  it('FALSE', function() {
    logical.FALSE().should.equal(false);
  });

  it('IF', function() {
    logical.IF(true, 1, 2).should.equal(1);
    logical.IF(false, 1, 2).should.equal(2);
  });

  it('IFERROR', function() {
    logical.IFERROR(1, 2).should.equal(1);
    logical.IFERROR(error.value, 2).should.equal(2);
  });

  it('IFNA', function() {
    logical.IFNA(1, 2).should.equal(1);
    logical.IFNA(error.na, 2).should.equal(2);
  });

  it('NOT', function() {
    logical.NOT(true).should.equal(false);
    logical.NOT(false).should.equal(true);
  });

  it('OR', function() {
    logical.OR(true).should.equal(true);
    logical.OR(false).should.equal(false);
    logical.OR(true, false).should.equal(true);
  });

  it('TRUE', function() {
    logical.TRUE().should.equal(true);
  });

  it('XOR', function() {
    logical.XOR(false, false).should.equal(false);
    logical.XOR(false, true).should.equal(true);
    logical.XOR(true, false).should.equal(true);
    logical.XOR(true, true).should.equal(false);
  });

  it('SWITCH', function() {
    logical.SWITCH().should.equal(error.value);
    logical.SWITCH(7).should.equal(error.na);
    logical.SWITCH(7, "Default Expression").should.equal("Default Expression");
    logical.SWITCH(7, 9, "Nine", 7, "Seven").should.equal("Seven");
    logical.SWITCH(8, 9, "Nine", 7, "Seven", "Eight").should.equal("Eight");
    logical.SWITCH(10, 9, "Nine", 7, "Seven", 8, "Eight").should.equal(error.na);
    logical.SWITCH(7, 9, "Nine").should.equal(error.na);
  });
});
