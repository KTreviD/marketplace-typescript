import React from 'react';

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
	
	return (<div className="PaginaItem">
		<p className="CodigoItem"> {'#' + respuestaAxios[0].Codigo} </p>
		<img alt="Imagen no disponible" className="ImagenItem" src={respuestaAxios[0].Img} />
		<p className="RazaItemTexto"> Raza: </p>
		<p className="RazaItemRaza"> {respuestaAxios[0].Raza} </p>
		<p className="MaterialItemTexto"> Material:</p>
		<p className="MaterialItemNombre"> {respuestaAxios[0].Material} </p>
		<p className="PrecioItemTexto"> Precio: </p>
		<p className="PrecioItemNumero"> {respuestaAxios[0].Precio} </p>
		<div className="CuadradoUsuarioItem">
			<p className="CuadradoUsuarioItemTexto">{usuario === usuarioCookie ? 'Owned' : usuario}</p>
		</div>
	</div>);
};