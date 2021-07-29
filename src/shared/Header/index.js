import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import './styles.css' // This is for style variants used

export const Header = () => {
	const isLogged = false

	// FYI: Data for navbar links:
	const infoNavbarNL = [
		{
			title: 'Inicio',
			link: '/#',
		},
		{
			title: 'Nosotros',
			link: '/#nosotros',
		},
		{
			title: 'Actividades',
			link: '/#actividades',
		},
		{
			title: 'Novedades',
			link: '/#novedades',
		},
		{
			title: 'Testimonios',
			link: '/#testimonios',
		},
		{
			title: 'Contacto',
			link: '/#contacto',
		},
		{
			title: 'Contribuye',
			link: '/#contribuye',
		},
	]

	const infoNavbarL = []
	return (
		<>
			<Navbar bg="light" variant="light" expand="lg">
				<Container>
					<Navbar.Brand href="/#">
						<img src="images/assets/logo-header-2.svg" alt="sample-logo" />
						<img src="images/assets/logo-header.svg" alt="logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto" variant="monserrat">
							{!isLogged
								? infoNavbarNL.map((item) => {
									return (
										<Nav.Item key={item.title}>
											<Nav.Link variant="test" href={`${item.link}`}>
												{item.title}
											</Nav.Link>
										</Nav.Item>
									)
								})
								: infoNavbarL.map((item) => {
									return (
										<Nav.Item key={item.title}>
											<Nav.Link variant="test" href={`${item.link}`}>
												{item.title}
											</Nav.Link>
										</Nav.Item>
									)
								})}
						</Nav>
						{!isLogged && (
							<Nav className="me-auto" variant="btn-container">
								<Button variant="blue" size="sm">
                  Login
								</Button>
								<Button variant="primary" size="sm">
                  Registrarse
								</Button>
							</Nav>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}
