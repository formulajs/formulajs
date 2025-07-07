/* eslint-env mocha */
import { expect } from 'chai'
import sinon from 'sinon'
import * as crypto from '../../src/crypto.js'
const { NEYNAR } = crypto
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'
import * as fromUsernameToFidUtil from '../../src/utils/from-username-to-fid.js'

describe('NEYNAR', () => {
  beforeEach(() => {
    global.window = {
      localStorage: { getItem: sinon.stub().returns('api_key') }
    }
    global.fetch = sinon.stub()
  })

  afterEach(() => sinon.restore())

  it('should return INVALID_PARAM when username is missing', async () => {
    const res = await NEYNAR()
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('NEYNAR')
  })

  it('should return MISSING_KEY when no API key', async () => {
    window.localStorage.getItem.returns(null)
    const res = await NEYNAR('alice')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY)
    expect(res.functionName).to.equal('NEYNAR')
  })

  it('should return INVALID_PARAM when fid resolution fails', async () => {
    sinon.stub(fromUsernameToFidUtil.default, 'fromUsernameToFid').resolves(null)
    const res = await NEYNAR('nonexistent')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('NEYNAR')
  })

  it('should return NETWORK_ERROR when fetch response is not ok', async () => {
    sinon.stub(fromUsernameToFidUtil.default, 'fromUsernameToFid').resolves('fid123')
    global.fetch.resolves({ ok: false, status: 503 })
    const res = await NEYNAR('testuser')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
    expect(res.functionName).to.equal('NEYNAR')
  })

  it('should return DEFAULT error when fetch throws error', async () => {
    sinon.stub(fromUsernameToFidUtil.default, 'fromUsernameToFid').resolves('fid123')
    global.fetch.rejects(new Error('Boom'))
    const res = await NEYNAR('testuser')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT)
    expect(res.functionName).to.equal('NEYNAR')
    expect(res.reason).to.equal('Boom')
  })

  it('should return empty array when no users in response', async () => {
    sinon.stub(fromUsernameToFidUtil.default, 'fromUsernameToFid').resolves('fid123')
    global.fetch.resolves({ ok: true, json: async () => ({ users: [] }) })
    const res = await NEYNAR('alice')
    expect(res).to.deep.equal([])
  })

  it('should map users correctly when response contains data', async () => {
    sinon.stub(fromUsernameToFidUtil.default, 'fromUsernameToFid').resolves('fid123')
    const users = [
      { user: { username: 'bob', custody_address: '0x1', follower_count: 10, profile: { location: { address: { country: 'US', city: 'NY' } } } } },
      { user: { username: 'carol', custody_address: '0x2', follower_count: 5 } }
    ]
    global.fetch.resolves({ ok: true, json: async () => ({ users }) })
    const res = await NEYNAR('alice')
    expect(res).to.deep.equal([
      { username: 'bob', custody_address: '0x1', follower_count: 10, country: 'US', city: 'NY' },
      { username: 'carol', custody_address: '0x2', follower_count: 5, country: '', city: '' }
    ])
  })
})
