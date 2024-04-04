// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ettarra is ERC721, ERC721URIStorage, Pausable, Ownable {
    constructor() ERC721("Ettarra", "ETR") {}

    event addLoyaltyPointsOfUserEvent(address _userAddress, uint256 _points, uint256 _usersLoyaltyPoints);
    event subtractLoyaltyPointsOfUserEvent(address _userAddress, uint256 _points, uint256 _usersLoyaltyPoints);
    event changeLoyaltyThresholdEvent(uint256 _tokenId, uint256 _newThreshold, uint256 _tokenThreshold);
    event assignNFTEvent(address _userAddress, uint256 _tokenId, bool _result);
    event safeMintEvent(address _to, uint256 _tokenId, string _uri, uint256 _threshold);

    // Mapping to set the threshold points limit for getting each NFT
    mapping(uint256 => uint256) tokenThreshold;

    // Mapping to store users NFTs
    mapping(address => uint256[]) usersNFTs;

    // Mapping of each address (user) to a mapping of token(Id) and the loyalty points for that token(Id)
    mapping(address => uint256) usersLoyalty;

    function addLoyaltyPointsOfUser(
        address userAddress,
        uint256 points
    ) public {
        usersLoyalty[userAddress] += points;
        emit addLoyaltyPointsOfUserEvent(userAddress, points, usersLoyalty[userAddress]);
    }

    function subtractLoyaltyPointsOfUser(
        address userAddress,
        uint256 points
    ) public {
        usersLoyalty[userAddress] -= points;
        emit subtractLoyaltyPointsOfUserEvent(userAddress, points, usersLoyalty[userAddress]);
    }

    function viewLoyaltyPointsOfUser(address userAddress) public view returns(uint256) {
        return usersLoyalty[userAddress];
    }

    function changeLoyaltyThreshold(uint256 tokenId, uint256 newThreshold)
        public
    {
        tokenThreshold[tokenId] = newThreshold;
        emit changeLoyaltyThresholdEvent(tokenId, newThreshold, tokenThreshold[tokenId]);
    }

    function assignNFT(address userAddress, uint256 tokenId)
        public
        returns (bool)
    {
        require(usersLoyalty[userAddress] >= tokenThreshold[tokenId]);
        usersLoyalty[userAddress] -= tokenThreshold[tokenId];
        usersNFTs[userAddress].push(tokenId);
        emit assignNFTEvent(userAddress, tokenId, true);
        return true;
    }

    function getUsersNFTs(address userAddress)
        public
        view
        returns (string[] memory)
    {
        // uint256[] memory tokenIds = new uint256[](2);
        uint256 len = usersNFTs[userAddress].length;
        string[] memory tokenURIs = new string[](len);
        for (uint256 i = 0; i < len; i++) {
            tokenURIs[i] = this.tokenURI(usersNFTs[userAddress][i]);
        }

        return tokenURIs;
    }

    // ===================================================================================
    function _baseURI() internal pure override returns (string memory) {
        return
            "https://res.cloudinary.com/dy16ukgyv/image/upload/ettarra_nfts/";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri,
        uint256 threshold
    ) public {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        tokenThreshold[tokenId] = threshold;
        emit safeMintEvent(to, tokenId, uri, threshold);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
