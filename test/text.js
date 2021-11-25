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
    text.CHAR(undefined).should.equal(error.value);
    text.CHAR(error.na).should.equal(error.na);
    text.CHAR('invalid').should.equal(error.value);
  });

  it('CLEAN', function() {
    text.CLEAN(undefined).should.equal('');
    text.CLEAN(error.na).should.equal(error.na);
    text.CLEAN('Monthly Report').should.equal('Monthly Report');
  });

  it('CODE', function() {
    text.CODE().should.equal(error.na);
    text.CODE(undefined).should.equal(error.value);
    text.CODE(error.na).should.equal(error.na);
    text.CODE('A').should.equal(65);
    text.CODE("Ϩ").should.equal(1000);
  });

  it('CONCATENATE', function() {
    text.CONCATENATE('a', undefined, 'b').should.equal('ab');
    text.CONCATENATE('a', error.na, 'b').should.equal(error.na);
    text.CONCATENATE('hello', ' ', 'world').should.equal('hello world');
    text.CONCATENATE(['hello', ' my ', 'world']).should.equal('hello my world');
    text.CONCATENATE(1, 'one').should.equal('1one');
    text.CONCATENATE(true, 'yes').should.equal('TRUEyes');
    text.CONCATENATE(false, 'no').should.equal('FALSEno');
  });

  it('CONCAT', function() {
    text.CONCAT('a', undefined, 'b').should.equal('ab');
    text.CONCAT('a', error.na, 'b').should.equal(error.na);
    text.CONCAT('hello', ' ', 'world').should.equal('hello world');
    text.CONCAT(['hello', ' my ', 'world']).should.equal('hello my world');
    text.CONCAT(1, 'one').should.equal('1one');
    text.CONCAT(true, 'yes').should.equal('TRUEyes');
    text.CONCAT(false, 'no').should.equal('FALSEno');
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
    text.EXACT(undefined, undefined).should.equal(true);
    text.EXACT(undefined, null).should.equal(true);
    text.EXACT(undefined, "").should.equal(true);
    text.EXACT(error.na, error.na).should.equal(error.na);
    text.EXACT('yes', 'yes').should.equal(true);
    text.EXACT('yes', 'yes', 'yes').should.equal(error.na);
    text.EXACT().should.equal(error.na);
    text.EXACT('true', true).should.equal(true);
    text.EXACT('12', 12).should.equal(true);
    text.EXACT('a', 'b').should.equal(false);
    text.EXACT(1100, -2).should.equal(false);
  });

  it('FIND', function() {
    var data = 'Miriam McGovern';
    text.FIND(undefined, undefined).should.equal(1);
    text.FIND('M', data).should.equal(1);
    text.FIND('m', data).should.equal(6);
    text.FIND('M', data, 3).should.equal(8);
    text.FIND('M', undefined).should.equal(error.value);
    text.FIND('M').should.equal(error.na);
    text.FIND().should.equal(error.na);
    text.FIND(true, '12true').should.equal(3);
    text.FIND(12, '312').should.equal(2);
    text.FIND(12, 312).should.equal(2);
    text.FIND('a', 'b','c').should.equal(error.value);

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
    text.HTML2TEXT(undefined).should.equal("");
    text.HTML2TEXT(error.na).should.equal(error.na);
    text.HTML2TEXT('').should.equal("");
    text.HTML2TEXT('<i>Hello</i>').should.equal("Hello");
    text.HTML2TEXT(['<i>Hello</i>', '<b>Jim</b>']).should.equal("Hello\nJim");
  });

  it('LEFT', function() {
    text.LEFT(error.na, 2).should.equal(error.na);
    text.LEFT('text', error.na).should.equal(error.na);
    text.LEFT(undefined, undefined).should.equal('');
    text.LEFT(undefined, 3).should.equal('');
    text.LEFT('Sale Price', 4).should.equal('Sale');
    text.LEFT('Sweeden').should.equal('S');
    text.LEFT(42).should.equal('4');
    text.LEFT(true).should.equal('t');
  });

  it('LEN', function() {
    text.LEN(undefined).should.equal(0);
    text.LEN(error.na).should.equal(error.na);
    text.LEN(true).should.equal(4);
    text.LEN('four').should.equal(4);
    text.LEN([1, 2, 3, 4, 5]).should.equal(error.value);
    text.LEN().should.equal(error.na);
    text.LEN(null).should.equal(0);
    text.LEN([]).should.equal(error.value);
    text.LEN(123).should.equal(3);
  });

  it("LOWER", function() {
    text.LOWER(undefined).should.equal("");
    text.LOWER(error.na).should.equal(error.na);
    text.LOWER('abcd').should.equal("abcd");
    text.LOWER('ABcd').should.equal("abcd");
    text.LOWER('ABCD').should.equal("abcd");
    text.LOWER('').should.equal("");
    text.LOWER(true).should.equal('true');
    text.LOWER(1).should.equal('1');
    text.LOWER().should.equal(error.na);
  });

  it('MID', function() {
    var data = 'Fluid Flow';
    text.MID(data, 1, 5).should.equal('Fluid');
    text.MID(data, 7, 20).should.equal('Flow');
    text.MID(data, 20, 50).should.equal('');
    text.MID(0).should.equal(error.na);
    text.MID().should.equal(error.na);
    text.MID(data, 1, 1, 3).should.equal(error.na);
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
    text.PROPER(undefined).should.equal('');
    text.PROPER(null).should.equal('');
    text.PROPER(error.na).should.equal(error.na);
    text.PROPER('a title case').should.equal('A Title Case');
    text.PROPER(true).should.equal('True');
    text.PROPER(false).should.equal('False');
    text.PROPER(90).should.equal('90');
    text.PROPER(NaN).should.equal(error.value);
    text.PROPER().should.equal(error.na);
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
    text.REPLACE().should.equal(error.na);
  });

  it('REPT', function() {
    text.REPT(undefined, undefined).should.equal('');
    text.REPT('text', undefined).should.equal('');
    text.REPT(undefined, 3).should.equal('');
    text.REPT(error.na, 3).should.equal(error.na);
    text.REPT('multiple ', 3).should.equal('multiple multiple multiple ');
    text.REPT('m').should.equal(error.na);
    text.REPT().should.equal(error.na);
    text.REPT(true, 2).should.equal('truetrue');
    text.REPT(12, 2).should.equal('1212');
  });

  it('RIGHT', function() {
    text.RIGHT(error.na, 2).should.equal(error.na);
    text.RIGHT('text', error.na).should.equal(error.na);
    text.RIGHT(undefined, undefined).should.equal('');
    text.RIGHT(undefined, 3).should.equal('');
    text.RIGHT('Sale Price', 5).should.equal('Price');
    text.RIGHT('Stock Number').should.equal('r');
    text.RIGHT('something', 'invalid').should.equal(error.value);
    text.RIGHT().should.equal(error.na);
    text.RIGHT(42).should.equal('2');
    text.RIGHT(true).should.equal('e');
  });

  it('SEARCH', function() {
    text.SEARCH('e', 'Statements', 6).should.equal(7);
    text.SEARCH('margin', 'Profit Margin').should.equal(8);
    text.SEARCH(true, 'bool').should.equal(error.value);
    text.SEARCH("foo", "bar").should.equal(error.value);
    text.SEARCH("ba", "bar").should.equal(1);
    text.SEARCH("foo", "foo bar", 3).should.equal(error.value);
    text.SEARCH("foo", "foo bar").should.equal(1);
  });

  it('SPLIT', function() {
    (typeof text.SPLIT('123242', '2')).should.equal('object');
    (text.SPLIT('123242', '2') instanceof Array).should.equal(true);
  });

  describe('SUBSTITUTE', function() {
    it('should substitute all occurrences of a string for another string', function() {
      text.SUBSTITUTE('Jim Alateras', 'Jim', 'James').should.equal("James Alateras");
      text.SUBSTITUTE('Jim Alateras', 'im', 'ames').should.equal("James Alateras");
      text.SUBSTITUTE('Jim Alateras', '', 'ames').should.equal("Jim Alateras");
      text.SUBSTITUTE('Jim Alateras', undefined, 'ames').should.equal("Jim Alateras");
      text.SUBSTITUTE('Jim, Alateras, Sr.', ',', '').should.equal('Jim Alateras Sr.');
      text.SUBSTITUTE('', 'im', 'ames').should.equal("");
      should.not.exist(text.SUBSTITUTE(undefined, 'im', 'ames'));
    });

    it('should substitute regex meta-characters without interpretation', function() {
      text.SUBSTITUTE('J. Alateras', '.', 'ames').should.equal("James Alateras");
    });

    it('should return an #N/A error if not enough inputs', function() {
      text.SUBSTITUTE('Jim Alateras').should.equal(error.na);
      text.SUBSTITUTE().should.equal(error.na);
    });

    it('should substitute the nth occurrence of a string for another string', function() {
      text.SUBSTITUTE('a-a-a', ':', '', 1).should.equal('a-a-a');
      text.SUBSTITUTE('a-a-a', '-', ':', '2').should.equal('a-a:a');
      text.SUBSTITUTE('a-a-a', '-', ':', '2.5').should.equal('a-a:a');
      text.SUBSTITUTE('a-a-a', '-', ':', '3').should.equal('a-a-a');
      text.SUBSTITUTE('a-a-a', '-', ':', 2).should.equal('a-a:a');
      text.SUBSTITUTE('a-a-a', '-', ':', 2.5).should.equal('a-a:a');
      text.SUBSTITUTE('a-a-a', '-', ':', 3).should.equal('a-a-a');
    });

    it('should return a #VALUE! error if occurrence is not a number greater than or equal to 1', function() {
      text.SUBSTITUTE('a-a-a', '-', ':', '').should.equal(error.value);
      text.SUBSTITUTE('a-a-a', '-', ':', 'x').should.equal(error.value);
      text.SUBSTITUTE('a-a-a', '-', ':', '-1').should.equal(error.value);
      text.SUBSTITUTE('a-a-a', '-', ':', '-0.5').should.equal(error.value);
      text.SUBSTITUTE('a-a-a', '-', ':', -1).should.equal(error.value);
      text.SUBSTITUTE('a-a-a', '-', ':', 0).should.equal(error.value);
      text.SUBSTITUTE('a-a-a', '-', ':', 0.5).should.equal(error.value);
    });
  });

  it('T', function() {
    text.T(undefined).should.equal('');
    text.T(error.na).should.equal(error.na);
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
    text.TRIM(undefined).should.equal('');
    text.TRIM(error.na).should.equal(error.na);
    text.TRIM(' more  spaces ').should.equal('more spaces');
    text.TRIM(true).should.equal('true');
    text.TRIM(10).should.equal('10');
  });

  it('UNICHAR', function() {
    text.UNICHAR(undefined).should.equal(error.value);
    text.UNICHAR(error.na).should.equal(error.na);
    text.UNICHAR(65).should.equal("A");
    text.UNICHAR(255).should.equal("ÿ");
    text.UNICHAR(1000).should.equal("Ϩ");
  });

  it('UNICODE', function() {
    text.UNICODE(undefined).should.equal(error.value);
    text.UNICODE(error.na).should.equal(error.na);
    text.UNICODE('A').should.equal(65);
    text.UNICODE("Ϩ").should.equal(1000);
  });

  it('UPPER', function() {
    text.UPPER(undefined).should.equal('');
    text.UPPER(error.na).should.equal(error.na);
    text.UPPER('to upper case please').should.equal('TO UPPER CASE PLEASE');
    text.UPPER(true).should.equal('TRUE');
    text.UPPER(1).should.equal('1');
  });

  describe('VALUE', function(){
    it('should thrown an error in case of null, empty, error input', function(){
      text.VALUE(error.na).should.equal(error.na);
      text.VALUE('').should.equal(error.value);
      text.VALUE(null).should.equal(error.value);
      text.VALUE().should.equal(error.na);
    });

    it('should thrown an error in case of boolean input', function(){
      text.VALUE(true).should.equal(error.value);
    });

    it('should thrown an error in case of malformed input', function(){
      text.VALUE('SOMETEXT').should.equal(error.value);
      text.VALUE('2+2').should.equal(error.value);
      text.VALUE('3%22').should.equal(error.value);
      text.VALUE('3D22').should.equal(error.value);
      text.VALUE('SOMETEXT 42').should.equal(error.value);
    });

    it('should parse scientific notation string', function(){
      text.VALUE('10E3').should.equal(10000);
    });

    it('should parse percentage string', function(){
      text.VALUE('%12').should.equal(0.12);
      text.VALUE('12%').should.equal(0.12);
    });

    /**
     * Only supports thousands separator "," and decimal separator "."
     * 
     * These separators are not yet configurable. But the aim is not be as extensive as dedicated parsing library
     * such as Numeral.js or Numbro.
     */
    it('should parse a number as string', function(){
      text.VALUE('123.45').should.equal(123.45);
      text.VALUE('10,000').should.equal(10000);
      text.VALUE('1,210,000').should.equal(1210000);
      text.VALUE('11 000').should.equal(11000);
      text.VALUE('-3.14').should.equal(-3.14);
    });

    it('should parse dollar monetary string', function(){
      text.VALUE('$1000').should.equal(1000);
      text.VALUE('$11,000').should.equal(11000);
    });

    /**
     * These test cases illustrate permissive input cases. They do not mirror exactly Excel behaviors.
     */
    it('could be less permissive', function(){
      text.VALUE('EUR1000').should.equal(1000);
    });
  });
});
