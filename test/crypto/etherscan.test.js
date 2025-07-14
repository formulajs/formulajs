/* eslint-env mocha */

import { expect } from 'chai'
import sinon from 'sinon'
import { ETHERSCAN } from '../../src/crypto.js'
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'
import * as isAddressModule from '../../src/utils/is-address.js'
import * as fromEnsNameToAddress from '../../src/utils/from-ens-name-to-address.js'
import { ValidationError } from '../../src/utils/error-instances.js'


describe('ETHERSCAN', () => {
  beforeEach(() => {
    global.window = { localStorage: { getItem: sinon.stub() } }
    global.fetch = sinon.stub()
  })
  afterEach(() => sinon.restore())

  it('should return INVALID_PARAM when required args missing', async () => {
    const res = await ETHERSCAN()
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('ETHERSCAN')
  })

  it('should return INVALID_PARAM for unsupported chain', async () => {
    window.localStorage.getItem.returns('key')
    const res = await ETHERSCAN('gas','invalid','0x1')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('ETHERSCAN')
  })

  // it('should return MISSING_KEY when API key missing', async () => {
  //   window.localStorage.getItem.returns(null)
  //   const res = await ETHERSCAN('gas','ethereum','0x1')
  //   expect(res.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY)
  //   expect(res.functionName).to.equal('ETHERSCAN')
  // })

  it('should succeed for gas type', async () => {
    window.localStorage.getItem.returns('key')
    const tx = [{ dummy: true }]
    global.fetch.resolves({ ok: true, json: async () => ({ result: tx }) })
    const res = await ETHERSCAN('gas','ethereum')
    expect(res).to.deep.equal(tx)
  })

  it('should return RATE_LIMIT on HTTP 429', async () => {
    window.localStorage.getItem.returns('key')
    global.fetch.resolves({ ok: false, status: 429 })
    const res = await ETHERSCAN('gas','ethereum','0x1')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT)
    expect(res.functionName).to.equal('ETHERSCAN')
  })

    it('should return NETWORK_ERROR', async () => {
    window.localStorage.getItem.returns('key')
    global.fetch.resolves({ ok: false, status: 500 })
    const res = await ETHERSCAN('gas','ethereum','0x1')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
    expect(res.functionName).to.equal('ETHERSCAN')
  })

  it('should return DEFAULT when fetch throws error', async () => {
    window.localStorage.getItem.returns('key')
    global.fetch.rejects(new Error('fail'))
    const res = await ETHERSCAN('gas','ethereum','0x1')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT)
    expect(res.functionName).to.equal('ETHERSCAN')
  })
    it('should return ENS error if address is ENS and resolution fails', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default, 'isAddress').returns(false);
    sinon.stub(fromEnsNameToAddress.default,  'validateAndGetAddress').throws(new ValidationError("Invalid address"));

    const result = await ETHERSCAN('all-txns', 'ethereum', 'vitalik.eth');
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM);
    expect(result.functionName).to.equal('ETHERSCAN');
  });


    it('should resolve successfully with right ens name', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default, 'isAddress').returns(false)
    sinon.stub(fromEnsNameToAddress.default, 'validateAndGetAddress').resolves('0xjoshua')
    const responseJson = ['data']
    global.fetch.resolves({ ok: true, json: async () => ({ result: responseJson }) })

    const result = await ETHERSCAN('all-txns', 'ethereum', 'vitalik.eth')
    expect(result).to.deep.equal(responseJson)
  })
})
