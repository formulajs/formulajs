import { expect } from 'chai'
import sinon from 'sinon'
import { COINGECKO } from '../../src/crypto.js'
import { ERROR_MESSAGES_FLAG, SERVICES_API_KEY } from '../../src/utils/constants.js'


describe('COINGECKO', () => {
  beforeEach(() => { global.window={localStorage:{getItem:sinon.stub()}}; global.fetch=sinon.stub() })
  afterEach(()=>sinon.restore())

  it('should return INVALID_PARAM when category missing', async()=>{
    const res=await COINGECKO();
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
    expect(res.functionName).to.equal('COINGECKO')
  })

  // it('should return MISSING_KEY when no API key', async()=>{
  //   window.localStorage.getItem.returns(null)
  //   const res=await COINGECKO('price','btc')
  //   expect(res.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY)
  //   expect(res.functionName).to.equal('COINGECKO')
  // })

  it('should return INVALID_PARAM for bad category', async()=>{
    window.localStorage.getItem.returns('key')
    const res=await COINGECKO('foo','x')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(res.functionName).to.equal('COINGECKO')
  })

  it('should return RATE_LIMIT on HTTP 429', async()=>{
    window.localStorage.getItem.returns('key')
    global.fetch.resolves({ ok:false,status:429,json:async()=>({}) })
    const res=await COINGECKO('price','btc')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT)
    expect(res.apiKeyName).to.equal(SERVICES_API_KEY.Coingecko)
  })

  it('should return DEFAULT on fetch throw', async()=>{
    window.localStorage.getItem.returns('key')
    global.fetch.rejects(new Error('fail'))
    const res=await COINGECKO('price','btc')
    expect(res.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT)
  })

  it('should map price correctly', async()=>{
    window.localStorage.getItem.returns('key')
    global.fetch.resolves({ ok:true, json:async()=>({ btc:{usd:10,eur:9},eth:{usd:5} }) })
    const res=await COINGECKO('price','btc','eur')
    expect(res).to.deep.equal([ { Btc_EUR:9,  Btc_USD: 10,
      Eth_USD: 5 } ])
  })

  it('should flatten market data array', async()=>{
    window.localStorage.getItem.returns('key')
    const arr=[{id:'a',nested:{x:1},vol:100}]
    global.fetch.resolves({ ok:true, json:async()=>arr })
    const res=await COINGECKO('market','all')
    expect(res).to.deep.equal([{ id:'a',vol:100 }])
  })
  it('should return NETWORK_ERROR when fetch response status != 2xx', async () => {
  window.localStorage.getItem.returns('key')
  global.fetch.resolves({ ok: false, status: 502, json: async() => ({}) })

  const result = await COINGECKO('price','btc','eur')
  expect(result.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR)
  expect(result.functionName).to.equal('COINGECKO')
  expect(result.apiKeyName).to.equal(SERVICES_API_KEY.Coingecko)
})
})
