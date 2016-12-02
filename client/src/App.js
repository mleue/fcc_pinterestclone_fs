import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import MasterPage from './pages/MasterPage'
import IndexPage from './pages/IndexPage'
import MyPins from './pages/MyPins'
import UserWall from './pages/UserWall'
import Auth0Lock from 'auth0-lock';

export default class App extends React.Component {
	static childContextTypes = {
		appState: React.PropTypes.func
	};
	componentWillMount() {
		if (localStorage.getItem('idToken')) {
			let profile = JSON.parse(localStorage.getItem('profile'));
			this.appState({ user: '@'+profile.screen_name });
			this.appState({ authenticated: true });
		} else {
			this.createLock();
		}
	}
	createLock() {
		let options = {
			avatar: null
		};
		this.lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, options);
		this.appState({ lock: this.lock });

		this.lock.on("authenticated", (authResult) => {
			// Use the token in authResult to getProfile() and save it to localStorage
			this.lock.getProfile(authResult.idToken, (error, profile) => {
				if (error) {
					console.log(error);
					// Handle error
					return;
				}
				this.appState({ user: '@'+profile.screen_name });
				this.appState({ authenticated: true });

				localStorage.setItem('idToken', authResult.idToken);
				localStorage.setItem('profile', JSON.stringify(profile));
			});
		});
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
				<Route path='/' component={MasterPage}>
					<IndexRoute component={IndexPage} />
					<Route path='/mypins' component={MyPins} />
					<Route path="/:walls" component={UserWall}/>
				</Route>
			</Router>
		);
	}
}
