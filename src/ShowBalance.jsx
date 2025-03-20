import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function ShowBalance(){
    const { connection } = useConnection();
    const wallet = useWallet();
  
   async function getBalanceUser(){

    if (!wallet.publicKey) {
        return null; 
    }
        const balance = await connection.getBalance(wallet.publicKey);
        document.getElementById("balance").innerHTML = balance/LAMPORTS_PER_SOL;
    }

        useEffect(()=>{
            getBalanceUser();
        },[wallet])

      

    return (
        <div className="balance-container">
            Your Balance: <span id="balance" className="balance-value"></span> SOL
        </div>
    )

}

export default ShowBalance