export const SMARTCONTRACT_metadata = {
    n: 'SMARTCONTRACT',
    t: 20,
    d: 'Pulls data from a given contract',
    r: 'Call a read-only function on a given smart contract',
    p: [
        {
            name: 'contractName',
            detail: 'Name of the contract you want to pull data from',
            example: '"My Fileverse portal"',
            require: 'm',
            type: 'string'
        },
        {
            name: 'functionName',
            detail: 'Name of the function you want to call from the give contract',
            example: '"getCollaborators"',
            require: 'm',
            type: 'string'
        },
        {
            name: '...functionArgs',
            detail: 'Optional arguments to pass to the contract function.',
            example: '1, "0xabc...", true',
            require: 'o',
            type: 'any'
        }
    ]
}