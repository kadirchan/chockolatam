import React, { useState } from "react";

const CreateLink = () => {
    const [formData, setFormData] = useState({
        chain: 5,
        token: "ETH",
        amount: 0,
        address: "",
    });

    const handleChainChange = (e) => {
        setFormData({ ...formData, chain: e.target.value });
    };

    const handleTokenChange = (e) => {
        setFormData({ ...formData, token: e.target.value });
    };

    const handleAmountChange = (e) => {
        setFormData({ ...formData, amount: e.target.value });
    };

    const handleAddressChange = (e) => {
        setFormData({ ...formData, address: e.target.value });
    };

    return (
        <div className='page'>
            <div className='d-flex'>
                <label>
                    Network :
                    <select value={formData.chain} onChange={handleChainChange}>
                        <option value='5'>Option 1</option>
                        <option value='6'>Option 2</option>
                        <option value='7'>Option 3</option>
                    </select>
                </label>
            </div>

            <div className='d-flex'>
                <label htmlFor=''>
                    <input id='' type='text' />
                </label>
            </div>
        </div>
    );
};

export default CreateLink;
