import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Form, Col, Button, Card } from 'react-bootstrap'
import useAxios from '../../libs/axiosInstance'
import {useDispatch} from 'react-redux'
import actions from '../../redux/actions'
import { useHistory } from 'react-router-dom'

function FormLogin() {
	const dispatch = useDispatch()
	const {addUser, addAuth} = actions
	const history = useHistory()
	const { response, error, loading, fetchData } = useAxios()
    
	const validationSchema = Yup.object({
		email: Yup.string().email('Formato de Email Invalido').required('Debe ingresar un Email'),
		password: Yup.string().required('Debe ingresar una contraseña')
	})
    
	const handleSubmit = (body) => {
		fetchData({url:'/auth/login', method:'post', body})
	}
    
	useEffect(() => {
		if(!loading && response) {
			const {token, user} = response
			localStorage.setItem('token', `Bearer ${token}`)
			dispatch(addAuth(true))
			dispatch(addUser(user))
			history.push('/')
		}
	}, [response, error, loading])
    
	const formik = useFormik({
		validationSchema: validationSchema, 
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: (values) => handleSubmit(values)
	})

	return (
		<Form onSubmit={formik.handleSubmit} className="container d-flex flex-column text-center">
			<Card style={{ width: '24rem' }} className="mx-auto mt-5">
				<Card.Title className="mt-2">Iniciar sesión</Card.Title>
				<Card.Body>
					<Form.Group md={12} as={Col} className='form-group'>
						<Form.Label label="Email">Email</Form.Label>
						<Form.Control 
							type='text'
							name='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							isValid={formik.values.email && !formik.errors.email}
							isInvalid={formik.errors.email}
						/>
						<Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group md={12} as={Col} className='form-group'>
						<Form.Label label="Email">Password</Form.Label>
						<Form.Control 
							type='password'
							name='password'
							value={formik.values.password}
							onChange={formik.handleChange}
							isValid={formik.values.password && !formik.errors.password}
							isInvalid={formik.errors.password}
						/>
						<Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
					</Form.Group>
					<Button className="my-2" size="lg" type="submit">Ingresar</Button>
				</Card.Body>
				{error && ( <span className="text-danger">Usuario y/o contraseña incorrecta</span> )}
			</Card>
		</Form>
	)
}

export default FormLogin