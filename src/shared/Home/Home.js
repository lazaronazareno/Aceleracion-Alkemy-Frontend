import React, { useState, useEffect } from 'react'
import { Container, CardGroup, Card } from 'react-bootstrap'
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
				<span className="fs-1">Hubo un error al traer los datos desde el servidor...</span>
			</Container>
		)
	}
	const newsList = news.slice(-4)
	return (
		<Container className="p-0" fluid>
			<Container className="my-2 border-blue" fluid>
				<Slider />
			</Container>
			<Container className=" my-4 border-yellow" fluid>
				<span className="fs-1">{welcomeMessage}</span>
			</Container>
			<Container className=" py-2 border-blue" fluid>
				<span className=" fs-1 border-blue">Ultimas Novedades</span>
				<CardGroup>
					{
						newsList.map((news, index) => (
							<Card key={index} className="m-4 border-blue">
								<Card.Img className="h-75" src={news.image} />
								<Card.Body>
									<Card.Title>{news.name}</Card.Title>
									<Card.Text>{news.createdAt}</Card.Text>
								</Card.Body>
							</Card>
						))
					}
				</CardGroup>
				<Link to="/novedades" className=" btn btn-blue" >Ver Todas</Link>
			</Container>
		</Container>
	)
}

Home.propTypes = {
	text: PropTypes.string.isRequired
}

export default Home
