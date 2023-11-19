import React, { useState } from "react";
import { useAccount } from "wagmi";
import { Push } from "../utils/Push";
import { useEthersSigner } from "../utils/ethersConverter";

const CreateLink = () => {
    const [link, setLink] = useState({
        ready: false,
        text: "",
    });

    const [formData, setFormData] = useState({
        chain: 5,
        token: "ETH",
        amount: 0,
        address: "",
    });

    const [pushReceiver, setPushReceiver] = useState("");

    const { address } = useAccount();

    const signer = useEthersSigner();

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

    const copyAddress = () => {
        setFormData({ ...formData, address: address });
    };

    const handlePushReceiverChange = (e) => {
        setPushReceiver(e.target.value);
    };

    const generateLink = () => {
        if (formData.address !== "" && formData.amount > 0) {
            const txt =
                "http://localhost:3000/send/" +
                formData.address +
                "_" +
                formData.chain +
                "_" +
                formData.token +
                "_" +
                formData.amount;
            setLink({ ready: true, text: txt });
        }
    };

    return (
        <div className='page'>
            <div>0xd8A7dCA6aFF69B4287A0bFa7A5D4ddFd7Cc7c2f8</div>
            <div className='d-flex' style={{ gap: "16px" }}>
                <label>
                    Address:
                    <input
                        className='mx-3'
                        type='text'
                        value={formData.address}
                        onChange={handleAddressChange}
                    />
                </label>

                <button className='button-dark' onClick={copyAddress}>
                    Copy My Address
                </button>
            </div>

            <div className='d-flex' style={{ gap: "16px" }}>
                <label>
                    Network :
                    <select value={formData.chain} onChange={handleChainChange}>
                        <option value='5'>Goerli</option>
                        <option value='280'>ZkSync Goerli</option>
                        <option value='421613'>Arbitrum Goerli</option>
                    </select>
                </label>
            </div>

            <div className='d-flex' style={{ gap: "16px" }}>
                <label>
                    Fund :
                    <select value={formData.token} onChange={handleTokenChange}>
                        <option value='ETH'>ETH</option>
                        <option value='USDC'>USDC</option>
                    </select>
                </label>
            </div>
            <div className='d-flex'>
                <label>
                    Amount:
                    <input
                        className='mx-3'
                        type='number'
                        value={formData.amount}
                        onChange={handleAmountChange}
                    />
                </label>
            </div>
            <button className='button-dark d-flex' onClick={generateLink}>
                Generate Link
            </button>
            {link.ready ? (
                <div
                    className='d-flex justify-content-center align-items-center flex-column py-3'
                    style={{ borderTop: "1px solid #FFF", gap: "16px" }}
                >
                    <div className='d-flex'>{link.text}</div>
                    <div className='d-flex'>Send message with Push!</div>
                    <div className='d-flex' style={{ gap: "16px" }}>
                        <label>
                            Receiver address{" "}
                            <input
                                className='mx-3'
                                type='text'
                                value={pushReceiver}
                                onChange={handlePushReceiverChange}
                            />
                        </label>
                        <button
                            className='button-dark'
                            onClick={() => {
                                Push(signer, pushReceiver, link.text);
                            }}
                        >
                            send
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default CreateLink;
