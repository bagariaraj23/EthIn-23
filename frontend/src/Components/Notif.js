import Notifications from './Notifications';
import * as PushSDK from "@pushprotocol/restapi";
// import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// address of therapist and the user
function Notif() {
    const recipientAddress = 'eip155:5:0x3b246281052d029331B0F374a392A380219c244B'
    const [notifications, setNotifications] = useState([]);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    useEffect(() => {
        const notifications = async () => {
            const notifs = await PushSDK.user.getFeeds({
                user: recipientAddress,
                env: 'staging',
            })
            setNotifications(notifs);
            console.log(notifs)
        };

        notifications()
        // connectToMetamask()
    }, []);


    // async function connectToMetamask() {
    //     try {
    //         console.log("Signed in as", await signer.getAddress())
    //     } catch (err) {
    //         console.log("Not Signed In");
    //         await provider.send("eth_requestAccounts", []);
    //     }
    // }

    const optInChannel = async () => {
        await PushSDK.channels.subscribe({
            signer: signer,
            channelAddress: '0x569328Af7BaE6C7f74721835Cc6e35dD20f68D7a',
            userAddress: await signer.getAddress(),
            onSuccess: () => {
                console.log("Subscribed to channel")
            },
            onError: (err) => { console.log(err) },
            env: 'staging',
        })
    }

    return (
        <div className="Notif">
            <header className="App-header">
                <button className='button-optin' onClick={optInChannel}>Opt In to Channel</button>
                    {notifications && (
                        <Notifications notifications = {notifications}></Notifications>
                )}
            </header>
        </div>
    );
}

export default Notif;