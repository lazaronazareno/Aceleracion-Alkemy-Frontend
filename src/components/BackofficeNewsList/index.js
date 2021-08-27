import React, { useState, useEffect } from 'react'
import Moment from 'moment'
import useAxios from '../../libs/axiosInstance'
import { Table, Container, Button } from 'react-bootstrap'
import Loader from '../../shared/Loader/Loader'
import { Link } from 'react-router-dom'
import Sweel from '../../shared/Alert/Alert'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'

const {addNews, addNewDetails, deleteNew} = actions

const httpConfig = {
	url: '/news',
	method: 'get'
}

function BackofficeNewsList() {
	const { response, error, loading, fetchData } = useAxios()
	const dispatch = useDispatch()
	const news = useSelector(state => state.news.news)
	const history = useHistory()
	const [show, setShow] = useState(false)

	const handleDelete = async (id) => {
		const httpConfigDelete = {
			url: `/news/${id}`,
			method: 'delete'
		}
		dispatch(deleteNew(id))
		await fetchData(httpConfigDelete)
		history.push('/backoffice/')
	}
	
	useEffect(() => {
		fetchData({ url: httpConfig.url, method: httpConfig.method })
	}, [])

	useEffect(() => {
		if (!loading && response && response.data !== []) {
			dispatch(addNews(response.data))
		}
	}, [loading, response, error])

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
				<Container>
					<Container className="d-flex justify-content-between">
						<h1>Lista Novedades</h1>
						<Button as={Link} onClick={() => dispatch(addNewDetails({}))} to="/backoffice/novedades/new">Nueva novedad</Button>
					</Container>
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
							{news && (
								news.map(({ id, name, image, createdAt }) => {
									return (
										<tr key={id}>
											<td>{name}</td>
											<td>{image}</td>
											<td>Creado el {Moment(createdAt).format('DD-MM-YYYY')}</td>
											<td><Button as={Link} to={`/backoffice/novedades/${id}`} onClick={(() => dispatch(addNewDetails(id)))}>Editar</Button></td>
											<td><Button variant="danger" onClick={() => (handleDelete(id), setShow(true))}>Eliminar</Button></td>
										</tr>
									)
								})
							)
							}
						</tbody>
					</Table>
				</Container>
			}
			{show && (
				<Sweel show={true}
					title={'Operacion Realizada'}
					text={'Novedad Eliminada'}
					type={'success'}
					onConfirm={() => setShow(false)} />
			)}
		</Container>
	)
}

export default BackofficeNewsList
