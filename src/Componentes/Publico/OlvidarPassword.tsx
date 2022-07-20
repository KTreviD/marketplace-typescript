import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Formulario, SubmitForm } from '../../Elementos/Formularios.js';
import { DivInputFormulario } from './DivInputFormulario';

export const OlvidarPassword = () => 
{
	const [Email, cambiarEmail] = useState({campo: '', valido: ''});
	const [RecuperarPassword, cambiarRecuperarPassword] = useState(false);
	const expresiones = {
		Email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(Email.valido === 'true') cambiarRecuperarPassword(true);
		//Enviar correo a la persona
	} ;

	return  (<Formulario onSubmit={onSubmit}>
		{RecuperarPassword === true && <Navigate to="/RecuperarPassword"/>}
		<p className="Form__Titulo">Recuperar</p>
		<DivInputFormulario
			estado={Email}
			cambiarEstado={cambiarEmail} 
			type="text"
			placeholder="Escribe tu email"
			textoerror="Introduce un email valido."
			expresionRegular={expresiones.Email}
		/>
		<p className="TextoRecuperar">Te mandaremos un correo para que recuperes tu contraseña.</p>
		<SubmitForm className="Form__InputSubmit" type="submit" value="Recuperar"/>
	</Formulario>);
};