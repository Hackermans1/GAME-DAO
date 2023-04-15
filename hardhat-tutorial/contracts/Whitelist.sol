//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Whitelist {

    

    //Whitelist Contract Address: 0x50163d28a816fa5418733CA1DC56e641d29fFb6F
    uint8 public maxWhitelistedAddresses;

    // Create a mapping of whitelistedAddresses
    
    mapping(address => bool) public whitelistedAddresses;

    
    uint8 public numAddressesWhitelisted;

    // MAX value at the time of deployment
    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses =  _maxWhitelistedAddresses;
    }

    // stake function
    function stake() public {
        require(whitelistedAddresses[msg.sender], "Sender is not whitelisted");
    }
    
    function addAddressToWhitelist() public {
        
        require(!whitelistedAddresses[msg.sender], "Sender has already been whitelisted");
        require(numAddressesWhitelisted < maxWhitelistedAddresses, "More addresses cant be added, limit reached");
        whitelistedAddresses[msg.sender] = true;
        numAddressesWhitelisted += 1;
    }

}