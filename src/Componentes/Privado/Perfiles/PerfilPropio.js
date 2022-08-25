import React, { useState, useEffect } from 'react';
import { Header } from '../../Header/Header';
import Cookies from 'universal-cookie';
import { Chats } from '../Mensajes/Chats';


export const PerfilPropio = () => {
	const cookies = new Cookies();
	const Usuario = cookies.get('Usuario');

	return (<>
		<Header/>
		<div className='Contenedor'>
			<div className='NombreFoto'>
				<p className='nombrePerfil'>{Usuario}</p>
				<img className='fotoDefault' src='http://localhost:3000/Imgs/fotoDefault.jpg'></img>
			</div>
			<div className='MensajesItems'>
				<div className='SelectorContenedor'>
					<div className='MensajesSelector'></div>
					<div className='ObjetosSelector'></div>
				</div>
				<Chats/>
			</div>
		</div>
	</>);
	
};