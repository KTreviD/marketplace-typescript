import React from 'react';
import { ClaseOpcion } from '../../Elementos/Formularios.js';

interface Props {
	Img: string;
	NombreEnviado: string;
	NombreRadioInput: string;
	BuscarClase?: (NombreEnviado:string)=> void;
	BuscarRaza?: (NombreEnviado:string)=> void;
	BuscarMaterial?: (NombreEnviado:string)=> void;
}

export const ClaseOpcionComp = ({ Img, NombreEnviado, NombreRadioInput, BuscarClase, BuscarRaza, BuscarMaterial }: Props) => {
	const Elegir = () => {
		if (BuscarClase) BuscarClase(NombreEnviado);
		if (BuscarRaza) BuscarRaza(NombreEnviado);
		if (BuscarMaterial) BuscarMaterial(NombreEnviado);
	};

	return (<ClaseOpcion>
		<img className="ImgClase" src={Img} />
		<input className="InputFiltros" onChange={Elegir} type="radio" name={NombreRadioInput} />
		<h6 className="NombreClase">{NombreEnviado}</h6>
	</ClaseOpcion>);
};