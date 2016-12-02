import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ReactStormpath from 'react-stormpath';

ReactStormpath.init();
ReactDOM.render(
	<App />,
	document.getElementById('root')
);
