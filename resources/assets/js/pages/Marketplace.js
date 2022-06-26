import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { NFTmarketplaceAddress, NFTAddress } from "../contract/address";
import MarketAbi from "../contract/abi/MarketAbi.json";
import MintAbi from "../contract/abi/MintAbi.json";
import Moment from "moment";
import { Bars } from  'react-loader-spinner';
import Countdown from "react-countdown";

const http = axios.create({
  baseURL: "https://deep-index.moralis.io/api/v2",
  headers: {
    "Content-Type": "application/json",
    "X-API-Key":
      "LJgrel5PZhPaLpLRShkYe2tNvGqUSxtZwudQAeDjWJMLYJ2bEsaG16RWpFJ6rrrf",
  },
});

function shortenAddress(address, chars = 4) {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

function Marketplace() {
  // State Variables
  const [marketId, setMarketId] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [auth, setAuth] = useState("");
  const [listedItems, setListedItems] = useState([]);
  const [timedItems, setTimedItems] = useState([]);
  const [curItem, setCurItem] = useState({});
  const [curAuctionItem, setCurAuctionItem] = useState({});
  const [secItems, setSecItems] = useState([]);
  const [curBidAmount, setCurBidAmount] = useState("");
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCollections();
    loadNFTItems();
    getSoldOutItems();
  }, []);

  // Functions
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      

      return (
        <button className="btn btn-sm btn-grad">Auction Time Passed</button>
      );
    } else {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <div className="item">
            <div className="number txt">
              {days >= 10 ? days : "0" + days}
              <span></span>
            </div>
          </div>
          <div className="dots">:</div>
          <div className="item">
            <div className="number txt">
              {hours >= 10 ? hours : "0" + hours}
              <span></span>
            </div>
          </div>
          <div className="dots">:</div>
          <div className="item">
            <div className="number txt">
              {minutes >= 10 ? minutes : "0" + minutes}
              <span></span>
            </div>
          </div>
          <div className="dots">:</div>
          <div className="item">
            <div className="number txt">
              {seconds >= 10 ? seconds : "0" + seconds}
              <span></span>
            </div>
          </div>
        </div>
      );
    }
  };

  const loadNFTItems = async () => {
    setIsLoading(true);
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAuth(accounts[0]);

    const rawData = await http.get(
      `/${NFTmarketplaceAddress}/nft?chain=rinkeby&format=decimal`
    );
    const nfts = rawData.data.result;
    console.log(nfts);

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      NFTmarketplaceAddress,
      MarketAbi,
      signer
    );

    if (nfts.length > 0) {
      let fixedItems = [];
      let auctionItems = [];
      const lengthOfItems = await connectedContract.getLengthOfItems();
      const length = parseInt(lengthOfItems, 16);

      for (let i = 1; i <= length; i++) {
        const gettingItem = await connectedContract.marketItems(i);
        const gettingAuctionItem = await connectedContract.auctionItems(i);
        const fixedItemid = Number(ethers.utils.formatEther(gettingItem["id"]._hex)) * 1e18;
        const fixedTokenId = Number(ethers.utils.formatEther(gettingItem["tokenId"]._hex)) * 1e18;
        const auctionItemid = Number(ethers.utils.formatEther(gettingAuctionItem["id"]._hex)) * 1e18;
        const auctionTokenId = Number(ethers.utils.formatEther(gettingAuctionItem["tokenId"]._hex)) * 1e18;

        if (fixedItemid > 0) {
          let metadata = await getMetaByTokenId(
            nfts,
            fixedTokenId
          );
          const item = {
            id: fixedItemid,
            price: ethers.utils.formatEther(gettingItem["price"]._hex),
            seller: gettingItem["seller"],
            buyer: gettingItem["buyer"],
            creator: gettingItem["creator"],
            contract: gettingItem["nftContract"],
            state: gettingItem["state"],
            tokenId: fixedTokenId,
            metadata: metadata,
            type: "fixed",
            duration: 0,
          };
          fixedItems.push(item);
        }
        if (
          auctionItemid > 0 &&
          auctionTokenId > 0
        ) {
          
          const tokenId = auctionTokenId;
          let metadata = await getMetaByTokenId(nfts, tokenId);
          const restTime = calcAuctionPeriod(
            gettingAuctionItem["started_at"],
            gettingAuctionItem["auctionBidPeriod"]
          );
          const item = {
            id: auctionItemid,
            price: ethers.utils.formatEther(
              gettingAuctionItem["startPrice"]._hex
            ),
            seller: gettingAuctionItem["seller"],
            buyer: gettingAuctionItem["highestBidder"],
            creator: gettingAuctionItem["creator"],
            contract: gettingAuctionItem["nftContract"],
            state: gettingAuctionItem["state"],
            tokenId: tokenId,
            metadata: metadata,
            now: Date.now(),
            type: "auction",
            duration: restTime,
            highestBid: ethers.utils.formatEther(
              gettingAuctionItem["highestBid"]._hex
            ),
          };
          auctionItems.push(item);
        }
      }
      setListedItems(fixedItems);
      setTimedItems(auctionItems);
      
    }
    setIsLoading(false);
  };

  const getCollections = async () => {
    const { ethereum } = window;

    // get current wallet address
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(NFTAddress, MintAbi, signer);

    let results = await connectedContract.fetchCollections();
    let collections = [];
    for (let index = 0; index < results.length; index++) {
      collections.push(results[index]);
    }
    console.log(collections, "collections");
    setCollections(collections);
  };

  const calcAuctionPeriod = (_startTime, _duration) => {
    const endTime = Number(_startTime) + Number(_duration);
    const now = convertStandardTimeToUnix(Date.now());
    const restTime = endTime - now;
    return restTime;
  };

  const convertStandardTimeToUnix = (_date) => {
    const unixTime = Moment(_date).unix();
    return unixTime;
  };

  const getMetaByTokenId = (_nfts, _tokenId) => {
    console.log(_nfts, _tokenId);
    const nft = _nfts.filter((value, index) => {
      return Number(value.token_id) == _tokenId;
    });
    if (nft.length > 0) {
      return JSON.parse(nft[0].metadata);
    }
  };

  const getSoldOutItems = async () => {
    // get current wallet address
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setAuth(accounts[0]);

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      NFTmarketplaceAddress,
      MarketAbi,
      signer
    );
    let soldOutItems = await connectedContract.getItemIdByTokenId();
    let auctionItems = await connectedContract.getAuctionItemSoldOut();
    let itemList = [];
    soldOutItems.forEach((item, index) => {
      let nft = {
        id: parseInt(item["id"], 16),
        contract: item.nftContract,
        tokenId: parseInt(item["tokenId"], 16),
      };
      itemList.push(nft);
    });
    auctionItems.forEach((item, index) => {
      let nft = {
        id: parseInt(item["id"], 16),
        contract: item.nftContract,
        tokenId: parseInt(item["tokenId"], 16),
        type: "auction",
      };
      itemList.push(nft);
    });
    if (itemList.length > 0) {
      setSecItems(itemList);
    }
  };

  const checkItemForSecondarySale = (_tokenId) => {
    let itemId = 0;
    secItems.forEach((item, index) => {
      if (item.tokenId == Number(_tokenId)) {
        itemId = item.id;
      }
    });
    return itemId;
  };

  const buyForFirstSale = async () => {
    const { ethereum } = window;

    // get current wallet address
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(
      NFTmarketplaceAddress,
      MarketAbi,
      signer
    );
    const price = ethers.utils.parseUnits(curItem.price.toString(), "ether");
    const result = checkItemForSecondarySale(curItem.tokenId);
    if (result > 0) {
      let buying_sec = await marketContract.createMarketSecondarySale(
        NFTAddress,
        curItem.id,
        {
          value: price,
        }
      );
      await buying_sec.wait();
      loadNFTItems();
      toastr.success("You bought an NFT Successfully !");
    } else {
      let buying = await marketContract.createMarketSale(
        NFTAddress,
        curItem.id,
        {
          value: price,
        }
      );
      await buying.wait();
      loadNFTItems();
      toastr.success("You bought an NFT Successfully !");
    }
  };

  const placeBid = async () => {
    const { ethereum } = window;

    // get current wallet address
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(
      NFTmarketplaceAddress,
      MarketAbi,
      signer
    );

    const checkPrice =
      curAuctionItem.highestBid > 0
        ? curAuctionItem.highestBid
        : curAuctionItem.price;
    if (Number(curBidAmount) < (checkPrice * 1.5).toFixed(5)) {
      toastr.error(
        `Auction Bid amount must be equal or greater than ${curAuctionItem.price *
          1.5} ETH`
      );
    } else {
      const bidAmount = ethers.utils.parseUnits(curBidAmount, "ether");
      try {
        let bidding = await marketContract.placeBid(curAuctionItem.id, {
          value: bidAmount,
        });
        await bidding.wait();
        loadNFTItems();
        toastr.success("Place your Bidding successfully!");
      } catch(err) {
        toastr.error('The period of Auction has already passed!')
      }
     
    }
  };

  const cancelBid = async () => {
    const { ethereum } = window;

    // get current wallet address
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(
      NFTmarketplaceAddress,
      MarketAbi,
      signer
    );
    try {
      console.log(curAuctionItem);
      let cancelling = await marketContract.cancelAuction(curAuctionItem.id);
      await cancelling.wait();
      toastr.success("Cancel your Auction successfully!");
      loadNFTItems();
    } catch (err) {
      toastr.error("The Auction has already started by others!");
    }
  };

  const claimNFT = async () => {
    const { ethereum } = window;

    // get current wallet address
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const marketContract = new ethers.Contract(
      NFTmarketplaceAddress,
      MarketAbi,
      signer
    );
    const result = checkItemForSecondarySale(curAuctionItem.tokenId);
    if (result > 0) {
      try {
        let claiming = await marketContract.claimNFTForSecondarySale(
          curAuctionItem.id
        );
        await claiming.wait();
        toastr.success("Claimed your NFT successfully!");
        loadNFTItems();
      } catch (err) {
        toastr.error("Transfer Caller is not an owner nor approved.");
      }
    } else {
      try {
        let claiming = await marketContract.claimNFT(curAuctionItem.id);
        await claiming.wait();
        toastr.success("Claimed your NFT successfully!");
        loadNFTItems();
      } catch (err) {
        toastr.error("Transfer Caller is not an owner nor approved.");
      }
    }
  };

  if(marketId) return <Redirect to={{pathname: '/item-detail', id: marketId}}  />

  if(collectionId) return <Redirect to={{pathname: '/items', id: collectionId}}  />

  return (
    <div>
      <div className="hero_marketplace bg_white">
        <div className="container">
          <h1 className="text-center">NFT Marketplace</h1>
        </div>
      </div>
      {/* <div className="bg_white border-b py-20">
        <div className="container">
          <div className="d-flex justify-content-center">
            <ul className="menu_categories space-x-20">
              <li>
                <a href="#" className="color_brand">
                  <span> All </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-gamepad-line"></i> <span> Games </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-brush-line"></i> <span> Art </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-stock-line"></i> <span> Trading Cards </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-music-line"></i> <span> Music </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-global-line"></i> <span> Domain Names </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-emotion-laugh-line"></i> <span> Memes </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-layout-4-line"></i>{" "}
                  <span> Collectibles </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="section mt-100">
          <div className="section__head">
            <h2 className="section__title mb-20"> Artworks</h2>
            <div className="row justify-content-end align-items-center">
              {/* <div className="col-lg-auto">
                <div className="d-flex space-x-10 align-items-center">
                  <span
                    className="color_text txt_sm"
                    style={{ minWidth: "max-content" }}
                  >
                    FILTER BY:
                  </span>
                  <ul className="menu_categories space-x-20">
                    <li className="d-flex space-x-10 switch_item">
                      <input
                        type="checkbox"
                        id="switch1"
                        onChange={() => this.checkedhandleChange()}
                      />
                      <label htmlFor="switch1">Toggle</label>
                      <span> Has list price </span>
                    </li>
                    <li className="d-flex space-x-10 switch_item">
                      <input
                        type="checkbox"
                        id="switch2"
                        onChange={() => this.checkedhandleChange()}
                        checked
                      />
                      <label htmlFor="switch2">Toggle</label>
                      <span> Has open offer </span>
                    </li>
                    <li className="d-flex space-x-10 switch_item">
                      <input
                        type="checkbox"
                        id="switch3"
                        onChange={() => this.checkedhandleChange()}
                      />
                      <label htmlFor="switch3">Toggle</label>
                      <span> Owned by creator </span>
                    </li>
                    <li className="d-flex space-x-10 switch_item">
                      <input
                        type="checkbox"
                        id="switch4"
                        onChange={() => this.checkedhandleChange()}
                      />
                      <label htmlFor="switch4">Toggle</label>
                      <span> Has sold </span>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="col-lg-auto">
                <div className="d-flex space-x-10 align-items-center sm:mt-20">
                  <span className="color_text txt_sm"> SORT BY: </span>
                  <div className="dropdown">
                    <button
                      className="btn btn-dark btn-sm dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Recent Active
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade popup"
            id="popup_bid_success"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="modal-body space-y-20 p-40">
                  <h3 className="text-center">
                    Your Bidding Successfuly Added
                  </h3>
                  <p className="text-center">
                    your bid{" "}
                    <span
                      className="color_text txt
                                                    _bold"
                    >
                      (16ETH){" "}
                    </span>{" "}
                    has been listing to our database
                  </p>

                  <a href="" className="btn btn-dark w-full">
                    {" "}
                    Watch the listings
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade popup"
            id="popup_bid"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="modal-body space-y-20 p-40">
                  <h3>Place a Bid</h3>
                  <p>
                    You must bid at least{" "}
                    <span className="color_black">
                      {curAuctionItem.highestBid > 0
                        ? (curAuctionItem.highestBid * 1.5).toFixed(5)
                        : curAuctionItem.price * 1.5}{" "}
                      ETH
                    </span>
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="00.00 ETH"
                    value={curBidAmount}
                    onChange={(e) => setCurBidAmount(e.target.value)}
                  />

                  <p>
                    NFT quantity.{" "}
                    <span className="color_green">1 available</span>
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    value="1"
                    readOnly
                  />
                  <div className="hr"></div>

                  <div className="d-flex justify-content-between">
                    <p> service fee:</p>
                    <p className="text-right color_black txt _bold"> 15%</p>
                  </div>

                  <a
                    href="#"
                    className="btn btn-primary w-full"
                    onClick={() => placeBid()}
                  >
                    {" "}
                    Place a bid
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade popup"
            id="popup_cancelbid"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="modal-body space-y-20 p-40">
                  <h3>Cancel Auction</h3>
                  <p>
                    Your starting price is{" "}
                    <span className="color_black">
                      {curAuctionItem.price} ETH
                    </span>
                  </p>

                  <p>
                    NFT quantity.{" "}
                    <span className="color_green">1 available</span>
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    value="1"
                    readOnly
                  />
                  <div className="hr"></div>

                  <a
                    href="#"
                    className="btn btn-primary w-full"
                    onClick={() => cancelBid()}
                  >
                    {" "}
                    Cancel Auction
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade popup"
            id="popup_buy"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="modal-body space-y-20 p-40">
                  <h3>Buy Now</h3>
                  <p>
                    <span className="color_black">Price (Ether)</span>
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="00.00 ETH"
                    value={curItem.price}
                    readOnly
                  />

                  <p>
                    Enter quantity.{" "}
                    <span className="color_green">1 available</span>
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    value="1"
                    readOnly
                  />
                  <div className="hr"></div>
                  <div className="d-flex justify-content-between">
                    <p> service free:</p>
                    <p className="text-right color_black txt _bold">
                      {" "}
                      {curItem.price * 0.15} ETH{" "}
                    </p>
                  </div>
                  <a
                    href=""
                    className="btn btn-primary w-full"
                    data-toggle="modal"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      buyForFirstSale();
                    }}
                  >
                    {" "}
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade popup"
            id="popup_claim"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="modal-body space-y-20 p-40">
                  <h3>Claim an NFT!</h3>
                  <p>
                    Your bidding price was{" "}
                    <span className="color_black">
                      {curAuctionItem.highestBid} ETH
                    </span>
                  </p>

                  <p>
                    NFT quantity.{" "}
                    <span className="color_green">1 available</span>
                  </p>
                  <input
                    type="text"
                    className="form-control"
                    value="1"
                    readOnly
                  />
                  <div className="hr"></div>

                  <a
                    href="#"
                    className="btn btn-primary w-full"
                    onClick={() => claimNFT()}
                  >
                    {" "}
                    Claim an NFT
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade popup"
            id="popup_history"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="modal-body space-y-20 p-40">
                  <h4> History </h4>
                  <div className="creator_item creator_card space-x-10">
                    <div className="avatars space-x-10">
                      <div className="media">
                        <div className="badge">
                          <img src="assets/img/icons/Badge.svg" alt="" />
                        </div>
                        <a href="/profile">
                          <img
                            src="assets/img/avatars/avatar_1.png"
                            alt="Avatar"
                            className="avatar avatar-md"
                          />
                        </a>
                      </div>
                      <div>
                        <p className="color_black">
                          Bid accepted{" "}
                          <span className="color_brand">1 ETH</span> by{" "}
                          <a
                            className="color_black txt
                                                                _bold"
                            href="/profile"
                          >
                            ayoub
                          </a>
                        </p>
                        <span className="date color_text">
                          28/06/2021, 12:08
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="creator_item creator_card space-x-10">
                    <div className="avatars space-x-10">
                      <div className="media">
                        <div className="badge">
                          <img src="assets/img/icons/Badge.svg" alt="" />
                        </div>
                        <a href="/profile">
                          <img
                            src="assets/img/avatars/avatar_2.png"
                            alt="Avatar"
                            className="avatar avatar-md"
                          />
                        </a>
                      </div>
                      <div>
                        <p className="color_black">
                          Bid accepted{" "}
                          <span className="color_brand">3 ETH</span> by{" "}
                          <a
                            className="color_black txt
                                                                _bold"
                            href="/profile"
                          >
                            monir
                          </a>
                        </p>
                        <span className="date color_text">
                          22/05/2021, 12:08
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-30_reset">
            <div className="d-flex justify-content-center">
              {
                isLoading && (
                  <Bars
                                                    heigth="10"
                                                    width="30"
                                                    color='white'
                                                    ariaLabel='loading'
                                                />
                )
              }
           
            </div>

            {listedItems.length > 0 &&
              listedItems.map((item, index) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  key={index}
                >
                  <div className="card__item four">
                    <div className="card_body space-y-10">
                      {/* <div className="creators space-x-10">
                        <div className="avatars space-x-3">
                          <a href="/profile">
                            <img
                              src={"assets/img/avatars/avatar_1.png"}
                              alt="Avatar"
                              className="avatar avatar-sm"
                            />
                          </a>
                          <a href="/profile">
                            <p className="avatars_name txt_xs">@mickel_fenn</p>
                          </a>
                        </div>
                        <div className="avatars space-x-3">
                          <a href="/profile">
                            <img
                              src="assets/img/avatars/avatar_2.png"
                              alt="Avatar"
                              className="avatar avatar-sm"
                            />
                          </a>
                          <a href="/profile">
                            <p className="avatars_name txt_xs">
                              @danil_pannini
                            </p>
                          </a>
                        </div>
                      </div> */}
                      <div className="card_head">
                        <a href="#" onClick={() => setMarketId(item.id)}>
                          <img
                            src={
                              item.metadata !== undefined
                                ? item.metadata.image
                                : "assets/img/items/cover_1.png"
                            }
                            alt=""
                          />
                        </a>

                        {/* <a href="#" className="likes space-x-3">
                          <i className="ri-heart-3-fill"></i>
                          <span className="txt_sm">1.2k</span>
                        </a> */}
                      </div>

                      <h6 className="card_title">
                        {item.metadata !== undefined
                          ? item.metadata.name
                          : "NFT Name"}
                      </h6>
                      <div className="card_footer d-block space-y-10">
                        <div className="card_footer justify-content-between">
                          <div className="creators">
                            <p className="txt_sm"> 1 in stock</p>
                          </div>
                          <a href="#" className="">
                            <p className="txt_sm">
                              Price:{" "}
                              <span
                                className="color_green
                                                                txt_sm"
                              >
                                {item.price} ETH
                              </span>
                            </p>
                          </a>
                        </div>
                        <div className="hr"></div>
                        <div
                          className="d-flex align-items-center space-x-10
                                                    justify-content-between"
                        >
                          <div
                            className="d-flex align-items-center
                                                        space-x-10"
                          >
                            <i className="ri-history-line"></i>
                            <a
                              className="view_history"
                              href="#"
                              data-toggle="modal"
                              data-target="#popup_history"
                            >
                              <p
                                className="color_text txt_sm"
                                style={{ width: "auto" }}
                              >
                                View History
                              </p>
                            </a>
                          </div>

                          {item.seller.toLowerCase() !== auth.toLowerCase() && (
                            <a
                              className="btn btn-sm btn-primary"
                              href="#"
                              data-toggle="modal"
                              data-target="#popup_buy"
                              onClick={() => setCurItem(item)}
                            >
                              Buy
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
            {timedItems.length > 0 &&
              timedItems.map((item, index) => (
                <div
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                  key={index}
                >
                  <div className="card__item two">
                    <div className="card_body space-y-10">
                      <div className="card_head">
                        <a href="#" onClick={() => setMarketId(item.id)}>
                          <img
                            src={
                              item.metadata !== undefined
                                ? item.metadata.image
                                : "assets/img/items/cover_1.png"
                            }
                            alt="NFT image"
                          />
                        </a>
                        <div className="block_timer">
                          <Countdown
                            date={item.now + item.duration * 1000}
                            renderer={renderer}
                          />
                        </div>
                        <div className="details d-flex justify-content-between"></div>
                      </div>

                      <h6 className="card_title">
                        <a className="color_black" href="/item-detail">
                          {item.metadata !== undefined
                            ? item.metadata.name
                            : "NFT Name"}
                        </a>
                        {item.seller.toLowerCase() !== auth.toLowerCase() &&
                          item.duration > 0 && (
                            <a
                              style={{fontSize: '15px'}}
                              className="btn btn-sm btn-primary"
                              href="#"
                              data-toggle="modal"
                              data-target="#popup_bid"
                              onClick={() => setCurAuctionItem(item)}
                            >
                              Place Bid
                            </a>
                          )}
                        {item.seller.toLowerCase() !== auth.toLowerCase() &&
                          item.duration <= 0 &&
                          item.buyer.toLowerCase() === auth.toLowerCase() && (
                            <a
                              style={{fontSize: '15px'}}
                              className="btn btn-sm btn-grad"
                              href="#"
                              data-toggle="modal"
                              data-target="#popup_claim"
                              onClick={() => setCurAuctionItem(item)}
                            >
                              Claim an NFT
                            </a>
                          )}

                        {item.seller.toLowerCase() === auth.toLowerCase() && (
                          <a
                            style={{fontSize: '15px'}}
                            className="btn btn-sm btn-warning"
                            href="#"
                            data-toggle="modal"
                            data-target="#popup_cancelbid"
                            onClick={() => setCurAuctionItem(item)}
                          >
                            Cancel Auction
                          </a>
                        )}
                      </h6>
                      <div className="hr"></div>
                      <div className="card_footer justify-content-end">
                        {/* <a
                          href="/profile"
                          className="creators
                                                        space-x-10"
                        >
                          <div className="avatars -space-x-20">
                            <img
                              src="assets/img/avatars/avatar_1.png"
                              alt="Avatar"
                              className="avatar
                                                                avatar-sm"
                            />
                            <img
                              src="assets/img/avatars/avatar_2.png"
                              alt="Avatar"
                              className="avatar
                                                                avatar-sm"
                            />
                          </div>
                          <p className="avatars_name txt_sm">Kelman </p>
                        </a> */}
                        <a href="#" className="space-x-3">
                          <p className="color_green txt_sm">
                            {item.highestBid > 0 ? item.highestBid : item.price}{" "}
                            ETH
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
            {(listedItems.length === 0 && timedItems.length === 0) && <div className="d-flex justify-content-center">There is no any item yet.</div>}
          </div>
        </div>
        <div className="section mt-100">
          <div className="section__head">
            <h2 className="section__title mb-20"> Collections</h2>
            <div className="row justify-content-end align-items-center">
              {/* <div className="col-lg-auto">
                <div className="d-flex align-items-center space-x-10">
                  <span
                    className="color_text txt_sm"
                    style={{ minWidth: "max-content" }}
                  >
                    FILTER BY:
                  </span>
                  <ul className="menu_categories space-x-20">
                    <li className="d-flex space-x-10 switch_item">
                      <input
                        type="checkbox"
                        id="switch7"
                        onChange={() => this.checkedhandleChange()}
                      />
                      <label htmlFor="switch7">Toggle</label>
                      <span> Has list price </span>
                    </li>
                    <li className="d-flex space-x-10 switch_item">
                      <input
                        type="checkbox"
                        id="switch8"
                        onChange={() => this.checkedhandleChange()}
                        checked
                      />
                      <label htmlFor="switch8">Toggle</label>
                      <span> Has open offer </span>
                    </li>
                    <li className="d-flex space-x-10 switch_item">
                      <input
                        type="checkbox"
                        id="switch9"
                        onChange={() => this.checkedhandleChange()}
                      />
                      <label htmlFor="switch9">Toggle</label>
                      <span> Owned by creator </span>
                    </li>
                    <li className="d-flex space-x-10 switch_item">
                      <input
                        type="checkbox"
                        id="switch10"
                        onChange={() => this.checkedhandleChange()}
                      />
                      <label htmlFor="switch10">Toggle</label>
                      <span> Has sold </span>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="col-lg-auto">
                <div className="d-flex space-x-10 align-items-center sm:mt-20">
                  <span className="color_text txt_sm"> SORT BY: </span>
                  <div className="dropdown">
                    <button
                      className="btn btn-dark btn-sm dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Recent Active
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>    

          <div className="row mb-30_reset">
            {collections.length > 0 &&
              collections.map((collection, i) => (
                <div key={i} className="col-lg-4 col-md-4 col-sm-4">
                  <div className="collections space-y-10 mb-30">
                    <div className="collections_item">
                      <div className="images-box space-y-10">
                        {/* <div className="d-flex space-x-10">
                          <img
                            style={{ width: "33.33%" }}
                            src={collection[3]}
                            className="collection-sub-img"
                            alt=""
                          />
                          <img
                            style={{ width: "33.33%" }}
                            src={collection[3]}
                            className="collection-sub-img"
                            alt=""
                          />
                          <img
                            style={{ width: "33.33%" }}
                            src={collection[3]}
                            className="collection-sub-img"
                            alt=""
                          />
                        </div> */}
                        <a href="#" onClick={() => setCollectionId(collection[0])}>
                          <div>
                            <img
                              className="collection-main-img"
                              src={collection[3]}
                              alt=""
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="collections_footer justify-content-between">
                      <h5 className="collection_title">
                        <a href="#" onClick={() => setCollectionId(collection[0])}>{collection[1]}</a>
                      </h5>
                      <a href="#" className="likes space-x-3">
                        <i className="ri-heart-3-fill"></i>
                        <span className="txt_md">2.1k</span>
                      </a>
                    </div>
                    <div className="creators space-x-10">
                      <span className="color_text txt_md">
                        {" "}
                        {parseInt(collection[8]._hex.toString(16), 16)} items ·
                        Created by
                      </span>
                      <div className="avatars space-x-5">
                        <a href="/profile">
                          <img
                            src="assets/img/avatars/avatar_1.png"
                            alt="Avatar"
                            className="avatar avatar-sm"
                          />
                        </a>
                      </div>
                      <a href="/profile">
                        <p className="avatars_name txt_sm">
                          {" "}
                          {shortenAddress(collection[7], 6)}{" "}
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;
