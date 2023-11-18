import { EthBridger, Erc20Bridger, getL2Network, L1ToL2MessageStatus } from "@arbitrum/sdk";
import { providers } from "ethers";

export const depositToArbitrum = async (signer, amount, token_address) => {
    try {
        const l2Provider = new providers.JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc");
        const l2Network = await getL2Network(l2Provider);

        if (token_address) {
            const erc20Bridger = new Erc20Bridger(l2Network);
            const approveTx = await erc20Bridger.approveToken({
                l1Signer: signer,
                erc20L1Address: token_address,
            });
            const approveRec = await approveTx.wait();
            const depositTx = await erc20Bridger.deposit({
                amount: amount,
                erc20L1Address: token_address,
                l1Signer: signer,
                l2Provider: l2Provider,
            });
            const depositRec = await depositTx.wait();
            const l2Result = await depositRec.waitForL2(l2Provider);
            l2Result.complete
                ? console.log(
                      `L2 message successful: status: ${L1ToL2MessageStatus[l2Result.status]}`
                  )
                : console.log(`L2 message failed: status ${L1ToL2MessageStatus[l2Result.status]}`);
        } else {
            const ETHBridger = new EthBridger(l2Network);

            const depositTx = await ETHBridger.deposit({
                amount: amount,
                l1Signer: signer,
                l2Provider: l2Provider,
            });
            const depositRec = await depositTx.wait();
            console.warn("deposit L1 receipt is:", depositRec.transactionHash);
            console.warn("Now we wait for L2 side of the transaction to be executed ⏳");
            const l2Result = await depositRec.waitForL2(l2Provider);
            console.warn("L2 result is:", await l2Result.message.status());
        }
    } catch (e) {
        console.log(e);
    }
};

export const withdrawFromArbitrum = async (signer, receiver_address, amount, token_address) => {
    try {
        const l2Provider = new providers.JsonRpcProvider("https://goerli-rollup.arbitrum.io/rpc");
        const l2Network = await getL2Network(l2Provider);
        if (token_address) {
            const erc20Bridger = new Erc20Bridger(l2Network);
            const withdrawTx = await erc20Bridger.withdraw({
                amount: amount,
                destinationAddress: receiver_address,
                erc20l1Address: token_address,
                l2Signer: signer,
            });
            const withdrawRec = await withdrawTx.wait();
        } else {
            const ETHBridger = new EthBridger(l2Network);

            const withdrawTx = await ETHBridger.withdraw({
                amount: amount,
                l2Signer: signer,
                destinationAddress: receiver_address,
            });

            const withdrawRec = await withdrawTx.wait();
            console.warn("withdraw L1 receipt is:", withdrawRec.transactionHash);
        }
    } catch (e) {
        console.log(e);
    }
};
