import React, { useState } from "react";

const Send = () => {
    const [sendCode, setSendCode] = useState("");

    const handleInputChange = (e) => {
        setSendCode(e.target.value);
    };

    return (
        <div className='page'>
            <h1>Send</h1>
            <div className='d-flex'>
                <input type='text' value={sendCode} onChange={handleInputChange} />
            </div>
        </div>
    );
};

export default Send;
