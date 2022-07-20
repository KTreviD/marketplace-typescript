import React from 'react';
import { Link } from 'react-router-dom';

export const BotonSignUpHeader = () => {
	return	(<Link to="/Registrar">
		<div className="SignUpBoton">
			<p className="TextoBotonSignUp">Sign up</p>
		</div>
	</Link>);
};