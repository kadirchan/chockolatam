import React from "react";
import { useWalletClient } from "wagmi";
import { providers } from "ethers";

function walletClientToSigner(walletClient) {
    const { account, chain, transport } = walletClient;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new providers.Web3Provider(transport, network);
    return provider.getSigner(account.address);
}

function useEthersSigner({ chainId } = {}) {
    const { data: walletClient } = useWalletClient({ chainId });
    return React.useMemo(
        () => (walletClient ? walletClientToSigner(walletClient) : undefined),
        [walletClient]
    );
}

export { useEthersSigner };
