import React from 'react';
import { Link } from 'react-router-dom';

export const BotonLoginHeader = () => {
	return	(<Link to="/Login">
		<div className="LoginBoton">
			<p className="TextoBotonLogin">Login</p>
		</div>
	</Link>);
};