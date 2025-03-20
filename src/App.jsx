
import { useState } from 'react';
import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Airdrop from "./Airdrop";
import solanaLogo from "./assets/Solana_logo.png";

import '@solana/wallet-adapter-react-ui/styles.css';
import './App.css';
import { ShowBalance } from './ShowBalance';
import SendToken from './SendToken';
import SignMessage from './SignMessage';

function App() {
    const [globalMessage, setGlobalMessage] = useState(""); 

    return (
        <div className='app-wrapper'>
            <h1 className="faucet-heading">S O L A N A  F A U C E T</h1>
            <img src={solanaLogo} alt="Solana Logo" className="solana-logo" />
            <div className="app-container">
                <ConnectionProvider endpoint="https://api.devnet.solana.com">
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                            <div className="wallet-buttons">
                                <WalletMultiButton />
                                <WalletDisconnectButton />
                            </div>
                            <div>Airdrop Yourself Some Solana</div>
                            <Airdrop setGlobalMessage={setGlobalMessage} />
                            <ShowBalance></ShowBalance>
                            {globalMessage && <p className="global-message">{globalMessage}</p>}
                            <SendToken></SendToken>
                            <SignMessage></SignMessage>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
                <p className="footer">⚡ Built on Solana</p>
                
            </div>
        </div>
    );
}

export default App;

