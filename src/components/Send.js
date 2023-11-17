import React, { useState } from "react";

const Send = () => {
    const [sendCode, setSendCode] = useState("");
    const [userApproved, setUserApproved] = useState(false);
    const [formData, setFormData] = useState({
        ready: false,
        chain: null,
        token: null,
        amount: null,
        address: null,
    });

    const handleInputChange = (e) => {
        setSendCode(e.target.value);
    };

    const decodeSendCode = () => {
        const code = sendCode.split("_");
        setFormData({
            address: code[0],
            chain: code[1],
            token: code[2],
            amount: code[3],
            ready: true,
        });
    };

    return (
        <div className='page'>
            <h1>Send</h1>
            {formData.ready ? (
                <div className='inner-page'>
                    <div className='d-flex'>
                        <label>
                            Chockolat Address:
                            <input type='text' value={sendCode} onChange={handleInputChange} />
                        </label>
                    </div>
                    <div className='d-flex' onClick={decodeSendCode}>
                        send
                    </div>
                </div>
            ) : (
                <div className='inner-page'>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export default Send;
