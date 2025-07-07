/* eslint-env mocha */
import { expect } from 'chai';
import sinon from 'sinon';
import { SAFE } from '../../src/crypto.js';
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js';
import * as isAddressUtil from '../../src/utils/is-address.js';
import * as fromEnsNameToAddressUtil from '../../src/utils/from-ens-name-to-address.js';
import { SERVICES_API_KEY } from '../../src/crypto-constants.js';


describe('SAFE', () => {
  beforeEach(() => {
    global.window = { localStorage: { getItem: sinon.stub() } }
    global.fetch = sinon.stub()
  })
  afterEach(() => sinon.restore())

  it('should return INVALID_PARAM when required args missing', async () => {
    const res = await SAFE()
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('SAFE')
  })

  it('should return MISSING_KEY when no API key', async () => {
    window.localStorage.getItem.returns(null)
    const res = await SAFE('0x1','txns','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY)
    expect(res.functionName).to.equal('SAFE')
  })

  it('should return INVALID_PARAM for bad utility', async () => {
    window.localStorage.getItem.returns('key')
    const res = await SAFE('0x1','balance','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('SAFE')
  })

  it('should return INVALID_PARAM for bad chain', async () => {
    window.localStorage.getItem.returns('key')
    const res = await SAFE('0x1','txns','foo')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('SAFE')
  })

  it('should return INVALID_PARAM when offset > MAX_PAGE_LIMIT', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressUtil.default,'isAddress').returns(true)
    const res = await SAFE('0x1','txns','ethereum',9999,0)
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('SAFE')
  })

  it('should return ENS_ERROR if ENS resolution fails', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressUtil.default,'isAddress').returns(false)
    sinon.stub(fromEnsNameToAddressUtil.default,'fromEnsNameToAddress').resolves(null)
    const res = await SAFE('vitalik.eth','txns','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.ENS)
            expect(res.functionName).to.equal('SAFE')
  })

  it('should return NETWORK_ERROR on HTTP error', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressUtil.default,'isAddress').returns(true)
    global.fetch.resolves({ ok:false,status:500 })
    const res = await SAFE('0x1','txns','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
    expect(res.apiKeyName).to.equal(SERVICES_API_KEY.Safe)
  })

    it('should return RATE_LIMIT on HTTP 429 error', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressUtil.default,'isAddress').returns(true)
    global.fetch.resolves({ ok:false,status:429 })
    const res = await SAFE('0x1','txns','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT)
  })

  it('should return DEFAULT if fetch throws error', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressUtil.default,'isAddress').returns(true)
    global.fetch.rejects(new Error('fail'))
    const res = await SAFE('0x1','txns','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT)
  })

  it('should return flattened txns for valid response', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressUtil.default,'isAddress').returns(true)
    const fakeRes = { results: [ { id:1, confirmations:[], dataDecoded:{}, extra: 'x' } ] }
    global.fetch.resolves({ ok:true, json:async()=>fakeRes })
    const res = await SAFE('0x1','txns','ethereum',10,0)
    expect(res).to.deep.equal([ { id:1, extra:'x' } ])
  })
      it('should resolve successfully with right ens name', async () => {
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressUtil.default, 'isAddress').returns(false)
    sinon.stub(fromEnsNameToAddressUtil.default, 'fromEnsNameToAddress').resolves('0xjoshua')
    const responseJson = [{b:'data'}]
    global.fetch.resolves({ ok: true, json: async () => ({ results: responseJson }) })



    const result =  await SAFE('biggy','txns','ethereum')
    expect(result).to.deep.equal(responseJson)
  })
})
