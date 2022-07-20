import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TarjetaItem, Agregar } from '../../Elementos/Formularios.js';
import { Navigate } from 'react-router-dom';

interface Props {
	Icono: string;
	Codigo: string;
	Raza: string;
	Material: string;
	Img: string;
	Precio: string;
	Usuario: string;
}

export const TarjetaItemComp = ({Icono, Codigo, Raza, Material, Img, Precio, Usuario}:Props) => {
	const cookies = new Cookies();
	const url = 'http://localhost:90/api/setuser';
	const UsuarioCookie = cookies.get('Usuario');

	const [Propietario, cambiarPropietario] = useState(false);
	const [Pagina, cambiarPagina] = useState(false);

	const axiosPost = () => {
		return Axios.post(url, {
			Codigo: Codigo,
			NewUser: UsuarioCookie,
			OldUser: Usuario,
			Price: Precio
		});
	};

	const cambiarOwner = () => {
		axiosPost();
		cambiarPropietario(true);
	};

	const IrPagina = () => cambiarPagina(true);

	return  (<TarjetaItem>
		<img alt="Imagen no disponible" className="IconoTarjeta" src={ Icono }/>
		<p className="CodigoTarjeta"> { Codigo } </p>
		<p className="RazaTarjeta"> { Raza } </p>
		<h6 className="MaterialTarjeta"> { Material } </h6>
		<img alt="Imagen no disponible" className="ImagenTarjeta" onClick={IrPagina} src={ Img }/>
		{Pagina === true && <Navigate to={'/Dashboard/' + Codigo}/>}
		{(Propietario === true || Usuario === UsuarioCookie) &&
			<div className="CuadradoUsuario">
				<p className="CuadradoUsuarioTexto">Owned</p>
			</div>
		}
		<div className="CuadradoPlus" onClick={cambiarOwner}>
			<Agregar icon={ faPlus }/>
		</div>
		<p className="PrecioTarjetaTexto"> Precio: </p>
		<p className="PrecioTarjetaNumero"> { Precio } </p>
		<p className="UsuarioTarjetaTexto"> Dueño:</p>
		<p className="UsuarioTarjetaNombre"> { Propietario === true ? UsuarioCookie : Usuario } </p>
	</TarjetaItem>);
};