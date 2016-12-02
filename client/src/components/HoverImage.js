import React from 'react';
import './HoverImage.css'

export default function HoverImage(props) {
	return (
		<div className="hovereffect" style={{width: '200px'}}>
			<img style={{width: '200px'}} alt='' src={props.img_url} onError={props.handleError} />
			<div className="overlay">
					{props.state.link ? 
						<a className="info" href="#" onClick={props.state.linkOnClick}>{props.state.linkText}</a> :
					''}
			</div>
		</div>
	)
}
