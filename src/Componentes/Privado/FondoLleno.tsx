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
	const [pagNum, cambiarPagNum] = useState<number>(1);
	const [maxNum, cambiarMaxNum] = useState<number>(0);
	const [sumarPagNum, cambiarSumarPagNum] = useState<number>(0);
	const [cuantosComponentesUltimaPag, cambiarCuantosComponentesUltimaPag] = useState<number>(0);

	localStorage.setItem('PagNum', pagNum.toString());

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

	const crearNumerosPaginas = (length:number) => {
		length = Math.ceil(length / 10);
		cambiarMaxNum(length);
		const numerosPaginaDiv = new Array(length);
		const forVar = length > 5 ? 5 : length;
		for(let i = 0 ; i < forVar ; i++) {
			const Max = i === 4 ? length : (i + 1 + sumarPagNum);
			const isPenultimo = (i === 3 && length > 5 && pagNum < (length - 4)) ? true : false;
			numerosPaginaDiv[i] = isPenultimo ?
				<div key={i} className={'numero'}>
					<p className={'pNumeroPenultimo'}>...</p>
				</div> : 
				<div onClick={()=>handleCambiarPagNum(Max, length)} key={i} className={Max === pagNum ? 'numeroEscogido' : 'numero'}>
					<p className={Max === pagNum ? 'pNumeroEscogido' : 'pNumero'}>{Max}</p>
				</div> ;
		}
		cambiarNumeros(numerosPaginaDiv);
	};

	const handleCambiarPagNum = (numero:number, max:number) => {
		cambiarPagNum(numero);
		if(max > 5) {
			if(numero > (max - 5)) cambiarSumarPagNum(max - 5);
			else cambiarSumarPagNum(numero - 1);
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
			PagNum: pagNum
		}).then(res => {
			creadora(res.data.prueba , res.data.length);
		});
	};

	const handleAntPag = () => {
		if(pagNum > 1) {
			cambiarPagNum(pagNum - 1);
			if(sumarPagNum > 0 && pagNum < (maxNum - 3)) cambiarSumarPagNum(sumarPagNum - 1);
		}
	};

	const handleSigPag = () => {
		if(pagNum < maxNum) {
			cambiarPagNum(pagNum + 1);
			if(pagNum < (maxNum - 4)) cambiarSumarPagNum(sumarPagNum + 1);
		}
	};

	useEffect(Iniciar, [pagNum]);

	return <>
		{banderaVacioComponentes === false && <FondoVacio/>}
		{banderaVacioComponentes === true && 
		<div className='contenedorTextoComps'>
			<p className='textoContenedorTextoComps'>Resultados {(pagNum - 1) * 10 + 1}-{pagNum * 10} de {((maxNum - 1) * 10) + cuantosComponentesUltimaPag}</p>
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