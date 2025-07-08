/* eslint-env mocha */

import { expect } from 'chai'
import sinon from 'sinon'
import { BLOCKSCOUT } from '../../src/crypto.js'
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'
import * as fromEnsNameToAddress from '../../src/utils/from-ens-name-to-address.js'
import * as isAddressModule from '../../src/utils/is-address.js'
import { ValidationError } from '../../src/utils/error-instances.js'

describe('BLOCKSCOUT', () => {
  beforeEach(() => {
    global.window = { localStorage: { getItem: sinon.stub() } }
    global.fetch = sinon.stub()
  })

  afterEach(() => {
    sinon.restore()
    delete global.window
    delete global.fetch
  })

  it('should return INVALID_PARAM when address or type is missing', async () => {
    const result = await BLOCKSCOUT()
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.functionName).to.equal('BLOCKSCOUT')
  })

  it('should return INVALID_PARAM when offset exceeds MAX_PAGE_LIMIT', async () => {
    const result = await BLOCKSCOUT('0xabc', 'txns', 'ethereum', undefined, undefined, 1, 99999)
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.functionName).to.equal('BLOCKSCOUT')
  })

  it('should return INVALID_PARAM for unsupported chain', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    const result = await BLOCKSCOUT('0xabc', 'txns', 'fakechain')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.functionName).to.equal('BLOCKSCOUT')
  })

  it('should return INVALID_PARAM for unsupported type', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    const result = await BLOCKSCOUT('0xabc', 'invalid', 'ethereum')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.functionName).to.equal('BLOCKSCOUT')
  })

  it('should return ENS error if ENS resolution fails', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(false)
    sinon.stub(fromEnsNameToAddress.default, 'validateAndGetAddress').throws(new ValidationError("Invalid address"));

    const result = await BLOCKSCOUT('vitalik.eth', 'txns', 'ethereum')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.functionName).to.equal('BLOCKSCOUT')
  })


  it('should return NETWORK_ERROR when fetch response status != 2xx', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
   global.fetch.resolves({ ok: false, status: 503 })

    const result = await BLOCKSCOUT('0xabc', 'txns', 'ethereum')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
    expect(result.message).to.include('503')
    expect(result.functionName).to.equal('BLOCKSCOUT')
  })

  it('should return DEFAULT error if fetch throws', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    global.fetch.rejects(new Error('Boom'))

    const result = await BLOCKSCOUT('0xabc', 'txns', 'ethereum')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT)
    expect(result.reason).to.equal('Boom')
    expect(result.functionName).to.equal('BLOCKSCOUT')
  })

  it('should return stat array on success', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    const responseJson = { transaction_count: '1' }
    global.fetch.resolves({ ok: true, json: async () => responseJson })

    const result = await BLOCKSCOUT('0xabc', 'stat', 'ethereum')
    expect(result).to.deep.equal([responseJson])
  })

  it('should return txns array on success', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    const txns = [{ blockNumber: '1' }]
    global.fetch.resolves({ ok: true, json: async () => ({ result: txns }) })

    const result = await BLOCKSCOUT('0xabc', 'txns', 'ethereum')
    expect(result).to.deep.equal(txns)
  })

  it('should return INVALID_PARAM if result includes "Invalid parameter(s)"', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    global.fetch.resolves({ ok: true, json: async () => ({ result: 'Invalid parameter(s)' }) })

    const result = await BLOCKSCOUT('0xabc', 'txns', 'ethereum')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.message).to.equal('Invalid parameters')
  })

  it('should return INVALID_PARAM if result includes "Not found"', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    global.fetch.resolves({ ok: true, json: async () => ({ result: 'Not found' }) })

    const result = await BLOCKSCOUT('0xabc', 'txns', 'ethereum')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.message).to.equal('Address information not found')
  })

  it('should convert date strings in MM/DD/YYYY to UNIX timestamps', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    const fetchStub = global.fetch.resolves({ ok: true, json: async () => ({ result: [] }) })

    await BLOCKSCOUT('0xabc', 'txns', 'ethereum', '01/01/2023', '31/12/2023')

    const url = new URL(fetchStub.firstCall.args[0])
    expect(+url.searchParams.get('start_timestamp')).to.be.a('number')
    expect(+url.searchParams.get('end_timestamp')).to.be.a('number')
  })

  it('should default chain to "ethereum" when omitted', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    const fetchStub = global.fetch.resolves({ ok: true, json: async () => ({ result: [] }) })

    await BLOCKSCOUT('0xabc', 'txns')

    const url = new URL(fetchStub.firstCall.args[0])
    expect(url.hostname).to.equal('eth.blockscout.com')
  })

  it('should include correct page and offset in query string', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    const fetchStub = global.fetch.resolves({ ok: true, json: async () => ({ result: [] }) })

    await BLOCKSCOUT('0xabc', 'txns', 'ethereum', undefined, undefined, 3, 50)

    const url = new URL(fetchStub.firstCall.args[0])
    expect(url.searchParams.get('page')).to.equal('3')
    expect(url.searchParams.get('offset')).to.equal('50')
  })

  it('should fallback to default startTimestamp if not provided', async () => {
    sinon.stub(isAddressModule.default, 'isAddress').returns(true)
    const nowStub = sinon.stub(Date, 'now').returns(1700000000000)
    const fetchStub = global.fetch.resolves({ ok: true, json: async () => ({ result: [] }) })

    await BLOCKSCOUT('0xabc', 'txns', 'ethereum')

    const url = new URL(fetchStub.firstCall.args[0])
    const expectedStart = Math.floor((1700000000000 - 30 * 24 * 3600 * 1000) / 1000).toString()
    expect(url.searchParams.get('start_timestamp')).to.equal(expectedStart)

    nowStub.restore()
  })
});
