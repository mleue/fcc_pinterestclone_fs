import React from 'react';
import PinItem from '../components/PinItem';
import Masonry from 'masonry-layout';

export default class PinGallery extends React.Component {
	componentDidUpdate() {
		var elem = document.getElementById('masonryGrid');
		new Masonry( elem, {
			itemSelector: '.grid-item',
			columnWidth: 200
		});
	}
	render() {
		return (
			<div className="grid" id="masonryGrid">
				{ this.props.pins.map( pin => {
					return <PinItem key={pin._id} img_url={pin.link} owner={pin.owner} />
				})}
			</div>
		);
	}
}
