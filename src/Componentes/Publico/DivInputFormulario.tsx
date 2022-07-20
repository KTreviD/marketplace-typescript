import React, { Dispatch, SetStateAction } from 'react';
import { InputForm, DivInput, TextoError, IconoValidacion } from '../../Elementos/Formularios.js';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

type estado = {
    campo: string, valido: string
}
interface Props {
	estado: estado;
	cambiarEstado: Dispatch<SetStateAction<estado>>;
	type: string;
	placeholder: string;
	textoerror?: string;
	expresionRegular?: RegExp;
	funcion?: () => void;
	precio?: string;
}

export const DivInputFormulario = ({estado, cambiarEstado, type, placeholder, textoerror, expresionRegular, funcion, precio}:Props) => {
	
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		cambiarEstado({...estado, campo: e.target.value});
	};

	const Validacion = () => {

		if(expresionRegular) { 
			if(expresionRegular.test(estado.campo)) {
				cambiarEstado({...estado, valido: 'true'});
			}
			else {
				cambiarEstado({...estado, valido: 'false'});
			}
		}
		if(funcion) {
			funcion();
		}
	};

	return  (<DivInput precio={precio}>
		<InputForm
			type={type} 
			placeholder={placeholder}
			value={estado.campo} 
			onChange={onChange} 
			onKeyUp={Validacion}
			onBlur={Validacion}
			valido={estado.valido}
			precio={precio}
		/>
		<IconoValidacion 
			icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle} 
			valido={estado.valido}
			precio={precio}
		/>
		<TextoError valido={estado.valido} >{textoerror}</TextoError>
	</DivInput>);
};