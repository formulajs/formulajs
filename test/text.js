/* global suite, test */
var error = require('../lib/utils/error');
var should = require('should');
var text = require('../lib/text');

describe('Text', function() {
  it('ASC', function() {
    text.ASC.should.throw('ASC is not implemented');
  });

  it('BAHTTEXT', function() {
    text.BAHTTEXT.should.throw('BAHTTEXT is not implemented');
  });

  it("CHAR", function() {
    text.CHAR(65).should.equal("A");
    text.CHAR(255).should.equal("ÿ");
    text.CHAR(1000).should.equal("Ϩ");
    text.CHAR('invalid').should.equal(error.value);
  });

  it('CLEAN', function() {
    text.CLEAN('Monthly Report').should.equal('Monthly Report');
  });

  it('CODE', function() {
    text.CODE().should.equal(error.na);
    text.CODE('A').should.equal(65);
    text.CODE("Ϩ").should.equal(1000);
  });

  it('CONCATENATE', function() {
    text.CONCATENATE('hello', ' ', 'world').should.equal('hello world');
    text.CONCATENATE(['hello', ' my ', 'world']).should.equal('hello my world');
    text.CONCATENATE(1, 'one').should.equal('1one');
    text.CONCATENATE(true, 'yes').should.equal('TRUEyes');
    text.CONCATENATE(false, 'no').should.equal('FALSEno');
  });

  it('DBCS', function() {
    text.DBCS.should.throw('DBCS is not implemented');
  });

  xit('DOLLAR', function() {
    text.DOLLAR(1234.567).should.equal('$1,234.57');
    text.DOLLAR(1234.567, -2).should.equal('$1,200');
    text.DOLLAR(-1234.567, -2).should.equal('$(1,200)');
    text.DOLLAR(-0.123, 4).should.equal('$(0.1230)');
    text.DOLLAR(-99.888).should.equal('$(99.89)');
    text.DOLLAR('invalid').should.equal(error.value);
  });

  it('EXACT', function() {
    text.EXACT('yes', 'yes').should.equal(true);
    text.EXACT('yes', 'yes', 'yes').should.equal(error.na);
    text.EXACT().should.equal(error.na);
  });

  it('FIND', function() {
    var data = 'Miriam McGovern';
    text.FIND('M', data).should.equal(1);
    text.FIND('m', data).should.equal(6);
    text.FIND('M', data, 3).should.equal(8);
    text.FIND('M').should.equal(error.na);
    text.FIND().should.equal(error.na);
  });

  xit('FIXED', function() {
    text.FIXED(1234.567, 1).should.equal('1,234.6');
    text.FIXED(1234.567, -1).should.equal('1,230');
    text.FIXED(-1234.567, -1, true).should.equal('-1230');
    text.FIXED(44.332).should.equal('44.33');
    text.FIXED('invalid').should.equal(error.value);
  });

  it('HTML2TEXT', function() {
    text.HTML2TEXT().should.equal("");
    text.HTML2TEXT('').should.equal("");
    text.HTML2TEXT('<i>Hello</i>').should.equal("Hello");
    text.HTML2TEXT(['<i>Hello</i>', '<b>Jim</b>']).should.equal("Hello\nJim");
  });

  it('LEFT', function() {
    text.LEFT('Sale Price', 4).should.equal('Sale');
    text.LEFT('Sweeden').should.equal('S');
    text.LEFT(3).should.equal(error.value);
  });

  it('LEN', function() {
    text.LEN(true).should.equal(error.value);
    text.LEN('four').should.equal(4);
    text.LEN([1, 2, 3, 4, 5]).should.equal(5);
    text.LEN().should.equal(error.error);
  });

  it("LOWER", function() {
    text.LOWER('abcd').should.equal("abcd");
    text.LOWER('ABcd').should.equal("abcd");
    text.LOWER('ABCD').should.equal("abcd");
    text.LOWER('').should.equal("");
    text.LOWER().should.equal(error.value);
  });

  it('MID', function() {
    var data = 'Fluid Flow';
    text.MID(data, 1, 5).should.equal('Fluid');
    text.MID(data, 7, 20).should.equal('Flow');
    text.MID(data, 20, 50).should.equal('');
    text.MID(0).should.equal(error.value);
  });

  it('NUMBERVALUE', function() {
    text.NUMBERVALUE("2.500,27",",",".").should.equal(2500.27);
    text.NUMBERVALUE("250",",",".").should.equal(250);
    //text.NUMBERVALUE("3.5%").should.equal(.035);
  });

  it('PRONETIC', function() {
    text.PRONETIC.should.throw('PRONETIC is not implemented');
  });

  it('PROPER', function() {
    text.PROPER('a title case').should.equal('A Title Case');
    text.PROPER(true).should.equal('True');
    text.PROPER(false).should.equal('False');
    text.PROPER(90).should.equal('90');
    text.PROPER(NaN).should.equal(error.value);
    text.PROPER().should.equal(error.value);
  });

  it('REGEXEXTRACT', function() {
    text.REGEXEXTRACT('(Content) between brackets', '(([A-Za-z]+))').should.equal("Content");
    text.REGEXEXTRACT('The price today is $826.25', '[0-9]+.[0-9]+[0-9]+').should.equal("826.25");
    text.REGEXEXTRACT('Google Doc 101', '[0-9]+').should.equal("101");
    text.REGEXEXTRACT('Google Doc 101').should.equal(error.na);
    text.REGEXEXTRACT().should.equal(error.na);
  });

  it('REGEXREPLACE', function() {
    text.REGEXREPLACE('(Content) between brackets', '(([A-Za-z]+))', 'Me').should.equal("(Me) between brackets");
    text.REGEXREPLACE('(Content) between brackets', '(([A-Za-z]+))').should.equal(error.na);
    text.REGEXREPLACE('(Content) between brackets').should.equal(error.na);
    text.REGEXREPLACE().should.equal(error.na);
  });

  it('REGEXMATCH', function() {
    (typeof text.REGEXMATCH('(Content) between brackets', '(([A-Za-z]+))', true)).should.equal("object");
    text.REGEXMATCH('(Content) between brackets', '(([A-Za-z]+))', false).should.equal(true);
    text.REGEXMATCH('(Content) between brackets').should.equal(error.na);
    text.REGEXMATCH().should.equal(error.na);
  });

  it('REPLACE', function() {
    text.REPLACE('abcdefghijk', 6, 5, '*').should.equal('abcde*k');
    text.REPLACE('2009', 3, 2, '10').should.equal('2010');
    text.REPLACE('123456', 1, 3, '@').should.equal('@456');
    text.REPLACE().should.equal(error.value);
  });

  it('REPT', function() {
    text.REPT('multiple ', 3).should.equal('multiple multiple multiple ');
    text.REPT('m').should.equal(error.value);
  });

  it('RIGHT', function() {
    text.RIGHT('Sale Price', 5).should.equal('Price');
    text.RIGHT('Stock Number').should.equal('r');
    text.RIGHT('something', 'invalid').should.equal(error.value);
    text.RIGHT().should.equal(error.na);
  });

  it('SEARCH', function() {
    text.SEARCH('e', 'Statements', 6).should.equal(7);
    text.SEARCH('margin', 'Profit Margin').should.equal(8);
    text.SEARCH(true, 'bool').should.equal(error.value);
    text.SEARCH("foo", "bar").should.equal(error.value);
    text.SEARCH("ba", "bar").should.equal(1);
  });

  it('SPLIT', function() {
    (typeof text.SPLIT('123242', '2')).should.equal('object');
    (text.SPLIT('123242', '2') instanceof Array).should.equal(true);
  });

  it("SUBSTITUTE", function() {
    text.SUBSTITUTE('Jim Alateras', 'im', 'ames').should.equal("James Alateras");
    text.SUBSTITUTE('Jim Alateras', '', 'ames').should.equal("Jim Alateras");
    text.SUBSTITUTE('Jim Alateras', undefined, 'ames').should.equal("Jim Alateras");
    text.SUBSTITUTE('', 'im', 'ames').should.equal("");
    should.not.exist(text.SUBSTITUTE(undefined, 'im', 'ames'));
    text.SUBSTITUTE('Quarter 1, 2008', '1', '2', 1).should.equal('Quarter 2, 2008');
    text.SUBSTITUTE('Quarter 1, 2008').should.equal(error.na);
    text.SUBSTITUTE('Hello, world', ',', '').should.equal('Hello world');
    text.SUBSTITUTE().should.equal(error.na);
  });

  it('T', function() {
    text.T('Rainfall').should.equal('Rainfall');
    text.T(19).should.equal('');
    text.T(true).should.equal('');
  });

  xit('TEXT', function() {
    text.TEXT('1234.59', '###0.0').should.equal('1234.6');
    text.TEXT('1234.52', '###0.0').should.equal('1234.5');
    text.TEXT('1234.56', '###0.00').should.equal('1234.56');
    text.TEXT().should.equal(error.na);
  });

  it('TRIM', function() {
    text.TRIM(' more  spaces ').should.equal('more spaces');
    text.TRIM(true).should.equal(error.value);
  });

  it('UNICHAR', function() {
    text.UNICHAR(65).should.equal("A");
    text.UNICHAR(255).should.equal("ÿ");
    text.UNICHAR(1000).should.equal("Ϩ");
    var a = 0;
    setTimeout(function() {
      return (a++ < 10)?a:undefined;
    }, 10000000);
  });

  it('UNICODE', function() {
    text.UNICODE('A').should.equal(65);
    text.UNICODE("Ϩ").should.equal(1000);
  });

  it('UPPER', function() {
    text.UPPER('to upper case please').should.equal('TO UPPER CASE PLEASE');
    text.UPPER(true).should.equal(error.value);
  });

  xit('VALUE', function() {
    text.VALUE('$1,000').should.equal(1000);
    text.VALUE('16:48:00').should.equal(60480);
    text.VALUE(true).should.equal(error.value);
  });
});
