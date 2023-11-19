import { Provider, utils, L1Signer, Web3Provider } from "zksync-web3";

export const depositToZkSync = async (signer, receiver_address, amount, token_address) => {
    try {
        const ZksyncProvider = new Provider("https://testnet.era.zksync.dev");
        const ZkSyncSigner = L1Signer.from(signer, ZksyncProvider);

        if (token_address) {
            const depositTx = await ZkSyncSigner.deposit({
                token: token_address,
                amount: amount,
                to: receiver_address,
                approveERC20: true,
            });
            await depositTx.wait();
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

export const withdrawFromZkSync = async (receiver_address, amount, token_address) => {
    try {
        const ZksyncProvider = new Provider("https://testnet.era.zksync.dev");
        const ZkSyncSigner = new Web3Provider(window.ethereum).getSigner();
        console.log(ZkSyncSigner);

        if (token_address) {
            const withdrawTx = await ZkSyncSigner.withdraw({
                token: token_address,
                amount: amount,
                to: receiver_address,
            });
            await withdrawTx.wait();
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

export const internalTransaction = async (receiver_address, amount, token_address) => {
    const ZksyncProvider = new Web3Provider(window.ethereum);
    const zkSyncSigner = ZksyncProvider.getSigner();
    try {
        if (token_address) {
            //Todo
            const tx = await zkSyncSigner.sendTransaction({
                to: receiver_address,
                value: amount,
                token: token_address,
            });
        } else {
            const tx = await zkSyncSigner.sendTransaction({
                to: receiver_address,
                value: amount,
            });
            await tx.wait();
        }
    } catch (e) {
        console.log(e);
    }
};
