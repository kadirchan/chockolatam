import { useEffect, useState } from "react";
import { useEthersSigner } from "../utils/ethersConverter";
import { getAllBalances } from "../utils/GetBalances";
import { Networks } from "../utils/env";
import { ethers } from "ethers";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { switchNetwork } from "@wagmi/core";
import { depositToZkSync, withdrawFromZkSync } from "../utils/ZkSync";
import { depositToArbitrum, withdrawFromArbitrum } from "../utils/Arbitrum";
import { connectSnap, getSnap } from "../utils/Snap";

const Transaction = ({ receiver_address, amount, token, destination_chain }) => {
    console.log(receiver_address, amount, token, destination_chain);
    const signer = useEthersSigner();

    const [balances, setBalances] = useState({});
    const [balancesReady, setBalancesReady] = useState(false);

    const [selectedChain, setSelectedChain] = useState(null);

    const [snapInstalled, setSnapInstalled] = useState(false);

    // const { switchNetwork } = useSwitchNetwork();
    const { chain } = useNetwork();

    const handleConnectClick = async () => {
        try {
            await connectSnap();
            const installedSnap = await getSnap();
        } catch (error) {
            console.error(error);
        }
    };

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
            if (!snapInstalled) {
                handleConnectClick();
                setSnapInstalled(true);
            }
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
                const tx = {
                    to: receiver_address,
                    value: amount,
                };
                const txHash = await signer.sendTransaction(tx);
                await txHash.wait();
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
            amount = amount.div("1000000000000");
            if (selectedChain === destination_chain) {
                // internal transaction
                console.log("internal transaction");
                const tokenAbi = ["function transfer(address to, uint256 amount) returns (bool)"];
                if (selectedChain === 5) {
                    const contract = new ethers.Contract(
                        "0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4",
                        tokenAbi,
                        signer
                    );
                    const tx = contract.trasfer(receiver_address, amount);
                    await tx.wait();
                } else if (selectedChain === 280) {
                    const contract = new ethers.Contract(
                        "0x0faF6df7054946141266420b43783387A78d82A9",
                        tokenAbi,
                        signer
                    );
                    const tx = contract.trasfer(receiver_address, amount);
                    await tx.wait();
                } else if (selectedChain === 421613) {
                    const contract = new ethers.Contract(
                        "0xEA70a40Df1432A1b38b916A51Fb81A4cc805a963",
                        tokenAbi,
                        signer
                    );
                    const tx = contract.trasfer(receiver_address, amount);
                    await tx.wait();
                }
            } else if (selectedChain === 5) {
                if (destination_chain === 280) {
                    console.log("depositing to zkSync");
                    console.log(receiver_address, amount, token, destination_chain);
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
            <div className='d-flex w-66'>
                You are sending {ethers.utils.formatEther(amount)} {token} to {receiver_address}.
            </div>
            <div className='d-flex w-66'>Select the chain you want to send it on.</div>
            <div className='d-flex flex-column w-66' style={{ gap: "48px" }}>
                {balancesReady ? (
                    Object.keys(Networks).map((chainID) => {
                        const network_name = Networks[Number(chainID)].name;
                        const balance =
                            ethers.utils.formatEther(balances[chainID][token]) *
                            10 ** (18 - Networks[Number(chainID)].tokens[token].decimals);
                        return (
                            <div
                                className='d-flex flex-row justify-content-between'
                                style={{ width: "500px" }}
                            >
                                <div className='d-flex'>
                                    {network_name} : {balance}
                                </div>

                                {selectedChain === Number(chainID) ? (
                                    <button
                                        className='button-red'
                                        onClick={() => {
                                            setSelectedChain(Number(chainID));
                                        }}
                                    >
                                        Selected
                                    </button>
                                ) : (
                                    <button
                                        className='button-dark'
                                        onClick={() => {
                                            setSelectedChain(Number(chainID));
                                        }}
                                    >
                                        Select
                                    </button>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className='d-flex w-66 '>
                {selectedChain !== null ? (
                    <button className='button-dark' onClick={sendTransaction}>
                        Send
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default Transaction;
