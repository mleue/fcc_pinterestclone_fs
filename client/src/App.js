import React from 'react';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import MasterPage from './pages/MasterPage'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import ProfilePage from './pages/ProfilePage'
import Auth0Lock from 'auth0-lock';

export default class App extends React.Component {
	static childContextTypes = {
		appState: React.PropTypes.func
	};
	componentWillMount() {
		this.lock = new Auth0Lock('WGPjt1h738JEUIrASP7DyZJifSf9wWnS', 'hopfi.eu.auth0.com');
		this.state = { lock: this.lock };
	}
	appState(obj) {
		if (typeof obj === "string") {
			return this.state[obj];
		}
		this.setState(obj);
	}
	getChildContext() {
		return {
			appState: this.appState.bind(this)
		};
	}
	render() {
		return (
			<Router history={browserHistory}>
				<HomeRoute path='/' component={MasterPage}>
					<IndexRoute component={IndexPage} />
					<LoginRoute path='/login' component={LoginPage} />
					<Route path='/register' component={RegistrationPage} />
					<AuthenticatedRoute>
						<HomeRoute path='/profile' component={ProfilePage} />
					</AuthenticatedRoute>
				</HomeRoute>
			</Router>
		);
	}
}
