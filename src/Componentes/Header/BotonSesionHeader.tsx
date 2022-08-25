import React , { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AbrirLoginBoton } from '../../Elementos/Formularios.js';
import Cookies from 'universal-cookie';

interface Props {
	nombreUsuario: string;
}

export const BotonSesionHeader = ({ nombreUsuario }: Props) => {
	const [ActivoMenu, cambiarActivoMenu] = useState(false);
	const [RemoverUsuario, cambiarRemoverUsuario] = useState(false);
	const [irPerfil, cambiarIrPerfil] = useState(false);

	const cookies = new Cookies();
  
	const ActivarMenu = () => {
		if(ActivoMenu) cambiarActivoMenu(false);
		else cambiarActivoMenu(true);
	};

	const CerrarSesion = () => {
		cookies.remove('Usuario');
		cambiarRemoverUsuario(true);
	};

	const IrPerfil = () => {
		cambiarIrPerfil(true);
	};

	return (<div>
		{RemoverUsuario === true && <Navigate to="/Login"/>}
		{irPerfil === true && <Navigate to="/PerfilPropio"/>}
		<div onClick={ActivarMenu} className="SesionBoton">
			<p className="TextoBotonLogin">{ nombreUsuario }</p>
		</div>
		<AbrirLoginBoton className="AbrirLoginBoton" Estado={ActivoMenu}>
			<div className='PerfilUsuario'>
				<p onClick={IrPerfil} className="TextoBotonAbrirLogin">Perfil</p>
			</div>
			<span className='spanUsuario1'></span>
			<div className='OpcionesUsuario'>
				
			</div>
			<span className='spanUsuario2'></span>
			<div className='logOutUsuario'>
				<p onClick={CerrarSesion} className="TextoBotonAbrirLogin">Cerrar sesion</p>
			</div>
		</AbrirLoginBoton>
	</div>);
};