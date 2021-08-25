import React, { useState, useEffect } from 'react'
import { Container, Row, CardGroup, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './HomeStyles.scss'
import PropTypes from 'prop-types'
import Slider from '../../features/Slider'
import { useSelector } from 'react-redux'
import useAxios from '../../libs/axiosInstance'

const httpConfig = {
	url: '/news',
	method: 'get'
}
function Home() {
	const welcomeMessage = useSelector((state) => state.welcomeText.welcomeText)
	const { response, error, loading, fetchData } = useAxios()
	const [news, setNews] = useState([])

	useEffect( () => {
		if (!loading && response) {
			setNews(response.data)
		}
	},[loading, response, error])

	useEffect(() => {
		fetchData({ url: httpConfig.url, method: httpConfig.method })
	}, [])
    
	if (error) {
		return (
			<Container>
				<h1>Hubo un error al traer los datos desde el servidor...</h1>
			</Container>
		)
	}
	const newsList = news.slice(-4)
	return (
		<Container className="p-0" fluid>
			<Container className="my-2" fluid>
				<Slider />
			</Container>
			<Container>
				<Row className="justify-content-center mb-4">
					<h1>{welcomeMessage}</h1>
				</Row>
			</Container>
			<Container className="yellow" fluid>
				<Row className="justify-content-center">
					<h1>Ultimas Novedades</h1>
				</Row>
				<CardGroup>
					{
						newsList.map((news, index) => (
							<Card key={index} className="m-4">
								<Card.Img className="h-75" src={news.image} />
								<Card.Body>
									<Card.Title>{news.name}</Card.Title>
									<Card.Text>{news.createdAt}</Card.Text>
								</Card.Body>
							</Card>
						))
					}
				</CardGroup>
				<Link to="/novedades" className="btn red text-light">Ver Todos</Link>
			</Container>
		</Container>
	)
}

Home.propTypes = {
	text: PropTypes.string.isRequired
}

export default Home
