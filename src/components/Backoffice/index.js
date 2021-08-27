import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles.scss'

export const BackofficeMain = () => {
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

	]

	return (
		<Container>
			<h1 className="border text-secondary">Menu Backoffice</h1>
			<Container className="d-flex flex-wrap justify-content-center">
				{
					BackofficeList.map((item, index) => {
						return (
							<Card as={Link} to={`${item.link}`} className="backofficeCard border text-decoration-none blue-card m-1" key={index}>
								<Card.Body className="d-flex align-items-center justify-content-center">
									<Card.Title className="fs-2 text-decoration-none">{item.title}</Card.Title>
								</Card.Body>
							</Card>
						)
					})
				}
			</Container>
		</Container>
	)
}