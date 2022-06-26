import React from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../../sass/components/_footer.scss';

class Footer extends React.Component{
	state = {
        value: 0
    };

	render() {
		return (
			<footer className="footer__1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 space-y-20">
							<div className="footer__logo">
								<a href="/">
									<img src="assets/img/logos/logo.png" alt="logo" id="logo_js_f" style={{width: '23%'}} />
								</a>
							</div>
							<p className="footer__text">
								raroin is a shared liquidity NFT market smart contract
							</p>
							<div>
								<ul className="footer__social space-x-10 mb-40">
									<li> <a href=""> <i className="ri-facebook-line"></i> </a>
									</li>
									<li> <a href=""> <i className="ri-messenger-line"></i> </a>
									</li>
									<li> <a href=""> <i className="ri-whatsapp-line"></i> </a>
									</li>
									<li> <a href=""> <i className="ri-youtube-line"></i> </a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-6">
							<h6 className="footer__title">Raroin</h6>
							<ul className="footer__list">
								<li> <a href="Home1.html"> Home1 </a>
								</li>
								<li> <a href="Home2.html"> Home2
									</a> </li>
								<li> <a href="Home3.html"> Home3 </a> </li>
								<li> <a href="Marketplace.html"> Marketplace
									</a>
								</li>
							</ul>
						</div>
						<div className="col-lg-2 col-6">
							<h6 className="footer__title">Assets</h6>
							<ul className="footer__list">
								<li> <a href="Profile.html"> Profile </a>
								</li>
								<li> <a href="Creators.html"> Creators </a>
								</li>
								<li> <a href="Collections.html"> Colletctions </a>
								</li>
								<li> <a href="Activity.html"> Activity
									</a> </li>
							</ul>
						</div>
						<div className="col-lg-2 col-6">
							<h6 className="footer__title">Company</h6>
							<ul className="footer__list">
								<li> <a href="Upload-type.html"> Upload Types </a>
								</li>
								<li> <a href="Upload.html"> Upload </a> </li>
								<li> <a href="Connect-wallet.html"> Connect wallet
									</a> </li>
								<li> <a href="Item-details.html"> Item details </a>
								</li>
							</ul>
						</div>
					</div>
					<p className="copyright text-center">
						Copyright © 2021. Created with love by creabik.
					</p>
				</div>
			</footer>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        headerTitle: state.headerTitle
    };
};

export default connect(mapStateToProps)(withRouter(Footer));
