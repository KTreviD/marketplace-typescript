import './App.css';
import React from 'react';
import { Header } from './Componentes/Header/Header';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './Componentes/Publico/Login';
import { Registrar } from './Componentes/Publico/Registrar';
import { OlvidarPassword } from './Componentes/Publico/OlvidarPassword';
import { RecuperarPassword } from './Componentes/Publico/RecuperarPassword';
import { Dashboard } from './Componentes/Privado/Dashboard';
import { PaginaItem } from './Componentes/Privado/PaginaItemF/PaginaItem';
import { PerfilPropio } from './Componentes/Privado/Perfiles/PerfilPropio';
import { PerfilAjeno } from './Componentes/Privado/Perfiles/PerfilAjeno';

export const App = () => {

	return  (<BrowserRouter>
		<Routes>
			<Route path ="/" element={<Header/>}/>
			<Route path="/Registrar" element={<Registrar/>}/>
			<Route path="/Login" element={<Login/>}/>
			<Route path="/OlvidarPassword" element={<OlvidarPassword/>}/>
			<Route path="/RecuperarPassword" element={<RecuperarPassword/>}/>
			<Route path="/Dashboard" element={<Dashboard/>}/>
			<Route path="/Dashboard/:codigo" element={<PaginaItem/>}/>
			<Route path="/PerfilPropio" element={<PerfilPropio/>}/>
			<Route path="/Perfil/:perfil" element={<PerfilAjeno/>}/>
		</Routes>
	</BrowserRouter>);
};