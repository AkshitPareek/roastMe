// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract pokePortal {

    uint256 totalpokes;
    uint256 private seed;

    //events store transaction logs basically
    event NewPoke(address indexed from, uint256 timestamp, string message);

    struct Poke {
        address poker; //Address of the user who poked
        string message; //Message that the user sent
        uint256 timestamp; //Time of the poke
    }

    Poke[] pokes; //Array of structs to store poke data

    mapping(address => uint256) public lastPokedAt; //hashmaps

    constructor() payable {
        console.log("Guess I am making contracts now!");

        seed = (block.timestamp + block.difficulty) % 100; //set initial seed

    }

    function poke(string memory _message) public {

        require(
            lastPokedAt[msg.sender] + 10 minutes < block.timestamp,
            "Wait 10m"
        );

        /*
        * Update the current timestamp we have for the user
        */
        lastPokedAt[msg.sender] = block.timestamp;

        totalpokes += 1;
        console.log("%s, has poked!", msg.sender); //msg.sender is the wallet address of the person who sent the poke

        pokes.push(Poke(msg.sender, _message, block.timestamp)); //Push the data to our array

        /*
         * Generate a new seed for the next user that sends a wave
         */
        seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);
        
        if (seed<=50) {
            console.log("%s won", msg.sender);
            uint256 prizeAmount = 0.0001 ether;  //solidity lets us define monetary values ex: "ether"
            
            /*
            * require is like if, require(condition, else)
            * address(this).balance gives current contract balance 
            * (msg.sender).call{value: prizeAmount}("") makes us send eth to the user
            */
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");            
        }

        emit NewPoke(msg.sender, block.timestamp, _message); //emit keyword to call an event


    }

    /*
    * This function returns the struct array.
    */
    function getAllpokes() public view returns (Poke[] memory) {
        return pokes;
    }

    function getTotalpokes() public view returns (uint256){
        return totalpokes;
    }
}