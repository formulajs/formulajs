import 'should'

import * as criteriaEval from '../../src/utils/criteria-eval.js'

describe('Utils => criteria eval', () => {
  it('parse', () => {
    criteriaEval.parse('').should.deepEqual([])
    criteriaEval.parse('test').should.deepEqual([
      { type: 'operator', value: '=' },
      { type: 'literal', value: 'test' }
    ])
    criteriaEval.parse('10').should.deepEqual([
      { type: 'operator', value: '=' },
      { type: 'literal', value: 10 }
    ])
    criteriaEval.parse('=10').should.deepEqual([
      { type: 'operator', value: '=' },
      { type: 'literal', value: 10 }
    ])
    criteriaEval.parse('<10').should.deepEqual([
      { type: 'operator', value: '<' },
      { type: 'literal', value: 10 }
    ])
    criteriaEval.parse('<=10').should.deepEqual([
      { type: 'operator', value: '<=' },
      { type: 'literal', value: 10 }
    ])
    criteriaEval.parse('<>10').should.deepEqual([
      { type: 'operator', value: '<>' },
      { type: 'literal', value: 10 }
    ])
    criteriaEval.parse('>10').should.deepEqual([
      { type: 'operator', value: '>' },
      { type: 'literal', value: 10 }
    ])
    criteriaEval.parse('>=10').should.deepEqual([
      { type: 'operator', value: '>=' },
      { type: 'literal', value: 10 }
    ])
    criteriaEval.parse('==10').should.deepEqual([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '==10' }
    ])
    criteriaEval.parse('==10>').should.deepEqual([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '==10>' }
    ])
    criteriaEval.parse('>test').should.deepEqual([
      { type: 'operator', value: '>' },
      { type: 'literal', value: 'test' }
    ])
    criteriaEval.parse('>=test').should.deepEqual([
      { type: 'operator', value: '>=' },
      { type: 'literal', value: 'test' }
    ])
    criteriaEval.parse('<=test').should.deepEqual([
      { type: 'operator', value: '<=' },
      { type: 'literal', value: 'test' }
    ])
    criteriaEval.parse('==test').should.deepEqual([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '==test' }
    ])
    criteriaEval.parse('`').should.deepEqual([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '`' }
    ])
    criteriaEval.parse('!@#$%^&*()_+').should.deepEqual([
      { type: 'operator', value: '=' },
      { type: 'literal', value: '!@#$%^&*()_+' }
    ])
    criteriaEval.parse('>!@#$%^&*()_+').should.deepEqual([
      { type: 'operator', value: '>' },
      { type: 'literal', value: '!@#$%^&*()_+' }
    ])
    criteriaEval.parse('>=!@#$%^&*()_+').should.deepEqual([
      { type: 'operator', value: '>=' },
      { type: 'literal', value: '!@#$%^&*()_+' }
    ])
  })

  it('parse', () => {
    try {
      criteriaEval.createToken('test')
    } catch (ex) {
      ex.message.should.equal('Unsupported token type: undefined')
    }

    try {
      criteriaEval.createToken('test', 'operatorr')
    } catch (ex) {
      ex.message.should.equal('Unsupported token type: operatorr')
    }

    try {
      criteriaEval.createToken('test', 'literall')
    } catch (ex) {
      ex.message.should.equal('Unsupported token type: literall')
    }

    criteriaEval.createToken('test', 'operator').should.deepEqual({ type: 'operator', value: 'test' })
    criteriaEval.createToken('test', 'literal').should.deepEqual({ type: 'literal', value: 'test' })
  })

  it('compute', () => {
    criteriaEval
      .compute([
        { type: 'literal', value: '1' },
        { type: 'operator', value: '>' },
        { type: 'literal', value: '1' }
      ])
      .should.equal(false)

    criteriaEval
      .compute([
        { type: 'literal', value: '1' },
        { type: 'operator', value: '>=' },
        { type: 'literal', value: '1' }
      ])
      .should.equal(true)

    criteriaEval
      .compute([
        { type: 'literal', value: '3' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '1' }
      ])
      .should.equal(false)

    criteriaEval
      .compute([
        { type: 'literal', value: 'test' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: 'test' }
      ])
      .should.equal(true)

    criteriaEval
      .compute([
        { type: 'literal', value: 'a' },
        { type: 'operator', value: '>' },
        { type: 'literal', value: 'b' }
      ])
      .should.equal(false)

    criteriaEval
      .compute([
        { type: 'literal', value: 'z' },
        { type: 'operator', value: '>' },
        { type: 'literal', value: 'b' }
      ])
      .should.equal(true)

    // Multiple literal values are not supported, only 3=1 is computed.
    criteriaEval
      .compute([
        { type: 'literal', value: '3' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '1' },
        { type: 'operator', value: '=' },
        { type: 'literal', value: '6' }
      ])
      .should.equal(false)

    // Multiple literal values are not supported, only 3>1 is computed.
    criteriaEval
      .compute([
        { type: 'literal', value: '3' },
        { type: 'operator', value: '>' },
        { type: 'literal', value: '1' },
        { type: 'operator', value: '<' },
        { type: 'literal', value: '6' }
      ])
      .should.equal(false)
  })
})
