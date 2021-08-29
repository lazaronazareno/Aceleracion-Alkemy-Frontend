import React, { useEffect, useState } from 'react'
import { Card, Button, Container } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import useAxios from '../../libs/axiosInstance'
import Loader from '../../shared/Loader/Loader'
import Sweel from '../../shared/Alert/Alert'
import './styles.scss'

function NewsDetails() {
	const { id } = useParams()
	const { response, error, loading, fetchData } = useAxios()
	const [data, setData] = useState([])

	const httpConfig = {
		url: `/news/${id}`,
		method: 'get'
	}	

	useEffect(() => {
		if (!loading && response ) {
			setData([response])
		}
	}, [loading, response, error])

	useEffect(() => {
		fetchData({url: httpConfig.url, method: httpConfig.method})
	}, [])
	
	if (error) {
		return (
			<Container>
				<Sweel
					show={true}
					title={'ERROR'}
					text={'Lo sentimos, no se encontró el detalle'}
					type={'error'}
					onConfirm={'OK'}/>
				<Button as={Link} to="/novedades" size="lg">Volver</Button>
			</Container>
		)
	}
	return (
		<Container>
			{loading
				? <Loader />
				: data.map(index => (
					<Card className="container p-0 my-2" key={id}>
						<Card.Img className="cardImage" src={index.data.image} />
						<Card.Header className="yellow" as="h3">{index.data.name}</Card.Header>
						<Card.Body>
							{/* <Card.Title>Novedad {id}</Card.Title> */}
							<Card.Text>{index.data.content}</Card.Text>
						</Card.Body>
					</Card>
				))
			}
		</Container>
	)
}

export default NewsDetails
