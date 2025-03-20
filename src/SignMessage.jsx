
import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

function SignMessage() {
    const { publicKey, signMessage } = useWallet();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function onClickSign() {
        if (!publicKey) {
            alert("Wallet is not connected!");
            return;
        }
        if (!signMessage) {
            alert("Wallet does not support message signing.");
            return;
        }

        try {
            setLoading(true);
            const encodeMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodeMessage);

            if (!ed25519.verify(signature, encodeMessage, publicKey.toBytes()))
                throw new Error("Invalid Message Signature");

            console.log(`Message Signature: ${bs58.encode(signature)}`);
            alert(`Successfully Signed Message!`);
        } catch (error) {
            console.error("Signing failed:", error);
            alert("Signing failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="sign-container">
            <h3 className="section-title">Sign & Verify a Message</h3>
            <input
                type="text"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field"
            />
            <button onClick={onClickSign} className="action-button" disabled={loading}>
                {loading ? <span className="loader"></span> : "Sign Message"}
            </button>
        </div>
    );
}

export default SignMessage;
