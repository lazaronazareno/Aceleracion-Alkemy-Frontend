import React, { useEffect } from 'react'
import * as yup from 'yup'
import { Formik,Field } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'
import useAxios from '../../libs/axiosInstance'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const httpConfig = {
	url: '/news',
	method_post: 'post',
	method_patch: 'patch'
}

//FYI: Por ahora le páso incomingNews aca. Cuando esté conectado deberá pasarse por props
	
/* const incomingNews = {
	name: '',
	image:'',
	content:'',
	id: ''
} */
	
const incomingNews = {
	name: 'Novedades',
	image:'PATCH',
	content:'Novedades en el front',
	id: '89'
}

const FormNews = (/* {incomingNews} */) => {
	const { response, error, loading, fetchData } = useAxios()
	
	const createEntry = (body) => {
		fetchData({ url: httpConfig.url, method: httpConfig.method_post, body })
	}

	const updateEntry = (body) => {
		fetchData({ url: `${httpConfig.url}/${body.id}`, method: httpConfig.method_patch, body })
	}
	const schema = yup.object().shape({ 
		name: yup.string().required(),
		image:yup.string().required(),
		content:yup.string().required()
	})

	useEffect(() => {
		console.log({ loading, response, error })
	}, [loading])

	return (
        
		<div>   
			<Formik
				validationSchema={schema}
				initialValues={{
					name: incomingNews.name,
					image:incomingNews.image,
					content:incomingNews.content,
					categoryId:'1',
					id:incomingNews.id
				}}
				validate={values => {
					const errors = {}
					if (!values.name) {
						errors.name = 'Debes ingresar un nombre para la categoría.'
						if (!values.content) {
							errors.content = 'Debes ingresar una descripción.'
							if (!values.image) {
								errors.image = 'Debes ingresar una imágen.'
							}
							return errors
						}
					}
				}}

				onSubmit={values => {
					if (incomingNews.name === '' && incomingNews.content === '' && incomingNews.image === '') {  
						createEntry(values)
					} else{
						try {
							updateEntry(values)
						} catch (error) {
							console.log(error.message)
						}	
					}
				}}>
				{({ handleSubmit, handleChange, values, touched, errors }) => (

					<Form noValidate onSubmit={handleSubmit}>
						<Card style={{ width: '24rem' }} className="mx-auto mt-5">
							<Card.Title className="mt-2">Novedades</Card.Title>
							<Card.Body>
								<Form.Group md="12" as={Col} controlId="validationName"> 
									<Form.Label>Nombre</Form.Label>
									<Form.Control
										type="text"
										name="name"
										placeholder="Nombre"
										value={values.name}
										onChange={handleChange}
										isValid={touched.name && !errors.name}
										isInvalid={!!errors.name}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.name}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group md="12" as={Col} controlId="validationcontent">
									<Form.Label>Contenido</Form.Label>
									<Field
										name='content'
										render={({ field, form }) => {
											return (
												<>
													<CKEditor
														editor={ClassicEditor}
														data={field.value}
														onChange={(event, editor) => {
															form.setFieldValue(field.name, editor.getData())
														}}				
													/>
												</>
											)
										}}
									/>
								</Form.Group>			
								<Form.Group md="12" as={Col} controlId="validationimage">
									<Form.Label>Imagen</Form.Label>
									<Form.Control
										type="text"
										name="image"
										placeholder="url de la imagen"
										value={values.image}
										onChange={handleChange}
										isInvalid={!!errors.image}
										isValid={touched.image && !errors.image}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.image}
									</Form.Control.Feedback>
								</Form.Group>                            
								<Button type="submit" className="mt-2">Ingresar</Button>
							</Card.Body>
						</Card>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default FormNews