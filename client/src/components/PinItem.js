import React from 'react';

export default class PinItem extends React.Component {
	handleOnError(event) {
		event.target.onerror = null;
		event.target.src = 'https://placehold.it/200x200';
	}
	render() {
		return (
			<div className="grid-item">
				<img style={{width: '200px'}} src={this.props.img_url} onError={this.handleOnError} />
			</div>
		);
	}
}
