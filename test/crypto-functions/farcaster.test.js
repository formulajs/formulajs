import { expect } from 'chai'
import sinon from 'sinon'
import { FARCASTER } from '../../src/crypto.js'
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'

describe('FARCASTER', () => {
  beforeEach(() => {
    global.window = { localStorage: { getItem: sinon.stub() } }
    global.fetch = sinon.stub()
  })

  afterEach(() => {
    sinon.restore()
    delete global.window
    delete global.fetch
  })

  it('should return INVALID_PARAM when required inputs are missing', async () => {
    const result = await FARCASTER()
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.message).to.match(/Required/)
    expect(result.functionName).to.equal('FARCASTER')
  })

  it('should return INVALID_PARAM when end exceeds MAX_PAGE_LIMIT', async () => {
    const result = await FARCASTER('posts', 'xyz', 0, 99999)
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.message).to.match(/"end" must be less than or equal to/)
    expect(result.functionName).to.equal('FARCASTER')
  })

  // it('should return MISSING_KEY if no API key in localStorage', async () => {
  //   window.localStorage.getItem.returns(null)
  //   const result = await FARCASTER('posts', 'xyz')
  //   expect(result.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY)
  //   expect(result.functionName).to.equal('FARCASTER')
  // })

  it('should return INVALID_PARAM for unsupported contentType', async () => {
    window.localStorage.getItem.returns('key')
    const result = await FARCASTER('unknown', 'xyz')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(result.message).to.match(/Invalid enum value/)
    expect(result.functionName).to.equal('FARCASTER')
  })

  it('should return NETWORK_ERROR when fetch status != 2xx', async () => {
    window.localStorage.getItem.returns('key')
    global.fetch.resolves({ ok: false, status: 500 })
    const result = await FARCASTER('posts', 'xyz')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
    expect(result.functionName).to.equal('FARCASTER')
  })

  it('should return RATE_LIMIT when status === 429', async () => {
    window.localStorage.getItem.returns('key')
    global.fetch.resolves({ ok: false, status: 429 })
    const result = await FARCASTER('posts', 'xyz')
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT)
    expect(result.functionName).to.equal('FARCASTER')
  })

  it('should return empty array if response.data is not an array', async () => {
    window.localStorage.getItem.returns('key')
    global.fetch.resolves({ ok: true, json: async () => ({ data: null }) })
    const result = await FARCASTER('posts', 'xyz')
    expect(result).to.deep.equal([])
  })

  it('should flatten response and append platform', async () => {
    window.localStorage.getItem.returns('key')
    global.fetch.resolves({
      ok: true,
      json: async () => ({ data: [{ id:1, text:'hi', extra:null, nested:{a:1} }] })
    })
    const result = await FARCASTER('posts', 'xyz')
    expect(result[0]).to.include({ id:1, text:'hi', platform:'farcaster' })
    expect(result[0]).to.not.have.property('nested')
  })


  it('should include start and end in query string', async () => {
    window.localStorage.getItem.returns('key')
    const fetchStub = global.fetch.resolves({ ok:true, json:async()=>({data:[]}) })
    await FARCASTER('posts','xyz',2,5)
    const url = new URL(fetchStub.firstCall.args[0])
    expect(url.searchParams.get('start')).to.equal('2')
    expect(url.searchParams.get('end')).to.equal('5')
  })
});
