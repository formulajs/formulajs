import {expect} from "chai";
import * as dateTime from "../../src/date-time.js";
import * as dateUtils from "../../src/utils/date.js";
import {useDate} from "../../src/utils/date.js";

describe('Date & Time utils', () => {
  beforeEach(() => {
    useDate();
  })

  describe('FormulaJs default behavior', () => {
    it('should return plain JS Date Object', () => {
      expect(dateTime.DATEVALUE('1/1/1900')).to.deep.equal(new Date(1900, 0, 1))
    });

    it('should return serial number using a useSerial util switch', () => {
      dateUtils.useSerial();

      expect(dateTime.DATE(1900, 1, 1)).to.equal(1)
      expect(dateTime.DATEVALUE('1/1/1900')).to.equal(1)
    });
  })

  describe('dateToSerial ', () => {
    it('should convert JS Date to Serial', () => {
      expect(dateUtils.dateToSerial(new Date(1900, 0, 1))).to.equal(1)
    })
  })

  describe('serialToDate ', () => {
    it('should convert Serial to JS Date', () => {
      expect(dateUtils.serialToDate(1)).to.deep.equal(new Date(1900, 0, 1))
    })
  })
});
