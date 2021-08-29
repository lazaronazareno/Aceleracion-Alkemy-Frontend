import React, { useState, useEffect } from 'react'
import useAxios from '../../libs/axiosInstance'
import { Card, Col, Row, Container } from 'react-bootstrap'
import './styles.scss'
import Sweel from '../../shared/Alert/Alert'
import Loader from '../../shared/Loader/Loader'

const httpConfig = {
	url: '/testimonials',
	method: 'get'
}

export const TestimonialsList = () => {
	const { response, error, loading, fetchData } = useAxios()

	const [testimonials, setTestimonials] = useState([])

	useEffect(() => {
		if (!loading && response) {
			setTestimonials(response.data)
		}
	}, [loading, response, error])

	useEffect(() => {
		fetchData({ url: httpConfig.url, method: httpConfig.method })
	}, [])

	if (error) {
		return (
			<Container>
				<Sweel show={true}
					title={'ERROR'}
					text={'Error al traer los datos desde el servidor'}
					type={'error'}
					onConfirm={'OK'} />
			</Container>
		)
	}

	return (
		<Container>
			{loading ?
				<Loader /> :
				<Row>
					<span className="fs-1 border-bottom-red">Testimonios</span>
					<span className="fs-3 mb-3">Vea algunos testimonios de personas que pasaron por nuestra ONG: </span>
					{
						testimonials.map(({id, name, image, content }) => {
							return(
								<Col md={3} key={id}>
									<Card className="shadow border-red">
										<Card.Img className="h-75" variant="top" src={ image } />
										<Card.Body>
											<Card.Title>{name}</Card.Title>
											<Card.Text>{content}</Card.Text>
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