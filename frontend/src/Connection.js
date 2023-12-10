import Web3 from 'web3';
import meetingContractABI from './ABI/meetingContractABI.json';
import React, {useEffect, useState } from 'react';

export function Connection(){

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract( meetingContractABI, 0x20E329CcCe23f2bDf6FdE58844E4DdCD297B4145);

    return contract;
}