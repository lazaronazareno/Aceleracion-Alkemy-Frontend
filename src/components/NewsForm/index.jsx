import React, { useEffect, useState, useRef } from 'react'
import * as yup from 'yup'
import { Formik,Field } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'
import useAxios from '../../libs/axiosInstance'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useParams } from 'react-router-dom'
import S3 from 'react-aws-s3'
import { config } from '../../libs/s3'

const httpConfig = {
	url: '/news',
	method_post: 'post',
	method_patch: 'patch'
}

const FormNews = () => {
	const fileInput = useRef()
	const { id } = useParams()
	const [news, setNews] = useState([])
	const { response, error, loading, fetchData } = useAxios()

	const handleUpload = (values) => {
		let file = fileInput.current.files[0]
		let newFileName = fileInput.current.files[0].name
		const ReactS3Client = new S3(config)
		ReactS3Client.uploadFile(file, newFileName).then((data) => {
			let body = {
				name: values.name,
				image: data.location,
				content:values.content,
				categoryId:'1',
				id:values.id
			}
			if (data.status === 204) {
				console.log('success')
				if (news.name === '' && news.content === '' && news.image === '') {  
					createEntry(body)
				} else{
					try {
						updateEntry(body)
					} catch (error) {
						console.log(error.message)
					}	
				}
			} else {
				console.log('fail')
				console.log(data)
			}
		})
	}
	
	const createEntry = (body) => {
		fetchData({ url: httpConfig.url, method: httpConfig.method_post, body })
	}

	const updateEntry = (body) => {
		fetchData({ url: `${httpConfig.url}/${id}`, method: httpConfig.method_patch, body })
	}
	const schema = yup.object().shape({ 
		name: yup.string().required(),
		image:yup.string().required(),
		content:yup.string().required()
	})
	
	useEffect(() => {
		fetchData({url: `/news/${id}`, method: 'get'})
		console.log({ loading, response, error, news })
	}, [])

	useEffect(() => {
		if (!loading && response ) {
			console.log({ loading, response, error, news })
			setNews([response.data])
		}
	}, [loading, response, error])

	return (
        
		<div>   
			<Formik
				validationSchema={schema}
				initialValues={{
					name: news.name,
					image: news.image,
					content:news.content,
					categoryId:'1',
					id:news.id
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
					handleUpload(values)
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
								<Form.Group md="12" as={Col} className="d-flex flex-column" controlId="validationimage">
									<Form.Label>Imagen</Form.Label>
									<Form.Control
										type="file"
										name="image"
										placeholder="url de la imagen"
										value={values.image}
										onChange={handleChange}
										isInvalid={!!errors.image}
										isValid={touched.image && !errors.image}
										ref={fileInput}
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