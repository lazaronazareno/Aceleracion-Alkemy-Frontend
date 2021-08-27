import React, { useRef, useState } from 'react'
import * as yup from 'yup'
import { useFormik} from 'formik'
import { Form, Col, Button, Card, Container } from 'react-bootstrap'
import useAxios from '../../libs/axiosInstance'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useParams } from 'react-router-dom'
import S3 from 'react-aws-s3'
import { config } from '../../libs/s3'
import Loader from '../../shared/Loader/Loader'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sweel from '../../shared/Alert/Alert'

const httpConfig = {
	url: '/news',
	method_post: 'post',
	method_patch: 'patch'
}

const FormNews = () => {
	const fileInput = useRef()
	const { id } = useParams()
	const { loading, error, fetchData } = useAxios()
	const history = useHistory()
	const newDetails = useSelector(state => state.news.news[0])
	const [show, setShow] = useState(false)

	const handleUpload = (values) => {
		if (newDetails) {
			handleSubmit(values)
		} else {
			let file = fileInput.current.files[0]
			let newFileName = fileInput.current.files[0].name
			const ReactS3Client = new S3(config)
			ReactS3Client.uploadFile(file, newFileName).then((data) => {
				let body = { ...values, image:data.location}
				if (data.status === 204) {
					handleSubmit(body)
				} else {
					console.log('S3 error', data)
				}
			})
		}
	}

	const handleSubmit = (values) => {
		setShow(true)
		if(!values.id) {
			createEntry(values)
			history.push('/backoffice/')
		} else{
			try {
				updateEntry(values)
				history.push('/backoffice/')
			} catch (error) {
				console.log(error.message)
			}	
		}
	}
	
	const createEntry = (body) => {
		fetchData({ url: httpConfig.url, method: httpConfig.method_post, body })
	}

	const updateEntry = (body) => {
		fetchData({ url: `${httpConfig.url}/${id}`, method: httpConfig.method_patch, body })
	}
	const schema = yup.object().shape({ 
		name: yup.string().required('Debes ingresar un nombre'),
		content: yup.string(),
	})
	
	const formik = useFormik({
		validationSchema:schema,
		initialValues:{
			name: newDetails ? newDetails.name : '',
			content: newDetails ? newDetails.content : '',
			image: newDetails ? newDetails.image : '',
			id: newDetails ? newDetails.id : '',
			categoryId:'1',
		}, 
		onSubmit: (values) => handleUpload(values)
	})
	
	return (
		<Container>
			{loading ?
				<Loader /> :
				<Form onSubmit={formik.handleSubmit}>
					<Card style={{ width: '24rem' }} className="mx-auto mt-5">
						<Card.Title className="mt-2">Novedades</Card.Title>
						<Card.Body>
							<Form.Group md="12" as={Col} controlId="validationName"> 
								<Form.Label>Nombre</Form.Label>
								<Form.Control
									type="text"
									name="name"
									placeholder="Nombre"
									value={formik.values.name}
									onChange={formik.handleChange}
									isValid={formik.values.name && !formik.errors.name}
									isInvalid={formik.errors.name}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.name}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group md="12" as={Col} controlId="validationcontent">
								<Form.Label>Contenido</Form.Label>
								<CKEditor
									name='content'
									data={formik.values.content}
									editor={ClassicEditor}
									onChange={(event, editor) => {
										formik.setFieldValue('content', editor.getData())
									}}
								/>		
							</Form.Group>
							<Form.Group md="12" as={Col} className="d-flex flex-column" controlId="validationimage">
								<Form.Label>Imagen</Form.Label>
								{newDetails && (<img src={newDetails.image}/>)}
								<Form.Control
									type={newDetails ? 'text' : 'file'}
									name="image"
									placeholder="url de la imagen"
									value={formik.values.image}
									onChange={formik.handleChange}
									ref={fileInput}
								/>
								<Form.Control.Feedback type="invalid">
									{formik.errors.image}
								</Form.Control.Feedback>
							</Form.Group>                            
							<Button type="submit" className="mt-2">Enviar</Button>
						</Card.Body>
					</Card>
				</Form>
			}
			{show && (
				<Sweel show={true}
					title={'Operacion realizada'}
					text={newDetails ? 'Novedad Modificada' : 'Nueva novedad subida!'}
					type={'success'}
					onConfirm={() => setShow(false)} />
			)}
			{error && (<span className="text-danger">Algo salio mal...</span>)}
		</Container>
	)
}

export default FormNews