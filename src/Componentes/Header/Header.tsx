import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { BotonLoginHeader } from './BotonLoginHeader';
import { BotonSesionHeader } from './BotonSesionHeader';
import { BotonSignUpHeader } from './SignUpHeader';
import { Logo } from './Logo';

export const Header = () => {
	const cookies = new Cookies();
	const Usuario = cookies.get('Usuario');

	const [logeado, cambiarLogeado] = useState<boolean>(false);
	
	const CargarPagina = () => { 
		if(Usuario !== undefined)  cambiarLogeado(true);
	};

	useEffect(CargarPagina,[]);

	return (<header className="Header">
		<Logo logeado={logeado}/>
		{logeado === false && <BotonLoginHeader/>}
		{logeado === false && <BotonSignUpHeader/>}
		{logeado === true && <BotonSesionHeader nombreUsuario={Usuario}/>}
	</header>);
};