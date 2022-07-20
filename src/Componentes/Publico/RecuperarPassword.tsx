import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Formulario, SubmitForm } from '../../Elementos/Formularios.js';
import { DivInputFormulario } from './DivInputFormulario';

export const RecuperarPassword = () => 
{
	const [Recuperada, cambiarRecuperada] = useState(false);
	const [Expresiones, cambiarExpresiones] = useState(false);
	const [Password, cambiarPassword] = useState({campo: '', valido: ''});
	const [Password2, cambiarPassword2] = useState({campo: '', valido: ''});

	const validarPassword = () => {
		if(Password.campo.length > 0 || Password2.campo.length > 0) {
			if(Password2.campo !== Password.campo) {
				cambiarPassword((prevState) => {
					return {...prevState, valido: 'false'};
				});
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'false'};
				});
			} 
			else {
				cambiarPassword((prevState) => {
					return {...prevState, valido: 'true'};
				});
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'true'};
				});
			}
			if(Password.campo.length < 4 || Password.campo.length > 14 || Password2.campo.length < 4 || Password2.campo.length > 14) {
				cambiarExpresiones(false);
				cambiarPassword((prevState) => {
					return {...prevState, valido: 'false'};
				});
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'false'};
				});
			}
			else cambiarExpresiones(true);
		}
	};


	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(Password2.valido === 'true') cambiarRecuperada(true);
		//Actualizar base de datos con la nueva contraseña
	};

	return  (<Formulario onSubmit={onSubmit}>
		{Recuperada === true && <Navigate to="/Login"/>}
		<p className="Form__Titulo">Recuperar</p>
		<DivInputFormulario
			estado={Password}
			cambiarEstado={cambiarPassword} 
			type="password"
			placeholder="Contraseña"
			textoerror={Expresiones ? '' : 'La contraseña debe ser de 4 a 14 digitos.'}
			funcion={validarPassword}
		/>
		<DivInputFormulario
			estado={Password2}
			cambiarEstado={cambiarPassword2} 
			type="password"
			placeholder="Repite tu Contraseña"
			textoerror="Ambas Contraseñas deben ser iguales."
			funcion={validarPassword}
		/>
		<p className="TextoRecuperarVerificar">Escribe tu nueva contraseña.</p>
		<SubmitForm className="Form__InputSubmit" type="submit" value="Recuperar"/>
	</Formulario>);
};