import React,{useEffect} from 'react'
import useAxios from '../../libs/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import { Table, Button, Container } from 'react-bootstrap'

const {addCategories, deleteCategory} = actions

const BackofficeCategories = () => {
	const httpConfig = {
		url: '/categories',
		method: 'get'
	}
  
	const categories = useSelector(state => state.category.categories)

	const dispatch = useDispatch()

	const {response, error, fetchData} = useAxios()

	const getCategories = async () => {
		fetchData(httpConfig)
	}

	useEffect(() => {
		getCategories()
	}, [])

	useEffect(() => {
		if (response && response.data !== []) {
			dispatch(addCategories(response.data))	
		}
	}, [response, error])

	const handleDelete = async (id) => {
		const httpConfigDelete = {
			url: `/categories/${id}`,
			method: 'delete'
		}

		dispatch(deleteCategory(id))
		await fetchData(httpConfigDelete)
	}

	return (
		<Container>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Descripción</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{categories.map((category, i) => {
						return (
							<tr key={i}>
								<td>{category.name}</td>
								<td>{category.description}</td>
								<td>
									<Button variant='danger' onClick={() => handleDelete(category.id)}>Eliminar</Button>
								</td>
							</tr>
						)
					})}
						
				</tbody>
			</Table>
		</Container>
	)
}

export default BackofficeCategories
