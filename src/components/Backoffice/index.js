import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles.scss'

export const BackofficeMain = () => {
	const BackofficeList = [
		{
			title: 'Inicio',
			link: '/backoffice/Inicio',
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
			title: 'Categorias',
			link: '/backoffice/categories',
		},
		{
			title: 'Usuarios',
			link: '/backoffice/usuarios',
		}

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