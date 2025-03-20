
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";

function SendToken() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    async function sendTokens() {
        if (!wallet.publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        if (!to || !amount || isNaN(amount) || amount <= 0) {
            alert("Enter a valid recipient address and amount.");
            return;
        }

        try {
            setLoading(true);
            const transaction = new Transaction();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            await wallet.sendTransaction(transaction, connection);
            alert(`Sent ${amount} SOL to ${to}`);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Please check the recipient address.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="send-container">
            <h3 className="section-title">Send Your Tokens To Anyone!</h3>
            <input
                type="text"
                placeholder="Recipient Address"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="input-field"
            />
            <input
                type="text"
                placeholder="Enter Amount (SOL)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
            />
            <button onClick={sendTokens} className="action-button" disabled={loading}>
                {loading ? <span className="loader"></span> : "Send"}
            </button>
        </div>
    );
}

export default SendToken;
