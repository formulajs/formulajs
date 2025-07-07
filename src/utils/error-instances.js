export class ValidationError extends Error {
  constructor(message) {
    super(message)
  }
}



export class MissingApiKeyError extends Error {
  constructor(apiKeyName){
    super(`API key for ${apiKeyName} is missing`)
  }
}


export class RateLimitError extends Error {
  constructor(apiKeyName){
    super( `You have reached the rate limit for ${apiKeyName}`)
    this.api = apiKeyName
  }
}


export class NetworkError extends Error {
  constructor(apiKeyName, status){
    super(status === 429 ? `You have reached the rate limit for  ${apiKeyName}` : `${apiKeyName} API failed with status code: ${status}`  )
    this.status = status
    this.api = apiKeyName
  }
}

export class EnsError extends Error {
  constructor(ensname) {
    super(`${ensname} is not a supported ens name`)
  }
}

export class InvalidApiKeyError extends Error {
  constructor(apiKeyName){
    super(`Api key is invalid for ${apiKeyName}`)
      this.api = apiKeyName
  }
}