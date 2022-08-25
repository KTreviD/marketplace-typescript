import React, { useState, useEffect } from 'react';
import { Header } from '../../Header/Header';
import Cookies from 'universal-cookie';
import { Navigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { CambiarPrecio } from './CambiarPrecio';
import { Pagina } from './Pagina';
import { Historial } from './Historial';

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

type historialT = {
    Codigo: string;
	Date: string;
	Id: number;
	NewUser: string;
	OldUser: string;
	Price: number;
}[]

export const PaginaItem = () => {
	const codigo = useParams();
	const cookies = new Cookies();
	const usuarioCookie = cookies.get('Usuario');
	const url = 'http://localhost:90/api/dashboard/' + codigo.codigo;
	const [contenido, cambiarContenido] = useState<JSX.Element>();
	const [contenidoHistorial, cambiarContenidoHistorial] = useState<JSX.Element>();
	const [PermisoPrecio, cambiarPermisoPrecio] = useState<boolean>(false);
	const [Autenticado, cambiarAutenticado] = useState<boolean>(true);

	const axiosCrear = () => {
		return Axios.post(url, {
			Codigo:codigo.codigo
		}).then(response => {
			creadora(response.data.resp , response.data.results);
		});
	};

	const creadora = (respuestaAxiosItem: Item, respuestaAxiosHistorial:historialT) => {
		crearPagina(respuestaAxiosItem);
		crearHistorial(respuestaAxiosHistorial);
	};

	const crearPagina = (respuestaAxiosItem: Item) => {
		if (respuestaAxiosItem[0].Usuario === usuarioCookie) cambiarPermisoPrecio(true);
		const pagina = <Pagina respuestaAxios={respuestaAxiosItem} usuario={respuestaAxiosItem[0].Usuario} usuarioCookie={usuarioCookie}/>;
		cambiarContenido(pagina);
	};

	const crearHistorial = (respuestaAxiosHistorial: historialT) => {
		const historial = <Historial respuestaAxios={respuestaAxiosHistorial} />;
		cambiarContenidoHistorial(historial);
	};

	const Iniciar = () => {
		if (usuarioCookie === undefined) cambiarAutenticado(false);
		axiosCrear();
	};

	useEffect(Iniciar, []);
	
	return (<>
		{Autenticado === false && <Navigate to="/Login" />}
		<Header/>
		{contenido}
		{contenidoHistorial}
		{PermisoPrecio === true && <CambiarPrecio/>}
	</>);
};