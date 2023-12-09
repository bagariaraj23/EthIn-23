// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract MeetingContract {
    struct Meeting {
        address hostWalletAddress;
        address participantAddress;
        uint256 startTime;
        uint256 amount;
        string roomId;
        bool isCompleted;
    }

    mapping(string => Meeting) public meetings;

    event MeetingScheduled(string roomId, address hostWalletAddress, address participantAddress, uint256 startTime, uint256 amount);


    function scheduleMeeting(address _hostWalletAddress, address _participantAddress, uint256 _startTime,  uint256 _amount, string memory roomId) external payable{
        require(_hostWalletAddress != address(0), "Invalid host wallet address");
        require(_participantAddress != address(0), "Invalid participant address");
        require(_startTime > block.timestamp, "Invalid start time");
        require(_amount > 0, "Invalid fees amount");
        require(msg.value == _amount, "Incorrect payment amount");

        meetings[roomId] = Meeting({
            hostWalletAddress: _hostWalletAddress,
            participantAddress: _participantAddress,
            startTime: _startTime,
            amount: msg.value,
            roomId: roomId,
            isCompleted: false
        });

        emit MeetingScheduled(roomId, _hostWalletAddress, _participantAddress, _startTime, msg.value);
    }

    // this function will be called when meeting is over
    function transferCheck(string memory _roomId, uint256 duration) public {
        meetings[_roomId].isCompleted = true;
        if (duration > 0) {
            address therapistAddress = meetings[_roomId].hostWalletAddress;
            uint256 amount = meetings[_roomId].amount;
            transferFunds(therapistAddress, amount);
        }
        else {
            address userAddress = meetings[_roomId].participantAddress;
            uint256 amount = meetings[_roomId].amount;
            transferFunds(userAddress, amount);
        }
    }


    // Function to transfer funds from the contract to an external account
    function transferFunds(address recipient, uint256 amount) private {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Invalid transfer amount");
        require(address(this).balance >= amount, "Insufficient funds");

        // Transfer funds to the recipient
        payable(recipient).transfer(amount);
    }

}