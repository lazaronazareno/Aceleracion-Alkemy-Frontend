import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Backoffice = (props) => {
	const roleId = props.roleId	
	const BackofficeList = [
		{
			title: 'Usuarios',
			link: '/backoffice/usuarios',
		},
		{
			title: 'Actividades',
			link: '/backoffice/actividades',
		},
		{
			title: 'Novedades',
			link: '/backoffice/novedades',
		},
		{
			title: 'Testimonios',
			link: '/backoffice/testimonios',
		},
		{
			title: 'Contacto',
			link: '/backoffice/contactos',
		},
	]

	return (
		<NavDropdown title="Menu">
			{roleId === 1
				? BackofficeList.map((item) => {
					return (
						<>
							<NavDropdown.Item as={Link} to={`${item.link}`} key={item.title}>{item.title}</NavDropdown.Item>
						</>
					)
				})
				: <NavDropdown.Item as={Link} to ="/editUser">Editar Usuario</NavDropdown.Item>
			}
		</NavDropdown>
	)
}
