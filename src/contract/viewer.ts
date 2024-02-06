export const Viewer = [
  {
    inputs: [
      {
        internalType: 'contract IFlatcoinVault',
        name: '_vault',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenIdFrom',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'tokenIdTo',
        type: 'uint256',
      },
    ],
    name: 'getPositionData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marginDeposited',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'additionalSize',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'entryCumulativeFunding',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'profitLoss',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'accruedFunding',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'marginAfterSettlement',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'limitOrderPriceLowerThreshold',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'limitOrderPriceUpperThreshold',
            type: 'uint256',
          },
        ],
        internalType: 'struct FlatcoinStructs.LeveragePositionData[]',
        name: 'positionData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'getAccountLeveragePositionData',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastPrice',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'marginDeposited',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'additionalSize',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'entryCumulativeFunding',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'profitLoss',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'accruedFunding',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'marginAfterSettlement',
            type: 'int256',
          },
          {
            internalType: 'uint256',
            name: 'liquidationPrice',
            type: 'uint256',
          },
        ],
        internalType: 'struct FlatcoinStructs.LeveragePositionData[]',
        name: 'positionData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFlatcoinPriceInUSD',
    outputs: [
      {
        internalType: 'uint256',
        name: 'priceInUSD',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getFlatcoinTVL',
    outputs: [
      {
        internalType: 'uint256',
        name: 'tvl',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getMarketSkewPercentage',
    outputs: [
      {
        internalType: 'int256',
        name: 'skewPercent',
        type: 'int256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'vault',
    outputs: [
      {
        internalType: 'contract IFlatcoinVault',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
