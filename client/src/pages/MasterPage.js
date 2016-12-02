import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from './Header';

export default class MasterPage extends React.Component {
	static contextTypes = {
		appState: React.PropTypes.func
	};
	render() {
		return (
			<DocumentTitle title='Pinterest Clone'>
				<div className='MasterPage'>
					<Header />
					{ this.props.children }
				</div>
			</DocumentTitle>
		);
	}
}
