import { Provider, Signer, utils, L1Signer, Web3Provider } from "zksync-web3";
import { ethers } from "ethers";

export const depositToZkSync = async (signer, receiver_address, amount, token_address) => {
    try {
        const ZksyncProvider = new Provider("https://testnet.era.zksync.dev");
        const ZkSyncSigner = L1Signer.from(signer, ZksyncProvider);

        if (token_address) {
            //deposit erc20
        } else {
            const depositTx = await ZkSyncSigner.deposit({
                token: utils.ETH_ADDRESS,
                amount: amount,
                to: receiver_address,
            });
            await depositTx.wait();
        }
    } catch (err) {
        console.log(err);
    }
};

export const withdrawFromZkSync = async (signer, receiver_address, amount, token_address) => {
    try {
        const ZksyncProvider = new Web3Provider(window.ethereum);
        const ZkSyncSigner = ZksyncProvider.getSigner();

        if (token_address) {
            //withdraw erc20
        } else {
            const withdrawTx = await ZkSyncSigner.withdraw({
                token: utils.ETH_ADDRESS,
                amount: amount,
                to: receiver_address,
            });
            await withdrawTx.wait();
        }
    } catch (err) {
        console.log(err);
    }
};
