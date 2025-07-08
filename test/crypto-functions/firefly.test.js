/* eslint-env mocha */

import { expect } from 'chai';
import sinon from 'sinon';
import { FIREFLY } from '../../src/crypto.js';
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js';

describe('FIREFLY', () => {
  beforeEach(() => {
    global.window = {
      localStorage: {
        getItem: sinon.stub(),
      },
    };
    global.fetch = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
    delete global.window;
    delete global.fetch;
  });

  it('should return INVALID_PARAM when required inputs are missing', async () => {
    const result = await FIREFLY();
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM);
    expect(result.message).to.match(/Invalid discriminator value/);
    expect(result.functionName).to.equal('FIREFLY');
  });


  // it('should return MISSING_KEY error if no API key in localStorage', async () => {
  //   window.localStorage.getItem.returns(null);
  //   const result = await FIREFLY('farcaster', 'posts', 'xyz');
  //   expect(result.type).to.equal(ERROR_MESSAGES_FLAG.MISSING_KEY);
  //   expect(result.functionName).to.equal('FIREFLY');
  // });

  it('should return INVALID_PARAM for unsupported platform', async () => {
    window.localStorage.getItem.returns('dummy-key');
    const result = await FIREFLY('twitter', 'posts', 'xyz');
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM);
    expect(result.message).to.match(/Invalid discriminator value/);
    expect(result.functionName).to.equal('FIREFLY');
  });

  it('should return INVALID_PARAM for unsupported contentType', async () => {
    window.localStorage.getItem.returns('dummy-key');
    const result = await FIREFLY('lens', 'channels', 'xyz');
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM);
    expect(result.message).to.match(/Invalid enum value/);
    expect(result.functionName).to.equal('FIREFLY');
  });

  it('should return NETWORK_ERROR when fetch response status != 2xx', async () => {
    window.localStorage.getItem.returns('dummy-key');
    global.fetch.resolves({ ok: false, status: 500 });

    const result = await FIREFLY('lens', 'posts', 'xyz');
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.NETWORK_ERROR);
    expect(result.apiKeyName).to.equal('Firefly');
    expect(result.functionName).to.equal('FIREFLY');
  });

  it('should return RATE_LIMIT when status === 429', async () => {
    window.localStorage.getItem.returns('dummy-key');
    global.fetch.resolves({ ok: false, status: 429 });

    const result = await FIREFLY('lens', 'posts', 'xyz');
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.RATE_LIMIT);
    expect(result.apiKeyName).to.equal('Firefly');
    expect(result.functionName).to.equal('FIREFLY');
  });

  it('should return empty array if response.data is not an array', async () => {
    window.localStorage.getItem.returns('dummy-key');
    global.fetch.resolves({
      ok: true,
      json: async () => ({ data: null }),
    });

    const result = await FIREFLY('lens', 'posts', 'xyz');
    expect(result).to.deep.equal([]);
  });

  it('should flatten response and append platform field', async () => {
    window.localStorage.getItem.returns('dummy-key');
    global.fetch.resolves({
      ok: true,
      json: async () => ({
        data: [{ id: 1, text: 'hello', meta: { deep: 'ignore' }, extra: null }],
      }),
    });

    const result = await FIREFLY('farcaster', 'posts', 'xyz');
    expect(result).to.be.an('array').with.lengthOf(1);
    expect(result[0]).to.include({ id: 1, text: 'hello', platform: 'farcaster' });
    expect(result[0]).to.not.have.property('meta');
  });

  it('should catch fetch error and return DEFAULT error', async () => {
    window.localStorage.getItem.returns('dummy-key');
    global.fetch.rejects(new Error('Network failed'));

    const result = await FIREFLY('lens', 'posts', 'abc');
    expect(result.type).to.equal(ERROR_MESSAGES_FLAG.DEFAULT);
    expect(result.message).to.equal('An unexpected error occured');
    expect(result.reason).to.equal('Network failed');
    expect(result.functionName).to.equal('FIREFLY');
  });

  it('should include start and end in query string', async () => {
    window.localStorage.getItem.returns('key');
    const fetchStub =     global.fetch.resolves({
      ok: true,
      json: async () => ({ data: [] }),
    });

    await FIREFLY('farcaster', 'posts', 'abc', 5, 9);
    const url = new URL(fetchStub.firstCall.args[0]);
    expect(url.searchParams.get('start')).to.equal('5');
    expect(url.searchParams.get('end')).to.equal('9');
  });
});
