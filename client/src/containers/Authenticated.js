import React from 'react';

export default class Authenticated extends React.Component {
	static contextTypes = {
		appState: React.PropTypes.func
	};
	render() {
		if (this.context.appState('authenticated')) {
			return (
				<div>
					{ this.props.children }
				</div>
			);
		} else {
			return <div />;
		}
	}
}
