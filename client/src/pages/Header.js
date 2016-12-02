import React from 'react';
import { Link } from 'react-router';
import Authenticated from '../containers/Authenticated';
import NotAuthenticated from '../containers/NotAuthenticated';

export default class Header extends React.Component {
	static contextTypes = {
		appState: React.PropTypes.func
	};
	handleSignIn() {
		this.context.appState('lock').show();
	}
	handleLogout() {
		this.context.appState('lock').show();
	}
	render() {
		return (
			<nav className="navbar navbar-default navbar-static-top">
				<div className="container">
					<div id="navbar-collapse" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li><Link to="/">Home</Link></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<NotAuthenticated>
								<li>
									<Link to="/" onClick={this.handleSignIn.bind(this)}>Sign In</Link>
								</li>
							</NotAuthenticated>
							<Authenticated>
								<li>
									<Link to="/mypins">My Pins</Link>
								</li>
							</Authenticated>
							<Authenticated>
								<li>
									<Link to="/" onClick={this.handleLogout.bind(this)}>Logout</Link>
								</li>
							</Authenticated>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
