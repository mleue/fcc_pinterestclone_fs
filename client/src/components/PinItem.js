import React from 'react';
import HoverImage from './HoverImage';

export default class PinItem extends React.Component {
	static contextTypes = {
		appState: React.PropTypes.func
	};
	handleOnError(event) {
		event.target.onerror = null;
		event.target.src = 'https://placehold.it/200x200';
	}
	createStatus() {
		if (this.context.appState('authenticated') && this.context.appState('user') === this.props.owner) {
			return {
				status: "",
				link: true,
				linkText: 'Delete Pin',
				linkOnClick: this.handleOnDelete.bind(this)
			}
		} else {
			return {
				status: "",
				link: true,
				linkText: this.props.owner + "'s Pins",
				linkOnClick: this.handleOnUserWall.bind(this)
			}
		}
	}
	handleOnDelete() {

	}
	handleOnUserWall() {

	}
	render() {
		return (
			<div className="grid-item">
				<HoverImage handleError={this.handleOnError} state={this.createStatus()} img_url={this.props.img_url} />
			</div>
		);
	}
}
