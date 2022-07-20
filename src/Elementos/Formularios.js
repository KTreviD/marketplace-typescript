import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const colores = {
	borde: '#0075FF',
	error: '#bb2929',
	exito: '#1ed12d',
	fondoOscuro: '#120d12',
	fondo: '#312233',
	verde: '#5E803C'
};

const AbrirLoginBoton = styled.div `
	position: absolute;
	width: 120px;
	top: 16px;
	height: 117px;
	border-radius: 6px;
	border: 2px solid #5E803C;
	left: calc(100% - 164px);
	background: #5E803C;
	transition: .3s;
	color: #fff;

	${props => props.Estado === false && css `
		display:none;
	`}

`;

const Formulario = styled.form `
    position: absolute;
    width: 300px;
    height: 430px;
    left: 50%;
    top: 126px;
    transform: translateX(-50%);
    border-radius: 10px;  
    background: #fff;
    box-shadow: 0 2px 10px rgb(0 0 0 / 70%);
`;

const DivInput = styled.div `
	position:relative;
	top:50px;
	${props => props.precio === 'true' && css `
		top:-66px;
	`}
`;

const InputForm = styled.input `
    position: relative;
    height: 36px;
	width: 220px;
	left: 50%;
	transform: translateX(-50%);
	margin-top: 26px;
	background: ${colores.fondo};
	color: #fff;
	border-radius: 4px;
	transition: .3s ease all;
	border: 3px solid transparent;

	&:focus
	{
		border:2px solid ${colores.borde};
		outline: none;
		box-shadow: 3px 0px 13px rgb(163 163 163, 0.4);
	}

	${props => props.valido === 'true' && css `
		border:3px solid transparent;
	`}

	${props => props.valido === 'false' && css `
		border:3px solid ${colores.error} !important;
	`}

	${props => props.precio === 'true' && css `
		background: #fff;
		color:#000;
		left:228px;
		top:-2px;
	`}
`;

const TextoError = styled.p `
	position:absolute;
	font-size: 13px;
	top: 51px;
	width:300px;
	left: 50%;
 	transform: translateX(calc(-50% + 1px));
 	text-align: center;
	margin-bottom:0px;
	font-weight:600;
	color: ${colores.error};
	display: none;

	${props => props.valido === 'true' && css `
		display:none;
	`}

	${props => props.valido === 'false' && css `
		display:block;
	`}
`;

const Agregar = styled(FontAwesomeIcon) `
	position: absolute;
	z-index: 90;
	left:9px;
	top:7px;
	color:#fff;
`;

const IconoValidacion = styled(FontAwesomeIcon) `
	position: absolute;
	top:36px;
	right:50px;
	z-index: 100;
	font-sixe: 16px;
	opacity: 0;

	${props => props.valido === 'true' && css `
		opacity: 1;
		color: ${colores.exito};
	`}

	${props => props.valido === 'false' && css `
		opacity: 1;
		color: ${colores.error};
	`}

	${props => props.precio === 'true' && css `
		top: 34px;
    	right: 14px;
	`}
`;
const Siguiente = styled(FontAwesomeIcon) `
	position:absolute;
	top:7px;
	left:12px;
	font-size:28px;
	color:#5E803C;
	cursor:pointer;
`;
const Anterior = styled(FontAwesomeIcon) `
	position:absolute;
	top:7px;
	left:12px;
	font-size:28px;
	cursor:pointer;
	color:#5E803C;
`;
const ContenedorTerminos = styled.div `
	position:absolute;
	top:306px;
	left:8px;
	font-size:14px;
`;

const Label = styled.label `
	position:absolute;
	font-weight: 400;
	width:400px;
	left:25px;
	top:2px;
	padding: 10px;
	cursor: pointer;
`;

const InputTerminos = styled.input `
	position:absolute;
	top:10px;
	left:-10px;
	cursor: pointer;
`;

const SubmitForm = styled.input `
	position: absolute;
	display: block;
	left: 50%;
	background:#fff;
	transform: translateX(-50%);
	top: 344px;
	border-radius: 10px;
	width: 120px;
	height: 40px;
	border-color: ${colores.verde};
	color: #000;
	font-weight: 600;
	cursor:pointer;
	transition: .3s ease all;

	&:hover
	{
		background: ${colores.verde};
		color: #fff;
	}
`;

const MensajeErrorDiv = styled.div `
	position: absolute;
	left: 50%;
	background: ${colores.error};
	transform: translateX(-50%);
	top: -46px;
	width: 330px;
	height: 36px;
	color: #000;
	font-weight: 600;
	box-shadow: 0 2px 10px rgb(0 0 0 / 70%);

	${props => props.FormValido === true && css `
		opacity: 1;
		background: ${colores.exito};
	`}

	${props => props.FormValido === false && css `
		opacity: 1;
		background: #f00;
	`}
`;

const IconoValidacionGeneral = styled(FontAwesomeIcon) `
	position: absolute;
	top: -2px;
	left: -30px;
	z-index: 100;
	font-size: 26px;
	//opacity: 0;
`;

const TextoMensaje = styled.p `
	position: absolute;
	top: -9px;
	left: 38px;
`;

const TarjetaItem = styled.div `
    position: relative;
    width: 220px;
    height: 278px;
    margin-left:38px;
    display:inline-block;
    border-radius: 10px;
    margin-top:44px;  z-index:10;
    background: ${colores.fondoOscuro};
    box-shadow: 0 2px 10px rgb(0 0 0 / 70%);
`;

const VacioLupa = styled(FontAwesomeIcon) `
	position: relative;
	top:36px;
	width:200px;
	left:50%;
	transform: translateX(-50%);
	color:#111;
	font-weight:800;
	font-size:240px;
`;

const ClaseOpcion = styled.div `
    position: relative;
	top: 5px;
	width: auto;
	height: 35px;
`;

export {
	Formulario, InputForm, DivInput, TextoError, IconoValidacion, Siguiente, Anterior,
	ContenedorTerminos, Label, InputTerminos, SubmitForm, MensajeErrorDiv, 
	IconoValidacionGeneral, TextoMensaje, TarjetaItem, VacioLupa,
	ClaseOpcion, AbrirLoginBoton, Agregar 
};