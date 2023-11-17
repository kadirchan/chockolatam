import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CreateLink from "./components/CreateLink";
import Send from "./components/Send";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<CreateLink />} />
                <Route path="/create" element={<CreateLink />} />
                <Route path="/send:code" element={<Send />} />
                <Route path="/send" element={<Send />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

