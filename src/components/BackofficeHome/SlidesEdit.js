import React, { useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import './styles.scss'
import S3 from 'react-aws-s3'
import { config } from '../../libs/s3'

function SlidesEdit() {
	const fileInput1 = useRef()
	const fileInput2 = useRef()
	const fileInput3 = useRef()
	const handleSubmit = () => {
		let newArr = [fileInput1.current.files,fileInput2.current.files, fileInput3.current.files]
		for (let i = 0; i < newArr.length; i++) {
			handleUpload(newArr[i])
		}
	}
	
	const handleUpload = (file) => {
		let newFileName = file[0].name.replace(/\..+$/, '')
		const ReactS3Client = new S3(config)
		ReactS3Client.uploadFile(file[0], newFileName).then((data) => {
			if (data.status === 204) {
				console.log('success')
				//FYI: Hacer un POST a slides con esta data
				console.log(data.location)
			} else {
				console.log('fail')
				console.log(data)
			}
		})
	}
	
	const formik = useFormik({
		initialValues: {files:''}, 
		onSubmit: () => handleSubmit()
	})
	return (
		<Form onSubmit={formik.handleSubmit} className="d-flex flex-column align-items-center text-light bg-secondary">
			<h2 className="d-flex m-3">Subir Imagenes</h2>
			<Form.Group className="d-flex flex-column">
				<Button
					as="input"
					className="btn btn-info m-1"
					type="file"
					name="photo1"
					ref={fileInput1}
				/>
				<Button
					as="input"
					className="btn btn-warning m-1"
					type="file"
					name="photo1"
					ref={fileInput2}
				/>
				<Button
					as="input"
					className="btn btn-danger m-1"
					type="file"
					name="photo1"
					ref={fileInput3}
				/>
			</Form.Group>
			<Button className="mt-2" type="submit">
              Enviar
			</Button>
		</Form>
	)
}

export default SlidesEdit
