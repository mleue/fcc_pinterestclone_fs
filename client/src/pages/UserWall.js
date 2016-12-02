import React from 'react';
import axios from 'axios';
import PinGallery from '../containers/PinGallery';

export default class UserWall extends React.Component {
	static contextTypes = {
		appState: React.PropTypes.func
	};
	componentWillMount() {
		this.state = { pins: [] };
		this.fetch();
	}
	fetch() {
		axios.get('/api/pins/getpinsbyuser?username='+this.props.location.query.username)
			.then( (response) => {
				this.setState({pins: response.data});
			})
			.catch( (error) => {
				console.log(error);
			});
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<PinGallery pins={this.state.pins} />
					</div>
				</div>
			</div>
		);
	}
}
