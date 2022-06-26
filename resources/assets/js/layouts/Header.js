import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom';
import {ListItem } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { ethers } from "ethers";

import Footer from "./Footer";

function shortenAddress(address, chars = 4) {
	return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

function Header({children}) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [balance, setBalance] = useState('');
	const [auth, setAuth] = useState('');

	const connectWallet = async () => {
		const { ethereum } = window;

		if(ethereum) {

            // A Web3Provider wraps a standard Web3 provider, which is
            // what MetaMask injects as window.ethereum into each page
            const provider = new ethers.providers.Web3Provider(ethereum);

            // MetaMask requires requesting permission to connect users accounts
            await provider.send("eth_requestAccounts", []);

            // The MetaMask plugin also allows signing transactions to
            // send ether and pay to change state within the blockchain.
            // For this, you need the account signer...
            const signer = provider.getSigner();
			const balance = await signer.getBalance();
            const ethBalance = ethers.utils.formatEther(balance.toString());
			setBalance(ethBalance.slice(0, 4));

			const address = await signer.getAddress();
			setAuth(ethers.utils.getAddress(address));

			setIsAuthenticated(true);
			
        } else {
			alert("Make sure you have metamask!");
			return;
        }
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;
	
		if (!ethereum) {
			alert("Make sure you have metamask!");
			return;
		} else {
			connectWallet();
			console.log("We have the ethereum object", ethereum);
		}
	}

	return (
		<div>
			<div className="">
				{!isAuthenticated ? 
					<header className="header__1 js-header" id="header">
						<div className="container">
							<div className="wrapper js-header-wrapper">
								<div className="header__logo">
									<a href="/">
										<img
											className="header__logo"
											id="logo_js"
											src="assets/img/logos/logo.png"
											alt="logo"
										/>
									</a>
								</div>
					
								<div className="header__menu">
									<ul className="d-flex space-x-20">
										<li className="has_popup">
											<a className="color_black" href="/">Home</a>
										</li>
										<li>
											<a className="color_black" href='/marketplace'> Marketplace</a>
										</li>
										<li>
											<a className="color_black" href="/collections"> Collections</a>
										</li>
										<li>
											<a className="color_black" href="/profile"> Profile</a>
										</li>
										<li>
											<a className="color_black" href="/creators"> Creators</a>
										</li>
									</ul>
								</div>
								
								<div className="header__search">
									<input type="text" placeholder="Search" />
									<button className="header__result">
										<i className="ri-search-line"></i>
									</button>
								</div>
								<div className="header__btns">
									<a className="btn btn-grad btn-sm" href="/connect-wallet" style={{marginRight: '5px'}}>
										<i className="ri-wallet-3-line" style={{marginRight: '4px'}}></i>
										Connect wallet</a>
									<a id="connectbtn" onClick={() => connectWallet()}>
										<img width="45" src="assets/img/icons/metamask.svg" alt="" />
									</a>
								</div>
								<div className="header__burger js-header-burger"></div>
					
								<div className="header__mobile js-header-mobile">
									<div className="header__mobile__menu space-y-40">
										<ul className="d-flex space-y-20">
											<li> <a className="color_black" href="/marketplace"> Marketplace</a> </li>
											<li> <a className="color_black" href="/collections"> Collections</a> </li>
											<li> <a className="color_black" href="/profile"> Profile</a> </li>
											<li> <a className="color_black" href="/creators"> Creators</a> </li>
								
										</ul>
										<div className="space-y-20">
											<div className="header__search in_mobile w-full">
												<input type="text" placeholder="Search" />
												<button className="header__result">
													<i className="ri-search-line"></i>
												</button>
											</div>
											<a className="btn btn-grad btn-sm" href="/connect-wallet">Connect
												wallet</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header> :
					<header className="header__1 js-header" id="header_admin">
						<div className="container">
							<div className="wrapper js-header-wrapper space-x-10">
								<div className="header__logo">
									<a href="/">
										<img
											className="header__logo"
											id="logo_js"
											src="assets/img/logos/logo.png"
											alt="logo"
											/>
									</a>
								</div>
								
								<div className="header__menu">
									<ul className="d-flex space-x-20">
										<li className="has_popup">
											<a className="color_black" href="/">Home</a>
										</li>
										<li> <a className="color_black" href="/marketplace"> Marketplace</a> </li>
										<li> <a className="color_black" href="/collections"> Collections</a> </li>
										<li> <a className="color_black" href="/profile"> Profile</a> </li>
										<li> <a className="color_black" href="/creators"> Creators</a> </li>
									</ul>
								</div>
								
								<div className="header__search">
									<input type="text" placeholder="Search" />
									<button className="header__result">
										<i className="ri-search-line"></i>
									</button>
								</div>
								<div className="d-flex align-items-center space-x-20">
									<div className="header__notifications">
										<div className="js-notifications-icon">
											<i className="ri-notification-3-line"></i>
										</div>
										<div className="notifications_popup space-y-20">
											<div className="d-flex justify-content-between">
												<h5> Notifications</h5>
												<a href="Activity.html" className="badge color_white">View all</a>
											</div>
											<div
												className="item
												space-x-20
												d-flex
												justify-content-between
												align-items-center">
												<img
													className="thumb"
													src="assets/img/notifications/1.png"
													alt="..."
													/>
												<div className="details">
													<a href="activity.html"> <h6>Money revieved</h6> </a>
													<p>0.6 ETH</p>
												</div>
												<span className="circle"></span>
											</div>
										</div>
									</div>
									<div className="header__avatar">
										<div className="price">
											<span>{balance} <strong>ETH</strong> </span>
										</div>
										<img
											className="avatar"
											src="assets/img/avatars/avatar_2.png"
											alt="avatar"
											/>
										<div className="avatar_popup space-y-20">
											<div className="d-flex align-items-center justify-content-between">
												<span> {shortenAddress(auth, 7)} </span>
												<a href="/" className="ml-2">
													<i className="ri-file-copy-line"></i>
												</a>
											</div>
											<div className="d-flex align-items-center space-x-10">
												<img
													className="coin"
													src="assets/img/logos/coin.svg"
													alt="/"
													/>
												<div className="info">
													<p className="text-sm font-book text-gray-400">Balance</p>
													<p className="w-full text-sm font-bold text-green-500">{balance} ETH</p>
												</div>
											</div>
											<div className="hr"></div>
											<div className="links space-y-10">
												<a href="#">
													<i className="ri-landscape-line"></i> <span> My items</span>
												</a>
												{/* <a href="/edit-profile">
													<i className="ri-pencil-line"></i> <span> Edit Profile</span>
												</a> */}
												<a id="logout" onClick={() => connectWallet()}>
													<i className="ri-logout-circle-line"></i> <span> Logout</span>
												</a>
											</div>
										</div>
									</div>
									<div className="header__btns">
										<a className="btn btn-primary btn-sm" href="/upload">Create</a>
									</div>
									<div className="header__burger js-header-burger"></div>
								</div>
								<div className="header__mobile js-header-mobile">
									<div className="header__mobile__menu space-y-40">
										<ul className="d-flex space-y-20">
											<li> <a className="color_black" href="/marketplace"> Marketplace</a> </li>
											<li> <a className="color_black" href="/collections"> Collections</a> </li>
											<li> <a className="color_black" href="/profile"> Profile</a> </li>
											<li> <a className="color_black" href="/creators"> Creators</a> </li>
								
										</ul>
										<div className="space-y-20">
											<div className="header__search in_mobile w-full">
												<input type="text" placeholder="Search" />
												<button className="header__result">
													<i className="ri-search-line"></i>
												</button>
											</div>
											<a className="btn btn-grad btn-sm" href="/connect-wallet">Connect
												wallet</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>	
				} 
			</div>
			<div className='body'>
				{children}
			</div>
			<Footer></Footer>
		</div>
	)
}

export default Header;
