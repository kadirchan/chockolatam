import React, { useState } from "react";
import Transaction from "./Transaction";

const Send = () => {
    const [sendCode, setSendCode] = useState("");
    const [userApproved, setUserApproved] = useState(false);
    const [formData, setFormData] = useState({
        chain: null,
        token: null,
        amount: null,
        address: null,
    });
    const [formDataReady, setFormDataReady] = useState(false);

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

    return (
        <div className='page'>
            {userApproved ? (
                <div className='inner-page'>
                    <Transaction />
                </div>
            ) : (
                <div className='inner-page'>
                    <h1>Send</h1>
                    {formDataReady ? (
                        <div className='inner-page'>
                            <div>
                                {" "}
                                {formData.address} wants {formData.amount} {formData.token} to{" "}
                                {formData.chain} from you.{" "}
                            </div>
                            <div
                                onClick={() => {
                                    setUserApproved(true);
                                }}
                            >
                                Accept
                            </div>
                            <div
                                onClick={() => {
                                    setFormDataReady(false);
                                }}
                            >
                                Reject
                            </div>
                        </div>
                    ) : (
                        <div className='inner-page'>
                            <p>0xAc0B4B967C8599C4A978048e2E4B6578d551CF24_5_ETH_0.001</p>
                            <div className='d-flex'>
                                <label>
                                    Chockolat Address:
                                    <input
                                        type='text'
                                        value={sendCode}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </div>
                            <div className='d-flex' onClick={decodeSendCode}>
                                send
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Send;
