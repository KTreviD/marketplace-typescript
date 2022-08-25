import React from 'react';

type historialT = {
    Codigo: string;
	Date: string;
	Id: number;
	NewUser: string;
	OldUser: string;
	Price: number;
}[]

interface Props {
    respuestaAxios:historialT;
}

export const Historial = ({respuestaAxios}:Props):JSX.Element => {
	return crearHistorial(respuestaAxios);
};

const rescribirFecha = (respuestaAxios:historialT, iteadorI:number) => {
	let DateArray = '';
	for (let j = 0; j < 19; j++) {
		if (j === 10) DateArray = DateArray + '/';
		else DateArray = DateArray + respuestaAxios[iteadorI].Date[j];
	}
	return DateArray;
};

const crearHistorial = (respuestaAxios:historialT) => {
	const historial = new Array(respuestaAxios.length);
	for (let i = 0; i < respuestaAxios.length; i++) {
		historial[i] =
			(<div key={i}>
				<div className="HistorialOldUserData">
					<p className="HistorialData"> {respuestaAxios[i].OldUser}</p>
				</div>
				<div className="HistorialNewUserData">
					<p className="HistorialData">{respuestaAxios[i].NewUser}</p>
				</div>
				<div className="HistorialPriceData">
					<p className="HistorialData Price">{respuestaAxios[i].Price}</p>
				</div>
				<div className="HistorialDateData">
					<p className="HistorialData">{rescribirFecha(respuestaAxios,i)}</p>
				</div>
			</div>);
	}
	return (<div className="HistorialPadre">
		<div className="HistorialTituloPadre">
			<p className="HistorialTitulo"> Historial de compra </p>
		</div>
		<div className="HistorialDatos">
			<div className="HistorialOldUser">
				<p className="NombreHistorial">Seller</p>
			</div>
			<div className="HistorialNewUser">
				<p className="NombreHistorial">Buyer</p>
			</div>
			<div className="HistorialPrice">
				<p className="NombreHistorial">Price</p>
			</div>
			<div className="HistorialDate">
				<p className="NombreHistorial">Date</p>
			</div>
			{historial}
		</div>
	</div>);
};