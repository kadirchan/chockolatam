import { Link } from "react-router-dom";
import ConnectButton from "./ConnectButton";

const Navbar = () => {
    return (
        <div
            className='d-flex w-100 flex-row justify-content-between align-items-center'
            style={{ borderBottom: "1px solid #FFF" }}
        >
            <div className='d-flex'>Chockolatam</div>

            <Link to='/create' className='link'>
                Create Link
            </Link>

            <Link to='/send' className='link'>
                Send
            </Link>

            <div className='d-flex'>
                <ConnectButton />
            </div>
        </div>
    );
};

export default Navbar;
