import React, { useState, useEffect } from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import useAxios from '../../libs/axiosInstance'
import styles from './styles.css'
import actions from '../../redux/actions/'

const httpConfig = {
	url: '/organization/public',
	method: 'get'
}

const Footer = () => {
	const {addUser} = actions
	const whiteUser = {
		id: null,
		email: null, 
		firstName: null, 
		lastName: null, 
		roleId: null, 
		routes: [] 
	}
	const dispatch = useDispatch()
	const { response, error, loading, fetchData } = useAxios()
	const [socialMedia, setSocialMedia] = useState([])

	useEffect( () => {
		if (!loading && response) {
			setSocialMedia(response.data)
			whiteUser.routes = response.routes
			dispatch(addUser(whiteUser))
		}
	},[loading, response, error])

	useEffect(() => {
		fetchData(httpConfig)
	}, [])
	
	// FYI: Data for footer links:
	const infoFooter = [
		{
			title: 'Noticias',
			link: '/noticias'
		},
		{
			title: 'Actividades',
			link: '/actividades'
		},
		{
			title: 'Novedades',
			link: '/novedades'
		},
		{
			title: 'Testimonios',
			link: '/testimonios'
		},
		{
			title: 'Nosotros',
			link: '/nosotros'
		},
		{
			title: 'Contacto',
			link: '/contacto'
		}
	]
   
	const splitFooterLinks = (array, parts) => {
		let result = []
		for (let i = parts; i > 0; i--) {
			result.push(array.splice(0, Math.ceil(array.length / i)))
		}
		return result
	}

	const infoFooterLinks = splitFooterLinks(infoFooter,2)

	return (
		<> 
			<Container bg="light" fluid className='d-flex flex-column position-relative bottom-0 border-top p-0 mt-2'>
				<Navbar bg="light" variant="light" expand='lg'>
					<Container className="border-bottom">
						<Nav variant='monserrat'>
							{ infoFooterLinks[0].map(item => {
								return (
									<Nav.Item  key={item.title}  className='links'>
										<Nav.Link variant='test' href={`${item.link}`}>{item.title}</Nav.Link>
									</Nav.Item>
								)
							})
							}
						</Nav> 
						<Navbar.Brand href="/">
							<img src='images/assets/logo-header-2.svg' alt='sample-logo'/>
							<label>   </label>
							<img src='images/assets/logo-header.svg' alt='logo' />
						</Navbar.Brand> 
						<Nav variant='monserrat'>
							{ infoFooterLinks[1].map(item => {
								return (
									<Nav.Item  key={item.title} className='links'>
										<Nav.Link variant='test' href={`${item.link}`}>{item.title}</Nav.Link>
									</Nav.Item>
								)
							})
							}
						</Nav>                     
					</Container>
				</Navbar>
				<div className={styles.links}>
					<a href= {socialMedia.linkInstagram} >
						<ion-icon name="logo-instagram" size="large" ></ion-icon>   
					</a> 
					<a href={socialMedia.linkTwitter} >
						<ion-icon name="logo-twitter" size="large" ></ion-icon>   
					</a> 
					<a href={socialMedia.linkFacebook}>
						<ion-icon name="logo-facebook" size="large"  ></ion-icon>   
					</a> 
					<a href={socialMedia.linkWhatsapp}>
						<ion-icon name="logo-whatsapp" size="large" ></ion-icon>   
					</a> 
				</div> 
				<p className={styles.p}> 2021 by Alkemy. All rights reserved </p>
			</Container>
		</>
	)
}

export default Footer