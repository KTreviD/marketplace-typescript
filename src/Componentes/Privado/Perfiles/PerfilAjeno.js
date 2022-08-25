import React from 'react';
import { Header } from '../../Header/Header';
import { useParams } from 'react-router-dom';
import { VentanaMensajes } from '../Mensajes/VentanaMensajes';

export const PerfilAjeno = () => {
	const usuario = useParams();

	return (<>
		<Header/>
		<div className='Contenedor'>
			<div className='NombreFoto'>
				<p className='nombrePerfil'>{usuario.perfil}</p>
				<img className='fotoDefault' src='http://localhost:3000/Imgs/fotoDefault.jpg'></img>
			</div>
			<VentanaMensajes usuarioAjeno={usuario.perfil}/>
		</div>
	</>);
	
};
