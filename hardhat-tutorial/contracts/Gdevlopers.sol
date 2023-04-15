/SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@hyperlane/contracts/contracts/HyperLane.sol";
//

contract Gdevlopers is ERC20 {
    uint256 public totalProfitGenerated;
    mapping(address => bool) public dividendHolders;
    address[] public dividendHoldersList;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
    //function to mint tokens for the developers
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
    
        
    //using HYperlane to access functions from cross chain using QueryAPI to oraclize the data and circumvent the gas fees
    hyperlane public hyperlane;
     constructor() { 
        hyperlane = new hyperlane;}
        function transferMessage(uint256 recipientChainId, address recipientAddress, string memory message) public {
        bytes memory data = abi.encode(message);
        hyperlane.transfer(recipientChainId, recipientAddress, data);
    }
    function addToDividendHoldersList(address holder) public {
        require(!dividendHolders[holder], "Already a dividend holder");
        dividendHolders[holder] = true;
        dividendHoldersList.push(holder);
    }

    function removeFromDividendHoldersList(address holder) public {
        require(dividendHolders[holder], "Not a dividend holder");
        dividendHolders[holder] = false;
        for (uint i = 0; i < dividendHoldersList.length; i++) {
            if (dividendHoldersList[i] == holder) {
                dividendHoldersList[i] = dividendHoldersList[dividendHoldersList.length - 1];
                dividendHoldersList.pop();
                break;
            }
        }
    }

    function distributeDividends() public {
        require(totalSupply() > 0, "No tokens have been minted yet");
        require(totalProfitGenerated > 0, "No profits have been generated yet");
        uint256 dividendsPerToken = totalProfitGenerated / totalSupply();
        for (uint i = 0; i < dividendHoldersList.length; i++) {
            address holder = dividendHoldersList[i];
            uint256 holderBalance = balanceOf(holder);
            uint256 dividendAmount = holderBalance * dividendsPerToken;
            if (dividendAmount > 0) {
                _mint(holder, dividendAmount);
                emit DividendPaid(holder, dividendAmount);
            }
        }
    }

    event DividendPaid(address holder, uint256 amount);
}