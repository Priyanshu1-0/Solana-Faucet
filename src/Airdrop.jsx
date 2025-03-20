
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

function Airdrop({ setGlobalMessage }) {  
    const wallet = useWallet();
    const { connection } = useConnection();
    const [loading, setLoading] = useState(false); 

    async function sendAirdroptoUser() {
        const amount = document.getElementById("publicKey").value;

        if (!wallet.publicKey) {
            setGlobalMessage("⚠️ Please connect your wallet first!");
            return;
        }

        if (!amount || isNaN(amount) || amount <= 0) {
            setGlobalMessage("⚠️ Enter a valid SOL amount.");
            return;
        }

        try {
            setLoading(true);
            await connection.requestAirdrop(wallet.publicKey, amount * 1000000000);
            
            setGlobalMessage(`Congratulations! You are ${amount} SOL rich! 💰`);
        } catch (error) {
            console.error("Airdrop failed:", error);
            
            if (error.message.includes("429")) {
                setGlobalMessage("🚨 Airdrop limit reached or faucet is empty. Try again later or use another faucet.");
            } else {
                setGlobalMessage("❌ Airdrop failed! Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="airdrop-container">
                <input id="publicKey" type="number" placeholder="Enter Amount (SOL)" className="airdrop-input" />
                <button onClick={sendAirdroptoUser} className="airdrop-button">
                    {loading ? <span className="loader"></span> : "Send Airdrop"}
                </button>
            </div>
        </>
    );
}

export default Airdrop;
