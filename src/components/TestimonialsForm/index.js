import React, {useEffect} from 'react'
import { useFormik} from 'formik'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import useAxios from '../../libs/axiosInstance'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Form, Card, Button } from 'react-bootstrap'

import './styles.css'

const TestimonialsForm = ({url, data = {id:'',image:'',content:'', name:''}, title, update=false}) => {
	// PropTypes:
	TestimonialsForm.propTypes = {
		url: PropTypes.string.isRequired,
		data: PropTypes.object,
		title: PropTypes.string.isRequired, 
		update: PropTypes.bool
	}
	// -----------------------------------
	const schema = yup.object().shape({ 
		name: yup.string().required('Debes ingresar un nombre'),
		content: yup.string(),
		image: yup.string().url('Debe ingresar una url valida')
	})

	const httpConfig = {
		url: update ? `${url}/${data.id}` : url, //FYI: Ternary for patch or post
		method: update ? 'patch' : 'post'
	}

	const { response, error, loading, fetchData } = useAxios()

	const handleSubmit = (values) => {
		fetchData(httpConfig, values)
	} 

	useEffect(() => {
		console.log({response, error, loading})
	},[loading])

	const formik = useFormik({
		validationSchema: schema, 
		initialValues: {
			name: data ? data.name : '',
			content: data ? data.content : '',
			image: data ? data.image : ''
		}, 
		onSubmit: (values) => handleSubmit(values)
	})
	return (
		<Form onSubmit={formik.handleSubmit} className='form-general'>
			<Card className="mx-auto mt-5"> 

				<Card.Title>{title}</Card.Title>
				<Card.Body>
					<Form.Group md={12} className='form-group' controlId='validationName'>
						<Form.Label>Nombre:</Form.Label>
						<Form.Control 
							type='text'
							name='name'
							placeholder='Nombre'
							value={formik.values.name}
							onChange={formik.handleChange}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{formik.errors.name}
						</Form.Control.Feedback>

					</Form.Group>
          
					<Form.Group md={6} className='form-group' controlId='validationContent'>
						<Form.Label>Contenido:</Form.Label>
						<CKEditor
							name='content'
							data={formik.values.content}
							editor={ClassicEditor}
							onChange={(event, editor) => {
								formik.setFieldValue('content', editor.getData())
							}}
						/>
					</Form.Group>
          
					<Form.Group md={12} className='form-group' controlId='validationImage'>
						<Form.Label>Imagen:</Form.Label>
						<Form.Control 
							type='text'
							name='image'
							placeholder='URL de la imagen'
							value={formik.values.image}
							onChange={formik.handleChange}
							isValid={!!formik.errors.image}
							required
						/>
						<Form.Control.Feedback type={!formik.errors.image ? 'invalid' : 'valid'}>
							{formik.errors.image}
						</Form.Control.Feedback>
					</Form.Group>

					<Button type='submit' className='mt-2'>Enviar</Button>
				</Card.Body>
			</Card>
		</Form>
	)

}

export default TestimonialsForm