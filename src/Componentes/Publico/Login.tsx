import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Axios from 'axios';
import { Formulario, SubmitForm } from '../../Elementos/Formularios.js';
import { DivInputFormulario } from './DivInputFormulario';
import { MensajeErrorComp } from './MensajeErrorComp';
import { Header } from '../Header/Header';
import Cookies from 'universal-cookie';
import Socket from '../Socket/socket';


export const Login = () => 
{
	const cookies = new Cookies();
	const Usuario = cookies.get('Usuario');
	const [Autenticado, cambiarAutenticado] = useState(false);
	
	const RutasPrivadas = () => {
		if(Usuario == undefined) cambiarAutenticado(false);
		else cambiarAutenticado(true);
	};

	useEffect(RutasPrivadas,[]);

	const [Email, cambiarEmail] = useState({campo: '', valido: ''});
	const [Password, cambiarPassword] = useState({campo: '', valido: ''});
	const [Bandera0, cambiarBandera0] = useState<boolean>(true);
	const [Bandera1, cambiarBandera1] = useState<boolean>(true);
	const [esDashboard, cambiarEsDashboard] = useState<boolean>(false);
	const url = 'http://localhost:90/api/login';

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		Axios.post(url, {
			Email: Email.campo,
			Password: Password.campo
		}).then(response => response.data).then(VerificarLogin);
	};

	function VerificarLogin(data:string) {
		if(data === 'Mala password') {
			cambiarBandera0(false); 
			cambiarBandera1(true);
		}
		else if(data === 'Mal email') {
			cambiarBandera1(false); 
			cambiarBandera0(true);
		}
		else {
			cookies.set('Usuario', data, {path:'/' });
			console.log(Socket.id);
			Socket.emit('conectado', data);
			
			cambiarEsDashboard(true);
		}
	}

	return  (<>
		{Autenticado === true && <Navigate to="/Dashboard"/>}
		<Header/>
		<Formulario onSubmit={onSubmit}>
			{esDashboard === true && <Navigate to="/Dashboard"/>}
			{Bandera0 === false && <MensajeErrorComp FormValido={Bandera0} Texto="La contraseña esta incorrecta." />}
			{Bandera1 === false && <MensajeErrorComp FormValido={Bandera1} Texto="Este email no existe." />}
			<p className="Form__Titulo">Login</p>
			<DivInputFormulario
				estado={Email}
				cambiarEstado={cambiarEmail} 
				type="text"
				placeholder="Escribe tu email"
			/>
			<DivInputFormulario
				estado={Password}
				cambiarEstado={cambiarPassword} 
				type="password"
				placeholder="Contraseña"
			/>
			<Link to="/OlvidarPassword" className="TextoInput PedirEmail">¿Olvidaste tu contraseña?</Link>
			<SubmitForm className="Form__InputSubmit" type="submit" value="LOGEAME"/>
			<Link to="/Registrar" className="TextoInput">¿Aun no tienes cuenta?</Link>
		</Formulario>
	</>);
};
