import { useEffect, useState } from "react";
import { useEthersSigner } from "../utils/ethersConverter";
import { getAllBalances } from "../utils/GetBalances";
import { Networks } from "../utils/env";
import { ethers } from "ethers";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { depositToZkSync } from "../utils/ZkSync";
import { depositToArbitrum } from "../utils/Arbitrum";

const Transaction = ({ receiver_address, amount, token, destination_chain }) => {
    const signer = useEthersSigner();

    const [balances, setBalances] = useState({});
    const [balancesReady, setBalancesReady] = useState(false);

    const [selectedChain, setSelectedChain] = useState(null);

    const { switchNetwork } = useSwitchNetwork();
    const { chain } = useNetwork();

    useEffect(() => {
        const fetchBalances = async () => {
            console.log(signer);
            const balance = await getAllBalances(signer);
            setBalances(balance);
            setBalancesReady(true);
            console.log(balance);
        };
        if (signer) {
            fetchBalances();
        }
    }, [signer]);

    const sendTransaction = async () => {
        if (selectedChain !== chain) {
            try {
                const network = await switchNetwork({
                    chainId: selectedChain,
                });
            } catch (e) {
                console.log(e);
            }
        }

        if (token === "ETH") {
            if (selectedChain === destination_chain) {
                // internal transaction
            } else if (selectedChain === 5) {
                if (destination_chain === 280) {
                    await depositToZkSync(signer, receiver_address, amount);
                } else {
                    await depositToArbitrum(signer, amount);
                }
            } else {
                if (destination_chain === 280) {
                    // withdraw from zkSync
                } else {
                    // withdraw from Arbitrum
                }
            }
        } else {
            // send ERC20
        }
    };

    return (
        <div className='page flex-row'>
            <div className='d-flex flex-column w-33' style={{ gap: "32px" }}>
                {balancesReady ? (
                    Object.keys(Networks).map((chainID) => {
                        const network_name = Networks[Number(chainID)].name;
                        const balance = ethers.utils.formatEther(balances[chainID][token]);
                        return (
                            <div className='d-flex flex-row justify-content-between'>
                                {selectedChain === chainID ? <div>Selected</div> : null}
                                <div>
                                    {network_name} : {balance}
                                </div>
                                <div
                                    onClick={() => {
                                        setSelectedChain(chainID);
                                    }}
                                >
                                    Select
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className='d-flex'>
                {selectedChain !== null ? <button onClick={sendTransaction}>Send</button> : null}
            </div>
        </div>
    );
};

export default Transaction;
