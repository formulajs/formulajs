import { expect } from 'chai'
import { ERROR_MESSAGES_FLAG } from '../../src/utils/constants.js'

import {SMARTCONTRACT} from '../../src/crypto.js'


describe('SMARTCONTRACT', () => {
    it('should return contractName, functionName and args', () => {
        const result = SMARTCONTRACT('MyContract', 'myFunc', 1, 2, 3, 4)
        expect(result).to.deep.equal({
            contractName: 'MyContract',
            functionName: 'myFunc',
            args: [1, 2, 3, 4]
        })
    })
    it('should throw error when contractName or functionName is invalid', () => {
        const result = SMARTCONTRACT('MyContract', 9, 1, 2, 3, 4)
        expect(result.type).to.equal(ERROR_MESSAGES_FLAG.INVALID_PARAM)
        expect(result.functionName).to.equal('SMARTCONTRACT')
    })
})