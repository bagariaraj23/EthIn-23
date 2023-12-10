import {PushAPI, CONSTANTS} from "@pushprotocol/restapi"
import {ethers} from 'ethers'

// const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_NODE_URL);
const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY_NOTIF);
const healSuper = await PushAPI.initialize(signer, {env: CONSTANTS.ENV.STAGING});

const sendNotification = async (Patient_Address, time_slot) => {
    const sendNotif = await healSuper.channel.send([`${Patient_Address}`],{
        notification:{
            title: "Therapy Scheduled",
            body: `Your therapy session has been booked for the time slot : ${time_slot}. Please be sure to be on time. Thank you !!`
        },
    })
    
}
export {sendNotification} ;
