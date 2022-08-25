import React, { useState } from 'react';
import { VentanaMensajes } from './VentanaMensajes';

export const Chats = () => {

	const [usuarioAjeno , setUsuarioAjeno] = useState('');

	const handleSetUsuarioAjeno = (UsuarioAjeno) => {
		setUsuarioAjeno(UsuarioAjeno);
	};

	return <div className='ContenedorChats'>
		<div className='ChatsSelector'>
			<div onClick={() => handleSetUsuarioAjeno('Alan')} className='Chats'></div>
			<div onClick={() => handleSetUsuarioAjeno('Admin2')} className='Chats'></div>
		</div>
		<div className='ChatAbierto'>
			{usuarioAjeno !== '' && <VentanaMensajes usuarioAjeno={usuarioAjeno}/>}
		</div>
	</div>;
	
};