import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
type Item = {
	Clase: string;
	Codigo: string;
	Id: number;
	Img: string;
	Material: string;
	Precio: string;
	Raza: string;
	Usuario: string;
}[]

interface Props {
	respuestaAxios: Item; 
	usuario: string;
	usuarioCookie: string;
}

export const Pagina = ({respuestaAxios, usuario, usuarioCookie}:Props) => {
	const [irPerfil, cambiarIrPerfil] = useState(false);
	
	const IrPerfil = () => {
		cambiarIrPerfil(true);
	};

	return (<>
		{irPerfil === true && <Navigate to={'/Perfil/'+ usuario}/>}
		<div className="PaginaItem">
			<p className="CodigoItem"> {'#' + respuestaAxios[0].Codigo} </p>
			<img alt="Imagen no disponible" className="ImagenItem" src={respuestaAxios[0].Img} />
			<p className="RazaItemTexto"> Raza: </p>
			<p className="RazaItemRaza"> {respuestaAxios[0].Raza} </p>
			<p className="MaterialItemTexto"> Material:</p>
			<p className="MaterialItemNombre"> {respuestaAxios[0].Material} </p>
			<p className="PrecioItemTexto"> Precio: </p>
			<p className="PrecioItemNumero"> {respuestaAxios[0].Precio} </p>
			<div className="CuadradoUsuarioItem">
				{usuario === usuarioCookie ? 
					<p className="CuadradoUsuarioItemTexto">Owned</p> 
					: usuario === '.' ? 
						<p className="CuadradoUsuarioItemTexto">Nadie</p>
						:
						<p onClick={IrPerfil} className="CuadradoUsuarioItemTexto HoverPointer">{usuario}</p>
				}
			</div>
		</div>
	</>);
};