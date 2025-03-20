import React, { useState } from "react";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import Airdrop from "./Airdrop";
import ShowBalance from "./ShowBalance";
import { Link } from "react-router-dom";

function Faucet() {
  const [globalMessage, setGlobalMessage] = useState("");

  return (
    <div className="app-container">
      <Link to="/"><button className="back-btn">⬅ Back</button></Link>
      <h2>Solana Faucet</h2>
      <div className="wallet-buttons">
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>
      <Airdrop setGlobalMessage={setGlobalMessage} />
      <ShowBalance />
      {globalMessage && <p className="global-message">{globalMessage}</p>}
    </div>
  );
}

export default Faucet;
