export const LEAKAGE_OF_SECRET_ADDRESS = '0x56425bE5498CF204fBb62f5b1C1C244D677662A0'
export const LEAKAGE_OF_SECRET_ABI = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{
                "internalType": "uint256[]",
                "name": "_keyHashes",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "_noEle",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_revealedEle",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_minRequiredDonations",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_t_end",
                "type": "uint256"
            }
        ],
        "name": "commit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "donate",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getState",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "init",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256[]",
            "name": "keys",
            "type": "uint256[]"
        }],
        "name": "revealRemaining",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256[]",
            "name": "sampleKeys",
            "type": "uint256[]"
        }],
        "name": "revealSample",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "setTendAsCurrentTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "testEncodeing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_amountToWithdraw",
            "type": "uint256"
        }],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]
export const KEY_THEFT_ADDRESS = '0x7D1b52a4249Aa579Fd79FF1626f70CD01c4cB536'
export const KEY_THEFT_ABI = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "modifiedReward",
            "type": "uint256"
        }],
        "name": "changeReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "r",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "w",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "commit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "response",
                "type": "uint256"
            }
        ],
        "name": "claimSecretKey",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getState",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "_reward",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_yC",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pkV",
                "type": "uint256"
            }
        ],
        "name": "initTheft",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "_a",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_b",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_m",
                "type": "uint256"
            }
        ],
        "name": "modExp",
        "outputs": [{
            "internalType": "uint256",
            "name": "result",
            "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]