// Moralis Configuration
export const moralisConfig = {
  appId: process.env.REACT_APP_MORALIS_APP_ID || 'your_moralis_app_id_here',
  serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL || 'your_moralis_server_url_here',
}

// Network Configuration
export const networkConfig = {
  chainId: process.env.REACT_APP_CHAIN_ID || '0x1', // Ethereum Mainnet
  chainName: process.env.REACT_APP_CHAIN_NAME || 'Ethereum Mainnet',
  rpcUrl: process.env.REACT_APP_RPC_URL || 'https://mainnet.infura.io/v3/your_infura_key',
  blockExplorerUrl: 'https://etherscan.io',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
}

// Stablecoin Contract Addresses
export const stablecoinContracts = {
  USDC: process.env.REACT_APP_USDC_CONTRACT || '0xA0b86a33E6441b8c4C8C0C4B8C4C8C0C4B8C4C8C',
  USDT: process.env.REACT_APP_USDT_CONTRACT || '0xdAC17F958D2ee523a2206206994597C13D831ec7',
}

// Disbursement Configuration
export const disbursementConfig = {
  walletAddress: process.env.REACT_APP_DISBURSEMENT_WALLET || 'your_wallet_address_here',
  gasLimit: '21000',
  gasPrice: '20000000000', // 20 gwei
}

// ABI for ERC20 tokens (USDC/USDT)
export const erc20ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_to", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  }
]
