import React, { useState, useEffect } from 'react'
import Moment from 'moment'
import useAxios from '../../libs/axiosInstance'
import { Table, Container, Button } from 'react-bootstrap'
import Loader from '../../shared/Loader/Loader'
import { Link } from 'react-router-dom'

const httpConfig = {
	url: '/news',
	method: 'get'
}

function BackofficeNewsList() {
	const { response, error, loading } = useAxios({ url: httpConfig.url, method: httpConfig.method })
	const [news, setNews] = useState([])

	useEffect( () => {
		if (!loading && response) {
			setNews(response.data)
		}
	},[loading, response, error])
    
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
				<Loader /> :
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Imagen</th>
							<th>Creado</th>
							<th>Editar</th>
							<th>Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{
							news.map( ({id, name, image, createdAt } ) => {
								return(
									<tr key={id}>
										<td>{name}</td>
										<td>{ image }</td>
										<td>Creado el { Moment(createdAt).format('DD-MM-YYYY')}</td>
										<td><Button as={Link} to={`/backoffice/novedades/${id}`}>Editar</Button></td>
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

export default BackofficeNewsList
