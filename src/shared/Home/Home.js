import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './HomeStyles.scss'
import PropTypes from 'prop-types'
import Slider from '../../features/Slider'
import { useSelector } from 'react-redux'
import NewsHome from './newsHome'
import TestimonialsHome from './testimonialsHome'
function Home() {
	const welcomeMessage = useSelector((state) => state.welcomeText.welcomeText)  

	return (
		<Container className="p-0" fluid>
			<Container className="my-2 border-blue" fluid>
				<Slider />
			</Container>
			<Container className=" my-4 border-yellow" fluid>
				<span className="fs-1">{welcomeMessage}</span>
			</Container>
			<Container className=" py-2 my-2 border-blue" fluid>
				<span className=" fs-1 border-blue">Ultimas Novedades</span>
				<NewsHome />
				<Link to="/novedades" className=" btn btn-blue" >Ver Todas</Link>
			</Container>
			<Container className=" py-2 border-red" fluid>
				<span className=" fs-1 border-red">Testimonios</span>
				<TestimonialsHome />
			</Container>
		</Container>
	)
}

Home.propTypes = {
	text: PropTypes.string.isRequired
}

export default Home
