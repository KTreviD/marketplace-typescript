import React, { useState, useEffect } from 'react';
import { TarjetaItemComp } from './TarjetaItemComp';
import { FondoVacio } from './FondoVacio';
import Axios from 'axios';
import { Anterior, Siguiente } from '../../Elementos/Formularios';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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

export const FondoLleno = () => {

	const url = 'http://localhost:90/api/dashboard';
	const [contenidoComponentes, cambiarContenidoComponentes] = useState<JSX.Element[]>();
	const [banderaVacioComponentes, cambiarBanderaVacioComponentes] = useState<boolean>(false);
	const [numeros, cambiarNumeros] = useState<Array<JSX.Element>>();
	const [pagNumActual, cambiarPagNumActual] = useState<number>(1);
	const [maxNum, cambiarMaxNum] = useState<number>(0);
	const [sumarPagNum, cambiarSumarPagNum] = useState<number>(0);
	const [cuantosComponentesUltimaPag, cambiarCuantosComponentesUltimaPag] = useState<number>(0);

	localStorage.setItem('PagNum', pagNumActual.toString());

	const fondoVacio = () => {
		cambiarBanderaVacioComponentes(false);
	};

	const fondoComponentes = (respuestaAxios: Item) => {
		cambiarBanderaVacioComponentes(true);
		const arregloComponentes = () => {
			return respuestaAxios.map(x => {
				return <TarjetaItemComp
					key={x.Precio + x.Clase + x.Raza + x.Codigo + x.Material + x.Img}
					Icono={'http://localhost:3000/Imgs/' + x.Clase + '.png'}
					Codigo={x.Codigo}
					Raza={x.Raza}
					Material={x.Material}
					Img={x.Img}
					Precio={x.Precio}
					Usuario={x.Usuario === '.' ? 'Sin dueño' : x.Usuario}
				/>;
			});
		};
		cambiarContenidoComponentes(arregloComponentes);
	};

	const crearNumerosPaginas = (numResultados:number) => {
		const maxPag = Math.ceil(numResultados / 10);
		cambiarMaxNum(maxPag);
		const cantidadSelecNumerosPagina = maxPag > 5 ? 5 : maxPag;
		const selecNumerosPagina = new Array(cantidadSelecNumerosPagina);
		for(let i = 0 ; i < cantidadSelecNumerosPagina ; i++) {
			const valorPag = i === 4 ? maxPag : (i + 1 + sumarPagNum);
			const isPenultimo = (i === 3 && maxPag > 5 && pagNumActual < (maxPag - 4)) ? true : false;
			selecNumerosPagina[i] = isPenultimo ?
				<div key={i} className={'numero'}>
					<p className={'pNumeroPenultimo'}>...</p>
				</div> : 
				<div onClick={()=>handleCambiarPagNum(valorPag, maxPag)} key={i} className={valorPag === pagNumActual ? 'numeroEscogido' : 'numero'}>
					<p className={valorPag === pagNumActual ? 'pNumeroEscogido' : 'pNumero'}>{valorPag}</p>
				</div> ;
		}
		cambiarNumeros(selecNumerosPagina);
	};

	const handleCambiarPagNum = (valorPag:number, max:number) => {
		cambiarPagNumActual(valorPag);
		if(max > 5) {
			if(valorPag > (max - 5)) cambiarSumarPagNum(max - 5);
			else cambiarSumarPagNum(valorPag - 1);
		}
	};

	const creadora = (respuestaAxios: Item, length: number) => {
		if(respuestaAxios === undefined || respuestaAxios.length === 0) fondoVacio();
		else {
			cambiarCuantosComponentesUltimaPag(respuestaAxios.length);
			fondoComponentes(respuestaAxios);
			crearNumerosPaginas(length);
		}
	};

	const Iniciar = () => {
		axiosPostTipo();
	};
	
	const axiosPostTipo = () => {
		return Axios.post(url, {
			Clase: localStorage.getItem('Clase'),
			Raza: localStorage.getItem('Raza'),
			Material: localStorage.getItem('Material'),
			PagNum: pagNumActual
		}).then(res => {
			creadora(res.data.prueba , res.data.length);
		});
	};

	useEffect(Iniciar, [pagNumActual]);

	const handleAntPag = () => {
		if(pagNumActual > 1) {
			cambiarPagNumActual(pagNumActual - 1);
			if(sumarPagNum > 0 && pagNumActual < (maxNum - 3)) cambiarSumarPagNum(sumarPagNum - 1);
		}
	};

	const handleSigPag = () => {
		if(pagNumActual < maxNum) {
			cambiarPagNumActual(pagNumActual + 1);
			if(pagNumActual < (maxNum - 4)) cambiarSumarPagNum(sumarPagNum + 1);
		}
	};

	return <>
		{banderaVacioComponentes === false && <FondoVacio/>}
		{banderaVacioComponentes === true && 
		<div className='contenedorTextoComps'>
			<p className='textoContenedorTextoComps'>Resultados {(pagNumActual - 1) * 10 + 1}-{pagNumActual * 10} de {((maxNum - 1) * 10) + cuantosComponentesUltimaPag}</p>
		</div>
		}
		{banderaVacioComponentes === true && contenidoComponentes}
		{banderaVacioComponentes === true && 
		<div className='paginacion'>
			<div className='containerPag'> 
				<div className='anterior'> <Anterior icon={faAngleLeft} onClick = {handleAntPag}/> </div>
				<div className='numeros'>
					{numeros}
				</div>
				<div className='siguiente'> <Siguiente icon={faAngleRight} onClick = {handleSigPag}/> </div>
			</div>
		</div>
		}
	</>;
	
};