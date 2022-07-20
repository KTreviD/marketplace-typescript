import React from 'react';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { VacioLupa } from '../../Elementos/Formularios.js';

export const FondoVacio = () => {
	return (
		<div>
			<VacioLupa icon={faSkullCrossbones} />
			<p className="TextoLupa">No se han encontrado resultados.</p>
		</div>);
};