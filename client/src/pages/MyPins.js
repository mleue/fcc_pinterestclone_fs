import React from 'react';
import axios from 'axios';
import AddPinInputGroup from '../components/AddPinInputGroup';
import PinGallery from '../containers/PinGallery';

export default class MyLibrary extends React.Component {
	static contextTypes = {
		appState: React.PropTypes.func
	};
	componentWillMount() {
		this.state = { mypins: [] };
		this.fetch();
	}
	fetch() {
		axios.get('/api/pins/getpinsbyuser?username='+this.context.appState('user'))
			.then( (response) => {
				this.setState({mypins: response.data});
			})
			.catch( (error) => {
				console.log(error);
			});
	}
	handleAddPin() {
		let pinLink = document.getElementById('addPinLink').value;
		let pinDesc = document.getElementById('addPinDescription').value;
		if (pinLink !== '') {
			document.getElementById('addPinLink').value = '';
			document.getElementById('addPinDescription').value = '';
			axios.post('/api/pins/addpin', {
				username: this.context.appState('user'),
				pinLink,
				pinDesc
			})
				.then( (response) => {
					this.fetch();
				})
				.catch( (error) => {
					console.log(error);
				});
		}
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<h3>My Pins</h3>
						<hr />
						<AddPinInputGroup onClick={this.handleAddPin.bind(this)} />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<br />
						<PinGallery pins={this.state.mypins} />
					</div>
				</div>
			</div>
		);
	}
}
