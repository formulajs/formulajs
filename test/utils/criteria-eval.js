import { expect } from 'chai'

import * as criteriaEval from '../../src/utils/criteria-eval.js'

describe('Utils => criteria eval', () => {
  it('parse', () => {
    expect(criteriaEval.parse('')).to.deep.equal([])
    expect(criteriaEval.parse('test')).to.deep.equal([
      { type: 'operator', value: '=' },
      { type: 'literal', value: 'test' }
    ])
    expect(criteriaEval.parse('10')).to.deep.equal([
      { type: 'operator', value: '=' },
      { type: 'literal', value: 10 }
    ])
    expect(criteriaEval.parse('=10')).to.deep.equal([
      { type: 'operator', value: '=' },
      { type: 'literal', value: 10 }
    ])
    expect(criteriaEval.parse('<10')).to.deep.equal([
      { type: 'operator', value: '<' },
      { type: 'literal', value: 10 }
    ])
    expect(criteriaEval.parse('<=10')).to.deep.equal([
      { type: 'operator', value: '<=' },
      { type: 'literal', value: 10 }
    ])
    expect(criteriaEval.parse('<>10')).to.deep.equal([
      { type: 'operator', value: '<>' },
      { type: 'literal', value: 10 }
    ])
    expect(criteriaEval.parse('>10')).to.deep.equal([
      { type: 'operator', value: '>' },
      { type: 'literal', value: 10 }
    ])
    expect(criteriaEval.parse('>=10')).to.deep.equal([
      { type: 'operator', value: '>=' },
      { type: 'literal', value: 10 }
    ])
    expect(criteriaEval.parse('==10')).to.deep.equal([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '==10' }
    ])
    expect(criteriaEval.parse('==10>')).to.deep.equal([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '==10>' }
    ])
    expect(criteriaEval.parse('>test')).to.deep.equal([
      { type: 'operator', value: '>' },
      { type: 'literal', value: 'test' }
    ])
    expect(criteriaEval.parse('>=test')).to.deep.equal([
      { type: 'operator', value: '>=' },
      { type: 'literal', value: 'test' }
    ])
    expect(criteriaEval.parse('<=test')).to.deep.equal([
      { type: 'operator', value: '<=' },
      { type: 'literal', value: 'test' }
    ])
    expect(criteriaEval.parse('==test')).to.deep.equal([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '==test' }
    ])
    expect(criteriaEval.parse('`')).to.deep.equal([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '`' }
    ])
    expect(criteriaEval.parse('!@#$%^&*()_+')).to.deep.equal([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '!@#$%^&*()_+' }
    ])
    expect(criteriaEval.parse('>!@#$%^&*()_+')).to.deep.equal([
      { type: 'operator', value: '>' },
      { type: 'literal', value: '!@#$%^&*()_+' }
    ])
    expect(criteriaEval.parse('>=!@#$%^&*()_+')).to.deep.equal([
      { type: 'operator', value: '>=' },
      { type: 'literal', value: '!@#$%^&*()_+' }
    ])
  })

  it('parse', () => {
    try {
      criteriaEval.createToken('test')
    } catch (ex) {
      expect(ex.message).to.equal('Unsupported token type: undefined')
    }

    try {
      criteriaEval.createToken('test', 'operatorr')
    } catch (ex) {
      expect(ex.message).to.equal('Unsupported token type: operatorr')
    }

    try {
      criteriaEval.createToken('test', 'literall')
    } catch (ex) {
      expect(ex.message).to.equal('Unsupported token type: literall')
    }

    expect(criteriaEval.createToken('test', 'operator')).to.deep.equal({ type: 'operator', value: 'test' })
    expect(criteriaEval.createToken('test', 'literal')).to.deep.equal({ type: 'literal', value: 'test' })
  })

  it('compute', () => {
    expect(
      criteriaEval.compute([
        { type: 'literal', value: '1' },
        { type: 'operator', value: '>' },
        { type: 'literal', value: '1' }
      ])
    ).to.equal(false)

    expect(
      criteriaEval.compute([
        { type: 'literal', value: '1' },
        { type: 'operator', value: '>=' },
        { type: 'literal', value: '1' }
      ])
    ).to.equal(true)

    expect(
      criteriaEval.compute([
        { type: 'literal', value: '3' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '1' }
      ])
    ).to.equal(false)

    expect(
      criteriaEval.compute([
        { type: 'literal', value: 'test' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: 'test' }
      ])
    ).to.equal(true)

    expect(
      criteriaEval.compute([
        { type: 'literal', value: 'a' },
        { type: 'operator', value: '>' },
        { type: 'literal', value: 'b' }
      ])
    ).to.equal(false)

    expect(
      criteriaEval.compute([
        { type: 'literal', value: 'z' },
        { type: 'operator', value: '>' },
        { type: 'literal', value: 'b' }
      ])
    ).to.equal(true)

    // Multiple literal values are not supported, only 3=1 is computed.
    expect(
      criteriaEval.compute([
        { type: 'literal', value: '3' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '1' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '6' }
      ])
    ).to.equal(false)

    // Multiple literal values are not supported, only 3>1 is computed.
    expect(
      criteriaEval.compute([
        { type: 'literal', value: '3' },
        { type: 'operator', value: '>' },
        { type: 'literal', value: '1' },
        { type: 'operator', value: '<' },
        { type: 'literal', value: '6' }
      ])
    ).to.equal(false)
  })
})
