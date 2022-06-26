import React, { useState, useEffect }  from 'react';
import {withRouter, Link, Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import { ethers } from "ethers";

import { NFTAddress } from '../contract/address';
import NFT from '../contract/abi/MintAbi.json';

import {dispatch_headerTitle} from "../actions/dispatch_headerTitle";

function shortenAddress(address, chars = 4) {
	return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

function Collection() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        getCollectionList();
	}, []);

    const getCollectionList = async () => {
        const { ethereum } = window;
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(NFTAddress, NFT, signer);

        let results = await connectedContract.fetchCollections();
        let collections = [];
        for (let index = 0; index < results.length; index++) {
            if(results[index][7].toLowerCase() == accounts[0].toLowerCase()) {
                collections.push(results[index]);
            }
        }
        setCollections(collections);
    };

    const checkedhandleChange = (event, index) => {

	};

    return (
        <div>
            <div className="hero__collections">
                <div className="container">
                    <h1>Artwork collections</h1>
                </div>
            </div>
            <div className="filters bg_white border-b py-20">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-auto">
                            <div className="d-flex space-x-10 align-items-center">
                                <span className="color_text txt_sm"> FILTER BY: </span>
                                <ul className="menu_categories space-x-20">
                                    <li className="d-flex space-x-10 switch_item">

                                        <input type="checkbox" id="switch1" onChange={checkedhandleChange} /><label htmlFor="switch1">Toggle</label>
                                        <span> Has list price </span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">

                                        <input type="checkbox" id="switch2" onChange={checkedhandleChange} checked /><label htmlFor="switch2">Toggle</label>
                                        <span> Has open offer </span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">

                                        <input type="checkbox" id="switch3" onChange={checkedhandleChange} /><label htmlFor="switch3">Toggle</label>
                                        <span> Owned by creator </span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">

                                        <input type="checkbox" id="switch4" onChange={checkedhandleChange} /><label htmlFor="switch4">Toggle</label>
                                        <span> Has sold </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-auto">
                            <div className="d-flex space-x-10 align-items-center sm:mt-20">
                                <span className="color_text txt_sm"> SORT BY: </span>
                                <div className="dropdown">
                                    <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        Recent Active
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else
                                            here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section mt-100">
                <div className="container">
                    <div className="row mb-30_reset">
                        {collections.map((collection, i) => (
                            <div key={i} className="col-lg-4 col-md-6 col-sm-8">
                                <div className="collections space-y-10 mb-30">
                                    <div className="collections_item">
                                        <a href="/profile">
                                            <div className="images-box space-y-10">
                                                <div className="d-flex space-x-10" style={{width: '95%'}}>
                                                    <img className='collection-sub-img' style={{width: "33.33%"}} src={collection[3]} alt=""/>
                                                    <img className='collection-sub-img' style={{width: "33.33%"}} src={collection[3]} alt=""/>
                                                    <img className='collection-sub-img' style={{width: "33.33%"}} src={collection[3]} alt=""/>
                                                </div>
                                                <div>
                                                    <img className='collection-main-img' src={collection[3]} alt=""/>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="collections_footer justify-content-between">
                                        <h5 className="collection_title"><a href="/collections">{collection[1]}
                                            </a></h5>
                                        <a href="#" className="likes space-x-3">
                                            <i className="ri-heart-3-fill"></i>
                                            <span className="txt_md">2.1k</span>
                                        </a>
                                    </div>
                                    <div className="creators space-x-10">
                                        <span className="color_text txt_md"> {parseInt(collection[8]._hex.toString(16), 16)} items · Created by</span>
                                        <div className="avatars space-x-5">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_1.png" alt="Avatar"
                                                    className="avatar avatar-sm"/>
                                            </a>
                                        </div>
                                        <a href="/profile">
                                            <p className="avatars_name txt_sm"> {shortenAddress(collection[7], 6)} </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection;