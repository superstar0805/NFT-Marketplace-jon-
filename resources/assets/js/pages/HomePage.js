import React from 'react';
import {withRouter, Link, Redirect} from "react-router-dom";
import { connect } from 'react-redux';

import {dispatch_headerTitle} from "../actions/dispatch_headerTitle";

class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            is_mobile: window.innerWidth <= 768
        };

        this.handleChange = this.handleChange.bind(this);
        this.checkedhandleChange = this.checkedhandleChange.bind(this);
    }

    componentDidMount() {

    }

    handleChange(path) {
        // this.props.history.push(path);
    }

    checkedhandleChange(path) {
        // this.props.history.push(path);
    }
  
    render(){
        return (
            <div>
                <div className="modal fade popup" id="popup_bid_success" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3 className="text-center">Your Bidding
                                    Successfuly Added</h3>
                                <p className="text-center">your bid <span className="color_text txt _bold">(16ETH) </span> has been listing
                                    to our database</p>

                                <a href="" className="btn btn-dark w-full"> Watch the listings</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3>Place a Bid</h3>
                                <p>You must bid at least <span className="color_black">15 ETH</span>
                                </p>
                                <input type="text" className="form-control" placeholder="00.00 ETH" onChange={() => this.handleChange()}/>

                                <p>Enter quantity. <span className="color_green">5 available</span>
                                </p>
                                <input type="text" className="form-control" value="1" onChange={() => this.handleChange()}/>
                                <div className="hr"></div>
                                <div className="d-flex justify-content-between">
                                    <p> You must bid at least:</p>
                                    <p className="text-right color_black txt _bold"> 67,000 ETH </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p> service free:</p>
                                    <p className="text-right color_black txt _bold"> 0,901 ETH </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p> Total bid amount:</p>
                                    <p className="text-right color_black txt _bold"> 56,031 ETH </p>
                                </div>
                                <a href="" className="btn btn-primary w-full" data-toggle="modal" data-target="#popup_bid_success"
                                    data-dismiss="modal" aria-label="Close"> Place a bid</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero__3">
                    <div className="container">
                        <div className="row align-items-center mb-50 md:space-y-20">
                            <div className="col-lg-6">
                                <h1 className="hero__title">
                                    <span className="color_brand">Discover</span> rare digital art
                                    and collect NFTs
                                </h1>
                            </div>
                            <div className="col-lg-6">
                                <p className="hero__text color_black">raroin is a shared liquidity
                                    NFT
                                    market smart contract
                                    which
                                    is used by multiple websites to provide the users the
                                    best
                                    possible experience.</p>
                            </div>

                        </div>
                        <div className="wrapper" style={{marginTop: '50px'}}>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card__item two">
                                        <div className="card_body space-y-10">
                                            
                                            <div className="card_head">
                                                <img src="assets/img/items/item_5.png" alt=""/>
                                                <div className="block_timer">
                                                    <div className="d-flex justify-content-center
                                                            align-items-center">
                                                        <div className="item">
                                                            <div className="number txt hours">46<span></span></div>
                                                        </div>
                                                        <div className="dots">:</div>
                                                        <div className="item">
                                                            <div className="number txt minutes">35<span></span></div>
                                                        </div>
                                                        <div className="dots">:</div>
                                                        <div className="item">
                                                            <div className="number txt seconds">03<span></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="details d-flex
                                                        justify-content-between">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width:"80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <h6 className="card_title">
                                                <a className="color_black" href="/item-detail">
                                                    Colorful Abstract Painting
                                                </a>
                                            </h6>
                                            <div className="hr"></div>
                                            <div className="card_footer justify-content-between">
                                                <a href="/profile" className="creators
                                                        space-x-10">
                                                    <div className="avatars -space-x-20">
                                                        <img src="assets/img/avatars/avatar_1.png" alt="Avatar" className="avatar
                                                                avatar-sm"/>
                                                        <img src="assets/img/avatars/avatar_2.png" alt="Avatar" className="avatar
                                                                avatar-sm"/>
                                                    </div>
                                                    <p className="avatars_name txt_sm">
                                                        @xander_hall... </p>
                                                </a>
                                                <a href="#" className="space-x-3">
                                                    <p className="color_green txt_sm">0,054 ETH</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card__item two">
                                        <div className="card_body space-y-10">
                                            
                                            <div className="card_head">
                                                <img src="assets/img/items/item_7.png" alt=""/>
                                                <div className="block_timer">
                                                    <div className="d-flex justify-content-center
                                                            align-items-center">
                                                        <div className="item">
                                                            <div className="number txt hours">23<span></span></div>
                                                        </div>
                                                        <div className="dots">:</div>
                                                        <div className="item">
                                                            <div className="number txt minutes">53<span></span></div>
                                                        </div>
                                                        <div className="dots">:</div>
                                                        <div className="item">
                                                            <div className="number txt seconds">23<span></span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="details d-flex
                                                        justify-content-between">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width:"80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <h6 className="card_title">
                                                <a className="color_black" href="/item-detail">
                                                    Spider Eyes Modern Art
                                                </a>
                                            </h6>
                                            <div className="hr"></div>
                                            <div className="card_footer justify-content-between">
                                                <a href="/profile" className="creators
                                                        space-x-10">
                                                    <div className="avatars -space-x-20">
                                                        <img src="assets/img/avatars/avatar_4.png" alt="Avatar" className="avatar
                                                                avatar-sm"/>
                                                        <img src="assets/img/avatars/avatar_3.png" alt="Avatar" className="avatar
                                                                avatar-sm"/>
                                                    </div>
                                                    <p className="avatars_name txt_sm">
                                                        @nathan_wall... </p>
                                                </a>
                                                <a href="#" className="space-x-3">
                                                    <p className="color_green txt_sm">0,006 ETH</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card__item five">
                                        <div className="card_body space-y-10 space-x-10 d-flex">
                                            
                                            <div className="card_head">
                                                <img src="assets/img/items/item_6.png" alt=""/>
                                                <div className="details d-flex
                                                        justify-content-between">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width:"80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="d-flex flex-column
                                                    justify-content-center w-100 space-y-10">
                                                <h6>
                                                    <a className="color_black" href="/item-detail">
                                                        Colorful Abstract Painting
                                                    </a>
                                                </h6>
                                                <div className="hr"></div>
                                                <div className="card_footer d-block space-y-10">
                                                    <a href="/profile" className="creators space-x-10">
                                                        <div className="avatars">
                                                            <img src="assets/img/avatars/avatar_4.png" alt="Avatar" className="avatar
                                                                    avatar-sm"/>

                                                        </div>
                                                        <p className="avatars_name txt_sm">
                                                            @krista_bryan... </p>
                                                    </a>
                                                    <div className="d-flex
                                                            align-items-center space-x-10
                                                            justify-content-between">
                                                        <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                            data-target="#popup_bid">Place Bid</a>
                                                        <span className="color_green txt_sm
                                                                text-right">4,906 ETH</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card__item five">
                                        <div className="card_body space-y-10 space-x-10 d-flex">
                                            
                                            <div className="card_head">
                                                <img src="assets/img/items/item_5.png" alt=""/>
                                                <div className="details d-flex
                                                        justify-content-between">
                                                    <div className="progress">
                                                        <div className="progress-bar" role="progressbar" style={{width:"80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="d-flex flex-column
                                                    justify-content-center w-100 space-y-10">
                                                <h6>
                                                    <a className="color_black" href="/item-detail">
                                                        Synthwave Modern Painting
                                                    </a>
                                                </h6>
                                                <div className="hr"></div>
                                                <div className="card_footer d-block space-y-10">
                                                    <a href="/profile" className="creators space-x-10">
                                                        <div className="avatars">
                                                            <img src="assets/img/avatars/avatar_6.png" alt="Avatar" className="avatar
                                                                    avatar-sm"/>

                                                        </div>
                                                        <p className="avatars_name txt_sm">
                                                            @makinzi_beck... </p>
                                                    </a>
                                                    <div className="d-flex
                                                            align-items-center space-x-10
                                                            justify-content-between">
                                                        <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                            data-target="#popup_bid">Place Bid</a>
                                                        <span className="color_green txt_sm
                                                                text-right">3,003 ETH</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mb-30">
                                        <a href="/marketplace" className="btn btn-md
                                                btn-dark"> View all </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade popup" id="popup_bid_success" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3 className="text-center">Your Bidding
                                    Successfuly Added</h3>
                                <p className="text-center">your bid <span className="color_text txt _bold">(16ETH) </span> has been listing
                                    to our database</p>

                                <a href="" className="btn btn-dark w-full"> Watch the listings</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3>Place a Bid</h3>
                                <p>You must bid at least <span className="color_black">15 ETH</span>
                                </p>
                                <input type="text" className="form-control" placeholder="00.00 ETH" onChange={() => this.handleChange()}/>

                                <p>Enter quantity. <span className="color_green">5 available</span>
                                </p>
                                <input type="text" className="form-control" value="1"  onChange={() => this.handleChange()} />
                                <div className="hr"></div>
                                <div className="d-flex justify-content-between">
                                    <p> You must bid at least:</p>
                                    <p className="text-right color_black txt _bold"> 67,000 ETH </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p> service free:</p>
                                    <p className="text-right color_black txt _bold"> 0,901 ETH </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p> Total bid amount:</p>
                                    <p className="text-right color_black txt _bold"> 56,031 ETH </p>
                                </div>
                                <a href="" className="btn btn-primary w-full" data-toggle="modal" data-target="#popup_bid_success"
                                    data-dismiss="modal" aria-label="Close"> Place a bid</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade popup" id="popup_history" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h4> History </h4>
                                <div className="creator_item creator_card space-x-10">
                                    <div className="avatars space-x-10">
                                        <div className="media">
                                            <div className="badge">
                                                <img src="assets/img/icons/Badge.svg" alt=""/>
                                            </div>
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_1.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                        </div>
                                        <div>
                                            <p className="color_black">Bid accepted <span className="color_brand">1
                                                    ETH</span> by <a className="color_black txt _bold" href="/profile">ayoub</a></p>
                                            <span className="date color_text">28/06/2021, 12:08</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="creator_item creator_card space-x-10">
                                    <div className="avatars space-x-10">
                                        <div className="media">
                                            <div className="badge">
                                                <img src="assets/img/icons/Badge.svg" alt=""/>
                                            </div>
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_2.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                        </div>
                                        <div>
                                            <p className="color_black">Bid accepted <span className="color_brand">3
                                                    ETH</span> by <a className="color_black txt _bold" href="/profile">monir</a></p>
                                            <span className="date color_text">22/05/2021, 12:08</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section mt-100">
                    <div className="container">
                        <div className="section__head">
                            <div className="d-flex justify-content-between sm-column
                                    align-items-center mb-20">
                                <h2 className="section__title"> Recently Listed</h2>
                                <a href="/collections" className="btn btn-dark btn-sm">
                                    View
                                    All</a>
                            </div>
                            <div className="d-flex space-x-10">
                                <span className="color_text txt_sm" style={{minWidth: 'max-content'}}>
                                    FILTER BY: </span>
                                <ul className="menu_categories space-x-20">
                                    <li className="d-flex space-x-10 switch_item">
                                        <input type="checkbox" id="switch1" checked="" onChange={() => this.checkedhandleChange()} /><label htmlFor="switch1">Toggle</label>
                                        <span> Has list price </span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">
                                        <input type="checkbox" id="switch2" onChange={() => this.checkedhandleChange()}/><label htmlFor="switch2">Toggle</label>
                                        <span> Has open offer </span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">
                                        <input type="checkbox" id="switch3" onChange={() => this.checkedhandleChange()}/><label htmlFor="switch3">Toggle</label>
                                        <span> Has sold </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                <div className="card__item four">
                                    <div className="card_body space-y-10">
                                        
                                        <div className="creators space-x-10">
                                            <div className="avatars space-x-3">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_1.png" alt="Avatar"
                                                        className="avatar avatar-sm"/>
                                                </a>
                                                <a href="/profile">
                                                    <p className="avatars_name txt_xs">@mickel_fenn</p>
                                                </a>
                                            </div>
                                            <div className="avatars space-x-3">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_2.png" alt="Avatar"
                                                        className="avatar avatar-sm"/>
                                                </a>
                                                <a href="/profile">
                                                    <p className="avatars_name txt_xs">@danil_pan</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card_head">
                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_1.png" alt=""/>
                                            </a>

                                            <a href="#" className="likes space-x-3">
                                                <i className="ri-heart-3-fill"></i>
                                                <span className="txt_sm">1.2k</span>
                                            </a>
                                        </div>
                                        
                                        <h6 className="card_title">
                                            <a className="color_black" href="/item-detail">
                                                Colorful Abstract Painting
                                            </a>
                                        </h6>

                                        <div className="card_footer d-block space-y-10">
                                            <div className="card_footer justify-content-between">
                                                <div className="creators">
                                                    <p className="txt_sm"> 4 in stock</p>
                                                </div>
                                                <a href="#" className="">
                                                    <p className="txt_sm">Price: <span className="color_green
                                                                txt_sm">2.45 ETH</span></p>
                                                </a>
                                            </div>
                                            <div className="hr"></div>
                                            <div className="d-flex align-items-center space-x-10
                                                    justify-content-between">
                                                <div className="d-flex align-items-center
                                                        space-x-10">
                                                    <i className="ri-history-line"></i>
                                                    <a href="#" data-toggle="modal" data-target="#popup_history">
                                                        <p className="color_text txt_sm" style={{width: "auto"}}>
                                                            View History
                                                        </p>
                                                    </a>
                                                </div>
                                                <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                    data-target="#popup_bid">Place
                                                    Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                <div className="card__item four">
                                    <div className="card_body space-y-10">
                                        
                                        <div className="creators space-x-10">
                                            <div className="avatars space-x-3">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_3.png" alt="Avatar"
                                                        className="avatar avatar-sm"/>
                                                </a>
                                                <a href="/profile">
                                                    <p className="avatars_name txt_xs">@mazanov_sky</p>
                                                </a>
                                            </div>
                                            <div className="avatars space-x-3">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_4.png" alt="Avatar"
                                                        className="avatar avatar-sm"/>
                                                </a>
                                                <a href="/profile">
                                                    <p className="avatars_name txt_xs">@mucky_art</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card_head">
                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_2.png" alt=""/>
                                            </a>

                                            <a href="#" className="likes space-x-3">
                                                <i className="ri-heart-3-fill"></i>
                                                <span className="txt_sm">13.2k</span>
                                            </a>
                                        </div>
                                        
                                        <h6 className="card_title">
                                            <a className="color_black" href="/item-detail">
                                                Colorful Abstract Painting
                                            </a>
                                        </h6>

                                        <div className="card_footer d-block space-y-10">
                                            <div className="card_footer justify-content-between">
                                                <div className="creators">
                                                    <p className="txt_sm"> 12 in stock</p>
                                                </div>
                                                <a href="#" className="">
                                                    <p className="txt_sm">Price: <span className="color_green
                                                                txt_sm">2.55 ETH</span></p>
                                                </a>
                                            </div>
                                            <div className="hr"></div>
                                            <div className="d-flex align-items-center space-x-10
                                                    justify-content-between">
                                                <div className="d-flex align-items-center
                                                        space-x-10">
                                                    <i className="ri-history-line"></i>
                                                    <a href="#" data-toggle="modal" data-target="#popup_history">
                                                        <p className="color_text txt_sm" style={{width: "auto"}}>
                                                            View History
                                                        </p>
                                                    </a>
                                                </div>
                                                <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                    data-target="#popup_bid">Place
                                                    Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                <div className="card__item four">
                                    <div className="card_body space-y-10">
                                        
                                        <div className="creators space-x-10">
                                            <div className="avatars space-x-3">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_5.png" alt="Avatar"
                                                        className="avatar avatar-sm"/>
                                                </a>
                                                <a href="/profile">
                                                    <p className="avatars_name txt_xs">@jimmy_dom</p>
                                                </a>
                                            </div>
                                            <div className="avatars space-x-3">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_6.png" alt="Avatar"
                                                        className="avatar avatar-sm"/>
                                                </a>
                                                <a href="/profile">
                                                    <p className="avatars_name txt_xs">@kristian_fel</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card_head">
                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_3.png" alt=""/>
                                            </a>

                                            <a href="#" className="likes space-x-3">
                                                <i className="ri-heart-3-fill"></i>
                                                <span className="txt_sm">1.2k</span>
                                            </a>
                                        </div>
                                        
                                        <h6 className="card_title">
                                            <a className="color_black" href="/item-detail">
                                                Colorful Abstract Painting
                                            </a>
                                        </h6>

                                        <div className="card_footer d-block space-y-10">
                                            <div className="card_footer justify-content-between">
                                                <div className="creators">
                                                    <p className="txt_sm"> 6 in stock</p>
                                                </div>
                                                <a href="#" className="">
                                                    <p className="txt_sm">Price: <span className="color_green
                                                                txt_sm">2.45 ETH</span></p>
                                                </a>
                                            </div>
                                            <div className="hr"></div>
                                            <div className="d-flex align-items-center space-x-10
                                                    justify-content-between">
                                                <div className="d-flex align-items-center
                                                        space-x-10">
                                                    <i className="ri-history-line"></i>
                                                    <a href="#" data-toggle="modal" data-target="#popup_history">
                                                        <p className="color_text txt_sm" style={{width: "auto"}}>
                                                            View History
                                                        </p>
                                                    </a>
                                                </div>
                                                <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                    data-target="#popup_bid">Place
                                                    Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                <div className="card__item four">
                                    <div className="card_body space-y-10">
                                        
                                        <div className="creators space-x-10">
                                            <div className="avatars space-x-3">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_1.png" alt="Avatar"
                                                        className="avatar avatar-sm"/>
                                                </a>
                                                <a href="/profile">
                                                    <p className="avatars_name txt_xs">@Alvin_nov</p>
                                                </a>
                                            </div>
                                            <div className="avatars space-x-3">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_7.png" alt="Avatar"
                                                        className="avatar avatar-sm"/>
                                                </a>
                                                <a href="/profile">
                                                    <p className="avatars_name txt_xs">@mucky_art</p>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="card_head">
                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_4.png" alt=""/>
                                            </a>

                                            <a href="#" className="likes space-x-3">
                                                <i className="ri-heart-3-fill"></i>
                                                <span className="txt_sm">4.1k</span>
                                            </a>
                                        </div>
                                        
                                        <h6 className="card_title">
                                            <a className="color_black" href="/item-detail">
                                                Colorful Abstract Painting
                                            </a>
                                        </h6>

                                        <div className="card_footer d-block space-y-10">
                                            <div className="card_footer justify-content-between">
                                                <div className="creators">
                                                    <p className="txt_sm"> 34 in stock</p>
                                                </div>
                                                <a href="#" className="">
                                                    <p className="txt_sm">Price: <span className="color_green
                                                                txt_sm">0.55 ETH</span></p>
                                                </a>
                                            </div>
                                            <div className="hr"></div>
                                            <div className="d-flex align-items-center space-x-10
                                                    justify-content-between">
                                                <div className="d-flex align-items-center
                                                        space-x-10">
                                                    <i className="ri-history-line"></i>
                                                    <a href="#" data-toggle="modal" data-target="#popup_history">
                                                        <p className="color_text txt_sm" style={{width: "auto"}}>
                                                            View History
                                                        </p>
                                                    </a>
                                                </div>
                                                <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                    data-target="#popup_bid">Place
                                                    Bid</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade popup" id="popup_bid_success" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3 className="text-center">Your Bidding
                                    Successfuly Added</h3>
                                <p className="text-center">your bid <span className="color_text txt _bold">(16ETH) </span> has been listing
                                    to our database</p>

                                <a href="" className="btn btn-dark w-full"> Watch the listings</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body space-y-20 p-40">
                                <h3>Place a Bid</h3>
                                <p>You must bid at least <span className="color_black">15 ETH</span>
                                </p>
                                <input type="text" className="form-control" placeholder="00.00 ETH" onChange={() => this.handleChange()}/>

                                <p>Enter quantity. <span className="color_green">5 available</span>
                                </p>
                                <input type="text" className="form-control" value="1" onChange={() => this.handleChange()}/>
                                <div className="hr"></div>
                                <div className="d-flex justify-content-between">
                                    <p> You must bid at least:</p>
                                    <p className="text-right color_black txt _bold"> 67,000 ETH </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p> service free:</p>
                                    <p className="text-right color_black txt _bold"> 0,901 ETH </p>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <p> Total bid amount:</p>
                                    <p className="text-right color_black txt _bold"> 56,031 ETH </p>
                                </div>
                                <a href="" className="btn btn-primary w-full" data-toggle="modal" data-target="#popup_bid_success"
                                    data-dismiss="modal" aria-label="Close"> Place a bid</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-100">
                    <div className="container">
                        <div className="section__head">
                            <div className="d-flex
                                    flex-md-wrap
                                    justify-content-between
                                    align-items-center
                                    mb-20">
                                <h2 className="section__title">Top artworks</h2>
                                <div className="dropdown">
                                    <button className="btn btn-dark btn-sm dropdown-toggle" type="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        Recent Active
                                    </button>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <a className="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center space-x-10">
                                <span className="color_text txt_sm" style={{minWidth: "max-content"}}>
                                    FILTER BY:
                                </span>
                                <ul className="menu_categories space-x-20">
                                    <li className="d-flex space-x-10 switch_item">
                                        <input type="checkbox" id="switch5" onChange={() => this.checkedhandleChange()}/><label htmlFor="switch5">Toggle</label>
                                        <span> Has list price </span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">
                                        <input type="checkbox" id="switch6" checked  onChange={() => this.checkedhandleChange()}/><label htmlFor="switch6">Toggle</label>
                                        <span> Has open offer </span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">
                                        <input type="checkbox" id="switch7" onChange={() => this.checkedhandleChange()} /><label htmlFor="switch7">Toggle</label>
                                        <span> Owned by creator </span>
                                    </li>
                                    <li className="d-flex space-x-10 switch_item">
                                        <input type="checkbox" id="switch8" onChange={() => this.checkedhandleChange()} /><label htmlFor="switch8">Toggle</label>
                                        <span> Has sold </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card__item three">
                                    <div className="card_body space-y-10">
                                        
                                        <div className="card_head">
                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_4.png" alt="..." />
                                            </a>

                                            <a href="#" className="likes space-x-3">
                                                <i className="ri-heart-3-fill"></i>
                                                <span className="txt_sm">23.1k</span>
                                            </a>
                                            <div className="action">
                                                <a href="#" className="btn btn-primary btn_card" data-toggle="modal"
                                                    data-target="#popup_bid">
                                                    <i className="ri-pie-chart-line color_white"></i>
                                                    Place Your Bid
                                                </a>
                                            </div>
                                        </div>
                                        
                                        <h6 className="card_title">
                                            <a className="color_black" href="/item-detail">
                                                Colorful Abstract Painting
                                            </a>
                                        </h6>

                                        <div className="card_footer d-block space-y-10">
                                            <div className="d-flex justify-content-between">
                                                <div className="creators space-x-10">
                                                    <div className="avatars -space-x-20">
                                                        <a href="/profile">
                                                            <img src="assets/img/avatars/avatar_3.png" alt="Avatar"
                                                                className="avatar avatar-sm" />
                                                        </a>
                                                        <a href="/profile">
                                                            <img src="assets/img/avatars/avatar_2.png" alt="Avatar"
                                                                className="avatar avatar-sm" />
                                                        </a>
                                                    </div>
                                                    <a href="/profile">
                                                        <p className="avatars_name txt_sm">@makinzi_jamy...</p>
                                                    </a>
                                                </div>
                                                <a href="#" className="space-x-3">
                                                    <span className="color_green txt_sm">0.001 ETH</span>
                                                </a>
                                            </div>
                                            <div className="hr"></div>
                                            <a href="#" className="d-flex align-items-center
                                                    space-x-10">
                                                <i className="ri-vip-crown-line"></i>
                                                <p className="color_text txt_sm" style={{width: "auto"}}>Highest bid</p>
                                                <span className="color_black txt_sm">0.0022 ETH</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card__item five">
                                    <div className="card_body space-y-10 space-x-10 d-flex">
                                        
                                        <div className="card_head">

                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_1.png" alt="" />
                                            </a>


                                            <div className="details d-flex justify-content-between">
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: "80%"}}
                                                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex flex-column justify-content-center
                                                w-100
                                                space-y-10">
                                            <h6 className="card_title">Colorful Abstract Painting</h6>
                                            <div className="hr"></div>
                                            <div className="card_footer d-block space-y-10">
                                                <div className="creators space-x-10">
                                                    <div className="avatars">
                                                        <a href="/profile">
                                                            <img src="assets/img/avatars/avatar_4.png" alt="Avatar"
                                                                className="avatar avatar-sm" />
                                                        </a>
                                                    </div>
                                                    <a href="/profile">
                                                        <p className="avatars_name txt_sm">@krista_bryan...</p>
                                                    </a>
                                                </div>
                                                <div className="d-flex
                                                        align-items-center
                                                        justify-content-between
                                                        space-x-3">
                                                    <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                        data-target="#popup_bid">Place Bid</a>
                                                    <span className="color_green txt_sm text-right">4,906
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card__item five">
                                    <div className="card_body space-y-10 space-x-10 d-flex">
                                        
                                        <div className="card_head">

                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_2.png" alt="" />
                                            </a>


                                            <div className="details d-flex justify-content-between">
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: "80%"}}
                                                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex flex-column justify-content-center
                                                w-100
                                                space-y-10">
                                            <h6 className="card_title">Synthwave Modern Painting</h6>
                                            <div className="hr"></div>
                                            <div className="card_footer d-block space-y-10">
                                                <div className="creators space-x-10">
                                                    <div className="avatars">
                                                        <a href="/profile">
                                                            <img src="assets/img/avatars/avatar_6.png" alt="Avatar"
                                                                className="avatar avatar-sm" />
                                                        </a>
                                                    </div>
                                                    <a href="/profile">
                                                        <p className="avatars_name txt_sm">@makinzi_beck...</p>
                                                    </a>
                                                </div>
                                                <div className="d-flex
                                                        align-items-center
                                                        justify-content-between
                                                        space-x-3">
                                                    <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                        data-target="#popup_bid">Place Bid</a>
                                                    <span className="color_green txt_sm text-right">3,003
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card__item five">
                                    <div className="card_body space-y-10 space-x-10 d-flex">
                                        
                                        <div className="card_head">

                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_3.png" alt="" />
                                            </a>


                                            <div className="details d-flex justify-content-between">
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: "80%"}}
                                                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex flex-column justify-content-center
                                                w-100
                                                space-y-10">
                                            <h6 className="card_title">Synthwave Modern Painting</h6>
                                            <div className="hr"></div>
                                            <div className="card_footer d-block space-y-10">
                                                <div className="creators space-x-10">
                                                    <div className="avatars">
                                                        <a href="/profile">
                                                            <img src="assets/img/avatars/avatar_3.png" alt="Avatar"
                                                                className="avatar avatar-sm" />
                                                        </a>
                                                    </div>
                                                    <a href="/profile">
                                                        <p className="avatars_name txt_sm">@alonzo_knight...</p>
                                                    </a>
                                                </div>
                                                <div className="d-flex
                                                        align-items-center
                                                        justify-content-between
                                                        space-x-3">
                                                    <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                        data-target="#popup_bid">Place Bid</a>
                                                    <span className="color_green txt_sm text-right">5,044
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card__item five">
                                    <div className="card_body space-y-10 space-x-10 d-flex">
                                        
                                        <div className="card_head">

                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_5.png" alt="" />
                                            </a>

                                            <div className="details d-flex justify-content-between">
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: "80%"}}
                                                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex flex-column justify-content-center
                                                w-100
                                                space-y-10">
                                            <h6 className="card_title">Colorful Abstract Painting</h6>
                                            <div className="hr"></div>
                                            <div className="card_footer d-block space-y-10">
                                                <div className="creators space-x-10">
                                                    <div className="avatars">
                                                        <a href="/profile">
                                                            <img src="assets/img/avatars/avatar_1.png" alt="Avatar"
                                                                className="avatar avatar-sm" />
                                                        </a>
                                                    </div>
                                                    <a href="/profile">
                                                        <p className="avatars_name txt_sm">@cannon_stark...</p>
                                                    </a>
                                                </div>
                                                <div className="d-flex
                                                        align-items-center
                                                        justify-content-between
                                                        space-x-3">
                                                    <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                        data-target="#popup_bid">Place Bid</a>
                                                    <span className="color_green txt_sm text-right">2,937
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card__item five">
                                    <div className="card_body space-y-10 space-x-10 d-flex">
                                        
                                        <div className="card_head">

                                            <a href="/item-detail">
                                                <img src="assets/img/items/item_6.png" alt="" />
                                            </a>

                                            <div className="details d-flex justify-content-between">
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: "80%"}}
                                                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex flex-column justify-content-center
                                                w-100
                                                space-y-10">
                                            <h6 className="card_title">Synthwave Modern Painting</h6>
                                            <div className="hr"></div>
                                            <div className="card_footer d-block space-y-10">
                                                <div className="creators space-x-10">
                                                    <div className="avatars">
                                                        <a href="/profile">
                                                            <img src="assets/img/avatars/avatar_8.png" alt="Avatar"
                                                                className="avatar avatar-sm" />
                                                        </a>
                                                    </div>
                                                    <a href="/profile">
                                                        <p className="avatars_name txt_sm">@jimena_stark...</p>
                                                    </a>
                                                </div>
                                                <div className="d-flex
                                                        align-items-center
                                                        justify-content-between
                                                        space-x-3">
                                                    <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                        data-target="#popup_bid">Place Bid</a>
                                                    <span className="color_green txt_sm text-right">7,004
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card__item five">
                                    <div className="card_body space-y-10 space-x-10 d-flex">
                                        
                                        <div className="card_head">

                                            <a href="item-detail">
                                                <img src="assets/img/items/item_7.png" alt="" />
                                            </a>

                                            <div className="details d-flex justify-content-between">
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{width: "80%"}}
                                                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex flex-column justify-content-center
                                                w-100
                                                space-y-10">
                                            <h6 className="card_title">Synthwave Modern Painting</h6>
                                            <div className="hr"></div>
                                            <div className="card_footer d-block space-y-10">
                                                <div className="creators space-x-10">
                                                    <div className="avatars">
                                                        <a href="/profile">
                                                            <img src="assets/img/avatars/avatar_5.png" alt="Avatar"
                                                                className="avatar avatar-sm" />
                                                        </a>
                                                    </div>
                                                    <a href="/profile">
                                                        <p className="avatars_name txt_sm">@eli_tyle...</p>
                                                    </a>
                                                </div>
                                                <div className="d-flex
                                                        align-items-center
                                                        justify-content-between
                                                        space-x-3">
                                                    <a className="btn btn-sm btn-primary" href="#" data-toggle="modal"
                                                        data-target="#popup_bid">Place Bid</a>
                                                    <span className="color_green txt_sm text-right">1,043
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section__creators mt-100" style={{overflow: 'hidden'}}>
                    <div className="container">
                        <div className="space-y-30">
                            <div className="section_head">
                                <h2 className="section__title text-center">Popular Creators</h2>
                            </div>
                            <div className="section__body space-y-20">
                                <div className="d-flex space-x-10 justify-content-center
                                        creators_anim1">
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_1.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@xander_hall...</p>
                                                </a>
                                                <span className="price color_green">16.58 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_2.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@hamza_pitts...</p>
                                                </a>
                                                <span className="price color_green">14.55 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_3.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@nathan_walls...</p>
                                                </a>
                                                <span className="price color_green">24.13 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_4.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@kelton_collier...</p>
                                                </a>
                                                <span className="price color_green">62.68 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_5.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@cade_glover...</p>
                                                </a>
                                                <span className="price color_green">32.48 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_1.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@teagan_poole...</p>
                                                </a>
                                                <span className="price color_green">50.02 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_2.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@austin_rivera...</p>
                                                </a>
                                                <span className="price color_green">9.99 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_3.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@jeremy_shah...</p>
                                                </a>
                                                <span className="price color_green">52.58 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_4.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@joel_reese...</p>
                                                </a>
                                                <span className="price color_green">14.58 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_5.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@anton_wright...</p>
                                                </a>
                                                <span className="price color_green">12.24 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="-ml-70 creators_anim2">
                                    <div className="d-flex space-x-10 justify-content-center">
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_6.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@eli_tyler...</p>
                                                    </a>
                                                    <span className="price color_green">16.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_7.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@alonzo_knight...</p>
                                                    </a>
                                                    <span className="price color_green">12.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_8.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@cannon_stark...</p>
                                                    </a>
                                                    <span className="price color_green">15.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_9.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@leonel_carey...</p>
                                                    </a>
                                                    <span className="price color_green">4.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_10.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@kolten_hart...</p>
                                                    </a>
                                                    <span className="price color_green">3.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_6.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@ethan_cain...</p>
                                                    </a>
                                                    <span className="price color_green">57.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_7.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@waylon_ford...</p>
                                                    </a>
                                                    <span className="price color_green">13.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_8.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@khloe_bender...</p>
                                                    </a>
                                                    <span className="price color_green">9.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_9.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@jenna_loyd...</p>
                                                    </a>
                                                    <span className="price color_green">7.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="creator_item creator_card space-x-10">
                                            <div className="avatars space-x-10">
                                                <a href="/profile">
                                                    <img src="assets/img/avatars/avatar_10.png" alt="Avatar"
                                                        className="avatar avatar-md"/>
                                                </a>
                                                <div>
                                                    <a href="/profile">
                                                        <p className="avatars_name color_black">@kaleigh_lewis...</p>
                                                    </a>
                                                    <span className="price color_green">16.58
                                                        ETH</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex space-x-10 justify-content-center
                                        creators_anim3">
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_11.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@jimena_stark...</p>
                                                </a>
                                                <span className="price color_green">14.58 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_12.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@krista_bryan...</p>
                                                </a>
                                                <span className="price color_green">13.12 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_13.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@natalie_solis...</p>
                                                </a>
                                                <span className="price color_green">6.52 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_14.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@makinzi_beck...</p>
                                                </a>
                                                <span className="price color_green">11.54 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_15.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@chance_flynn...</p>
                                                </a>
                                                <span className="price color_green">34.25 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_11.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@danna_estes...</p>
                                                </a>
                                                <span className="price color_green">23.27 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_12.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@ellis_glenn...</p>
                                                </a>
                                                <span className="price color_green">16.54 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_13.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@jaxon_duffy...</p>
                                                </a>
                                                <span className="price color_green">16.48 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_14.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@marvin_dillon...</p>
                                                </a>
                                                <span className="price color_green">43.42 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-10">
                                        <div className="avatars space-x-10">
                                            <a href="/profile">
                                                <img src="assets/img/avatars/avatar_15.png" alt="Avatar"
                                                    className="avatar avatar-md"/>
                                            </a>
                                            <div>
                                                <a href="/profile">
                                                    <p className="avatars_name color_black">@darian_barry...</p>
                                                </a>
                                                <span className="price color_green">6.34 ETH</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="call2action is__light">
                    <div className="container">
                        <div className="row justify-content-between align-items-center
                                sm:space-y-20">
                            <div className="col-md-6">
                                <div className="space-y-20">
                                    <h1>Start your own
                                        collection today</h1>
                                    <p className="color_text section__text">raroin is a shared
                                        liquidity NFT
                                        market smart contract
                                        which
                                        is used by multiple websites to provide the users the
                                        best
                                        possible experience.</p>
                                    <a href="/connect-wallet" className="btn
                                            btn-primary">Start
                                        Collecting</a>
                                </div>
                            </div>
                            <div className="col-md-auto">
                                <img className="img-fluid img__logo" src="assets/img/logos/Logo_illustrstion_white.png" alt="..."/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="community">
                        <div className="section__head space-y-20">
                            <h3 className="section__title text-center">Global community</h3>
                            <p className="section__text text-center"> Learn more about raroin, chat
                                with the team,
                                other people in the community, and express your opinion on the
                                future development of raroin. </p>
                        </div>

                        <div className="community__items">
                            <div className="row justify-content-center mb-20_reset">
                                <div className="col-md-3">
                                    <div className="item space-y-10">
                                        <div className="logo">
                                            <img src="assets/img/icons/github.svg" alt="logo_community"/>
                                        </div>
                                        <h5 className="text-center">Github</h5>
                                        <p className="text-center">Understand the progress of our
                                            code and project</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item space-y-10">
                                        <div className="logo is_twitter">
                                            <img src="assets/img/icons/twitter.svg" alt="logo_community"/>
                                        </div>
                                        <h5 className="text-center">Twitter</h5>
                                        <p className="text-center">Understand the progress of our
                                            code and project</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="item space-y-10">
                                        <div className="logo is_discord">
                                            <img src="assets/img/icons/discord.svg" alt="logo_community"/>
                                        </div>
                                        <h5 className="text-center">Discord</h5>
                                        <p className="text-center">Understand the progress of our
                                            code and project</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        headerTitle: state.headerTitle
    };
};

export default connect(mapStateToProps, {dispatch_headerTitle})(withRouter(HomePage));