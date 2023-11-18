import { useEthersSigner } from "../utils/ethersConverter";

const Transaction = ({ receiver_address, amount, token_address, chain }) => {
    const signer = useEthersSigner();

    return (
        <div>
            <h1>{receiver_address}</h1>
            <h1>{amount}</h1>
            <h1>{token_address}</h1>
            <h1>{chain}</h1>
        </div>
    );
};

export default Transaction;
