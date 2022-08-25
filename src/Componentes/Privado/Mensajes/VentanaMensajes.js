import React, { useState, useEffect, useRef } from 'react';
import Socket from '../../Socket/socket';
import Cookies from 'universal-cookie';

export const VentanaMensajes = ({usuarioAjeno}) => {
	const cookies = new Cookies();
	const Usuario = cookies.get('Usuario');
	const [mensaje, setMensaje] = useState('');
	const [mensajes, setMensajes] = useState([]);

	const divRef = useRef(null);
	useEffect(() => {
		divRef.current.scrollIntoView({ behavior: 'smooth'});
	});
	const mandarMensaje = e => {
		e.preventDefault();
		
		Socket.emit('mensaje', Usuario , mensaje, usuarioAjeno);
		console.log(Usuario + ' , ' + usuarioAjeno);
		setMensaje('');
	};

	useEffect(() => {
		Socket.on('devolverMensaje', Mensaje => {
			console.log(Mensaje);
			console.log(Mensaje.usuarioAjeno + ',' + usuarioAjeno);
			console.log(Mensaje.Usuario + ',' + Usuario);
			console.log(Mensaje.Usuario + ',' + usuarioAjeno);
			console.log(Mensaje.usuarioAjeno + ',' + Usuario);
			if(Mensaje.usuarioAjeno == usuarioAjeno && Mensaje.Usuario == Usuario ||
				Mensaje.Usuario == usuarioAjeno && Mensaje.usuarioAjeno == Usuario) {
				setMensajes([...mensajes, Mensaje]);
			}
		});

		return () => {Socket.off();};
	}, [mensajes]);
	var prueba = ['',''];

	return <form onSubmit={mandarMensaje} className='VentanaMensajes'>
		<div className='Mensajes'>
			{mensajes.map((e, i) => {
				prueba[0] = prueba[1];
				prueba[1] = e.Usuario;
				return <div key={i}>
					{prueba[0] !== prueba[1] && 
						<div className='ContenedorNombre'>
							<div className={e.Usuario === Usuario ? 'NombreUsuario PropioN' : 'NombreUsuario AjenoN'}>{e.Usuario}</div>
						</div>}
					<div className='ContenedorMsg'>
						<div className={e.Usuario === Usuario ? 'Mensaje Propio' : 'Mensaje Ajeno'}>{e.mensaje}</div>
					</div>
				</div>;
			})}
			<div ref={divRef}></div>
		</div>
		<div className='NavAbajo'>
			<textarea className='EscribirMsg' placeholder='Aa' value={mensaje} onChange={e => setMensaje(e.target.value)}>
			</textarea>
			<button className='SubMsg' type='submit'>{'>'}</button>
		</div>
	</form>;
	
};