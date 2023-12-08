
import { ChatUIProvider, ChatView } from "@pushprotocol/uiweb";
import { SupportChat } from '@pushprotocol/uiweb'
import { useState } from "react";
import { ethers } from "ethers";

function SupportComp(props) {
    const [signer, setSigner] = useState(null);

    const connectWallet = async () => {
        // Demo only supports MetaMask (or other browser based wallets) and gets provider that injects as window.ethereum into each page
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Get provider
        await provider.send("eth_requestAccounts", []);

        // Grabbing signer from provider
        const signer = provider.getSigner();

        // store signer
        setSigner(signer);
    }

    const disconnectWallet = async () => {
        setSigner(null);
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#dd44b9",
        color: "#FFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px",
    };

    return (
        <>
            <h2>
                Live chat with pushai.eth, connect your wallet and chat to get sassy
                response from PushAI.eth
            </h2>
            <label>
                For this demo, You will need Metamask (or equivalent browser injected
                wallet), you will also need to sign a transaction to see the
                notifications.
            </label>

            <p />
            <button
                style={buttonStyle}
                onClick={signer ? disconnectWallet : connectWallet}
            >
                {signer ? "Disconnect wallet" : "Connect Wallet"}
            </button>

            <div style={{ margin: "20px auto" }}>
                {signer && (
                    <>
                        <SupportChat
                            supportAddress="0x569328Af7BaE6C7f74721835Cc6e35dD20f68D7a" //support address, this belongs to you
                            signer={signer}
                            env="staging" // can be "prod" or "staging"
                        />

                        <h2>
                            Signer obtained, you will be seeing a pink colored Push Chat icon
                            on the bottom right, click to interact.
                        </h2>
                    </>
                )}
            </div>
        </>
    );
}

export default SupportComp;