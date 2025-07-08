import { expect } from 'chai'
import sinon from 'sinon'
import * as crypto from '../../src/crypto.js'
const { DEFILLAMA } = crypto
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'
import { SERVICES_API_KEY } from '../../src/crypto-constants.js'

describe('DEFILLAMA', () => {
  beforeEach(() => {
    global.window = { localStorage: { getItem: sinon.stub().returns('key') } }
    global.fetch = sinon.stub()
  })
  afterEach(() => sinon.restore())

  it('should return INVALID_PARAM when category missing', async () => {
    const res = await DEFILLAMA()
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('DEFILLAMA')
  })

  // it('should return MISSING_KEY when no API key', async () => {
  //   window.localStorage.getItem.returns(null)
  //   const res = await DEFILLAMA('protocols')
  //   expect(res.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY)
  //   expect(res.functionName).to.equal('DEFILLAMA')
  // })

  it('should return INVALID_PARAM for bad category', async () => {
    const res = await DEFILLAMA('foo')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('DEFILLAMA')
  })

  it('should return NETWORK_ERROR on HTTP error', async () => {
    global.fetch.resolves({ ok:false, status:500 })
    const res = await DEFILLAMA('protocols')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
        expect(res.apiKeyName).to.equal(SERVICES_API_KEY.Defillama)
  })
})
