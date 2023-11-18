import { useEffect, useState } from "react";
import { useEthersSigner } from "../utils/ethersConverter";
import { getAllBalances } from "../utils/GetBalances";
import { Networks } from "../utils/env";
import { ethers } from "ethers";

const Transaction = ({ receiver_address, amount, token, chain }) => {
    const signer = useEthersSigner();

    const [balances, setBalances] = useState({});
    const [balancesReady, setBalancesReady] = useState(false);

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

    return (
        <div className='page'>
            <div className='d-flex flex-column w-33' style={{ gap: "32px" }}>
                {balancesReady ? (
                    Object.keys(Networks).map((chainID) => {
                        const network_name = Networks[Number(chainID)].name;
                        const balance = ethers.utils.formatEther(balances[chainID][token]);
                        return (
                            <div className='d-flex'>
                                {network_name} : {balance}
                            </div>
                        );
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div></div>
        </div>
    );
};

export default Transaction;
