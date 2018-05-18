/* eslint-disable */
export const USER_REPOSITORY_ABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "instantiation",
				"type": "address"
			}
		],
		"name": "ContractInstantiation",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_walletAddress",
				"type": "address"
			},
			{
				"name": "_modelAddress",
				"type": "address"
			},
			{
				"name": "_SLA",
				"type": "uint256"
			},
			{
				"name": "_Rate",
				"type": "uint256"
			}
		],
		"name": "addModel",
		"outputs": [
			{
				"name": "modelID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "model",
				"type": "address"
			}
		],
		"name": "ModelAddition",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnerAddition",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_walletAddress",
				"type": "address"
			},
			{
				"name": "_modelAddress",
				"type": "address"
			},
			{
				"name": "_SLA",
				"type": "uint256"
			},
			{
				"name": "_Rate",
				"type": "uint256"
			}
		],
		"name": "addSubscription",
		"outputs": [
			{
				"name": "subscriptionID",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_owner",
				"type": "address[]"
			},
			{
				"name": "_username",
				"type": "bytes32"
			},
			{
				"name": "_email",
				"type": "bytes32"
			}
		],
		"name": "addUser",
		"outputs": [
			{
				"name": "userId",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_owners",
				"type": "address[]"
			},
			{
				"name": "_required",
				"type": "uint256"
			}
		],
		"name": "createWallet",
		"outputs": [
			{
				"name": "wallet",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "creator",
				"type": "address"
			}
		],
		"name": "getInstantiationCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getModels",
		"outputs": [
			{
				"name": "modelAddress",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_modelID",
				"type": "uint256"
			}
		],
		"name": "getModelWallet",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumModels",
		"outputs": [
			{
				"name": "length",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumSubscriptions",
		"outputs": [
			{
				"name": "length",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumUsers",
		"outputs": [
			{
				"name": "length",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwners",
		"outputs": [
			{
				"name": "_owners",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_subID",
				"type": "uint256"
			}
		],
		"name": "getSubscription",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_userID",
				"type": "uint256"
			}
		],
		"name": "getUserWallet",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getWallet",
		"outputs": [
			{
				"name": "walletAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "instantiations",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "isInstantiation",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "isOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "registered",
		"outputs": [
			{
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]