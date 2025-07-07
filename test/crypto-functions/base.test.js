import { expect } from 'chai'
import sinon from 'sinon'
import { BASE } from '../../src/crypto.js'
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'
import * as isAddressModule from '../../src/utils/is-address.js'
import * as fromEnsNameToAddress from '../../src/utils/from-ens-name-to-address.js'
import { SERVICES_API_KEY } from '../../src/crypto-constants.js'

describe('BASE', () => {
  beforeEach(() => {
    global.window = { localStorage: { getItem: sinon.stub() } }
    global.fetch = sinon.stub()
  })
  afterEach(() => sinon.restore())

  it('should return INVALID_PARAM when type is missing', async () => {
    const res = await BASE()
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('BASE')
  })

  it('should return INVALID_PARAM when address is missing for txns types', async () => {
    window.localStorage.getItem.returns('key')
    const res = await BASE('all-txns')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('BASE')
  })

  it('should succeed for gas without address', async () => {
    window.localStorage.getItem.returns('key')
    const responseJson = [{gas: 1111}]
    global.fetch.resolves({ ok: true, json: async () => ({result: responseJson})  })

    const res = await BASE('gas')
    expect(res).to.deep.equal(responseJson)
  })

  it('should return MISSING_KEY when no API key', async () => {
    window.localStorage.getItem.returns(null)
    const res = await BASE('gas')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY)
    expect(res.functionName).to.equal('BASE')
  })

  it('should return INVALID_PARAM when limit exceeds MAX_PAGE_LIMIT', async () => {
    window.localStorage.getItem.returns('key')
    const res = await BASE('all-txns','0x1',undefined,undefined,1,99999)
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('BASE')
  })


  it('should return ENS error if address is ENS and resolution fails', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default, 'isAddress').returns(false);
    sinon.stub(fromEnsNameToAddress.default, 'fromEnsNameToAddress').resolves(null);

    const result = await BASE('all-txns', 'vitalik.eth');
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.ENS);
    expect(result.functionName).to.equal('BASE');
  });


    it('should resolve successfully with right ens name', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default, 'isAddress').returns(false)
    sinon.stub(fromEnsNameToAddress.default, 'fromEnsNameToAddress').resolves('0xjoshua')
    const responseJson = ['data']
    global.fetch.resolves({ ok: true, json: async () => ({ result: responseJson }) })

    const result = await BASE('all-txns', 'vitalik.eth')
    expect(result).to.deep.equal(responseJson)
  })

  it('should return NETWORK_ERROR when fetch response status != 2xx', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    global.fetch.resolves({ ok: false, status: 502 })

    const result = await BASE('all-txns', '0xabc', '01/01/2023', '01/02/2023', 1, 10)
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
    expect(result.functionName).to.equal('BASE')
    expect(result.apiKeyName).to.equal(SERVICES_API_KEY.Basescan)
  })


    it('should return INVALID_API_KEY when API key is invalid', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    global.fetch.resolves({ ok: true, json: async () => ({ result: 'Invalid API Key' }) })

    const result = await BASE('gas')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_API_KEY)
    expect(result.functionName).to.equal('BASE')
    expect(result.apiKeyName).to.equal(SERVICES_API_KEY.Basescan)
  })

    it('should return RATE_LIMIT when rate limit reached', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    global.fetch.resolves({ ok: true, json: async () => ({ result: 'Max rate limit reached' }) })

    const result = await BASE('gas')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT)
    expect(result.functionName).to.equal('BASE')
        expect(result.apiKeyName).to.equal(SERVICES_API_KEY.Basescan)
  })

  it('should return RATE_LIMIT when network status is 429', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    global.fetch.resolves({ ok: false, status: 429 })

    const result = await BASE('gas')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT)
    expect(result.functionName).to.equal('BASE')
        expect(result.apiKeyName).to.equal(SERVICES_API_KEY.Basescan)
  })


})
