import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnectProvider } from "@web3modal/wagmi";

import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { arbitrumGoerli, goerli, zkSyncTestnet } from "viem/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const projectId = process.env.WALLETCONNECT_ID;

const { chains, publicClient } = configureChains(
    [goerli, zkSyncTestnet, arbitrumGoerli],
    [walletConnectProvider({ projectId }), publicProvider()]
);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
        new WalletConnectConnector({
            chains,
            options: { projectId, showQrModal: false },
        }),
        new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    ],
    publicClient,
});

createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: "dark" });

export default function ConnectButton() {
    return <w3m-button />;
}
