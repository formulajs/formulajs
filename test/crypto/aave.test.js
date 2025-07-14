import { expect } from 'chai'
import sinon from 'sinon'
import * as crypto from '../../src/crypto.js'
const { AAVE } = crypto
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'

describe('AAVE', () => {
  beforeEach(() => {
    global.window = { localStorage: { getItem: sinon.stub() } }
    global.fetch = sinon.stub()
  })

  afterEach(() => sinon.restore())

  it('should return INVALID_PARAM when required args missing', async () => {
    const res = await AAVE()
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('AAVE')
  })

  it('should return INVALID_PARAM for unsupported graphType', async () => {
    const res = await AAVE('v1','tokens','0x123')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
  })

  it('should return INVALID_PARAM for unsupported category', async () => {
    const res = await AAVE('v2','pools','0x123')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
  })

  it('should return NETWORK_ERROR when HTTP status != 2xx', async () => {
    global.fetch.resolves({ ok: false, status: 502, json: async () => ({}) })
    const res = await AAVE('v2','tokens','0x123')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
    expect(res.functionName).to.equal('AAVE')
  })

  it('should return DEFAULT if fetch throw error', async () => {
    global.fetch.rejects(new Error('fail'))
    const res = await AAVE('v2','markets','0x123')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT)
    expect(res.functionName).to.equal('AAVE')
  })

  it('should flatten array response', async () => {
    const data = [{ id: '1', nested: { x: 1 }, value: 42 }]
    global.fetch.resolves({ ok: true, json: async () => data })
    const res = await AAVE('v2','tokens','0x123')
    expect(res).to.deep.equal([{ id: '1', value: 42 }])
  })
})
