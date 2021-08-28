import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
//import Moment from 'moment'
import useAxios from '../../libs/axiosInstance'
import { Card, Col, Row, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.scss'
import Sweel from '../../shared/Alert/Alert'
import Loader from '../../shared/Loader/Loader'

const httpConfig = {
	url: '/activities',
	method: 'get'
}

export const ActivitiesList = () => {
	const { response, error, loading, fetchData } = useAxios()

	const [activities, setActivities] = useState([])

	useEffect(() => {
		if (!loading && response) {
			setActivities(response.data)
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
					{
						activities.map(({id, name, image, /* createdAt */ }) => {
							return(
								<Col md={4} key={id}>
									<Card className="shadow border-blue">
										<Card.Img className="h-75" variant="top" src={ image } />
										<Card.Body>
											<Card.Title className="left">{name}</Card.Title>
											{/* <Card.Text className="left date">Creado el {Moment(createdAt).format('DD-MM-YYYY')}</Card.Text> */}
											<Link className="btn btn-info" to={`/novedades/${id}`}>Ver detalle</Link>
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