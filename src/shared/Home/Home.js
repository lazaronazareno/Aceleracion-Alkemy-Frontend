import React from 'react'
import { Container, Row, CardGroup, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './HomeStyles.scss'
import PropTypes from 'prop-types'
import Slider from '../../features/Slider'

const newsTest = [
	{
		title: 'New 1',
		text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
	},
	{
		title: 'New 2',
		text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
	},
	{
		title: 'New 3',
		text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
	},
	{
		title: 'New 4',
		text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
	},
	{
		title: 'New 5',
		text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
	},
	{
		title: 'New 6',
		text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
	},
]
function Home(props) {
	const newsList = newsTest.slice(-4) //FYI: ingresar lista de novedades en el slice
	return (
		<Container className="p-0" fluid>
			<Container className="my-2" fluid>
				<Slider />
			</Container>
			<Container>
				<Row className="justify-content-center mb-4">
					<h1>{props.text}</h1>
				</Row>
			</Container>
			<Container className="yellow" fluid>
				<Row className="justify-content-center">
					<h1>Ultimas Novedades</h1>
				</Row>
				<CardGroup>
					{
						newsList.map((news) => (
							<Card key={news.title} className="m-4">
								<Card.Body>
									<Card.Title>{news.title}</Card.Title>
									<Card.Text>{news.text}</Card.Text>
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
