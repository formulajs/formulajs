import { expect } from 'chai'
import sinon from 'sinon'
import * as crypto from '../../src/crypto.js'
const { EOA } = crypto
import { ERROR_MESSAGES_FLAG, SERVICES_API_KEY } from '../../src/utils/constants.js'
import * as isAddressModule from '../../src/utils/is-address.js'
import * as fromEnsNameUtil from '../../src/utils/from-ens-name-to-address.js'
import * as fromTimeStampToBlockUtil from '../../src/utils/from-timestamp-to-block.js';
import { ValidationError } from '../../src/utils/error-instances.js'


describe('EOA', () => {
  beforeEach(() => { global.window={localStorage:{getItem:sinon.stub()}}; global.fetch=sinon.stub() })
  afterEach(()=>sinon.restore())

  it('should return INVALID_PARAM when required args missing', async()=>{
    const res=await EOA()
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('EOA')
  })

  // it('should return MISSING_KEY when no API key', async()=>{
  //   window.localStorage.getItem.returns(null)
  //   const res=await EOA('0x1','balance','ethereum')
  //   expect(res.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY)
  //       expect(res.functionName).to.equal('EOA')
  // })

  it('should return INVALID_PARAM for invalid chain', async()=>{
    window.localStorage.getItem.returns('key')
    const res=await EOA('0x1','balance','foo')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('EOA')

  })

  it('should return INVALID_PARAM when offset exceeds MAX_PAGE_LIMIT', async()=>{
    window.localStorage.getItem.returns('key')
    const res=await EOA('0x1','balance','ethereum',undefined,undefined,1,99999)
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('EOA')
  })

  it('should return INVALID_PARAM when startTime/endTime missing for txns', async()=>{
    window.localStorage.getItem.returns('key')
    const res=await EOA('0x1','txns','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('EOA')
  })

  it('should return ENS error if ENS resolution fails', async()=>{
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default,'isAddress').returns(false)
    sinon.stub(fromEnsNameUtil.default,'validateAndGetAddress').throws(new ValidationError("Invalid address"));
    const res=await EOA('vitalik.eth','balance','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('EOA')
  })

  it('should return NETWORK_ERROR on HTTP error', async()=>{
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default,'isAddress').returns(true)
    global.fetch.resolves({ ok:false,status:502 })
    const res=await EOA('0x1','balance','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
        expect(res.functionName).to.equal('EOA')
            expect(res.apiKeyName).to.equal(SERVICES_API_KEY.Etherscan)
  })
    it('should return RATE_LIMIT on HTTP error', async()=>{
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default,'isAddress').returns(true)
    global.fetch.resolves({ ok:false,status:429 })
    const res=await EOA('0x1','balance','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT)
        expect(res.functionName).to.equal('EOA')
            expect(res.apiKeyName).to.equal(SERVICES_API_KEY.Etherscan)
  })
      it('should return RATE_LIMIT on custom rate limit message', async()=>{
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default,'isAddress').returns(true)
    global.fetch.resolves({ ok:true, json: async() => ({result: 'Max rate limit reached' })})
    const res=await EOA('0x1','balance','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT)
    expect(res.functionName).to.equal('EOA')
    expect(res.apiKeyName).to.equal(SERVICES_API_KEY.Etherscan)
  })

  it('should return DEFAULT when fetch throw error', async()=>{
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default,'isAddress').returns(true)
    global.fetch.rejects(new Error('fail'))
    const res=await EOA('0x1','balance','ethereum')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT)
        expect(res.functionName).to.equal('EOA')
  })

  it('should return balance array for balance category', async()=>{
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default,'isAddress').returns(true)
    global.fetch.resolves({ ok:true, json:async()=>({ result:[{token:'T',balance:1}] }) })
    const res=await EOA('0x1','balance','ethereum')
    expect(res).to.deep.equal([{ chain:'ethereum', address:'0x1', name:null, token:'T', balance:1 }])
  })

  it('should return txns array for txns category', async()=>{
    window.localStorage.getItem.returns('key')
    sinon.stub(isAddressModule.default,'isAddress').returns(true)
    // stub timestamp to block
    sinon.stub(fromTimeStampToBlockUtil.default,'fromTimeStampToBlock').resolves(100)
    global.fetch.resolves({ ok:true, json:async()=>({ result:[{hash:'0xabc'}] }) })
    const res=await EOA('0x1','txns','ethereum','01/01/2024','01/02/2024',1,10)
    expect(res).to.deep.equal([{ chain:'ethereum', address:'0x1', name:null, hash:'0xabc' }])
  })
})
