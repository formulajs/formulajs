import * as utils from '../../utils/common.js'
import { errorMessageHandler, validateParams } from "../../utils/error-messages-handler.js"
import { smartContractSchema } from './smart-contract.schema.js'



export function SMARTCONTRACT(){
    try {
            const [contractName, functionName, ...args] = utils.argsToArray(arguments)

            validateParams(smartContractSchema, [
                contractName,
                functionName,
                ...args
            ])
        

            return {
                contractName,
                functionName,
                args
            }
    } catch (error) {
        return errorMessageHandler(error, 'SMARTCONTRACT')
    }
}