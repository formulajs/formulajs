import { expect } from 'chai'
import sinon from 'sinon'
import * as crypto from '../../src/crypto.js'
const { UNISWAP } = crypto
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'

describe('UNISWAP', () => {
  beforeEach(() => {
    global.window = { localStorage: { getItem: sinon.stub() } }
    global.fetch = sinon.stub()
  })
  afterEach(() => sinon.restore())

  it('should return INVALID_PARAM when required args missing', async () => {
    const res = await UNISWAP()
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('UNISWAP')
  })

  it('should return INVALID_PARAM for unsupported graphType', async () => {
    const res = await UNISWAP('v2','tokens','0x123')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
  })

  it('should return INVALID_PARAM for unsupported category', async () => {
    const res = await UNISWAP('v3','pools','0x123')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
  })

  it('should return NETWORK_ERROR when HTTP status != 2xx', async () => {
    global.fetch.resolves({ ok: false, status: 500 })
    const res = await UNISWAP('v3','tokens','0x123')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
    expect(res.functionName).to.equal('UNISWAP')
  })

  it('should return DEFAULT if fetch throw error', async () => {
    global.fetch.rejects(new Error('fail'))
    const res = await UNISWAP('v3','markets','0x123')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT)
    expect(res.functionName).to.equal('UNISWAP')
  })

  it('should flatten array response', async () => {
    const data = [
      { id: '1', nested: { x: 1 }, value: 10 }
    ]
    global.fetch.resolves({ ok: true, json: async () => data })
    const res = await UNISWAP('v3','tokens','0x123')
    expect(res).to.deep.equal([{ id: '1', value: 10 }])
  })
})
