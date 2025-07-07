import { ERROR_MESSAGES_FLAG } from './constants.js'
import { ValidationError, MissingApiKeyError, RateLimitError, NetworkError, EnsError, InvalidApiKeyError } from './error-instances.js';



export const errorMessageHandler = (err, functionName) => {
  
  switch (true) {
    case err instanceof ValidationError :  {
      return {
        message: err.message,
        functionName,
        type: ERROR_MESSAGES_FLAG.INVALID_PARAM
      }
    }

    case err instanceof MissingApiKeyError  :
      return {
        message: err.message,
        functionName,
        type: ERROR_MESSAGES_FLAG.MISSING_KEY
      }

    case err instanceof RateLimitError:
      return {
        message: err.message,
        functionName,
        type: ERROR_MESSAGES_FLAG.RATE_LIMIT,
        apiKeyName: err.api
      }

    case err instanceof NetworkError: 
      if(err.status === 429){
        return {
        message: err.message,
        functionName,
        type: ERROR_MESSAGES_FLAG.RATE_LIMIT,
        apiKeyName: err.api
      }
      } else {
        return {
        message: err.message,
        functionName,
        type: ERROR_MESSAGES_FLAG.NETWORK_ERROR,
        apiKeyName: err.api
      }
      }

    case err instanceof EnsError:
      return {
        message: err.message,
        functionName,
        type: ERROR_MESSAGES_FLAG.ENS
      }

    case err instanceof InvalidApiKeyError: 
      return {
        message: err.message,
        functionName,
        type: ERROR_MESSAGES_FLAG.INVALID_API_KEY,
        apiKeyName: err.api
      }

    default:
      return {
        message: 'An unexpected error occured',
        functionName,
        type: ERROR_MESSAGES_FLAG.DEFAULT,
        reason: err.message || err
      }
  }
}




export function validateParams(schema, rawParams) {
  const result = schema.safeParse(rawParams)
  if (!result.success) {
    const issue = result.error.issues[0]
    throw new ValidationError(
      issue.message
    )
  }
  return result.data
}

