import { Networks } from "./env";
import { ethers } from "ethers";

export const getAllBalances = async (signer) => {
    let balances = {};

    const chainIDs = Object.keys(Networks);

    for (const chainID of chainIDs) {
        balances[chainID] = {};
        const network = Networks[chainID];
        const provider = new ethers.providers.JsonRpcProvider(network.rpc_url);
        balances[chainID]["ETH"] = await provider.getBalance(signer._address);
        const ERC20Tokens = Object.keys(network.tokens).filter((name) => name !== "ETH");
        for (const token of ERC20Tokens) {
            balances[chainID][token] = await ERC20Balance(
                signer,
                provider,
                network.tokens[token].address
            );
        }
    }
    return balances;
};

const ERC20Balance = async (signer, provider, token_address) => {
    const contractABI = ["function balanceOf(address) view returns (uint)"];
    const erc20Contract = new ethers.Contract(token_address, contractABI, provider);
    return await erc20Contract.balanceOf(signer._address);
};
