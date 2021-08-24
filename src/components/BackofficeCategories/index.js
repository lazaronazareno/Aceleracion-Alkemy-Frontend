import React,{useEffect} from 'react'
import useAxios from '../../libs/axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../redux/actions'
import { Table, Button } from 'react-bootstrap'

const {addCategories} = actions

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
		console.log(id)
	}

	return (
		<Table>
			<thead>
				<th>Nombre</th>
				<th>Acciones</th>
			</thead>
			<tbody>
				{categories.map((category, i) => {
					return (
						<tr key={i}>
							<td>{category.name}</td>
							<td>
								<Button variant='danger' onClick={() => handleDelete(category.id)}>Eliminar</Button>
							</td>
						</tr>
					)
				})}
						
			</tbody>
		</Table>
	)
}

export default BackofficeCategories
