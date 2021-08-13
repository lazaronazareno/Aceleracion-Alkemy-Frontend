import React from 'react'
import * as yup from 'yup'
import { Formik,Field } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import useAxios from '../../libs/axiosInstance'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Input } from 'postcss'


const FormNews = (/* {incomingNews} */) => {
	const schema = yup.object().shape({ 
		name: yup.string().required(),
		image:yup.string().required(),
		content:yup.string().required()
	}
	)

	//FYI: Por ahora le páso incomingNews aca. Cuando esté conectado deberá pasarse por props
	    
/* 		const incomingNews = {
		name: '',
		image:'',
		content:'',
		id:''
	} */
		
	const incomingNews = {
		name: 'Novedades',
		image:'PATCH',
		content:'Novedades en el front',
		id:'89'
	}

	return (
        
		<div>
            
			<Formik
				validationSchema={schema}
				initialValues={{
					name: incomingNews.name,
					image:incomingNews.image,
					content:incomingNews.content,
					categoryId:'1'
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

				onSubmit={ async (values, { setSubmitting }) => {
                    
					setSubmitting(false)
					
					if ((incomingNews.name && incomingNews.content && incomingNews.image )=== '') {                      
						const response = await axios.post('http://localhost:4000/news', values) //cambiar a useAxios
						//const { response, loading, error } = useAxios({ method: 'post',url: 'news',body:values})
					} else{					                        
						const response = await axios.patch(`http://localhost:4000/news/${incomingNews.id}`, values)	
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
											render={({ field, form }: FieldProps<number | string>) => {
													return (
															<>
																	<CKEditor
																			editor={ClassicEditor}
																			data={field.value}
																			onChange={(event: any, editor: any) => {
																					form.setFieldValue(field.name, editor.getData());
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