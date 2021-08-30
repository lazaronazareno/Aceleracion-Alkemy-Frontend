import React, { useState, useEffect } from 'react'
import useAxios from '../../libs/axiosInstance'
import { Card, CardGroup, Container } from 'react-bootstrap'
import './HomeStyles.scss'
import Sweel from '../../shared/Alert/Alert'
import Loader from '../../shared/Loader/Loader'

const httpConfig = {
	url: '/testimonials',
	method: 'get'
}

export default function TestimonialsHome () {
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
  
	const testimonialsList = testimonials.slice(-4)
	return (
		<>
			{loading ?
				<Loader /> :
				<CardGroup>
					{
						testimonialsList.map((news, index) => (
							<Card key={index} className="m-4 border-red">
								<Card.Img className="h-75" src={news.image} />
								<Card.Body>
									<Card.Title>{news.name}</Card.Title>
									<Card.Text>{news.content}</Card.Text>
								</Card.Body>
							</Card>
						))
					}
				</CardGroup>
			}
		</>
	)
}