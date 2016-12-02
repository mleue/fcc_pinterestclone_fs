import React from 'react';
import axios from 'axios';
import PinGallery from '../containers/PinGallery';

export default class IndexPage extends React.Component {
	static contextTypes = {
		appState: React.PropTypes.func
	};
	componentWillMount() {
		this.state = { pins: [] };
		this.fetch();
	}
	fetch() {
		axios.get('/api/pins/getallpins')
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
				<PinGallery pins={this.state.pins} />
			</div>
		);
	}
}
