import { useEffect, useState } from "react";
import { useEthersSigner } from "../utils/ethersConverter";
import { getAllBalances } from "../utils/GetBalances";
import { Networks } from "../utils/env";
import { ethers } from "ethers";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { depositToZkSync, withdrawFromZkSync } from "../utils/ZkSync";
import { depositToArbitrum, withdrawFromArbitrum } from "../utils/Arbitrum";

const Transaction = ({ receiver_address, amount, token, destination_chain }) => {
    const signer = useEthersSigner();

    const [balances, setBalances] = useState({});
    const [balancesReady, setBalancesReady] = useState(false);

    const [selectedChain, setSelectedChain] = useState(null);

    // const { switchNetwork } = useSwitchNetwork();
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
        console.log("selected", typeof selectedChain, selectedChain, "current", chain.id);
        if (selectedChain !== chain.id) {
            console.log("switching network");
            try {
                await switchNetwork({
                    chainId: selectedChain,
                });
            } catch (e) {
                console.log(e);
            }
        }

        console.log(
            typeof token,
            token,
            typeof destination_chain,
            destination_chain,
            typeof amount,
            amount,
            typeof selectedChain,
            selectedChain
        );
        if (token === "ETH") {
            if (selectedChain === destination_chain) {
                // internal transaction
                console.log("internal transaction");
            } else if (selectedChain === 5) {
                if (destination_chain === 280) {
                    console.log("depositing to zkSync");
                    await depositToZkSync(signer, receiver_address, amount);
                } else {
                    console.log("depositing to arbitrum");
                    await depositToArbitrum(signer, amount);
                }
            } else {
                if (selectedChain === 280) {
                    console.log("withdrawing from zkSync");
                    await withdrawFromZkSync(receiver_address, amount);
                } else if (selectedChain === 421613) {
                    console.log("withdrawing from arbitrum");
                    await withdrawFromArbitrum(signer, receiver_address, amount);
                }
            }
        } else {
            if (selectedChain === destination_chain) {
                // internal transaction
                console.log("internal transaction");
            } else if (selectedChain === 5) {
                if (destination_chain === 280) {
                    console.log("depositing to zkSync");
                    const token_address = Networks[5]["tokens"][token].address;
                    await depositToZkSync(signer, receiver_address, amount, token_address);
                } else {
                    console.log("depositing to arbitrum");
                    const token_address = Networks[5]["tokens"][token].address;
                    await depositToArbitrum(signer, amount, token_address);
                }
            } else {
                if (selectedChain === 280) {
                    console.log("withdrawing from zkSync");
                    const token_address = Networks[5]["tokens"][token].address;
                    await withdrawFromZkSync(receiver_address, amount, token_address);
                } else if (selectedChain === 421613) {
                    console.log("withdrawing from arbitrum");
                    const token_address = Networks[5]["tokens"][token].address;
                    await withdrawFromArbitrum(signer, receiver_address, amount, token_address);
                }
            }
        }
    };

    return (
        <div className='page'>
            <div className='d-flex'>
                You are sending {amount} {token} to {receiver_address}. Select the chain you want to
                send it on.
            </div>
            <div className='d-flex flex-column w-33' style={{ gap: "32px" }}>
                {balancesReady ? (
                    Object.keys(Networks).map((chainID) => {
                        const network_name = Networks[Number(chainID)].name;
                        const balance =
                            ethers.utils.formatEther(balances[chainID][token]) *
                            10 ** (18 - Networks[Number(chainID)].tokens[token].decimals);
                        return (
                            <div className='d-flex flex-row justify-content-between'>
                                {selectedChain === Number(chainID) ? <div>Selected</div> : null}
                                <div>
                                    {network_name} : {balance}
                                </div>
                                <div
                                    onClick={() => {
                                        setSelectedChain(Number(chainID));
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
