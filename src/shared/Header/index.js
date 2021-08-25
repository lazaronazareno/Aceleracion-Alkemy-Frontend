import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import './styles.css' // This is for style variants used
import { useSelector } from 'react-redux'
import { Backoffice } from '../../components/BackofficeMenu'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import actions from '../../redux/actions'

export const Header = () => {
	const history = useHistory()
	const { addAuth } = actions
	const dispatch = useDispatch()
	const isAuth = useSelector((state) => state.auth.isAuth)	
	// FYI: Data for navbar links:
	const infoNavbarNL = [
		{
			title: 'Inicio',
			link: '/',
		},
		{
			title: 'Nosotros',
			link: '/nosotros',
		},
		{
			title: 'Actividades',
			link: '/actividades',
		},
		{
			title: 'Novedades',
			link: '/novedades',
		},
		{
			title: 'Testimonios',
			link: '/testimonios',
		},
		{
			title: 'Contacto',
			link: '/contacto',
		},
		{
			title: 'Contribuye',
			link: '/contribuye',
		},
	]

	const location = useLocation()
	const { pathname } = location

	return (
		<>
			<Navbar bg="light" variant="light" expand="lg">
				<Container>
					<Navbar.Brand as={Link} to="/">
						<img src="images/assets/logo-header-2.svg" alt="sample-logo" />
						<img src="images/assets/logo-header.svg" alt="logo" />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto" variant="monserrat">
							{infoNavbarNL.map((item) => {
								return (
									<Nav.Item className={pathname === item.link ? 'active' : ''} key={item.title}>
										<Nav.Link as={Link} variant="test" to={`${item.link}`}>
											{item.title}
										</Nav.Link>
									</Nav.Item>
								)
							})}
						</Nav>
						{!isAuth ?
							<Nav className="me-auto" variant="btn-container">
								<Button as={Link} to="/login" variant="blue" size="sm">
                  Login
								</Button>
								<Button as={Link} to="/register" variant="primary" size="sm">
                  Registrarse
								</Button>
							</Nav>
							:   <Nav className="me-auto" variant="btn-container">
								<Button variant="blue" size="sm" onClick={() => {
									localStorage.removeItem('token')
									dispatch(addAuth(false))
									history.push('/')
								}
								}>
						Desloguearse
								</Button>
								<Button as={Link} to="/user" variant="primary" size="sm">
						Perfil
								</Button>
								<Backoffice />
							</Nav>
						}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}
