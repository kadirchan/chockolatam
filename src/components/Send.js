import React, { useEffect, useState } from "react";
import Transaction from "./Transaction";
import { getAllBalances } from "../utils/GetBalances";
import { Networks } from "../utils/env";
import { useEthersSigner } from "../utils/ethersConverter";
import { ethers } from "ethers";

const Send = () => {
    const [sendCode, setSendCode] = useState("");
    const [userApproved, setUserApproved] = useState(false);
    const [formData, setFormData] = useState({
        chain: null,
        token: null,
        amount: null,
        address: null,
    });
    const [balances, setBalances] = useState({});
    const [formDataReady, setFormDataReady] = useState(false);

    const signer = useEthersSigner();

    const handleInputChange = (e) => {
        setSendCode(e.target.value);
    };

    const decodeSendCode = () => {
        try {
            const code = sendCode.split("_");
            setFormDataReady(true);
            setFormData({
                address: code[0],
                chain: code[1],
                token: code[2],
                amount: code[3],
            });
            console.log(formData);
            console.log(formDataReady);
        } catch (e) {
            alert("Invalid code");
        }
    };

    useEffect(() => {
        console.log(formDataReady);
        console.log(signer);
        const fetchBalances = async () => {
            const balance = await getAllBalances(signer);
            setBalances(balance);
        };
        if (formDataReady && signer) {
            fetchBalances();
        }
    }, [signer, formData]);

    return (
        <div className='page'>
            {userApproved ? (
                <div className='inner-page'>
                    <Transaction
                        receiver_address={formData.address}
                        amount={ethers.utils.parseEther("" + formData.amount)}
                        token={formData.token}
                        destination_chain={Number(formData.chain)}
                    />
                </div>
            ) : (
                <div className='inner-page'>
                    <div className='d-flex my-3'>
                        <h2>Send</h2>
                    </div>
                    {formDataReady ? (
                        <div className='inner-page'>
                            <div>
                                {" "}
                                {formData.address} wants {formData.amount} {formData.token} to{" "}
                                {Networks[Number(formData.chain)].name} from you.{" "}
                            </div>
                            <div className='d-flex flex-row' style={{ gap: "32px" }}>
                                <button
                                    className='button-dark'
                                    onClick={() => {
                                        setUserApproved(true);
                                    }}
                                >
                                    Accept
                                </button>
                                <button
                                    className='button-dark'
                                    onClick={() => {
                                        setFormDataReady(false);
                                    }}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='inner-page'>
                            <p>0xAc0B4B967C8599C4A978048e2E4B6578d551CF24_5_ETH_0.001</p>
                            <div className='d-flex'>
                                <label>
                                    Chockolat Address:
                                    <input
                                        className='mx-3'
                                        type='text'
                                        value={sendCode}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                            <button className='button-dark' onClick={decodeSendCode}>
                                Send
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Send;
