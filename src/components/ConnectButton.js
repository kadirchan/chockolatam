import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { arbitrumGoerli, goerli, mainnet, zkSyncTestnet } from "viem/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { walletconnect_id } from "../utils/secret";

const projectId = walletconnect_id;

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
