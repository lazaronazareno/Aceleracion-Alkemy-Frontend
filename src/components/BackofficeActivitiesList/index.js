import React, { useState, useEffect } from 'react'
import Moment from 'moment'
import useAxios from '../../libs/axiosInstance'
import { Table, Container, Button } from 'react-bootstrap'
import Loader from '../../shared/Loader/Loader'
import { Link } from 'react-router-dom'
import Sweel from '../../shared/Alert/Alert'

const httpConfig = {
	url: '/activities',
	method: 'get'
}

function BackofficeActivitiesList() {
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
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Imagen</th>
							<th>Contenido</th>
							<th>Creado</th>
							<th>Editar</th>
							<th>Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{
							activities.map(({ id, image, content, name, createdAt }) => {
								return (
									<tr key={id}>
										<td>{name}</td>
										<td>{image}</td>
										<td>{content}</td>
										<td>Creado el {Moment(createdAt).format('DD-MM-YYYY')}</td>
										<td><Button as={Link} to={`/backoffice/actividades/${id}`} variant="info">Editar</Button></td>
										<td><Button variant="danger">Eliminar</Button></td>
									</tr>
								)
							})
						}
					</tbody>
				</Table>

			}
		</Container>
	)
}

export default BackofficeActivitiesList
