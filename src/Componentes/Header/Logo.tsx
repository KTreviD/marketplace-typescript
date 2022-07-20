import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	logeado: boolean;
}

export const Logo = ({logeado}: Props) => {

	return (<Link to={logeado === false ? '/Login' : '/Dashboard'}>
		<div className='LogoContainer'>
			<span/>
			<span/>
			<span/>
			<span/>
			<span/>
		</div>
	</Link>);
};