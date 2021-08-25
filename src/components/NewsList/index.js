import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import useAxios from '../../libs/axiosInstance'
import { Card, Col, Row, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

const httpConfig = {
	url: '/news',
	method: 'get'
}

export const NewList  = () => {
	const { response, error, loading, fetchData } = useAxios()

	const [news, setNews] = useState([])

	useEffect(() => {
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

	return(
		<Container>
			{loading ?
				<h1>Cargando...</h1> :
				<Row>
					{
						news.map(({id, name, image, createdAt }) => {
							return(
								<Col md={4} key={id}>
									<Card className="shadow">
										<Card.Img className="h-75" variant="top" src={ image } />
										<Card.Body>
											<Card.Title className="left">{name}</Card.Title>
											<Card.Text className="left date">Creado el { Moment(createdAt).format('DD-MM-YYYY')}</Card.Text>
											<Link className="btn btn-primary" to={`/novedades/${id}`}>Ver detalle</Link>
										</Card.Body>
									</Card>
								</Col>
							)
						})
					}
				</Row> 
			}
		</Container>
	)
}