// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract NFTMarketplace is ReentrancyGuard {
  using Counters for Counters.Counter;
  Counters.Counter private _itemCounter; // start from 1
  Counters.Counter private _itemSoldCounter;

  address payable public marketowner;
  uint public serviceFeeForInitialSale = 15;
  uint public serviceFeeForSecondarySale = 5;
  uint public royaltyFee = 10;
  uint public bidIncreasePercentage = 50;

  enum State { Created, Release, Inactive }

  struct MarketItem {
    uint id;
    address nftContract;
    uint256 tokenId;
    address payable seller;
    address payable buyer;
    address payable creator;
    uint256 price;
    State state;
  }

  struct AuctionItem {
        uint id;
        address nftContract;
        uint256 tokenId;
        uint128 startPrice;
        uint32 auctionBidPeriod;
        uint256 started_at;
        uint256 highestBid;
        address highestBidder;
        address payable seller;
        address payable creator;
        State state;
  }
  
  MarketItem[] public soldItems;
  AuctionItem[] public auctionsItems;
  mapping(uint256 => MarketItem) public marketItems;
  mapping(uint256 => AuctionItem) public auctionItems;

  event MarketItemCreated (
    uint indexed id,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address buyer,
    address creator,
    uint256 price,
    State state
  );

  event auctionItemCreated(
        uint indexed id,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address highestBidder,
        uint32 auctionBidPeriod,
        uint128 startPrice,
        uint256 started_at,
        uint256 highestBid,
        address creator,
        State state
  );

  event MarketItemSold (
    uint indexed id,
    address indexed nftContract,
    uint256 indexed tokenId,
    address seller,
    address buyer,
    address creator,
    uint256 price,
    State state
  );

  constructor() {
    marketowner = payable(msg.sender);
  }

  modifier onlyByOwner {
    require(msg.sender == marketowner, "You are not an owner of Marketplace.");
    _;
  }

  /**
   * @dev Returns the listing fee of the marketplace
   */

  function getLengthOfItems() public view returns(uint256) {
    uint256 length = _itemCounter.current();
    return length;
  }

  function setBigIncreasePercentage(uint _percent) public onlyByOwner {
    bidIncreasePercentage = _percent;
  }

  function getRoyalty() public view returns (uint) {
    return royaltyFee;
  }

  function setRoyalty(uint _percent) public onlyByOwner {
    royaltyFee = _percent;
  }

  function getServiceFeeForInitialSale() public view returns (uint) {
    return serviceFeeForInitialSale;
  }

  function setServiceFeeForInitialSale(uint _percent) public onlyByOwner {
    serviceFeeForInitialSale = _percent;
  }

  function getServiceFeeForSecondarySale() public view returns(uint){
    return serviceFeeForSecondarySale;
  }

  function setServiceFeeForSecondarySale(uint _percent) public onlyByOwner {
    serviceFeeForSecondarySale = _percent;
  }

  
  /**
   * @dev create a MarketItem for NFT sale on the marketplace.
   * 
   * List an NFT.
   */

  function createAuctionItem(
    address nftContract,
    uint256 tokenId,
    uint128 startPrice,
    uint32 auctionBidPeriod
  ) public payable nonReentrant {
    require(startPrice > 0, "Price must be at least 1 wei");

    _itemCounter.increment();
    uint256 id = _itemCounter.current();
    require(IERC721(nftContract).getApproved(tokenId) == address(this), "NFT must be approved to market");
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    auctionItems[id] = AuctionItem(
       id,
       nftContract,
       tokenId,
       startPrice,
       auctionBidPeriod,
       block.timestamp,
       0,
       payable(address(0)),
       payable(msg.sender),
       payable(msg.sender),
       State.Created
    );

      emit auctionItemCreated(
        id,
        nftContract,
        tokenId,
        msg.sender,
        address(0),
        auctionBidPeriod,
        startPrice,
        block.timestamp,
        0,
        msg.sender,
        State.Created
    );

  }

  function createAuctionItemForSecondarySale(
    uint256 id,
    uint128 startPrice,
    uint32 auctionBidPeriod
  ) public payable nonReentrant {
    require(startPrice > 0, "Price must be at least 1 wei");
    AuctionItem storage item = auctionItems[id];
    require(IERC721(item.nftContract).getApproved(item.tokenId) == address(this), "NFT must be approved to market");
    IERC721(item.nftContract).transferFrom(msg.sender, address(this), item.tokenId);
    item.startPrice = startPrice;
    item.auctionBidPeriod = auctionBidPeriod;
    item.seller = payable(msg.sender);
    item.highestBidder = address(0);
    item.highestBid = 0;
    item.started_at = block.timestamp;
    item.state = State.Created;
  }

  function placeBid(
    uint256 id
    ) public payable nonReentrant {
      AuctionItem storage item  = auctionItems[id];
      require(msg.sender != item.seller, "You are an owner of NFT.");
      require((item.started_at + item.auctionBidPeriod) >= block.timestamp, "Auction Time is passed.");

      if(item.highestBidder != address(0) && item.highestBid > 0 ) {
        uint256 prevBid = item.highestBid;
        address prevBidder = item.highestBidder;
        require(item.highestBid * (100 + bidIncreasePercentage) / 100 <= msg.value, "Your bid amount must be bigger than 1.5 * other bid amount.");
        payable(prevBidder).transfer(prevBid);
        item.highestBidder = payable(msg.sender);
        item.highestBid = msg.value;
        item.state = State.Release;

      } else {
         item.highestBidder = payable(msg.sender);
         item.highestBid = msg.value;
         item.state = State.Release;
      }
  }

  function cancelAuction(uint256 id) public payable nonReentrant {
    
    AuctionItem storage item = auctionItems[id];
    require(item.seller == msg.sender, "You are not an owner of this NFT.");
    require(item.highestBidder == address(0), "This Auction has already started by others.");

    IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);

    delete auctionItems[id];

  } 


  function claimNFT(uint256 id) public payable nonReentrant {
    AuctionItem storage item = auctionItems[id];
    require(item.started_at + item.auctionBidPeriod <= block.timestamp, "Auction is on going.");
    require(msg.sender != item.seller, "You are an owner of NFT.");
    item.state = State.Inactive;
     _itemSoldCounter.increment();

    IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);
    uint256 serviceFee = item.highestBid * serviceFeeForInitialSale / 100;
    payable(marketowner).transfer(serviceFee);
    item.seller.transfer(item.highestBid - serviceFee);
    auctionsItems.push(item);
  }

  function claimNFTForSecondarySale(uint256 id) public payable nonReentrant {
    AuctionItem storage item = auctionItems[id];
    require(item.started_at + item.auctionBidPeriod <= block.timestamp, "Auction is on going.");
    require(msg.sender != item.seller, "You are an owner of NFT.");
    item.state = State.Inactive;
     _itemSoldCounter.increment();

    IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);
    uint256 serviceFee = item.highestBid * serviceFeeForSecondarySale / 100;
    uint256 royalty = item.highestBid * royaltyFee / 100;
    payable(marketowner).transfer(serviceFee);
    payable(item.creator).transfer(royalty);
    item.seller.transfer(item.highestBid - serviceFee - royalty);
  }

  function createMarketItem(
    address nftContract,
    uint256 tokenId,
    uint256 price
  ) public payable nonReentrant {

    require(price > 0, "Price must be at least 1 wei");

    _itemCounter.increment();
    uint256 id = _itemCounter.current();
  
    marketItems[id] =  MarketItem(
      id,
      nftContract,
      tokenId,
      payable(msg.sender), // seller
      payable(address(0)),
      payable(msg.sender),
      price,
      State.Created
    );
    require(IERC721(nftContract).getApproved(tokenId) == address(this), "NFT must be approved to market");
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated(
      id,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      msg.sender,
      price,
      State.Created
    );
  }

  function createMarketItemForSecondary(
    uint256 price,
    uint id
  ) public payable nonReentrant {

    require(price > 0, "Price must be at least 1 wei");
    marketItems[id].seller = payable(msg.sender);
    marketItems[id].buyer = payable(address(0));
    marketItems[id].price = price;
    marketItems[id].state = State.Created;
    uint256 tokenId = marketItems[id].tokenId;
    address nftContract = marketItems[id].nftContract;
    require(IERC721(nftContract).getApproved(tokenId) == address(this), "NFT must be approved to market");
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

    emit MarketItemCreated(
      id,
      nftContract,
      tokenId,
      msg.sender,
      address(0),
      marketItems[id].creator,
      price,
      State.Created
    );
  }

  /**
   * @dev (buyer) buy a MarketItem from the marketplace.
   * Transfers ownership of the item, as well as funds
   * NFT:         seller    -> buyer
   * value:       buyer     -> seller
   * listingFee:  contract  -> marketowner
   */
  function createMarketSale(
    address nftContract,
    uint256 id
  ) public payable nonReentrant {

    MarketItem storage item = marketItems[id]; //should use storge!!!!
    uint price = item.price;
    uint tokenId = item.tokenId;
    require(msg.sender != item.seller, "You are an owner of NFT.");
    require(msg.value == price, "Please submit the asking price");

    item.buyer = payable(msg.sender); // buyer
    item.state = State.Release;

    _itemSoldCounter.increment();    

    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    uint256 serviceFee = msg.value * serviceFeeForInitialSale / 100;
    payable(marketowner).transfer(serviceFee);
    item.seller.transfer(msg.value - serviceFee);
    soldItems.push(item);
    emit MarketItemSold(
      id,
      nftContract,
      tokenId,
      item.seller,
      msg.sender,
      marketItems[id].creator,
      price,
      State.Release
    );    
  }

   function createMarketSecondarySale(
    address nftContract,
    uint256 id
  ) public payable nonReentrant {

    MarketItem storage item = marketItems[id]; //should use storge!!!!
    uint price = item.price;
    uint tokenId = item.tokenId;
    address creator = payable(item.creator);
    require(msg.sender != item.seller, "You are an owner of NFT.");
    require(msg.value == price, "Please submit the asking price");
    

    item.buyer = payable(msg.sender); // buyer
    item.state = State.Release;

    _itemSoldCounter.increment();

    IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
    uint256 serviceFee = msg.value * serviceFeeForSecondarySale / 100;
    uint256 royalty = msg.value * royaltyFee / 100;
    payable(marketowner).transfer(serviceFee);
    payable(creator).transfer(royalty);
    item.seller.transfer(msg.value - serviceFee - royalty);
    emit MarketItemSold(
      id,
      nftContract,
      tokenId,
      item.seller,
      msg.sender,
      item.creator,
      price,
      State.Release
    );    
  }

    

  /**
   * @dev Returns all unsold market items
   * condition: 
   *  1) state == Created
   *  2) buyer = 0x0
   *  3) still have approve
   */

  function getItemIdByTokenId() public view returns (MarketItem[] memory) {
   return soldItems;
  }

  function getAuctionItemSoldOut() public view returns (AuctionItem[] memory) {
    return auctionsItems;
  }

  function fetchActiveItems() public view returns (MarketItem[] memory) {
    return fetchHepler(FetchOperator.ActiveItems);
  }

  /**
   * @dev Returns only market items a user has purchased
   * todo pagination
   */
  function fetchMyPurchasedItems() public view returns (MarketItem[] memory) {
    return fetchHepler(FetchOperator.MyPurchasedItems);
  }

  /**
   * @dev Returns only market items a user has created
   * todo pagination
  */
  function fetchMyCreatedItems() public view returns (MarketItem[] memory) {
    return fetchHepler(FetchOperator.MyCreatedItems);
  }

  enum FetchOperator { ActiveItems, MyPurchasedItems, MyCreatedItems}

  /**
   * @dev fetch helper
   * todo pagination   
   */
   function fetchHepler(FetchOperator _op) private view returns (MarketItem[] memory) {     
    uint total = _itemCounter.current();

    uint itemCount = 0;
    for (uint i = 1; i <= total; i++) {
      if (isCondition(marketItems[i], _op)) {
        itemCount ++;
      }
    }

    uint index = 0;
    MarketItem[] memory items = new MarketItem[](itemCount);
    for (uint i = 1; i <= total; i++) {
      if (isCondition(marketItems[i], _op)) {
        items[index] = marketItems[i];
        index ++;
      }
    }
    return items;
  } 

  /**
   * @dev helper to build condition
   *
   * todo should reduce duplicate contract call here
   * (IERC721(item.nftContract).getApproved(item.tokenId) called in two loop
   */
  function isCondition(MarketItem memory item, FetchOperator _op) private view returns (bool){
    if(_op == FetchOperator.MyCreatedItems){ 
      return 
        (item.seller == msg.sender
          && item.state != State.Inactive
        )? true
         : false;
    }else if(_op == FetchOperator.MyPurchasedItems){
      return
        (item.buyer ==  msg.sender) ? true: false;
    }else if(_op == FetchOperator.ActiveItems){
      return 
        (item.buyer == address(0) 
          && item.state == State.Created
          && (IERC721(item.nftContract).getApproved(item.tokenId) == address(this))
        )? true
         : false;
    }else{
      return false;
    }
  }

}
