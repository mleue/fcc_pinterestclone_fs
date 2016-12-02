import React from 'react';
import { Link } from 'react-router';
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';

export default class Header extends React.Component {
	static contextTypes = {
		appState: React.PropTypes.func
	};
	handleSignIn() {
		console.log(this.context.appState('lock'));
		this.context.appState('lock').show();
	}
	render() {
		return (
			<nav className="navbar navbar-default navbar-static-top">
				<div className="container">
					<div id="navbar-collapse" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li><Link to="/">Home</Link></li>
							<Authenticated>
								<li>
									<Link to="/profile">Profile</Link>
								</li>
							</Authenticated>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<li>
								<span onClick={this.handleSignIn.bind(this)}>Sign In</span>
							</li>
							<NotAuthenticated>
								<li>
									<LoginLink />
								</li>
							</NotAuthenticated>
							<NotAuthenticated>
								<li>
									<Link to="/register">Create Account</Link>
								</li>
							</NotAuthenticated>
							<Authenticated>
								<li>
									<LogoutLink />
								</li>
							</Authenticated>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
