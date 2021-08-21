/*eslint indent: "off"*/
import React, { useEffect } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import * as yup from 'yup'
import { Formik, Field } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'

import './styles.css'
import useAxios from '../../libs/axiosInstance'


const httpConfig = {
	url: '/activities',
	method_post: 'post',
	method_patch: 'patch'
}

const incomingActivity={
	name: 'Actividad 2',
	image:'PATCH',
	content:'<p>un texto para la actividad</p>',
	id: '2'
}

export const ActivityForm = ( ) => {

  const { response, error, loading, fetchData } = useAxios()


	const schema = yup.object().shape({ 
		name: yup.string().required(),
		image:yup.string().required(),
		content:yup.string().required()
	})
  
	const createEntry = (body) => {
		fetchData({ url: httpConfig.url, method: httpConfig.method_post, body })

	}

	const updateEntry = (body) => {
		fetchData({ url: `${httpConfig.url}/${body.id}`, method: httpConfig.method_patch, body })
	}

	// FYI: to see the response after add
	useEffect(() => {
		console.log({ response })
	}, [response])

  return (
		<div className="container">   
			<Formik
				validationSchema={schema}
				initialValues={{
					name: incomingActivity.name,
					image:incomingActivity.image,
					content:incomingActivity.content,
					id:incomingActivity.id
				}}
				validate={values => {
					const errors = {}
					if (!values.name) {
						errors.name = 'Debes ingresar un nombre para la actividad.'
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
					if (incomingActivity.name === '' && incomingActivity.content === '' && incomingActivity.image === '') {  
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
						<Card className="mx-auto mt-5">
							<Card.Title className="mt-2 p-2 text-center">Actividades</Card.Title>
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
