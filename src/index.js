import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateLink from "./components/CreateLink";
import Send from "./components/Send";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "./components/ConnectButton";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <WagmiConfig config={wagmiConfig}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<CreateLink />} />
                    <Route path='/create' element={<CreateLink />} />
                    <Route path='/send:code' element={<Send />} />
                    <Route path='/send' element={<Send />} />
                </Routes>
            </BrowserRouter>
        </WagmiConfig>
    </React.StrictMode>
);
