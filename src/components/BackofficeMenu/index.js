import React, { useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const Backoffice = () => {
	const routes = useSelector((state) => state.user.routes)
	const [show, setShow] = useState(false)
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
		{
			title: 'Inicio',
			link: '/backoffice/Inicio',
		},
		{
			title: 'Categorias',
			link: '/backoffice/categories',
		},
		{
			title: 'Editar Usuario',
			link: '/editUser',
		},
	]
	const handleShow = () => {
		let includes = routes.includes('/backoffice/usuarios')
		if (includes) {
			setShow(true)
		}
	}

	useEffect(() => {
		handleShow()
	}, [routes])

	return (
		<NavDropdown title="Menu">
			{show
				? BackofficeList.map((item, index) => {
					return (
						<div key={index}>
							<NavDropdown.Item as={Link} to={`${item.link}`} key={index}>{item.title}</NavDropdown.Item>
						</div>
					)
				})
				: <NavDropdown.Item as={Link} to ="/editUser">Editar Usuario</NavDropdown.Item>
			}
		</NavDropdown>
	)
}
