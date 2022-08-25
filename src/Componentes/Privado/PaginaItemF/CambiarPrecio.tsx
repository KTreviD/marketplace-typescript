import React, { useState } from 'react';
import { DivInputFormulario } from '../../Publico/DivInputFormulario';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

type estado = {
    campo: string, valido: string
}

export const CambiarPrecio = () => {

	const Codigo = useParams();
	const url = 'http://localhost:90/api/precio';
	const [PrecioConst, cambiarPrecioConst] = useState<estado>({ campo: '', valido: '' });

	const expresiones = {
		Precio: /^[0-9_-]{1,6}$/
	};	

	const CambiarPrecioF = () => {
		if (PrecioConst.valido === 'false') return;
		Axios.post(url, {
			Codigo: Codigo.codigo,
			Precio: PrecioConst.campo
		});
		window.location.reload();
	};

	return	(<div className="CambiarPrecio">
		<div className="CambiarPrecioBoton" onClick={CambiarPrecioF}>
			<p className="CambiarPrecioBotonTexto" >Cambiar</p>
		</div>
		<DivInputFormulario
			estado={PrecioConst}
			cambiarEstado={cambiarPrecioConst}
			type="text"
			placeholder="Cambiar de precio"
			textoerror="Tiene que ser de 1 a 6 digitos."
			expresionRegular={expresiones.Precio}
			precio="true"
		/>
	</div>);
};