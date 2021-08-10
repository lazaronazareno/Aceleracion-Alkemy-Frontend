import React from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Form, Col, Button, Card } from 'react-bootstrap'
import axios from 'axios'

/* eslint indent:"off" */
const FormRegister = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email('Invalid email format').required(),
    password: yup.string().min(8, 'Debe tener un minimo de 8 caracters').required(),
  })

  return (
    <div>
      <Formik
        validationSchema={schema}
        initialValues={{
          name: '',
          lastname: '',
          email: '',
          password: '',
        }}
        validate={(values) => {
          const errors = {}

          if (!values.name) {
            errors.name = 'Debes ingresar su nombre.'
          }

          if (!values.lastname) {
            errors.lastname = 'Debes ingresar su apellido.'
          }

          if (!values.email) {
            errors.email = 'Debes ingresar un email.'
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Formato de email invalido.'
          }

          if (!values.password) {
            errors.password = 'Debes ingresar una contraseña.'
          } else if (values.password.length < 6) {
            errors.password = 'La contraseña debe tener un minimo de 6 digitos.'
          }
          return errors
        }}
        onSubmit={async(values, { setSubmitting }) => {
          setSubmitting(false)
          const response = await axios.post('http://localhost:4000/auth/register', values)
          console.log(response)
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Card style={{ width: '24rem' }} className="mx-auto mt-5">
              <Card.Title className="mt-2">Iniciar sesión</Card.Title>
              <Card.Body>
                <Form.Group md="12" as={Col} controlId="validationName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group md="12" as={Col} controlId="validationlastname">
                  <Form.Label>lastname</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    isValid={touched.lastname && !errors.lastname}
                    isInvalid={!!errors.lastname}
                  />
                  <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                </Form.Group>

                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>

                <Form.Group md="12" as={Col} controlId="validationPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    placeholder="Contraseña"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    isValid={touched.password && !errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="mt-2">
                  Registrarme
                </Button>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormRegister
