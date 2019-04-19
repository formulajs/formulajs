/* global suite, test */
var utils  = require('../../lib/utils/common');
var should = require('should');
var error  = require('../../lib/utils/error');

describe('Utils => common', function() {
  it('flattenShallow', function() {
    should.deepEqual(utils.flattenShallow([
      [1, 2],
      [3, 4]
    ]), [1, 2, 3, 4]);

    should.deepEqual(utils.flattenShallow('not array'), 'not array');
  });

  it('isFlat', function() {
    utils.isFlat([
      [1, 2],
      [3, 4]
    ]).should.equal(false);

    utils.isFlat([1, 2, 3]).should.equal(true);
    utils.isFlat().should.equal(false);
  });

  it('flatten', function() {
    should.deepEqual(utils.flatten([
      [1, 2],
      [3, 4]
    ]), [1, 2, 3, 4]);

    should.deepEqual(utils.flatten([
      1, 2,
      [3, 4],
      [[5, 6]]
    ]), [1, 2, 3, 4, 5, 6]);
  });

  it('argsToArray', function() {
    (function() {
      should.deepEqual(utils.argsToArray(arguments), [1, 2, 3]);
    })(1, 2, 3);
  });

  it('cleanFloat', function() {
    utils.cleanFloat(3.0999999999999996).should.equal(3.1);
  });

  it('parseBool', function() {
    utils.parseBool(true).should.equal(true);
    utils.parseBool(0).should.equal(false);
    utils.parseBool(1).should.equal(true);
    utils.parseBool('TRUE').should.equal(true);
    utils.parseBool('FALSE').should.equal(false);
    utils.parseBool(new Date()).should.equal(true);
    utils.parseBool(NaN).should.equal(true);
    var err = new Error();
    utils.parseBool(err).should.equal(err);
  });

  it('parseNumberArray', function() {
    utils.parseNumberArray().should.equal(error.value);
  });

  it('parseMatrix', function() {
    utils.parseMatrix().should.equal(error.value);
    utils.parseMatrix([[1, 2, 3], [4, 5, 6]]).should.deepEqual([[1, 2, 3], [4, 5, 6]]);
    utils.parseMatrix([[1, 2, 3], ['4', 5, 6]]).should.deepEqual([[1, 2, 3], [4, 5, 6]]);
    utils.parseMatrix([[1, 2, 3], ['foo', 5, 6]]).should.equal(error.value);
  });

  it('parseDateArray', function() {
    utils.parseDateArray(['01/jan/2009', 'invalid']).should.equal(error.value);
  });

  it('arrayValuesToNumbers', function() {
    should.deepEqual(utils.arrayValuesToNumbers(['1.4']), [1.4]);
    should.deepEqual(utils.arrayValuesToNumbers(['not convertible']), [0]);
  });

  it('rest', function() {
    utils.rest([1,2,3], 2).length.should.equal(1);
    utils.rest('abc', 2).length.should.equal(1);
    utils.rest(true, 2).should.equal(true);
  });

  it('initial', function() {
    utils.initial([1,2,3], 1).length.should.equal(2);
    utils.initial('abc', 2).length.should.equal(1);
    utils.initial(true, 1).should.equal(true);
  });

  it('transpose', function(){
    utils.transpose().should.equal(error.value);
    utils.transpose([[1],[2]]).should.deepEqual([[1,2]]);
    utils.transpose([[1,2,3,4],[5,6,7,8], [9,10,11,12]])
      .should.deepEqual([[1,5,9],[2,6,10], [3,7,11], [4,8,12]]);
  });
});
