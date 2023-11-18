export const Networks = {
    5: {
        name: "Goerli",
        explorer: "https://goerli.etherscan.io",
        rpc_url: "https://rpc.ankr.com/eth_goerli",
        tokens: {
            ETH: {
                symbol: "ETH",
                address: "0x0000000000000000000000000000000000000000",
                decimals: 18,
                isERC20: false,
            },
            USDC: {
                symbol: "USDC",
                address: "0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4",
                decimals: 6,
                isERC20: true,
            },
        },
    },
    280: {
        name: "ZkSync Goerli",
        explorer: "https://goerli.explorer.zksync.io",
        rpc_url: "https://testnet.era.zksync.dev",
        tokens: {
            ETH: {
                symbol: "ETH",
                address: "0x000000000000000000000000000000000000800A",
                decimals: 18,
                isERC20: false,
            },
            USDC: {
                symbol: "USDC",
                address: "0x0faF6df7054946141266420b43783387A78d82A9",
                decimals: 6,
                isERC20: true,
            },
        },
    },
    421613: {
        name: "Arbitrum Goerli",
        explorer: "https://goerli.arbiscan.io",
        rpc_url: "https://goerli-rollup.arbitrum.io/rpc",
        tokens: {
            ETH: {
                symbol: "ETH",
                address: "0x0000000000000000000000000000000000000000",
                decimals: 18,
                isERC20: false,
            },
            USDC: {
                symbol: "USDC",
                address: "0xEA70a40Df1432A1b38b916A51Fb81A4cc805a963",
                decimals: 6,
                isERC20: true,
            },
        },
    },
};
